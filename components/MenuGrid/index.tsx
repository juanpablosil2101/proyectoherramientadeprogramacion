"use client";

import { motion } from "framer-motion";

const menuItems = [
  {
    category: "Espresso",
    name: "Ristretto",
    price: "$5",
    desc: "A hyper-concentrated 15ml shot. Pure, syrupy intensity.",
  },
  {
    category: "Espresso",
    name: "Lungo",
    price: "$5.5",
    desc: "Extended pull revealing the bean's full floral complexity.",
  },
  {
    category: "Milk",
    name: "Flat White",
    price: "$7",
    desc: "Micro-foam over a double ristretto. Ratio: 1:3.",
  },
  {
    category: "Milk",
    name: "Cortado",
    price: "$6.5",
    desc: "Equal parts espresso and steamed milk. Balance perfected.",
  },
  {
    category: "Filter",
    name: "V60 Pour-Over",
    price: "$8",
    desc: "Hand-poured for 3 minutes. Clean, bright, meditative.",
  },
  {
    category: "Filter",
    name: "AeroPress",
    price: "$7",
    desc: "Full immersion for 2 minutes. Smooth, low-acid.",
  },
  {
    category: "Cold",
    name: "Nitro Cold Brew",
    price: "$9",
    desc: "Nitrogen-infused for a creamy head. Zero dairy, all texture.",
  },
  {
    category: "Cold",
    name: "Shakerato",
    price: "$8",
    desc: "Espresso shaken over ice. Silky crema, chilled to order.",
  },
  {
    category: "Seasonal",
    name: "Honey Latte",
    price: "$9",
    desc: "Wild-sourced Ethiopian honey blended into a ceremonial latte.",
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function MenuGrid() {
  return (
    <section
      className="py-24 px-8 md:px-16 lg:px-24"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Full Menu
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              lineHeight: 1.05,
            }}
          >
            Every cup,
            <br />a statement.
          </h2>
        </div>
        <p
          className="max-w-xs text-sm leading-relaxed opacity-60"
          style={{ color: "var(--text-secondary)" }}
        >
          Our menu changes seasonally to reflect peak harvest windows from our
          partner farms worldwide.
        </p>
      </motion.div>

      {/* Divider */}
      <div
        className="w-full h-px mb-12 opacity-20"
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
          <motion.div
            key={item.name}
            variants={cardVariants}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className="relative flex flex-col justify-between p-8 gap-4 cursor-pointer group"
            style={{
              background: "var(--bg-primary)",
              transition: "background 0.3s ease",
            }}
            onHoverStart={(e) => {
              (e.target as HTMLElement).style.background = "var(--bg-secondary)";
            }}
            onHoverEnd={(e) => {
              (e.target as HTMLElement).style.background = "var(--bg-primary)";
            }}
          >
            {/* Category tag */}
            <span
              className="text-xs tracking-widest uppercase self-start px-2 py-1 border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              {item.category}
            </span>

            <div>
              <h3
                className="text-xl md:text-2xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
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

            <div className="flex items-center justify-between">
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                {item.price}
              </span>
              <motion.span
                initial={{ x: -8, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                → Add
              </motion.span>
            </div>

            {/* Bottom gold line on hover */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
              style={{ background: "var(--accent)" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
