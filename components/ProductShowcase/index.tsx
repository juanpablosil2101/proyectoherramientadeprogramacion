"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

const UNSPLASH = "https://images.unsplash.com";

const products = [
  {
    id: 1,
    name: "Signature Espresso",
    origin: "Ethiopia · Yirgacheffe",
    price: "$6",
    notes: ["Dark Chocolate", "Blackcurrant", "Cedar"],
    image: `${UNSPLASH}/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=80`,
    alt: "Double espresso shot with golden crema in a white ceramic demitasse",
    description:
      "A single-origin espresso pulled at 9 bar for exactly 28 seconds. Dense, syrupy, unforgettable.",
  },
  {
    id: 2,
    name: "Velvet Latte",
    origin: "Colombia · Huila",
    price: "$8",
    notes: ["Brown Sugar", "Hazelnut", "Vanilla"],
    image: `${UNSPLASH}/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80`,
    alt: "Latte with tulip pattern poured into a matte black cup",
    description:
      "Micro-foamed oat milk poured over a double ristretto. A masterclass in texture and sweetness.",
  },
  {
    id: 3,
    name: "Cold Brew Noir",
    origin: "Guatemala · Antigua",
    price: "$7",
    notes: ["Dark Toffee", "Tobacco", "Black Cherry"],
    image: `${UNSPLASH}/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80`,
    alt: "Dark cold brew coffee with ice in a tall glass",
    description:
      "Steeped cold for 24 hours. Bold, smooth, and with an obsidian depth that defines our brand.",
  },
  {
    id: 4,
    name: "Batch Ceremony",
    origin: "Kenya · Nyeri",
    price: "$5",
    notes: ["Lemon Zest", "Jasmine", "Honey"],
    image: `${UNSPLASH}/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=1200&q=80`,
    alt: "Pour-over coffee being prepared with a gooseneck kettle",
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
      <div
        ref={trackRef}
        className="flex items-stretch"
        style={{ width: "max-content" }}
      >
        {/* Intro panel */}
        <div
          className="flex-shrink-0 w-screen flex flex-col justify-center px-8 md:px-24 lg:px-32"
          style={{ minHeight: "100vh" }}
        >
          <p
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6"
            style={{ color: "var(--accent)" }}
          >
            Our Selection · 04 Icons
          </p>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Crafted
            <br />
            for the
            <br />
            <span style={{ color: "var(--accent)" }}>discerning.</span>
          </h2>
          <p
            className="mt-8 max-w-sm text-base leading-relaxed opacity-60"
            style={{ color: "var(--text-secondary)" }}
          >
            Each cup is a deliberate act. Follow the thread to explore our
            current selection of specialty offerings.
          </p>
          <div className="mt-12 flex items-center gap-3 opacity-70">
            <div
              className="w-10 h-px"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-[10px] tracking-[0.5em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Scroll to reveal
            </span>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <path
                d="M0 6h20M15 1l5 5-5 5"
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
            className="flex-shrink-0 flex items-center px-8 md:px-12 lg:px-16"
            style={{ minHeight: "100vh" }}
          >
            <article
              className="relative flex flex-col overflow-hidden rounded-[2px] group"
              style={{
                width: "clamp(18rem, 32vw, 26rem)",
                background: "rgba(26, 15, 8, 0.85)",
                border: "1px solid var(--border)",
                boxShadow:
                  "0 40px 80px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.05) inset",
              }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,8,5,0.2) 0%, rgba(10,8,5,0) 30%, rgba(10,8,5,0.85) 100%)",
                  }}
                />
                <span
                  className="absolute top-5 left-5 text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="absolute top-5 right-5 text-6xl font-bold opacity-15"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex flex-col gap-5">
                <div>
                  <p
                    className="text-[10px] tracking-[0.4em] uppercase mb-2 opacity-80"
                    style={{ color: "var(--accent)" }}
                  >
                    {product.origin}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
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

                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="text-[10px] px-3 py-1 border tracking-[0.2em] uppercase"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center justify-between pt-5 mt-2 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
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
                    className="text-[10px] tracking-[0.4em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: "var(--accent)",
                      color: "var(--accent)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "var(--accent)";
                      el.style.color = "var(--bg-primary)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "transparent";
                      el.style.color = "var(--accent)";
                    }}
                  >
                    Order
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-32" />
      </div>
    </section>
  );
}
