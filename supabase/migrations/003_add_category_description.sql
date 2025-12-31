-- Add description column to Category table if it doesn't already exist
-- Ensure you are targeting the correct table name (PascalCase 'Category')
ALTER TABLE IF EXISTS "Category" ADD COLUMN IF NOT EXISTS description TEXT;

-- If your table is actually lowercase 'categories', use this instead:
-- ALTER TABLE IF EXISTS categories ADD COLUMN IF NOT EXISTS description TEXT;

-- After running this, if you still see the error, you may need to reload the schema cache:
-- NOTIFY pgrst, 'reload schema';
