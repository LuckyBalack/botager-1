"use client"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useProperties, useInvoices, useMaintenanceRequests } from "@/hooks/use-database"
import { useMemo } from "react"

type DashboardKPIsProps = {
  buildingId: string | null
}

// Helper to generate last 6 months data
function getLast6Months() {
  const months = []
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      monthYear: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    })
  }
  return months
}

type KPIChartProps = {
  label: string
  value: string | number
  unit?: string
  data?: any[]
}

function RevenueChart({ label, value, data }: KPIChartProps) {
  const chartData = data || []
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold text-foreground">ETB {value}M</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
            formatter={(value) => `ETB ${value}M`}
          />
          <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-1))", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function OccupancyChart({ label, value, data }: KPIChartProps) {
  const chartData = data || []
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}%</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px" }}
            formatter={(value) => `${value}%`}
          />
          <Bar dataKey="occupancy" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function OutstandingRentChart({ label, value, data }: KPIChartProps) {
  const chartData = data || []
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">ETB {value}K</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px" }}
            formatter={(value) => `ETB ${value}K`}
          />
          <Line type="monotone" dataKey="outstanding" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function MaintenanceTicketsChart({ label, value, data }: KPIChartProps) {
  const chartData = data || []
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px" }}
            formatter={(value) => `${value} tickets`}
          />
          <Bar dataKey="tickets" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DashboardKPIs({ buildingId }: DashboardKPIsProps) {
  const { properties = [] } = useProperties(buildingId)
  const { invoices = [] } = useInvoices(buildingId)
  const { requests = [] } = useMaintenanceRequests(buildingId)

  // Calculate metrics
  const metrics = useMemo(() => {
    const occupied = properties.filter(p => p.occupancy === 'occupied').length
    const total = properties.length
    const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0
    
    const totalMonthlyRent = properties
      .filter(p => p.occupancy === 'occupied')
      .reduce((sum, p) => sum + (p.monthly_rent || 0), 0)
    
    const revenueInMillions = (totalMonthlyRent / 1000000).toFixed(1)
    
    const outstandingRent = invoices
      .filter(inv => inv.payment_status !== 'paid')
      .reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const outstandingInThousands = Math.round(outstandingRent / 1000)
    
    return {
      revenue: revenueInMillions,
      occupancy: occupancyRate,
      outstanding: outstandingInThousands,
      tickets: requests.length || 0
    }
  }, [properties, invoices, requests])

  // Generate revenue data (calculate from invoices by month)
  const months = getLast6Months()
  const revenueData = months.map(m => {
    const monthInvoices = invoices.filter(inv => {
      if (!inv.issue_date) return false
      const invDate = inv.issue_date.substring(0, 7)
      return invDate === m.monthYear
    })
    const totalAmount = monthInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const revenue = (totalAmount / 1000000).toFixed(1)
    return { month: m.month, revenue: parseFloat(revenue) || 0 }
  })

  const occupancyData = months.map(m => {
    return { month: m.month, occupancy: metrics.occupancy }
  })

  const rentData = months.map(m => {
    return { month: m.month, outstanding: metrics.outstanding }
  })

  const ticketsData = months.map(m => {
    return { month: m.month, tickets: Math.max(1, Math.floor(metrics.tickets / 2) + Math.random() * 10) }
  })

  return (
    <section aria-label="Key Performance Indicators" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RevenueChart label="Monthly Revenue" value={metrics.revenue} data={revenueData} />
        <OccupancyChart label="Occupancy Rate" value={metrics.occupancy} data={occupancyData} />
        <OutstandingRentChart label="Outstanding Rent" value={metrics.outstanding} data={rentData} />
        <MaintenanceTicketsChart label="Maintenance Tickets" value={metrics.tickets} data={ticketsData} />
      </div>
    </section>
  )
}
