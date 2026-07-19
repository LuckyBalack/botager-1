# Database Tables Index - WRM Application

Quick reference guide to all 20 database tables organized by dashboard functionality.

## 📋 Complete Table Listing

### System Admin Dashboard (5 tables)

| Table | Purpose | Key Columns | Records |
|-------|---------|------------|---------|
| `financial_reports` | Platform-wide analytics | building_id, month, total_revenue | Monthly reports |
| `credit_partners` | Partner organizations | name, credit_limit, used_credit | Partner info |
| `workspace_submissions` | New workspace applications | owner_name, building_name, status | Pending submissions |
| `subscription_plans` | Subscription tiers | name, price, period, features | Plan definitions |
| `subscription_payments` | Owner subscriptions | building_owner_id, plan_id, payment_status | Payment records |

### Building Owner Admin Dashboard (7 tables)

| Table | Purpose | Key Columns | Records |
|-------|---------|------------|---------|
| `buildings` | Master building data | name, location, total_units, owner_id | All buildings |
| `properties` | Individual units/rooms | building_id, room_number, floor, base_rent | All units |
| `tenants` | Tenant profiles | building_id, property_id, full_name, email | Tenant data |
| `invoices` | Rent invoices | tenant_id, invoice_month, total_amount, status | Payment history |
| `receipts` | Payment confirmations | invoice_id, tenant_id, amount_paid, payment_date | Receipt records |
| `maintenance_tickets` | Repair requests | building_id, category, description, status | Open/closed tickets |
| `utility_readings` | Consumption data | property_id, previous_reading, current_reading | Meter readings |

### Tenant Portal Dashboard (3 tables)

| Table | Purpose | Key Columns | Records |
|-------|---------|------------|---------|
| `leases` | Lease agreements | tenant_id, property_id, start_date, end_date | Tenant leases |
| `invoices` | Payment history | tenant_id, invoice_month, total_amount, status | Invoices (shared with admin) |
| `maintenance_tickets` | Maintenance requests | tenant_id, category, description, status | Tickets (shared with admin) |

### Shared/Public Tables (5 tables)

| Table | Purpose | Key Columns | Records |
|-------|---------|------------|---------|
| `user_profiles` | User accounts | id, email, role, building_id | User data |
| `marketplace_listings` | Property listings | building_id, space_type, price, is_auction | All listings |
| `bids` | Auction bids | listing_id, bidder_id, bid_amount | Bid history |
| `waitlist_leads` | Prospective tenants | name, email, desired_size, status | Waitlist |
| `tax_rules` | Tax configuration | name, value, description | Tax rules |

---

## 🔑 Foreign Key Relationships

```
auth.users
  ├─ user_profiles (1:1) [id]
  ├─ buildings (1:N) [owner_id]
  ├─ bids (1:N) [bidder_id]
  └─ subscription_payments (1:N) [building_owner_id]

buildings
  ├─ properties (1:N) [building_id]
  ├─ tenants (1:N) [building_id]
  ├─ invoices (1:N) [building_id]
  ├─ maintenance_tickets (1:N) [building_id]
  ├─ marketplace_listings (1:N) [building_id]
  ├─ leases (1:N) [building_id]
  ├─ subscription_payments (1:N) [plan_id]
  ├─ workspace_submissions (0:1) [building_id]
  └─ financial_reports (1:N) [building_id]

properties
  ├─ tenants (1:N) [property_id]
  ├─ invoices (1:N) [property_id]
  ├─ maintenance_tickets (0:N) [property_id]
  ├─ utility_readings (1:N) [property_id]
  └─ leases (0:N) [property_id]

tenants
  ├─ invoices (1:N) [tenant_id]
  ├─ receipts (1:N) [tenant_id]
  ├─ maintenance_tickets (0:N) [tenant_id]
  ├─ leases (1:N) [tenant_id]
  └─ credit_requests (0:N) [tenant_id]

invoices
  └─ receipts (1:N) [invoice_id]

marketplace_listings
  └─ bids (1:N) [listing_id]

subscription_plans
  └─ subscription_payments (1:N) [plan_id]

credit_partners
  (Referenced by system admin views)

waitlist_leads
  (Standalone table)

tax_rules
  (Referenced by calculations)
```

---

## 📊 Table Size & Indexing

### Indexed Columns (for performance)

| Column | Table | Reason |
|--------|-------|--------|
| owner_id | buildings | Filter buildings by owner |
| building_id | properties | Find all units in a building |
| building_id | tenants | Find all tenants in a building |
| tenant_id | invoices | Find all invoices for a tenant |
| status | invoices | Filter by payment status |
| building_id | maintenance_tickets | Find all tickets for a building |
| status | maintenance_tickets | Filter by ticket status |
| tenant_id | leases | Find tenant's lease |
| is_auction | marketplace_listings | Filter auction vs. standard listings |
| listing_id | bids | Find all bids on a listing |
| role | user_profiles | Filter users by role |

---

## 🔐 Row-Level Security (RLS) Status

### RLS Enabled Tables

| Table | Policy | Access |
|-------|--------|--------|
| buildings | building_owner_select_buildings | Owners see own buildings |
| properties | building_owner_select_properties | Owners see own properties |
| leases | tenant_select_leases | Tenants see own leases |
| invoices | tenant_select_invoices | Tenants see own invoices |
| user_profiles | user_select_own_profile | Users see own profile |

### Notes
- System admins bypass RLS (enforce in application logic)
- All other users are restricted by RLS policies
- Policies checked automatically at database level

---

## 📈 Expected Data Volumes (Estimates)

| Table | Typical Volume | Growth Rate |
|-------|---|---|
| buildings | 100s - 1000s | Slow |
| properties | 1000s - 10000s | Slow |
| tenants | 1000s - 10000s | Medium |
| invoices | 1000s - 100000s | Fast (monthly per tenant) |
| receipts | 1000s - 100000s | Fast (matches invoices) |
| maintenance_tickets | 100s - 1000s | Medium |
| leases | 1000s - 10000s | Slow |
| marketplace_listings | 100s - 1000s | Medium |
| bids | 10s - 1000s | Spiky (auction-dependent) |
| user_profiles | 100s - 1000s | Slow |
| waitlist_leads | 10s - 1000s | Medium |
| utility_readings | 1000s - 10000s | Steady (monthly per unit) |
| financial_reports | 12 per building/year | Steady |
| subscription_payments | 10s per owner | Slow |
| credit_partners | 10s - 100s | Very slow |
| credit_requests | 10s - 100s | Slow |
| workspace_submissions | 10s - 100s | Slow |
| subscription_plans | 3-5 | Static |
| tax_rules | 5-10 | Static |
| Other | Varies | Varies |

---

## 🎯 Common Queries by Dashboard

### System Admin Queries
```sql
-- Total platform revenue
SELECT SUM(total_revenue) FROM financial_reports;

-- Active subscriptions
SELECT COUNT(*) FROM subscription_payments WHERE payment_status = 'Paid';

-- Buildings by owner
SELECT owner_id, COUNT(*) FROM buildings GROUP BY owner_id;
```

### Building Owner Queries
```sql
-- Properties and occupancy
SELECT room_number, occupancy_status FROM properties WHERE building_id = ?;

-- Outstanding invoices
SELECT tenant_id, outstanding_balance FROM tenants WHERE building_id = ?;

-- Open maintenance tickets
SELECT * FROM maintenance_tickets WHERE status = 'Open' AND building_id = ?;
```

### Tenant Portal Queries
```sql
-- Current lease
SELECT * FROM leases WHERE tenant_id = ?;

-- Invoice history
SELECT * FROM invoices WHERE tenant_id = ? ORDER BY created_at DESC;

-- My maintenance requests
SELECT * FROM maintenance_tickets WHERE tenant_id = ? ORDER BY submitted_date DESC;
```

### Public/Marketplace Queries
```sql
-- Available listings
SELECT * FROM marketplace_listings WHERE is_auction = false;

-- Active auctions
SELECT * FROM marketplace_listings WHERE is_auction = true AND auction_end_time > NOW();

-- Bids on a listing
SELECT * FROM bids WHERE listing_id = ? ORDER BY bid_time DESC;
```

---

## ✅ Verification Checklist

After running the migration, verify:

- [ ] 20 tables created in Supabase
- [ ] All foreign keys established
- [ ] Indexes created on key columns
- [ ] RLS policies enabled on user-facing tables
- [ ] TypeScript types match database schema
- [ ] Build completes without errors
- [ ] Application connects to Supabase (no console errors)

---

## 🚀 Next Steps

1. **Set credentials in `.env.local`**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   ```

2. **Run the migration**
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste into Supabase SQL Editor
   - Click RUN

3. **Load sample data** (optional)
   - Use Supabase Table Editor to insert test records
   - Or create `002_sample_data.sql` migration file

4. **Test the connection**
   ```bash
   npm run dev
   ```

5. **Update dashboard components** to query real data

---

## 📞 Support

For detailed information:
- See `DATABASE_SCHEMA.md` for complete table definitions
- See `SUPABASE_SETUP.md` for setup instructions
- See `types/database.ts` for TypeScript type definitions
- Check Supabase docs: https://supabase.com/docs
