"use client";

import { motion } from "framer-motion";

const links = {
  Coffee: ["Our Story", "Sourcing", "Roastery", "Sustainability"],
  Visit: ["Locations", "Reserve a Table", "Events", "Gift Cards"],
  Connect: ["Instagram", "Newsletter", "Press", "Wholesale"],
};

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}
    >
      {/* Newsletter CTA */}
      <div
        className="px-8 md:px-16 lg:px-24 py-20 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Stay in the know
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            New harvests. Seasonal menus.
            <br />
            <span style={{ color: "var(--accent)" }}>Delivered to your inbox.</span>
          </motion.h3>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 text-sm outline-none placeholder-opacity-40 bg-transparent border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
                background: "rgba(255,255,255,0.03)",
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--accent)";
              }}
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </div>

      {/* Main footer links */}
      <div
        className="px-8 md:px-16 lg:px-24 py-16 grid grid-cols-2 md:grid-cols-4 gap-12"
      >
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
          <span
            className="text-2xl tracking-[0.3em] uppercase font-bold"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            Obsidian
          </span>
          <p
            className="text-sm leading-relaxed opacity-50 max-w-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Premium specialty coffee sourced from the world&apos;s finest growing
            regions. Roasted to order. Served with intention.
          </p>
          {/* Social icons (text-based) */}
          <div className="flex gap-4">
            {["IG", "TW", "YT"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs tracking-widest w-9 h-9 border flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-40"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading} className="flex flex-col gap-4">
            <p
              className="text-xs tracking-widest uppercase font-semibold"
              style={{ color: "var(--accent)" }}
            >
              {heading}
            </p>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="px-8 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <p
          className="text-xs opacity-30"
          style={{ color: "var(--text-secondary)" }}
        >
          © 2025 Obsidian Coffee. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs opacity-30 hover:opacity-60 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
