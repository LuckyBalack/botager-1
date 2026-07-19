# Quick Start: Supabase Integration

## Step 1: Connect Supabase to Your Project

1. Open your project settings (top right corner)
2. Click "Settings" → "Integrations"  
3. Click "Add Integration" → select "Supabase"
4. Follow the prompts to connect your Supabase project
5. Confirm that environment variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Create Database Schema

Once Supabase is connected, create all 25 tables with their schema. See `/DATABASE_ANALYSIS.md` for the complete schema definition, or execute the SQL migration script.

## Step 3: Enable Row Level Security

For each table, enable RLS policies. See `/MIGRATIONS.sql` for all RLS policy definitions.

## Step 4: Install Supabase Client Package

When Supabase is connected, install the client:
```bash
npm install @supabase/supabase-js
```

## Step 5: Update Database Layer

Once installed, update `/lib/db.ts` with real Supabase queries:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getPropertiesByOwner(ownerId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ... (repeat for other functions)
```

## Step 6: Test Connection

1. Start dev server: `npm run dev`
2. Check browser console for any Supabase errors
3. Try to load a component that uses database hooks
4. Verify data appears (or no-data message)

## Step 7: Update Components (Systematic)

For each component in `components/views/`:

```typescript
// 1. Remove old import
// import { properties } from '@/lib/data'

// 2. Add new import
import { useProperties } from '@/hooks/use-database'

// 3. Use hook
const { properties, loading, error } = useProperties()

// 4. Add loading/error states
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />

// 5. Rest of component stays same
```

## Priority Order for Updates:

1. **Dashboard View** - Shows overview
2. **Properties View** - Core feature (partially done)
3. **Tenants View** - Core feature
4. **Property Detail View** - Core feature
5. **Billing View** - Financial feature
6. **Maintenance View** - Operations feature
7. **Marketplace View** - New feature
8. **Utility Tracking View** - New feature
9. **Waitlist View** - Sales feature
10. **Lease Settlement View** - Finance feature

## Troubleshooting:

**Error: "Cannot read properties of null"**
- Check environment variables are set
- Restart dev server
- Check Supabase project is accessible

**Error: "RLS policy violation"**
- Make sure user is authenticated
- Verify RLS policies allow the operation
- Check user ID in database

**Error: "Relation not found"**
- Confirm all 25 tables are created
- Check table names match exactly
- Verify table exists in Supabase dashboard

## Database Tables Quick Reference:

**Core Tables:**
- properties, rooms, tenants, leases
- invoices, invoice_items
- maintenance_requests
- user_profiles

**Financial:**
- tax_rules, pricing_config
- payment_methods
- subscription_plans, user_subscriptions

**Features:**
- utility_readings
- lease_settlements
- waitlist_leads
- marketplace_listings

**System:**
- audit_logs, messages, documents
- workspace_submissions, credit_partners

## Testing Checklist:

- [ ] Supabase integration connected
- [ ] Environment variables set
- [ ] All 25 tables created
- [ ] RLS policies enabled
- [ ] Can read data without authentication (public)
- [ ] Can read only own data (authenticated)
- [ ] Can create new records
- [ ] Can update own records
- [ ] Cannot access other users' data
- [ ] Build passes: `npm run build`
- [ ] Dev server starts: `npm run dev`

## Documentation Files:

- `COMPLETION_SUMMARY.md` - Overview & status
- `IMPLEMENTATION_STATUS.md` - Detailed analysis
- `MIGRATION_GUIDE.md` - Migration instructions
- `DATABASE_ANALYSIS.md` - Initial analysis
- This file - Quick start guide

---

**Estimated Time to Full Integration:** 4-6 hours from this point
