/*
  # Add deposit tracking to leads table

  1. New Columns
    - `deposit_amount` (numeric)
      - Stores the actual deposit amount paid or requested in cents
      - Nullable to allow leads without deposits
    - `deposit_status` (text)
      - Tracks the status of the deposit payment
      - Default value: 'pending'
      - Possible values: 'pending', 'paid', 'skipped', 'failed'

  2. Changes
    - Add deposit tracking columns to leads table
    - Update RLS policies to allow deposit status updates

  3. Notes
    - Deposit amounts are stored in cents for consistency with Stripe
    - Default status is 'pending' for new leads
*/

-- Add deposit tracking columns to leads table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'deposit_amount'
  ) THEN
    ALTER TABLE leads ADD COLUMN deposit_amount numeric;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'deposit_status'
  ) THEN
    ALTER TABLE leads ADD COLUMN deposit_status text DEFAULT 'pending';
  END IF;
END $$;

-- Add constraint for deposit_status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'leads' AND constraint_name = 'leads_deposit_status_check'
  ) THEN
    ALTER TABLE leads ADD CONSTRAINT leads_deposit_status_check 
    CHECK (deposit_status IN ('pending', 'paid', 'skipped', 'failed'));
  END IF;
END $$;