"use client"

import { Clock, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type SLAMetric = {
  id: string
  priority: "High" | "Medium" | "Low"
  responseTime: string
  completionTime: string
  currentMetrics: {
    avgResponse: string
    avgCompletion: string
    compliance: number
  }
  status: "compliant" | "at-risk" | "non-compliant"
}

const slaMetrics: SLAMetric[] = [
  {
    id: "sla-1",
    priority: "High",
    responseTime: "4 hours",
    completionTime: "24 hours",
    currentMetrics: {
      avgResponse: "3 hours",
      avgCompletion: "18 hours",
      compliance: 98,
    },
    status: "compliant",
  },
  {
    id: "sla-2",
    priority: "Medium",
    responseTime: "8 hours",
    completionTime: "72 hours",
    currentMetrics: {
      avgResponse: "6 hours",
      avgCompletion: "60 hours",
      compliance: 96,
    },
    status: "compliant",
  },
  {
    id: "sla-3",
    priority: "Low",
    responseTime: "24 hours",
    completionTime: "7 days",
    currentMetrics: {
      avgResponse: "20 hours",
      avgCompletion: "5 days",
      compliance: 94,
    },
    status: "compliant",
  },
]

type OpenTicket = {
  id: string
  ticketId: string
  unitNumber: string
  priority: string
  title: string
  openedDate: string
  hoursOpen: number
  slaStatus: "on-time" | "at-risk" | "breached"
  daysUntilBreach?: number
}

const openTickets: OpenTicket[] = [
  {
    id: "t-1",
    ticketId: "M-545",
    unitNumber: "308",
    priority: "High",
    title: "No hot water in unit",
    openedDate: "Apr 28, 8:30 AM",
    hoursOpen: 2,
    slaStatus: "on-time",
    daysUntilBreach: 0,
  },
  {
    id: "t-2",
    ticketId: "M-544",
    unitNumber: "406",
    priority: "Medium",
    title: "Broken door hinge",
    openedDate: "Apr 27, 2:00 PM",
    hoursOpen: 30,
    slaStatus: "on-time",
    daysUntilBreach: 2,
  },
  {
    id: "t-3",
    ticketId: "M-543",
    unitNumber: "502",
    priority: "Low",
    title: "Paint touch-up needed",
    openedDate: "Apr 25, 10:00 AM",
    hoursOpen: 70,
    slaStatus: "at-risk",
    daysUntilBreach: 1,
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "compliant":
      return "bg-emerald-100 text-emerald-700"
    case "at-risk":
      return "bg-amber-100 text-amber-700"
    case "non-compliant":
      return "bg-red-100 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

function getSLAStatusIcon(status: string) {
  switch (status) {
    case "on-time":
      return <CheckCircle2 className="h-5 w-5 text-emerald-600" />
    case "at-risk":
      return <AlertTriangle className="h-5 w-5 text-amber-600" />
    case "breached":
      return <AlertCircle className="h-5 w-5 text-red-600" />
  }
}

export function MaintenanceSLA() {
  return (
    <section className="space-y-6">
      <h3 className="font-semibold text-slate-900">SLA Tracking</h3>

      {/* SLA Metrics */}
      <div>
        <h4 className="mb-3 font-medium text-slate-700">Service Level Agreements</h4>
        <div className="space-y-3">
          {slaMetrics.map((metric) => (
            <div
              key={metric.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">
                    {metric.priority} Priority
                  </span>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === "compliant"
                      ? "Compliant"
                      : metric.status === "at-risk"
                        ? "At Risk"
                        : "Non-compliant"}
                  </Badge>
                </div>
                <span className="text-2xl font-bold text-emerald-600">
                  {metric.currentMetrics.compliance}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Response Time</p>
                  <p className="font-medium text-slate-900">
                    Target: {metric.responseTime}
                  </p>
                  <p className="text-xs text-slate-600">
                    Avg: {metric.currentMetrics.avgResponse}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Completion Time</p>
                  <p className="font-medium text-slate-900">
                    Target: {metric.completionTime}
                  </p>
                  <p className="text-xs text-slate-600">
                    Avg: {metric.currentMetrics.avgCompletion}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${metric.currentMetrics.compliance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Tickets Status */}
      <div>
        <h4 className="mb-3 font-medium text-slate-700">Open Tickets</h4>
        <div className="space-y-3">
          {openTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getSLAStatusIcon(ticket.slaStatus)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      #{ticket.ticketId} - Room {ticket.unitNumber}
                    </span>
                    <Badge
                      className={
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : ticket.priority === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{ticket.title}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span>Opened: {ticket.openedDate}</span>
                    <span>•</span>
                    <span className="font-medium">{ticket.hoursOpen} hours open</span>
                  </div>
                  {ticket.daysUntilBreach !== undefined && ticket.daysUntilBreach >= 0 && (
                    <div className="mt-2 text-xs font-medium text-amber-700">
                      ⚠️ {ticket.daysUntilBreach} days until SLA breach
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">SLA Alert:</span> Set up automated escalations when
          tickets approach SLA breach times. High-priority tickets that breach SLA are
          automatically escalated to management.
        </p>
      </div>
    </section>
  )
}
