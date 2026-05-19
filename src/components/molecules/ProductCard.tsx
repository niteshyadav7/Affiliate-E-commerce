"use client";

import { motion } from 'motion/react';
import Button from '../atoms/Button';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number | string;
  image: string;
  tag?: string;
  tagVariant?: 'lime' | 'coral';
  onBuy?: (id: string | number) => void;
}

export default function ProductCard({ id, name, price, image, tag, tagVariant = 'lime', onBuy }: ProductCardProps) {
  const displayPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-lg p-4 shadow-sm border border-surface-container hover:shadow-xl transition-all"
    >
      <div className="relative aspect-square rounded-lg bg-surface-container-low mb-4 overflow-hidden">
        {tag && (
          <span className={`absolute top-2 left-2 z-10 ${tagVariant === 'lime' ? 'bg-accent-lime text-primary' : 'bg-accent-coral text-white'} px-3 py-1 rounded-full font-body text-[8px] font-bold uppercase`}>
            {tag}
          </span>
        )}
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={image}
          alt={name}
        />
      </div>
      <h3 className="font-display text-body-md font-semibold text-primary mb-1">{name}</h3>
      <p className="font-body text-body-sm text-on-secondary-container mb-4">{displayPrice}</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => onBuy?.(id)}
      >
        BUY NOW
      </Button>
    </motion.div>
  );
}
