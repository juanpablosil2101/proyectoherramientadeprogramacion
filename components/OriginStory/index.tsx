"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

const words = [
  "Every",
  "bean",
  "carries",
  "a",
  "story.",
  "We",
  "travel",
  "to",
  "the",
  "highlands",
  "of",
  "Ethiopia,",
  "the",
  "volcanic",
  "slopes",
  "of",
  "Guatemala,",
  "and",
  "the",
  "sun-drenched",
  "hills",
  "of",
  "Kenya—",
  "searching",
  "for",
  "the",
  "extraordinary.",
];

const stats = [
  { value: "12", label: "Origin Countries" },
  { value: "48h", label: "Max Roast-to-Cup" },
  { value: "94°", label: "Brew Temperature" },
  { value: "28s", label: "Espresso Pull" },
];

export default function OriginStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const textEl = textRef.current;
    const statsEl = statsRef.current;
    if (!section || !textEl || !statsEl) return;

    const wordEls = textEl.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      // Reveal words one by one
      gsap.fromTo(
        wordEls,
        { opacity: 0.1, color: "rgba(139, 94, 60, 0.4)" },
        {
          opacity: 1,
          color: "var(--text-primary)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "70% top",
            pin: true,
            scrub: 0.8,
          },
        }
      );

      // Stats fade in
      gsap.from(statsEl.querySelectorAll(".stat-item"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsEl,
          start: "top 80%",
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{
        background: "var(--bg-primary)",
        minHeight: "200vh",
        position: "relative",
      }}
    >
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center gap-16 px-8 md:px-16 lg:px-24 py-24">
        {/* Left: label + image accent */}
        <div className="flex-shrink-0 lg:w-1/3 flex flex-col gap-6">
          <p
            className="text-xs tracking-[0.5em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Our Origin
          </p>
          <div
            className="w-full max-w-xs aspect-[3/4] relative overflow-hidden"
            ref={imageOverlayRef}
          >
            {/* Synthetic image: layered canvas art replacement */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 80%, rgba(139,94,60,0.2) 0%, transparent 50%),
                  linear-gradient(160deg, #1a0f08 0%, #0a0805 50%, #2d1a0e 100%)
                `,
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontSize: "100px", opacity: 0.12 }}
            >
              ☕
            </div>
            {/* Corner accent lines */}
            <div
              className="absolute top-4 left-4 w-12 h-12 border-t border-l"
              style={{ borderColor: "var(--accent)" }}
            />
            <div
              className="absolute bottom-4 right-4 w-12 h-12 border-b border-r"
              style={{ borderColor: "var(--accent)" }}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--accent)", opacity: 0.7 }}
              >
                Single Origin
              </p>
            </div>
          </div>
        </div>

        {/* Right: animated text */}
        <div className="flex-1 flex flex-col gap-12">
          <div
            ref={textRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.25em]"
                style={{ color: "rgba(139, 94, 60, 0.4)" }}
              >
                {word}
              </span>
            ))}
          </div>

          <p
            className="text-base leading-relaxed max-w-lg opacity-60"
            style={{ color: "var(--text-secondary)" }}
          >
            We work directly with farmers. No intermediaries. Just trust, quality,
            and a shared belief that exceptional coffee changes lives on both
            sides of the cup.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        ref={statsRef}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-item flex flex-col items-center justify-center py-12 px-6 gap-2 ${
              i < 3 ? "border-r" : ""
            }`}
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="text-5xl md:text-6xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
              }}
            >
              {stat.value}
            </span>
            <span
              className="text-xs tracking-widest uppercase opacity-50"
              style={{ color: "var(--text-secondary)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
