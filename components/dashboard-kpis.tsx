"use client"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 1.2 },
  { month: "Feb", revenue: 1.4 },
  { month: "Mar", revenue: 1.3 },
  { month: "Apr", revenue: 1.6 },
  { month: "May", revenue: 1.8 },
  { month: "Jun", revenue: 1.8 },
]

const occupancyData = [
  { month: "Jan", occupancy: 75 },
  { month: "Feb", occupancy: 80 },
  { month: "Mar", occupancy: 85 },
  { month: "Apr", occupancy: 88 },
  { month: "May", occupancy: 90 },
  { month: "Jun", occupancy: 90 },
]

const rentData = [
  { month: "Jan", outstanding: 250 },
  { month: "Feb", outstanding: 200 },
  { month: "Mar", outstanding: 180 },
  { month: "Apr", outstanding: 150 },
  { month: "May", outstanding: 156 },
  { month: "Jun", outstanding: 156 },
]

const ticketsData = [
  { month: "Jan", tickets: 12 },
  { month: "Feb", tickets: 15 },
  { month: "Mar", tickets: 18 },
  { month: "Apr", tickets: 16 },
  { month: "May", tickets: 22 },
  { month: "Jun", tickets: 24 },
]

type KPIChartProps = {
  label: string
  value: string | number
  unit?: string
}

function RevenueChart({ label, value }: KPIChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">ETB {value}M</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px" }}
            formatter={(value) => `ETB ${value}M`}
          />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function OccupancyChart({ label, value }: KPIChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}%</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={occupancyData}>
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

function OutstandingRentChart({ label, value }: KPIChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">ETB {value}K</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={rentData}>
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

function MaintenanceTicketsChart({ label, value }: KPIChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={ticketsData}>
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

export function DashboardKPIs() {
  return (
    <section aria-label="Key Performance Indicators" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RevenueChart label="Monthly Revenue" value="1.8" />
        <OccupancyChart label="Occupancy Rate" value="90" />
        <OutstandingRentChart label="Outstanding Rent" value="156" />
        <MaintenanceTicketsChart label="Maintenance Tickets" value="24" />
      </div>
    </section>
  )
}
