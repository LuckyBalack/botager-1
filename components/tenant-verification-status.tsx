"use client"

import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  FileCheck,
  User,
  DollarSign,
  Building2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface VerificationCheck {
  id: string
  name: string
  icon: React.ReactNode
  status: "verified" | "pending" | "failed"
  completedDate?: string
  details?: string
}

export function TenantVerificationStatus() {
  const checks: VerificationCheck[] = [
    {
      id: "1",
      name: "Identity Verification",
      icon: <User className="h-5 w-5" />,
      status: "verified",
      completedDate: "Jan 15, 2024",
      details: "National ID verified",
    },
    {
      id: "2",
      name: "Background Check",
      icon: <Shield className="h-5 w-5" />,
      status: "verified",
      completedDate: "Jan 15, 2024",
      details: "No records found",
    },
    {
      id: "3",
      name: "Income Verification",
      icon: <DollarSign className="h-5 w-5" />,
      status: "verified",
      completedDate: "Jan 16, 2024",
      details: "Employment letter verified",
    },
    {
      id: "4",
      name: "Credit Check",
      icon: <FileCheck className="h-5 w-5" />,
      status: "verified",
      completedDate: "Jan 16, 2024",
      details: "Credit score: 750 (Good)",
    },
    {
      id: "5",
      name: "Rent History",
      icon: <Building2 className="h-5 w-5" />,
      status: "pending",
      details: "Awaiting landlord response",
    },
  ]

  const verifiedCount = checks.filter((c) => c.status === "verified").length
  const verificationProgress = (verifiedCount / checks.length) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-amber-100 text-amber-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-5 w-5" />
      case "pending":
        return <Clock className="h-5 w-5" />
      case "failed":
        return <AlertCircle className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-slate-600" />
          Verification Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Overall Verification Progress
            </span>
            <span className="text-sm text-slate-600">
              {verifiedCount} of {checks.length} completed
            </span>
          </div>
          <Progress value={verificationProgress} className="h-3" />
        </div>

        {/* Checks List */}
        <div className="space-y-3">
          {checks.map((check) => (
            <div
              key={check.id}
              className="flex items-start gap-4 rounded-lg border border-slate-200 p-4"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${getStatusColor(check.status)}`}
              >
                {check.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900">{check.name}</h4>
                  <Badge
                    className={`border-none ${getStatusColor(check.status)}`}
                  >
                    {check.status === "verified"
                      ? "Verified"
                      : check.status === "pending"
                        ? "Pending"
                        : "Failed"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{check.details}</p>
                {check.completedDate && (
                  <p className="mt-1 text-xs text-slate-500">
                    {check.completedDate}
                  </p>
                )}
              </div>
              <div className="text-slate-400">
                {getStatusIcon(check.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
