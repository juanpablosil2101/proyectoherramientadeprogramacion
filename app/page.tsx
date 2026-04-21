"use client";

import dynamic from "next/dynamic";

// All sections loaded client-side only to prevent hydration mismatches.
// Server renders <main></main>; client mounts all components consistently.
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), { ssr: false });
const OriginStory = dynamic(() => import("@/components/OriginStory"), { ssr: false });
const ParallaxBanner = dynamic(() => import("@/components/ParallaxBanner"), { ssr: false });
const MenuGrid = dynamic(() => import("@/components/MenuGrid"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroCanvas />
      <ProductShowcase />
      <OriginStory />
      <ParallaxBanner />
      <MenuGrid />
      <Footer />
    </main>
  );
}
