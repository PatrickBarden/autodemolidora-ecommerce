-- Migration: Add images column to products table
-- Run this SQL in your Supabase SQL Editor

-- Add images column as JSONB array to store multiple image URLs
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Optional: Migrate existing image_url to images array
UPDATE products 
SET images = jsonb_build_array(image_url) 
WHERE image_url IS NOT NULL 
  AND image_url != '' 
  AND (images IS NULL OR images = '[]'::jsonb);

-- Add comment for documentation
COMMENT ON COLUMN products.images IS 'Array of image URLs for the product. First image is the main/primary image.';
