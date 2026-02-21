export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0a0f1a] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-[#0ea5e9]/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="2.5" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                    <path d="M2 8l8.5 5.5a3 3 0 0 0 3 0L22 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="17.5" cy="16.5" r="4" fill="#0ea5e9" stroke="white" strokeWidth="1.2"/>
                    <path d="M15.5 16.5l1.2 1.2 2.1-2.2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-extrabold text-white text-[1.15rem] tracking-tight leading-none">Mailed</span>
                  <span className="font-extrabold text-[#0ea5e9] text-[1.15rem] tracking-tight leading-none">It</span>
                </div>
              </div>
            <p className="text-[#64748b] text-sm leading-relaxed mb-5">
              AI-powered browser protection against phishing, malicious links, and
              fake websites. Free forever.
            </p>
            <div className="flex gap-3">
              {/* GitHub */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#94a3b8">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              {["Features", "How It Works", "Threat Database", "Changelog", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#64748b] hover:text-[#94a3b8] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Blog", "Press Kit", "Contact", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#64748b] hover:text-[#94a3b8] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">The Team</h4>
            <div className="space-y-3">
              {[
                { name: "Alex Mercer", role: "CEO & Security Researcher", initials: "AM", color: "bg-[#1e3a5f]" },
                { name: "Priya Nair", role: "Head of AI / ML", initials: "PN", color: "bg-[#0ea5e9]" },
                { name: "Dev Okonkwo", role: "Lead Extension Engineer", initials: "DO", color: "bg-[#8b5cf6]" },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {member.initials}
                  </div>
                  <div>
                    <div className="text-[#94a3b8] text-xs font-semibold">{member.name}</div>
                    <div className="text-[#475569] text-[10px]">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-[#64748b] text-xs mb-3">Get threat intelligence updates:</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#475569] outline-none focus:border-[#0ea5e9]/50 transition-colors min-w-0"
                />
                <button className="bg-[#0ea5e9] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#0284c7] transition-colors flex-shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-xs">
              © {new Date().getFullYear()} Mailed It. All rights reserved. Built to protect people, not profit from fear.
          </p>
          <div className="flex gap-6 text-xs text-[#475569]">
            <a href="#" className="hover:text-[#94a3b8] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#94a3b8] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#94a3b8] transition-colors">Security Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
