/*
  # Profile Assets Storage Structure

  1. New Storage Bucket
    - Creates a new 'profile_assets' bucket for storing contractor profile media
    - Sets up appropriate RLS policies for the bucket
  
  2. Security
    - Enables RLS on the new bucket
    - Adds policies for authenticated users to manage their own files
    - Adds policies for admins to manage all files
    - Adds policies for public read access to approved media
*/

-- Create the profile_assets bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_assets', 'profile_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
UPDATE storage.buckets SET public = false WHERE id = 'profile_assets';

-- Create policy to allow users to upload their own files
CREATE POLICY "Users can upload their own profile assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile_assets' AND
  (
    -- Allow users to upload to their own contractor folder
    (auth.uid()::text = (storage.foldername(name))[1]) OR
    -- Allow contractors to upload to their contractor ID folder
    EXISTS (
      SELECT 1 FROM public.contractors
      WHERE contractors.user_id = auth.uid() 
      AND (storage.foldername(name))[1] = contractors.id::text
    )
  )
);

-- Create policy to allow users to update their own files
CREATE POLICY "Users can update their own profile assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile_assets' AND
  (
    -- Allow users to update files in their own folder
    (auth.uid()::text = (storage.foldername(name))[1]) OR
    -- Allow contractors to update files in their contractor ID folder
    EXISTS (
      SELECT 1 FROM public.contractors
      WHERE contractors.user_id = auth.uid() 
      AND (storage.foldername(name))[1] = contractors.id::text
    )
  )
)
WITH CHECK (
  bucket_id = 'profile_assets' AND
  (
    -- Allow users to update files in their own folder
    (auth.uid()::text = (storage.foldername(name))[1]) OR
    -- Allow contractors to update files in their contractor ID folder
    EXISTS (
      SELECT 1 FROM public.contractors
      WHERE contractors.user_id = auth.uid() 
      AND (storage.foldername(name))[1] = contractors.id::text
    )
  )
);

-- Create policy to allow users to delete their own files
CREATE POLICY "Users can delete their own profile assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile_assets' AND
  (
    -- Allow users to delete files in their own folder
    (auth.uid()::text = (storage.foldername(name))[1]) OR
    -- Allow contractors to delete files in their contractor ID folder
    EXISTS (
      SELECT 1 FROM public.contractors
      WHERE contractors.user_id = auth.uid() 
      AND (storage.foldername(name))[1] = contractors.id::text
    )
  )
);

-- Create policy to allow users to read their own files
CREATE POLICY "Users can read their own profile assets"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile_assets' AND
  (
    -- Allow users to read files in their own folder
    (auth.uid()::text = (storage.foldername(name))[1]) OR
    -- Allow contractors to read files in their contractor ID folder
    EXISTS (
      SELECT 1 FROM public.contractors
      WHERE contractors.user_id = auth.uid() 
      AND (storage.foldername(name))[1] = contractors.id::text
    )
  )
);

-- Create policy to allow public to read approved media
CREATE POLICY "Public can read approved contractor media"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'profile_assets' AND
  EXISTS (
    SELECT 1 FROM public.contractors
    WHERE 
      contractors.id::text = (storage.foldername(name))[1] AND
      contractors.listing_status = 'active' AND
      contractors.media_approved = true
  )
);

-- Create policy to allow admins to manage all files
CREATE POLICY "Admins can manage all profile assets"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'profile_assets' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'profile_assets' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);