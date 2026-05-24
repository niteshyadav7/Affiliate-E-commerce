"use client";

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 px-page-margin-mobile md:px-page-margin-desktop bg-[#E1EBF7] overflow-hidden grain-texture">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-8"
        >
          <Badge variant="coral">🔥 TRENDING NOW</Badge>
          
          <h1 className="font-display text-display-lg lg:text-[80px] text-primary max-w-xl leading-[0.95] tracking-[-0.05em]">
            Premium Products. Best Prices. <br />
            <span className="text-on-secondary-container/60 italic font-serif font-normal text-[0.85em] tracking-tight">Smart Shopping.</span>
          </h1>
          
          <p className="font-body text-body-lg text-on-secondary-container/80 max-w-md leading-relaxed">
            Experience the future of boutique e-commerce where curated quality meets unparalleled value.
          </p>
          
          {/* <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg" className="px-10">SHOP NOW</Button>
            <Button variant="outline" size="lg" className="px-10">VIEW DEALS</Button>
          </div> */}
        </motion.div>

        {/* Right Visual */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5 select-none pointer-events-none">
            <span className="font-serif text-[12rem] lg:text-[22rem] text-primary font-black tracking-[-0.08em] italic">DISCOVER</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-md aspect-square bg-white/10 backdrop-blur-md rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] floating-product liquid-mask border border-white/20"
          >
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtOxmyoQjLyrqmb9vbMvroHjgVIDaahsRCrhUi9-FethB5mHRXe5XzqAsceNs6xzuB_h-6cRnbrVmCFdF4i3wz1lciuf-6ACwI_uS33f4yQtH82JryJfSN_JNT98O9dJT1xzdTWZlh2Y2bHOfMS3bY8jcRMzW3wr2YlYpLhgxSe7C859E1CgB4epzxDRIEVtzFr5QG5-Dl64yVPBhVyNT1gSjutpT2lTRDxJ5zPJFIuo0I7ckpv_fSHDTLV-ZRv-Y1LCSP2sELwNrd"
              alt="Premium Headphones"
            />
          </motion.div>

          {/* Action Badge */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="absolute -bottom-6 -right-6 lg:-right-4 w-32 h-32 bg-accent-lime rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-transform duration-500 z-20"
          >
            <svg className="w-24 h-24 rotate-slow" viewBox="0 0 100 100">
              <path d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" id="circlePathHero"></path>
              <text className="font-body text-[10px] fill-primary font-bold tracking-[0.25em] uppercase">
                <textPath xlinkHref="#circlePathHero">Shop Now • Shop Now • Shop Now • </textPath>
              </text>
            </svg>
            <ArrowUpRight className="absolute text-primary text-3xl font-light" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
