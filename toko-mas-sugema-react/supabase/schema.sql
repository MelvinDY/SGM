-- Supabase Schema for Toko Mas Sugema
-- Run this in Supabase SQL Editor

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Cincin', 'Kalung', 'Gelang', 'Anting')),
  weight TEXT NOT NULL,
  karat TEXT NOT NULL,
  price NUMERIC,
  description TEXT,
  image_url TEXT NOT NULL,
  instagram_post_id TEXT,
  instagram_permalink TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instagram sync log table
CREATE TABLE IF NOT EXISTS instagram_sync_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  posts_added INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'partial'))
);

-- Admin users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to products table
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public can read active products
CREATE POLICY "Public can read active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Authenticated admins can do everything
CREATE POLICY "Admins have full access to products"
  ON products FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Enable RLS on instagram_sync_log
ALTER TABLE instagram_sync_log ENABLE ROW LEVEL SECURITY;

-- Only admins can access sync logs
CREATE POLICY "Admins can access sync logs"
  ON instagram_sync_log FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admins can read admin_users
CREATE POLICY "Admins can read admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_instagram_post_id ON products(instagram_post_id);

-- Insert sample products (optional - for testing)
-- Uncomment to seed data
/*
INSERT INTO products (name, category, weight, karat, image_url, is_featured) VALUES
  ('Cincin Berlian Solitaire', 'Cincin', '3.5 gram', '24K', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', true),
  ('Kalung Emas Italian', 'Kalung', '8.2 gram', '24K', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', true),
  ('Gelang Emas Ukir', 'Gelang', '12.0 gram', '24K', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', true),
  ('Anting Mutiara Premium', 'Anting', '2.8 gram', '22K', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop', true);
*/
