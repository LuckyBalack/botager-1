"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Search, Zap } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data
const userGrowthData = [
  { month: "Jan", users: 12000, activeBuildings: 4200 },
  { month: "Feb", users: 15300, activeBuildings: 5100 },
  { month: "Mar", users: 18700, activeBuildings: 6300 },
  { month: "Apr", users: 22100, activeBuildings: 7500 },
  { month: "May", users: 26500, activeBuildings: 9200 },
]

const trafficSourceData = [
  { name: "Direct", value: 35, color: "#3b82f6" },
  { name: "Organic Search", value: 28, color: "#10b981" },
  { name: "Referrals", value: 20, color: "#f59e0b" },
  { name: "Social Media", value: 17, color: "#ef4444" },
]

const kpiMetrics = [
  {
    label: "Daily Active Users (DAU)",
    value: "26,500",
    change: "+18%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Churn Rate",
    value: "2.1%",
    change: "-0.3%",
    trend: "down",
    icon: TrendingUp,
  },
  {
    label: "Search Volume",
    value: "142K",
    change: "+24%",
    trend: "up",
    icon: Search,
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    change: "+0.7%",
    trend: "up",
    icon: Zap,
  },
]

export function SystemDashboardView() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Dashboard</h1>
        <p className="mt-1 text-slate-600">
          Platform overview, key metrics, and operational insights
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => {
          const Icon = metric.icon
          const isPositive = metric.trend === "up"
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.label}
                </CardTitle>
                <Icon className="h-5 w-5 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isPositive ? "text-emerald-600" : "text-orange-600"
                  }`}
                >
                  {metric.change} {isPositive ? "increase" : "decrease"}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
            <CardDescription>Monthly active users and registered buildings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#3b82f6" name="Total Users" />
                <Bar dataKey="activeBuildings" fill="#10b981" name="Active Buildings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Distribution of platform visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">API Uptime</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 rounded-full bg-emerald-100">
                  <div className="h-2 w-32 rounded-full bg-emerald-500" style={{ width: "99.9%" }} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none">99.9%</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Database Health</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 rounded-full bg-emerald-100">
                  <div className="h-2 w-32 rounded-full bg-emerald-500" style={{ width: "98.5%" }} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none">98.5%</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Storage Capacity</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 rounded-full bg-amber-100">
                  <div className="h-2 w-32 rounded-full bg-amber-500" style={{ width: "67%" }} />
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-none">67%</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Cache Hit Rate</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 rounded-full bg-emerald-100">
                  <div className="h-2 w-32 rounded-full bg-emerald-500" style={{ width: "92%" }} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none">92%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Total Buildings</span>
              <span className="text-lg font-bold text-slate-900">9,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Active Owners</span>
              <span className="text-lg font-bold text-slate-900">3,152</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Total Transactions</span>
              <span className="text-lg font-bold text-slate-900">42,856</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Monthly Revenue</span>
              <span className="text-lg font-bold text-emerald-600">ETB 1.2M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Support Tickets (Open)</span>
              <Badge className="bg-amber-100 text-amber-700 border-none">24</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
