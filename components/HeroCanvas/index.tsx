"use client";

import { useRef, useEffect, useState } from "react";
import { useCanvasScroll } from "./useCanvasScroll";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useCanvasScroll(canvasRef, 90);

  useEffect(() => {
    function onScroll() {
      const progress = Math.min(
        Math.max(document.documentElement.scrollTop / window.innerHeight, 0),
        1
      );
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const taglineVisible = scrollProgress > 0.75;

  return (
    /* Hero zone: sticky canvas + 2x scroll space */
    <section
      style={{ height: "200vh" }}
      className="relative"
      aria-label="Hero"
    >
      {/* Sticky wrapper so canvas stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Top nav overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
          <span
            className="text-xl tracking-[0.3em] uppercase font-semibold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
          >
            Obsidian
          </span>
          <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
            {["Menu", "Story", "Reserve"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors duration-300 hover:opacity-100 opacity-60"
                style={{ color: "var(--text-primary)" }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Initial headline — fades out as scroll progresses */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 4),
            transform: `translateY(${scrollProgress * -40}px)`,
            transition: "none",
          }}
        >
          <p
            className="text-sm tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Premium Specialty Coffee
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-none"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Obsidian
            <br />
            Coffee
          </h1>
          <p
            className="mt-6 text-base md:text-lg tracking-widest uppercase opacity-50"
            style={{ color: "var(--text-secondary)" }}
          >
            Scroll to discover
          </p>
          {/* Animated scroll indicator */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <div
              className="w-px h-12 animate-pulse"
              style={{ background: "var(--accent)", opacity: 0.6 }}
            />
          </div>
        </div>

        {/* Tagline — appears at the end of the canvas animation */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: taglineVisible ? (scrollProgress - 0.75) * 4 : 0,
            transform: `translateY(${taglineVisible ? (1 - scrollProgress) * 30 : 30}px)`,
            transition: "none",
          }}
        >
          <p
            className="text-sm tracking-[0.5em] uppercase mb-6"
            style={{ color: "var(--accent)" }}
          >
            The art of the perfect cup
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              lineHeight: 1.1,
            }}
          >
            Crafted with
            <br />
            <span style={{ color: "var(--accent)" }}>obsession.</span>
          </h2>
          <a
            href="#menu"
            className="mt-10 pointer-events-auto px-8 py-3 text-sm tracking-[0.3em] uppercase border transition-all duration-300 hover:bg-opacity-100"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "var(--accent)";
              (e.target as HTMLElement).style.color = "var(--bg-primary)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
          >
            Explore Menu
          </a>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] z-30 transition-none"
          style={{
            width: `${scrollProgress * 100}%`,
            background: "var(--accent)",
          }}
        />
      </div>
    </section>
  );
}
