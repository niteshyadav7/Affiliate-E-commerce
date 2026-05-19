import ProductTable from '@/components/admin/ProductTable';

export default function AdminProductsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Products</h1>
        <p className="text-on-secondary-container mt-2">Manage your inventory, affiliate links, and visibility.</p>
      </div>
      
      <ProductTable />
    </div>
  );
}
