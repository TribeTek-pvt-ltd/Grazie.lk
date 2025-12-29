-- Categories and Materials Tables for Supabase

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MATERIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- UPDATE PRODUCTS TABLE
-- ============================================
-- Add foreign key constraints to products table
ALTER TABLE products 
  DROP COLUMN IF EXISTS category,
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

ALTER TABLE products 
  DROP COLUMN IF EXISTS material,
  ADD COLUMN IF NOT EXISTS material_id UUID REFERENCES materials(id) ON DELETE SET NULL;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Public can read categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin can manage categories
CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Enable RLS on materials
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- Public read access for materials
CREATE POLICY "Public can read materials"
  ON materials
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin can manage materials
CREATE POLICY "Admins can manage materials"
  ON materials
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_materials_name ON materials(name);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_material_id ON products(material_id);

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================
INSERT INTO categories (name, description) VALUES
  ('Furniture', 'Tables, chairs, sofas, and other furniture items'),
  ('Decor', 'Decorative items and accessories'),
  ('Lighting', 'Lamps, chandeliers, and lighting fixtures'),
  ('Textiles', 'Curtains, rugs, and fabric items'),
  ('Accessories', 'Small decorative accessories')
ON CONFLICT (name) DO NOTHING;

INSERT INTO materials (name, description) VALUES
  ('Wood', 'Wooden products and furniture'),
  ('Metal', 'Metal and steel products'),
  ('Glass', 'Glass and crystal items'),
  ('Fabric', 'Textile and fabric products'),
  ('Ceramic', 'Ceramic and pottery items'),
  ('Plastic', 'Plastic and synthetic materials')
ON CONFLICT (name) DO NOTHING;
