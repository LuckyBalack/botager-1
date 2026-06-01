"use client"

import { AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { useState } from "react"

type AlertType = "critical" | "warning" | "info"

type AlertItem = {
  id: string
  type: AlertType
  title: string
  description: string
}

const initialAlerts: AlertItem[] = [
  {
    id: "1",
    type: "critical",
    title: "Payment Overdue",
    description: "Room 310: 15 days overdue (ETB 3,500)",
  },
  {
    id: "2",
    type: "warning",
    title: "Lease Expiring",
    description: "3 leases expiring in 30 days",
  },
  {
    id: "3",
    type: "warning",
    title: "Maintenance Backlog",
    description: "8 open tickets pending",
  },
  {
    id: "4",
    type: "info",
    title: "System Update",
    description: "New inspection features available",
  },
]

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

export function DashboardAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
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
