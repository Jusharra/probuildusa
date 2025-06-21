/*
  # Add Media Fields to Contractors Table

  1. New Fields
    - `feature_media_url` (text) - URL for the featured image
    - `carousel_media_urls` (text[]) - Array of URLs for carousel images
    - `media_approved` (boolean) - Flag to indicate if media has been approved

  2. Security
    - Create admin-only RLS policy for profile_assets bucket
*/

-- Add media fields to contractors table
ALTER TABLE contractors
ADD COLUMN IF NOT EXISTS feature_media_url text,
ADD COLUMN IF NOT EXISTS carousel_media_urls text[],
ADD COLUMN IF NOT EXISTS media_approved boolean DEFAULT true;

-- Create admin-only RLS policy for profile_assets bucket
DROP POLICY IF EXISTS "Admins manage profile assets" ON storage.objects;

CREATE POLICY "Admins manage profile assets"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'profile_assets'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'profile_assets'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Create policy for contractors to view their own media
CREATE POLICY "Contractors can view their own media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile_assets'
  AND (
    -- Path pattern: /contractors/<contractor_id>/*
    (storage.foldername(name))[1] = 'contractors'
    AND (storage.foldername(name))[2] IN (
      SELECT id::text FROM contractors
      WHERE user_id = auth.uid()
    )
  )
);