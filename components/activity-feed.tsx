"use client"

import { Users, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"

type Activity = {
  id: string
  type: "tenant" | "invoice" | "maintenance" | "lease" | "payment"
  title: string
  description: string
  timestamp: string
  icon: React.ComponentType<{ className?: string }>
}

const activities: Activity[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Received",
    description: "Room 310 - Alemu Getachew paid ETB 3,500",
    timestamp: "2 hours ago",
    icon: CheckCircle,
  },
  {
    id: "2",
    type: "invoice",
    title: "Invoice Created",
    description: "Monthly rent invoice #INV-2024-001 generated",
    timestamp: "4 hours ago",
    icon: FileText,
  },
  {
    id: "3",
    type: "tenant",
    title: "New Tenant Added",
    description: "Gete Alemayehu assigned to Room 212",
    timestamp: "1 day ago",
    icon: Users,
  },
  {
    id: "4",
    type: "maintenance",
    title: "Maintenance Completed",
    description: "Ticket #M-542 - Water leak repair (Room 405)",
    timestamp: "2 days ago",
    icon: CheckCircle,
  },
  {
    id: "5",
    type: "lease",
    title: "Lease Expiring",
    description: "Room 510 - Alemayehu Goshu lease expires in 15 days",
    timestamp: "3 days ago",
    icon: AlertCircle,
  },
]

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

export function ActivityFeed() {
  return (
    <section aria-label="Activity Feed" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
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
    </section>
  )
}
