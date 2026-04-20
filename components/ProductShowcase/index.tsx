"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

const products = [
  {
    id: 1,
    name: "Signature Espresso",
    origin: "Ethiopia · Yirgacheffe",
    price: "$6",
    notes: ["Dark Chocolate", "Blackcurrant", "Cedar"],
    emoji: "☕",
    description:
      "A single-origin espresso pulled at 9 bar for exactly 28 seconds. Dense, syrupy, unforgettable.",
  },
  {
    id: 2,
    name: "Velvet Latte",
    origin: "Colombia · Huila",
    price: "$8",
    notes: ["Brown Sugar", "Hazelnut", "Vanilla"],
    emoji: "🥛",
    description:
      "Micro-foamed oat milk poured over a double ristretto. A masterclass in texture and sweetness.",
  },
  {
    id: 3,
    name: "Cold Brew Noir",
    origin: "Guatemala · Antigua",
    price: "$7",
    notes: ["Dark Toffee", "Tobacco", "Black Cherry"],
    emoji: "🧊",
    description:
      "Steeped cold for 24 hours. Bold, smooth, and with an obsidian depth that defines our brand.",
  },
  {
    id: 4,
    name: "Batch Ceremony",
    origin: "Kenya · Nyeri",
    price: "$5",
    notes: ["Lemon Zest", "Jasmine", "Honey"],
    emoji: "🫖",
    description:
      "Filter coffee elevated to ritual. Brewed to order in a precision-pour batch every morning.",
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div ref={trackRef} className="flex items-stretch" style={{ width: "max-content" }}>
        {/* Section label — fixed left panel */}
        <div
          className="flex-shrink-0 w-screen flex flex-col justify-center px-12 md:px-24"
          style={{ minHeight: "100vh" }}
        >
          <p
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Our Selection
          </p>
          <h2
            className="text-5xl md:text-7xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              lineHeight: 1.05,
            }}
          >
            Crafted
            <br />
            for the
            <br />
            <span style={{ color: "var(--accent)" }}>discerning.</span>
          </h2>
          <p
            className="mt-6 max-w-sm text-base leading-relaxed opacity-60"
            style={{ color: "var(--text-secondary)" }}
          >
            Each cup is a deliberate act. Drag to explore our current selection
            of specialty offerings.
          </p>
          {/* Drag hint */}
          <div className="mt-10 flex items-center gap-3 opacity-40">
            <div
              className="w-8 h-px"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Scroll right
            </span>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path
                d="M0 6h18M13 1l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--accent)" }}
              />
            </svg>
          </div>
        </div>

        {/* Product cards */}
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex-shrink-0 flex items-center px-8 md:px-16"
            style={{ minHeight: "100vh" }}
          >
            <div
              className="relative w-72 md:w-96 border p-8 flex flex-col gap-5 transition-all duration-500 group cursor-pointer"
              style={{
                borderColor: "var(--border)",
                background: `rgba(26, 15, 8, 0.6)`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Index */}
              <span
                className="absolute top-6 right-8 text-6xl font-bold opacity-5"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div
                className="text-5xl"
                style={{ lineHeight: 1 }}
              >
                {product.emoji}
              </div>

              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {product.origin}
                </p>
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  {product.name}
                </h3>
              </div>

              <p
                className="text-sm leading-relaxed opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                {product.description}
              </p>

              {/* Tasting notes */}
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs px-3 py-1 border tracking-wider uppercase"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  {product.price}
                </span>
                <button
                  className="text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 hover:opacity-100"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--bg-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-32" />
      </div>
    </section>
  );
}
