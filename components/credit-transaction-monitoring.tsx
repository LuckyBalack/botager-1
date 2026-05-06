"use client"

import { AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Transaction {
  id: string
  partnerId: string
  partnerName: string
  type: "disbursement" | "repayment" | "adjustment"
  amount: number
  timestamp: string
  status: "success" | "pending" | "failed"
  businessId?: string
}

export function CreditTransactionMonitoring() {
  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      partnerId: "CSP-1",
      partnerName: "Edenred",
      type: "disbursement",
      amount: 45000,
      timestamp: "2024-01-15 14:32",
      status: "success",
      businessId: "BUS-123",
    },
    {
      id: "TXN-002",
      partnerId: "CSP-2",
      partnerName: "Africa Fintech",
      type: "repayment",
      amount: 12500,
      timestamp: "2024-01-15 13:45",
      status: "success",
      businessId: "BUS-456",
    },
    {
      id: "TXN-003",
      partnerId: "CSP-1",
      partnerName: "Edenred",
      type: "disbursement",
      amount: 32000,
      timestamp: "2024-01-15 12:15",
      status: "pending",
      businessId: "BUS-789",
    },
    {
      id: "TXN-004",
      partnerId: "CSP-3",
      partnerName: "Telebirr",
      type: "adjustment",
      amount: -5000,
      timestamp: "2024-01-15 11:30",
      status: "failed",
      businessId: "BUS-234",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-amber-100 text-amber-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4" />
      case "pending":
        return <TrendingUp className="h-4 w-4" />
      case "failed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Monitoring</CardTitle>
        <CardDescription>Real-time transaction tracking across partners</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3 pr-4">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className={`rounded-lg p-2 ${txn.type === "disbursement" ? "bg-blue-100" : txn.type === "repayment" ? "bg-emerald-100" : "bg-amber-100"}`}>
                    <TrendingUp className={`h-4 w-4 ${txn.type === "disbursement" ? "text-blue-600" : txn.type === "repayment" ? "text-emerald-600" : "text-amber-600"}`} />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{txn.partnerName}</p>
                    <p className="text-xs text-slate-500">{txn.id} • {txn.timestamp}</p>
                  </div>

                  <div className="text-right">
                    <p className={`font-bold ${txn.type === "adjustment" ? "text-red-600" : "text-slate-900"}`}>
                      {txn.type === "disbursement" ? "+" : ""}{txn.type === "adjustment" ? "-" : ""} ETB {Math.abs(txn.amount).toLocaleString()}
                    </p>
                  </div>

                  <Badge className={getStatusColor(txn.status)} variant="outline">
                    <span className="mr-1">{getStatusIcon(txn.status)}</span>
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
