/*
  # Fix uploads related_id and add admin policies

  1. New Policies
    - Add admin policies for contractors and uploads
    - Add policies for handling uploads with UUID related_id
  
  2. Changes
    - Ensure proper access control for uploads
    - Allow admins to manage all contractors and uploads
*/

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
CREATE POLICY "Users can manage their own uploads" 
ON public.uploads
FOR ALL 
TO public
USING (uploaded_by = auth.uid())
WITH CHECK (uploaded_by = auth.uid());

-- Allow users to view uploads related to their contractors
CREATE POLICY "Users can view uploads related to their contractors" 
ON public.uploads
FOR SELECT 
TO public
USING (
  related_to = 'contractor' AND 
  EXISTS (
    SELECT 1 FROM contractors 
    WHERE contractors.id::text = uploads.related_id 
    AND contractors.user_id = auth.uid()
  )
);