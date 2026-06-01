"use client"

import { Calendar, FileText, DollarSign, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function LeaseSummary() {
  const leaseData = {
    leaseNumber: "LS-2023-00112",
    leaseStatus: "Active",
    startDate: "Mar 25, 2023",
    endDate: "Mar 25, 2025",
    duration: "24 months",
    rentAmount: 15000,
    securityDeposit: 45000,
    renewalOption: true,
    renewalNoticeDeadline: "Dec 25, 2024",
    lastRenewalDate: null,
    nextRenevalDate: "2025",
    dayRemaining: 244,
  }

  const leaseProgress = ((730 - leaseData.dayRemaining) / 730) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-600" />
          Lease Agreement Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Lease Number</p>
            <p className="mt-1 font-mono font-semibold text-slate-900">
              {leaseData.leaseNumber}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Status</p>
            <div className="mt-1 flex items-center gap-2">
              <Badge className="border-none bg-emerald-100 text-emerald-700">
                {leaseData.leaseStatus}
              </Badge>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Monthly Rent</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              ETB {leaseData.rentAmount.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Security Deposit</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              ETB {leaseData.securityDeposit.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Lease Duration */}
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Lease Duration
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {leaseData.startDate} to {leaseData.endDate}
              </p>
            </div>
            <Badge variant="secondary">{leaseData.duration}</Badge>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                Progress
              </span>
              <span className="text-xs text-slate-600">
                {Math.round(leaseProgress)}%
              </span>
            </div>
            <Progress value={leaseProgress} className="h-2" />
          </div>
        </div>

        {/* Renewal Option */}
        {leaseData.renewalOption && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900">
                  Renewal Notice Deadline
                </h4>
                <p className="mt-1 text-sm text-amber-800">
                  {leaseData.renewalNoticeDeadline}
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  {leaseData.dayRemaining < 180
                    ? "Notice deadline is approaching"
                    : "Consider renewal options"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="border-t border-slate-200 pt-4">
          <h4 className="mb-3 font-semibold text-slate-900">
            Standard Terms
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>
              <span>Automatic rent escalation: 5% annually</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>
              <span>Maintenance responsibilities clearly defined</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>
              <span>Early termination penalty: 2 months rent</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>
              <span>Security deposit refundable at lease end</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4" />
            View Full Agreement
          </Button>
          <Button
            variant="outline"
            className="flex-1"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Request Amendment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
