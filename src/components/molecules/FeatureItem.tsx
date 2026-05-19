"use client";

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 items-start"
    >
      <div className="bg-primary text-white p-3 rounded-full flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-display text-headline-md text-primary">{title}</h4>
        <p className="font-body text-body-md text-on-secondary-container mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
