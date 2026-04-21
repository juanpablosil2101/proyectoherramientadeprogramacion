"use client";

import dynamic from "next/dynamic";

// All sections loaded client-side only to prevent hydration mismatches.
// Server renders nothing; client mounts all components consistently.
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const HeroShowcase = dynamic(() => import("@/components/HeroShowcase"), { ssr: false });
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), { ssr: false });
const OriginStory = dynamic(() => import("@/components/OriginStory"), { ssr: false });
const ParallaxBanner = dynamic(() => import("@/components/ParallaxBanner"), { ssr: false });
const MenuGrid = dynamic(() => import("@/components/MenuGrid"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroShowcase />
        <ProductShowcase />
        <OriginStory />
        <ParallaxBanner />
        <MenuGrid />
        <Footer />
      </main>
    </>
  );
}
