-- WRM Platform - Complete Database Schema for Supabase
-- This migration creates all 27 tables with RLS policies and full multi-tenant support
-- Execute in order to maintain FK dependencies

-- ============================================
-- PHASE 1: EXTENSIONS & ENUMS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User Role Enum
CREATE TYPE user_role AS ENUM ('SYSTEM_ADMIN', 'ADMIN', 'TENANT', 'BROKER', 'VENDOR');

-- Building Status Enum
CREATE TYPE building_verification_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- Room Type Enum
CREATE TYPE room_type AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'STORAGE');

-- Pricing Model Enum
CREATE TYPE pricing_model_type AS ENUM ('PER_SQM', 'FLAT_PRICE');

-- Lease Status Enum
CREATE TYPE lease_status_type AS ENUM ('ACTIVE', 'EXPIRED', 'TERMINATED');

-- Invoice Status Enum
CREATE TYPE invoice_status_type AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'VOID');

-- Maintenance Priority Enum
CREATE TYPE maintenance_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- Maintenance Status Enum
CREATE TYPE maintenance_status AS ENUM ('NEW', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');

-- Maintenance Sender Role Enum
CREATE TYPE maintenance_sender_role AS ENUM ('TENANT', 'ADMIN', 'VENDOR');

-- Inquiry Warmth Enum
CREATE TYPE inquiry_warmth_score AS ENUM ('COLD', 'WARM', 'HOT', 'HIGHLY_INTERESTED');

-- Inquiry Status Enum
CREATE TYPE inquiry_status AS ENUM ('NEW', 'INTERESTED', 'NEGOTIATING', 'CONVERTED');

-- Alert Delivery Method Enum
CREATE TYPE alert_delivery_method AS ENUM ('EMAIL', 'SMS', 'BOTH');

-- Commission Payment Status Enum
CREATE TYPE commission_payment_status AS ENUM ('PENDING', 'PAID');

-- Broadcast Audience Enum
CREATE TYPE broadcast_audience_type AS ENUM ('ALL_OWNERS', 'ALL_TENANTS', 'SPECIFIC_BUILDING');

-- Broadcast Status Enum
CREATE TYPE broadcast_status_type AS ENUM ('DRAFT', 'SCHEDULED', 'SENT');

-- API Connection Status Enum
CREATE TYPE api_connection_status AS ENUM ('CONNECTED', 'DISCONNECTED', 'ERROR');

-- Utility Type Enum
CREATE TYPE utility_type AS ENUM ('ELECTRICITY', 'WATER');

-- Vendor Job Status Enum
CREATE TYPE vendor_job_status AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- ============================================
-- PHASE 2: CORE ENTITY TABLES
-- ============================================

-- Users Table (links to Supabase auth.users via id)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) UNIQUE,
  role user_role DEFAULT 'TENANT',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_select_admin" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_insert_self" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Buildings Table
CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  sub_city VARCHAR(100),
  verification_status building_verification_status DEFAULT 'PENDING',
  total_units INTEGER DEFAULT 0,
  backup_generator BOOLEAN DEFAULT FALSE,
  security_24_7 BOOLEAN DEFAULT FALSE,
  parking_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "buildings_select_owner" ON buildings FOR SELECT USING (owner_id = auth.uid());
CREATE POLICY "buildings_select_admin" ON buildings FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);
CREATE POLICY "buildings_insert_own" ON buildings FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY "buildings_update_own" ON buildings FOR UPDATE USING (owner_id = auth.uid());
CREATE POLICY "buildings_delete_own" ON buildings FOR DELETE USING (owner_id = auth.uid());

-- Rooms/Units Table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  room_number VARCHAR(50) NOT NULL,
  room_type room_type DEFAULT 'RESIDENTIAL',
  floor_number INTEGER,
  size_sqm DECIMAL(10, 2),
  base_rent_per_sqm DECIMAL(10, 2),
  flat_monthly_rent DECIMAL(12, 2),
  pricing_model pricing_model_type DEFAULT 'FLAT_PRICE',
  business_type VARCHAR(100),
  is_occupied BOOLEAN DEFAULT FALSE,
  current_tenant_id UUID REFERENCES users(id) ON DELETE SET NULL,
  listed_on_marketplace BOOLEAN DEFAULT FALSE,
  utilities_included BOOLEAN DEFAULT FALSE,
  utilities_applicable TEXT[] DEFAULT '{}',
  amenities JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rooms_select_owner" ON rooms FOR SELECT USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id = rooms.building_id AND buildings.owner_id = auth.uid())
);
CREATE POLICY "rooms_select_admin" ON rooms FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);
CREATE POLICY "rooms_manage_owner" ON rooms FOR ALL USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id = rooms.building_id AND buildings.owner_id = auth.uid())
);

-- Leases Table
CREATE TABLE leases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  start_date_gregorian DATE NOT NULL,
  start_date_ethiopian VARCHAR(50),
  end_date_gregorian DATE,
  end_date_ethiopian VARCHAR(50),
  monthly_rent_amount DECIMAL(12, 2) NOT NULL,
  pre_paid_months INTEGER DEFAULT 0,
  lease_status lease_status_type DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE leases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leases_select_tenant" ON leases FOR SELECT USING (tenant_id = auth.uid());
CREATE POLICY "leases_select_owner" ON leases FOR SELECT USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id = leases.building_id AND buildings.owner_id = auth.uid())
);
CREATE POLICY "leases_select_admin" ON leases FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- ============================================
-- PHASE 3: FINANCIAL TABLES
-- ============================================

-- Invoices Table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal_amount DECIMAL(12, 2) NOT NULL,
  vat_rate DECIMAL(5, 4) DEFAULT 0.15,
  vat_amount DECIMAL(12, 2),
  withholding_tax_rate DECIMAL(5, 4) DEFAULT 0.02,
  withholding_tax_amount DECIMAL(12, 2),
  grand_total DECIMAL(12, 2) NOT NULL,
  status invoice_status_type DEFAULT 'PENDING',
  payment_method VARCHAR(50),
  payment_date TIMESTAMP WITH TIME ZONE,
  transaction_ref VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invoices_select_tenant" ON invoices FOR SELECT USING (tenant_id = auth.uid());
CREATE POLICY "invoices_select_owner" ON invoices FOR SELECT USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id = invoices.building_id AND buildings.owner_id = auth.uid())
);
CREATE POLICY "invoices_select_admin" ON invoices FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_paid DECIMAL(12, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(100) UNIQUE,
  wht_included BOOLEAN DEFAULT FALSE,
  wht_amount DECIMAL(12, 2),
  wht_receipt_number VARCHAR(100),
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payments_select_tenant" ON payments FOR SELECT USING (tenant_id = auth.uid());
CREATE POLICY "payments_select_owner" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM invoices WHERE invoices.id = payments.invoice_id AND invoices.building_id IN (
    SELECT buildings.id FROM buildings WHERE buildings.owner_id = auth.uid()
  ))
);
CREATE POLICY "payments_select_admin" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- Utility Bills Table
CREATE TABLE utility_bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  utility_type utility_type NOT NULL,
  bill_date DATE NOT NULL,
  total_cost_etb DECIMAL(12, 2) NOT NULL,
  unit_quantity DECIMAL(12, 2),
  rate_per_unit DECIMAL(10, 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE utility_bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "utility_bills_select_owner" ON utility_bills FOR SELECT USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id = utility_bills.building_id AND buildings.owner_id = auth.uid())
);
CREATE POLICY "utility_bills_select_admin" ON utility_bills FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- Utility Allocations Table
CREATE TABLE utility_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  utility_bill_id UUID NOT NULL REFERENCES utility_bills(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  allocated_amount DECIMAL(12, 2) NOT NULL,
  room_area_percentage DECIMAL(5, 4),
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE utility_allocations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "utility_allocations_select_tenant" ON utility_allocations FOR SELECT USING (tenant_id = auth.uid());
CREATE POLICY "utility_allocations_select_owner" ON utility_allocations FOR SELECT USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id IN (
    SELECT building_id FROM utility_bills WHERE utility_bills.id = utility_allocations.utility_bill_id
  ) AND buildings.owner_id = auth.uid())
);
CREATE POLICY "utility_allocations_select_admin" ON utility_allocations FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- ============================================
-- PHASE 4: MARKETPLACE TABLES
-- ============================================

-- Marketplace Listings Table
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  monthly_price DECIMAL(12, 2) NOT NULL,
  space_type VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "marketplace_listings_select_public" ON marketplace_listings FOR SELECT USING (is_active = TRUE);
CREATE POLICY "marketplace_listings_manage_owner" ON marketplace_listings FOR ALL USING (owner_id = auth.uid());

-- Marketplace Inquiries Table
CREATE TABLE marketplace_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  inquirer_name VARCHAR(255) NOT NULL,
  inquirer_email VARCHAR(255) NOT NULL,
  inquirer_phone VARCHAR(20),
  desired_size VARCHAR(100),
  budget_range VARCHAR(100),
  desired_floor VARCHAR(50),
  warmth_score inquiry_warmth_score DEFAULT 'COLD',
  status inquiry_status DEFAULT 'NEW',
  follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE marketplace_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "marketplace_inquiries_select_owner" ON marketplace_inquiries FOR SELECT USING (
  EXISTS (SELECT 1 FROM marketplace_listings WHERE marketplace_listings.id = marketplace_inquiries.listing_id AND marketplace_listings.owner_id = auth.uid())
);
CREATE POLICY "marketplace_inquiries_select_admin" ON marketplace_inquiries FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- Marketplace Alerts Table
CREATE TABLE marketplace_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255),
  phone VARCHAR(20),
  search_criteria JSONB NOT NULL,
  delivery_method alert_delivery_method DEFAULT 'EMAIL',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE marketplace_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "marketplace_alerts_select_admin" ON marketplace_alerts FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- ============================================
-- PHASE 5: MAINTENANCE TABLES
-- ============================================

-- Maintenance Tickets Table
CREATE TABLE maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority maintenance_priority DEFAULT 'MEDIUM',
  status maintenance_status DEFAULT 'NEW',
  assigned_vendor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE maintenance_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "maintenance_tickets_select_tenant" ON maintenance_tickets FOR SELECT USING (tenant_id = auth.uid());
CREATE POLICY "maintenance_tickets_select_owner" ON maintenance_tickets FOR SELECT USING (
  EXISTS (SELECT 1 FROM buildings WHERE buildings.id = maintenance_tickets.building_id AND buildings.owner_id = auth.uid())
);
CREATE POLICY "maintenance_tickets_select_vendor" ON maintenance_tickets FOR SELECT USING (assigned_vendor_id = auth.uid());
CREATE POLICY "maintenance_tickets_select_admin" ON maintenance_tickets FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- Maintenance Messages Table
CREATE TABLE maintenance_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES maintenance_tickets(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_role maintenance_sender_role NOT NULL,
  message_text TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE maintenance_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "maintenance_messages_select_participants" ON maintenance_messages FOR SELECT USING (
  sender_id = auth.uid() OR
  EXISTS (SELECT 1 FROM maintenance_tickets WHERE maintenance_tickets.id = maintenance_messages.ticket_id AND maintenance_tickets.tenant_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM maintenance_tickets WHERE maintenance_tickets.id = maintenance_messages.ticket_id AND maintenance_tickets.assigned_vendor_id = auth.uid())
);

-- ============================================
-- PHASE 6: BROKER & VENDOR TABLES
-- ============================================

-- Brokers Table
CREATE TABLE brokers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  trust_rating DECIMAL(3, 2) DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  active_tenants_brought INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;

-- Commissions Table
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  broker_id UUID NOT NULL REFERENCES brokers(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  commission_amount DECIMAL(12, 2) NOT NULL,
  commission_rate DECIMAL(5, 4),
  referral_date DATE NOT NULL,
  payment_status commission_payment_status DEFAULT 'PENDING',
  paid_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Vendors Table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_category VARCHAR(100),
  contact_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  verified_rating DECIMAL(3, 2) DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  avg_resolution_time_days DECIMAL(10, 2),
  outstanding_balance DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Vendor Jobs Table
CREATE TABLE vendor_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  ticket_id UUID NOT NULL REFERENCES maintenance_tickets(id) ON DELETE CASCADE,
  job_title VARCHAR(255) NOT NULL,
  job_cost DECIMAL(12, 2),
  status vendor_job_status DEFAULT 'IN_PROGRESS',
  completed_date TIMESTAMP WITH TIME ZONE,
  photos JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE vendor_jobs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PHASE 7: SYSTEM ADMIN & SETTINGS TABLES
-- ============================================

-- System Settings Table
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "system_settings_select_admin" ON system_settings FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'SYSTEM_ADMIN')
);
CREATE POLICY "system_settings_update_admin" ON system_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'SYSTEM_ADMIN')
);

-- Audit Logs Table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email VARCHAR(255),
  user_role VARCHAR(50),
  ip_address INET,
  action_taken TEXT NOT NULL,
  affected_table VARCHAR(100),
  affected_record_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_logs_select_admin" ON audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'SYSTEM_ADMIN')
);

-- UI Translations Table
CREATE TABLE ui_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_name VARCHAR(255) NOT NULL,
  english_string TEXT NOT NULL,
  amharic_translation TEXT,
  last_updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ui_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ui_translations_select_public" ON ui_translations FOR SELECT USING (TRUE);
CREATE POLICY "ui_translations_update_admin" ON ui_translations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'SYSTEM_ADMIN')
);

-- System Broadcasts Table
CREATE TABLE system_broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  audience_type broadcast_audience_type NOT NULL,
  target_building_id UUID REFERENCES buildings(id) ON DELETE SET NULL,
  subject VARCHAR(255) NOT NULL,
  message_body TEXT NOT NULL,
  delivery_methods TEXT[] DEFAULT '{"EMAIL"}',
  scheduled_send_time TIMESTAMP WITH TIME ZONE,
  delivery_success_rate DECIMAL(5, 4),
  status broadcast_status_type DEFAULT 'DRAFT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE system_broadcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "system_broadcasts_select_admin" ON system_broadcasts FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('SYSTEM_ADMIN', 'ADMIN'))
);

-- Credit Partners Table
CREATE TABLE credit_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bank_name VARCHAR(255) NOT NULL,
  api_endpoint_url VARCHAR(500),
  api_key VARCHAR(500),
  connection_status api_connection_status DEFAULT 'DISCONNECTED',
  last_health_check TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE credit_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "credit_partners_select_admin" ON credit_partners FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'SYSTEM_ADMIN')
);

-- API Health Logs Table
CREATE TABLE api_health_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES credit_partners(id) ON DELETE CASCADE,
  endpoint VARCHAR(500),
  response_code INTEGER,
  latency_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE api_health_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "api_health_logs_select_admin" ON api_health_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'SYSTEM_ADMIN')
);

-- ============================================
-- PHASE 8: INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_buildings_owner_id ON buildings(owner_id);
CREATE INDEX idx_rooms_building_id ON rooms(building_id);
CREATE INDEX idx_rooms_current_tenant_id ON rooms(current_tenant_id);
CREATE INDEX idx_leases_tenant_id ON leases(tenant_id);
CREATE INDEX idx_leases_room_id ON leases(room_id);
CREATE INDEX idx_leases_building_id ON leases(building_id);
CREATE INDEX idx_invoices_building_id ON invoices(building_id);
CREATE INDEX idx_invoices_tenant_id ON invoices(tenant_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_payments_tenant_id ON payments(tenant_id);
CREATE INDEX idx_utility_bills_building_id ON utility_bills(building_id);
CREATE INDEX idx_utility_allocations_utility_bill_id ON utility_allocations(utility_bill_id);
CREATE INDEX idx_marketplace_listings_room_id ON marketplace_listings(room_id);
CREATE INDEX idx_marketplace_listings_owner_id ON marketplace_listings(owner_id);
CREATE INDEX idx_marketplace_inquiries_listing_id ON marketplace_inquiries(listing_id);
CREATE INDEX idx_maintenance_tickets_building_id ON maintenance_tickets(building_id);
CREATE INDEX idx_maintenance_tickets_tenant_id ON maintenance_tickets(tenant_id);
CREATE INDEX idx_maintenance_messages_ticket_id ON maintenance_messages(ticket_id);
CREATE INDEX idx_commissions_broker_id ON commissions(broker_id);
CREATE INDEX idx_vendor_jobs_vendor_id ON vendor_jobs(vendor_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- PHASE 9: INITIAL SYSTEM SETTINGS
-- ============================================

INSERT INTO system_settings (setting_key, setting_value, description) VALUES
  ('VAT_RATE', '0.15', 'Default VAT rate for invoices (15%)'),
  ('WHT_RATE', '0.02', 'Default Withholding Tax rate (2%)'),
  ('GATEWAY_FEE_RATE', '0.025', 'Payment gateway transaction fee (2.5%)'),
  ('SERVICE_FEE_MONTHLY_ETB', '500', 'Nicomas Digital monthly service fee in ETB')
ON CONFLICT (setting_key) DO NOTHING;

-- ============================================
-- END OF SCHEMA CREATION
-- ============================================
