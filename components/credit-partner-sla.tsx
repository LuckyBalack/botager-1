"use client"

import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PartnerSLA {
  id: string
  partnerName: string
  uptimeSLA: number
  uptimeActual: number
  responseTimeSLA: number
  responseTimeActual: number
  disputeResolutionSLA: number
  disputeResolutionActual: number
  approvalRateSLA: number
  approvalRateActual: number
  status: "on-track" | "at-risk" | "breached"
}

export function CreditPartnerSLA() {
  const slaData: PartnerSLA[] = [
    {
      id: "1",
      partnerName: "Edenred",
      uptimeSLA: 99.5,
      uptimeActual: 99.8,
      responseTimeSLA: 2000,
      responseTimeActual: 1250,
      disputeResolutionSLA: 48,
      disputeResolutionActual: 36,
      approvalRateSLA: 75,
      approvalRateActual: 78,
      status: "on-track",
    },
    {
      id: "2",
      partnerName: "Africa Fintech",
      uptimeSLA: 99.0,
      uptimeActual: 98.2,
      responseTimeSLA: 2500,
      responseTimeActual: 3100,
      disputeResolutionSLA: 72,
      disputeResolutionActual: 68,
      approvalRateSLA: 70,
      approvalRateActual: 72,
      status: "at-risk",
    },
    {
      id: "3",
      partnerName: "Telebirr",
      uptimeSLA: 99.2,
      uptimeActual: 97.5,
      responseTimeSLA: 3000,
      responseTimeActual: 4200,
      disputeResolutionSLA: 96,
      disputeResolutionActual: 120,
      approvalRateSLA: 65,
      approvalRateActual: 62,
      status: "breached",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return { icon: "bg-emerald-100", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" }
      case "at-risk":
        return { icon: "bg-amber-100", text: "text-amber-700", badge: "bg-amber-100 text-amber-700" }
      case "breached":
        return { icon: "bg-red-100", text: "text-red-700", badge: "bg-red-100 text-red-700" }
      default:
        return { icon: "bg-slate-100", text: "text-slate-700", badge: "bg-slate-100 text-slate-700" }
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "on-track":
        return "On Track"
      case "at-risk":
        return "At Risk"
      case "breached":
        return "Breached"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SLA Tracking</CardTitle>
        <CardDescription>Service Level Agreement performance across partners</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {slaData.map((partner) => {
          const colors = getStatusColor(partner.status)
          const metricCount = [
            partner.uptimeActual >= partner.uptimeSLA ? 1 : 0,
            partner.responseTimeActual <= partner.responseTimeSLA ? 1 : 0,
            partner.disputeResolutionActual <= partner.disputeResolutionSLA ? 1 : 0,
            partner.approvalRateActual >= partner.approvalRateSLA ? 1 : 0,
          ].reduce((a, b) => a + b, 0)

          return (
            <div key={partner.id} className="space-y-3 border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">{partner.partnerName}</h3>
                <Badge className={colors.badge}>
                  {partner.status === "on-track" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                  {partner.status === "at-risk" && <Clock className="mr-1 h-3 w-3" />}
                  {partner.status === "breached" && <AlertTriangle className="mr-1 h-3 w-3" />}
                  {getStatusLabel(partner.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Uptime</span>
                    <span className={`font-medium ${partner.uptimeActual >= partner.uptimeSLA ? "text-emerald-600" : "text-red-600"}`}>
                      {partner.uptimeActual}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Target: {partner.uptimeSLA}%</p>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Response Time</span>
                    <span className={`font-medium ${partner.responseTimeActual <= partner.responseTimeSLA ? "text-emerald-600" : "text-red-600"}`}>
                      {partner.responseTimeActual}ms
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Target: {partner.responseTimeSLA}ms</p>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dispute Resolution</span>
                    <span className={`font-medium ${partner.disputeResolutionActual <= partner.disputeResolutionSLA ? "text-emerald-600" : "text-red-600"}`}>
                      {partner.disputeResolutionActual}h
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Target: {partner.disputeResolutionSLA}h</p>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Approval Rate</span>
                    <span className={`font-medium ${partner.approvalRateActual >= partner.approvalRateSLA ? "text-emerald-600" : "text-red-600"}`}>
                      {partner.approvalRateActual}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Target: {partner.approvalRateSLA}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{metricCount}/4</span>
                <Progress value={(metricCount / 4) * 100} className="h-1 flex-1" />
                <span>SLA metrics met</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
