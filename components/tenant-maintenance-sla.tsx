"use client"

import { Clock, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface SLARequest {
  id: string
  title: string
  priority: "critical" | "high" | "medium" | "low"
  status: "in-progress" | "pending" | "completed"
  hoursElapsed: number
  slaHours: number
  requestDate: string
  expectedResolution: string
}

export function TenantMaintenanceSLA() {
  const slaRequests: SLARequest[] = [
    {
      id: "MR-001",
      title: "AC not cooling properly",
      priority: "critical",
      status: "in-progress",
      hoursElapsed: 24,
      slaHours: 48,
      requestDate: "Apr 25, 2024",
      expectedResolution: "Apr 27, 2024 10:00 AM",
    },
    {
      id: "MR-002",
      title: "Light fixture flickering",
      priority: "high",
      status: "in-progress",
      hoursElapsed: 8,
      slaHours: 24,
      requestDate: "Apr 27, 2024",
      expectedResolution: "Apr 28, 2024 2:00 PM",
    },
    {
      id: "MR-003",
      title: "Water leak in ceiling",
      priority: "medium",
      status: "pending",
      hoursElapsed: 2,
      slaHours: 72,
      requestDate: "Apr 28, 2024",
      expectedResolution: "May 1, 2024",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700"
      case "high":
        return "bg-orange-100 text-orange-700"
      case "medium":
        return "bg-amber-100 text-amber-700"
      case "low":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getSLAStatus = (elapsed: number, total: number) => {
    const percentage = (elapsed / total) * 100
    if (percentage >= 90) return "critical"
    if (percentage >= 70) return "warning"
    return "ok"
  }

  return (
    <div className="space-y-6">
      {/* SLA Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Service Level Agreement (SLA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-slate-900">Critical</h4>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Safety hazards (electrical, gas, flooding): <strong>24 hours</strong>
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <h4 className="font-semibold text-slate-900">High</h4>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Major systems affected (AC, heating): <strong>24-48 hours</strong>
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-slate-900">Medium</h4>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Comfort issues (lighting, fixtures): <strong>48-72 hours</strong>
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-slate-600" />
                <h4 className="font-semibold text-slate-900">Low</h4>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Minor issues (cosmetic): <strong>5-7 business days</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Requests with SLA Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active Requests & SLA Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {slaRequests.map((request) => {
            const percentage = (request.hoursElapsed / request.slaHours) * 100
            const slaStatus = getSLAStatus(request.hoursElapsed, request.slaHours)
            const progressColor =
              slaStatus === "critical"
                ? "bg-red-500"
                : slaStatus === "warning"
                  ? "bg-amber-500"
                  : "bg-emerald-500"

            return (
              <div
                key={request.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">
                        {request.title}
                      </h4>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      Request ID: {request.id} • Submitted: {request.requestDate}
                    </p>
                  </div>
                </div>

                {/* SLA Progress */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      {request.hoursElapsed} / {request.slaHours} hours
                    </span>
                    <span
                      className={`font-semibold ${
                        slaStatus === "critical"
                          ? "text-red-600"
                          : slaStatus === "warning"
                            ? "text-amber-600"
                            : "text-emerald-600"
                      }`}
                    >
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-slate-500">
                    Expected resolution: {request.expectedResolution}
                  </p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
