# Database Integration Summary

## Overview
The WRM platform has been updated with a complete Supabase database backend. All dynamic content should now be fetched from the database instead of using hardcoded mock data.

## Database Schema

### Tables Created (25 total)

#### User & Authentication
- **user_profiles**: Extended auth.users with roles and profile information
  - Connects to Supabase auth.users
  - Roles: admin, tenant, system-admin, landlord, property-manager

#### Property Management
- **properties**: Building/property information
  - owner_id: References user_profiles
  - Includes: address, location, property_type, year_built, description, image_url

- **rooms**: Individual units/spaces within properties
  - property_id: References properties
  - Fields: room_number, floor_number, space_type, square_meters, base_rent, lease_status, amenities

#### Tenant Management
- **tenants**: Tenant profiles and information
  - user_id: References user_profiles (optional)
  - Status: active, inactive, suspended, pending-verification
  - Includes: ID card, company registration, TIN

- **leases**: Lease agreements
  - property_id, room_id, tenant_id: References
  - Status: active, expired, terminated, pending
  - Includes: dates, monthly_rent, deposit information

#### Financial Management
- **invoices**: Generated invoices
  - lease_id: References leases
  - Status: paid, pending, overdue, cancelled
  - Includes: amount_due, payment details

- **invoice_items**: Line items for invoices
  - invoice_id: References invoices
  - item_type: rent, vat, service_tax, utilities, fee
  - Includes: quantity, unit_price, tax calculations

- **tax_rules**: Configurable tax rates
  - Active tax rules for invoice generation

- **pricing_config**: Property pricing configuration
  - pricing_mode: fixed_rate or dimension_based
  - Fixed monthly rent OR price per square meter

- **payment_methods**: Saved payment methods per user
  - method_type: telebirr, chapa, cbe-birr, bank-transfer, cash

#### New Features (Steps 29-32)
- **utility_readings**: Meter readings for utilities
  - room_id, reading_date, reading_value
  - unit_type: electricity, water, gas
  - cost per reading

- **utility_costs**: Utility costs breakdown in invoices
  - invoice_id, consumption data
  - Linked to utility_readings

- **lease_settlements**: Final lease settlement data
  - lease_id, settlement_date
  - damage_deductions, outstanding_charges
  - final_balance, settlement_status

- **waitlist_leads**: Prospective tenants
  - property_id, contact information
  - desired_space_type, budget range, preferences
  - lead_status: new, contacted, interested, waiting, converted

#### Marketplace & Listings
- **marketplace_listings**: Space listings
  - property_id, room_id, lister_id
  - Status: active, sold, delisted, pending
  - Includes: price, amenities, image URLs

#### Subscription Management
- **subscription_plans**: Available subscription tiers
  - price, billing_cycle, max_units, features

- **user_subscriptions**: User subscription status
  - user_id, plan_id
  - Status: active, paused, cancelled, expired
  - auto_renew, subscription dates

- **subscription_payments**: Payment history
  - subscription_id, payment_date, amount
  - Status: paid, pending, failed

#### Operations & Maintenance
- **maintenance_requests**: Work order tracking
  - property_id, room_id, reported_by
  - category: plumbing, electrical, hvac, structural
  - priority, status, assigned_to

- **documents**: File storage references
  - user_id, document_type
  - Types: lease, invoice, contract, permit, certificate
  - Includes: file_url, file_size, related entity references

#### System & Administration
- **audit_logs**: Admin activity tracking
  - admin_id, action, resource_type, changes
  - Includes: IP address, timestamp

- **messages**: User-to-user communication
  - sender_id, recipient_id
  - Types: general, invoice, maintenance, alert

- **workspace_submissions**: Marketplace verification
  - owner_id, building_name, location
  - verification_status: pending, approved, rejected

- **credit_partners**: Credit service integrations
  - Credit partner configuration
  - integration_status: active, inactive, pending

## Row Level Security (RLS)

All tables have RLS policies enabled with fine-grained access control:
- Users can only see their own data
- Property owners manage their properties
- Tenants view their leases and invoices
- Marketplace listings are publicly viewable (active status only)
- Admin tables (tax_rules, audit_logs) have appropriate restrictions

## Query Functions (lib/db.ts)

All database operations are centralized in `/lib/db.ts` with functions for:
- User profiles
- Properties & rooms
- Tenants & leases
- Invoices & payments
- Maintenance requests
- Utility readings
- Lease settlements
- Waitlist leads
- Marketplace listings
- Subscriptions
- Tax rules

## React Hooks (hooks/use-database.ts)

React hooks for common queries:
- `useProperties()` - Fetch user's properties
- `useTenants(propertyId)` - Fetch property tenants
- `useLeases(propertyId)` - Fetch property leases
- `useInvoices(propertyId)` - Fetch property invoices
- `useMaintenanceRequests(propertyId)` - Fetch work orders
- `useWaitlistLeads(propertyId)` - Fetch prospective tenants
- `useUtilityReadings(propertyId)` - Fetch meter readings
- `useLeaseSettlements(propertyId)` - Fetch lease settlements

## API Routes

Endpoint created for server-side data fetching:
- `GET /api/properties?userId={userId}` - List properties
- `POST /api/properties` - Create property
- `GET /api/tenants?propertyId={propertyId}` - List tenants
- `GET /api/invoices?propertyId={propertyId}` - List invoices
- `GET /api/maintenance?propertyId={propertyId}` - List maintenance requests
- `GET /api/utilities?propertyId={propertyId}` - List utility readings
- `GET /api/waitlist?propertyId={propertyId}` - List waitlist leads
- `GET /api/marketplace?propertyId={propertyId}` - List marketplace listings

## Migration Guide

### For Component Updates:
1. Replace hardcoded mock data imports with database hooks
2. Use `useProperties()`, `useTenants()`, etc. instead of static arrays
3. Handle loading and error states
4. Update component to work with real async data

### Example:
```typescript
// Before (hardcoded)
import { properties } from '@/lib/data'
const propertiesList = properties

// After (database)
import { useProperties } from '@/hooks/use-database'
const { properties: propertiesList, loading, error } = useProperties()
```

## Components Still Using Mock Data

The following components need to be updated to fetch from the database:
- Dashboard View
- Tenants View
- Billing View
- Marketplace View
- Maintenance View
- Utility Tracking View
- Waitlist View
- Lease Settlement View
- And several others using lib/data.ts imports

## Environment Setup

Ensure these environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only)

## Next Steps

1. Systematically update all views to use database hooks
2. Remove hardcoded data from lib/data.ts
3. Test all CRUD operations
4. Implement caching strategies if needed
5. Add optimistic updates for better UX
