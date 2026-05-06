"use client"

import { AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface LateFeePolicy {
  daysPastDue: number
  feePercentage: number
  flatFee: number
  description: string
}

export function InvoiceLateFees() {
  const lateFeePolicy: LateFeePolicy[] = [
    {
      daysPastDue: 1,
      feePercentage: 2,
      flatFee: 500,
      description: "1-15 days past due",
    },
    {
      daysPastDue: 16,
      feePercentage: 3,
      flatFee: 1000,
      description: "16-30 days past due",
    },
    {
      daysPastDue: 31,
      feePercentage: 5,
      flatFee: 2000,
      description: "31+ days past due",
    },
  ]

  const currentStatus = {
    daysOverdue: 0,
    totalDue: 15000,
    lateFee: 0,
    totalWithLateFee: 15000,
    status: "on-time" as const,
  }

  return (
    <div className="space-y-6">
      {/* Current Late Fee Status */}
      <Card
        className={
          currentStatus.status === "on-time"
            ? "border-emerald-200 bg-emerald-50"
            : "border-red-200 bg-red-50"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle
              className={`h-5 w-5 ${
                currentStatus.status === "on-time"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            />
            Late Fee Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-600">Days Overdue</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {currentStatus.daysOverdue}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Amount Due</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                ETB {currentStatus.totalDue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Late Fee</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                ETB {currentStatus.lateFee.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total with Late Fee</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                ETB {currentStatus.totalWithLateFee.toLocaleString()}
              </p>
            </div>
          </div>

          {currentStatus.status === "on-time" && (
            <div className="mt-4 rounded-lg bg-white/50 p-3">
              <p className="text-sm font-medium text-emerald-700">
                ✓ All payments are current. No late fees apply.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Late Fee Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Late Fee Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lateFeePolicy.map((policy, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-slate-200 p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900">
                    {policy.description}
                  </h4>
                  <Badge variant="secondary" className="text-xs">
                    {policy.daysPastDue}+ days
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {policy.feePercentage}% of invoice amount or ETB{" "}
                  {policy.flatFee.toLocaleString()}, whichever is higher
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {policy.feePercentage}%
                </p>
                <p className="text-xs text-slate-500">or min ETB {policy.flatFee}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Late Fee Information</AlertTitle>
        <AlertDescription className="text-blue-800">
          Late fees are waived if payment is made within 3 business days of the
          due date. Contact the property manager for payment arrangements if
          experiencing difficulty.
        </AlertDescription>
      </Alert>
    </div>
  )
}
