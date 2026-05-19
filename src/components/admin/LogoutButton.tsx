"use client";

import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/admin';
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 text-white/70 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-sm font-medium transition-colors cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
