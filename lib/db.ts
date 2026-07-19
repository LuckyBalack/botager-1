// Database abstraction layer - Connected to Supabase
import { supabase } from "./supabase"

// PROPERTIES QUERIES
export async function getPropertiesByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("building_id", buildingId)
      .order("room_number", { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching properties:", error)
    return []
  }
}

export async function getPropertyById(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single()

    if (error) throw error
    return data || null
  } catch (error) {
    console.error("Error fetching property:", error)
    return null
  }
}

// TENANTS QUERIES
export async function getTenantsByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("building_id", buildingId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching tenants:", error)
    return []
  }
}

export async function getTenantById(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("id", tenantId)
      .single()

    if (error) throw error
    return data || null
  } catch (error) {
    console.error("Error fetching tenant:", error)
    return null
  }
}

// LEASES QUERIES
export async function getLeasesByTenant(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from("leases")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("start_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching leases:", error)
    return []
  }
}

export async function getLeasesByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("leases")
      .select("*")
      .eq("building_id", buildingId)
      .order("start_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching leases:", error)
    return []
  }
}

// INVOICES QUERIES
export async function getInvoicesByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("building_id", buildingId)
      .order("issue_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return []
  }
}

export async function getInvoicesByTenant(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("issue_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return []
  }
}

export async function getInvoiceById(invoiceId: string) {
  try {
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single()

    if (invoiceError) throw invoiceError

    // Fetch line items for the invoice
    const { data: lineItems, error: itemsError } = await supabase
      .from("invoice_line_items")
      .select("*")
      .eq("invoice_id", invoiceId)

    if (itemsError) throw itemsError

    return { ...invoice, line_items: lineItems || [] }
  } catch (error) {
    console.error("Error fetching invoice:", error)
    return null
  }
}

// MAINTENANCE TICKETS QUERIES
export async function getMaintenanceTicketsByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("maintenance_tickets")
      .select("*")
      .eq("building_id", buildingId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching maintenance tickets:", error)
    return []
  }
}

export async function getMaintenanceTicketsByProperty(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from("maintenance_tickets")
      .select("*")
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching maintenance tickets:", error)
    return []
  }
}

// UTILITY READINGS QUERIES
export async function getUtilityReadingsByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("utility_readings")
      .select("*")
      .eq("building_id", buildingId)
      .order("reading_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching utility readings:", error)
    return []
  }
}

export async function getUtilityReadingsByProperty(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from("utility_readings")
      .select("*")
      .eq("property_id", propertyId)
      .order("reading_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching utility readings:", error)
    return []
  }
}

// LEADS QUERIES (Waitlist)
export async function getLeadsByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("building_id", buildingId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching leads:", error)
    return []
  }
}

export async function createLead(lead: any) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert([lead])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating lead:", error)
    throw error
  }
}

export async function updateLead(leadId: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", leadId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating lead:", error)
    throw error
  }
}

export async function deleteLead(leadId: string) {
  try {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", leadId)

    if (error) throw error
  } catch (error) {
    console.error("Error deleting lead:", error)
    throw error
  }
}

// PAYMENTS QUERIES
export async function getPaymentsByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("building_id", buildingId)
      .order("payment_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching payments:", error)
    return []
  }
}

export async function getPaymentsByTenant(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("payment_date", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching payments:", error)
    return []
  }
}

export async function createPayment(payment: any) {
  try {
    const { data, error } = await supabase
      .from("payments")
      .insert([payment])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating payment:", error)
    throw error
  }
}

// MARKETPLACE LISTINGS QUERIES
export async function getMarketplaceListingsByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("building_id", buildingId)
      .eq("listed_on_marketplace", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching marketplace listings:", error)
    return []
  }
}

export async function getActiveMarketplaceListings() {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, buildings(name, address, region)")
      .eq("listed_on_marketplace", true)
      .eq("occupancy", "available")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching active marketplace listings:", error)
    return []
  }
}

// TAX RULES QUERIES
export async function getTaxRulesByBuilding(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("tax_rules")
      .select("*")
      .eq("building_id", buildingId)
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching tax rules:", error)
    return []
  }
}


