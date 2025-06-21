/*
  # Fix Contractor Profiles Join

  1. Schema Updates
    - Adds profile_image_url column to contractors table
    - Updates RLS policies to use the correct join syntax
  
  2. Security
    - Ensures all policies use the correct join syntax
*/

-- Add profile_image_url column to contractors table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contractors' AND column_name = 'profile_image_url'
  ) THEN
    ALTER TABLE public.contractors ADD COLUMN profile_image_url text;
  END IF;
END $$;

-- Fix RLS policies for contractors
DO $$ 
BEGIN
  -- Drop existing policies that use the incorrect join syntax
  DROP POLICY IF EXISTS "Contractors can read own data" ON public.contractors;
  DROP POLICY IF EXISTS "Contractors can insert own data" ON public.contractors;
  DROP POLICY IF EXISTS "Contractors can update own data" ON public.contractors;
  DROP POLICY IF EXISTS "Public can read active contractor profiles" ON public.contractors;
  DROP POLICY IF EXISTS "Public can read active contractors" ON public.contractors;
END $$;

-- Recreate policies with correct syntax
CREATE POLICY "Contractors can read own data" 
ON public.contractors
FOR SELECT 
TO public
USING (user_id = auth.uid());

CREATE POLICY "Contractors can insert own data" 
ON public.contractors
FOR INSERT 
TO public
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Contractors can update own data" 
ON public.contractors
FOR UPDATE 
TO public
USING (user_id = auth.uid());

CREATE POLICY "Public can read active contractor profiles" 
ON public.contractors
FOR SELECT 
TO public
USING (listing_status = 'active');