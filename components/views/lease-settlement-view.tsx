"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle2, FileText, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import type { Tenant } from "@/lib/data"

type LeaseSettlementViewProps = {
  tenant: Tenant
  onClose: () => void
}

type Deduction = {
  id: string
  description: string
  amount: number
}

export function LeaseSettlementView({ tenant, onClose }: LeaseSettlementViewProps) {
  // Security deposit - would normally come from tenant data
  const originalDeposit = 30000

  // Inspection deductions (would come from inspection report)
  const [deductions, setDeductions] = useState<Deduction[]>([
    { id: "ded-001", description: "Wall damage repair", amount: 2500 },
    { id: "ded-002", description: "Deep cleaning fee", amount: 1500 },
  ])

  // Outstanding balances
  const [outstandingRent] = useState(
    tenant.payment === "Unpaid" ? parseFloat(tenant.rentAmount.replace("ETB ", "").replace(",", "")) : 0
  )
  const [outstandingUtilities] = useState(325) // Sample utility balance

  const [newDeductionDesc, setNewDeductionDesc] = useState("")
  const [newDeductionAmount, setNewDeductionAmount] = useState("")
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  // Calculations
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0)
  const totalOutstanding = outstandingRent + outstandingUtilities
  const totalCharges = totalDeductions + totalOutstanding
  const finalRefund = originalDeposit - totalCharges
  const isRefund = finalRefund >= 0
  const balanceOwed = Math.abs(finalRefund)

  const handleAddDeduction = () => {
    if (newDeductionDesc && newDeductionAmount) {
      const newDed: Deduction = {
        id: `ded-${Date.now()}`,
        description: newDeductionDesc,
        amount: parseFloat(newDeductionAmount),
      }
      setDeductions([...deductions, newDed])
      setNewDeductionDesc("")
      setNewDeductionAmount("")
    }
  }

  const handleRemoveDeduction = (id: string) => {
    setDeductions(deductions.filter((d) => d.id !== id))
  }

  const handleFinalizeSettlement = () => {
    setConfirmModalOpen(false)
    toast.success("Account Closed Successfully", {
      description: `${tenant.firstName} ${tenant.lastName}'s lease has been terminated. Room ${tenant.roomNo} is now marked as Vacant.`,
    })
    onClose()
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Final Lease Settlement
        </h1>
        <p className="text-lg text-slate-600">
          {tenant.firstName} {tenant.lastName} - Room {tenant.roomNo}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Tenant Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tenant Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Company</p>
                <p className="mt-1 font-medium text-slate-900">{tenant.companyName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Room</p>
                <p className="mt-1 font-medium text-slate-900">{tenant.roomNo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Lease Duration</p>
                <p className="mt-1 font-medium text-slate-900">{tenant.leaseDuration}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Move-Out Date</p>
                <p className="mt-1 font-medium text-slate-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Original Deposit */}
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">Original Security Deposit</p>
                <p className="text-sm text-slate-500">Held at lease signing</p>
              </div>
              <p className="text-xl font-bold text-slate-900">
                ETB {originalDeposit.toLocaleString()}
              </p>
            </div>

            <Separator />

            {/* Inspection Deductions */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium text-slate-900">Deductions (From Inspection)</p>
              </div>
              <div className="flex flex-col gap-2">
                {deductions.map((ded) => (
                  <div
                    key={ded.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Minus className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-slate-700">{ded.description}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-red-600">
                        - ETB {ded.amount.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeduction(ded.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add new deduction */}
                <div className="mt-2 grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <Input
                      placeholder="Deduction description"
                      value={newDeductionDesc}
                      onChange={(e) => setNewDeductionDesc(e.target.value)}
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={newDeductionAmount}
                      onChange={(e) => setNewDeductionAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleAddDeduction}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Outstanding Balances */}
            <div>
              <p className="mb-3 font-medium text-slate-900">Outstanding Balances</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-slate-700">Outstanding Rent</span>
                  </div>
                  <span
                    className={`font-medium ${outstandingRent > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {outstandingRent > 0 ? `- ETB ${outstandingRent.toLocaleString()}` : "Paid"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-slate-700">Outstanding Utilities</span>
                  </div>
                  <span
                    className={`font-medium ${outstandingUtilities > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {outstandingUtilities > 0
                      ? `- ETB ${outstandingUtilities.toLocaleString()}`
                      : "Paid"}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Final Calculation */}
            <div className="rounded-lg border-2 border-slate-300 bg-slate-50 p-4">
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Security Deposit</span>
                  <span className="text-slate-900">ETB {originalDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Deductions</span>
                  <span className="text-red-600">- ETB {totalDeductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Outstanding Balances</span>
                  <span className="text-red-600">- ETB {totalOutstanding.toLocaleString()}</span>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900">
                  {isRefund ? "Final Refund Amount" : "Balance Owed by Tenant"}
                </p>
                <p
                  className={`text-2xl font-bold ${isRefund ? "text-emerald-600" : "text-red-600"}`}
                >
                  ETB {balanceOwed.toLocaleString()}
                </p>
              </div>
              {!isRefund && (
                <p className="mt-2 flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  Tenant owes additional amount beyond their deposit
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={() => setConfirmModalOpen(true)}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Finalize & Close Account
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Lease Settlement</DialogTitle>
            <DialogDescription>
              This will archive the tenant record and mark Room {tenant.roomNo} as Vacant.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Tenant</p>
                  <p className="font-medium text-slate-900">
                    {tenant.firstName} {tenant.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Room</p>
                  <p className="font-medium text-slate-900">{tenant.roomNo}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Settlement Type</p>
                  <p className="font-medium text-slate-900">
                    {isRefund ? "Refund to Tenant" : "Amount Owed"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p
                    className={`font-bold ${isRefund ? "text-emerald-600" : "text-red-600"}`}
                  >
                    ETB {balanceOwed.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Go Back
            </Button>
            <Button
              onClick={handleFinalizeSettlement}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Confirm & Close Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
