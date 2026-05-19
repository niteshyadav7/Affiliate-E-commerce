"use client";

import { ShoppingBag, User } from 'lucide-react';
import Button from '../atoms/Button';

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 w-[90%] rounded-full bg-white/70 backdrop-blur-xl z-50 flex justify-between items-center px-8 py-3 max-w-7xl mx-auto border border-surface-white/20 shadow-sm top-[56px]">
      <div className="font-display text-headline-md tracking-tighter text-primary">SHOPVERSE</div>
      
      <div className="hidden md:flex items-center gap-8">
        <a className="font-display text-body-md text-primary font-bold border-b-2 border-primary pb-1" href="#">Collections</a>
        <a className="font-display text-body-md text-on-secondary-container hover:text-primary transition-colors" href="#">New Arrivals</a>
        <a className="font-display text-body-md text-on-secondary-container hover:text-primary transition-colors" href="#">Sustainability</a>
        <a className="font-display text-body-md text-on-secondary-container hover:text-primary transition-colors" href="#">Journal</a>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="p-2">
          <ShoppingBag className="w-5 h-5" />
        </Button>
        <Button variant="ghost" className="p-2">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}
