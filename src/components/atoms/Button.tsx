"use client";

import { motion, type HTMLMotionProps } from 'motion/react';
import { type ReactNode } from 'react';
import { cn } from '../utils'; // I'll create this helper later

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:shadow-[0_20px_50px_rgba(0,26,61,0.2)]',
    secondary: 'bg-accent-lime text-primary',
    outline: 'border border-primary/30 text-primary bg-white/20 backdrop-blur-sm hover:bg-primary hover:text-white',
    ghost: 'hover:bg-surface-container-low/50 text-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-8 py-4 text-[12px]',
    lg: 'px-10 py-5 text-[12px]',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'rounded-full font-body font-bold tracking-wider transition-all cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
