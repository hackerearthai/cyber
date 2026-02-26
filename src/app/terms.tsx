export default function TermsPage() {
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
            <span className="font-extrabold text-white text-[1.15rem]">
              Mailed<span className="text-[#0ea5e9]">It</span>
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Terms &amp; Conditions</h1>
          <p className="text-[#64748b] text-sm">Updated on 26th February, 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-[#94a3b8] text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Acceptance of Terms</h2>
            <p>By using MailedIt, you agree to these Terms and Conditions.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Service Description</h2>
            <p className="mb-3">MailedIt is an AI-powered phishing detection Chrome extension that:</p>
            <ul className="space-y-2 list-none">
              {[
                "Analyzes email content for potential phishing indicators",
                "Evaluates links for possible security risks",
                "Provides AI-generated risk assessments and explanations",
                "Allows users to optionally move suspicious emails to trash",
                "Any action taken on flagged emails, including moving them to trash or restoring them, is performed only with user confirmation.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. No Guarantee of Accuracy</h2>
            <p>While MailedIt uses AI to detect phishing attempts, we do not guarantee 100% accuracy. Users are responsible for reviewing flagged emails before taking action.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. User Responsibilities</h2>
            <p className="mb-3">Users agree to:</p>
            <ul className="space-y-2 list-none">
              {[
                "Use the extension for lawful purposes only.",
                "Not misuse the service.",
                "Understand that AI detection may produce false positives or false negatives.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. Limitation of Liability</h2>
            <p className="mb-3">MailedIt is provided "as is" without warranties of any kind. We are not liable for:</p>
            <ul className="space-y-2 list-none">
              {[
                "Missed phishing emails",
                "Incorrect classification",
                "Any damages resulting from use of the extension",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Modifications</h2>
            <p>We may update these terms at any time. Continued use of the extension constitutes acceptance of changes.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Termination</h2>
            <p>We reserve the right to suspend or discontinue the service at any time.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Governing Law</h2>
            <p>These terms shall be governed by applicable local laws.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Contact Information</h2>
            <p>
              For queries, complaints, or support, please contact:{" "}
              <a href="mailto:ruasthon@gmail.com" className="text-[#0ea5e9] hover:underline">
                ruasthon@gmail.com
              </a>
            </p>
          </section>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 text-[#475569] text-xs">
          © {new Date().getFullYear()} Mailed It. All rights reserved.
        </div>

      </div>
    </main>
  );
}
