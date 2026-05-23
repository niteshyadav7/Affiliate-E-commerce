-- =========================================================
-- DIVERSIFIED Y&P MIGRATION: MULTI-ROLE ADMIN AUTHENTICATION
-- Run this in your Supabase SQL Editor
-- =========================================================

-- 1. Create admin users credentials table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor', 'viewer')),
  password TEXT NOT NULL,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for admin_users table
CREATE POLICY "Allow all operations on admin_users" 
  ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- 4. Seed default Super Admin account
INSERT INTO admin_users (username, role, password, is_blocked)
VALUES ('admin', 'super_admin', 'admin123', false)
ON CONFLICT (username) DO NOTHING;
