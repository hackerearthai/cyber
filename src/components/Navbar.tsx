"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ChromeButton from "@/components/ChromeButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f7f4ef]/95 backdrop-blur-md shadow-sm border-b border-[#ddd8cf]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            {/* Icon mark */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-[#0ea5e9]/20">
              {/* Envelope body */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2.5" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                <path d="M2 8l8.5 5.5a3 3 0 0 0 3 0L22 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Shield checkmark overlay */}
                <circle cx="17.5" cy="16.5" r="4" fill="#0ea5e9" stroke="white" strokeWidth="1.2"/>
                <path d="M15.5 16.5l1.2 1.2 2.1-2.2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex items-baseline gap-0.5">
              <span className="font-extrabold text-[#0f172a] text-[1.15rem] tracking-tight leading-none">
                Mailed
              </span>
              <span className="font-extrabold text-[#0ea5e9] text-[1.15rem] tracking-tight leading-none">
                It
              </span>

            </div>
          </div>

        {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
            <a href="#features" className="hover:text-[#0f172a] transition-colors">
              Features
            </a>
            <a href="#scanner" className="hover:text-[#0f172a] transition-colors">
              Scanner
            </a>
            <a href="#how-it-works" className="hover:text-[#0f172a] transition-colors">
              How It Works
            </a>
            <a href="#trust" className="hover:text-[#0f172a] transition-colors">
              Why Us
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://youtu.be/jsT8J_KJJqA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#1e3a5f] hover:text-[#0f172a] transition-colors"
            >
              See Demo
            </a>
            <ChromeButton source="navbar" variant="nav" />
          </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#ddd8cf] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-[#0f172a] mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-[#0f172a] mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-[#0f172a] transition-all" />
        </button>
      </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#f7f4ef] border-t border-[#ddd8cf] px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[#475569]">
              <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-[#0f172a]">Features</a>
              <a href="#scanner" onClick={() => setMenuOpen(false)} className="hover:text-[#0f172a]">Scanner</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-[#0f172a]">How It Works</a>
              <a href="#trust" onClick={() => setMenuOpen(false)} className="hover:text-[#0f172a]">Why Us</a>
            <ChromeButton
              source="navbar-mobile"
              variant="nav"
              className="bg-[#1e3a5f] text-white font-semibold px-4 py-2 rounded-lg text-center text-sm hover:bg-[#0f172a] transition-all duration-200"
            />
          </div>
        )}
    </nav>
  );
}
