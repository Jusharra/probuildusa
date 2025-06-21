/*
  # Add booking policy if not exists
  
  1. Changes
     - Adds a conditional check to create the public booking policy only if it doesn't already exist
*/

-- Check if the policy already exists before creating it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bookings' 
    AND policyname = 'Public can create bookings'
  ) THEN
    -- Add policy to allow public users to create bookings
    EXECUTE 'CREATE POLICY "Public can create bookings" 
      ON public.bookings
      FOR INSERT 
      TO public
      WITH CHECK (true)';
  END IF;
END $$;