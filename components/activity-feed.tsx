"use client"

import { Users, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { usePayments, useInvoices, useTenants, useMaintenanceRequests, useLeases } from "@/hooks/use-database"

type Activity = {
  id: string
  type: "tenant" | "invoice" | "maintenance" | "lease" | "payment"
  title: string
  description: string
  timestamp: string
  icon: React.ComponentType<{ className?: string }>
}

type ActivityFeedProps = {
  buildingId: string | null
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

function getIconColor(type: string) {
  switch (type) {
    case "payment":
      return "text-emerald-600 bg-emerald-50"
    case "invoice":
      return "text-blue-600 bg-blue-50"
    case "tenant":
      return "text-purple-600 bg-purple-50"
    case "maintenance":
      return "text-amber-600 bg-amber-50"
    case "lease":
      return "text-red-600 bg-red-50"
    default:
      return "text-slate-600 bg-slate-50"
  }
}

export function ActivityFeed({ buildingId }: ActivityFeedProps) {
  const { payments = [] } = usePayments(buildingId)
  const { invoices = [] } = useInvoices(buildingId)
  const { tenants = [] } = useTenants(buildingId)
  const { requests = [] } = useMaintenanceRequests(buildingId)
  const { leases = [] } = useLeases(buildingId)

  // Generate activities from real data
  const activities = useMemo(() => {
    const generatedActivities: Activity[] = []

    // Recent payments
    payments.slice(0, 2).forEach(payment => {
      generatedActivities.push({
        id: `payment-${payment.id}`,
        type: "payment",
        title: "Payment Received",
        description: `Payment of ETB ${payment.amount?.toLocaleString()} received`,
        timestamp: formatRelativeTime(new Date(payment.payment_date)),
        icon: CheckCircle,
      })
    })

    // Recent invoices
    invoices.slice(0, 2).forEach(invoice => {
      generatedActivities.push({
        id: `invoice-${invoice.id}`,
        type: "invoice",
        title: "Invoice Created",
        description: `Invoice ${invoice.invoice_number} for ETB ${invoice.amount?.toLocaleString()} generated`,
        timestamp: formatRelativeTime(new Date(invoice.issue_date)),
        icon: FileText,
      })
    })

    // Recent tenants
    tenants.slice(0, 2).forEach(tenant => {
      generatedActivities.push({
        id: `tenant-${tenant.id}`,
        type: "tenant",
        title: "New Tenant Added",
        description: `${tenant.full_name} assigned to Room ${tenant.room_number}`,
        timestamp: formatRelativeTime(new Date(tenant.created_at)),
        icon: Users,
      })
    })

    // Completed maintenance
    requests.filter(r => r.status === 'completed').slice(0, 2).forEach(request => {
      generatedActivities.push({
        id: `maintenance-${request.id}`,
        type: "maintenance",
        title: "Maintenance Completed",
        description: `Ticket #${request.id.slice(0, 6)} - ${request.description} completed`,
        timestamp: formatRelativeTime(new Date(request.updated_at || request.created_at)),
        icon: CheckCircle,
      })
    })

    // Expiring leases
    leases.filter(l => {
      const endDate = new Date(l.end_date)
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
      return endDate <= thirtyDaysFromNow && endDate >= new Date()
    }).slice(0, 2).forEach(lease => {
      generatedActivities.push({
        id: `lease-${lease.id}`,
        type: "lease",
        title: "Lease Expiring",
        description: `Lease expires in ${Math.ceil((new Date(lease.end_date).getTime() - new Date().getTime()) / 86400000)} days`,
        timestamp: formatRelativeTime(new Date(lease.end_date)),
        icon: AlertCircle,
      })
    })

    // Sort by timestamp (most recent first) and limit to 5
    return generatedActivities
      .sort((a, b) => {
        const timeA = parseTime(a.timestamp)
        const timeB = parseTime(b.timestamp)
        return timeB - timeA
      })
      .slice(0, 5)
  }, [payments, invoices, tenants, requests, leases])

  return (
    <section aria-label="Activity Feed" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
      {activities.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-500">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            const colorClasses = getIconColor(activity.type)
            return (
              <div key={activity.id} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
                <div className={`rounded-lg p-2.5 flex-shrink-0 ${colorClasses}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900">{activity.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

// Helper function to parse time strings for sorting
function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d+)([mhd])\s+ago/)
  if (!match) return 0
  
  const value = parseInt(match[1])
  const unit = match[2]
  
  switch (unit) {
    case 'm': return value * 60000
    case 'h': return value * 3600000
    case 'd': return value * 86400000
    default: return 0
  }
}
