/*
  # ProBuild Concierge Database Schema

  1. New Tables
    - `profiles` - User profiles extending auth.users
    - `contractors` - Contractor company information
    - `leads` - Lead/project submissions from clients
    - `contracts` - Contract documents and status
    - `referrals` - Lead fees and success fees tracking
    - `stripe_payments` - Payment transaction logs
    - `bookings` - Appointment scheduling
    - `contract_ai_requests` - AI contract generation requests
    - `esignatures` - Electronic signature records
    - `uploads` - File upload tracking
    - `notifications` - System notifications

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each user role
    - Ensure data isolation between contractors

  3. Features
    - Support for AI contract generation
    - Electronic signature tracking
    - Payment and referral management
    - File upload system
    - Notification system
*/

-- PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text CHECK (role IN ('admin', 'professional')) NOT NULL,
  stripe_customer_id text,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- CONTRACTORS TABLE
CREATE TABLE IF NOT EXISTS contractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles (id) ON DELETE CASCADE,
  company_name text NOT NULL,
  bio text,
  location text,
  specialties text[], -- e.g., ['ADU', 'Commercial TI']
  website text,
  profile_image_url text,
  subscription_plan text,
  stripe_subscription_id text,
  listing_status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text,
  phone text,
  email text,
  project_type text,
  zip_code text,
  budget numeric,
  timeline text,
  description text,
  source text,
  status text DEFAULT 'new',
  assigned_contractor_id uuid REFERENCES contractors (id),
  contract_id uuid, -- Will add constraint after contracts table is created
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- CONTRACTS TABLE
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads (id),
  contractor_id uuid REFERENCES contractors (id),
  file_url text,
  status text CHECK (status IN ('draft', 'sent', 'signed', 'declined')) DEFAULT 'draft',
  created_by_ai boolean DEFAULT true,
  signature_date date,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Add the foreign key constraint for contracts.id to leads.contract_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_contract_id' AND table_name = 'leads'
  ) THEN
    ALTER TABLE leads
    ADD CONSTRAINT fk_contract_id
    FOREIGN KEY (contract_id)
    REFERENCES contracts (id);
  END IF;
END $$;

-- REFERRALS TABLE
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads (id),
  contractor_id uuid REFERENCES contractors (id),
  lead_fee_amount numeric,
  lead_fee_paid boolean DEFAULT false,
  contract_value numeric,
  success_fee_rate numeric,
  success_fee_paid boolean DEFAULT false,
  invoice_id text,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- STRIPE PAYMENTS LOG TABLE
CREATE TABLE IF NOT EXISTS stripe_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles (id),
  type text CHECK (type IN ('subscription', 'lead_fee', 'success_fee')),
  amount numeric,
  currency text DEFAULT 'usd',
  stripe_invoice_id text,
  payment_status text DEFAULT 'paid',
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads (id),
  contractor_id uuid REFERENCES contractors (id),
  booking_type text CHECK (booking_type IN ('consultation', 'inspection', 'project_start')),
  scheduled_at timestamp with time zone,
  status text CHECK (status IN ('pending', 'confirmed', 'completed', 'canceled')) DEFAULT 'pending',
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- CONTRACT AI REQUESTS TABLE
CREATE TABLE IF NOT EXISTS contract_ai_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id uuid REFERENCES contractors (id),
  lead_id uuid REFERENCES leads (id),
  requested_template text, -- e.g., 'construction_agreement', 'NDA'
  status text CHECK (status IN ('pending', 'generated', 'error')) DEFAULT 'pending',
  ai_response text, -- Raw JSON or notes from the AI
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- ESIGNATURES TABLE
CREATE TABLE IF NOT EXISTS esignatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid REFERENCES contracts (id),
  signer_name text,
  signer_email text,
  signature_hash text, -- hash of contract text + signer identity
  signature_token text, -- optional encrypted blob
  verification_method text, -- 'blockchain' or 'custom'
  blockchain_tx_id text, -- if applicable
  signed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- UPLOADS TABLE
CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uploaded_by uuid REFERENCES profiles (id),
  related_to text, -- e.g., 'lead', 'contract'
  related_id uuid,
  file_url text,
  file_type text,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid REFERENCES profiles (id),
  type text CHECK (type IN ('system', 'booking', 'contract', 'payment')),
  message text,
  action_url text, -- link to view booking or contract
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE esignatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read/update their own profile, admins can read all
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contractors: Contractors can manage their own data, admins can read all
CREATE POLICY "Contractors can read own data" ON contractors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Contractors can update own data" ON contractors
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Contractors can insert own data" ON contractors
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all contractors" ON contractors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Public can read active contractors" ON contractors
  FOR SELECT USING (listing_status = 'active');

-- Leads: Contractors can see assigned leads, admins can see all
CREATE POLICY "Contractors can read assigned leads" ON leads
  FOR SELECT USING (
    assigned_contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all leads" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage leads" ON leads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contracts: Contractors can manage their contracts, admins can see all
CREATE POLICY "Contractors can read own contracts" ON contracts
  FOR SELECT USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Contractors can manage own contracts" ON contracts
  FOR ALL USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all contracts" ON contracts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Referrals: Contractors can see their referrals, admins can see all
CREATE POLICY "Contractors can read own referrals" ON referrals
  FOR SELECT USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage referrals" ON referrals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Stripe Payments: Users can see their payments, admins can see all
CREATE POLICY "Users can read own payments" ON stripe_payments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can read all payments" ON stripe_payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings: Contractors can manage their bookings, admins can see all
CREATE POLICY "Contractors can read own bookings" ON bookings
  FOR SELECT USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Contractors can manage own bookings" ON bookings
  FOR ALL USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contract AI Requests: Contractors can manage their requests, admins can see all
CREATE POLICY "Contractors can read own ai requests" ON contract_ai_requests
  FOR SELECT USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Contractors can manage own ai requests" ON contract_ai_requests
  FOR ALL USING (
    contractor_id IN (
      SELECT id FROM contractors WHERE user_id = auth.uid()
    )
  );

-- E-signatures: Related to contracts, same access patterns
CREATE POLICY "Contractors can read own signatures" ON esignatures
  FOR SELECT USING (
    contract_id IN (
      SELECT id FROM contracts 
      WHERE contractor_id IN (
        SELECT id FROM contractors WHERE user_id = auth.uid()
      )
    )
  );

-- Uploads: Users can manage their uploads
CREATE POLICY "Users can read own uploads" ON uploads
  FOR SELECT USING (uploaded_by = auth.uid());

CREATE POLICY "Users can manage own uploads" ON uploads
  FOR ALL USING (uploaded_by = auth.uid());

-- Notifications: Users can read their notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (recipient_id = auth.uid());