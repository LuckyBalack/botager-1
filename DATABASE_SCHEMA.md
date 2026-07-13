# WRM Application Database Schema

Complete database schema for the three dashboards: System Admin, Building Owner Admin, and Tenant Portal.

## Overview

The database is organized into logical groups supporting each dashboard:

```
┌─────────────────────────────────────────────────────────┐
│         SYSTEM ADMIN DASHBOARD TABLES                   │
├─────────────────────────────────────────────────────────┤
│ • financial_reports         │ Platform-wide analytics   │
│ • credit_partners          │ Partner organization data │
│ • workspace_submissions    │ New workspace applications│
│ • subscription_plans       │ Subscription tier config  │
│ • subscription_payments    │ Owner subscription status │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│      BUILDING OWNER ADMIN DASHBOARD TABLES              │
├─────────────────────────────────────────────────────────┤
│ • buildings                │ Building information      │
│ • properties               │ Units/rooms in buildings  │
│ • tenants                  │ Tenant profiles           │
│ • invoices                 │ Rent & payment history    │
│ • receipts                 │ Payment confirmation      │
│ • maintenance_tickets      │ Maintenance requests      │
│ • utility_readings         │ Electricity/water usage   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         TENANT PORTAL DASHBOARD TABLES                  │
├─────────────────────────────────────────────────────────┤
│ • leases                   │ Lease agreements          │
│ • invoices                 │ Payment history           │
│ • maintenance_tickets      │ Maintenance requests      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         PUBLIC/SHARED TABLES                            │
├─────────────────────────────────────────────────────────┤
│ • user_profiles            │ User authentication       │
│ • marketplace_listings     │ Property listings         │
│ • bids                     │ Auction bid history       │
│ • waitlist_leads           │ Waitlist signups          │
│ • tax_rules                │ Tax configuration         │
└─────────────────────────────────────────────────────────┘
```

---

## Detailed Table Definitions

### CORE/SHARED TABLES

#### `buildings`
Master table containing all building/property information.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| name | TEXT | NOT NULL | Building name |
| location | TEXT | NOT NULL | Building address |
| total_units | INTEGER | NOT NULL | Total units in building |
| occupied_units | INTEGER | NOT NULL | Currently occupied units |
| open_maintenance_tickets | INTEGER | DEFAULT 0 | Active maintenance count |
| monthly_revenue | DECIMAL | DEFAULT 0 | ETB amount |
| image_url | TEXT | NULL | Building photo URL |
| owner_id | UUID | FOREIGN KEY (auth.users) | Building owner |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Indexes**: owner_id

---

#### `user_profiles`
Extended user information, extends auth.users.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY, FK (auth.users) | User ID |
| full_name | TEXT | NULL | User's full name |
| email | TEXT | UNIQUE | User's email |
| phone | TEXT | NULL | Contact number |
| role | TEXT | NOT NULL | 'system-admin', 'building-owner', 'tenant' |
| building_id | UUID | FK (buildings) | Associated building |
| telegram_handle | TEXT | NULL | Telegram username |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Indexes**: role

**RLS Policies**: Users can view/update their own profile

---

### BUILDING OWNER ADMIN DASHBOARD TABLES

#### `properties`
Individual units/rooms within buildings.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| building_id | UUID | NOT NULL, FK (buildings) | Parent building |
| room_number | TEXT | NOT NULL | Unit identifier (e.g., "310") |
| floor | TEXT | NOT NULL | Floor location |
| square_footage | DECIMAL | NULL | Size in sq.m |
| occupancy_status | TEXT | DEFAULT 'Vacant' | 'Occupied', 'Vacant', 'Under Maintenance' |
| lease_status | TEXT | NULL | Current lease status |
| lease_start_date | DATE | NULL | Lease start |
| lease_end_date | DATE | NULL | Lease end |
| listing_type | TEXT | DEFAULT 'standard' | 'standard', 'auction' |
| base_rent | DECIMAL | NULL | Monthly rent in ETB |
| pricing_mode | TEXT | DEFAULT 'fixed' | 'fixed', 'dimension-based' |
| is_auction | BOOLEAN | DEFAULT false | Auction listing flag |
| current_bid | DECIMAL | NULL | Current auction bid |
| auction_start_time | TIMESTAMP | NULL | Auction start |
| auction_end_time | TIMESTAMP | NULL | Auction end |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Unique Constraint**: (building_id, room_number)
**Indexes**: building_id, occupancy_status

**RLS Policies**: Building owners see only their properties

---

#### `tenants`
Tenant information and lease associations.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| user_id | UUID | FK (auth.users) | Associated user account |
| building_id | UUID | NOT NULL, FK (buildings) | Building location |
| property_id | UUID | NOT NULL, FK (properties) | Rented unit |
| full_name | TEXT | NOT NULL | Tenant name |
| email | TEXT | NULL | Contact email |
| phone | TEXT | NULL | Contact phone |
| company_name | TEXT | NULL | Company/business name |
| outstanding_balance | DECIMAL | DEFAULT 0 | Amount owed in ETB |
| lease_start | DATE | NULL | Lease start date |
| lease_end | DATE | NULL | Lease end date |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Indexes**: building_id, property_id

**RLS Policies**: Tenants see their own record; admins see tenants in their buildings

---

#### `invoices`
Rent invoices and payment history.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| tenant_id | UUID | NOT NULL, FK (tenants) | Tenant being billed |
| property_id | UUID | NOT NULL, FK (properties) | Unit being billed |
| building_id | UUID | NOT NULL, FK (buildings) | Building |
| invoice_month | TEXT | NOT NULL | Month (e.g., "Megabit 2018") |
| base_rent | DECIMAL | NULL | Base rent amount |
| utilities | DECIMAL | DEFAULT 0 | Utilities charged |
| other_charges | DECIMAL | DEFAULT 0 | Additional charges |
| total_amount | DECIMAL | NOT NULL | Total due in ETB |
| amount_paid | DECIMAL | DEFAULT 0 | Amount paid |
| payment_date | DATE | NULL | Date of payment |
| status | TEXT | DEFAULT 'Pending' | 'Paid', 'Pending', 'Overdue' |
| due_date | DATE | NULL | Payment due date |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Indexes**: tenant_id, status

**RLS Policies**: Tenants see their invoices; building owners see their building's invoices

---

#### `receipts`
Payment receipts and confirmation records.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| invoice_id | UUID | NOT NULL, FK (invoices) | Associated invoice |
| tenant_id | UUID | NOT NULL, FK (tenants) | Paying tenant |
| payment_method | TEXT | NULL | Payment method used |
| amount_paid | DECIMAL | NOT NULL | Amount paid in ETB |
| transaction_reference | TEXT | NULL | Bank/gateway transaction ID |
| payment_date | DATE | NOT NULL | Date of payment |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

#### `maintenance_tickets`
Maintenance requests and repair tracking.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| building_id | UUID | NOT NULL, FK (buildings) | Building |
| property_id | UUID | FK (properties) | Unit (if applicable) |
| tenant_id | UUID | FK (tenants) | Requesting tenant |
| category | TEXT | NOT NULL | 'Plumbing', 'Electrical', 'A/C', 'Elevator', 'Other' |
| description | TEXT | NOT NULL | Issue description |
| priority | TEXT | DEFAULT 'Medium' | 'High', 'Medium', 'Low' |
| status | TEXT | DEFAULT 'Open' | 'Open', 'In Progress', 'Resolved' |
| submitted_date | TIMESTAMP | DEFAULT NOW() | Request submission |
| resolved_date | TIMESTAMP | NULL | Completion date |
| assigned_to | UUID | FK (user_profiles) | Assigned technician |
| photo_url | TEXT | NULL | Issue photo |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Indexes**: building_id, status

---

#### `utility_readings`
Electricity, water, and other utility consumption.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| property_id | UUID | NOT NULL, FK (properties) | Unit |
| tenant_id | UUID | FK (tenants) | Occupant |
| previous_reading | DECIMAL | NULL | Prior meter reading |
| current_reading | DECIMAL | NULL | Current meter reading |
| rate_per_unit | DECIMAL | NULL | Cost per unit |
| reading_date | DATE | NULL | Date of reading |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

### TENANT PORTAL TABLES

#### `leases`
Lease agreements (tenant perspective).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| tenant_id | UUID | NOT NULL, FK (tenants) | Tenant |
| property_id | UUID | NOT NULL, FK (properties) | Unit |
| building_id | UUID | NOT NULL, FK (buildings) | Building |
| start_date | DATE | NOT NULL | Gregorian start date |
| end_date | DATE | NOT NULL | Gregorian end date |
| base_rent | DECIMAL | NULL | Monthly rent in ETB |
| start_date_ec | TEXT | NULL | Ethiopian Calendar format |
| end_date_ec | TEXT | NULL | Ethiopian Calendar format |
| lease_document_url | TEXT | NULL | PDF/document URL |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**RLS Policies**: Tenants see only their lease

---

### SYSTEM ADMIN DASHBOARD TABLES

#### `marketplace_listings`
All marketplace property listings (standard and auction).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| building_id | UUID | NOT NULL, FK (buildings) | Owner building |
| property_id | UUID | FK (properties) | Specific unit (optional) |
| space_type | TEXT | NOT NULL | 'Shop', 'Office', 'Co-working', 'Event Space' |
| title | TEXT | NOT NULL | Listing title |
| description | TEXT | NULL | Detailed description |
| price | DECIMAL | NULL | Fixed monthly price |
| size_sqm | DECIMAL | NULL | Unit size |
| amenities | TEXT[] | NULL | Array of amenities |
| location | TEXT | NULL | Location address |
| images_urls | TEXT[] | NULL | Array of image URLs |
| is_auction | BOOLEAN | DEFAULT false | Auction flag |
| current_bid | DECIMAL | NULL | Current highest bid |
| auction_start_time | TIMESTAMP | NULL | Auction start |
| auction_end_time | TIMESTAMP | NULL | Auction end |
| views_count | INTEGER | DEFAULT 0 | View counter |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

**Indexes**: is_auction

---

#### `bids`
Auction bids and bid history.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| listing_id | UUID | NOT NULL, FK (marketplace_listings) | Listing being bid on |
| bidder_id | UUID | NOT NULL, FK (auth.users) | Bidder |
| bid_amount | DECIMAL | NOT NULL | Bid amount in ETB |
| bid_time | TIMESTAMP | DEFAULT NOW() | Time of bid |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

**Indexes**: listing_id

---

#### `subscription_plans`
Available subscription tiers for building owners.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| name | TEXT | NOT NULL | Plan name |
| price | DECIMAL | NULL | Plan cost in ETB |
| period | TEXT | NULL | Billing period |
| features | TEXT[] | NULL | Array of features |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

#### `subscription_payments`
Subscription payment records for building owners.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| building_owner_id | UUID | NOT NULL, FK (auth.users) | Owner |
| plan_id | UUID | NOT NULL, FK (subscription_plans) | Selected plan |
| amount | DECIMAL | NULL | Amount paid in ETB |
| payment_status | TEXT | DEFAULT 'Pending' | 'Paid', 'Pending' |
| payment_date | DATE | NULL | Payment date |
| renewal_date | DATE | NULL | Renewal date |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

---

#### `workspace_submissions`
Applications for new workspace/building listings.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| building_id | UUID | FK (buildings) | Existing building (if linked) |
| owner_name | TEXT | NOT NULL | Applicant name |
| owner_email | TEXT | NULL | Applicant email |
| building_name | TEXT | NOT NULL | Building name |
| location | TEXT | NULL | Location |
| description | TEXT | NULL | Description |
| document_count | INTEGER | DEFAULT 0 | Uploaded documents |
| status | TEXT | DEFAULT 'Pending' | 'Approved', 'Rejected', 'Pending' |
| submission_date | DATE | NULL | Submission date |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

#### `credit_partners`
Partner credit organizations.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| name | TEXT | NOT NULL | Partner name |
| contact_person | TEXT | NULL | Main contact |
| email | TEXT | NULL | Contact email |
| phone | TEXT | NULL | Contact phone |
| credit_limit | DECIMAL | NOT NULL | Total credit available |
| used_credit | DECIMAL | DEFAULT 0 | Credit utilized |
| status | TEXT | DEFAULT 'Active' | Partnership status |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

---

#### `credit_requests`
Tenant credit requests and approvals.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| tenant_id | UUID | NOT NULL, FK (tenants) | Requesting tenant |
| amount_requested | DECIMAL | NOT NULL | Amount in ETB |
| purpose | TEXT | NULL | Request purpose |
| status | TEXT | DEFAULT 'Pending' | 'Approved', 'Rejected', 'Pending' |
| request_date | DATE | NULL | Request date |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

#### `financial_reports`
Platform-wide financial analytics.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| building_id | UUID | NOT NULL, FK (buildings) | Associated building |
| month | TEXT | NULL | Report period |
| total_revenue | DECIMAL | NULL | Total revenue in ETB |
| total_expenses | DECIMAL | NULL | Total expenses in ETB |
| outstanding_payments | DECIMAL | NULL | Unpaid invoices in ETB |
| maintenance_costs | DECIMAL | NULL | Maintenance expenses in ETB |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

#### `tax_rules`
Tax configuration and rules.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| name | TEXT | NOT NULL | Tax name |
| value | DECIMAL | NOT NULL | Tax percentage or amount |
| description | TEXT | NULL | Tax description |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update |

---

#### `waitlist_leads`
Prospective tenants on the waitlist.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | Auto-generated |
| name | TEXT | NOT NULL | Lead name |
| phone | TEXT | NULL | Contact phone |
| email | TEXT | NULL | Contact email |
| desired_size | TEXT | NULL | Preferred unit size |
| budget_range | TEXT | NULL | Budget range |
| desired_floor | TEXT | NULL | Preferred floor |
| date_joined | DATE | NULL | Signup date |
| status | TEXT | DEFAULT 'Waiting' | 'Contacted', 'Interested', 'Waiting' |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation |

---

## Relationships Map

```
auth.users (Supabase Auth)
├── user_profiles (1:1)
├── buildings (1:N) [owner_id]
└── bids (1:N) [bidder_id]

buildings (1:N)
├── properties (1:N)
├── tenants (1:N)
├── invoices (1:N)
├── maintenance_tickets (1:N)
├── marketplace_listings (1:N)
├── leases (1:N)
├── subscription_payments (1:N)
├── workspace_submissions (0:1)
└── financial_reports (1:N)

properties (1:N)
├── tenants (1:N)
├── invoices (1:N)
├── maintenance_tickets (0:N)
├── utility_readings (1:N)
└── leases (0:N)

tenants (1:N)
├── invoices (1:N)
├── receipts (1:N)
├── maintenance_tickets (0:N)
├── leases (1:N)
├── credit_requests (0:N)
└── utility_readings (0:N)

invoices (1:N)
└── receipts (1:N)

marketplace_listings (1:N)
└── bids (1:N)

subscription_plans (1:N)
└── subscription_payments (1:N)
```

---

## Query Examples

### System Admin: Get All Buildings with Revenue
```sql
SELECT id, name, location, monthly_revenue, occupied_units, total_units
FROM buildings
ORDER BY monthly_revenue DESC;
```

### Building Owner: Get Properties and Tenants
```sql
SELECT 
  p.id, p.room_number, p.floor, p.base_rent,
  t.full_name, t.outstanding_balance
FROM properties p
LEFT JOIN tenants t ON p.id = t.property_id
WHERE p.building_id = 'building-uuid'
ORDER BY p.room_number;
```

### Tenant: Get Invoice History
```sql
SELECT invoice_month, total_amount, amount_paid, status, payment_date
FROM invoices
WHERE tenant_id = 'tenant-uuid'
ORDER BY created_at DESC;
```

### Marketplace: Get Active Auctions
```sql
SELECT id, title, current_bid, auction_end_time
FROM marketplace_listings
WHERE is_auction = true
AND auction_end_time > NOW()
ORDER BY auction_end_time ASC;
```

---

## Security Notes

1. **Row-Level Security (RLS)**: All user-facing tables have RLS policies enabled
2. **Indexes**: Created on frequently queried columns for performance
3. **Foreign Keys**: All relationships validated at database level
4. **Timestamps**: auto-managed for audit trail

---

## Next Steps

1. Execute the SQL migration in Supabase
2. Add sample data using the INSERT examples
3. Test queries using Supabase Studio SQL Editor
4. Update application code to use Supabase client
5. Implement authentication with Next.js Auth
