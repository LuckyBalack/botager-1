"use client"

import { Download, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type FinancialLine = {
  label: string
  amount: string
  isSubtotal?: boolean
  isBold?: boolean
  indent?: boolean
  trend?: "up" | "down"
  trendPercent?: number
}

const plReport: FinancialLine[] = [
  { label: "REVENUE", amount: "", isBold: true, isSubtotal: true },
  { label: "Rental Income", amount: "ETB 6,500,000", indent: true, trend: "up", trendPercent: 8 },
  { label: "Utility Charges", amount: "ETB 450,000", indent: true },
  { label: "Late Fees & Penalties", amount: "ETB 120,000", indent: true },
  { label: "Other Income", amount: "ETB 80,000", indent: true },
  { label: "Total Revenue", amount: "ETB 7,150,000", isBold: true, isSubtotal: true, trend: "up", trendPercent: 5 },
  
  { label: "", amount: "" },
  
  { label: "OPERATING EXPENSES", amount: "", isBold: true, isSubtotal: true },
  { label: "Salaries & Wages", amount: "ETB 1,200,000", indent: true, trend: "down", trendPercent: 2 },
  { label: "Utilities (Building)", amount: "ETB 400,000", indent: true },
  { label: "Maintenance & Repairs", amount: "ETB 600,000", indent: true, trend: "up", trendPercent: 12 },
  { label: "Property Insurance", amount: "ETB 350,000", indent: true },
  { label: "Security Services", amount: "ETB 200,000", indent: true },
  { label: "Office Supplies", amount: "ETB 50,000", indent: true },
  { label: "Total Operating Expenses", amount: "ETB 2,800,000", isBold: true, isSubtotal: true, trend: "up", trendPercent: 3 },
  
  { label: "", amount: "" },
  
  { label: "OPERATING INCOME", amount: "ETB 4,350,000", isBold: true, isSubtotal: true, trend: "up", trendPercent: 6 },
  
  { label: "", amount: "" },
  
  { label: "OTHER EXPENSES", amount: "", isBold: true, isSubtotal: true },
  { label: "Depreciation", amount: "ETB 200,000", indent: true },
  { label: "Interest Expense", amount: "ETB 150,000", indent: true },
  { label: "Bank Fees", amount: "ETB 25,000", indent: true },
  { label: "Total Other Expenses", amount: "ETB 375,000", isBold: true, isSubtotal: true },
  
  { label: "", amount: "" },
  
  { label: "NET INCOME BEFORE TAX", amount: "ETB 3,975,000", isBold: true, isSubtotal: true, trend: "up", trendPercent: 8 },
  
  { label: "", amount: "" },
  
  { label: "TAXES", amount: "", isBold: true, isSubtotal: true },
  { label: "Corporate Income Tax (30%)", amount: "ETB 1,192,500", indent: true },
  { label: "Total Taxes", amount: "ETB 1,192,500", isBold: true, isSubtotal: true },
  
  { label: "", amount: "" },
  
  { label: "NET INCOME (PROFIT)", amount: "ETB 2,782,500", isBold: true, isSubtotal: true, trend: "up", trendPercent: 8 },
]

export function ProfitLossReport() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-900">Profit & Loss Statement</h3>
          <p className="text-sm text-slate-500">April 2024 (Month-to-Date)</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <div className="divide-y divide-slate-100">
          {plReport.map((line, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-6 py-3 ${
                line.isSubtotal
                  ? line.isBold
                    ? "bg-slate-900 text-white font-bold"
                    : "bg-slate-50 font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {line.indent && <span className="inline-block w-4" />}
                <span className={line.isBold ? "font-semibold" : ""}>
                  {line.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-right font-mono ${
                  line.isBold ? "font-semibold" : ""
                }`}>
                  {line.amount}
                </span>
                {line.trend && (
                  <div className="flex items-center gap-1 ml-2">
                    {line.trend === "up" ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-600">
                          +{line.trendPercent}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-semibold text-red-600">
                          -{line.trendPercent}%
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs text-emerald-600 font-medium">Profit Margin</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">38.9%</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs text-amber-600 font-medium">Operating Ratio</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">39.2%</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs text-blue-600 font-medium">Year-over-Year</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">+8.5%</p>
        </div>
      </div>
    </section>
  )
}
