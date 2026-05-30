"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Background gradient: premium deep royal navy to deep space blue */}
        <linearGradient id="dyp-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#001a3d" />
          <stop offset="100%" stopColor="#050e1a" />
        </linearGradient>

        {/* Glow filter for luxury illumination */}
        <filter id="dyp-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Coral to Lime gradient for the Y-left arm */}
        <linearGradient id="grad-coral-lime" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD5E3A" /> {/* Accent Coral */}
          <stop offset="100%" stopColor="#D5F55B" /> {/* Accent Lime */}
        </linearGradient>

        {/* Lime to Amber gradient for the P loop */}
        <linearGradient id="grad-lime-amber" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D5F55B" /> {/* Accent Lime */}
          <stop offset="100%" stopColor="#FCE285" /> {/* Accent Amber */}
        </linearGradient>

        {/* Coral to Deep Navy gradient for the stem */}
        <linearGradient id="grad-primary-coral" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FD5E3A" /> {/* Accent Coral */}
          <stop offset="100%" stopColor="#001a3d" /> {/* Primary */}
        </linearGradient>

        {/* Glowing aura gradient */}
        <radialGradient id="glow-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D5F55B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#001a3d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer elegant ring with a slight premium glow */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="url(#dyp-bg-grad)"
        stroke="rgba(213, 245, 91, 0.18)"
        strokeWidth="1.5"
        className="transition-all duration-300 group-hover:stroke-accent-lime/45"
      />

      {/* Glowing atmospheric halo in background */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="url(#glow-aura)"
        stroke="none"
        filter="url(#dyp-glow)"
      />

      {/* Y-Left Branch: Coral to Lime */}
      <path
        d="M 24 26 C 30 34, 38 42, 44 48"
        stroke="url(#grad-coral-lime)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500"
      />

      {/* Y-Right / P-Loop: Lime to Amber */}
      <path
        d="M 44 48 C 44 34, 54 24, 68 24 C 80 24, 80 48, 68 48 C 56 48, 48 48, 44 48"
        stroke="url(#grad-lime-amber)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stem / Back: Coral to Primary */}
      <path
        d="M 44 48 L 44 76"
        stroke="url(#grad-primary-coral)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center glowing focal point dot representing precision curation */}
      <circle
        cx="44"
        cy="48"
        r="4.5"
        fill="#FFFFFF"
        filter="url(#dyp-glow)"
        className="transition-all duration-300 group-hover:scale-125"
      />
    </svg>
  );
}
