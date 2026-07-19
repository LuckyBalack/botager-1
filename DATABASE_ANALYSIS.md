# WRM Platform - Database Analysis & Implementation Plan

## Current Status
- **Schema**: 20 tables created in Supabase ✅
- **RLS Policies**: Enabled on all tables ✅
- **Issue**: Extensive hardcoded mock data throughout codebase - ALL pages/features need migration to database

## Database Tables & Their Purpose

### Core Identity & Access (3 tables)
1. **user_profiles** - Extended auth.users with roles (admin, tenant, landlord, property-manager, system-admin)
2. **tenants** - Tenant information (name, email, ID, company details, verification status)
3. **user_subscriptions** - User subscription status and renewal dates
4. **subscription_plans** - Available subscription tiers
5. **subscription_payments** - Payment history for subscriptions

### Properties & Spaces (3 tables)
1. **properties** - Buildings/properties (address, location, type, owner)
2. **rooms** - Individual units/spaces within properties (floor, size, rent, status)
3. **marketplace_listings** - Public listings for spaces (price, amenities, images)
4. **pricing_config** - Pricing strategy per property (fixed vs dimension-based)

### Leases & Tenancy (2 tables)
1. **leases** - Lease agreements (tenant-room linkage, dates, terms, deposits)
2. **workspace_submissions** - Building verification for marketplace

### Financial & Billing (4 tables)
1. **invoices** - Invoice records (amount, due date, payment status)
2. **invoice_items** - Line items with taxes (rent, utilities, fees)
3. **tax_rules** - Configurable tax rates (VAT, service tax)
4. **payment_methods** - User payment options (card, bank, mobile money)

### Operations & Maintenance (2 tables)
1. **maintenance_requests** - Work orders (category, priority, status, assignment)
2. **documents** - File references (leases, contracts, certificates)

### Messaging & Audit (2 tables)
1. **messages** - User-to-user communication
2. **audit_logs** - Admin activity tracking
3. **credit_partners** - External credit/fintech partnerships

## Hardcoded Mock Data to Migrate

### In Components (Found via grep):
- **lease-applications.tsx**: leaseApplications array → Should query `workspace_submissions` or new table
- **payment-receipts.tsx**: receipts array → Should query `subscription_payments` + `invoices`
- **moderation-audit-trail.tsx**: auditEvents array → Should query `audit_logs`
- **recent-tenants.tsx**: tenants array → Should query `tenants` + `leases` + `user_profiles`
- **dashboard-app.tsx**: Various hardcoded data → Multiple tables

### In Views (From earlier grep):
- Utility tracking data (mock readings)
- Lease settlement data (hardcoded calculations)
- Space map data (mock room occupancy)
- Waitlist data (mock prospects)
- Properties data (mock buildings)
- Tenants data (mock tenant profiles)

## Missing Tables (Should Add)

1. **utility_readings** - Track meter readings over time
   - Fields: room_id, reading_date, reading_value, unit_type (water, electric, gas), cost

2. **lease_settlements** - Archive of finalized leases
   - Fields: lease_id, settlement_date, damage_deductions, final_balance, status

3. **waitlist_leads** - Prospective tenants
   - Fields: name, email, phone, desired_size, budget, preferred_floor, status, joined_date

4. **utility_costs** - Utility billing calculations
   - Fields: invoice_id, room_id, consumption, unit_price, total_cost

## Implementation Priority

### Phase 1 (Core Data): 
- Properties, Rooms, Tenants, Leases, User Profiles

### Phase 2 (Financial):
- Invoices, Invoice Items, Tax Rules, Payment Methods

### Phase 3 (Operations):
- Maintenance Requests, Documents, Messages

### Phase 4 (Advanced):
- Audit Logs, Subscriptions, Marketplace Listings, Workspace Submissions

### Phase 5 (New Features - if tables added):
- Utility Readings, Lease Settlements, Waitlist Leads, Utility Costs

## Required API Routes/Server Actions

All should use Supabase client with RLS enforcement:
- `/api/properties/*` - CRUD operations
- `/api/rooms/*` - CRUD operations
- `/api/tenants/*` - CRUD operations
- `/api/leases/*` - CRUD operations
- `/api/invoices/*` - Query and payment operations
- `/api/maintenance/*` - CRUD operations
- `/api/messages/*` - Send and retrieve
- `/api/audit/*` - Log and retrieve
- Server actions for client-side mutations

