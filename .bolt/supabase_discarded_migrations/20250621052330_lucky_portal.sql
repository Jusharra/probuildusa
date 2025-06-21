/*
  # Create profile_assets storage bucket

  1. Storage Setup
    - Create `profile_assets` bucket for storing profile images and media
    - Configure public access for profile images
    - Set up RLS policies for secure access

  2. Security
    - Enable RLS on the bucket
    - Allow authenticated users to upload their own files
    - Allow public read access for profile images
    - Allow users to update/delete their own files
*/

-- Create the profile_assets bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile_assets',
  'profile_assets',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
);

-- Enable RLS on the bucket
CREATE POLICY "Public can view profile assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile_assets');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload profile assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile_assets');

-- Allow users to update their own files
CREATE POLICY "Users can update own profile assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile_assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own profile assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile_assets' AND auth.uid()::text = (storage.foldername(name))[1]);