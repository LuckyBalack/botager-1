"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type BalanceLineItem = {
  label: string
  amount: string
  isSection?: boolean
  isTotal?: boolean
  indent?: boolean
}

const assets: BalanceLineItem[] = [
  { label: "CURRENT ASSETS", isSection: true },
  { label: "Cash and Cash Equivalents", amount: "ETB 500,000", indent: true },
  { label: "Accounts Receivable", amount: "ETB 350,000", indent: true },
  { label: "Prepaid Expenses", amount: "ETB 50,000", indent: true },
  { label: "Total Current Assets", amount: "ETB 900,000", isTotal: true, indent: true },
  
  { label: "FIXED ASSETS", isSection: true },
  { label: "Building & Land", amount: "ETB 25,000,000", indent: true },
  { label: "Furniture & Fixtures", amount: "ETB 500,000", indent: true },
  { label: "Office Equipment", amount: "ETB 200,000", indent: true },
  { label: "Less: Accumulated Depreciation", amount: "(ETB 2,000,000)", indent: true },
  { label: "Total Fixed Assets", amount: "ETB 23,700,000", isTotal: true, indent: true },
  
  { label: "TOTAL ASSETS", amount: "ETB 24,600,000", isTotal: true },
]

const liabilities: BalanceLineItem[] = [
  { label: "CURRENT LIABILITIES", isSection: true },
  { label: "Accounts Payable", amount: "ETB 200,000", indent: true },
  { label: "Rent Received in Advance", amount: "ETB 150,000", indent: true },
  { label: "Short-term Loan", amount: "ETB 500,000", indent: true },
  { label: "Total Current Liabilities", amount: "ETB 850,000", isTotal: true, indent: true },
  
  { label: "LONG-TERM LIABILITIES", isSection: true },
  { label: "Long-term Debt", amount: "ETB 8,000,000", indent: true },
  { label: "Total Long-term Liabilities", amount: "ETB 8,000,000", isTotal: true, indent: true },
  
  { label: "TOTAL LIABILITIES", amount: "ETB 8,850,000", isTotal: true },
]

const equity: BalanceLineItem[] = [
  { label: "Owner's Equity", amount: "ETB 15,750,000", indent: true },
  { label: "Retained Earnings", amount: "ETB 2,782,500", indent: true },
  { label: "TOTAL EQUITY", amount: "ETB 18,532,500", isTotal: true, indent: true },
  
  { label: "TOTAL LIABILITIES & EQUITY", amount: "ETB 24,600,000", isTotal: true },
]

function BalanceSection({ title, items }: { title: string; items: BalanceLineItem[] }) {
  return (
    <div>
      <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
      <div className="space-y-0 border border-slate-200 rounded-lg overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between px-4 py-3 border-b border-slate-100 last:border-b-0 ${
              item.isSection ? "bg-slate-100 font-semibold" : item.isTotal ? "bg-slate-50 font-semibold" : ""
            }`}
          >
            <span className={item.indent ? "ml-6" : ""}>
              {item.label}
            </span>
            <span className="font-mono font-semibold">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BalanceSheet() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-900">Balance Sheet</h3>
          <p className="text-sm text-slate-500">As of April 30, 2024</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <BalanceSection title="ASSETS" items={assets} />
      <BalanceSection title="LIABILITIES & EQUITY" items={[...liabilities, ...equity]} />

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Balance Check:</span> Assets (ETB 24.6M) = Liabilities
          (ETB 8.85M) + Equity (ETB 18.53M) ✓
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">Debt-to-Equity Ratio</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">0.48</p>
          <p className="text-xs text-slate-500 mt-2">Healthy leverage position</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">Current Ratio</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">1.06</p>
          <p className="text-xs text-slate-500 mt-2">Adequate liquidity</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">ROA (Return on Assets)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">11.3%</p>
          <p className="text-xs text-slate-500 mt-2">Strong asset utilization</p>
        </div>
      </div>
    </section>
  )
}
