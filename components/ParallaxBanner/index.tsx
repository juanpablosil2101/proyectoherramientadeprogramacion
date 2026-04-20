"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export default function ParallaxBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const bg = bgRef.current;
    const quote = quoteRef.current;
    if (!section || !bg || !quote) return;

    const ctx = gsap.context(() => {
      // Parallax: background moves slower than scroll
      gsap.to(bg, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Quote reveal
      gsap.from(quote, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: "70vh", minHeight: "400px" }}
    >
      {/* Parallax background (synthetic gradient "photo") */}
      <div
        ref={bgRef}
        className="absolute inset-[-20%] w-[140%]"
        style={{
          background: `
            radial-gradient(ellipse at 20% 60%, rgba(201,168,76,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(139,94,60,0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(74,44,26,0.4) 0%, transparent 70%),
            linear-gradient(135deg, #0a0805 0%, #2d1a0e 40%, #1a0f08 70%, #0a0805 100%)
          `,
        }}
      >
        {/* Large decorative coffee ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[40px] opacity-[0.04]"
          style={{
            width: "80vw",
            height: "80vw",
            maxWidth: "900px",
            maxHeight: "900px",
            borderColor: "var(--accent)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 opacity-[0.06]"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            borderColor: "var(--accent)",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,8,5,0.6)" }}
      />

      {/* Quote content */}
      <div
        ref={quoteRef}
        className="relative z-10 text-center px-8 md:px-16 max-w-4xl mx-auto"
      >
        <div
          className="text-6xl mb-6 opacity-20"
          style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
        >
          &ldquo;
        </div>
        <blockquote
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          Coffee is not a drink.
          <br />
          <span style={{ color: "var(--accent)" }}>
            It is a state of mind.
          </span>
        </blockquote>
        <cite
          className="block mt-8 text-xs tracking-[0.5em] uppercase not-italic opacity-50"
          style={{ color: "var(--text-secondary)" }}
        >
          — Obsidian Coffee, Since 2019
        </cite>
      </div>
    </section>
  );
}
