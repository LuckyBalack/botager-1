"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Activity, Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

type GatewayStatus = "online" | "offline" | "degraded"

const mockGateways = [
  { name: "Chapa", status: "online" as GatewayStatus, successRate: 99.2 },
  { name: "Telebirr", status: "online" as GatewayStatus, successRate: 98.7 },
  { name: "CBE Birr", status: "online" as GatewayStatus, successRate: 99.8 },
]

const mockSubscriptions = [
  {
    id: "sub-001",
    ownerName: "Kebede Teshome",
    buildingName: "Zefmesh Grand Mall",
    planType: "Enterprise",
    nextBillingDate: "May 15, 2026",
    status: "Paid" as const,
  },
  {
    id: "sub-002",
    ownerName: "Almaz Getahun",
    buildingName: "Summit Office Park",
    planType: "Pro",
    nextBillingDate: "May 8, 2026",
    status: "Paid" as const,
  },
  {
    id: "sub-003",
    ownerName: "Yohannes Assefa",
    buildingName: "Addis Tower",
    planType: "Basic",
    nextBillingDate: "May 20, 2026",
    status: "Overdue" as const,
  },
  {
    id: "sub-004",
    ownerName: "Sara Mekuria",
    buildingName: "Business Hub Addis",
    planType: "Pro",
    nextBillingDate: "Apr 30, 2026",
    status: "Paid" as const,
  },
]

function GatewayStatusBadge({ status }: { status: GatewayStatus }) {
  const styles: Record<GatewayStatus, string> = {
    online: "bg-emerald-100 text-emerald-700",
    offline: "bg-red-100 text-red-700",
    degraded: "bg-amber-100 text-amber-700",
  }
  return (
    <Badge className={`${styles[status]} border-none font-medium`}>
      {status === "online" && <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-600" />}
      API {status === "online" ? "Online" : status === "offline" ? "Offline" : "Degraded"}
    </Badge>
  )
}

function PaymentStatusBadge({ status }: { status: "Paid" | "Overdue" | "Cancelled" }) {
  const styles: Record<string, string> = {
    Paid: "bg-emerald-100 text-emerald-700",
    Overdue: "bg-red-100 text-red-700",
    Cancelled: "bg-slate-100 text-slate-700",
  }
  return (
    <Badge className={`${styles[status]} border-none font-medium`}>
      {status}
    </Badge>
  )
}

export function PlatformFinancialsView() {
  const [dateRange, setDateRange] = useState("month")

  const handleInvoiceAction = (action: string, subscriptionId: string) => {
    if (action === "view-invoice") {
      toast.success(`Viewing invoice for subscription ${subscriptionId}`)
    } else if (action === "send-reminder") {
      toast.success(`Payment reminder sent`)
    } else if (action === "suspend") {
      toast.error(`Account suspended`)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-slate-900">Platform Financials & Billing</h1>
          <p className="text-slate-600">Track revenue, subscriptions, and payment gateway health</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Monthly Recurring Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">ETB 125,000</div>
            <p className="mt-2 text-sm text-emerald-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Active Building Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">42 Buildings</div>
            <p className="mt-2 text-sm text-slate-600">4 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Transaction Volume Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">ETB 8.4M</div>
            <p className="mt-2 text-sm text-slate-600">2,847 transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Pending Platform Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">ETB 15,200</div>
            <p className="mt-2 text-sm text-red-600">3 overdue accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Gateway Health Monitor */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Payment Gateway Health</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {mockGateways.map((gateway) => (
            <Card key={gateway.name}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">{gateway.name}</h3>
                  <GatewayStatusBadge status={gateway.status} />
                </div>
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-1">Success Rate</p>
                  <div className="text-2xl font-bold text-slate-900">{gateway.successRate}%</div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Eye className="h-4 w-4 mr-1" />
                  View Logs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscription Ledger */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Active SaaS Subscriptions</h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Owner Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Building Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Plan Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Next Billing Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Payment Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSubscriptions.map((sub) => (
                  <TableRow key={sub.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">{sub.ownerName}</TableCell>
                    <TableCell className="text-slate-700">{sub.buildingName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50">
                        {sub.planType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{sub.nextBillingDate}</TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={sub.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleInvoiceAction("view-invoice", sub.id)}>
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleInvoiceAction("send-reminder", sub.id)}>
                            Send Payment Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleInvoiceAction("suspend", sub.id)}
                            className="text-red-600"
                          >
                            Suspend Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
