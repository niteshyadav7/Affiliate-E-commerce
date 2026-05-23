-- ============================================
-- DIVERSIFIED Y&P DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT 'General',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Product links table (multiple links per product)
CREATE TABLE IF NOT EXISTS product_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Link',
  click_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

-- 3. Product counters table (tracks round-robin index)
CREATE TABLE IF NOT EXISTS product_counters (
  product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  next_index INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0
);

-- 4. Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_product_links_product_id ON product_links(product_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_links_sort_order ON product_links(product_id, sort_order);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_counters ENABLE ROW LEVEL SECURITY;

-- 6. Create policies - allow public read, all operations for service role
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read on product_links" ON product_links FOR SELECT USING (true);
CREATE POLICY "Allow public read on product_counters" ON product_counters FOR SELECT USING (true);

-- Allow all operations (admin will use anon key with these policies)
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on product_links" ON product_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on product_counters" ON product_counters FOR ALL USING (true) WITH CHECK (true);

-- 7. Function for atomic round-robin redirect
CREATE OR REPLACE FUNCTION get_next_redirect(p_product_id UUID)
RETURNS TABLE(redirect_url TEXT, link_label TEXT) AS $$
DECLARE
  v_next_index INTEGER;
  v_total_links INTEGER;
  v_url TEXT;
  v_label TEXT;
BEGIN
  -- Get total links count
  SELECT COUNT(*) INTO v_total_links FROM product_links WHERE product_id = p_product_id;
  
  IF v_total_links = 0 THEN
    RETURN;
  END IF;

  -- Get current index and increment atomically
  INSERT INTO product_counters (product_id, next_index, total_clicks)
  VALUES (p_product_id, 0, 0)
  ON CONFLICT (product_id) DO NOTHING;

  UPDATE product_counters 
  SET next_index = next_index + 1, total_clicks = total_clicks + 1
  WHERE product_id = p_product_id
  RETURNING (next_index - 1) INTO v_next_index;

  -- Wrap around using modulo
  v_next_index := v_next_index % v_total_links;

  -- Get the link at this index
  SELECT pl.url, pl.label INTO v_url, v_label
  FROM product_links pl
  WHERE pl.product_id = p_product_id
  ORDER BY pl.sort_order ASC
  LIMIT 1 OFFSET v_next_index;

  -- Increment click count on this specific link
  UPDATE product_links 
  SET click_count = click_count + 1 
  WHERE product_id = p_product_id 
    AND url = v_url 
    AND label = v_label;

  redirect_url := v_url;
  link_label := v_label;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;
