"use client"

import { Calendar, Clock, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type ServiceRecord = {
  id: string
  ticketId: string
  unitNumber: string
  title: string
  description: string
  completedDate: string
  duration: string
  cost: string
  category: "Plumbing" | "Electrical" | "HVAC" | "General" | "Emergency"
  status: "Completed" | "Pending" | "Failed"
  vendor: string
}

const serviceHistory: ServiceRecord[] = [
  {
    id: "sh-1",
    ticketId: "M-542",
    unitNumber: "405",
    title: "Water Leak Repair",
    description: "Fixed water leak in bathroom fixture and replaced damaged tiles",
    completedDate: "Apr 27, 2024",
    duration: "2.5 hours",
    cost: "ETB 850",
    category: "Plumbing",
    status: "Completed",
    vendor: "Addis Plumbing Services",
  },
  {
    id: "sh-2",
    ticketId: "M-541",
    unitNumber: "310",
    title: "Light Bulb Replacement",
    description: "Replaced 3 faulty light bulbs with LED alternatives",
    completedDate: "Apr 25, 2024",
    duration: "0.5 hours",
    cost: "ETB 150",
    category: "Electrical",
    status: "Completed",
    vendor: "In-house maintenance",
  },
  {
    id: "sh-3",
    ticketId: "M-540",
    unitNumber: "212",
    title: "Air Filter Replacement",
    description: "Replaced HVAC air filter and cleaned ducts",
    completedDate: "Apr 22, 2024",
    duration: "1 hour",
    cost: "ETB 300",
    category: "HVAC",
    status: "Completed",
    vendor: "Cool Air Services",
  },
  {
    id: "sh-4",
    ticketId: "M-539",
    unitNumber: "510",
    title: "Emergency Lockout",
    description: "Tenant locked out - door lock bypass and repair",
    completedDate: "Apr 20, 2024",
    duration: "0.25 hours",
    cost: "ETB 500",
    category: "Emergency",
    status: "Completed",
    vendor: "Security & Locks Inc",
  },
]

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Plumbing: "bg-blue-100 text-blue-700",
    Electrical: "bg-yellow-100 text-yellow-700",
    HVAC: "bg-cyan-100 text-cyan-700",
    General: "bg-slate-100 text-slate-700",
    Emergency: "bg-red-100 text-red-700",
  }
  return colors[category] || "bg-slate-100 text-slate-700"
}

function getStatusIcon(status: string) {
  switch (status) {
    case "Completed":
      return <CheckCircle2 className="h-5 w-5 text-emerald-600" />
    case "Failed":
      return <AlertCircle className="h-5 w-5 text-red-600" />
    default:
      return <Clock className="h-5 w-5 text-amber-600" />
  }
}

export function MaintenanceServiceHistory() {
  return (
    <section className="space-y-4">
      <h3 className="font-semibold text-slate-900">Service History</h3>
      <div className="space-y-3">
        {serviceHistory.map((record) => (
          <div
            key={record.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getStatusIcon(record.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-slate-900">{record.title}</h4>
                  <Badge className={getCategoryColor(record.category)}>
                    {record.category}
                  </Badge>
                  <span className="text-xs text-slate-500">#{record.ticketId}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{record.description}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Unit</p>
                    <p className="font-medium text-slate-900">{record.unitNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Completed</p>
                    <p className="font-medium text-slate-900">{record.completedDate}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{record.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{record.cost}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Completed by: <span className="font-medium">{record.vendor}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
