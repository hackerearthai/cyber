"use client";
import { CHROME_STORE_URL } from "@/lib/constants";

interface ChromeButtonProps {
  source: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "blue" | "nav";
}

export default function ChromeButton({
  source,
  className,
  children,
  variant = "primary",
}: ChromeButtonProps) {
  const handleClick = () => {
      // Fire-and-forget click tracking
      fetch("/api/track-install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
      }).catch(() => {});
    };

    const base = className ?? defaultClass(variant);

    return (
      <a
        href={CHROME_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={base}
      >
        {children ?? defaultContent(variant)}
      </a>
    );
}

function defaultClass(variant: string) {
  if (variant === "primary")
    return "group flex items-center justify-center gap-3 bg-[#1e3a5f] text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-[#0f172a] transition-all duration-200 hover:shadow-xl hover:shadow-[#1e3a5f]/25 hover:-translate-y-0.5";
  if (variant === "blue")
    return "group flex items-center justify-center gap-3 bg-[#0ea5e9] text-white font-bold text-base px-8 py-3.5 rounded-xl hover:bg-[#0284c7] transition-all duration-200 hover:shadow-xl hover:shadow-[#0ea5e9]/30 hover:-translate-y-0.5";
  if (variant === "nav")
    return "bg-[#1e3a5f] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0f172a] transition-all duration-200 hover:shadow-md";
  return "";
}

function ChromeLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
      {/* Red top segment */}
      <path d="M128 28 C172.18 28 209.7 55.3 224.6 94 L128 94 C113.1 94 99.8 101.3 91.6 112.6 L46.4 37.4 C64.9 30.8 96.1 28 128 28Z" fill="#EA4335"/>
      {/* Yellow right segment */}
      <path d="M224.6 94 C233.4 105 228 162 210.2 186.4 L163.9 111.3 C159.7 104.1 153 98.6 145.1 96 L224.6 94Z" fill="#FBBC05"/>
      {/* Green bottom segment */}
      <path d="M210.2 186.4 C194.4 210.4 167.9 226 128 226 C89.5 226 57.3 205.5 40.4 175 L87.3 99.8 C91.4 107 97.9 112.6 105.8 115.3 L56.2 200.1 C70.6 213.5 98.1 220 128 220 C157.9 220 182.7 208.1 197.5 188.2 L210.2 186.4Z" fill="#34A853"/>
      {/* White ring */}
      <circle cx="128" cy="128" r="44" fill="white"/>
      {/* Blue centre */}
      <circle cx="128" cy="128" r="32" fill="#4285F4"/>
    </svg>
  );
}

function defaultContent(variant: string) {
  const arrowIcon = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="group-hover:translate-x-1 transition-transform duration-200"
    >
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (variant === "nav")
      return (
        <span className="flex items-center gap-1.5">
          Add to Chrome
        </span>
      );

  return (
    <>
      <span className="font-bold text-base">Add to Chrome</span>
      {arrowIcon}
    </>
  );
}
