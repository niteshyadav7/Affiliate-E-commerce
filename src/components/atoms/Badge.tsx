import { cn } from '../utils';

interface BadgeProps {
  children: string;
  variant?: 'lime' | 'coral' | 'amber';
  className?: string;
}

export default function Badge({ children, variant = 'lime', className }: BadgeProps) {
  const variants = {
    lime: 'bg-accent-lime text-primary',
    coral: 'bg-accent-coral/10 text-accent-coral border-accent-coral/5',
    amber: 'bg-accent-amber/10 text-primary border-accent-amber/5',
  };

  return (
    <div className={cn(
      'inline-flex items-center px-4 py-1 rounded-full font-body text-[10px] tracking-widest font-bold border uppercase',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}
