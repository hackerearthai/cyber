function scanURL(url) {
    const tests = [
        { name: 'SQL Injection', patterns: ["'", '"', 'or 1=1', 'union select'] },
        { name: 'XSS', patterns: ['<script', 'javascript:', 'onerror=', 'onload='] },
        { name: 'HTTPS Check', custom: (url) => !url.startsWith('https://') },
        { name: 'Directory Traversal', patterns: ['../', '..\\', '%2e%2e'] },
        { name: 'Command Injection', patterns: ['|', ';', '&&', '`', '$('] },
        { name: 'Open Redirect', patterns: ['redirect=', 'url=', 'next='] },
        { name: 'URL Shortener', custom: (url) => ['bit.ly','tinyurl.com','t.co','goo.gl','ow.ly'].some(s => url.includes(s)) },
        { name: 'IP Address URL', custom: (url) => /https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url) },
        { name: 'Fake Domain', custom: (url) => ['paypa1','g00gle','micros0ft','arnazon'].some(f => url.toLowerCase().includes(f)) }
    ];

    let score = 0;
    const lower = url.toLowerCase();

    tests.forEach(test => {
        if (test.custom) {
            if (test.custom(url)) score += 20;
        } else if (test.patterns.some(p => lower.includes(p))) {
            score += 20;
        }
    });

    let level = "Low";
    if (score >= 60) level = "High";
    else if (score >= 30) level = "Moderate";

    return { score, level };
}

document.addEventListener("mouseover", function (e) {
    const link = e.target.closest("a");
    if (!link || !link.href) return;

    const old = document.getElementById("mailedit-popup");
    if (old) old.remove();

    const result = scanURL(link.href);

    const colors = {
        Low: "#00ffff",
        Moderate: "#ffcc00",
        High: "#ff0033"
    };

    const div = document.createElement("div");
    div.id = "mailedit-popup";
    div.style.cssText = `
        position:fixed;
        top:${e.clientY + 20}px;
        left:${e.clientX + 20}px;
        background:#111827;
        color:white;
        padding:12px 16px;
        border-radius:12px;
        z-index:999999;
        font-size:13px;
        border:2px solid ${colors[result.level]};
        box-shadow:0 8px 20px rgba(0,0,0,0.5);
        pointer-events:none;
    `;

    div.innerHTML = `
        <div style="font-weight:bold;font-size:14px;">Mailedit URL Scan</div>
        <div style="margin-top:6px;color:${colors[result.level]};font-weight:bold;">
            ${result.level} Risk
        </div>
        <div style="font-size:12px;margin-top:4px;">
            Score: ${result.score}
        </div>
    `;

    document.body.appendChild(div);
});

document.addEventListener("mouseout", function (e) {
    if (e.target.closest("a")) {
        const p = document.getElementById("mailedit-popup");
        if (p) p.remove();
    }
});