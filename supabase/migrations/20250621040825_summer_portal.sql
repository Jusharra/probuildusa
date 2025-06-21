/*
  # Add public booking creation policy

  1. Security Changes
    - Add RLS policy to allow public users to create bookings
    - This enables unauthenticated visitors to schedule consultations through contractor profiles
    - The policy allows INSERT operations for public role on the bookings table

  2. Policy Details
    - Allows public users to create bookings with any contractor_id
    - No restrictions on the data being inserted (contractor can validate later)
    - Maintains existing security for reading/updating bookings (only contractors and admins)
*/

-- Add policy to allow public users to create bookings
CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);