"use client"

import { CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type BankAccount = {
  id: string
  name: string
  accountNumber: string
  bankName: string
  balance: string
  ledgerBalance: string
  difference: string
  status: "reconciled" | "pending" | "discrepancy"
  lastReconciled: string
  pendingTransactions: number
}

const bankAccounts: BankAccount[] = [
  {
    id: "acc-1",
    name: "Main Operating Account",
    accountNumber: "1234567890",
    bankName: "Commercial Bank of Ethiopia",
    balance: "ETB 500,000",
    ledgerBalance: "ETB 500,000",
    difference: "ETB 0",
    status: "reconciled",
    lastReconciled: "Apr 28, 2024",
    pendingTransactions: 0,
  },
  {
    id: "acc-2",
    name: "Rent Deposit Account",
    accountNumber: "0987654321",
    bankName: "Awash Bank",
    balance: "ETB 350,000",
    ledgerBalance: "ETB 348,500",
    difference: "ETB 1,500",
    status: "pending",
    lastReconciled: "Apr 25, 2024",
    pendingTransactions: 3,
  },
  {
    id: "acc-3",
    name: "Maintenance Reserve",
    accountNumber: "5555666677",
    bankName: "Dashen Bank",
    balance: "ETB 200,000",
    ledgerBalance: "ETB 185,000",
    difference: "ETB 15,000",
    status: "discrepancy",
    lastReconciled: "Apr 15, 2024",
    pendingTransactions: 5,
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "reconciled":
      return <CheckCircle2 className="h-5 w-5 text-emerald-600" />
    case "pending":
      return <Clock className="h-5 w-5 text-amber-600" />
    case "discrepancy":
      return <AlertCircle className="h-5 w-5 text-red-600" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "reconciled":
      return "bg-emerald-100 text-emerald-700"
    case "pending":
      return "bg-amber-100 text-amber-700"
    case "discrepancy":
      return "bg-red-100 text-red-700"
  }
}

export function AccountReconciliation() {
  const reconciledCount = bankAccounts.filter((acc) => acc.status === "reconciled").length
  const pendingCount = bankAccounts.filter((acc) => acc.status === "pending").length
  const discrepancyCount = bankAccounts.filter((acc) => acc.status === "discrepancy").length

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900">Bank Reconciliation</h3>
        <Button size="sm" variant="outline">
          Reconcile All
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs text-emerald-600 font-medium">Reconciled</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{reconciledCount}</p>
          <p className="text-xs text-emerald-600 mt-1">accounts</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs text-amber-600 font-medium">Pending</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{pendingCount}</p>
          <p className="text-xs text-amber-600 mt-1">accounts</p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-xs text-red-600 font-medium">Discrepancies</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{discrepancyCount}</p>
          <p className="text-xs text-red-600 mt-1">accounts</p>
        </div>
      </div>

      {/* Account List */}
      <div className="space-y-4">
        {bankAccounts.map((account) => (
          <div key={account.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0">{getStatusIcon(account.status)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900">{account.name}</h4>
                  <p className="text-sm text-slate-600">
                    {account.bankName} • Account: {account.accountNumber}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(account.status)}>
                {account.status === "reconciled"
                  ? "Reconciled"
                  : account.status === "pending"
                    ? "Pending"
                    : "Discrepancy"}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-slate-100 text-sm">
              <div>
                <p className="text-xs text-slate-500 font-medium">Bank Balance</p>
                <p className="font-semibold text-slate-900 mt-1">{account.balance}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Ledger Balance</p>
                <p className="font-semibold text-slate-900 mt-1">{account.ledgerBalance}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Difference</p>
                <p className={`font-semibold mt-1 ${
                  account.difference === "ETB 0"
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}>
                  {account.difference}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span>Last reconciled: {account.lastReconciled}</span>
                {account.pendingTransactions > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-amber-600 font-medium">
                      {account.pendingTransactions} pending transactions
                    </span>
                  </>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={account.status === "reconciled"}
              >
                {account.status === "reconciled" ? "Reconciled" : "Reconcile"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="font-medium text-blue-900 mb-2">Reconciliation Best Practices</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Reconcile accounts at least monthly</li>
          <li>Match bank statements with your ledger records</li>
          <li>Investigate discrepancies immediately</li>
          <li>Document adjustments and create audit trails</li>
          <li>Keep reconciliation records for compliance</li>
        </ul>
      </div>
    </section>
  )
}
