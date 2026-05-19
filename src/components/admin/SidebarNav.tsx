"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, BarChart3, Mail, Users } from 'lucide-react';

export default function SidebarNav({ role = 'viewer' }: { role?: string }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  if (role === 'super_admin') {
    navItems.push(
      { href: '/admin/campaigns', label: 'Campaigns', icon: Mail },
      { href: '/admin/team', label: 'Team', icon: Users }
    );
  }

  return (
    <nav className="flex-1 px-4 space-y-2 mt-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        // Check if current path matches item.href exactly
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive 
                ? 'bg-white/15 text-white font-semibold shadow-sm' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
