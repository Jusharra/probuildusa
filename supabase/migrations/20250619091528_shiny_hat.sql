/*
  # Fix Profile RLS Policy for User Registration

  1. Security Updates
    - Update the INSERT policy for profiles table to properly handle user registration
    - Ensure users can create their own profile during signup process
    - Add proper policy for profile creation that works with Supabase Auth

  2. Changes
    - Drop existing INSERT policy that may be too restrictive
    - Create new INSERT policy that allows authenticated users to create their own profile
    - Ensure the policy works correctly with the auth.uid() function
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create a new INSERT policy that properly handles user registration
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

-- Also ensure we have a proper policy for reading profiles during the auth process
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT 
  TO public 
  USING (auth.uid() = id);

-- Ensure UPDATE policy is correct
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE 
  TO public 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);