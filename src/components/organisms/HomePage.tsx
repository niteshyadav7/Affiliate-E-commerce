"use client";

import { Timer, ArrowRight } from 'lucide-react';
import Navbar from '@/components/organisms/Navbar';
import Hero from '@/components/organisms/Hero';
import ProductGrid from '@/components/organisms/ProductGrid';
import Features from '@/components/organisms/Features';
import Testimonials from '@/components/organisms/Testimonials';
import Footer from '@/components/organisms/Footer';
import Masks from '@/components/Masks';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Masks />
      
      {/* Promo Bar */}
      <div className="bg-accent-coral h-[40px] w-full flex items-center justify-center text-white font-body text-[12px] md:text-sm px-4 z-[60] relative">
        <div className="flex items-center gap-4">
          <span className="font-bold uppercase tracking-wide text-center">
            Limited Time Offer: Get 20% off on all Electronics! Use code: 
            <span className="bg-white/20 px-2 py-0.5 rounded mx-2">SHOP20</span>
            <a className="ml-4 underline underline-offset-4 hover:opacity-80 transition-opacity font-extrabold inline-flex items-center gap-1" href="#">
              SHOP NOW <ArrowRight className="w-4 h-4" />
            </a>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 opacity-90">
            <Timer className="w-4 h-4" />
            Ends in: 05h 24m 12s
          </span>
        </div>
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <ProductGrid />
        <Features />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
