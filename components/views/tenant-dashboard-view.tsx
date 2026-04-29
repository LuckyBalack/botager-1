"use client"

import { Building2, Calendar, FileText, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recentActivity = [
  {
    id: 1,
    event: "Rent paid",
    date: "Apr 5, 2024",
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
  },
  {
    id: 2,
    event: "Invoice generated",
    date: "Apr 1, 2024",
    icon: FileText,
    iconColor: "text-slate-600",
  },
  {
    id: 3,
    event: "Lease renewed",
    date: "Mar 25, 2024",
    icon: Calendar,
    iconColor: "text-blue-600",
  },
]

export function TenantDashboardView() {
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
            className="rounded-lg bg-orange-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          >
            Pay Now
          </button>
        </CardContent>
      </Card>

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
                <span className="text-sm text-slate-500">Lease Expiration</span>
                <span className="font-semibold text-slate-900">
                  Mar 25, 2025
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Monthly Rent</span>
                <span className="font-semibold text-slate-900">ETB 15,000</span>
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
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ${item.iconColor}`}
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
    </div>
  )
}
