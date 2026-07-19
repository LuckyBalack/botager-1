-- WRM Application - Initial Database Schema
-- Three Dashboards: System Admin, Building Owner Admin, Tenant Portal

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SHARED/CORE TABLES
-- ============================================================================

-- Buildings Table
CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  total_units INTEGER NOT NULL,
  occupied_units INTEGER NOT NULL,
  open_maintenance_tickets INTEGER DEFAULT 0,
  monthly_revenue DECIMAL(12, 2) DEFAULT 0,
  image_url TEXT,
  owner_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users/Authentication (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'tenant', -- 'system-admin', 'building-owner', 'tenant'
  building_id UUID REFERENCES buildings,
  telegram_handle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- BUILDING OWNER ADMIN DASHBOARD TABLES
-- ============================================================================

-- Properties/Units Table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings,
  room_number TEXT NOT NULL,
  floor TEXT NOT NULL,
  square_footage DECIMAL(10, 2),
  occupancy_status TEXT NOT NULL DEFAULT 'Vacant', -- 'Occupied', 'Vacant', 'Under Maintenance'
  lease_status TEXT,
  lease_start_date DATE,
  lease_end_date DATE,
  listing_type TEXT DEFAULT 'standard', -- 'standard', 'auction'
  base_rent DECIMAL(10, 2),
  pricing_mode TEXT DEFAULT 'fixed', -- 'fixed', 'dimension-based'
  is_auction BOOLEAN DEFAULT false,
  current_bid DECIMAL(10, 2),
  auction_start_time TIMESTAMP,
  auction_end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(building_id, room_number)
);

-- Tenants Table
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  building_id UUID NOT NULL REFERENCES buildings,
  property_id UUID NOT NULL REFERENCES properties,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company_name TEXT,
  outstanding_balance DECIMAL(12, 2) DEFAULT 0,
  lease_start DATE,
  lease_end DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices/Payment History Table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants,
  property_id UUID NOT NULL REFERENCES properties,
  building_id UUID NOT NULL REFERENCES buildings,
  invoice_month TEXT NOT NULL,
  base_rent DECIMAL(10, 2),
  utilities DECIMAL(10, 2) DEFAULT 0,
  other_charges DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  payment_date DATE,
  status TEXT DEFAULT 'Pending', -- 'Paid', 'Pending', 'Overdue'
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Receipts Table
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices,
  tenant_id UUID NOT NULL REFERENCES tenants,
  payment_method TEXT,
  amount_paid DECIMAL(10, 2),
  transaction_reference TEXT,
  payment_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Maintenance Tickets Table
CREATE TABLE maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings,
  property_id UUID REFERENCES properties,
  tenant_id UUID REFERENCES tenants,
  category TEXT NOT NULL, -- 'Plumbing', 'Electrical', 'A/C', 'Elevator', 'Other'
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'Medium', -- 'High', 'Medium', 'Low'
  status TEXT DEFAULT 'Open', -- 'Open', 'In Progress', 'Resolved'
  submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_date TIMESTAMP,
  assigned_to UUID REFERENCES user_profiles,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TENANT PORTAL DASHBOARD TABLES
-- ============================================================================

-- Leases Table (from tenant perspective)
CREATE TABLE leases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants,
  property_id UUID NOT NULL REFERENCES properties,
  building_id UUID NOT NULL REFERENCES buildings,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  base_rent DECIMAL(10, 2),
  start_date_ec TEXT, -- Ethiopian Calendar format: "Sene 30, 2018 E.C."
  end_date_ec TEXT,
  lease_document_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SYSTEM ADMIN DASHBOARD TABLES
-- ============================================================================

-- Marketplace Listings Table
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings,
  property_id UUID REFERENCES properties,
  space_type TEXT NOT NULL, -- 'Shop', 'Office', 'Co-working', 'Event Space'
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  size_sqm DECIMAL(10, 2),
  amenities TEXT[], -- JSON array of amenities
  location TEXT,
  images_urls TEXT[],
  is_auction BOOLEAN DEFAULT false,
  current_bid DECIMAL(10, 2),
  auction_start_time TIMESTAMP,
  auction_end_time TIMESTAMP,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bids Table (for auctions)
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES marketplace_listings,
  bidder_id UUID NOT NULL REFERENCES auth.users,
  bid_amount DECIMAL(10, 2) NOT NULL,
  bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Plans Table
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10, 2),
  period TEXT,
  features TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Payments Table
CREATE TABLE subscription_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_owner_id UUID NOT NULL REFERENCES auth.users,
  plan_id UUID NOT NULL REFERENCES subscription_plans,
  amount DECIMAL(10, 2),
  payment_status TEXT DEFAULT 'Pending', -- 'Paid', 'Pending'
  payment_date DATE,
  renewal_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workspace Submissions Table
CREATE TABLE workspace_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings,
  owner_name TEXT NOT NULL,
  owner_email TEXT,
  building_name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  document_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Pending', -- 'Approved', 'Rejected', 'Pending'
  submission_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tax Rules Table
CREATE TABLE tax_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  value DECIMAL(5, 2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Reports Table
CREATE TABLE financial_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings,
  month TEXT,
  total_revenue DECIMAL(12, 2),
  total_expenses DECIMAL(12, 2),
  outstanding_payments DECIMAL(12, 2),
  maintenance_costs DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit Partners Table
CREATE TABLE credit_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  credit_limit DECIMAL(12, 2),
  used_credit DECIMAL(12, 2) DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit Requests Table
CREATE TABLE credit_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants,
  amount_requested DECIMAL(10, 2),
  purpose TEXT,
  status TEXT DEFAULT 'Pending', -- 'Approved', 'Rejected', 'Pending'
  request_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Utility Readings Table
CREATE TABLE utility_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties,
  tenant_id UUID REFERENCES tenants,
  previous_reading DECIMAL(10, 2),
  current_reading DECIMAL(10, 2),
  rate_per_unit DECIMAL(10, 2),
  reading_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Waitlist Leads Table
CREATE TABLE waitlist_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  desired_size TEXT,
  budget_range TEXT,
  desired_floor TEXT,
  date_joined DATE,
  status TEXT DEFAULT 'Waiting', -- 'Contacted', 'Interested', 'Waiting'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX idx_properties_building ON properties(building_id);
CREATE INDEX idx_properties_occupancy ON properties(occupancy_status);
CREATE INDEX idx_tenants_building ON tenants(building_id);
CREATE INDEX idx_tenants_property ON tenants(property_id);
CREATE INDEX idx_invoices_tenant ON invoices(tenant_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_maintenance_building ON maintenance_tickets(building_id);
CREATE INDEX idx_maintenance_status ON maintenance_tickets(status);
CREATE INDEX idx_leases_tenant ON leases(tenant_id);
CREATE INDEX idx_marketplace_is_auction ON marketplace_listings(is_auction);
CREATE INDEX idx_bids_listing ON bids(listing_id);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on tables
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Building Owners can see their own buildings and properties
CREATE POLICY building_owner_select_buildings ON buildings
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY building_owner_select_properties ON properties
  FOR SELECT USING (building_id IN (SELECT id FROM buildings WHERE owner_id = auth.uid()));

-- Tenants can see their own leases and invoices
CREATE POLICY tenant_select_leases ON leases
  FOR SELECT USING (tenant_id = (SELECT id FROM tenants WHERE user_id = auth.uid()));

CREATE POLICY tenant_select_invoices ON invoices
  FOR SELECT USING (tenant_id = (SELECT id FROM tenants WHERE user_id = auth.uid()));

-- System admins can see all data (implement via role-based access)
-- This would be checked in application logic
