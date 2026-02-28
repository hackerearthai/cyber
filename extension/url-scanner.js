// URL Scanner popup controller
let scannerActive = false;

function startScanner() {
    scannerActive = true;
    
    const startBtn = document.getElementById('start-scanner-btn');
    const stopBtn = document.getElementById('stop-scanner-btn');
    const statusDiv = document.getElementById('scanner-status');
    
    if (startBtn) startBtn.style.display = 'none';
    if (stopBtn) stopBtn.style.display = 'block';
    if (statusDiv) statusDiv.textContent = '';
    
    // Save scanner state to storage
    chrome.storage.local.set({ 'urlScannerActive': true });
    
    // Send message to active tab to start scanning
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            // we cannot communicate with chrome://, about:, file:// pages
            if (!tab.url || !tab.url.match(/^https?:\/\//)) {
                const msg = 'Cannot scan this page (not a web page).';
                console.warn(msg, tab.url);
                if (statusDiv) statusDiv.textContent = msg;
                return;
            }

            chrome.tabs.sendMessage(tab.id, { action: 'startScanning' }, (resp) => {
                if (chrome.runtime.lastError) {
                    console.warn('Initial sendMessage error:', chrome.runtime.lastError.message);
                    // try injecting script and resend
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content-script.js']
                    }, () => {
                        chrome.tabs.sendMessage(tab.id, { action: 'startScanning' }, (resp2) => {
                            if (chrome.runtime.lastError) {
                                console.error('Failed to start scanning after injection:', chrome.runtime.lastError.message);
                                if (statusDiv) statusDiv.textContent = 'Could not start scanner on this page.';
                            }
                        });
                    });
                }
            });
        }
    });
}

function stopScanner() {
    scannerActive = false;
    
    const startBtn = document.getElementById('start-scanner-btn');
    const stopBtn = document.getElementById('stop-scanner-btn');
    const statusDiv = document.getElementById('scanner-status');
    
    if (startBtn) startBtn.style.display = 'block';
    if (stopBtn) stopBtn.style.display = 'none';
    if (statusDiv) statusDiv.textContent = '';
    
    // Save scanner state to storage
    chrome.storage.local.set({ 'urlScannerActive': false });
    
    // Tell content script to stop scanning
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'stopScanning' }, (resp) => {
                if (chrome.runtime.lastError) {
                    console.warn('Could not reach content script');
                    if (statusDiv) statusDiv.textContent = 'Unable to contact content script';
                }
            });
        }
    });
}

// Initialize button listeners
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-scanner-btn');
    const stopBtn = document.getElementById('stop-scanner-btn');
    
    if (startBtn) startBtn.addEventListener('click', startScanner);
    if (stopBtn) stopBtn.addEventListener('click', stopScanner);
    
    // Check stored scanner state and update UI
    chrome.storage.local.get(['urlScannerActive'], (result) => {
        if (result.urlScannerActive) {
            if (startBtn) startBtn.style.display = 'none';
            if (stopBtn) stopBtn.style.display = 'block';
            scannerActive = true;
        }
    });
    
    // Listen for scanner stopped message from content script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'scannerStopped') {
            // Update UI to reflect that scanner is stopped
            if (startBtn) startBtn.style.display = 'block';
            if (stopBtn) stopBtn.style.display = 'none';
            scannerActive = false;
            chrome.storage.local.set({ 'urlScannerActive': false });
        }
    });
});
