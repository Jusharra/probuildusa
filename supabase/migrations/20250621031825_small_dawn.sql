/*
  # RLS Policies for Contractors and Uploads
  
  1. New Policies
    - Admin policies for full access to contractors and uploads
    - User policies for managing their own uploads
    - Contractor policies for viewing uploads related to their contracts and profiles
  
  2. Security
    - Ensures proper access control for contractors and uploads
    - Allows admins to manage all resources
    - Restricts users to only manage their own uploads
*/

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage all contractors" ON public.contractors;
DROP POLICY IF EXISTS "Admins can manage all uploads" ON public.uploads;
DROP POLICY IF EXISTS "Users can manage own uploads" ON public.uploads;
DROP POLICY IF EXISTS "Contractors can view contract-related uploads" ON public.uploads;
DROP POLICY IF EXISTS "Contractors can view profile-related uploads" ON public.uploads;

-- Ensure admins can manage all contractors
CREATE POLICY "Admins can manage all contractors" 
ON public.contractors
FOR ALL 
TO public
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Ensure admins can manage all uploads
CREATE POLICY "Admins can manage all uploads" 
ON public.uploads
FOR ALL 
TO public
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Allow users to manage their own uploads
CREATE POLICY "Users can manage own uploads" 
ON public.uploads
FOR ALL 
TO public
USING (uploaded_by = auth.uid())
WITH CHECK (uploaded_by = auth.uid());

-- Allow contractors to view uploads related to their contracts
CREATE POLICY "Contractors can view contract-related uploads" 
ON public.uploads
FOR SELECT 
TO public
USING (
  related_to = 'contract' AND EXISTS (
    SELECT 1 FROM contracts c
    JOIN contractors co ON c.contractor_id = co.id
    WHERE c.id = uploads.related_id::uuid AND co.user_id = auth.uid()
  )
);

-- Allow contractors to view uploads related to their profile
CREATE POLICY "Contractors can view profile-related uploads" 
ON public.uploads
FOR SELECT 
TO public
USING (
  related_to = 'contractor' AND EXISTS (
    SELECT 1 FROM contractors
    WHERE contractors.id = uploads.related_id::uuid AND contractors.user_id = auth.uid()
  )
);