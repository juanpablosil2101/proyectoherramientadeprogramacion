"use client";

import { useEffect, useRef, useState } from "react";

const UNSPLASH = "https://images.unsplash.com";

const frames = [
  {
    src: `${UNSPLASH}/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2400&q=80`,
    alt: "Espresso pouring into a ceramic cup surrounded by roasted beans",
    label: "No. 01 · The Pour",
  },
  {
    src: `${UNSPLASH}/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2400&q=80`,
    alt: "Macro close-up of freshly roasted coffee beans glowing in warm light",
    label: "No. 02 · The Bean",
  },
  {
    src: `${UNSPLASH}/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=2400&q=80`,
    alt: "Burlap sack filled with whole beans next to a dark ceramic cup",
    label: "No. 03 · The Origin",
  },
];

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/**
 * Triangular opacity window with smoothed edges.
 * Each frame has a "slot" in progress space; the active window around its slot
 * fades in → peaks → fades out, producing a seamless crossfade across frames.
 */
function frameOpacity(progress: number, index: number, total: number) {
  const slot = 1 / total;
  const center = slot * (index + 0.5);
  const halfWidth = slot * 1.05;
  const start = center - halfWidth;
  const end = center + halfWidth;
  if (progress <= start || progress >= end) return 0;
  if (progress <= center) return smoothstep(start, center, progress);
  return 1 - smoothstep(center, end, progress);
}

function frameScale(progress: number, index: number, total: number) {
  const slot = 1 / total;
  const center = slot * (index + 0.5);
  const halfWidth = slot * 1.05;
  const local =
    (progress - (center - halfWidth)) / (halfWidth * 2);
  const clamped = Math.min(Math.max(local, 0), 1);
  // 1.15 → 1.0 → 0.92
  return 1.15 - clamped * 0.23;
}

export default function HeroShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Preload hero images for smooth crossfades
    frames.forEach((f) => {
      const img = new Image();
      img.src = f.src;
    });

    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    function update() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const activeIndex = Math.min(
    frames.length - 1,
    Math.floor(progress * frames.length)
  );

  const headlineOpacity = Math.max(0, 1 - progress * 2.4);
  const headlineShift = progress * -80;

  const taglineAppear = smoothstep(0.78, 0.98, progress);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh", background: "var(--bg-primary)" }}
      aria-label="Obsidian Coffee — Hero Showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame stack */}
        <div className="absolute inset-0">
          {frames.map((frame, i) => {
            const op = frameOpacity(progress, i, frames.length);
            const sc = frameScale(progress, i, frames.length);
            return (
              <div
                key={frame.src}
                aria-hidden={op < 0.05}
                className="absolute inset-0"
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  transition: "opacity 120ms linear",
                  willChange: "opacity, transform",
                }}
              >
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>

        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(10,8,5,0.15) 0%, rgba(10,8,5,0.5) 55%, rgba(10,8,5,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,8,5,0.85) 0%, rgba(10,8,5,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,8,5,1) 0%, rgba(10,8,5,0) 100%)",
          }}
        />

        {/* Frame label (top-left corner) */}
        <div className="absolute top-28 md:top-32 left-8 md:left-16 lg:left-24 z-10">
          <div className="flex items-center gap-3 opacity-80">
            <span
              className="w-6 h-px"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-[10px] md:text-xs tracking-[0.5em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              {frames[activeIndex].label}
            </span>
          </div>
        </div>

        {/* Main headline — fades out */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
          style={{
            opacity: headlineOpacity,
            transform: `translate3d(0, ${headlineShift}px, 0)`,
            willChange: "opacity, transform",
          }}
        >
          <p
            className="text-[10px] md:text-xs tracking-[0.7em] uppercase mb-8 opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Specialty Coffee — Est. 2019
          </p>
          <h1
            className="font-bold text-center leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              fontSize: "clamp(4rem, 14vw, 13rem)",
              letterSpacing: "-0.04em",
              textShadow: "0 30px 60px rgba(0,0,0,0.45)",
            }}
          >
            Obsidian
            <br />
            <span style={{ color: "var(--accent)" }}>Coffee</span>
          </h1>
          <div className="mt-12 flex flex-col items-center gap-3">
            <span
              className="text-[10px] tracking-[0.5em] uppercase opacity-50"
              style={{ color: "var(--text-primary)" }}
            >
              Scroll to experience
            </span>
            <span
              className="w-px h-10"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent), transparent)",
              }}
            />
          </div>
        </div>

        {/* Tagline — appears near the end */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
          style={{
            opacity: taglineAppear,
            transform: `translate3d(0, ${(1 - taglineAppear) * 40}px, 0)`,
            pointerEvents: taglineAppear > 0.6 ? "auto" : "none",
            willChange: "opacity, transform",
          }}
        >
          <p
            className="text-[10px] md:text-xs tracking-[0.7em] uppercase mb-6"
            style={{ color: "var(--accent)" }}
          >
            The art of the perfect cup
          </p>
          <h2
            className="font-bold text-center"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              textShadow: "0 24px 48px rgba(0,0,0,0.5)",
            }}
          >
            Crafted with
            <br />
            <span style={{ color: "var(--accent)" }}>obsession.</span>
          </h2>
          <a
            href="#menu"
            className="mt-12 inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.4em] uppercase rounded-full border transition-all duration-500"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
              background: "rgba(201, 168, 76, 0.08)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--accent)";
              el.style.color = "var(--bg-primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(201, 168, 76, 0.08)";
              el.style.color = "var(--accent)";
            }}
          >
            <span>Explore Menu</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M0 5h12M8 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Frame counter (bottom-right) */}
        <div className="absolute bottom-10 right-8 md:right-16 lg:right-24 z-10 flex items-center gap-5">
          <div className="flex gap-1.5">
            {frames.map((_, i) => (
              <span
                key={i}
                className="block h-px transition-all duration-500"
                style={{
                  width: activeIndex === i ? "36px" : "12px",
                  background:
                    activeIndex === i
                      ? "var(--accent)"
                      : "rgba(201,168,76,0.25)",
                }}
              />
            ))}
          </div>
          <span
            className="text-[10px] tracking-[0.5em] uppercase opacity-60"
            style={{ color: "var(--text-primary)" }}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
