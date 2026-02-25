"use client";
import { useState } from "react";

const TESTS = [
  {
    name: "SQL Injection",
    description: "Tests for SQL injection vulnerabilities in URL parameters",
    severity: "Critical" as const,
    weight: 25,
    check: (url: string) =>
      ["'", '"', "or 1=1", "union select"].some((p) =>
        url.toLowerCase().includes(p)
      ),
  },
  {
    name: "XSS (Cross-Site Scripting)",
    description: "Checks for potential XSS vulnerabilities",
    severity: "High" as const,
    weight: 20,
    check: (url: string) =>
      ["<script", "javascript:", "onerror=", "onload="].some((p) =>
        url.toLowerCase().includes(p)
      ),
  },
  {
    name: "HTTPS / SSL Check",
    description: "Verifies if the site uses HTTPS",
    severity: "Medium" as const,
    weight: 10,
    check: (url: string) => !url.startsWith("https://"),
  },
  {
    name: "Directory Traversal",
    description: "Tests for directory traversal attempts",
    severity: "High" as const,
    weight: 20,
    check: (url: string) =>
      ["../", "..\\", "%2e%2e"].some((p) => url.toLowerCase().includes(p)),
  },
  {
    name: "Command Injection",
    description: "Checks for command injection patterns",
    severity: "Critical" as const,
    weight: 25,
    check: (url: string) =>
      ["|", ";", "&&", "`", "$("].some((p) => url.includes(p)),
  },
  {
    name: "Open Redirect",
    description: "Looks for open redirect vulnerabilities",
    severity: "Medium" as const,
    weight: 10,
    check: (url: string) =>
      ["redirect=", "url=", "next=", "return="].some((p) =>
        url.toLowerCase().includes(p)
      ),
  },
  {
    name: "URL Shortener",
    description: "Detects URL shorteners that may hide malicious destinations",
    severity: "Medium" as const,
    weight: 10,
    check: (url: string) =>
      ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "rb.gy"].some(
        (s) => url.includes(s)
      ),
  },
  {
    name: "IP Address URL",
    description: "Detects URLs using raw IP addresses instead of domain names",
    severity: "High" as const,
    weight: 18,
    check: (url: string) => /https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url),
  },
  {
    name: "Fake Domain",
    description:
      "Detects typosquatted or fake domains impersonating popular sites",
    severity: "Critical" as const,
    weight: 25,
    check: (url: string) =>
      [
        "paypa1", "arnazon", "g00gle", "faceb00k", "micros0ft",
        "app1e", "netfl1x", "lnstagram", "twltter", "linkedln",
      ].some((f) => url.toLowerCase().includes(f)),
  },
  {
    name: "Phishing Keywords",
    description: "Detects common phishing keywords in the URL",
    severity: "High" as const,
    weight: 20,
    check: (url: string) =>
      [
        "login-verify", "account-suspended", "verify-now",
        "update-billing", "confirm-identity", "secure-login",
        "account-locked", "unusual-activity", "verify-account", "password-reset",
      ].some((k) => url.toLowerCase().includes(k)),
  },
  {
    name: "Suspicious TLD",
    description: "Detects suspicious top-level domains commonly used in malicious sites",
    severity: "Medium" as const,
    weight: 12,
    check: (url: string) =>
      [".xyz", ".top", ".club", ".work", ".click", ".loan", ".gq", ".ml", ".cf", ".tk"].some(
        (t) => url.toLowerCase().includes(t)
      ),
  },
  {
    name: "Data Theft Patterns",
    description: "Detects patterns used to steal sensitive data like passwords or card info",
    severity: "Critical" as const,
    weight: 25,
    check: (url: string) =>
      ["passwd=", "password=", "creditcard=", "ssn=", "cvv=", "bankaccount="].some(
        (p) => url.toLowerCase().includes(p)
      ),
  },
];

type Severity = "Critical" | "High" | "Medium" | "Low";

const severityConfig: Record<Severity, { bg: string; text: string; border: string }> = {
  Critical: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200"     },
  High:     { bg: "bg-orange-50",  text: "text-orange-600",  border: "border-orange-200"  },
  Medium:   { bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200"   },
  Low:      { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
};

interface Result {
  name: string;
  description: string;
  severity: Severity;
  weight: number;
  vulnerable: boolean;
}

function computeThreatScore(results: Result[]): number {
  const maxScore = TESTS.reduce((sum, t) => sum + t.weight, 0);
  const hitScore = results.filter((r) => r.vulnerable).reduce((sum, r) => sum + r.weight, 0);
  return Math.min(100, Math.round((hitScore / maxScore) * 100));
}

function getRiskBand(score: number): {
  label: string;
  color: string;
  needle: string;
  glow: string;
  bg: string;
  border: string;
} {
  if (score === 0)  return { label: "Safe",        color: "#10b981", needle: "#10b981", glow: "shadow-emerald-200", bg: "bg-emerald-50",  border: "border-emerald-200" };
  if (score <= 25)  return { label: "Low Risk",    color: "#f59e0b", needle: "#f59e0b", glow: "shadow-amber-200",   bg: "bg-amber-50",    border: "border-amber-200"   };
  if (score <= 55)  return { label: "Medium Risk", color: "#f97316", needle: "#f97316", glow: "shadow-orange-200",  bg: "bg-orange-50",   border: "border-orange-200"  };
  if (score <= 80)  return { label: "High Risk",   color: "#ef4444", needle: "#ef4444", glow: "shadow-red-200",     bg: "bg-red-50",      border: "border-red-200"     };
  return             { label: "Critical",          color: "#991b1b", needle: "#991b1b", glow: "shadow-red-300",     bg: "bg-red-100",     border: "border-red-300"     };
}

/** SVG semicircle riskometer */
function Riskometer({ score, band }: { score: number; band: ReturnType<typeof getRiskBand> }) {
  // Arc goes from 180° (left) to 0° (right) — a half circle
  // We map score 0→100 to angle 180°→0°
  const angle = 180 - (score / 100) * 180; // degrees from the right horizontal
  const rad = (angle * Math.PI) / 180;
  const cx = 110, cy = 100, r = 80;
  const needleLength = 68;
  const nx = cx + needleLength * Math.cos(rad);
  const ny = cy - needleLength * Math.sin(rad);

  // Gradient arc segments (coloured track)
  function arcPath(startDeg: number, endDeg: number, radius: number) {
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(Math.PI - s);
    const y1 = cy - radius * Math.sin(Math.PI - s);
    const x2 = cx + radius * Math.cos(Math.PI - e);
    const y2 = cy - radius * Math.sin(Math.PI - e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  }

  const segments = [
    { start: 0,   end: 25,  color: "#10b981" }, // safe – green
    { start: 25,  end: 55,  color: "#f59e0b" }, // low – amber
    { start: 55,  end: 80,  color: "#f97316" }, // medium – orange
    { start: 80,  end: 100, color: "#ef4444" }, // high – red
  ];

  return (
    <svg viewBox="0 0 220 115" className="w-full max-w-[260px]" aria-label={`Threat score ${score}`}>
      {/* Track background */}
      <path
        d={arcPath(0, 100, r)}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Coloured segments */}
      {segments.map((seg) => (
        <path
          key={seg.color}
          d={arcPath(seg.start, seg.end, r)}
          fill="none"
          stroke={seg.color}
          strokeWidth="14"
          strokeLinecap="butt"
          opacity="0.35"
        />
      ))}
      {/* Active filled arc */}
      {score > 0 && (
        <path
          d={arcPath(0, score, r)}
          fill="none"
          stroke={band.color}
          strokeWidth="14"
          strokeLinecap="round"
        />
      )}
      {/* Tick marks */}
      {[0, 25, 55, 80, 100].map((tick) => {
        const tr = ((tick / 100) * 180 * Math.PI) / 180;
        const innerR = r - 10;
        const outerR = r + 4;
        const tx1 = cx + innerR * Math.cos(Math.PI - tr);
        const ty1 = cy - innerR * Math.sin(Math.PI - tr);
        const tx2 = cx + outerR * Math.cos(Math.PI - tr);
        const ty2 = cy - outerR * Math.sin(Math.PI - tr);
        return <line key={tick} x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#cbd5e1" strokeWidth="1.5" />;
      })}
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke={band.color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Needle hub */}
      <circle cx={cx} cy={cy} r="6" fill={band.color} />
      <circle cx={cx} cy={cy} r="3" fill="white" />
      {/* Score label */}
      <text
        x={cx}
        y={cy - 18}
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        fill={band.color}
        fontFamily="system-ui, sans-serif"
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        fontSize="7"
        fill="#94a3b8"
        fontFamily="system-ui, sans-serif"
        letterSpacing="1"
      >
        THREAT SCORE
      </text>
      {/* Labels */}
      <text x="16" y="112" fontSize="7" fill="#94a3b8" fontFamily="system-ui, sans-serif">Safe</text>
      <text x="192" y="112" fontSize="7" fill="#94a3b8" textAnchor="end" fontFamily="system-ui, sans-serif">Critical</text>
    </svg>
  );
}

export default function URLScanner() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [filter, setFilter] = useState<"all" | "vulnerable" | "safe">("all");

  function scan() {
    if (!url.trim()) return;
    setScanning(true);
    setScanned(false);
    setResults([]);
    setFilter("all");

    setTimeout(() => {
      const res: Result[] = TESTS.map((t) => ({
        name: t.name,
        description: t.description,
        severity: t.severity,
        weight: t.weight,
        vulnerable: t.check(url.trim()),
      }));
      setResults(res);
      setScanning(false);
      setScanned(true);
    }, 900);
  }

  const total = results.length;
  const vulnCount = results.filter((r) => r.vulnerable).length;
  const safeCount = total - vulnCount;
  const threatScore = computeThreatScore(results);
  const band = getRiskBand(threatScore);

  const displayed =
    filter === "all"
      ? results
      : filter === "vulnerable"
      ? results.filter((r) => r.vulnerable)
      : results.filter((r) => !r.vulnerable);

  return (
    <section id="scanner" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#0ea5e9] mb-4">
            Live Scanner
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-5 tracking-tight">
            Scan any URL{" "}
            <span className="gradient-text">right now</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-[#64748b] leading-relaxed">
            Paste a suspicious URL and get an instant threat score across 12 vulnerability categories.
          </p>
        </div>

        {/* Input */}
        <div className="bg-[#f7f4ef] rounded-2xl border border-[#ddd8cf] p-6 mb-8">
          <label className="block text-sm font-semibold text-[#0f172a] mb-2">
            URL to scan
          </label>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !scanning && scan()}
              placeholder="https://example.com?id=1"
              className="flex-1 px-4 py-3 rounded-xl border border-[#ddd8cf] bg-white text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/40 focus:border-[#0ea5e9] text-sm font-mono transition-all"
            />
            <button
              onClick={scan}
              disabled={scanning || !url.trim()}
              className="px-6 py-3 rounded-xl bg-[#0f172a] text-white font-semibold text-sm hover:bg-[#1e3a5f] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 justify-center whitespace-nowrap"
            >
              {scanning ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30 60" />
                  </svg>
                  Scanning...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  Scan URL
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-[#94a3b8] mt-2">
            Try:{" "}
            <code className="bg-white px-1.5 py-0.5 rounded border border-[#ddd8cf] text-[#0ea5e9]">
              http://paypa1.com/login-verify?passwd=abc
            </code>
          </p>
        </div>

        {/* Scanning pulse */}
        {scanning && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-[#0ea5e9]/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-[#0f172a] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" fill="#0ea5e9" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[#0f172a] font-semibold">Analyzing URL...</div>
              <div className="text-[#94a3b8] text-sm mt-1">Running 12 threat checks</div>
            </div>
          </div>
        )}

        {/* Results */}
        {scanned && !scanning && (
          <div className="space-y-6">
            {/* Riskometer + stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Riskometer card */}
              <div className={`rounded-2xl border p-6 flex flex-col items-center justify-center ${band.bg} ${band.border}`}>
                <Riskometer score={threatScore} band={band} />
                <div
                  className="mt-2 text-lg font-black tracking-tight"
                  style={{ color: band.color }}
                >
                  {band.label}
                </div>
                <div className="text-xs text-[#64748b] mt-0.5">Overall Threat Level</div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 content-start">
                <div className="bg-[#f7f4ef] border border-[#ddd8cf] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-[#0f172a]">{total}</div>
                  <div className="text-xs text-[#64748b] mt-1 font-medium">Total Checks</div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-red-500">{vulnCount}</div>
                  <div className="text-xs text-red-400 mt-1 font-medium">Threats Found</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-emerald-600">{safeCount}</div>
                  <div className="text-xs text-emerald-500 mt-1 font-medium">Passed</div>
                </div>
                <div className={`rounded-2xl p-4 text-center border ${band.bg} ${band.border}`}>
                  <div className="text-3xl font-black" style={{ color: band.color }}>{threatScore}</div>
                  <div className="text-xs text-[#64748b] mt-1 font-medium">Threat Score</div>
                </div>
              </div>
            </div>

            {/* Risk bar */}
            <div className="bg-[#f7f4ef] border border-[#ddd8cf] rounded-2xl p-4">
              <div className="flex justify-between text-xs font-semibold text-[#64748b] mb-2">
                <span>Threat Score</span>
                <span style={{ color: band.color }}>{threatScore} / 100</span>
              </div>
              <div className="h-3 bg-[#e2e8f0] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${threatScore}%`, backgroundColor: band.color }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#94a3b8] mt-1">
                <span>Safe</span>
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Critical</span>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
              {(["all", "vulnerable", "safe"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                    filter === f
                      ? "bg-[#0f172a] text-white"
                      : "bg-[#f7f4ef] text-[#64748b] border border-[#ddd8cf] hover:bg-[#eee8df]"
                  }`}
                >
                  {f === "all"
                    ? `All (${total})`
                    : f === "vulnerable"
                    ? `Threats (${vulnCount})`
                    : `Safe (${safeCount})`}
                </button>
              ))}
            </div>

            {/* Result cards */}
            <div className="space-y-3">
              {displayed.map((r) => {
                const sev = severityConfig[r.severity];
                return (
                  <div
                    key={r.name}
                    className={`flex items-center gap-4 bg-white border rounded-xl px-5 py-4 shadow-sm ${
                      r.vulnerable
                        ? "border-l-4 border-l-red-400 border-[#f3e8e8]"
                        : "border-[#ddd8cf]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        r.vulnerable ? "bg-red-100" : "bg-emerald-100"
                      }`}
                    >
                      {r.vulnerable ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
                          <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[#0f172a] font-semibold text-sm">{r.name}</div>
                      <div className="text-[#94a3b8] text-xs mt-0.5">{r.description}</div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sev.bg} ${sev.text} ${sev.border}`}>
                        {r.severity}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          r.vulnerable
                            ? "bg-red-50 text-red-500 border-red-200"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200"
                        }`}
                      >
                        {r.vulnerable ? "Vulnerable" : "Safe"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
