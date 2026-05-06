"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Download, DollarSign, Wallet, PiggyBank, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfitLossReport } from "@/components/profit-loss-report"
import { BalanceSheet } from "@/components/balance-sheet"
import { AccountReconciliation } from "@/components/account-reconciliation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { financialReport, monthlyFinancials, expenseBreakdown } from "@/lib/data"

export function AccountingView() {
  const [timePeriod, setTimePeriod] = useState("6-months")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounting & Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Financial overview and reporting</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">Last Month</SelectItem>
              <SelectItem value="3-months">Last 3 Months</SelectItem>
              <SelectItem value="6-months">Last 6 Months</SelectItem>
              <SelectItem value="1-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="overview" className="px-6">
            Overview
          </TabsTrigger>
          <TabsTrigger value="pl" className="px-6">
            P&L Statement
          </TabsTrigger>
          <TabsTrigger value="balance" className="px-6">
            Balance Sheet
          </TabsTrigger>
          <TabsTrigger value="reconciliation" className="px-6">
            Reconciliation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Financial Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-green-100 p-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+{financialReport.revenueChange}%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Total Revenue</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{financialReport.totalRevenue}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-red-100 p-3">
                <Wallet className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingDown className="h-4 w-4" />
                <span>{financialReport.expenseChange}%</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Total Expenses</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{financialReport.totalExpenses}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-100 p-3">
                <PiggyBank className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Net Operating Income</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{financialReport.netOperatingIncome}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-amber-100 p-3">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Outstanding Debt</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{financialReport.outstandingDebt}</p>
          </div>
        </Card>
      </div>
        </TabsContent>

        <TabsContent value="pl">
          <ProfitLossReport />
        </TabsContent>

        <TabsContent value="balance">
          <BalanceSheet />
        </TabsContent>

        <TabsContent value="reconciliation">
          <AccountReconciliation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
