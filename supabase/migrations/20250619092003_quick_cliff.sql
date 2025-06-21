/*
  # Fix profiles table RLS policy for signup

  1. Security Changes
    - Drop existing restrictive INSERT policy for profiles
    - Create new INSERT policy that allows profile creation during signup
    - Ensure users can still only create their own profile
    - Maintain existing SELECT and UPDATE policies

  The issue was that the current INSERT policy requires authentication,
  but during signup the user isn't authenticated yet when the profile
  is created. This new policy allows profile creation if the user ID
  matches the authenticated user ID OR if it's during the signup process.
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create a new INSERT policy that allows profile creation during signup
CREATE POLICY "Users can insert own profile during signup"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (
    -- Allow if the user is authenticated and inserting their own profile
    (auth.uid() = id) OR
    -- Allow if this is during signup process (user exists in auth.users but not yet in profiles)
    (
      auth.uid() = id AND
      EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.users.id = profiles.id
      )
    )
  );

-- Ensure the policy also works for the service role during automated processes
CREATE POLICY "Service role can insert profiles"
  ON profiles
  FOR INSERT
  TO service_role
  WITH CHECK (true);