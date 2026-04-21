"use client";

import { motion } from "framer-motion";

const UNSPLASH = "https://images.unsplash.com";

const menuItems = [
  {
    category: "Espresso",
    name: "Ristretto",
    price: "$5",
    desc: "A hyper-concentrated 15ml shot. Pure, syrupy intensity.",
    image: `${UNSPLASH}/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=75`,
    alt: "Ristretto in a small espresso cup",
  },
  {
    category: "Espresso",
    name: "Lungo",
    price: "$5.5",
    desc: "Extended pull revealing the bean's full floral complexity.",
    image: `${UNSPLASH}/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=75`,
    alt: "Lungo espresso with golden crema",
  },
  {
    category: "Milk",
    name: "Flat White",
    price: "$7",
    desc: "Micro-foam over a double ristretto. Ratio: 1:3.",
    image: `${UNSPLASH}/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=75`,
    alt: "Flat white with micro-foam in a matte ceramic cup",
  },
  {
    category: "Milk",
    name: "Cortado",
    price: "$6.5",
    desc: "Equal parts espresso and steamed milk. Balance perfected.",
    image: `${UNSPLASH}/photo-1485808191679-5f86510bd652?auto=format&fit=crop&w=800&q=75`,
    alt: "Cortado in a small glass with steamed milk",
  },
  {
    category: "Filter",
    name: "V60 Pour-Over",
    price: "$8",
    desc: "Hand-poured for 3 minutes. Clean, bright, meditative.",
    image: `${UNSPLASH}/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=800&q=75`,
    alt: "V60 pour-over with a gooseneck kettle",
  },
  {
    category: "Filter",
    name: "AeroPress",
    price: "$7",
    desc: "Full immersion for 2 minutes. Smooth, low-acid.",
    image: `${UNSPLASH}/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=75`,
    alt: "AeroPress being pressed into a ceramic cup",
  },
  {
    category: "Cold",
    name: "Nitro Cold Brew",
    price: "$9",
    desc: "Nitrogen-infused for a creamy head. Zero dairy, all texture.",
    image: `${UNSPLASH}/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=75`,
    alt: "Nitro cold brew cascading in a dark glass",
  },
  {
    category: "Cold",
    name: "Shakerato",
    price: "$8",
    desc: "Espresso shaken over ice. Silky crema, chilled to order.",
    image: `${UNSPLASH}/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=75`,
    alt: "Iced shakerato in a cocktail glass with golden foam",
  },
  {
    category: "Seasonal",
    name: "Honey Latte",
    price: "$9",
    desc: "Wild-sourced Ethiopian honey blended into a ceremonial latte.",
    image: `${UNSPLASH}/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=75`,
    alt: "Honey latte with a golden swirl in a wide ceramic cup",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function MenuGrid() {
  return (
    <section
      id="journal"
      className="py-24 md:py-36 lg:py-44 px-8 md:px-16 lg:px-24"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        <div>
          <p
            className="text-[10px] md:text-xs tracking-[0.6em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Full Menu · 09 Offerings
          </p>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Every cup,
            <br />a statement.
          </h2>
        </div>
        <p
          className="max-w-xs text-sm leading-relaxed opacity-60 md:text-right"
          style={{ color: "var(--text-secondary)" }}
        >
          Our menu changes seasonally to reflect peak harvest windows from our
          partner farms worldwide.
        </p>
      </motion.div>

      {/* Divider */}
      <div
        className="w-full h-px mb-16 opacity-20"
        style={{ background: "var(--accent)" }}
      />

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "var(--border)" }}
      >
        {menuItems.map((item) => (
          <motion.article
            key={item.name}
            variants={cardVariants}
            className="relative flex flex-col overflow-hidden cursor-pointer group"
            style={{ background: "var(--bg-primary)" }}
            whileHover={{ zIndex: 10 }}
          >
            {/* Background photo */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.18,
                filter: "saturate(0.6)",
              }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10,8,5,0.5) 0%, rgba(10,8,5,0.7) 100%)",
              }}
            />

            {/* Card content */}
            <div className="relative z-10 p-8 flex flex-col gap-4 h-full">
              <span
                className="text-[10px] tracking-[0.5em] uppercase self-start px-3 py-1 border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {item.category}
              </span>

              <div className="flex-1">
                <h3
                  className="text-xl md:text-2xl font-bold mb-2.5"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  {item.price}
                </span>
                <span
                  className="text-[10px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ color: "var(--accent)" }}
                >
                  Add →
                </span>
              </div>
            </div>

            {/* Gold line on hover */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left z-20"
              style={{ background: "var(--accent)" }}
              transition={{ duration: 0.35 }}
            />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
