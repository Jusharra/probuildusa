/*
  # Create Storage Buckets

  1. New Storage Buckets
    - `public` - For publicly accessible files
    - `profile_assets` - For profile images and media
    - `contracts` - For contract documents
    - `uploads` - For general file uploads

  2. Security
    - Enable RLS on all buckets
    - Add policies for authenticated users
*/

-- Create public bucket for general public files
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Create profile_assets bucket for profile images and media
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_assets', 'profile_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create contracts bucket for contract documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('contracts', 'contracts', true)
ON CONFLICT (id) DO NOTHING;

-- Create uploads bucket for general file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on all buckets
DO $$
BEGIN
  -- Enable RLS on public bucket
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'public') THEN
    CREATE POLICY "Public Access" ON storage.objects FOR SELECT
    USING (bucket_id = 'public');
    
    CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'public');
    
    CREATE POLICY "Owners can update and delete" ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'public' AND (auth.uid() = owner));
    
    CREATE POLICY "Owners can delete" ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'public' AND (auth.uid() = owner));
  END IF;

  -- Enable RLS on profile_assets bucket
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'profile_assets') THEN
    CREATE POLICY "Public Access for profile_assets" ON storage.objects FOR SELECT
    USING (bucket_id = 'profile_assets');
    
    CREATE POLICY "Authenticated users can upload to profile_assets" ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'profile_assets');
    
    CREATE POLICY "Owners can update profile_assets" ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'profile_assets' AND (auth.uid() = owner));
    
    CREATE POLICY "Owners can delete profile_assets" ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'profile_assets' AND (auth.uid() = owner));
  END IF;

  -- Enable RLS on contracts bucket
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'contracts') THEN
    CREATE POLICY "Public Access for contracts" ON storage.objects FOR SELECT
    USING (bucket_id = 'contracts');
    
    CREATE POLICY "Authenticated users can upload to contracts" ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'contracts');
    
    CREATE POLICY "Owners can update contracts" ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'contracts' AND (auth.uid() = owner));
    
    CREATE POLICY "Owners can delete contracts" ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'contracts' AND (auth.uid() = owner));
  END IF;

  -- Enable RLS on uploads bucket
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'uploads') THEN
    CREATE POLICY "Public Access for uploads" ON storage.objects FOR SELECT
    USING (bucket_id = 'uploads');
    
    CREATE POLICY "Authenticated users can upload to uploads" ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'uploads');
    
    CREATE POLICY "Owners can update uploads" ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'uploads' AND (auth.uid() = owner));
    
    CREATE POLICY "Owners can delete uploads" ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'uploads' AND (auth.uid() = owner));
  END IF;
END $$;