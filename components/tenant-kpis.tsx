"use client"

import {
  TrendingDown,
  TrendingUp,
  Calendar,
  AlertCircle,
  DollarSign,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TenantKPI {
  title: string
  value: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  status?: "success" | "warning" | "danger"
}

export function TenantKPIs() {
  const kpis: TenantKPI[] = [
    {
      title: "Outstanding Balance",
      value: "ETB 0",
      icon: <DollarSign className="h-5 w-5" />,
      status: "success",
    },
    {
      title: "Days Until Lease Expiry",
      value: "244 days",
      icon: <Calendar className="h-5 w-5" />,
      trend: { value: 1, isPositive: true },
    },
    {
      title: "Payment History",
      value: "6/6 On-time",
      icon: <TrendingUp className="h-5 w-5" />,
      status: "success",
    },
    {
      title: "Next Payment Due",
      value: "May 5, 2024",
      icon: <AlertCircle className="h-5 w-5" />,
      status: "warning",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <Card
          key={index}
          className={`${
            kpi.status === "success"
              ? "border-emerald-200 bg-emerald-50"
              : kpi.status === "warning"
                ? "border-amber-200 bg-amber-50"
                : "border-slate-200 bg-white"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600">{kpi.title}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {kpi.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  kpi.status === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : kpi.status === "warning"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {kpi.icon}
              </div>
            </div>
            {kpi.trend && (
              <div className="mt-3 flex items-center gap-1 text-sm">
                {kpi.trend.isPositive ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-600">+{kpi.trend.value}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">-{kpi.trend.value}%</span>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
