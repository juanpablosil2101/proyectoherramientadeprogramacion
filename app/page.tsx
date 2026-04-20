"use client";

import dynamic from "next/dynamic";
import OriginStory from "@/components/OriginStory";
import MenuGrid from "@/components/MenuGrid";
import ParallaxBanner from "@/components/ParallaxBanner";
import Footer from "@/components/Footer";

// Heavy animation components loaded client-side only (GSAP + Canvas)
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
});
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), {
  ssr: false,
});

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
