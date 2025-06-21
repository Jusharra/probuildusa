/*
  # Add Admin CRUD Policies for Contractor Management

  1. Security Policies
    - Add INSERT policy for admins to create contractor profiles
    - Add UPDATE policy for admins to modify any contractor profile
    - Add DELETE policy for admins to remove contractor profiles
    - Ensure SELECT policy exists for admins to view all contractors

  2. Changes
    - Admins can perform full CRUD operations on contractors table
    - Maintains existing contractor self-management policies
    - Ensures data security through role-based access control
*/

-- Add INSERT policy for admins to create contractor profiles
CREATE POLICY "Admins can insert contractor profiles"
  ON contractors
  FOR INSERT
  TO public
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Add UPDATE policy for admins to modify any contractor profile
CREATE POLICY "Admins can update all contractor profiles"
  ON contractors
  FOR UPDATE
  TO public
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Add DELETE policy for admins to remove contractor profiles
CREATE POLICY "Admins can delete contractor profiles"
  ON contractors
  FOR DELETE
  TO public
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Verify SELECT policy exists for admins (should already exist from previous migration)
-- If not, create it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contractors' 
    AND policyname = 'Admins can read all contractors'
  ) THEN
    CREATE POLICY "Admins can read all contractors"
      ON contractors
      FOR SELECT
      TO public
      USING (
        EXISTS (
          SELECT 1
          FROM profiles
          WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
      );
  END IF;
END $$;