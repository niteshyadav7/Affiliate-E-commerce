"use client";

import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import ProductGrid from "@/components/organisms/ProductGrid";
import Masks from "@/components/Masks";
import AdBanner from "@/components/molecules/AdBanner";

interface HomePageProps {
  initialProducts?: any[];
}

export default function HomePage({ initialProducts }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <Masks />

      <Navbar />

      <main>
        <Hero />
        <AdBanner slotId="homepage_hero" />
        <ProductGrid initialProducts={initialProducts} />
      </main>
    </div>
  );
}
