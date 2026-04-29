"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Download, DollarSign, Wallet, PiggyBank, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
            <CardDescription>Monthly comparison over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyFinancials.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{month.month}</span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-600">Revenue: ETB {(month.revenue / 1000).toFixed(0)}K</span>
                      <span className="text-red-600">Expenses: ETB {(month.expenses / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-3 rounded-l bg-green-500"
                      style={{ width: `${(month.revenue / 800000) * 100}%` }}
                    />
                    <div
                      className="h-3 rounded-r bg-red-400"
                      style={{ width: `${(month.expenses / 800000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-green-500" />
                <span className="text-slate-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-red-400" />
                <span className="text-slate-600">Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Where your money is going</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {expenseBreakdown.map((expense) => (
                <div key={expense.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{expense.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">ETB {(expense.amount / 1000).toFixed(0)}K</span>
                      <span className="w-10 text-right font-semibold text-slate-900">{expense.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={expense.percentage} className="h-2" />
                </div>
              ))}
            </div>

            {/* Pie Chart Representation */}
            <div className="mt-8 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="75.4 176"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray="100.5 176"
                    strokeDashoffset="-75.4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray="50.3 176"
                    strokeDashoffset="-175.9"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="20"
                    strokeDasharray="25.1 176"
                    strokeDashoffset="-226.2"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-slate-700">Total</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">Maintenance (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-slate-600">Salaries (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">Utilities (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-slate-600">Taxes (10%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
