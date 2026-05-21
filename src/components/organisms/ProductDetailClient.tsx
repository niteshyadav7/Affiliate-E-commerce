"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  ExternalLink,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Button from '../atoms/Button';
import Navbar from './Navbar';
import Footer from './Footer';
import Masks from '../Masks';

interface ProductLinkType {
  id: string;
  product_id: string;
  url: string;
  label: string;
  click_count: number;
  sort_order: number;
}

interface ProductDetailsType {
  id: string;
  product_id: string;
  long_description: string;
  highlights: string[];
  specifications: Record<string, string>;
  gallery_images: string[];
  rating: number;
  reviews_count: number;
  stock_status: string;
  shipping_info: string;
  meta_title: string;
  meta_description: string;
}

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  slug: string | null;
  is_active: boolean;
  product_links?: ProductLinkType[];
  product_details?: ProductDetailsType | null;
}

interface ProductDetailClientProps {
  product: ProductType;
  relatedProducts: ProductType[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const details = product.product_details;
  const links = product.product_links || [];
  
  // Setup images list (primary image + gallery images)
  const allImages = [
    product.image_url,
    ...(details?.gallery_images || [])
  ].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Formatting helper for prices
  const displayPrice = product.price;

  // Stock badge colors and labels
  const getStockStatus = (status: string) => {
    switch (status) {
      case 'low_stock':
        return { label: 'Low Stock', className: 'bg-accent-amber/20 text-primary border border-accent-amber' };
      case 'out_of_stock':
        return { label: 'Out of Stock', className: 'bg-error/10 text-error border border-error/20' };
      case 'in_stock':
      default:
        return { label: 'In Stock', className: 'bg-accent-lime/20 text-primary border border-accent-lime' };
    }
  };

  const stockInfo = getStockStatus(details?.stock_status || 'in_stock');

  // Trigger main round-robin affiliate redirect
  const handleBuyNow = () => {
    window.open(`/api/redirect/${product.id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Masks />
      
      {/* Promo Bar */}
      <div className="bg-accent-coral h-[40px] w-full flex items-center justify-center text-white font-body text-[12px] md:text-sm px-4 z-[60] relative">
        <div className="flex items-center gap-4">
          <span className="font-bold uppercase tracking-wide text-center">
            Limited Time Offer: Get 20% off on all Electronics! Use code: 
            <span className="bg-white/20 px-2 py-0.5 rounded mx-2">SHOP20</span>
          </span>
        </div>
      </div>

      <Navbar />

      <main className="pt-[140px] pb-section-gap px-page-margin-mobile md:px-page-margin-desktop max-w-7xl mx-auto relative z-20">
        
        {/* Back navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-body-sm text-on-secondary-container">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary flex items-center gap-1 font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
          </div>
          <div className="flex items-center gap-2 font-body">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="capitalize">{product.category.toLowerCase()}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-primary font-bold">{product.name}</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 md:p-10 border border-surface-container shadow-sm mb-16 relative overflow-hidden grain-texture">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl bg-surface-container-low overflow-hidden border border-surface-container group">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={allImages[activeImageIndex]}
                alt={`${product.name} gallery image`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-primary border border-surface-white/20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-accent-coral" /> Shopverse Verified
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 ${
                      activeImageIndex === idx ? 'border-primary shadow-md' : 'border-surface-container hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Badges & Category */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className={`px-3 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-wider ${stockInfo.className}`}>
                  {stockInfo.label}
                </span>
                <span className="bg-surface-container-low text-primary border border-surface-container-high px-3 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-display text-[32px] md:text-[42px] leading-tight text-primary font-bold">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-surface-container py-4">
                <div className="text-display-lg text-primary font-display">
                  {displayPrice}
                </div>
                
                {details && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-accent-amber">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < Math.floor(details.rating) 
                              ? 'fill-current' 
                              : 'opacity-30'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="font-body text-body-md text-primary font-bold">
                      {details.rating.toFixed(1)}
                    </span>
                    <span className="font-body text-body-sm text-on-secondary-container">
                      ({details.reviews_count} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="font-body text-body-lg text-secondary leading-relaxed">
                {product.description}
              </p>

              {/* Product Highlights */}
              {details?.highlights && details.highlights.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-display text-body-md font-bold text-primary uppercase tracking-wider">Product Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5 font-body text-body-sm text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-accent-coral shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTAs and Purchases options */}
            <div className="mt-8 pt-6 border-t border-surface-container space-y-6">
              
              {/* Primary Redirect BUY NOW */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-1 flex items-center justify-center gap-2 group text-white font-extrabold cursor-pointer"
                  onClick={handleBuyNow}
                  disabled={details?.stock_status === 'out_of_stock'}
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {details?.stock_status === 'out_of_stock' ? 'OUT OF STOCK' : 'BUY NOW'}
                </Button>
              </div>

              {/* Where to Buy (Affiliate aggregator links) */}
              {links.length > 0 && (
                <div className="bg-surface-container-low rounded-2xl p-4 border border-surface-container">
                  <div className="text-body-sm font-bold text-primary mb-3 font-display uppercase tracking-wider flex items-center gap-1.5">
                    Compare Alternate Retailers
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-primary hover:text-white border border-surface-container text-primary transition-all group font-body text-body-sm font-semibold shadow-sm"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-accent-lime group-hover:bg-white transition-colors"></span>
                          {link.label}
                        </span>
                        <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery and Trust Badges */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary font-display uppercase tracking-wider">Fast Shipping</span>
                  <span className="text-[9px] text-on-secondary-container font-body leading-tight">
                    {details?.shipping_info || 'Free standard shipping'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary font-display uppercase tracking-wider">Buyer Protection</span>
                  <span className="text-[9px] text-on-secondary-container font-body leading-tight">Secure checkout verified</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-bold text-primary font-display uppercase tracking-wider">Flexible Returns</span>
                  <span className="text-[9px] text-on-secondary-container font-body leading-tight">30-day money back guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Tabs: Detailed Description / Specs */}
        {details && (
          <div className="bg-white rounded-3xl border border-surface-container shadow-sm p-6 md:p-10 mb-16">
            <div className="flex border-b border-surface-container mb-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 px-2 font-display text-body-md font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer -mb-px ${
                  activeTab === 'description'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-secondary-container hover:text-primary'
                }`}
              >
                Detailed Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`pb-4 px-6 font-display text-body-md font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer -mb-px ${
                  activeTab === 'specifications'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-secondary-container hover:text-primary'
                }`}
              >
                Specifications
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'description' ? (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="prose max-w-none text-secondary leading-relaxed font-body text-body-lg"
                >
                  <p className="whitespace-pre-line">{details.long_description || product.description}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-3xl"
                >
                  {Object.keys(details.specifications || {}).length > 0 ? (
                    <div className="rounded-2xl overflow-hidden border border-surface-container">
                      <table className="w-full border-collapse text-left font-body text-body-md">
                        <tbody>
                          {Object.entries(details.specifications).map(([key, val], idx) => (
                            <tr 
                              key={key} 
                              className={`border-b border-surface-container ${
                                idx % 2 === 0 ? 'bg-surface-container-low/30' : 'bg-white'
                              }`}
                            >
                              <td className="p-4 font-bold text-primary w-1/3">{key}</td>
                              <td className="p-4 text-secondary">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-on-secondary-container italic font-body">
                      No technical specifications are available for this product.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8">
            <h3 className="font-display text-headline-md text-primary">
              Related <span className="relative">Products
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent-lime -z-10"></span>
              </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => {
                const productPrice = p.price;
                return (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl p-4 border border-surface-container hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square rounded-xl bg-surface-container-low mb-4 overflow-hidden relative">
                        <img 
                          src={p.image_url} 
                          alt={p.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h4 className="font-display text-body-md font-semibold text-primary mb-1">{p.name}</h4>
                      <p className="font-body text-body-sm text-on-secondary-container mb-4">{productPrice}</p>
                    </div>
                    
                    <Link 
                      href={`/product/${p.slug || p.id}`}
                      className="w-full text-center py-2.5 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors font-body text-body-sm font-bold text-primary block"
                    >
                      VIEW DETAILS
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
