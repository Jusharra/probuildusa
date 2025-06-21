/*
  # Add Contractor Profile Fields for SEO-Optimized Public Pages

  1. New Fields
    - Enhanced contact and business information
    - Social media links and marketing assets
    - SEO and location data
    - Booking and interaction preferences
  
  2. SEO Features
    - Structured data support
    - Location and service area targeting
    - Rich media gallery support
*/

-- Add new columns to contractors table for rich profile content
ALTER TABLE contractors 
ADD COLUMN IF NOT EXISTS tagline text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS license_number text,
ADD COLUMN IF NOT EXISTS years_experience int DEFAULT 0,
ADD COLUMN IF NOT EXISTS certifications text[],
ADD COLUMN IF NOT EXISTS insurance_info text,
ADD COLUMN IF NOT EXISTS social_facebook text,
ADD COLUMN IF NOT EXISTS social_instagram text,
ADD COLUMN IF NOT EXISTS social_linkedin text,
ADD COLUMN IF NOT EXISTS social_youtube text,
ADD COLUMN IF NOT EXISTS image_gallery text[],
ADD COLUMN IF NOT EXISTS featured_video text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS service_regions text[],
ADD COLUMN IF NOT EXISTS google_maps_embed_url text,
ADD COLUMN IF NOT EXISTS allow_booking boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS featured_profile boolean DEFAULT false;

-- Create index for slug-based lookups
CREATE INDEX IF NOT EXISTS contractors_slug_idx ON contractors(slug);

-- Create index for location-based searches
CREATE INDEX IF NOT EXISTS contractors_location_idx ON contractors(location);
CREATE INDEX IF NOT EXISTS contractors_service_regions_idx ON contractors USING GIN(service_regions);

-- Update RLS policies to allow public read access for active contractors
CREATE POLICY "Public can read active contractor profiles"
  ON contractors
  FOR SELECT
  TO public
  USING (listing_status = 'active');