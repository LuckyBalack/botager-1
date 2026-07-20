# Populate Supabase Database with Test Data

Your Supabase database tables are created but empty. Follow these steps to populate them with sample data so the application can display content:

## Steps to Load Sample Data

### 1. Open Supabase SQL Editor
- Go to your Supabase project dashboard
- Click on **SQL Editor** in the left sidebar
- Click **New Query**

### 2. Copy and Paste the Seed Data
- Open the file: `supabase/seed-data.sql` in your project
- Copy all the SQL code
- Paste it into the Supabase SQL Editor query box

### 3. Execute the SQL
- Click the **Run** button (or press Ctrl+Enter)
- Wait for the query to complete successfully

### 4. Verify Data Was Loaded
- Go to **Database** → **Tables**
- Check that each table now shows data:
  - `buildings` - 3 records
  - `properties` - 4 records
  - `user_profiles` - 3 records
  - `tenants` - 2 records
  - `leases` - 2 records
  - `invoices` - 3 records
  - `receipts` - 2 records
  - `maintenance_tickets` - 2 records
  - `marketplace_listings` - 3 records
  - `bids` - 2 records
  - `subscription_plans` - 3 records
  - `subscription_payments` - 2 records
  - `waitlist_leads` - 2 records

### 5. Refresh the Application
- Go back to your application preview
- Refresh the page (F5 or Cmd+R)
- The marketplace listings should now load with data!

## Test Data Includes

### Buildings
- **Abuki Building** - Office complex in Bole
- **Sky Tower Residences** - Luxury apartments in Kazanchis
- **Tech Hub Office** - Startup coworking space in CMC

### Marketplace Listings
- 2 standard rentals with fixed prices
- 1 live auction property with real-time bidding

### Sample Tenants & Leases
- Active leases with payment history
- Mix of paid and pending invoices

### Maintenance Requests
- Open and in-progress maintenance tickets

## Troubleshooting

**Q: I get an error "duplicate key value violates unique constraint"**
- The data might already exist. Clear the tables first and try again.

**Q: Tables still show 0 rows after running the SQL**
- Make sure you copied the entire SQL file
- Check that the query ran without errors in the SQL Editor
- Click **Refresh** in the Tables view

**Q: Application still shows "Loading..."**
- Wait a few seconds for the page to auto-refresh
- Manually refresh your browser (F5)
- Check that all 13 tables have data rows

## What Happens Next

Once the data is loaded:
1. The frontend will fetch marketplace listings from Supabase
2. The dashboard will display real buildings, properties, and leases
3. The marketplace will show auction and rental listings
4. All detail pages will load with complete data

The application is now fully connected and ready to use!
