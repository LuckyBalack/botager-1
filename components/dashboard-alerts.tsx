"use client"

import { AlertCircle, AlertTriangle, Info, Clock, X } from "lucide-react"
import { useState } from "react"

type AlertType = "critical" | "warning" | "info"

type AlertItem = {
  id: string
  type: AlertType
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

const initialAlerts: AlertItem[] = [
  {
    id: "1",
    type: "critical",
    title: "Payment Overdue",
    description: "Room 310: Alemu Getachew - 15 days overdue (ETB 3,500)",
    action: {
      label: "Send Reminder",
      onClick: () => {},
    },
  },
  {
    id: "2",
    type: "warning",
    title: "Lease Expiring Soon",
    description: "3 leases expiring within the next 30 days",
    action: {
      label: "View Leases",
      onClick: () => {},
    },
  },
  {
    id: "3",
    type: "warning",
    title: "Maintenance Backlog",
    description: "8 open tickets pending maintenance completion",
    action: {
      label: "View Tickets",
      onClick: () => {},
    },
  },
  {
    id: "4",
    type: "info",
    title: "System Update",
    description: "New features available for inspections module",
    action: {
      label: "Learn More",
      onClick: () => {},
    },
  },
]

function AlertIcon({ type }: { type: AlertType }) {
  switch (type) {
    case "critical":
      return <AlertCircle className="h-5 w-5 text-red-600" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-600" />
    case "info":
      return <Info className="h-5 w-5 text-blue-600" />
  }
}

function AlertBg({ type }: { type: AlertType }) {
  switch (type) {
    case "critical":
      return "bg-red-50 border-red-200"
    case "warning":
      return "bg-amber-50 border-amber-200"
    case "info":
      return "bg-blue-50 border-blue-200"
  }
}

type AlertProps = AlertItem & {
  onDismiss: (id: string) => void
}

function Alert({ id, type, title, description, action, onDismiss }: AlertProps) {
  return (
    <div className={`rounded-lg border p-4 ${AlertBg({ type })}`}>
      <div className="flex gap-4">
        <AlertIcon type={type} />
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="mt-3 inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(id)}
          className="text-slate-400 hover:text-slate-600"
          aria-label="Dismiss alert"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
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
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.id} {...alert} onDismiss={handleDismiss} />
        ))}
      </div>
    </section>
  )
}
