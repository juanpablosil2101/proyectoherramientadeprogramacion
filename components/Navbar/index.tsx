"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);

      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(y / total, 1) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed z-50 left-1/2 -translate-x-1/2 top-6 md:top-8"
      style={{
        width: "calc(100% - 2rem)",
        maxWidth: "1200px",
      }}
    >
      <div
        className="relative flex items-center justify-between rounded-full border transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10, 8, 5, 0.72)"
            : "rgba(10, 8, 5, 0.42)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          borderColor: scrolled
            ? "rgba(201, 168, 76, 0.28)"
            : "rgba(201, 168, 76, 0.14)",
          padding: scrolled ? "0.65rem 0.9rem 0.65rem 1.5rem" : "0.85rem 1rem 0.85rem 1.75rem",
          boxShadow: scrolled
            ? "0 24px 60px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(201,168,76,0.04) inset"
            : "0 12px 40px -18px rgba(0, 0, 0, 0.35)",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 group"
          aria-label="Obsidian Coffee — Home"
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 12px rgba(201, 168, 76, 0.6)",
            }}
          />
          <span
            className="text-sm md:text-base tracking-[0.35em] uppercase font-semibold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            Obsidian
          </span>
          <span
            className="hidden md:inline text-xs tracking-[0.3em] uppercase opacity-40"
            style={{ color: "var(--text-secondary)" }}
          >
            Coffee
          </span>
        </a>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-xs tracking-[0.28em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300 group"
              style={{ color: "var(--text-primary)" }}
            >
              <span>{item.label}</span>
              <span
                className="absolute left-4 right-4 bottom-1 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: "var(--accent)" }}
              />
            </a>
          ))}
        </nav>

        {/* Order CTA */}
        <a
          href="#menu"
          className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-xs tracking-[0.28em] uppercase font-medium transition-all duration-300 group overflow-hidden"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "var(--accent-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "var(--accent)";
          }}
        >
          <span>Order</span>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M0 5h12M8 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Reading progress */}
        <span
          className="absolute left-6 right-6 bottom-0 h-px rounded-full overflow-hidden"
          style={{ background: "rgba(201, 168, 76, 0.08)" }}
        >
          <span
            className="block h-full origin-left"
            style={{
              width: `${progress * 100}%`,
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />
        </span>
      </div>
    </motion.header>
  );
}
