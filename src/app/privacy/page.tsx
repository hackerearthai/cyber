export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <a href="/" className="inline-flex items-center gap-2 text-[#0ea5e9] text-sm mb-8 hover:underline">
            ← Back to Home
          </a>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-[#0ea5e9]/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2.5" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                <path d="M2 8l8.5 5.5a3 3 0 0 0 3 0L22 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="17.5" cy="16.5" r="4" fill="#0ea5e9" stroke="white" strokeWidth="1.2"/>
                <path d="M15.5 16.5l1.2 1.2 2.1-2.2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-extrabold text-white text-[1.15rem]">Mailed<span className="text-[#0ea5e9]">It</span></span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-[#64748b] text-sm">Last updated: 26th February, 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-[#94a3b8] text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Introduction</h2>
            <p>MailedIt is an AI-powered Chrome extension that analyzes email content and web links to detect potential phishing threats. It also provides real-time safety indications when users hover over links in their browser.</p>
            <p className="mt-3">This Privacy Policy explains how we access, use, and protect user data.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Information We Access</h2>
            <p className="mb-3">When you use MailedIt, we may access:</p>
            <ul className="space-y-2 list-none">
              {[
                "Email content (subject and body text)",
                "Sender information",
                "Links contained within emails",
                "Basic Gmail metadata (such as message ID and labels)",
                "URLs that users interact with or hover over in the browser (for safety analysis)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">This access is granted through the Gmail API using secure OAuth authorization provided by Google. MailedIt only requests the minimum permissions necessary to provide its functionality.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. How We Use the Information</h2>
            <p className="mb-3">The accessed data is used solely to:</p>
            <ul className="space-y-2 list-none">
              {[
                "Analyze emails for phishing indicators",
                "Evaluate links for potential security risks",
                "Generate AI-based risk scores",
                "Provide explanations for detected threats",
                "Allow users to optionally move suspicious emails to trash",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">We do not use email or browsing data for advertising, profiling, or marketing.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Data Storage</h2>
            <ul className="space-y-2 list-none">
              {[
                "We do not permanently store email content on our servers.",
                "Email and link data are processed temporarily for analysis.",
                "We do not sell, rent, or share user data with third parties.",
                "If external AI APIs are used for analysis, only the necessary text or URL data is transmitted securely over HTTPS and is not retained beyond processing.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Data Security</h2>
            <p>We implement appropriate technical safeguards to protect user data during transmission and processing. All communication between the extension, our servers (if applicable), and third-party APIs is encrypted using HTTPS.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. User Control</h2>
            <p className="mb-3">Users can:</p>
            <ul className="space-y-2 list-none">
              {[
                "Revoke access at any time from their Google Account permissions page.",
                "Uninstall the extension at any time.",
                "Choose whether or not to move flagged emails to trash.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">MailedIt does not automatically delete emails without user interaction.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Third-Party Services</h2>
            <p className="mb-3">MailedIt integrates with:</p>
            <ul className="space-y-2 list-none">
              {[
                "Google OAuth for authentication",
                "Gmail API for email access",
                "AI APIs for phishing detection analysis",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">Each third-party service operates under its own privacy policies and terms.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Contact</h2>
            <p>For questions regarding this Privacy Policy, contact:{" "}
              <a href="mailto:ruasthon@gmail.com" className="text-[#0ea5e9] hover:underline">
                ruasthon@gmail.com
              </a>
            </p>
          </section>

        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-white/5 text-[#475569] text-xs">
          © {new Date().getFullYear()} Mailed It. All rights reserved.
        </div>
      </div>
    </main>
  );
}
