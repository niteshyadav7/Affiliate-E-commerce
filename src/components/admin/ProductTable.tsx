"use client";

import { useState, useEffect } from 'react';
import { Edit2, Trash2, Link as LinkIcon, Plus, ExternalLink } from 'lucide-react';
import Button from '@/components/atoms/Button';
import ProductForm from './ProductForm';

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (product: any) => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, is_active: !product.is_active }),
      });
      fetchProducts();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <>
      {isEditing && (
        <ProductForm 
          product={editingProduct} 
          onSave={() => {
            setIsEditing(false);
            setEditingProduct(null);
            fetchProducts();
          }} 
          onCancel={() => {
            setIsEditing(false);
            setEditingProduct(null);
          }} 
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-surface-container-low overflow-hidden">
        <div className="p-6 border-b border-surface-container-low flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-primary">All Products</h2>
          <Button size="sm" className="flex items-center gap-2" onClick={() => { setEditingProduct(null); setIsEditing(true); }}>
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-on-secondary-container">
            <thead className="bg-surface/50 text-xs uppercase bg-gray-50 border-b border-surface-container-low">
              <tr>
                <th className="px-6 py-4 font-bold text-primary">Product</th>
                <th className="px-6 py-4 font-bold text-primary">Category</th>
                <th className="px-6 py-4 font-bold text-primary">Price</th>
                <th className="px-6 py-4 font-bold text-primary">Links & Clicks</th>
                <th className="px-6 py-4 font-bold text-primary">Status</th>
                <th className="px-6 py-4 font-bold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-surface-container-low hover:bg-surface/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex-shrink-0 overflow-hidden">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-primary">{product.name}</div>
                        <div className="text-xs opacity-70 truncate max-w-[200px]">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/5 text-primary">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-primary">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <LinkIcon className="w-3 h-3" /> {product.product_links?.length || 0} active links
                      </span>
                      <span className="opacity-70">
                        Total Clicks: {product.product_counters?.[0]?.total_clicks || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(product)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${product.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.is_active ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setEditingProduct(product); setIsEditing(true); }}
                        className="p-2 text-on-secondary-container hover:text-primary bg-surface rounded-lg hover:bg-surface-container-low transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-400 hover:text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
