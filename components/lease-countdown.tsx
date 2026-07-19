"use client"

import { Calendar, AlertTriangle, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function LeaseCountdown() {
  // Mock lease data
  const leaseData = {
    startDate: "Mar 25, 2023",
    endDate: "Mar 25, 2025",
    daysRemaining: 244,
    totalDays: 730,
    renewalNoticeDeadline: "Dec 25, 2024",
    daysUntilRenewalDeadline: 229,
  }

  const leaseProgress = ((730 - leaseData.daysRemaining) / 730) * 100

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
          Lease Status & Renewal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lease Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Lease Progress
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(leaseProgress)}%
            </span>
          </div>
          <Progress value={leaseProgress} className="h-3" />
          <p className="mt-2 text-xs text-slate-500">
            {leaseData.daysRemaining} days remaining until {leaseData.endDate}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-4 border-t border-slate-200 pt-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <span className="text-xs font-bold text-emerald-600">✓</span>
              </div>
              <div className="mt-1 h-8 w-0.5 bg-slate-200" />
            </div>
            <div className="pb-4">
              <p className="font-medium text-slate-900">Lease Started</p>
              <p className="text-sm text-slate-500">{leaseData.startDate}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="mt-1 h-8 w-0.5 bg-slate-200" />
            </div>
            <div className="pb-4">
              <p className="font-medium text-slate-900">Renewal Notice Deadline</p>
              <p className="text-sm text-slate-500">
                {leaseData.renewalNoticeDeadline}
              </p>
              <p className="mt-1 text-xs text-amber-600">
                {leaseData.daysUntilRenewalDeadline} days away
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                <Calendar className="h-4 w-4 text-slate-600" />
              </div>
            </div>
            <div>
              <p className="font-medium text-slate-900">Lease Expires</p>
              <p className="text-sm text-slate-500">{leaseData.endDate}</p>
              <p className="mt-1 text-xs text-slate-500">
                {leaseData.daysRemaining} days away
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="border-t border-slate-200 pt-4">
          <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4" />
            Request Lease Renewal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
