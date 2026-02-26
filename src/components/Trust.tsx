"use client";
import ChromeButton from "@/components/ChromeButton";

const badges = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" fill="#0ea5e9" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "SOC 2 Ready",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
      </svg>
    ),
    label: "Zero Data Stored",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "Chrome Web Store Verified",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    label: "24/7 Threat Updates",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Trust badges */}
        <div className="reveal text-center mb-20">
          <p className="text-xs font-bold tracking-widest uppercase text-[#94a3b8] mb-6">
            Security & Compliance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2.5 bg-white border border-[#ddd8cf] rounded-xl px-4 py-2.5 shadow-sm"
              >
                {b.icon}
                <span className="text-sm font-semibold text-[#0f172a]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="reveal mt-20 bg-[#0f172a] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#1e3a5f]/40 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Start protecting yourself{" "}
              <span className="text-[#0ea5e9]">right now</span>
            </h3>
            <p className="text-[#94a3b8] text-lg mb-8 max-w-md mx-auto">
              Free to install. No account needed. Protection starts the moment you
              add it to Chrome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ChromeButton source="trust-cta" variant="blue" />
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold text-base px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
