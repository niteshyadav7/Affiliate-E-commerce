"use client";

import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  image: string;
  delay?: number;
}

export default function TestimonialCard({ content, author, role, image, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white p-10 rounded-[2rem] shadow-sm border border-surface-container-low hover:shadow-lg transition-all text-left group"
    >
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent-amber text-accent-amber" />
        ))}
      </div>
      <p className="font-body text-body-lg text-primary mb-8 leading-relaxed italic">
        "{content}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container ring-2 ring-primary/5">
          <img className="w-full h-full object-cover" src={image} alt={author} />
        </div>
        <div>
          <p className="font-display text-body-md text-primary font-bold">{author}</p>
          <p className="font-body text-body-sm text-on-secondary-container">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
