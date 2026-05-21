"use client";

import { useState, useEffect } from 'react';
import { Edit2, Trash2, Link as LinkIcon, Plus, ExternalLink, Upload, X, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '@/components/atoms/Button';
import ProductForm from './ProductForm';

export default function ProductTable({ role = 'viewer' }: { role?: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const copyToClipboard = (slug: string, id: string) => {
    const url = `${window.location.origin}/r/${slug || id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

      <BulkUploadModal 
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onUploadComplete={fetchProducts}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-surface-container-low overflow-hidden">
        <div className="p-6 border-b border-surface-container-low flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-primary">All Products</h2>
          <div className="flex gap-2">
            {role !== 'viewer' && (
              <>
                <Button size="sm" variant="outline" className="flex items-center gap-2 text-xs" onClick={() => setIsBulkUploadOpen(true)}>
                  <Upload className="w-4 h-4" /> Bulk Upload
                </Button>
                <Button size="sm" className="flex items-center gap-2 text-xs" onClick={() => { setEditingProduct(null); setIsEditing(true); }}>
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </>
            )}
          </div>
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
                {role !== 'viewer' && <th className="px-6 py-4 font-bold text-primary text-right">Actions</th>}
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
                      <span className="flex items-center gap-1.5 text-primary font-bold">
                        <LinkIcon className="w-3.5 h-3.5" /> {product.product_links?.length || 0} active links
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 bg-surface py-1 px-2 rounded-lg border border-outline/10 w-fit">
                        <span className="font-mono text-[10px] text-primary opacity-80 select-all">
                          /r/{product.slug || 'no-slug'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(product.slug, product.id)}
                          className="text-[10px] text-primary hover:underline font-bold cursor-pointer transition-all whitespace-nowrap"
                        >
                          {copiedId === product.id ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <span className="opacity-70 text-[10px] mt-0.5">
                        Total Clicks: {product.product_counters?.[0]?.total_clicks || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      disabled={role === 'viewer'}
                      onClick={() => toggleStatus(product)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${role === 'viewer' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${product.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.is_active ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  {role !== 'viewer' && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsEditing(true); }}
                          className="p-2 text-on-secondary-container hover:text-primary bg-surface rounded-lg hover:bg-surface-container-low transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {role === 'super_admin' && (
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400 hover:text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function BulkUploadModal({ isOpen, onClose, onUploadComplete }: { isOpen: boolean; onClose: () => void; onUploadComplete: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedProducts, setParsedProducts] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const downloadSampleCSV = () => {
    const headers = [
      'Name', 'Category', 'Price', 'Image URL', 'Description', 'Redirect URLs',
      'Long Description', 'Highlights', 'Specifications', 'Gallery Images', 
      'Rating', 'Reviews Count', 'Stock Status', 'Shipping Info', 'Meta Title', 'Meta Description'
    ];
    const sampleRows = [
      [
        'Acoustic Pro Max',
        'Electronics',
        '$299.00',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'Modern noise-cancelling headphones in space grey.',
        'Amazon|https://amazon.com/dp/B09XS7JWHH;BestBuy|https://bestbuy.com/site/headphones',
        'Immerse yourself in high-fidelity audio with our state-of-the-art noise cancellation technology.',
        'Active Noise Cancellation|Up to 30hrs battery|Spatial Audio|USB-C Charging',
        '{"Weight": "250g", "Bluetooth": "5.3"}',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500|https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        '4.8',
        '1245',
        'in_stock',
        'Free expedited shipping',
        'Acoustic Pro Max Headphones | Shopverse',
        'Buy the new Acoustic Pro Max with active noise cancellation.'
      ],
      [
        'Velocity Run V2',
        'New Arrival',
        '$120.00',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        'Luxury performance running shoes.',
        'Nike Store|https://nike.com;https://footlocker.com',
        'Experience ultimate comfort and speed with our latest performance running shoes.',
        'Breathable mesh|Zoom air cushioning|Durable rubber outsole',
        '{"Material": "Mesh", "Drop": "10mm"}',
        '',
        '4.5',
        '320',
        'low_stock',
        'Ships within 24 hours',
        '',
        ''
      ]
    ];
    
    const csvContent = [
      headers.join(','),
      ...sampleRows.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'shopverse_bulk_upload_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setErrors([]);
    setParsedProducts([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = parseCSV(text);
        
        if (rows.length < 2) {
          setErrors(['The CSV file must contain a header row and at least one product row.']);
          return;
        }

        const headers = rows[0].map(h => h.trim().toLowerCase());
        const nameIndex = headers.indexOf('name');
        const categoryIndex = headers.indexOf('category');
        const priceIndex = headers.indexOf('price');
        const imageUrlIndex = headers.indexOf('image url');
        const descriptionIndex = headers.indexOf('description');
        const redirectUrlsIndex = headers.indexOf('redirect urls');
        
        // Optional details indices
        const longDescIndex = headers.indexOf('long description');
        const highlightsIndex = headers.indexOf('highlights');
        const specsIndex = headers.indexOf('specifications');
        const galleryIndex = headers.indexOf('gallery images');
        const ratingIndex = headers.indexOf('rating');
        const reviewsIndex = headers.indexOf('reviews count');
        const stockIndex = headers.indexOf('stock status');
        const shippingIndex = headers.indexOf('shipping info');
        const metaTitleIndex = headers.indexOf('meta title');
        const metaDescIndex = headers.indexOf('meta description');

        if (nameIndex === -1 || priceIndex === -1) {
          setErrors(['CSV must contain at least "Name" and "Price" columns.']);
          return;
        }

        const products: any[] = [];
        const fileErrors: string[] = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === 1 && row[0] === '') continue; // Skip empty rows

          const name = row[nameIndex]?.trim();
          const category = row[categoryIndex]?.trim() || 'General';
          const price = row[priceIndex]?.trim();
          const image_url = row[imageUrlIndex]?.trim() || '';
          const description = row[descriptionIndex]?.trim() || '';
          const redirectUrlsText = row[redirectUrlsIndex]?.trim() || '';

          if (!name) {
            fileErrors.push(`Row ${i + 1}: Product name is required.`);
            continue;
          }
          if (!price) {
            fileErrors.push(`Row ${i + 1}: Price is required.`);
            continue;
          }

          // Parse links (Semicolon separated, optional Label|URL)
          const links: any[] = [];
          if (redirectUrlsText) {
            const urlTokens = redirectUrlsText.split(';');
            urlTokens.forEach((token) => {
              const trimmedToken = token.trim();
              if (trimmedToken) {
                if (trimmedToken.includes('|')) {
                  const [label, url] = trimmedToken.split('|');
                  links.push({ label: label.trim(), url: url.trim() });
                } else {
                  links.push({ label: 'Link', url: trimmedToken });
                }
              }
            });
          }

          // Parse details
          const details: any = {};
          if (longDescIndex > -1) details.long_description = row[longDescIndex]?.trim();
          
          if (highlightsIndex > -1) {
             const h = row[highlightsIndex]?.trim();
             if (h) details.highlights = h.split('|').map(item => item.trim()).filter(Boolean);
          }
          
          if (specsIndex > -1) {
             const s = row[specsIndex]?.trim();
             if (s) {
                 try {
                     details.specifications = JSON.parse(s);
                 } catch (e) {
                     // try to parse as Key:Value|Key:Value if JSON fails
                     const specs: any = {};
                     s.split('|').forEach(pair => {
                         const parts = pair.split(':');
                         if (parts.length >= 2) {
                             const key = parts[0].trim();
                             const val = parts.slice(1).join(':').trim();
                             if (key) specs[key] = val;
                         }
                     });
                     if (Object.keys(specs).length > 0) details.specifications = specs;
                 }
             }
          }
          
          if (galleryIndex > -1) {
             const g = row[galleryIndex]?.trim();
             if (g) details.gallery_images = g.split('|').map(item => item.trim()).filter(Boolean);
          }
          
          if (ratingIndex > -1) details.rating = row[ratingIndex]?.trim();
          if (reviewsIndex > -1) details.reviews_count = row[reviewsIndex]?.trim();
          if (stockIndex > -1) details.stock_status = row[stockIndex]?.trim() || 'in_stock';
          if (shippingIndex > -1) details.shipping_info = row[shippingIndex]?.trim();
          if (metaTitleIndex > -1) details.meta_title = row[metaTitleIndex]?.trim();
          if (metaDescIndex > -1) details.meta_description = row[metaDescIndex]?.trim();

          products.push({
            name,
            category,
            price,
            image_url,
            description,
            links,
            details
          });
        }

        if (fileErrors.length > 0) {
          setErrors(fileErrors);
        }
        setParsedProducts(products);
      } catch (err: any) {
        setErrors([`Failed to parse CSV file: ${err.message}`]);
      }
    };
    reader.readAsText(selectedFile);
  };

  const parseCSV = (text: string) => {
    const lines = [];
    let row = [""];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push('');
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        lines.push(row);
        row = [''];
      } else {
        row[row.length - 1] += char;
      }
    }
    if (row.length > 1 || row[0] !== '') {
      lines.push(row);
    }
    return lines;
  };

  const handleUpload = async () => {
    if (parsedProducts.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: parsedProducts })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload products');
      setSuccess(true);
      setTimeout(() => {
        onUploadComplete();
        onClose();
        resetModal();
      }, 1500);
    } catch (err: any) {
      setErrors([err.message]);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setFile(null);
    setParsedProducts([]);
    setErrors([]);
    setSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-surface-container shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" /> Bulk Upload Products
          </h3>
          <button onClick={() => { onClose(); resetModal(); }} className="p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <h4 className="font-display text-lg font-bold text-primary">Upload Successful!</h4>
              <p className="text-sm text-on-secondary-container opacity-80 mt-1">
                Successfully imported {parsedProducts.length} products.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-surface/50 border border-outline/10 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-primary">Need the template format?</h4>
                  <p className="text-[11px] text-on-secondary-container opacity-80">
                    Download our structured sample CSV file to ensure your data fits.
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" className="text-[10px] flex items-center gap-1.5" onClick={downloadSampleCSV}>
                  <FileText className="w-3.5 h-3.5" /> Sample Template
                </Button>
              </div>

              <div 
                className="border-2 border-dashed border-outline/25 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center bg-surface/10 cursor-pointer relative"
                onClick={() => document.getElementById('csv-file-input')?.click()}
              >
                <input 
                  type="file"
                  id="csv-file-input"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <Upload className="w-8 h-8 mx-auto text-on-secondary-container opacity-50 mb-3" />
                <p className="text-sm font-bold text-primary">
                  {file ? file.name : 'Select CSV file to upload'}
                </p>
                <p className="text-xs text-on-secondary-container opacity-60 mt-1">
                  Drag and drop your file here, or click to browse
                </p>
              </div>

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-xs">
                    <AlertCircle className="w-4 h-4" /> Errors occurred:
                  </div>
                  <ul className="list-disc pl-5 text-xs text-red-600 space-y-1 max-h-32 overflow-y-auto">
                    {errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {parsedProducts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-primary flex items-center justify-between">
                    <span>Parsed Products ({parsedProducts.length})</span>
                    <span className="text-[10px] opacity-70">Please review before uploading</span>
                  </h4>
                  <div className="border border-surface-container-low rounded-2xl p-3 bg-surface/20 divide-y divide-surface-container-low max-h-56 overflow-y-auto">
                    {parsedProducts.map((p, idx) => (
                      <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                        <div>
                          <div className="text-xs font-bold text-primary">{p.name}</div>
                          <div className="text-[10px] text-on-secondary-container opacity-70">
                            Category: {p.category} | Links: {p.links?.length || 0}
                          </div>
                          {p.description && (
                            <div className="text-[10px] text-on-secondary-container opacity-50 truncate max-w-sm mt-0.5">
                              {p.description}
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-bold text-primary whitespace-nowrap">{p.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!success && (
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-container-low flex-shrink-0">
            <Button type="button" variant="ghost" onClick={() => { onClose(); resetModal(); }} disabled={loading}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleUpload} 
              disabled={loading || parsedProducts.length === 0 || errors.some(e => e.includes('required'))}
            >
              {loading ? 'Uploading...' : `Upload ${parsedProducts.length || ''} Products`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

