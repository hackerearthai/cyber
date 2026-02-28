// Content script for link scanning on all websites
let scannerEnabled = false;
const WIDGET_ID = 'mailedit-scanner-widget';

// Check if scanner should be enabled from storage
chrome.storage.local.get(['urlScannerActive'], (result) => {
    if (result.urlScannerActive) {
        scannerEnabled = true;
        setupLinkScanning();
    }
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.urlScannerActive) {
        if (changes.urlScannerActive.newValue && !scannerEnabled) {
            // Storage says scanner should be on, but it's not
            scannerEnabled = true;
            setupLinkScanning();
        } else if (!changes.urlScannerActive.newValue && scannerEnabled) {
            // Storage says scanner should be off, but it's on
            scannerEnabled = false;
            removeLinkScanning();
            removeFloatingWidget();
        }
    }
});

function createFloatingWidget() {
    // Remove existing widget if any
    const existing = document.getElementById(WIDGET_ID);
    if (existing) existing.remove();

    const widget = document.createElement('div');
    widget.id = WIDGET_ID;
    widget.classList.add('collapsed');
    widget.innerHTML = `
        <button id="mailedit-widget-toggle" class="widget-toggle">M</button>
        <div id="mailedit-widget-expanded" class="widget-expanded">
            <div class="widget-header">🔍 Scanner ON</div>
            <button id="mailedit-widget-stop" class="widget-stop-btn">Stop Scanning</button>
        </div>
    `;
    document.body.appendChild(widget);

    // Toggle expansion
    const toggleBtn = document.getElementById('mailedit-widget-toggle');
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.toggle('collapsed');
        widget.classList.toggle('expanded');
    });

    // Add click handler to stop button
    document.getElementById('mailedit-widget-stop').addEventListener('click', (e) => {
        e.stopPropagation();
        stopScannerOnPage();
    });
    
    // Make widget draggable
    makeWidgetDraggable(widget);
}

// Inject scoped styles for the link preview and widget (idempotent)
function injectScopedStyles() {
    if (document.getElementById('mailedit-scanner-styles')) return;
    const css = `
    /* Link Preview Popup Styles (scoped) */
    #link-preview-popup {
        position: fixed;
        z-index: 999999;
        background: #1a1a2e;
        color: #fff;
        border: 1px solid #444;
        border-radius: 10px;
        padding: 12px 16px;
        font-size: 13px;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        display: none;
        min-width: 220px;
        pointer-events: none;
    }
    .popup-url { color: #aaa; font-size: 11px; margin-bottom: 6px; word-break: break-all; }
    .popup-risk { font-size: 15px; font-weight: bold; margin-bottom: 6px; }
    .popup-stats { font-size: 12px; color: #ccc; }

    /* Floating Scanner Widget (scoped) */
    #mailedit-scanner-widget {
        position: fixed;
        right: 5px;
        top: 15px;
        z-index: 999998;
        background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
        border: 2px solid #27ae60;
        border-radius: 12px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        user-select: none;
        transition: all 0.3s ease;
    }
    #mailedit-scanner-widget.collapsed { padding: 0; min-width: auto; width: 48px; height: 48px; }
    #mailedit-scanner-widget.expanded { padding: 12px 16px; min-width: 160px; right: 5px; }
    .widget-toggle { background: transparent; border: none; color: white; font-size: 24px; font-weight: bold; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 10px; transition: all 0.3s ease; padding: 0; margin: 0; }
    .widget-toggle:hover { background: rgba(255,255,255,0.1); }
    #mailedit-scanner-widget.collapsed .widget-toggle { display: flex; }
    #mailedit-scanner-widget.expanded .widget-toggle { display: none; }
    .widget-expanded { color: white; font-size: 13px; display: none; }
    #mailedit-scanner-widget.expanded .widget-expanded { display: block; }
    .widget-header { font-weight: bold; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 6px; cursor: grab; }
    .widget-header:active { cursor: grabbing; }
    .widget-stop-btn { background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold; width: 100%; transition: background 0.2s; }
    .widget-stop-btn:hover { background: #c0392b; }
    #mailedit-scanner-widget.dragging { opacity: 0.9; }
    `;

    const style = document.createElement('style');
    style.id = 'mailedit-scanner-styles';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
}

function makeWidgetDraggable(widget) {
    let offsetX = 0;
    let offsetY = 0;
    let isDown = false;

    widget.addEventListener('mousedown', (e) => {
        // Only drag from the toggle button or header
        if (!e.target.closest('.widget-toggle') && !e.target.closest('.widget-header')) {
            return;
        }
        
        isDown = true;
        offsetX = e.clientX - widget.getBoundingClientRect().left;
        offsetY = e.clientY - widget.getBoundingClientRect().top;
        widget.classList.add('dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDown) {
            widget.style.left = (e.clientX - offsetX) + 'px';
            widget.style.top = (e.clientY - offsetY) + 'px';
            // Clear right positioning when dragging
            widget.style.right = 'auto';
        }
    });

    document.addEventListener('mouseup', () => {
        isDown = false;
        widget.classList.remove('dragging');
    });
}

function removeFloatingWidget() {
    const widget = document.getElementById(WIDGET_ID);
    if (widget) widget.remove();
}

function stopScannerOnPage() {
    scannerEnabled = false;
    removeLinkScanning();
    removeFloatingWidget();
    
    // Save state to storage
    chrome.storage.local.set({ 'urlScannerActive': false });
    
    // Notify popup that scanning has stopped
    chrome.runtime.sendMessage({ action: 'scannerStopped' }).catch(() => {
        // Popup might be closed, that's ok
    });
}

function scanURL(url) {
    const tests = [
        {
            name: 'SQL Injection',
            patterns: ["'", '"', 'or 1=1', 'union select']
        },
        {
            name: 'XSS',
            patterns: ['<script', 'javascript:', 'onerror=', 'onload=']
        },
        {
            name: 'HTTPS Check',
            custom: (url) => !url.startsWith('https://')
        },
        {
            name: 'Directory Traversal',
            patterns: ['../', '..\\', '%2e%2e']
        },
        {
            name: 'Command Injection',
            patterns: ['|', ';', '&&', '`', '$(']
        },
        {
            name: 'Open Redirect',
            patterns: ['redirect=', 'url=', 'next=', 'return=']
        },
        {
            name: 'URL Shortener',
            custom: (url) => {
                const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'short.io', 'tiny.cc', 'rb.gy'];
                return shorteners.some(s => url.includes(s));
            }
        },
        {
            name: 'IP Address URL',
            custom: (url) => /https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url)
        },
        {
            name: 'Fake Domain',
            custom: (url) => {
                const fakes = ['paypa1', 'arnazon', 'g00gle', 'faceb00k', 'micros0ft', 'app1e', 'netfl1x', 'lnstagram', 'twltter', 'linkedln'];
                return fakes.some(f => url.toLowerCase().includes(f));
            }
        },
        {
            name: 'Phishing Keywords',
            custom: (url) => {
                const keywords = ['login-verify', 'account-suspended', 'verify-now', 'update-billing', 'confirm-identity', 'secure-login', 'account-locked', 'unusual-activity', 'verify-account', 'password-reset'];
                return keywords.some(k => url.toLowerCase().includes(k));
            }
        },
        {
            name: 'Suspicious TLD',
            custom: (url) => {
                const tlds = ['.xyz', '.top', '.club', '.work', '.click', '.loan', '.gq', '.ml', '.cf', '.tk'];
                return tlds.some(t => url.toLowerCase().includes(t));
            }
        },
        {
            name: 'Data Theft Patterns',
            patterns: ['passwd=', 'password=', 'creditcard=', 'ssn=', 'cvv=', 'bankaccount=']
        }
    ];

    let vulnerable = 0;
    const urlLower = url.toLowerCase();

    tests.forEach(test => {
        if (test.custom) {
            if (test.custom(url)) vulnerable++;
        } else {
            if (test.patterns.some(p => urlLower.includes(p.toLowerCase()))) {
                vulnerable++;
            }
        }
    });

    return { vulnerable, safe: tests.length - vulnerable, total: tests.length };
}

// Listen for popup messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startScanning') {
        scannerEnabled = true;
        setupLinkScanning();
        sendResponse({ success: true });
    } else if (request.action === 'stopScanning') {
        scannerEnabled = false;
        removeLinkScanning();
        removeFloatingWidget();
        chrome.storage.local.set({ 'urlScannerActive': false });
        sendResponse({ success: true });
    }
});

function setupLinkScanning() {
    injectScopedStyles();
    createFloatingWidget();
    document.addEventListener('mouseover', handleLinkHover, true);
    document.addEventListener('mouseout', handleLinkOut, true);
}

function removeLinkScanning() {
    document.removeEventListener('mouseover', handleLinkHover, true);
    document.removeEventListener('mouseout', handleLinkOut, true);
    const popup = document.getElementById('link-preview-popup');
    if (popup) popup.remove();
}

function handleLinkHover(e) {
    if (!scannerEnabled) return;
    
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    // Skip non-http(s) links
    if (!link.href.startsWith('http://') && !link.href.startsWith('https://')) return;

    var old = document.getElementById('link-preview-popup');
    if (old) old.remove();

    const result = scanURL(link.href);
    const v = result.vulnerable;
    const isSafe = v === 0;
    
    const color = isSafe ? '#00ffff' : v <= 2 ? '#ffff00' : '#ff0000';
    const risk = isSafe ? '✅ SAFE' : v <= 2 ? '⚠️ MODERATE' : '🚨 HIGH RISK';

    var div = document.createElement('div');
    div.id = 'link-preview-popup';
    div.style.top = (e.clientY + 20) + 'px';
    div.style.left = (e.clientX + 20) + 'px';
    div.style.display = 'block';
    div.style.borderColor = color;
    
    div.innerHTML = '<div class="popup-url">' + link.href.slice(0,40) + '...</div>'
        + '<div class="popup-risk" style="color: ' + color + '">' + risk + '</div>'
        + '<div class="popup-stats">⚠️ ' + v + ' threats &nbsp; ✅ ' + result.safe + ' safe</div>';
    
    document.body.appendChild(div);
}

function handleLinkOut(e) {
    if (!scannerEnabled) return;
    
    if (e.target.closest('a')) {
        var p = document.getElementById('link-preview-popup');
        if (p) p.remove();
    }
}
