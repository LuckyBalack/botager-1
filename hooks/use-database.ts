import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import {
  getPropertiesByOwner,
  getTenantsByProperty,
  getInvoicesByProperty,
  getMaintenanceRequestsByProperty,
  getWaitlistLeadsByProperty,
  getUtilityReadingsByProperty,
  getMarketplaceListingsByProperty,
} from '@/lib/db'

// Hook to fetch properties for current user
export function useProperties() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user?.id) return

    const fetchProperties = async () => {
      try {
        setLoading(true)
        const data = await getPropertiesByOwner(user.id)
        setProperties(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch properties'))
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [user?.id])

  return { properties, loading, error }
}

// Hook to fetch tenants for a property
export function useTenants(propertyId: string | null) {
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!propertyId) return

    const fetchTenants = async () => {
      try {
        setLoading(true)
        const data = await getTenantsByProperty(propertyId)
        setTenants(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tenants'))
      } finally {
        setLoading(false)
      }
    }

    fetchTenants()
  }, [propertyId])

  return { tenants, loading, error }
}

// Hook to fetch invoices for a property
export function useInvoices(propertyId: string | null) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!propertyId) return

    const fetchInvoices = async () => {
      try {
        setLoading(true)
        const data = await getInvoicesByProperty(propertyId)
        setInvoices(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch invoices'))
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [propertyId])

  return { invoices, loading, error }
}

// Hook to fetch maintenance requests for a property
export function useMaintenanceRequests(propertyId: string | null) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!propertyId) return

    const fetchRequests = async () => {
      try {
        setLoading(true)
        const data = await getMaintenanceRequestsByProperty(propertyId)
        setRequests(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch maintenance requests'))
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [propertyId])

  return { requests, loading, error }
}

// Hook to fetch waitlist leads for a property
export function useWaitlistLeads(propertyId: string | null) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!propertyId) return

    const fetchLeads = async () => {
      try {
        setLoading(true)
        const data = await getWaitlistLeadsByProperty(propertyId)
        setLeads(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch waitlist leads'))
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [propertyId])

  return { leads, loading, error }
}

// Hook to fetch utility readings for a property
export function useUtilityReadings(propertyId: string | null) {
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!propertyId) return

    const fetchReadings = async () => {
      try {
        setLoading(true)
        const data = await getUtilityReadingsByProperty(propertyId)
        setReadings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch utility readings'))
      } finally {
        setLoading(false)
      }
    }

    fetchReadings()
  }, [propertyId])

  return { readings, loading, error }
}

// Hook to fetch marketplace listings for a property
export function useMarketplaceListings(propertyId: string | null) {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!propertyId) return

    const fetchListings = async () => {
      try {
        setLoading(true)
        const data = await getMarketplaceListingsByProperty(propertyId)
        setListings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch marketplace listings'))
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [propertyId])

  return { listings, loading, error }
}
