"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Package } from 'lucide-react';
import Button from '../atoms/Button';
import Link from 'next/link';
import { getDirectGoogleDriveLink } from '@/lib/utils';

interface ProductCardProps {
  id: string | number;
  slug?: string | null;
  name: string;
  price: number | string;
  image: string;
  tag?: string;
  tagVariant?: 'lime' | 'coral';
}

export default function ProductCard({ 
  id, 
  slug,
  name, 
  price, 
  image, 
  tag, 
  tagVariant = 'lime' 
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Format underscores to spaces for elegant visual presentation
  const formattedName = name ? name.replace(/_/g, ' ') : '';
  const formattedTag = tag ? tag.replace(/_/g, ' ') : '';
  
  const displayPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  const detailUrl = `/product/${id}`;

  return (
    <Link href={detailUrl} className="block h-full">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group bg-white rounded-2xl p-4 shadow-sm border border-surface-container hover:shadow-xl transition-all cursor-pointer h-full flex flex-col justify-between"
      >
        <div>
          <div className="relative aspect-square rounded-xl bg-surface-container-low mb-4 overflow-hidden border border-surface-container-high/10">
            {tag && (
              <span className={`absolute top-3 left-3 z-10 ${tagVariant === 'lime' ? 'bg-accent-lime text-primary' : 'bg-accent-coral text-white'} px-3 py-1 rounded-full font-body text-[8px] font-bold uppercase tracking-wider`}>
                {formattedTag}
              </span>
            )}
            
            {!image || imageError ? (
              <div className="w-full h-full bg-gradient-to-br from-surface-container-low to-surface-container/60 flex flex-col items-center justify-center text-primary/30 p-4">
                <Package className="w-10 h-10 stroke-[1.2] mb-1.5 text-primary/20 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary/40 font-display">No Image</span>
              </div>
            ) : (
              <img 
                className="w-full h-full object-contain object-top bg-white group-hover:scale-105 transition-transform duration-500" 
                src={getDirectGoogleDriveLink(image)}
                alt={name}
                onError={() => setImageError(true)}
              />
            )}
          </div>
          
          {/* Constrain title to exactly 2 lines maximum with break-words to handle any weird string without breaking layout */}
          <h3 className="font-display text-body-md font-bold text-primary mb-1.5 group-hover:text-accent-coral transition-colors line-clamp-2 break-words min-h-[44px] flex items-center leading-snug">
            {formattedName}
          </h3>
          <p className="font-body text-body-sm font-semibold text-on-secondary-container mb-3">{displayPrice}</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full cursor-pointer mt-auto rounded-full font-bold font-body text-[10px]"
          type="button"
        >
          VIEW DETAILS
        </Button>
      </motion.div>
    </Link>
  );
}

