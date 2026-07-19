"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Activity, Eye, TrendingUp, Download, AlertCircle, TrendingDown } from "lucide-react"
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

type GatewayStatus = "online" | "offline" | "degraded"

const revenueChartData = [
  { month: "Jan", revenue: 45000, subscriptions: 32000, fees: 13000 },
  { month: "Feb", revenue: 52000, subscriptions: 37000, fees: 15000 },
  { month: "Mar", revenue: 48000, subscriptions: 35000, fees: 13000 },
  { month: "Apr", revenue: 61000, subscriptions: 42000, fees: 19000 },
  { month: "May", revenue: 125000, subscriptions: 85000, fees: 40000 },
]

const refundChartData = [
  { status: "Completed", value: 8, fill: "#10b981" },
  { status: "Pending", value: 3, fill: "#f59e0b" },
  { status: "Disputed", value: 2, fill: "#ef4444" },
]

const chargebackData = [
  { month: "Jan", chargebacks: 1, amount: 2500 },
  { month: "Feb", chargebacks: 2, amount: 5200 },
  { month: "Mar", chargebacks: 0, amount: 0 },
  { month: "Apr", chargebacks: 1, amount: 3500 },
  { month: "May", chargebacks: 3, amount: 7800 },
]

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

const mockRefunds = [
  {
    id: "ref-001",
    transactionId: "txn-5023",
    amount: "ETB 1,500",
    reason: "Duplicate Charge",
    status: "Completed",
    requestedDate: "May 1, 2026",
  },
  {
    id: "ref-002",
    transactionId: "txn-5024",
    amount: "ETB 2,200",
    reason: "Service Issue",
    status: "Pending",
    requestedDate: "May 3, 2026",
  },
  {
    id: "ref-003",
    transactionId: "txn-5025",
    amount: "ETB 800",
    reason: "Subscription Cancel",
    status: "Completed",
    requestedDate: "Apr 28, 2026",
  },
]

const mockChargebacks = [
  {
    id: "cb-001",
    transactionId: "txn-4995",
    amount: "ETB 3,500",
    reason: "Unauthorized Transaction",
    status: "Investigation",
    filledDate: "May 2, 2026",
  },
  {
    id: "cb-002",
    transactionId: "txn-4996",
    amount: "ETB 2,100",
    reason: "Goods/Services Not Received",
    status: "Won",
    filledDate: "Apr 25, 2026",
  },
  {
    id: "cb-003",
    transactionId: "txn-4997",
    amount: "ETB 4,200",
    reason: "Product Not As Described",
    status: "Lost",
    filledDate: "Apr 15, 2026",
  },
]

export function PlatformFinancialsView() {
  const [dateRange, setDateRange] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")

  const handleInvoiceAction = (action: string, subscriptionId: string) => {
    if (action === "view-invoice") {
      toast.success(`Viewing invoice for subscription ${subscriptionId}`)
    } else if (action === "send-reminder") {
      toast.success(`Payment reminder sent`)
    } else if (action === "suspend") {
      toast.error(`Account suspended`)
    }
  }

  const handleExportReport = () => {
    toast.success("Report Generated", {
      description: "Financial report has been exported as PDF.",
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-slate-900">Platform Financials & Billing</h1>
          <p className="text-slate-600">Track revenue, subscriptions, gateway health, refunds, and chargebacks</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="chargebacks">Chargebacks</TabsTrigger>
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
        </TabsList>

        {/* Revenue Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Monthly Recurring Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">ETB 125,000</div>
                <p className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +12% from last month
                </p>
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

          {/* Revenue Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly recurring revenue breakdown by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `ETB ${value.toLocaleString()}`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Total Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="subscriptions"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Subscriptions"
                  />
                  <Line
                    type="monotone"
                    dataKey="fees"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Platform Fees"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="mt-6 space-y-6">
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
        </TabsContent>

        {/* Refunds Tab */}
        <TabsContent value="refunds" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Refunds (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">ETB 4,500</div>
                <p className="mt-2 text-sm text-slate-600">13 refunds processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Pending Refunds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">ETB 2,200</div>
                <p className="mt-2 text-sm text-amber-600">3 awaiting processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Refund Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">0.8%</div>
                <p className="mt-2 text-sm text-slate-600">Of total transactions</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Refund Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={refundChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, value }) => `${status}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {refundChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Refund Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Transaction ID</TableHead>
                    <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                    <TableHead className="font-semibold text-slate-700">Reason</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Requested Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRefunds.map((refund) => (
                    <TableRow key={refund.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{refund.transactionId}</TableCell>
                      <TableCell className="text-slate-700">{refund.amount}</TableCell>
                      <TableCell className="text-slate-700">{refund.reason}</TableCell>
                      <TableCell>
                        <Badge
                          className={`border-none ${
                            refund.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {refund.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700">{refund.requestedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chargebacks Tab */}
        <TabsContent value="chargebacks" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Chargebacks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">ETB 9,800</div>
                <p className="mt-2 text-sm text-red-600">6 chargeback cases</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Cases Won</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">2</div>
                <p className="mt-2 text-sm text-emerald-600">33% win rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Under Investigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">1</div>
                <p className="mt-2 text-sm text-amber-600">Pending decision</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chargeback Trends</CardTitle>
              <CardDescription>Monthly chargeback activity and amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chargebackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="chargebacks" fill="#ef4444" name="Chargeback Count" />
                  <Bar
                    yAxisId="right"
                    dataKey="amount"
                    fill="#f97316"
                    name="Amount (ETB)"
                    formatter={(value) => `ETB ${value.toLocaleString()}`}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Active Chargeback Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Transaction ID</TableHead>
                    <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                    <TableHead className="font-semibold text-slate-700">Reason</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Filed Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockChargebacks.map((chargeback) => (
                    <TableRow key={chargeback.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{chargeback.transactionId}</TableCell>
                      <TableCell className="text-slate-700">{chargeback.amount}</TableCell>
                      <TableCell className="text-slate-700">{chargeback.reason}</TableCell>
                      <TableCell>
                        <Badge
                          className={`border-none ${
                            chargeback.status === "Won"
                              ? "bg-emerald-100 text-emerald-700"
                              : chargeback.status === "Lost"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {chargeback.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700">{chargeback.filledDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Gateways Tab */}
        <TabsContent value="gateways" className="mt-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Payment Gateway Health</h2>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
