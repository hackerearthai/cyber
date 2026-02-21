"use client";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Extension Activates",
    description:
        "Mailed It loads silently when Chrome starts. No setup required — it monitors every tab you open automatically from day one.",
    visual: <StepVisualActivate />,
  },
  {
    number: "02",
    title: "AI Scans in Real Time",
    description:
      "When you visit a page or open an email, our AI analyzes 200+ threat signals including domain age, SSL patterns, and content fingerprints.",
    visual: <StepVisualScan />,
  },
  {
    number: "03",
    title: "Threat Score Generated",
    description:
      "A risk score from 0–100 is assigned in under 80ms. Scores above 70 trigger a warning; above 90 triggers automatic blocking.",
    visual: <StepVisualScore />,
  },
  {
    number: "04",
    title: "You're Protected",
    description:
      "Safe sites get a green badge. Suspicious sites get flagged with detail. Dangerous sites are blocked with a clear explanation.",
    visual: <StepVisualProtected />,
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#0ea5e9] mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
            From click to protection{" "}
            <span className="text-[#0ea5e9]">in milliseconds</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-[#94a3b8] leading-relaxed">
            A seamless four-step process that keeps you safe without interrupting
            your workflow.
          </p>
        </div>

        {/* Step tabs */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeStep === i
                  ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/25"
                  : "bg-white/5 text-[#94a3b8] border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className={`text-xs font-black ${activeStep === i ? "text-white/70" : "text-[#475569]"}`}>
                {step.number}
              </span>
              {step.title}
            </button>
          ))}
        </div>

        {/* Active step */}
        <div className="reveal grid md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-full px-3 py-1.5 mb-6">
              <span className="text-[#0ea5e9] font-black text-xs">Step {steps[activeStep].number}</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-4 leading-tight">
              {steps[activeStep].title}
            </h3>
            <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
              {steps[activeStep].description}
            </p>

            {/* Progress dots */}
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeStep ? "w-8 bg-[#0ea5e9]" : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 md:order-2">{steps[activeStep].visual}</div>
        </div>
      </div>
    </section>
  );
}

/* ---- Step Visuals ---- */

function StepVisualActivate() {
  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-6 h-72 flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-[#1e3a5f] flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" fill="#0ea5e9" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#10b981] rounded-full border-2 border-[#1e293b] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="text-center">
          <div className="text-white font-bold mb-1">Mailed It Activated</div>
        <div className="text-[#94a3b8] text-sm">Monitoring all 4 open tabs</div>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((t) => (
          <div key={t} className="w-16 h-8 bg-white/5 border border-white/10 rounded-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepVisualScan() {
  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-6 h-72 flex flex-col justify-center gap-4 overflow-hidden relative">
      {/* Scanning animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="w-full h-1 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent"
          style={{ animation: "scan-line 2s linear infinite" }}
        />
      </div>
      <div className="relative z-10 space-y-3">
        <div className="text-[#94a3b8] text-xs font-mono mb-4">Analyzing: https://secure-paypal-verify...</div>
        {[
          { label: "Domain age check", status: "complete", value: "2 days old — suspicious" },
          { label: "SSL certificate", status: "complete", value: "Self-signed — invalid" },
          { label: "Content fingerprint", status: "scanning", value: "Scanning..." },
          { label: "Threat database", status: "pending", value: "Queued" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
            <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
              item.status === "complete" ? "bg-[#ef4444]" :
              item.status === "scanning" ? "bg-[#f59e0b] animate-pulse" : "bg-white/20"
            }`} />
            <span className="text-white/70 text-xs flex-1">{item.label}</span>
            <span className={`text-xs ${item.status === "complete" ? "text-[#ef4444]" : item.status === "scanning" ? "text-[#f59e0b]" : "text-white/30"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepVisualScore() {
  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-6 h-72 flex flex-col items-center justify-center gap-5">
      {/* Circular score */}
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff10" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeDasharray={`${(94 / 100) * 251} 251`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-[#ef4444]">94</span>
          <span className="text-[9px] text-[#94a3b8] font-medium tracking-wider uppercase">Risk Score</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-[#ef4444] font-bold text-sm uppercase tracking-wide">Critical Threat</div>
        <div className="text-[#94a3b8] text-xs mt-1">Page blocked automatically</div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {[
          { label: "Domain", score: 96 },
          { label: "Content", score: 88 },
          { label: "SSL", score: 92 },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-[#ef4444] font-bold text-sm">{item.score}%</div>
            <div className="text-[#64748b] text-[10px]">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepVisualProtected() {
  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-6 h-72 flex flex-col justify-center gap-4">
      {[
        {
          url: "paypal.com",
          status: "safe",
          label: "Safe",
          score: 2,
          color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20",
          dot: "bg-[#10b981]",
        },
        {
          url: "gmail.com/inbox",
          status: "safe",
          label: "Safe",
          score: 5,
          color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20",
          dot: "bg-[#10b981]",
        },
        {
          url: "secure-paypal-verify.net",
          status: "blocked",
          label: "Blocked",
          score: 94,
          color: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
          dot: "bg-[#ef4444]",
        },
        {
          url: "amaz0n-delivery-track.com",
          status: "warned",
          label: "Warning",
          score: 71,
          color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20",
          dot: "bg-[#f59e0b]",
        },
      ].map((site) => (
        <div key={site.url} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${site.dot}`} />
          <span className="text-white/70 text-xs flex-1 font-mono truncate">{site.url}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${site.color}`}>
            {site.label}
          </span>
          <span className="text-[#475569] text-xs w-6 text-right">{site.score}</span>
        </div>
      ))}
    </div>
  );
}
