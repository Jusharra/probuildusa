/*
  # Fix bookings policy creation

  1. Changes
    - Add conditional check to only create the policy if it doesn't already exist
    - Use PL/pgSQL DO block to safely check for policy existence
*/

DO $$
BEGIN
  -- Check if the policy already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bookings' 
    AND policyname = 'Public can create bookings'
  ) THEN
    -- Create the policy only if it doesn't exist
    EXECUTE 'CREATE POLICY "Public can create bookings" ON public.bookings FOR INSERT TO public WITH CHECK (true)';
  END IF;
END
$$;