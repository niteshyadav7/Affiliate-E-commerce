"use client";

import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import Button from '../atoms/Button';

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 w-[90%] rounded-full bg-white/70 backdrop-blur-xl z-50 flex justify-between items-center px-8 py-3 max-w-7xl mx-auto border border-surface-white/20 shadow-sm top-6">
      <Link href="/" className="font-display text-headline-md tracking-tighter text-primary hover:opacity-80 transition-opacity">
        SHOPVERSE
      </Link>

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
