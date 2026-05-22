"use client";

import Navbar from '@/components/organisms/Navbar';
import Hero from '@/components/organisms/Hero';
import ProductGrid from '@/components/organisms/ProductGrid';
import Footer from '@/components/organisms/Footer';
import Masks from '@/components/Masks';

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
        <ProductGrid initialProducts={initialProducts} />
      </main>

      <Footer />
    </div>
  );
}

