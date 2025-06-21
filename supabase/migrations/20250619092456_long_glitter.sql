/*
  # Fix RLS Policy for Profile Insertion

  1. Problem
    - Current RLS policies are preventing profile creation during signup
    - The policies are too complex and causing authentication failures
    
  2. Solution
    - Drop all existing problematic policies on profiles table
    - Create simple, working policies that allow proper profile management
    - Ensure authenticated users can create their own profiles during signup
*/

-- Drop all existing policies on profiles table to start fresh
DROP POLICY IF EXISTS "Users can insert own profile during signup" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create simple, working policies

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow service role to manage profiles (needed for automated processes)
CREATE POLICY "Service role can manage profiles"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);