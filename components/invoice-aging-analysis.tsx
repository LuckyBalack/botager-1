"use client"

import { AlertCircle, TrendingDown, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AgingBucket {
  range: string
  daysMin: number
  daysMax: number
  count: number
  amount: number
  color: string
  bgColor: string
}

export function InvoiceAgingAnalysis() {
  const agingData: AgingBucket[] = [
    {
      range: "Current",
      daysMin: 0,
      daysMax: 30,
      count: 6,
      amount: 90000,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      range: "30-60 Days",
      daysMin: 31,
      daysMax: 60,
      count: 0,
      amount: 0,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
    {
      range: "60-90 Days",
      daysMin: 61,
      daysMax: 90,
      count: 0,
      amount: 0,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
    {
      range: "90+ Days",
      daysMin: 91,
      daysMax: 999,
      count: 0,
      amount: 0,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  const totalAmount = agingData.reduce((sum, bucket) => sum + bucket.amount, 0)

  return (
    <div className="space-y-6">
      {/* Aging Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {agingData.map((bucket, index) => {
          const percentage = totalAmount > 0 ? (bucket.amount / totalAmount) * 100 : 0
          return (
            <Card key={index} className={bucket.bgColor}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {bucket.range}
                    </p>
                    <p className={`mt-2 text-2xl font-bold ${bucket.color}`}>
                      ETB {bucket.amount.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {bucket.count} invoice{bucket.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-600">
                      {percentage.toFixed(0)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Aging Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-slate-600" />
            Detailed Aging Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Age Range</TableHead>
                <TableHead>Days Outstanding</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Invoices</TableHead>
                <TableHead>% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agingData.map((bucket, index) => {
                const percentage = totalAmount > 0
                  ? ((bucket.amount / totalAmount) * 100).toFixed(1)
                  : "0"
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${bucket.color} border-current`}
                      >
                        {bucket.range}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {bucket.daysMin}-{bucket.daysMax} days
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">
                      ETB {bucket.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{bucket.count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-slate-200">
                          <div
                            className={`h-2 rounded-full ${bucket.bgColor}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">
                          {percentage}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Health Status */}
      <Card className="border-l-4 border-l-emerald-500 bg-emerald-50">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <TrendingDown className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">
              All invoices are current and paid on time
            </p>
            <p className="text-sm text-slate-600">
              Your payment history shows excellent compliance
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
