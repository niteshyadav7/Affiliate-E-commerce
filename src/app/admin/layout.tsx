import { cookies } from 'next/headers';
import LogoutButton from '@/components/admin/LogoutButton';
import SidebarNav from '@/components/admin/SidebarNav';
import LoginForm from '@/components/admin/LoginForm';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;
  const adminRole = cookieStore.get('admin_role')?.value || 'viewer';
  const isAuthenticated = !!adminToken;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <LoginForm />
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
        
        <SidebarNav role={adminRole} />


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
