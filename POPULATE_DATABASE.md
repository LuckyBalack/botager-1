# Populate Supabase Database with Seed Data

The database tables are created but empty. Follow these steps to populate them with sample data:

## Step 1: Get Your Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Click on your project: **supabase-charcoal-saddle**
3. Go to **Settings** → **API**
4. Copy the **Service Role Secret** key (the long string starting with `sbp_`)

## Step 2: Add to Environment

Add this to your `.env.local` file:

```
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

Replace `<your-service-role-key>` with the key you copied in Step 1.

## Step 3: Run the Seed Script

```bash
npx ts-node scripts/seed-database.ts
```

Or with Node directly:

```bash
node --loader ts-node/esm scripts/seed-database.ts
```

## Step 4: Verify Data

Go back to your Supabase dashboard and check the **Tables** section. You should now see:

- ✓ buildings: 2 records
- ✓ properties: 10 records
- ✓ tenants: 2 records
- ✓ leases: 2 records
- ✓ invoices: 3 records
- ✓ receipts: 2 records
- ✓ marketplace_listings: 2 records
- ✓ maintenance_tickets: 2 records
- ✓ user_profiles: 3 records
- ✓ bids: 2 records

## Step 5: Refresh Your App

Once seeding is complete:

1. Refresh your browser
2. The app should now display real data from Supabase
3. All dashboards will populate with the sample data

## Troubleshooting

**"Missing Supabase credentials" error:**
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is in `.env.local`
- Verify you copied the full key without extra spaces

**"Connection failed" error:**
- Check your Supabase URL and credentials in `.env.local`
- Verify your project is active in Supabase dashboard

**Partial data:**
- Some records may fail if there are foreign key constraints
- Check Supabase dashboard logs for specific errors
- Re-run the script to retry

## Manual Alternative

If the script fails, you can manually insert data:

1. Go to Supabase Dashboard → Your Project
2. Click "SQL Editor"
3. Copy the content from `supabase/migrations/001_initial_schema.sql`
4. Paste it and run to ensure schema is created
5. Then manually add records via the Table Editor UI

## Sample Data Included

The seed script populates with realistic Ethiopian business data:
- Buildings in Addis Ababa (Bole, Kazanchis)
- Tenants with lease agreements
- Monthly invoices and payment receipts
- Marketplace listings with both standard rentals and auction listings
- Maintenance tickets
- Building owner and admin user profiles
