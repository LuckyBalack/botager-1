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

export async function createOrUpdateTaxRule(buildingId: string, rule: any) {
  try {
    const { data, error } = await supabase
      .from("tax_rules")
      .upsert([
        {
          building_id: buildingId,
          ...rule,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error saving tax rule:", error)
    throw error
  }
}

export async function deleteTaxRule(ruleId: string) {
  try {
    const { error } = await supabase
      .from("tax_rules")
      .delete()
      .eq("id", ruleId)

    if (error) throw error
  } catch (error) {
    console.error("Error deleting tax rule:", error)
    throw error
  }
}

// BUILDINGS QUERIES
export async function getAllBuildings() {
  try {
    const { data, error } = await supabase
      .from("buildings")
      .select("*, properties(id)")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching buildings:", error)
    return []
  }
}

export async function getBuildingById(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("buildings")
      .select("*")
      .eq("id", buildingId)
      .single()

    if (error) throw error
    return data || null
  } catch (error) {
    console.error("Error fetching building:", error)
    return null
  }
}

// NOTIFICATIONS QUERIES
export async function getNotificationTemplates(buildingId: string) {
  try {
    const { data, error } = await supabase
      .from("notification_templates")
      .select("*")
      .eq("building_id", buildingId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching notification templates:", error)
    return []
  }
}

export async function updateNotificationTemplate(templateId: string, template: any) {
  try {
    const { data, error } = await supabase
      .from("notification_templates")
      .update(template)
      .eq("id", templateId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating notification template:", error)
    throw error
  }
}

// PROPERTY DETAIL QUERIES
export async function getPropertyById(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, tenants(*)")
      .eq("id", propertyId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching property:", error)
    return null
  }
}

export async function getPropertyAssets(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from("property_assets")
      .select("*")
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching property assets:", error)
    return []
  }
}

export async function createPropertyAsset(propertyId: string, asset: any) {
  try {
    const { data, error } = await supabase
      .from("property_assets")
      .insert([{ property_id: propertyId, ...asset }])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating property asset:", error)
    throw error
  }
}

// TENANT DETAIL QUERIES
export async function getTenantWithDetails(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from("tenants")
      .select("*, properties(*)")
      .eq("id", tenantId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching tenant details:", error)
    return null
  }
}

export async function getTenantDocuments(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from("tenant_documents")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching tenant documents:", error)
    return []
  }
}

// MAINTENANCE TICKET DETAIL QUERIES
export async function getMaintenanceTicketById(ticketId: string) {
  try {
    const { data, error } = await supabase
      .from("maintenance_tickets")
      .select("*, properties(*), vendors(*)")
      .eq("id", ticketId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching maintenance ticket:", error)
    return null
  }
}

export async function getTicketMessages(ticketId: string) {
  try {
    const { data, error } = await supabase
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching ticket messages:", error)
    return []
  }
}

export async function addTicketMessage(ticketId: string, message: any) {
  try {
    const { data, error } = await supabase
      .from("ticket_messages")
      .insert([{ ticket_id: ticketId, ...message }])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error adding ticket message:", error)
    throw error
  }
}

export async function updateMaintenanceTicketStatus(ticketId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("maintenance_tickets")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", ticketId)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating ticket status:", error)
    throw error
  }
}

// INVOICE DETAIL QUERIES
export async function getInvoiceById(invoiceId: string) {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, tenants(*), properties(*)")
      .eq("id", invoiceId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching invoice:", error)
    return null
  }
}

export async function getInvoiceLineItems(invoiceId: string) {
  try {
    const { data, error } = await supabase
      .from("invoice_line_items")
      .select("*")
      .eq("invoice_id", invoiceId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching invoice line items:", error)
    return []
  }
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", invoiceId)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating invoice status:", error)
    throw error
  }
}

export async function emailInvoice(invoiceId: string, tenantEmail: string) {
  try {
    // Call backend function to send email
    const { data, error } = await supabase.functions.invoke("send-invoice-email", {
      body: { invoiceId, tenantEmail },
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error emailing invoice:", error)
    throw error
  }
}

