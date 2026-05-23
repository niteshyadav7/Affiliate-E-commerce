-- ============================================
-- ADVERTISEMENT CONFIGURATIONS SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS ad_configs (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  ad_type TEXT DEFAULT 'custom', -- 'script' (AdSense code) or 'custom' (image + link)
  script_code TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  link_url TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE ad_configs ENABLE ROW LEVEL SECURITY;

-- Policies for public and admin operations (matching products table permissions)
CREATE POLICY "Allow public read on ad_configs" ON ad_configs FOR SELECT USING (true);
CREATE POLICY "Allow all operations on ad_configs" ON ad_configs FOR ALL USING (true) WITH CHECK (true);

-- Pre-populate default ad slots
INSERT INTO ad_configs (id, label, is_enabled, ad_type, image_url, link_url) VALUES
(
  'header_top', 
  'Header Top Banner (All Devices)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', 
  '/'
),
(
  'homepage_hero', 
  'Homepage Hero Banner (728x90)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', 
  '/'
),
(
  'homepage_grid', 
  'Homepage Product Grid Card (Native)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', 
  '/'
),
(
  'homepage_mid_grid', 
  'Homepage Mid-Grid Horizontal Banner', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', 
  '/'
),
(
  'left_skyscraper', 
  'Left Skyscraper Banner (160x600 - Wide Desktop)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80', 
  '/'
),
(
  'right_skyscraper', 
  'Right Skyscraper Banner (160x600 - Wide Desktop)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80', 
  '/'
),
(
  'product_detail_top', 
  'Product Page Top Banner (728x90)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', 
  '/'
),
(
  'product_detail_sidebar', 
  'Product Page Sidebar/CTA Ad (300x250)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80', 
  '/'
),
(
  'product_detail_bottom', 
  'Product Page Bottom Banner (728x90)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', 
  '/'
),
(
  'mobile_anchor', 
  'Mobile Sticky Bottom Anchor (320x50 - Mobile Only)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80', 
  '/'
),
(
  'tablet_anchor', 
  'Tablet Sticky Bottom Anchor (728x90 - Tablet Only)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80', 
  '/'
),
(
  'footer_banner', 
  'Storefront Footer Banner (All Devices)', 
  false, 
  'custom', 
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', 
  '/'
)
ON CONFLICT (id) DO NOTHING;
