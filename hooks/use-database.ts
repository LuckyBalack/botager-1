import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import {
  getPropertiesByBuilding,
  getTenantsByBuilding,
  getInvoicesByBuilding,
  getMaintenanceTicketsByBuilding,
  getLeadsByBuilding,
  getUtilityReadingsByBuilding,
  getMarketplaceListingsByBuilding,
  getPaymentsByBuilding,
  getLeasesByBuilding,
  getTaxRulesByBuilding,
} from '@/lib/db'

// Hook to fetch properties for current building
export function useProperties(buildingId: string | null) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchProperties = async () => {
      try {
        setLoading(true)
        const data = await getPropertiesByBuilding(buildingId)
        setProperties(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch properties'))
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [buildingId])

  return { properties, loading, error }
}

// Hook to fetch tenants for a building
export function useTenants(buildingId: string | null) {
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchTenants = async () => {
      try {
        setLoading(true)
        const data = await getTenantsByBuilding(buildingId)
        setTenants(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tenants'))
      } finally {
        setLoading(false)
      }
    }

    fetchTenants()
  }, [buildingId])

  return { tenants, loading, error }
}

// Hook to fetch invoices for a building
export function useInvoices(buildingId: string | null) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchInvoices = async () => {
      try {
        setLoading(true)
        const data = await getInvoicesByBuilding(buildingId)
        setInvoices(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch invoices'))
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [buildingId])

  return { invoices, loading, error }
}

// Hook to fetch maintenance tickets for a building
export function useMaintenanceRequests(buildingId: string | null) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchRequests = async () => {
      try {
        setLoading(true)
        const data = await getMaintenanceTicketsByBuilding(buildingId)
        setRequests(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch maintenance tickets'))
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [buildingId])

  return { requests, loading, error }
}

// Hook to fetch leads for a building
export function useWaitlistLeads(buildingId: string | null) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchLeads = async () => {
      try {
        setLoading(true)
        const data = await getLeadsByBuilding(buildingId)
        setLeads(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch leads'))
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [buildingId])

  return { leads, loading, error }
}

// Hook to fetch utility readings for a building
export function useUtilityReadings(buildingId: string | null) {
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchReadings = async () => {
      try {
        setLoading(true)
        const data = await getUtilityReadingsByBuilding(buildingId)
        setReadings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch utility readings'))
      } finally {
        setLoading(false)
      }
    }

    fetchReadings()
  }, [buildingId])

  return { readings, loading, error }
}

// Hook to fetch marketplace listings for a building
export function useMarketplaceListings(buildingId: string | null) {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchListings = async () => {
      try {
        setLoading(true)
        const data = await getMarketplaceListingsByBuilding(buildingId)
        setListings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch marketplace listings'))
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [buildingId])

  return { listings, loading, error }
}

// Hook to fetch payments for a building
export function usePayments(buildingId: string | null) {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchPayments = async () => {
      try {
        setLoading(true)
        const data = await getPaymentsByBuilding(buildingId)
        setPayments(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch payments'))
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [buildingId])

  return { payments, loading, error }
}

// Hook to fetch leases for a building
export function useLeases(buildingId: string | null) {
  const [leases, setLeases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchLeases = async () => {
      try {
        setLoading(true)
        const data = await getLeasesByBuilding(buildingId)
        setLeases(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch leases'))
      } finally {
        setLoading(false)
      }
    }

    fetchLeases()
  }, [buildingId])

  return { leases, loading, error }
}

// Hook to fetch tax rules for a building
export function useTaxRules(buildingId: string | null) {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!buildingId) return

    const fetchRules = async () => {
      try {
        setLoading(true)
        const data = await getTaxRulesByBuilding(buildingId)
        setRules(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tax rules'))
      } finally {
        setLoading(false)
      }
    }

    fetchRules()
  }, [buildingId])

  return { rules, loading, error }
}
