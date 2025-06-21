/*
  # Add public booking policy

  1. Security
    - Add policy to allow public users to create bookings
    - This enables website visitors to schedule consultations with contractors
*/

-- Add policy to allow public users to create bookings
CREATE POLICY "Public can create bookings" 
ON public.bookings
FOR INSERT 
TO public
WITH CHECK (true);