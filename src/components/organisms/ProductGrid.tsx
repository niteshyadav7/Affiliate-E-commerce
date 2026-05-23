"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../molecules/ProductCard';
import { supabase } from '@/lib/supabase';
import AdBanner from '../molecules/AdBanner';

const PRODUCTS = [
  { id: 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', name: "Acoustic Pro Max", slug: "acoustic-pro-max", price: 299.00, category: "ELECTRONICS", tag: "ELECTRONICS", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8ZxBELdGezf2X1RdWRBcZSz3S9vJsXJj9bO0vnGYaNNcBB2dqbGQHF0yp0Cs6l1OZ1ghSB6UKe2pnKi6bFNsl98lWaVFRrrLsY3k0Xil55X8WLQZb8mf3SOTtv8uTNUipFW0rqaCXZSX00v7HFT4yUoHspg61T5c-961rzFzTadlOPfotNkJ1ZlLdSxcGd6_58s75nQrhpnasVHJ6vpBkzlzcgHUQaz2_ksINM4VvBrIOfD1G7HWd9JN-KnvpaXqBb7V0Arsc-b4" },
  { id: 'b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e', name: "Nexus Watch S", slug: "nexus-watch-s", price: 149.00, category: "ELECTRONICS", tag: "ELECTRONICS", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV89iLGzkvvbvSFuypVD4OR9w4RojkGVABDdTX9E4yHKBpxlbNb-POaQAKjaNjkIGg7RZ6HPG9NcEbYTJzFXMSw9_KTqkcMU756b1yHaSk-QnYS-1eAZlUehC81GcjPtv_GfMDReXEQWnmHFf8LSveBUFdwNJNJOpcHU_zoKYirUDGtD3yjbPcAokbMuWLaDP7niJ1GlUA-OqAZD47P6giuJRKfMmS2-wnOyqprZvxDhIWKXHj6fduUWBGZsIk6FrxveBNks6EC139" },
  { id: 'c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f', name: "Velocity Run V2", slug: "velocity-run-v2", price: 120.00, category: "GADGETS", tag: "NEW ARRIVAL", tagVariant: 'coral' as const, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYvpAlE3hnm3zMcKCcJcIUnJwlJY2wB_zOfErrprKRvhqArX4HRacyYowJAUFNCyRQpcnDXMdTaZxrE6-v_NRiTb3su7yYmwfK5P-RpJ4G0I1sLjW6Hx5vuruu98pUhun50LvHbMJ33ik_eQcOM_kZ_G9fhrkMLBsPLTZllKGlf5AUMe0HLLpZkz7zersm3tQpn2T3VD9sRiUO4MD4WmxFswGB3OKm2tv1Sqg0WRQe5EsZdhUSSKfZ044fqkVHBz690VaLwX3af-Pj" },
  { id: 'd4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a', name: "Aura Air Notebook", slug: "aura-air-notebook", price: 899.00, category: "ELECTRONICS", tag: "ELECTRONICS", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKUJe1qRt_4KXB3jNwH7fO8Fv5a7mwz2iyTAeeQTtaYAcBEap_80mG-hNSuBwP8KKYpdfg5ppvL04iMbEXBNiFzwUedyNaZI9lHE9NO1mHa_IMOOdozNEWSUOJ-VahjcmYLGEGX6QDe-wT0SNU4DfEOaL_XxXRptXatv5gF2wpwrj3-fzBtD1puEKESW6VDeGtVjhFfc5d_O5e-LdOS-sKkVXntdbIskTmgLNdPgrH9nkG7BZo1I5GQqEf0JKI0C3mfOoml8BO5M2N" },
  { id: 'e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b', name: "Nomad Pack", slug: "nomad-pack", price: 85.00, category: "LIFESTYLE", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-dWmpKH_dr46FBsaLN9lC7sbwkMZs-Y__nR_sIxD6ObTOSXqab57wukCQOuLHzwjzWiK9fdbUPOeseTp1Og8-R5CB5KcpIAIjAAhCo7iXuoi_hIyyfcdx1WwCmL8Z6Jz8ZcEHNj8HhQ5oSsRflZ9DFCxnudVx-Q6YRYAkx8d6aVsPvFAwlFub2GT_zq-9w2aOIIUjMua1G0hnUEMeyYZT_y6gaAwsKNpIdpAGTOWuDgg2yNRtYH5DB0TT09dgve87iV38ykV8oX-c" },
  { id: 'f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c', name: "Horizon Specs", slug: "horizon-specs", price: 180.00, category: "FASHION", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqKwrjV6OBZJnv6aBF-hnADm-K68XNQSHdFIIa3JruAnH_CmW7GfUUIandDWKdUDXJKbxI-4i4RGwFzsIScWENUR_bf05fBNoG7BRWerSFJKvLexH6CYhQrZK1fiYlivER9WKJ0owRZkwRLhuyfvfGurvP65MaUosaGhjjGOuhGzoW4I5TZWJLY6qf-SZrjOLqokJuuLHxMLek5LpL8K4hL_GgOXwr-Rg_6_LRjObB-UeNjEemNHlf-4cXKWFlJkG82Gwv9LsCVgh" },
  { id: 'a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d', name: "BeanMaster Pro", slug: "bean-master-pro", price: 245.00, category: "LIFESTYLE", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1XtxEuJKlCLnnoX7KjrjXne8K4BR0wFfKOvmMzlI5Onk4lbkZvNMNDxSormIOdkZWolRPtKt5-SGZf94x0VRSp5JrS73p1uVPiXjo6dQj80kfCGX0ohvc554SjbV_sY28CF_B4uxQ1mi_5k6d4F7B1wPA8-mDKMiw_dMJl0miaOvRVPsQw4hEoSLRCXeSa8ryqv6-z-KP1ePL1TbqSGj5vNXU7I79b1GdSUwNVLjZlbXsczooFrZZYf6SAcHEDxb_AhYN4t92G5Bp" },
  { id: 'b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e', name: "Shield Case Ultra", slug: "shield-case-ultra", price: 35.00, category: "GADGETS", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5LF-RgRraOL3mWitI-IrYrA80I1qh3hPuJG3UiFcM2kdgjjWE37I0DoDjz2FEEY7Q7g5RVfu4l1-bJyOkJd4F9Q7NJ8Fi4QfvieP-aYdR4jKhZD56LcM_QgemofEbcxNn15Czbzw31isyPNPiKLjrOpqL0hxqbZZxequpsxZuSAfKCoXLfO-C4qXHdNMd6H0-1PcO9UUam5jhzAliq6qNWJLJj2eBuZlLrpKkUTrw0vuNDUsU9A7s7lgOfmNGzhsoUCfcb-exaj0h" }
];

// Client-side cache to enable instant loads during session navigation (SWR-like behavior)
let cachedProducts: any[] | null = null;

interface ProductGridProps {
  initialProducts?: any[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState<any[]>(
    cachedProducts || (initialProducts && initialProducts.length > 0 ? initialProducts : [])
  );
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(!cachedProducts && !(initialProducts && initialProducts.length > 0));
  const [adsConfig, setAdsConfig] = useState<Record<string, boolean>>({
    homepage_grid: false,
    homepage_mid_grid: false,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [productsRes, adsRes] = await Promise.all([
          supabase.from('products').select('*').eq('is_active', true),
          supabase.from('ad_configs').select('id, is_enabled')
        ]);

        if (productsRes.error) throw productsRes.error;

        let mapped: any[] = [];
        if (productsRes.data && productsRes.data.length > 0) {
          mapped = productsRes.data.map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            category: p.category ? p.category.toUpperCase() : 'LIFESTYLE',
            tag: p.category ? p.category.toUpperCase() : 'NEW ARRIVAL',
            image: p.image_url
          }));
        } else {
          // Use fallback products if DB is empty
          mapped = PRODUCTS.map(p => ({
            ...p,
            category: p.category.toUpperCase(),
            tag: p.tag?.toUpperCase()
          }));
        }
        setProducts(mapped);
        cachedProducts = mapped;

        if (adsRes.data) {
          const configMap: Record<string, boolean> = {};
          adsRes.data.forEach(ad => {
            configMap[ad.id] = ad.is_enabled;
          });
          setAdsConfig(configMap);
        }
      } catch (err) {
        console.warn('Could not load data from database, using fallback data:', err);
        const fallbackMapped = PRODUCTS.map(p => ({
          ...p,
          category: p.category.toUpperCase(),
          tag: p.tag?.toUpperCase()
        }));
        setProducts(fallbackMapped);
        cachedProducts = fallbackMapped;
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const isAdEnabled = (slotId: string) => {
    return adsConfig[slotId] ?? false;
  };

  const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Construct a flat list of items to render to maintain perfect grid row alignment
  const gridItems: { id: string; type: 'product' | 'ad'; data?: any }[] = [];
  filteredProducts.forEach((product, idx) => {
    gridItems.push({ id: product.id, type: 'product', data: product });
    // Render native card ad exactly after the 4th item (index 3) ONLY if it's enabled in the database config
    if (idx === 3 && isAdEnabled('homepage_grid')) {
      gridItems.push({ id: 'grid-native-ad', type: 'ad' });
    }
  });

  // If we have fewer than 4 products, and the native ad is enabled, we append the native ad at the end
  if (filteredProducts.length > 0 && filteredProducts.length < 4 && isAdEnabled('homepage_grid')) {
    if (!gridItems.some(item => item.id === 'grid-native-ad')) {
      gridItems.push({ id: 'grid-native-ad', type: 'ad' });
    }
  }

  // Chunk gridItems into groups of 8 (exactly 2 complete rows on desktop)
  const chunks: any[][] = [];
  for (let i = 0; i < gridItems.length; i += 8) {
    chunks.push(gridItems.slice(i, i + 8));
  }

  return (
    <div className="relative z-20 bg-surface">
      <div className="max-w-[1620px] mx-auto flex justify-center gap-6 px-4 pt-8 pb-12">
        {/* Left Skyscraper */}
        <div className="skyscraper-sticky-left shrink-0">
          <AdBanner slotId="left_skyscraper" />
        </div>

        {/* Main Content Content Wrapper */}
        <div className="flex-1 max-w-7xl min-w-0">
          <section className="px-page-margin-mobile md:px-page-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div className="space-y-4">
                <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-primary">
                  Featured <span className="relative">Products
                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-accent-lime -z-10"></span>
                  </span>
                </h2>
                
                {/* Category filter pills — show skeletons while loading */}
                {loading ? (
                  <div className="flex flex-wrap gap-2">
                    {[80, 110, 72, 88, 96, 104, 68].map((w, i) => (
                      <div
                        key={i}
                        className="shimmer rounded-full h-[32px]"
                        style={{ width: w, animationDelay: `${i * 0.08}s` }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full font-body text-[10px] font-bold transition-all cursor-pointer ${
                          activeCategory === cat 
                            ? 'bg-primary text-white' 
                            : 'bg-surface-container-low text-on-secondary-container hover:bg-primary/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product grid — shimmer skeletons or real cards */}
            <div className="space-y-gutter">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-surface-container h-full flex flex-col justify-between"
                      style={{ animationDelay: `${i * 0.07}s` }}
                    >
                      {/* Image skeleton */}
                      <div>
                        <div className="relative aspect-square rounded-xl mb-4 overflow-hidden">
                          <div className="shimmer w-full h-full" style={{ animationDelay: `${i * 0.1}s` }} />
                          {/* Fake tag badge */}
                          <div
                            className="shimmer absolute top-3 left-3 rounded-full h-[20px]"
                            style={{ width: 72, animationDelay: `${i * 0.12}s` }}
                          />
                        </div>
                        {/* Title skeleton — two lines */}
                        <div className="space-y-2 mb-2 min-h-[44px] flex flex-col justify-center">
                          <div className="shimmer rounded-md h-[14px] w-[85%]" style={{ animationDelay: `${i * 0.09}s` }} />
                          <div className="shimmer rounded-md h-[14px] w-[55%]" style={{ animationDelay: `${i * 0.11}s` }} />
                        </div>
                        {/* Price skeleton */}
                        <div className="shimmer rounded-md h-[12px] w-[40%] mb-3" style={{ animationDelay: `${i * 0.13}s` }} />
                      </div>
                      {/* Button skeleton */}
                      <div className="shimmer rounded-full h-[36px] w-full" style={{ animationDelay: `${i * 0.14}s` }} />
                    </div>
                  ))}
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {chunks.map((chunk, chunkIdx) => (
                    <div key={`chunk-${chunkIdx}`} className="space-y-gutter">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-4">
                        {chunk.map((item) => (
                          <div key={item.id} className="contents">
                            {item.type === 'product' ? (
                              <ProductCard {...item.data} />
                            ) : (
                              <AdBanner slotId="homepage_grid" />
                            )}
                          </div>
                        ))}
                      </div>

                      {chunk.length === 8 && isAdEnabled('homepage_mid_grid') && (
                        <div className="py-0">
                          <AdBanner 
                            slotId="homepage_mid_grid" 
                            className="w-full" 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </section>
        </div>

        {/* Right Skyscraper */}
        <div className="skyscraper-sticky-right shrink-0">
          <AdBanner slotId="right_skyscraper" />
        </div>
      </div>
    </div>
  );
}

