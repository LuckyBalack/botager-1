import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  console.log("🌱 Starting database seed...")

  try {
    // Seed user_profiles
    console.log("Seeding user_profiles...")
    const { error: userError } = await supabase.from("user_profiles").insert([
      {
        id: "user-1",
        email: "owner@example.com",
        name: "Alemu Getachew",
        role: "building-owner",
        phone: "+251911123456",
      },
      {
        id: "user-2",
        email: "tenant@example.com",
        name: "Getachew Temesgen",
        role: "tenant",
        phone: "+251922234567",
      },
      {
        id: "user-3",
        email: "admin@example.com",
        name: "System Admin",
        role: "system-admin",
        phone: "+251933345678",
      },
    ])
    if (userError) console.error("User profiles error:", userError)
    else console.log("✓ User profiles seeded")

    // Seed buildings
    console.log("Seeding buildings...")
    const { data: buildingsData, error: buildingError } = await supabase
      .from("buildings")
      .insert([
        {
          id: "building-1",
          name: "Abuki Residence",
          location: "Addis Ababa, Bole",
          city: "Addis Ababa",
          subcity: "Bole",
          total_units: 45,
          year_built: 2020,
          owner_id: "user-1",
          owner_name: "Alemu Getachew",
          price: 35000,
          is_auction: false,
          contact_phone: "+251911123456",
          images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"],
          description: "Modern residential building with excellent amenities",
          amenities: ["WiFi", "Parking", "Security", "Generator"],
          building_features: ["24/7 Security", "Water Tank", "Solar Panels"],
        },
        {
          id: "building-2",
          name: "Green Park Office",
          location: "Addis Ababa, Kazanchis",
          city: "Addis Ababa",
          subcity: "Kazanchis",
          total_units: 30,
          year_built: 2022,
          owner_id: "user-1",
          owner_name: "Alemu Getachew",
          price: 50000,
          is_auction: true,
          contact_phone: "+251911123456",
          images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e"],
          description: "Premium office space with modern infrastructure",
          amenities: ["WiFi", "Conference Rooms", "Cafeteria", "Parking"],
          building_features: ["High-Speed Internet", "Meeting Rooms", "Reception"],
        },
      ])
      .select()

    if (buildingError) console.error("Buildings error:", buildingError)
    else {
      console.log("✓ Buildings seeded")

      // Seed properties
      if (buildingsData && buildingsData.length > 0) {
        console.log("Seeding properties...")
        const properties = []
        for (let i = 0; i < 10; i++) {
          properties.push({
            id: `property-${i + 1}`,
            building_id: buildingsData[0].id,
            unit_number: `${String.fromCharCode(65 + Math.floor(i / 5))}${(i % 5) + 1}`,
            room_type: i % 3 === 0 ? "1-bedroom" : i % 3 === 1 ? "2-bedroom" : "3-bedroom",
            floor: Math.floor(i / 5) + 1,
            size: 50 + i * 10,
            monthly_rent: 3500 + i * 500,
            status: i % 4 === 0 ? "vacant" : i % 4 === 1 ? "occupied" : i % 4 === 2 ? "maintenance" : "reserved",
            is_auction: false,
            current_bid: null,
          })
        }
        const { error: propError } = await supabase.from("properties").insert(properties)
        if (propError) console.error("Properties error:", propError)
        else console.log("✓ Properties seeded")
      }
    }

    // Seed tenants
    console.log("Seeding tenants...")
    const { error: tenantError } = await supabase.from("tenants").insert([
      {
        id: "tenant-1",
        user_id: "user-2",
        name: "Getachew Temesgen",
        email: "tenant@example.com",
        phone: "+251922234567",
        status: "active",
      },
      {
        id: "tenant-2",
        user_id: "user-2",
        name: "Abeba Tesfaye",
        email: "abeba@example.com",
        phone: "+251944556789",
        status: "active",
      },
    ])
    if (tenantError) console.error("Tenants error:", tenantError)
    else console.log("✓ Tenants seeded")

    // Seed leases
    console.log("Seeding leases...")
    const { error: leaseError } = await supabase.from("leases").insert([
      {
        id: "lease-1",
        tenant_id: "tenant-1",
        property_id: "property-1",
        building_id: "building-1",
        start_date: "2024-01-01",
        end_date: "2025-01-01",
        monthly_rent: 3500,
        security_deposit: 7000,
        status: "active",
      },
      {
        id: "lease-2",
        tenant_id: "tenant-2",
        property_id: "property-2",
        building_id: "building-1",
        start_date: "2023-06-01",
        end_date: "2025-06-01",
        monthly_rent: 4000,
        security_deposit: 8000,
        status: "active",
      },
    ])
    if (leaseError) console.error("Leases error:", leaseError)
    else console.log("✓ Leases seeded")

    // Seed invoices
    console.log("Seeding invoices...")
    const { error: invoiceError } = await supabase.from("invoices").insert([
      {
        id: "invoice-1",
        tenant_id: "tenant-1",
        lease_id: "lease-1",
        amount: 3500,
        amount_due: 0,
        due_date: "2024-02-01",
        status: "paid",
        month: "January 2024",
      },
      {
        id: "invoice-2",
        tenant_id: "tenant-1",
        lease_id: "lease-1",
        amount: 3500,
        amount_due: 3500,
        due_date: "2024-03-01",
        status: "pending",
        month: "February 2024",
      },
      {
        id: "invoice-3",
        tenant_id: "tenant-2",
        lease_id: "lease-2",
        amount: 4000,
        amount_due: 0,
        due_date: "2024-02-01",
        status: "paid",
        month: "January 2024",
      },
    ])
    if (invoiceError) console.error("Invoices error:", invoiceError)
    else console.log("✓ Invoices seeded")

    // Seed receipts
    console.log("Seeding receipts...")
    const { error: receiptError } = await supabase.from("receipts").insert([
      {
        id: "receipt-1",
        invoice_id: "invoice-1",
        tenant_id: "tenant-1",
        amount: 3500,
        payment_method: "bank_transfer",
        payment_date: "2024-01-28",
        reference: "TXN-20240128-001",
      },
      {
        id: "receipt-2",
        invoice_id: "invoice-3",
        tenant_id: "tenant-2",
        amount: 4000,
        payment_method: "bank_transfer",
        payment_date: "2024-01-25",
        reference: "TXN-20240125-001",
      },
    ])
    if (receiptError) console.error("Receipts error:", receiptError)
    else console.log("✓ Receipts seeded")

    // Seed marketplace listings
    console.log("Seeding marketplace listings...")
    const { error: listingError } = await supabase.from("marketplace_listings").insert([
      {
        id: "listing-1",
        building_id: "building-1",
        building_name: "Abuki Residence",
        property_type: "residential",
        price: 35000,
        current_bid: null,
        is_auction: false,
        location: "Bole, Addis Ababa",
        subcity: "Bole",
        size: 500,
        floor: 1,
        description: "Modern residential building with excellent amenities",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"],
        amenities: ["WiFi", "Parking", "Security", "Generator"],
        building_features: ["24/7 Security", "Water Tank", "Solar Panels"],
        views_count: 245,
      },
      {
        id: "listing-2",
        building_id: "building-2",
        building_name: "Green Park Office",
        property_type: "commercial",
        price: 45000,
        current_bid: 50000,
        is_auction: true,
        auction_start_time: "2024-06-01",
        auction_end_time: "2024-06-15",
        location: "Kazanchis, Addis Ababa",
        subcity: "Kazanchis",
        size: 800,
        floor: 2,
        description: "Premium office space with modern infrastructure",
        images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e"],
        amenities: ["WiFi", "Conference Rooms", "Cafeteria", "Parking"],
        building_features: ["High-Speed Internet", "Meeting Rooms", "Reception"],
        views_count: 512,
      },
    ])
    if (listingError) console.error("Marketplace listings error:", listingError)
    else console.log("✓ Marketplace listings seeded")

    // Seed bids
    console.log("Seeding bids...")
    const { error: bidError } = await supabase.from("bids").insert([
      {
        id: "bid-1",
        listing_id: "listing-2",
        bidder_id: "user-1",
        bid_amount: 48000,
        bid_time: "2024-06-05",
      },
      {
        id: "bid-2",
        listing_id: "listing-2",
        bidder_id: "user-1",
        bid_amount: 50000,
        bid_time: "2024-06-08",
      },
    ])
    if (bidError) console.error("Bids error:", bidError)
    else console.log("✓ Bids seeded")

    // Seed maintenance tickets
    console.log("Seeding maintenance tickets...")
    const { error: maintenanceError } = await supabase.from("maintenance_tickets").insert([
      {
        id: "ticket-1",
        tenant_id: "tenant-1",
        property_id: "property-1",
        building_id: "building-1",
        issue_type: "plumbing",
        description: "Leaking tap in bathroom",
        status: "open",
        priority: "medium",
        created_date: "2024-02-20",
      },
      {
        id: "ticket-2",
        tenant_id: "tenant-2",
        property_id: "property-2",
        building_id: "building-1",
        issue_type: "electrical",
        description: "Light fixture not working",
        status: "in_progress",
        priority: "high",
        created_date: "2024-02-19",
      },
    ])
    if (maintenanceError) console.error("Maintenance tickets error:", maintenanceError)
    else console.log("✓ Maintenance tickets seeded")

    console.log("\n✅ Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seedDatabase()
