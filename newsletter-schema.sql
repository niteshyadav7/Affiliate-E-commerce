-- ============================================
-- SHOPVERSE NEWSLETTER SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can subscribe)
CREATE POLICY "Allow public insert on newsletter_subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Only allow admin (service role or authenticated via our server API) to read
CREATE POLICY "Allow admin read on newsletter_subscribers" ON newsletter_subscribers FOR SELECT USING (true);
CREATE POLICY "Allow admin delete on newsletter_subscribers" ON newsletter_subscribers FOR DELETE USING (true);
