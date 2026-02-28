const trustedDomains = [
  "google.com",
  "microsoft.com",
  "apple.com",
  "adobe.com",
  "github.com",
  "amazon.com",
  "paypal.com"
];

// Render-hosted Groq detection endpoint
const GROQ_DETECT_URL = "https://groq-server-bnct.onrender.com/detect";

async function confirmWithAI(text) {
  // Retry with exponential backoff for transient DNS/network errors
  const maxAttempts = 3;
  let attempt = 0;
  let lastErr = null;

  while (attempt < maxAttempts) {
    try {
      const res = await fetch(GROQ_DETECT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      let data;
      try { data = await res.json(); } catch (e) { data = { rawText: await res.text() }; }

          let confirmed = false;
      if (data && typeof data === 'object') {
        // explicit fields returned from the AI service
        if (data.suspicious === true) confirmed = true;
        if (data.is_phishing === true) confirmed = true;
        if (data.label && ['suspicious', 'phish', 'malicious', 'phishing'].includes(String(data.label).toLowerCase())) confirmed = true;
        if (typeof data.score === 'number' && data.score >= 0.5) confirmed = true;
        // NOTE: avoid simplistic substring checks of the entire JSON, which can trigger
        // on key names such as "is_phishing" even when the value is false.
      }

      return { confirmed, data };
    } catch (err) {
      lastErr = err;
      console.warn(`AI confirm attempt ${attempt+1} failed`, err);
      // If this looks like a DNS resolution error, try again after a delay
      const delayMs = 500 * Math.pow(2, attempt);
      await new Promise(r => setTimeout(r, delayMs));
      attempt++;
    }
  }

  return { confirmed: false, data: { error: String(lastErr) } };
}

async function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve(token);
    });
  });
}

async function fetchEmails(token, fromDate, toDate) {
  let query = "";
  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffMs = to.getTime() - from.getTime();
    // If the range is 24 hours or less, use Gmail's newer_than for better precision
    if (diffMs <= 24 * 60 * 60 * 1000) {
      query = "newer_than:1d";
    } else {
      const after = Math.floor(from.getTime() / 1000);
      const before = Math.floor(to.getTime() / 1000);
      query = `after:${after} before:${before}`;
    }
  }

  console.log("Gmail query:", query);

  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages${query ? `?q=${encodeURIComponent(query)}` : ''}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gmail list failed: ${response.status} ${response.statusText} ${err}`);
  }

  return response.json();
}

async function getEmailDetails(token, id) {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.json();
}

async function moveToTrash(token, id) {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`,
    { method: "POST", headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Move to trash failed: ${res.status} ${res.statusText} ${body}`);
  }
  return true;
}

function scanURL(url) {
  let score = 0;
  if (!url.startsWith("https://")) score += 20;
  if (/https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url)) score += 40;
  if (url.includes("bit.ly") || url.includes("tinyurl")) score += 30;
  return score;
}

function analyzeEmail(sender, subject, body) {
  let score = 0;
  const lowerBody = body.toLowerCase();
  const lowerSub = subject.toLowerCase();

  if (!trustedDomains.some(d => sender.toLowerCase().includes(d))) {
    score += 10;
  }

  const keywords = ["urgent","click here","verify","password","lottery","claim now"];
  keywords.forEach(k => {
    if (lowerBody.includes(k) || lowerSub.includes(k)) score += 20;
  });

  const urls = body.match(/https?:\/\/[^\s]+/g);
  if (urls) {
    urls.forEach(url => score += scanURL(url));
  }

  let level = "Low";
  if (score >= 60) level = "High";
  else if (score >= 30) level = "Moderate";

  return { score, level };
}

let scanAbort = false; // flagged when user requests cancellation

async function scanEmails(fromDate, toDate) {
  scanAbort = false; // reset at start of every scan
  const token = await getAuthToken();
  const data = await fetchEmails(token, fromDate, toDate);
  const totalMessages = data && data.messages ? data.messages.length : 0;

  const results = [];

  let aborted = false;
  for (let idx = 0; idx < data.messages.length; idx++) {
    if (scanAbort) {
      console.log('scanEmails: abort requested, stopping early');
      aborted = true;
      break;
    }
    const msg = data.messages[idx];
    const email = await getEmailDetails(token, msg.id);

    const headers = {};
    email.payload.headers.forEach(h => headers[h.name.toLowerCase()] = h.value);

    const sender = headers["from"] || "";
    const subject = headers["subject"] || "";
    const body = email.snippet || "";

    const analysis = analyzeEmail(sender, subject, body);

    let deleted = false;
    let deleteError = null;
    // For borderline and higher (score >= 10) confirm with AI. If AI confirms, move to trash.
    let confirmedByAI = false;
    let aiResponse = null;
    if (analysis.score >= 10) {
      try {
        const ai = await confirmWithAI(body);
        confirmedByAI = ai.confirmed;
        aiResponse = ai.data;
        if (confirmedByAI) {
          try {
            console.log(`AI confirmed suspicious. Moving message ${msg.id} to trash (score=${analysis.score})`);
            await moveToTrash(token, msg.id);
            deleted = true;
            console.log(`Moved message ${msg.id} to trash`);
          } catch (err) {
            deleteError = err.message || String(err);
            deleted = false;
            console.warn(`Failed to move message ${msg.id} to trash:`, deleteError);
          }
        }
      } catch (err) {
        console.warn('Error confirming with AI for message', msg.id, err);
      }
    }

    // Only include emails that are suspicious or confirmed malicious (by heuristic score or AI)
    if (analysis.score >= 30 || confirmedByAI) {
      results.push({
        sender,
        subject,
        body,
        score: analysis.score,
        risk: analysis.level,
        deleted,
        deleteError,
        confirmedByAI,
        aiResponse
      });
    }
    // send progress update after each message
    chrome.runtime.sendMessage({ action: 'scanProgress', current: idx + 1, total: totalMessages }).catch(() => {});
  }

  const resultObj = { totalMessages, emails: results };
  if (aborted) resultObj.aborted = true;
  return resultObj;
}

// keep a simple object in memory to track latest scan
let currentScanStatus = { status: 'idle' };

function setScanStatus(obj) {
  // merge new properties into currentScanStatus and persist
  currentScanStatus = { ...currentScanStatus, ...obj };
  chrome.storage.local.set({ scanStatus: currentScanStatus });
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "scanEmails") {
    // legacy support: run scan synchronously and return results (used by popup before)
    scanEmails(req.fromDate, req.toDate)
      .then(res => sendResponse({ success: true, ...res }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (req.action === 'startScan') {
    // avoid starting another scan while one is running
    if (currentScanStatus.status === 'scanning') {
      sendResponse({ success: false, error: 'Scan already in progress' });
      return;
    }

    setScanStatus({ status: 'scanning', fromDate: req.fromDate, toDate: req.toDate });
    // notify listening windows
    chrome.runtime.sendMessage({ action: 'scanStarted' });

    scanEmails(req.fromDate, req.toDate)
      .then(res => {
        if (res.aborted) {
          setScanStatus({ status: 'cancelled', results: res });
          chrome.runtime.sendMessage({ action: 'scanError', error: 'Scan cancelled' });
        } else {
          setScanStatus({ status: 'done', results: res });
          chrome.runtime.sendMessage({ action: 'scanCompleted', result: res });
        }
      })
      .catch(err => {
        setScanStatus({ status: 'error', error: err.message });
        chrome.runtime.sendMessage({ action: 'scanError', error: err.message });
      });
    sendResponse({ success: true });
    return true;
  }

  if (req.action === 'cancelScan') {
    if (currentScanStatus.status === 'scanning') {
      scanAbort = true;
      setScanStatus({ status: 'cancelled' });
      chrome.runtime.sendMessage({ action: 'scanError', error: 'Scan cancelled' });
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: 'No scan running' });
    }
    return true;
  }

  if (req.action === 'getScanStatus') {
    chrome.storage.local.get('scanStatus', (data) => {
      sendResponse({ success: true, status: data.scanStatus || { status: 'idle' } });
    });
    return true;
  }
});

// Auto-start URL scanner on page navigation if scanning is active
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.storage.local.get(['urlScannerActive'], (result) => {
      if (result.urlScannerActive) {
        // Send message to start scanning on the new page
        chrome.tabs.sendMessage(tabId, { action: 'startScanning' }).catch(() => {
          // Content script not yet loaded, it will check storage on load
        });
      }
    });
  }
});