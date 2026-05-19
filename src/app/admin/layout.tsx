import { cookies } from 'next/headers';
import { Package, BarChart3, Settings, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_token')?.value === 'authenticated';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-50">
        <div className="p-6">
          <h1 className="font-display text-2xl font-bold tracking-wider text-accent-lime">SHOPVERSE</h1>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-sm font-medium transition-colors hover:bg-white/20">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <Package className="w-4 h-4" />
            Products
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-surface">
        {children}
      </main>
    </div>
  );
}
