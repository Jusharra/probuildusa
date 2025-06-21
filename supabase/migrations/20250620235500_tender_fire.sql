/*
  # Add profile_image_url to profiles table

  1. Schema Changes
    - Add `profile_image_url` column to `profiles` table
    - Migrate existing profile image URLs from contractors table to profiles table
  
  2. Data Migration
    - Copy profile_image_url from contractors to profiles for matching user_ids
*/

-- Add profile_image_url column to profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'profile_image_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_image_url text;
  END IF;
END $$;

-- Migrate existing profile image URLs from contractors to profiles
UPDATE profiles p
SET profile_image_url = c.profile_image_url
FROM contractors c
WHERE p.id = c.user_id
AND c.profile_image_url IS NOT NULL;

-- Note: We're not removing profile_image_url from contractors table yet
-- to ensure backward compatibility. This should be done in a separate migration
-- after ensuring all code has been updated to use profiles.profile_image_url.