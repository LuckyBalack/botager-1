"use client"

import {
  Building2,
  Calendar,
  FileText,
  CheckCircle2,
  Receipt,
  Wrench,
  MessageSquare,
  ChevronRight,
  AlertCircle,
  Clock,
  Phone,
  MapPin,
  Wifi,
  Car,
  Shield,
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
            onClick={() => onNavigate?.("invoices")}
            className="rounded-lg bg-orange-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          >
            Pay Now
          </button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => onNavigate?.("invoices")}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <Receipt className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">View Invoices</h3>
              <p className="text-sm text-slate-500">Check your billing history</p>
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
              <h3 className="font-semibold text-slate-900">Request Maintenance</h3>
              <p className="text-sm text-slate-500">Report an issue</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("messages")}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <MessageSquare className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Message Manager</h3>
              <p className="text-sm text-slate-500">Contact property manager</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Active Maintenance Alert */}
      {activeMaintenance && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{activeMaintenance.title}</h3>
                  <Badge className="border-none bg-blue-100 text-blue-700">
                    <Clock className="mr-1 h-3 w-3" />
                    In Progress
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">{activeMaintenance.lastUpdate}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.("maintenance")}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* My Office Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5 text-slate-500" />
              My Office
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Room Number</span>
                <span className="font-semibold text-slate-900">Room 310</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Floor</span>
                <span className="font-semibold text-slate-900">3rd Floor</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Monthly Rent</span>
                <span className="font-semibold text-slate-900">ETB 15,000</span>
              </div>

              {/* Lease Progress */}
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Lease Progress</span>
                  <span className="text-sm text-slate-500">6 of 12 months</span>
                </div>
                <Progress value={leaseProgress} className="h-2" />
                <p className="mt-2 text-xs text-slate-500">Expires: Mar 25, 2025</p>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Wifi className="h-3 w-3" /> WiFi
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Car className="h-3 w-3" /> Parking
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Shield className="h-3 w-3" /> 24/7 Security
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-slate-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative flex flex-col gap-1">
              {recentActivity.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="flex items-start gap-4 py-3">
                    {/* Timeline line */}
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${item.iconColor}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {index < recentActivity.length - 1 && (
                        <div className="absolute top-8 h-full w-px bg-slate-200" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col">
                      <span className="font-medium text-slate-900">
                        {item.event}
                      </span>
                      <span className="text-sm text-slate-500">{item.date}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Manager Contact */}
      <Card>
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Building2 className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Abuki Building Management</h3>
              <div className="mt-1 flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  +251 911 23 45 67
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Bole, Addis Ababa
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => onNavigate?.("messages")}
          >
            <MessageSquare className="h-4 w-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
