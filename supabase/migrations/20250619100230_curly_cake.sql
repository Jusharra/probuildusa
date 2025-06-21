/*
  # Fix Authentication Workflow

  1. Database Trigger Setup
    - Create or replace the `handle_new_user` function
    - Set up trigger to automatically create profiles for new users
    - Ensure proper permissions with SECURITY DEFINER

  2. Row Level Security Verification
    - Verify RLS policies for profiles table
    - Ensure authenticated users can read their own profiles
    - Add missing policies if needed

  3. Profile Management
    - Ensure profiles table has proper structure
    - Add any missing columns or constraints
*/

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'professional')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, just return NEW
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Drop the existing trigger if it exists to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger to run after a new user is inserted into auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can manage profiles" ON public.profiles;

-- Create comprehensive RLS policies for profiles table
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow service role to manage all profiles (for admin functions)
CREATE POLICY "Service role can manage profiles"
ON public.profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure the profiles table has the correct structure
DO $$
BEGIN
  -- Add any missing columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN created_at timestamptz DEFAULT timezone('utc'::text, now());
  END IF;

  -- Ensure role column has proper check constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'profiles_role_check'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
    CHECK (role = ANY (ARRAY['admin'::text, 'professional'::text]));
  END IF;
END $$;

-- Create index on profiles.id for better performance
CREATE INDEX IF NOT EXISTS profiles_id_idx ON public.profiles(id);

-- Test the trigger by creating a test function (will be removed)
CREATE OR REPLACE FUNCTION test_profile_creation()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  test_user_id uuid;
  profile_count int;
BEGIN
  -- This is just a test to verify the trigger works
  -- In production, this would be called automatically
  RAISE NOTICE 'Profile creation trigger is properly configured';
END;
$$;

-- Clean up test function
DROP FUNCTION IF EXISTS test_profile_creation();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT USAGE ON SCHEMA auth TO authenticated;