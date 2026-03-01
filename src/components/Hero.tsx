"use client";
import { useEffect, useRef } from "react";
import ChromeButton from "@/components/ChromeButton";

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("visible"), 100);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-[#0ea5e9]/8 blur-[120px] pointer-events-none" />

      {/* Trust badge */}
      <div
        ref={badgeRef}
        className="reveal mb-8 flex items-center gap-2 bg-white border border-[#ddd8cf] rounded-full px-4 py-2 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse-slow inline-block" />
        <span className="text-xs font-semibold text-[#475569] tracking-wide uppercase">
          AI-Powered · Real-Time Protection
        </span>
        <span className="text-xs font-medium text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">
          Free
        </span>
      </div>

      {/* Headline */}
      <h1 className="reveal reveal-delay-1 max-w-3xl text-center text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[#0f172a] mb-6">
        Detect Phishing{" "}
        <span className="gradient-text">Before It Detects You</span>
      </h1>

      {/* Subtitle */}
      <p className="reveal reveal-delay-2 max-w-xl text-center text-lg md:text-xl text-[#64748b] font-normal leading-relaxed mb-10">
          Mailed It scans every email, link, and website you visit — flagging
          threats in milliseconds using advanced AI models trained on millions of
          phishing patterns. Phishing doesn't stand a chance.
      </p>

        {/* CTA buttons */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 mb-16">
          <ChromeButton source="hero" variant="primary" />
          <a
            href="https://youtu.be/jsT8J_KJJqA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border border-[#ddd8cf] text-[#1e3a5f] font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-[#f7f4ef] hover:border-[#1e3a5f]/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
            </svg>
            See How It Works
          </a>
        </div>

      {/* Hero visual — browser mockup */}
      <div className="reveal reveal-delay-4 w-full max-w-3xl">
        <BrowserMockup />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-[#64748b]">Scroll</span>
        <div className="w-5 h-8 border border-[#94a3b8] rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#94a3b8] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function BrowserMockup() {
  return (
    <div className="rounded-2xl border border-[#ddd8cf] shadow-2xl shadow-[#0f172a]/10 overflow-hidden bg-white">

      {/* ── Title bar — neutral OS chrome ── */}
      <div className="bg-[#f1ede6] border-b border-[#ddd8cf]">

        {/* Window controls row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          {/* Generic square window-control buttons (Windows-style close/min/max on the right, tab strip on left) */}
          <div className="flex items-center gap-1 text-[#94a3b8]">
            {/* Minimise */}
            <button className="w-7 h-5 flex items-center justify-center rounded hover:bg-[#e2ddd6] transition-colors">
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                <rect width="10" height="1.5" rx="0.75" fill="#94a3b8" />
              </svg>
            </button>
            {/* Maximise */}
            <button className="w-7 h-5 flex items-center justify-center rounded hover:bg-[#e2ddd6] transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1" stroke="#94a3b8" strokeWidth="1.5" />
              </svg>
            </button>
            {/* Close */}
            <button className="w-7 h-5 flex items-center justify-center rounded hover:bg-[#ef4444]/20 transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mailed It extension badge */}
          <div className="flex items-center gap-1.5 bg-[#ef4444]/10 border border-[#ef4444]/25 px-2.5 py-1 rounded-md">
            <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
            <span className="text-[10px] font-bold text-[#ef4444] tracking-wide uppercase">Threat Detected</span>
          </div>
        </div>

        {/* Address bar */}
        <div className="flex items-center gap-2 px-4 pb-3">
          {/* Back / forward */}
          <div className="flex items-center gap-0.5 text-[#94a3b8]">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#e2ddd6] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#e2ddd6] transition-colors opacity-40 cursor-not-allowed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* URL bar */}
          <div className="flex-1 bg-white rounded-md px-3 py-1.5 flex items-center gap-2 border border-[#ef4444]/40 ring-1 ring-[#ef4444]/15">
            {/* Padlock — red = untrusted */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
            <span className="text-xs text-[#ef4444] font-medium truncate">
              https://secure-paypal-verify.suspicious-domain.net/login
            </span>
          </div>

          {/* Reload */}
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#e2ddd6] transition-colors text-[#94a3b8]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="relative bg-white p-6 min-h-[280px]">
        {/* Blurred fake login skeleton */}
        <div className="max-w-xs mx-auto space-y-3 opacity-25 blur-[1px]">
          <div className="h-8 bg-[#e2e8f0] rounded-lg w-32 mx-auto" />
          <div className="h-4 bg-[#e2e8f0] rounded w-48 mx-auto" />
          <div className="h-10 bg-[#e2e8f0] rounded-lg w-full mt-4" />
          <div className="h-10 bg-[#e2e8f0] rounded-lg w-full" />
          <div className="h-10 bg-[#1e3a5f]/30 rounded-lg w-full" />
        </div>

        {/* Mailed It overlay alert */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-[#ef4444]/20 shadow-2xl shadow-[#ef4444]/10 p-6 w-full max-w-sm">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" fill="#ef4444" />
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-[#0f172a] text-sm">Phishing Site Detected</div>
                <div className="text-xs text-[#64748b] mt-0.5">Mailed It blocked this page</div>
              </div>
            </div>

            {/* Threat bars */}
            <div className="bg-[#fef2f2] rounded-xl p-3 mb-4 space-y-2">
              {[
                { label: "Domain spoofing",       score: 96 },
                { label: "Credential harvesting", score: 88 },
                { label: "Fake SSL badge",        score: 74 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#64748b]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[#fee2e2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ef4444] rounded-full" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#ef4444] w-7 text-right">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-[#ef4444] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#dc2626] transition-colors">
                Block &amp; Go Back
              </button>
              <button className="flex-1 bg-[#f1ede6] text-[#64748b] text-xs font-medium py-2 rounded-lg hover:bg-[#e8e3d9] transition-colors">
                Proceed Anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
