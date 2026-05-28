"use client";

import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import { 
  X, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon, 
  Settings, 
  Info,
  List,
  Sliders,
  ShieldCheck,
  Globe
} from 'lucide-react';

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
  const [detailsOpen, setDetailsOpen] = useState(false);

  // New product details states
  const [detailsData, setDetailsData] = useState({
    long_description: '',
    highlights: [] as string[],
    gallery_images: [] as string[],
    rating: 4.5,
    reviews_count: 0,
    stock_status: 'in_stock',
    shipping_info: 'Free shipping on orders over $50',
    meta_title: '',
    meta_description: ''
  });

  const [specsArray, setSpecsArray] = useState<{ key: string; value: string }[]>([]);

  // Fetch existing details on mount (if editing)
  useEffect(() => {
    if (product?.id) {
      fetch(`/api/products/${product.id}/details`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setDetailsData({
              long_description: data.long_description || '',
              highlights: data.highlights || [],
              gallery_images: data.gallery_images || [],
              rating: data.rating !== undefined ? parseFloat(data.rating) : 4.5,
              reviews_count: data.reviews_count || 0,
              stock_status: data.stock_status || 'in_stock',
              shipping_info: data.shipping_info || 'Free shipping on orders over $50',
              meta_title: data.meta_title || '',
              meta_description: data.meta_description || ''
            });

            if (data.specifications) {
              setSpecsArray(
                Object.entries(data.specifications).map(([key, value]) => ({
                  key,
                  value: String(value)
                }))
              );
            }
          }
        })
        .catch(err => console.error('Failed to load product details:', err));
    }
  }, [product]);

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

  // Highlights helpers
  const addHighlight = () => {
    setDetailsData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updateHighlight = (index: number, val: string) => {
    const updated = [...detailsData.highlights];
    updated[index] = val;
    setDetailsData(prev => ({ ...prev, highlights: updated }));
  };

  const removeHighlight = (index: number) => {
    setDetailsData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== index)
    }));
  };

  // Specifications helpers
  const addSpec = () => {
    setSpecsArray([...specsArray, { key: '', value: '' }]);
  };

  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specsArray];
    updated[index] = { ...updated[index], [field]: val };
    setSpecsArray(updated);
  };

  const removeSpec = (index: number) => {
    setSpecsArray(specsArray.filter((_, idx) => idx !== index));
  };

  // Gallery helpers
  const addGalleryImage = () => {
    setDetailsData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, '']
    }));
  };

  const updateGalleryImage = (index: number, val: string) => {
    const updated = [...detailsData.gallery_images];
    updated[index] = val;
    setDetailsData(prev => ({ ...prev, gallery_images: updated }));
  };

  const removeGalleryImage = (index: number) => {
    setDetailsData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, idx) => idx !== index)
    }));
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
      
      // 1. Save core Product
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
            await fetch(`/api/products/${productId}/links`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ linkId: link.id, ...linkData }),
            });
          } else {
            await fetch(`/api/products/${productId}/links`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(linkData),
            });
          }
        }

        // 4. Build and save Product Details
        const specsObj: Record<string, string> = {};
        specsArray.forEach(item => {
          if (item.key.trim()) {
            specsObj[item.key.trim()] = item.value;
          }
        });

        // Filter out empty highlights and empty gallery image inputs
        const cleanHighlights = detailsData.highlights.filter(h => h.trim() !== '');
        const cleanGalleryImages = detailsData.gallery_images.filter(img => img.trim() !== '');

        const detailsToSubmit = {
          ...detailsData,
          highlights: cleanHighlights,
          gallery_images: cleanGalleryImages,
          specifications: specsObj
        };

        await fetch(`/api/products/${productId}/details`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailsToSubmit),
        });
      }
      
      onSave();
    } catch (error) {
      console.error('Failed to save product or details', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-container-low mb-8 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-lg font-bold text-primary">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button onClick={onCancel} className="p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Core Product Info */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold text-primary flex items-center gap-1.5 border-b border-surface-container-low pb-2">
            <Info className="w-4 h-4 text-primary" /> Basic Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary mb-1">Name</label>
              <input 
                required
                className="w-full px-4 py-2 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary mb-1">Category</label>
              <select 
                required
                className="w-full px-4 py-2 border border-outline/20 rounded-lg bg-white focus:outline-none focus:border-primary/50 cursor-pointer text-sm"
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
                className="w-full px-4 py-2 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                value={formData.price}
                placeholder="$99.00"
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary mb-1">Short URL Slug (Optional)</label>
              <input 
                className="w-full px-4 py-2 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                value={formData.slug}
                placeholder="e.g. discount-shoes (auto-generated if empty)"
                onChange={e => setFormData({...formData, slug: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-primary mb-1">Featured Image URL</label>
              <input 
                className="w-full px-4 py-2 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-primary mb-1">Short Grid Description</label>
            <textarea 
              className="w-full px-4 py-2 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
              rows={2}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        {/* Alternate Buying Destinations */}
        <div className="border-t border-surface-container-low pt-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-display text-sm font-bold text-primary flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-primary" /> Alternate Redirect Destinations
              </h4>
              <p className="text-[10px] text-on-secondary-container opacity-75 mt-0.5">
                Provide external buying links. Multiple links will rotate in a round-robin rotation.
              </p>
              
              {/* Premium Auto-organic Tip Notice */}
              <div className="flex items-start gap-2 mt-2 bg-gradient-to-r from-primary/5 via-primary/5 to-green-500/5 border border-primary/15 rounded-xl p-3 max-w-xl shadow-inner animate-in fade-in duration-300">
                <span className="text-xs shrink-0 select-none">✨</span>
                <div>
                  <p className="text-[10px] font-bold text-primary leading-normal flex items-center gap-1.5">
                    Auto-Organic Link Expansion
                    <span className="bg-green-150 text-green-700 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 border border-green-200">
                      Active
                    </span>
                  </p>
                  <p className="text-[9px] text-on-secondary-container opacity-85 leading-normal mt-0.5">
                    Simply paste **one** raw Amazon product link. When you save, the engine will automatically generate **5 highly authentic organic search click links**! Visitors will rotate through them, boosting your Amazon organic rank automatically.
                  </p>
                </div>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 py-2 px-4 text-[10px]"
              onClick={addLink}
            >
              <Plus className="w-3 h-3" /> Add Link
            </Button>
          </div>

          {links.length === 0 ? (
            <div className="border border-dashed border-outline/20 rounded-xl p-4 text-center bg-surface/15">
              <p className="text-xs text-on-secondary-container opacity-60">No destinations configured yet.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {links.map((link, index) => (
                <div 
                  key={link.id || `new-link-${index}`} 
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end bg-surface/30 p-2.5 rounded-xl border border-outline/5 hover:border-outline/10 transition-colors"
                >
                  <div className="sm:col-span-4">
                    <label className="block text-[9px] font-bold text-primary mb-1 uppercase tracking-wider">
                      Store Name
                    </label>
                    <input 
                      required
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      value={link.label || ''}
                      placeholder="e.g. Amazon"
                      onChange={e => updateLink(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-7">
                    <label className="block text-[9px] font-bold text-primary mb-1 uppercase tracking-wider">
                      Affiliate/Store URL
                    </label>
                    <input 
                      required
                      type="url"
                      className="w-full px-2.5 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      value={link.url || ''}
                      placeholder="https://amazon.com/dp/xxx"
                      onChange={e => updateLink(index, 'url', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-center pb-0.5">
                    <button 
                      type="button"
                      onClick={() => removeLink(index)}
                      className="p-1.5 text-on-secondary-container hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-outline/10 hover:border-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collapsible Rich Product Details & SEO Section */}
        <div className="border border-surface-container rounded-2xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="w-full px-4 py-3 bg-surface-container-low/50 hover:bg-surface-container-low transition-colors flex items-center justify-between font-display text-sm font-bold text-primary cursor-pointer border-b border-surface-container"
          >
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-primary" /> Premium Product Details & SEO (Highly Recommended)
            </span>
            {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {detailsOpen && (
            <div className="p-4 bg-white space-y-6">
              
              {/* Long description */}
              <div>
                <label className="block text-xs font-bold text-primary mb-1">Detailed Description (Long Text)</label>
                <textarea 
                  className="w-full px-4 py-2 border border-outline/20 rounded-lg text-sm bg-white focus:outline-none focus:border-primary/50"
                  rows={4}
                  placeholder="Introduce the product with a beautiful narrative. Supports rich product overview."
                  value={detailsData.long_description}
                  onChange={e => setDetailsData({...detailsData, long_description: e.target.value})}
                />
              </div>

              {/* Highlights Manager */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-primary flex items-center gap-1">
                    <List className="w-3.5 h-3.5" /> Key Highlights & Features
                  </label>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Feature
                  </button>
                </div>
                {detailsData.highlights.length === 0 ? (
                  <div className="text-center py-4 bg-surface/10 border border-dashed border-outline/20 rounded-xl">
                    <span className="text-xs text-on-secondary-container opacity-60">No highlights added yet.</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {detailsData.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          required
                          className="flex-1 px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                          value={highlight}
                          placeholder="e.g. 30-hour wireless battery life"
                          onChange={e => updateHighlight(idx, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="p-1.5 text-on-secondary-container hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-outline/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Specifications Manager */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-primary flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" /> Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Spec Row
                  </button>
                </div>
                {specsArray.length === 0 ? (
                  <div className="text-center py-4 bg-surface/10 border border-dashed border-outline/20 rounded-xl">
                    <span className="text-xs text-on-secondary-container opacity-60">No specifications added yet.</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {specsArray.map((spec, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          required
                          className="w-1/3 px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                          value={spec.key}
                          placeholder="Label (e.g. Weight)"
                          onChange={e => updateSpec(idx, 'key', e.target.value)}
                        />
                        <input
                          required
                          className="flex-1 px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                          value={spec.value}
                          placeholder="Value (e.g. 250g)"
                          onChange={e => updateSpec(idx, 'value', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeSpec(idx)}
                          className="p-1.5 text-on-secondary-container hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-outline/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Images URLs */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-primary flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> Extra Gallery Images (URLs)
                  </label>
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Image URL
                  </button>
                </div>
                {detailsData.gallery_images.length === 0 ? (
                  <div className="text-center py-4 bg-surface/10 border border-dashed border-outline/20 rounded-xl">
                    <span className="text-xs text-on-secondary-container opacity-60">No additional images added yet.</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {detailsData.gallery_images.map((imgUrl, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          required
                          type="url"
                          className="flex-1 px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                          value={imgUrl}
                          placeholder="https://example.com/image.jpg"
                          onChange={e => updateGalleryImage(idx, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="p-1.5 text-on-secondary-container hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-outline/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stock status, Shipping, Rating, reviews */}
              <div className="space-y-4 pt-2 border-t border-surface-container-low">
                <h5 className="text-xs font-bold text-primary flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Logistics & Ratings
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Stock Status</label>
                    <select
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50 cursor-pointer"
                      value={detailsData.stock_status}
                      onChange={e => setDetailsData({...detailsData, stock_status: e.target.value})}
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Shipping Info Summary</label>
                    <input
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      value={detailsData.shipping_info}
                      placeholder="e.g. Free express shipping"
                      onChange={e => setDetailsData({...detailsData, shipping_info: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Product Rating (0.0 - 5.0)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      value={detailsData.rating}
                      onChange={e => setDetailsData({...detailsData, rating: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Reviews Count</label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      value={detailsData.reviews_count}
                      onChange={e => setDetailsData({...detailsData, reviews_count: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>

              {/* SEO Data */}
              <div className="space-y-4 pt-2 border-t border-surface-container-low">
                <h5 className="text-xs font-bold text-primary flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> SEO Metadata (Search Engine Optimization)
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Meta Title</label>
                    <input
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      placeholder="e.g. Acoustic Pro Max - Premium Wireless Headphones"
                      value={detailsData.meta_title}
                      onChange={e => setDetailsData({...detailsData, meta_title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Meta Description</label>
                    <textarea
                      className="w-full px-3 py-1.5 border border-outline/20 rounded-lg text-xs bg-white focus:outline-none focus:border-primary/50"
                      rows={2}
                      placeholder="Short summary displayed in search engines. Keep it between 120-160 characters."
                      value={detailsData.meta_description}
                      onChange={e => setDetailsData({...detailsData, meta_description: e.target.value})}
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Action Buttons */}
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
