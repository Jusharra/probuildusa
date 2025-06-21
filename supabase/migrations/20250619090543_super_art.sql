/*
  # Add INSERT policy for profiles table

  1. Security
    - Add RLS policy to allow authenticated users to insert their own profile
    - Ensures the profile ID matches the authenticated user's ID
    - Fixes the authentication flow where profile creation was being blocked

  2. Changes
    - CREATE POLICY for INSERT operations on profiles table
    - Policy uses auth.uid() = id to ensure users can only create their own profile
    - This enables the AuthService.createProfile function to work properly
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);