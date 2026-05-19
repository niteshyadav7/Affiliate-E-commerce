import { cookies } from 'next/headers';
import LoginForm from '@/components/admin/LoginForm';
import ProductTable from '@/components/admin/ProductTable';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get('admin_token')?.value;
  const role = cookieStore.get('admin_role')?.value || 'viewer';

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-on-secondary-container mt-2">Manage your storefront, products, and affiliate links.</p>
      </div>
      
      {/* 
        In a real app, you might have multiple tabs/pages for products, analytics, etc.
        For this prototype, the dashboard displays the ProductTable.
      */}
      <ProductTable role={role} />
    </div>
  );
}
