"use client";

import { Check, ShieldCheck, Truck } from "lucide-react";
import FeatureItem from "../molecules/FeatureItem";

export default function Features() {
  return (
    <section className="relative z-30 bg-accent-amber py-section-gap overflow-hidden">
      <div className="max-w-7xl mx-auto px-page-margin-mobile md:px-page-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="w-full aspect-[4/5] bg-white/20 rounded-[10rem] overflow-hidden pebble-mask relative group">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq7MUErVi0Gb2KXkK4FzW1qAbYCkDk5c5s4t4X2oH3KzsVMnD1VCwht8RF71-b1S_eTvADRNX4ch7-hdQ9Ya5jJ4-cJp_X8d7a1B116V62rXEp-MHJMEAgmtDgXmb_nBnXPvLN4EGG81-lU-_XcDO8AgltBsXCjtiQfBcwmH4CQEceoHFQD9VstKZugMJXz82GMWM1lyoc74bcTYuTqGT_IC_i6H4SJmv_qTPiRwGMBUoHuDUtSb3pCwCiNdJlCNKgJdgp5hKPjw1b"
              alt="Aesthetic Workspace"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <span className="font-body text-[12px] font-bold tracking-[0.2em] text-primary/60 uppercase">
            WHY DIVERSIFIED Y&P
          </span>
          <h2 className="font-display text-headline-lg lg:text-[72px] text-primary leading-tight lg:leading-[1.1]">
            Shop Smarter, <br />
            Not Harder.
          </h2>

          <div className="space-y-8 mt-4">
            <FeatureItem
              icon={<Check className="w-5 h-5" />}
              title="Curated Quality"
              description="Only the top 1% of products from verified vendors make it to our storefront."
            />
            <FeatureItem
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Secure Payments"
              description="Multi-layer encryption ensures your financial data stays private and safe."
            />
            <FeatureItem
              icon={<Truck className="w-5 h-5" />}
              title="Eco-Friendly Shipping"
              description="Carbon-neutral delivery for every single order, worldwide."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
