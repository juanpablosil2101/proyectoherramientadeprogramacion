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

      gsap.from(quote, {
        opacity: 0,
        y: 60,
        duration: 1.2,
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
      style={{ height: "80vh", minHeight: "480px" }}
    >
      {/* Parallax photo */}
      <div
        ref={bgRef}
        className="absolute inset-[-25%] w-[150%]"
      >
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2400&q=80"
          alt="Dark espresso in a matte black cup resting on a bed of roasted beans"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{ filter: "saturate(0.75) brightness(0.65)" }}
        />
      </div>

      {/* Multi-layer overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,8,5,0.35) 0%, rgba(10,8,5,0.72) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,5,0.9) 0%, rgba(10,8,5,0) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(0deg, rgba(10,8,5,0.9) 0%, rgba(10,8,5,0) 100%)",
        }}
      />

      {/* Quote content */}
      <div
        ref={quoteRef}
        className="relative z-10 text-center px-8 md:px-16 max-w-4xl mx-auto"
      >
        <span
          className="block text-[5rem] leading-none mb-4 opacity-25"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-display)",
          }}
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote
          className="font-bold leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            fontSize: "clamp(1.75rem, 5vw, 4.5rem)",
            letterSpacing: "-0.02em",
            textShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          Coffee is not a drink.
          <br />
          <span style={{ color: "var(--accent)" }}>
            It is a state of mind.
          </span>
        </blockquote>
        <cite
          className="block mt-8 text-[10px] tracking-[0.6em] uppercase not-italic opacity-50"
          style={{ color: "var(--text-secondary)" }}
        >
          — Obsidian Coffee, Since 2019
        </cite>
      </div>
    </section>
  );
}
