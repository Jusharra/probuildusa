/*
  # Fix RLS Policy Infinite Recursion

  1. Problem
    - The "Admins can read all profiles" policy creates infinite recursion
    - It queries the profiles table from within a profiles table policy
    
  2. Solution
    - Remove the problematic admin policy on profiles table
    - Admins can still access profiles through direct queries when needed
    - Keep the essential user policies for profile access
*/

-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- The remaining policies are safe and don't cause recursion:
-- - "Users can read own profile" - uses auth.uid() = id (no table lookup)
-- - "Users can update own profile" - uses auth.uid() = id (no table lookup)

-- For admin access to profiles, admins can use service role or direct database access
-- The contractor policies that check for admin role will still work because they
-- don't create circular dependencies (they check profiles from contractors table context)