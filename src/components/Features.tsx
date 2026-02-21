"use client";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"
          fill="currentColor"
          className="text-[#1e3a5f]"
        />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Real-Time Phishing Detection",
    description:
      "Every page load is analyzed in under 80ms. Our AI cross-references 200+ threat signals to stop phishing before you see it.",
    badge: "< 80ms",
    badgeColor: "text-[#10b981] bg-[#10b981]/10",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" strokeLinecap="round" />
      </svg>
    ),
    title: "Intelligent Email Scanning",
    description:
      "Integrates with Gmail, Outlook, and Webmail. Flags suspicious sender patterns, spoofed domains, and deceptive subject lines.",
    badge: "Gmail + Outlook",
    badgeColor: "text-[#0ea5e9] bg-[#0ea5e9]/10",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Malicious URL Detection",
    description:
      "Scans every URL before you click — including shortened links, lookalike domains, and newly registered suspicious sites.",
    badge: "Zero-day ready",
    badgeColor: "text-[#f59e0b] bg-[#f59e0b]/10",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
      </svg>
    ),
    title: "Instant Browser Alerts",
    description:
      "Non-intrusive popups surface threat scores, specific risk indicators, and one-click block actions so you're always in control.",
    badge: "Non-intrusive",
    badgeColor: "text-[#8b5cf6] bg-[#8b5cf6]/10",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
    title: "Fake Website Fingerprinting",
    description:
      "Detects cloned websites that mimic banks, social platforms, and e-commerce stores — even when the design looks identical.",
    badge: "99.2% accuracy",
    badgeColor: "text-[#10b981] bg-[#10b981]/10",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Threat Intelligence",
    description:
      "Continuously learns from global threat feeds and community reports. Your protection improves every single day, automatically.",
    badge: "Self-learning",
    badgeColor: "text-[#0ea5e9] bg-[#0ea5e9]/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#0ea5e9] mb-4">
            Protection Suite
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-5 tracking-tight">
            Everything you need to stay{" "}
            <span className="gradient-text">cyber safe</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-[#64748b] leading-relaxed">
            Six layers of AI-powered defense — working silently in the background
            every time you browse, email, or click.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card reveal reveal-delay-${(i % 4) + 1} bg-white rounded-2xl p-6 border border-[#ddd8cf] shadow-sm`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#f7f4ef] border border-[#ddd8cf] flex items-center justify-center mb-5">
                {f.icon}
              </div>

              {/* Badge */}
              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-3 inline-block ${f.badgeColor}`}>
                {f.badge}
              </span>

              <h3 className="text-[#0f172a] font-bold text-lg mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
