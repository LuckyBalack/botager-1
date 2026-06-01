"use client"

import {
  Building2,
  Calendar,
  FileText,
  CheckCircle2,
  Download,
  Wrench,
  Send,
  ChevronRight,
  Clock,
  Phone,
  MapPin,
  Wifi,
  Car,
  Shield,
  MessageCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type TenantViewKey } from "@/components/tenant-sidebar"

const recentActivity = [
  {
    id: 1,
    event: "Rent paid",
    date: "Apr 5, 2024",
    icon: CheckCircle2,
    iconColor: "text-emerald-600 bg-emerald-100",
  },
  {
    id: 2,
    event: "Invoice generated",
    date: "Apr 1, 2024",
    icon: FileText,
    iconColor: "text-slate-600 bg-slate-100",
  },
  {
    id: 3,
    event: "Lease renewed",
    date: "Mar 25, 2024",
    icon: Calendar,
    iconColor: "text-blue-600 bg-blue-100",
  },
]

// Mock active maintenance request
const activeMaintenance = {
  id: "MR-001",
  title: "AC not cooling properly",
  status: "in-progress" as const,
  lastUpdate: "Technician scheduled for tomorrow",
}

// Mock upcoming reminder
const upcomingReminder = {
  type: "rent",
  message: "Next rent payment due in 5 days",
  dueDate: "May 5, 2024",
  amount: "ETB 15,000",
}

type TenantDashboardViewProps = {
  onNavigate?: (view: TenantViewKey) => void
}

export function TenantDashboardView({ onNavigate }: TenantDashboardViewProps) {
  // Calculate lease progress (mock data - 6 months into 12 month lease)
  const leaseProgress = 50

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, Alemu!
        </h1>
        <p className="mt-1 text-slate-500">
          Here&apos;s an overview of your tenancy
        </p>
      </div>

      {/* Amount Due Card */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardContent className="flex flex-col items-center gap-6 py-10">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Amount Due
            </p>
            <p className="mt-2 text-5xl font-bold text-slate-900">
              ETB 15,000
            </p>
            <p className="mt-2 text-sm text-slate-500">Due on May 5, 2024</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.("payment-history")}
            className="rounded-lg bg-orange-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          >
            Pay Rent
          </button>
        </CardContent>
      </Card>

      {/* Lease Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" />
            Lease Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-500">Room Number</span>
              <p className="font-semibold text-slate-900">Room 310</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-500">Floor</span>
              <p className="font-semibold text-slate-900">3rd Floor</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-500">Base Rent (ETB)</span>
              <p className="font-semibold text-slate-900">ETB 15,000</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-500">Lease Status</span>
              <p className="font-semibold text-emerald-700">Active</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="mb-3 text-sm text-slate-600">
              <p>Lease Start: Sene 30, 2018 E.C. (May 7, 2024)</p>
              <p>Lease End: Sene 30, 2019 E.C. (May 7, 2025)</p>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              <Download className="h-4 w-4" />
              Download Lease PDF
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => onNavigate?.("payment-history")}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <Download className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Payment History</h3>
              <p className="text-sm text-slate-500">View and download receipts</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("maintenance")}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Report Issue</h3>
              <p className="text-sm text-slate-500">Request maintenance</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Contact Manager Section */}
      <Card className="border-2 border-slate-200">
        <CardContent className="flex flex-col gap-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Building2 className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Need help?</h3>
              <p className="text-sm text-slate-500">Contact your building manager</p>
            </div>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition-all hover:bg-slate-800"
          >
            <MessageCircle className="h-5 w-5" />
            Contact Manager on Telegram
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
