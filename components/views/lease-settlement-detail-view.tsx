"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Archive } from "lucide-react"
import { toast } from "sonner"

interface LeaseSettlementData {
  tenantName: string
  roomNumber: string
  startDate: string
  endDate: string
  originalDeposit: number
  damageDeductions: Array<{
    description: string
    amount: number
  }>
  outstandingRent: number
  outstandingUtilities: number
}

interface LeaseSettlementViewProps {
  data?: LeaseSettlementData
  onClose?: () => void
  onFinalize?: () => void
}

export function LeaseSettlementDetailView({
  data = {
    tenantName: "Getachew Temesgen",
    roomNumber: "310",
    startDate: "Jan 1, 2023",
    endDate: "Apr 30, 2024",
    originalDeposit: 30000,
    damageDeductions: [
      { description: "Wall damage - scuff marks", amount: 2500 },
      { description: "Door lock replacement", amount: 3000 },
      { description: "Carpet cleaning (excessive wear)", amount: 1500 },
    ],
    outstandingRent: 5000,
    outstandingUtilities: 1500,
  },
  onClose,
  onFinalize,
}: LeaseSettlementViewProps) {
  const [expandedSections, setExpandedSections] = useState({
    deductions: true,
    balance: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Calculations
  const totalDeductions = data.damageDeductions.reduce((sum, d) => sum + d.amount, 0)
  const totalOwed = data.outstandingRent + data.outstandingUtilities
  const grossRefund = data.originalDeposit - totalDeductions
  const finalRefund = Math.max(0, grossRefund - totalOwed)
  const balanceOwed = totalOwed > grossRefund ? totalOwed - grossRefund : 0

  const handleFinalize = () => {
    if (finalRefund > 0) {
      toast.success(`Refund of ETB ${finalRefund.toFixed(2)} processed!`, {
        description: `Account for tenant in Room ${data.roomNumber} has been archived.`,
      })
    } else if (balanceOwed > 0) {
      toast.warning(`Tenant owes ETB ${balanceOwed.toFixed(2)}`, {
        description: "Account archived. Payment due before departure.",
      })
    }

    onFinalize?.()
    onClose?.()
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-50 to-white p-6 rounded-lg border border-slate-200">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Final Lease Settlement: <span className="text-blue-600">{data.tenantName}</span>
        </h1>
        <div className="mt-4 flex flex-wrap gap-4">
          <div>
            <p className="text-sm text-slate-600">Room Number</p>
            <p className="font-semibold text-slate-900">{data.roomNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Lease Period</p>
            <p className="font-semibold text-slate-900">
              {data.startDate} to {data.endDate}
            </p>
          </div>
        </div>
      </div>

      {/* Original Deposit */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Original Security Deposit</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              ETB {data.originalDeposit.toFixed(2)}
            </p>
          </div>
          <Badge className="bg-blue-600 text-white">Held in Escrow</Badge>
        </div>
      </div>

      {/* Deductions Section */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("deductions")}
          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-slate-900">Damage Deductions</h3>
          {expandedSections.deductions ? (
            <ChevronUp className="h-5 w-5 text-slate-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-600" />
          )}
        </button>

        {expandedSections.deductions && (
          <div className="p-4 bg-white space-y-3">
            {data.damageDeductions.length > 0 ? (
              <>
                {data.damageDeductions.map((deduction, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-slate-600">{deduction.description}</span>
                    <span className="font-semibold text-red-600">
                      -ETB {deduction.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between font-semibold">
                  <span className="text-slate-900">Total Deductions</span>
                  <span className="text-red-600">-ETB {totalDeductions.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p className="text-slate-500 italic">No damage deductions recorded</p>
            )}
          </div>
        )}
      </div>

      {/* Outstanding Charges */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Outstanding Charges</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Outstanding Rent</span>
            <span className="font-semibold text-slate-900">ETB {data.outstandingRent.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Outstanding Utilities</span>
            <span className="font-semibold text-slate-900">
              ETB {data.outstandingUtilities.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex items-center justify-between font-semibold">
            <span className="text-slate-900">Total Owed</span>
            <span className="text-orange-600">ETB {totalOwed.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Final Balance Section */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("balance")}
          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-slate-900">Final Balance Calculation</h3>
          {expandedSections.balance ? (
            <ChevronUp className="h-5 w-5 text-slate-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-600" />
          )}
        </button>

        {expandedSections.balance && (
          <div className="p-4 bg-white space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Original Deposit</span>
              <span className="font-mono text-slate-900">ETB {data.originalDeposit.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Less: Damage Deductions</span>
              <span className="font-mono text-red-600">-ETB {totalDeductions.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold border-t border-slate-200 pt-2">
              <span className="text-slate-900">Available Balance</span>
              <span className="font-mono text-slate-900">ETB {grossRefund.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Less: Outstanding Charges</span>
              <span className="font-mono text-orange-600">-ETB {totalOwed.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Final Result */}
      <div
        className={`rounded-lg p-6 text-center ${
          finalRefund > 0
            ? "bg-emerald-50 border border-emerald-200"
            : balanceOwed > 0
              ? "bg-red-50 border border-red-200"
              : "bg-slate-50 border border-slate-200"
        }`}
      >
        {finalRefund > 0 ? (
          <>
            <p className="text-sm font-medium text-emerald-900">Refund to Tenant</p>
            <p className="text-4xl font-bold text-emerald-600 mt-2">
              ETB {finalRefund.toFixed(2)}
            </p>
          </>
        ) : balanceOwed > 0 ? (
          <>
            <p className="text-sm font-medium text-red-900">Balance Owed by Tenant</p>
            <p className="text-4xl font-bold text-red-600 mt-2">ETB {balanceOwed.toFixed(2)}</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-900">Settlement Complete</p>
            <p className="text-2xl font-bold text-slate-600 mt-2">All Accounts Settled</p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end border-t border-slate-200 pt-6">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-slate-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleFinalize}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Archive className="mr-2 h-4 w-4" />
          Finalize & Close Account
        </Button>
      </div>
    </div>
  )
}
