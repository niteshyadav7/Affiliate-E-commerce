-- =========================================================
-- DIVERSIFIED Y&P MIGRATION: SLUGS & DETAILED CLICK TRACKING
-- Run this in your Supabase SQL Editor
-- =========================================================

-- 1. Add slug column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 2. Create click events logging table
CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  link_id UUID REFERENCES product_links(id) ON DELETE CASCADE,
  country_code TEXT DEFAULT 'Unknown',
  device_type TEXT DEFAULT 'Desktop',
  referrer TEXT DEFAULT 'Direct',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS on click_events and add policies
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on click_events" 
  ON click_events FOR SELECT USING (true);

CREATE POLICY "Allow public insert on click_events" 
  ON click_events FOR INSERT WITH CHECK (true);

-- 4. Create index for faster analytics queries
CREATE INDEX IF NOT EXISTS idx_click_events_product_id ON click_events(product_id);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events(created_at);

-- 5. Drop the old function before creating the updated one
DROP FUNCTION IF EXISTS get_next_redirect(UUID);

-- 6. Create the updated atomic redirect function
CREATE OR REPLACE FUNCTION get_next_redirect(
  p_product_id UUID,
  p_country_code TEXT,
  p_device_type TEXT,
  p_referrer TEXT
)
RETURNS TABLE(redirect_url TEXT, link_label TEXT) AS $$
DECLARE
  v_next_index INTEGER;
  v_total_links INTEGER;
  v_url TEXT;
  v_label TEXT;
  v_link_id UUID;
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

  -- Get the link details and link ID at this index
  SELECT pl.id, pl.url, pl.label INTO v_link_id, v_url, v_label
  FROM product_links pl
  WHERE pl.product_id = p_product_id
  ORDER BY pl.sort_order ASC
  LIMIT 1 OFFSET v_next_index;

  -- Increment click count on this specific link
  UPDATE product_links 
  SET click_count = click_count + 1 
  WHERE id = v_link_id;

  -- Record the click event
  INSERT INTO click_events (product_id, link_id, country_code, device_type, referrer)
  VALUES (p_product_id, v_link_id, p_country_code, p_device_type, p_referrer);

  redirect_url := v_url;
  link_label := v_label;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;
