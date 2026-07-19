"use client"

import { AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { useState, useMemo } from "react"
import { useInvoices, useLeases, useMaintenanceRequests } from "@/hooks/use-database"

type AlertType = "critical" | "warning" | "info"

type AlertItem = {
  id: string
  type: AlertType
  title: string
  description: string
}

type DashboardAlertsProps = {
  buildingId: string | null
}

function AlertIcon({ type }: { type: AlertType }) {
  switch (type) {
    case "critical":
      return <AlertCircle className="h-4 w-4" />
    case "warning":
      return <AlertTriangle className="h-4 w-4" />
    case "info":
      return <Info className="h-4 w-4" />
  }
}

function AlertStyles({ type }: { type: AlertType }) {
  switch (type) {
    case "critical":
      return "bg-red-50 border-red-200 text-red-700"
    case "warning":
      return "bg-amber-50 border-amber-200 text-amber-700"
    case "info":
      return "bg-blue-50 border-blue-200 text-blue-700"
  }
}

type AlertProps = AlertItem & {
  onDismiss: (id: string) => void
}

function AlertBadge({ id, type, title, description, onDismiss }: AlertProps) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${AlertStyles({ type })}`}>
      <AlertIcon type={type} />
      <span className="max-w-xs truncate">
        <span className="font-semibold">{title}</span>
        <span className="hidden sm:inline"> - {description}</span>
      </span>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="ml-1 hover:opacity-70"
        aria-label="Dismiss alert"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export function DashboardAlerts({ buildingId }: DashboardAlertsProps) {
  const { invoices = [] } = useInvoices(buildingId)
  const { leases = [] } = useLeases(buildingId)
  const { requests = [] } = useMaintenanceRequests(buildingId)
  const [dismissedIds, setDismissedIds] = useState<string[]>([])

  // Generate alerts from real data
  const alerts = useMemo(() => {
    const generatedAlerts: AlertItem[] = []
    
    // Check for overdue invoices
    const overdueInvoices = invoices.filter(inv => {
      if (inv.payment_status === 'paid') return false
      const dueDate = new Date(inv.due_date)
      return dueDate < new Date()
    })
    
    if (overdueInvoices.length > 0) {
      const total = overdueInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
      generatedAlerts.push({
        id: 'overdue-payments',
        type: 'critical',
        title: 'Payment Overdue',
        description: `${overdueInvoices.length} invoice(s) overdue (ETB ${total.toLocaleString()})`,
      })
    }

    // Check for leases expiring soon
    const expiringLeases = leases.filter(lease => {
      const endDate = new Date(lease.end_date)
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
      return endDate <= thirtyDaysFromNow && endDate >= new Date()
    })

    if (expiringLeases.length > 0) {
      generatedAlerts.push({
        id: 'expiring-leases',
        type: 'warning',
        title: 'Lease Expiring',
        description: `${expiringLeases.length} lease(s) expiring in 30 days`,
      })
    }

    // Check for open maintenance requests
    const openTickets = requests.filter(req => req.status !== 'completed')

    if (openTickets.length > 0) {
      generatedAlerts.push({
        id: 'maintenance-backlog',
        type: 'warning',
        title: 'Maintenance Backlog',
        description: `${openTickets.length} open ticket(s) pending`,
      })
    }

    return generatedAlerts.filter(alert => !dismissedIds.includes(alert.id))
  }, [invoices, leases, requests, dismissedIds])

  const handleDismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id])
  }

  if (alerts.length === 0) {
    return null
  }

  return (
    <section aria-label="System Alerts" className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Alerts</h2>
      <div className="flex flex-wrap gap-2">
        {alerts.map((alert) => (
          <AlertBadge key={alert.id} {...alert} onDismiss={handleDismiss} />
        ))}
      </div>
    </section>
  )
}
