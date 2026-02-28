// scan.js handles displaying the progress/results stored by the background script

function renderEmails(emails, resultsDiv) {
  resultsDiv.innerHTML = "";
  emails.forEach(mail => {
    const div = document.createElement("div");
    const riskClass = (mail.risk || 'unknown').toString().toLowerCase();
    div.classList.add("email", riskClass);

    let aiInfo = '';
    if (mail.aiResponse) {
      if (mail.aiResponse.error || mail.aiResponse.detail) {
        aiInfo = `<div style="background:#ffe6e6;color:#800; padding:8px;border-radius:4px;margin-top:6px; font-size:12px;"><strong>Detection error:</strong> ${mail.aiResponse.error || mail.aiResponse.detail}</div>`;
      } else {
        aiInfo = `<pre style="font-size:11px;white-space:pre-wrap;">AI: ${JSON.stringify(mail.aiResponse)}</pre>`;
      }
    }

    div.innerHTML = `
      <h4>${mail.sender} — ${mail.subject}</h4>
      <p><strong>Score:</strong> ${mail.score}</p>
      <p><strong>Risk Level:</strong> ${mail.risk}</p>
      <p><strong>Body:</strong> ${mail.body}</p>
      <p><strong>Deleted:</strong> ${mail.deleted ? 'Yes' : 'No'} ${mail.deleteError ? '(' + mail.deleteError + ')' : ''}</p>
      <p><strong>Confirmed by AI:</strong> ${mail.confirmedByAI ? 'Yes' : 'No'}</p>
      ${aiInfo}
    `;
    resultsDiv.appendChild(div);
  });
}

function updateUI(statusObj) {
  const statusDiv = document.getElementById('status');
  const resultsDiv = document.getElementById('results');
  const cancelBtn = document.getElementById('cancel-scan-btn');

  // show or hide cancel button depending on state
  if (cancelBtn) {
    cancelBtn.style.display = statusObj && statusObj.status === 'scanning' ? 'inline-block' : 'none';
  }

  if (!statusObj || statusObj.status === 'idle') {
    statusDiv.textContent = 'No scan has been started yet.';
    resultsDiv.innerHTML = '';
    return;
  }

  if (statusObj.status === 'scanning') {
    statusDiv.textContent = 'Scanning emails...';
    resultsDiv.innerHTML = '';
  } else if (statusObj.status === 'done') {
    statusDiv.textContent = '';
    if (statusObj.results) {
      if (typeof statusObj.results.totalMessages === 'number' && statusObj.results.totalMessages === 0) {
        statusDiv.textContent = 'No emails found in your account.';
      } else if (!statusObj.results.emails || statusObj.results.emails.length === 0) {
        statusDiv.textContent = 'No suspicious mails found.';
      } else {
        renderEmails(statusObj.results.emails, resultsDiv);
      }
    }
  } else if (statusObj.status === 'error' || statusObj.status === 'cancelled') {
    statusDiv.textContent = `Scan ${statusObj.status}: ${statusObj.error || ''}`;
    resultsDiv.innerHTML = '';
  }
}

// ask background for current status
function requestStatus() {
  chrome.runtime.sendMessage({ action: 'getScanStatus' }, (resp) => {
    if (resp && resp.success) {
      updateUI(resp.status);
    }
  });
}

// listen for updates from background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'scanCompleted') {
    updateUI({ status: 'done', results: msg.result });
  } else if (msg.action === 'scanError') {
    updateUI({ status: 'error', error: msg.error });
  } else if (msg.action === 'scanStarted') {
    updateUI({ status: 'scanning' });
  } else if (msg.action === 'scanProgress') {
    updateUI({ status: 'scanning' });
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
      statusDiv.textContent = `Scanning emails... (${msg.current}/${msg.total})`;
    }
  }
});

// initial load
document.addEventListener('DOMContentLoaded', () => {
  const cancelBtn = document.getElementById('cancel-scan-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'cancelScan' }, resp => {
        if (resp && resp.success) {
          updateUI({ status: 'cancelled', error: '' });
        }
      });
    });
  }
  requestStatus();
});