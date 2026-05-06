"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

type KPICardProps = {
  label: string
  value: string | number
  change: number
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

function KPICard({ label, value, change, trend, icon: Icon }: KPICardProps) {
  const isPositive = trend === "up"
  const trendColor = isPositive ? "text-emerald-600" : "text-red-600"
  const bgColor = isPositive ? "bg-emerald-50" : "bg-red-50"
  
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{value}</p>
          <div className="mt-3 flex items-center gap-1.5">
            <div className={`flex items-center gap-1 rounded-full ${bgColor} px-2 py-1`}>
              {trend === "up" ? (
                <TrendingUp className={`h-3 w-3 sm:h-4 sm:w-4 ${trendColor}`} />
              ) : (
                <TrendingDown className={`h-3 w-3 sm:h-4 sm:w-4 ${trendColor}`} />
              )}
              <span className={`text-xs font-semibold sm:text-sm ${trendColor}`}>
                {change}%
              </span>
            </div>
            <span className="text-xs text-slate-500 sm:text-sm">vs last month</span>
          </div>
        </div>
        <Icon className="h-8 w-8 text-slate-400 sm:h-10 sm:w-10" strokeWidth={1.5} />
      </div>
    </div>
  )
}

export function DashboardKPIs() {
  return (
    <section aria-label="Key Performance Indicators" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Monthly Revenue"
          value="ETB 1.8M"
          change={12}
          trend="up"
          icon={({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
        <KPICard
          label="Occupancy Rate"
          value="90%"
          change={5}
          trend="up"
          icon={({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m5.581 0a2 2 0 100-4H9m0 0a2 2 0 100 4m0 0b" />
            </svg>
          )}
        />
        <KPICard
          label="Outstanding Rent"
          value="ETB 156K"
          change={3}
          trend="down"
          icon={({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
        <KPICard
          label="Maintenance Tickets"
          value="24"
          change={8}
          trend="up"
          icon={({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        />
      </div>
    </section>
  )
}
