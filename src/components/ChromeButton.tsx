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

function defaultContent(variant: string) {
  const shieldIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"
        fill="currentColor"
      />
    </svg>
  );
  const arrowIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="group-hover:translate-x-1 transition-transform"
    >
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (variant === "nav") return "Add to Chrome";
  return (
    <>
      {shieldIcon}
      Add to Chrome — Free
      {arrowIcon}
    </>
  );
}
