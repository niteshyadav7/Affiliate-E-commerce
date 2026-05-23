-- =========================================================
-- DIVERSIFIED Y&P MIGRATION: PRODUCT DETAILS
-- Run this in your Supabase SQL Editor
-- =========================================================

-- 1. Create product_details table
CREATE TABLE IF NOT EXISTS product_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  
  -- Rich content
  long_description TEXT DEFAULT '',
  highlights TEXT[] DEFAULT '{}',          -- Array of bullet-point highlights
  specifications JSONB DEFAULT '{}',       -- Key-value pairs e.g. {"Weight": "250g", "Battery": "30hrs"}
  
  -- Gallery (array of image URLs)
  gallery_images TEXT[] DEFAULT '{}',
  
  -- Social proof
  rating NUMERIC(2,1) DEFAULT 0.0,         -- e.g. 4.5
  reviews_count INTEGER DEFAULT 0,
  
  -- Stock & shipping
  stock_status TEXT DEFAULT 'in_stock',     -- 'in_stock', 'low_stock', 'out_of_stock'
  shipping_info TEXT DEFAULT 'Free shipping on orders over $50',
  
  -- SEO
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_product_details_product_id ON product_details(product_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;

-- 4. Create policies - allow public read, all operations for admin/service role
CREATE POLICY "Allow public read on product_details" ON product_details FOR SELECT USING (true);
CREATE POLICY "Allow all operations on product_details" ON product_details FOR ALL USING (true) WITH CHECK (true);
