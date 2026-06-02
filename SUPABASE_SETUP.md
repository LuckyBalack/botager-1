# Supabase Setup Guide for WRM Application

This guide provides step-by-step instructions to set up the Supabase database for the three dashboards: System Admin, Building Owner Admin, and Tenant Portal.

## Prerequisites

- Supabase account (https://supabase.com)
- Node.js and npm/yarn installed locally
- Git installed

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in/create an account
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: `wrm-app` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Select the region closest to your users (e.g., "Asia Pacific - Singapore")
4. Click "Create new project"
5. Wait for the project to initialize (2-3 minutes)

## Step 2: Get Your Credentials

Once your project is created:

1. Go to **Project Settings** (gear icon at bottom left)
2. Click **API** in the left sidebar
3. Copy the following values:
   - **Project URL** (in "Project URL" field)
   - **Anon Key** (in "Project API keys" section, copy the "anon" key)

## Step 3: Set Environment Variables

1. Open `.env.local` in your project root
2. Add/update the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
   ```
3. Save the file (this file is in `.gitignore` so it won't be committed)

## Step 4: Create Database Tables

### Option A: Using SQL Editor (Recommended)

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click **RUN**
6. Wait for all tables to be created (you'll see "Success" messages)

### Option B: Using Supabase CLI

If you prefer using the CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your_project_ref

# Apply migrations
supabase db push
```

## Step 5: Verify Table Creation

1. In Supabase, go to **Table Editor** (left sidebar)
2. Verify that all these tables exist:

### System Admin Dashboard Tables
- `financial_reports` - Platform financial data
- `credit_partners` - Credit partner information
- `workspace_submissions` - Workspace/building submissions
- `subscription_plans` - Subscription tier definitions
- `subscription_payments` - Subscription payment records

### Building Owner Admin Tables
- `buildings` - Building properties
- `properties` - Individual units/rooms
- `tenants` - Tenant information
- `invoices` - Payment invoices
- `receipts` - Payment receipts
- `maintenance_tickets` - Maintenance requests
- `utility_readings` - Utility consumption records

### Tenant Portal Tables
- `leases` - Lease agreements
- `invoices` - Invoice history (shared with admin)

### Public/Shared Tables
- `user_profiles` - User authentication and profile data
- `marketplace_listings` - Marketplace listings (standard and auction)
- `bids` - Auction bid history
- `waitlist_leads` - Waitlist signups

## Step 6: Configure Row-Level Security (RLS)

The SQL migration includes RLS policies. To verify they're enabled:

1. Go to **Authentication** → **Policies** (left sidebar)
2. For each table that has RLS enabled, you should see policies
3. Verify these tables have RLS:
   - `buildings` - Building owners see only their buildings
   - `properties` - Building owners see only their properties
   - `tenants` - Tenants see only their records
   - `leases` - Tenants see only their leases
   - `invoices` - Tenants see only their invoices

## Step 7: Load Sample Data

To populate the database with sample data for testing:

1. Use the **Supabase Studio** Table Editor to manually insert data, or
2. Create a migration file: `supabase/migrations/002_sample_data.sql`
3. Add INSERT statements for test data

Example sample data queries:

```sql
-- Add a sample building
INSERT INTO buildings (name, location, total_units, occupied_units, monthly_revenue)
VALUES ('Abuki Building', 'Bole, Addis Ababa', 120, 108, 1800000);

-- Add a sample property
INSERT INTO properties (building_id, room_number, floor, base_rent, occupancy_status)
VALUES (
  (SELECT id FROM buildings WHERE name = 'Abuki Building' LIMIT 1),
  '310',
  '3rd Floor',
  15000,
  'Occupied'
);

-- Add a sample tenant
INSERT INTO tenants (full_name, email, phone, building_id, property_id)
VALUES (
  'Alemu Getachew',
  'alemu@example.com',
  '+251 911 123456',
  (SELECT id FROM buildings WHERE name = 'Abuki Building' LIMIT 1),
  (SELECT id FROM properties WHERE room_number = '310' LIMIT 1)
);
```

## Step 8: Test the Connection

1. In your project root, run:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser

3. Test that the app can connect to Supabase:
   - Check browser console for errors
   - Look for any authentication-related messages

4. If you see errors, verify:
   - Environment variables are correct in `.env.local`
   - Supabase project is active and hasn't expired
   - Tables were created successfully

## Database Schema Overview

### Three-Dashboard Architecture

#### 1. System Admin Dashboard
**Purpose**: Platform-wide management and analytics

**Key Tables**:
- `buildings` - All buildings on the platform
- `financial_reports` - Platform-wide revenue and expenses
- `credit_partners` - Partner credit organizations
- `workspace_submissions` - New workspace listings submitted
- `subscription_payments` - Building owner subscription status

#### 2. Building Owner Admin Dashboard
**Purpose**: Manage a single building and its properties

**Key Tables**:
- `buildings` - The owner's buildings
- `properties` - Units/rooms in the building
- `tenants` - Tenants in the building
- `invoices` - Rent collection
- `receipts` - Payment records
- `maintenance_tickets` - Maintenance requests
- `utility_readings` - Electricity/water usage

**Access**: Filtered by `owner_id` in `buildings` table

#### 3. Tenant Portal
**Purpose**: Tenants view their lease, pay rent, request maintenance

**Key Tables**:
- `leases` - Tenant's lease agreement
- `invoices` - Tenant's payment history
- `maintenance_tickets` - Tenant's maintenance requests

**Access**: Filtered by `tenant_id` via tenant association

## Data Flow

```
User Login → Create session (auth.users)
    ↓
Create user_profile with role (system-admin, building-owner, tenant)
    ↓
Load dashboard based on role:
  - System Admin → See all buildings, financial data, subscriptions
  - Building Owner → See their buildings, tenants, invoices, maintenance
  - Tenant → See their lease, invoices, maintenance requests
```

## Querying Data from Application

### Server-Side (Next.js Server Components)

```typescript
import { createClient } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = createClient()
  
  const { data: buildings } = await supabase
    .from('buildings')
    .select('*')
  
  return <div>{/* Use buildings data */}</div>
}
```

### Client-Side (React Components)

```typescript
'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [data, setData] = useState(null)
  const supabase = createClient()
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('buildings')
        .select('*')
      setData(data)
    }
    
    fetchData()
  }, [])
  
  return <div>{/* Use data */}</div>
}
```

## Useful Supabase Features

### Real-time Updates
```typescript
const subscription = supabase
  .from('invoices')
  .on('*', (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

### Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePassword123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'SecurePassword123'
})
```

### Insert Data
```typescript
const { data, error } = await supabase
  .from('invoices')
  .insert([
    {
      tenant_id: 'uuid-here',
      invoice_month: 'April 2024',
      total_amount: 15000,
      status: 'Pending'
    }
  ])
```

## Troubleshooting

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not set"
- **Solution**: Add the variable to `.env.local` and restart `npm run dev`

### Issue: "Rows returned by the query don't match with the expected type"
- **Solution**: Check that the table structure matches the TypeScript types in `types/database.ts`

### Issue: RLS Policy Denying Access
- **Solution**: Check that the user's ID matches the policy conditions
- Temporarily disable RLS for development: Go to table → click **... menu** → **Disable RLS** (not recommended for production)

### Issue: Can't Connect to Supabase
- **Solution**: 
  1. Verify your project URL and key are correct
  2. Check that your Supabase project is active (not suspended)
  3. Try in an incognito window to rule out browser cache issues

## Next Steps

1. **Implement Authentication**: Set up user sign-up and login flows
2. **Create API Routes**: Add Next.js API routes for complex operations
3. **Add Real-time Updates**: Use Supabase real-time subscriptions
4. **Configure RLS Properly**: Implement role-based policies for security
5. **Set Up Backups**: Configure automatic backups in Supabase settings

## Resources

- Supabase Docs: https://supabase.com/docs
- Next.js + Supabase Integration: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- TypeScript Support: https://supabase.com/docs/guides/database/extensions/types
- Row-Level Security Guide: https://supabase.com/docs/guides/auth/row-level-security

## Support

For questions or issues:
1. Check the Supabase documentation
2. Review the Supabase Discord community
3. Check GitHub issues in the Supabase repository
