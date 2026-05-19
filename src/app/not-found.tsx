"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse duration-[4000ms]"></div>

      {/* Grid Pattern overlay for tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 text-center max-w-lg mx-auto space-y-8">
        
        {/* Floating Animation */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border border-dashed border-indigo-500/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
          
          {/* Pulsing glow background */}
          <div className="absolute w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl animate-pulse"></div>

          {/* Floating shopping bag container */}
          <div className="relative text-indigo-400 animate-[bounce_4s_ease-in-out_infinite] flex items-center justify-center">
            <ShoppingBag className="w-24 h-24 stroke-[1.25] filter drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <Sparkles className="w-8 h-8 text-accent-lime absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-3">
          <h1 className="text-8xl font-display font-extrabold tracking-tighter bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-display font-bold tracking-tight text-white">
            Lost in the Shopverse
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            The coordinates you requested returned an empty void. The page may have shifted orbits, or it never existed in this dimension.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 cursor-pointer"
          >
            <Home className="w-4 h-4" /> Portal Home
          </Link>
        </div>
      </div>
    </div>
  );
}
