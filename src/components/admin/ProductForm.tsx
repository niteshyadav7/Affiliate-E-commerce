"use client";

import { useState } from 'react';
import Button from '@/components/atoms/Button';
import { X, Plus, Trash2 } from 'lucide-react';

export default function ProductForm({ product, onSave, onCancel }: { product?: any, onSave: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    image_url: product?.image_url || '',
    category: product?.category || 'General',
    slug: product?.slug || '',
    is_active: product ? product.is_active : true,
  });
  
  const [links, setLinks] = useState<any[]>(product?.product_links || []);
  const [deletedLinkIds, setDeletedLinkIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-');       // Replace multiple - with single -
  };

  const addLink = () => {
    setLinks([...links, { label: 'Link', url: '', sort_order: links.length }]);
  };

  const updateLink = (index: number, field: string, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    const linkToRemove = links[index];
    if (linkToRemove.id) {
      setDeletedLinkIds([...deletedLinkIds, linkToRemove.id]);
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalSlug = formData.slug.trim() ? slugify(formData.slug) : slugify(formData.name);
    const dataToSubmit = {
      ...formData,
      slug: finalSlug
    };

    try {
      let savedProduct;
      
      // 1. Save Product
      if (product?.id) {
        // Update
        const res = await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit),
        });
        savedProduct = await res.json();
      } else {
        // Create
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit),
        });
        savedProduct = await res.json();
      }


      const productId = product?.id || savedProduct?.id;

      if (productId) {
        // 2. Delete removed links
        for (const linkId of deletedLinkIds) {
          await fetch(`/api/products/${productId}/links?linkId=${linkId}`, {
            method: 'DELETE',
          });
        }

        // 3. Upsert remaining links
        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          const linkData = {
            url: link.url,
            label: link.label || 'Link',
            sort_order: i,
          };

          if (link.id) {
            // Update existing link
            await fetch(`/api/products/${productId}/links`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ linkId: link.id, ...linkData }),
            });
          } else {
            // Create new link
            await fetch(`/api/products/${productId}/links`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(linkData),
            });
          }
        }
      }
      
      onSave();
    } catch (error) {
      console.error('Failed to save product or links', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-container-low mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-lg font-bold text-primary">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button onClick={onCancel} className="p-2 hover:bg-surface-container-low rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-primary mb-1">Name</label>
            <input 
              required
              className="w-full px-4 py-2 border border-outline/20 rounded-lg"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-1">Category</label>
            <select 
              required
              className="w-full px-4 py-2 border border-outline/20 rounded-lg bg-white focus:outline-none focus:border-primary/50 cursor-pointer"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="General">General</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Gadgets">Gadgets</option>
              <option value="New Arrival">New Arrival</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-1">Price</label>
            <input 
              required
              className="w-full px-4 py-2 border border-outline/20 rounded-lg"
              value={formData.price}
              placeholder="$99.00"
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-1">Short URL Slug (Optional)</label>
            <input 
              className="w-full px-4 py-2 border border-outline/20 rounded-lg"
              value={formData.slug}
              placeholder="e.g. discount-shoes (auto-generated if empty)"
              onChange={e => setFormData({...formData, slug: e.target.value})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-primary mb-1">Image URL</label>
            <input 
              className="w-full px-4 py-2 border border-outline/20 rounded-lg"
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-primary mb-1">Description</label>
          <textarea 
            className="w-full px-4 py-2 border border-outline/20 rounded-lg"
            rows={3}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* Links Manager Section */}
        <div className="border-t border-surface-container-low pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-display text-sm font-bold text-primary">Redirect Destinations</h4>
              <p className="text-xs text-on-secondary-container opacity-70">
                Configure destination URLs. If multiple links exist, redirects will cycle in a round-robin rotation.
              </p>
            </div>
            <Button 
              type="button" 
              variant="secondary" 
              size="sm" 
              className="flex items-center gap-2 text-xs"
              onClick={addLink}
            >
              <Plus className="w-3.5 h-3.5" /> Add Link
            </Button>
          </div>

          {links.length === 0 ? (
            <div className="border border-dashed border-outline/20 rounded-xl p-8 text-center bg-surface/10">
              <p className="text-sm text-on-secondary-container opacity-60">No links configured yet.</p>
              <button 
                type="button" 
                onClick={addLink} 
                className="mt-2 text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Click here to add a redirect link
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {links.map((link, index) => (
                <div 
                  key={link.id || `new-link-${index}`} 
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-surface/30 p-3 rounded-xl border border-outline/5 hover:border-outline/10 hover:bg-surface/50 transition-all duration-200"
                >
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                      Label / Name
                    </label>
                    <input 
                      required
                      type="text"
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                      value={link.label || ''}
                      placeholder="e.g. Amazon Store"
                      onChange={e => updateLink(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-7">
                    <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                      Destination URL
                    </label>
                    <input 
                      required
                      type="url"
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                      value={link.url || ''}
                      placeholder="https://example.com/product"
                      onChange={e => updateLink(index, 'url', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-center pb-0.5">
                    <button 
                      type="button"
                      onClick={() => removeLink(index)}
                      className="p-2 text-on-secondary-container hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-outline/10 hover:border-red-100 transition-colors cursor-pointer"
                      title="Remove Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-container-low">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
