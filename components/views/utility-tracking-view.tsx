"use client"

import { useState } from "react"
import { Zap, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { utilityReadings as initialReadings } from "@/lib/data"

export function UtilityTrackingView() {
  const [readings, setReadings] = useState(
    initialReadings.map((r) => ({
      ...r,
      currentReading: r.currentReading,
      isEditing: false,
    }))
  )
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [generatedInvoices, setGeneratedInvoices] = useState<
    { tenantName: string; roomNo: string; amount: number }[]
  >([])

  const handleCurrentReadingChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10) || 0
    setReadings(
      readings.map((r) =>
        r.id === id ? { ...r, currentReading: numValue } : r
      )
    )
  }

  const calculateConsumption = (previous: number, current: number) => {
    return Math.max(0, current - previous)
  }

  const calculateTotalCost = (consumption: number, rate: number) => {
    return consumption * rate
  }

  const handleGenerateInvoices = () => {
    const invoices = readings.map((r) => {
      const consumption = calculateConsumption(r.previousReading, r.currentReading)
      const amount = calculateTotalCost(consumption, r.ratePerUnit)
      return {
        tenantName: r.tenantName,
        roomNo: r.roomNo,
        amount,
      }
    })
    setGeneratedInvoices(invoices)
    setInvoiceModalOpen(true)
  }

  const handleConfirmInvoices = () => {
    setInvoiceModalOpen(false)
    toast.success("Utility Invoices Generated", {
      description: `${generatedInvoices.length} utility invoices have been created and will be added to tenant bills.`,
    })
  }

  // Calculate totals for summary
  const totalConsumption = readings.reduce((sum, r) => {
    return sum + calculateConsumption(r.previousReading, r.currentReading)
  }, 0)

  const totalRevenue = readings.reduce((sum, r) => {
    const consumption = calculateConsumption(r.previousReading, r.currentReading)
    return sum + calculateTotalCost(consumption, r.ratePerUnit)
  }, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Utility Meter Readings
          </h1>
          <p className="text-sm text-slate-500">
            Track and manage electricity consumption for occupied units
          </p>
        </div>
        <Button
          onClick={handleGenerateInvoices}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate Utility Invoices
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">{readings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <p className="text-2xl font-bold text-slate-900">
                {totalConsumption.toLocaleString()} kWh
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              ETB {totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Meter Readings Table */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">Room No</TableHead>
              <TableHead className="font-semibold text-slate-700">Tenant</TableHead>
              <TableHead className="font-semibold text-slate-700">
                Previous Reading (kWh)
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Current Reading (kWh)
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Consumption (kWh)
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Rate (ETB/kWh)
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Total Cost
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.map((reading) => {
              const consumption = calculateConsumption(
                reading.previousReading,
                reading.currentReading
              )
              const totalCost = calculateTotalCost(consumption, reading.ratePerUnit)

              return (
                <TableRow key={reading.id}>
                  <TableCell className="font-medium text-slate-900">
                    {reading.roomNo}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {reading.tenantName}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {reading.previousReading.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={reading.currentReading}
                      onChange={(e) =>
                        handleCurrentReadingChange(reading.id, e.target.value)
                      }
                      className="w-28"
                      min={reading.previousReading}
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        consumption > 100 ? "text-amber-600" : "text-slate-900"
                      }`}
                    >
                      {consumption.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    ETB {reading.ratePerUnit.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-semibold text-emerald-600">
                    ETB {totalCost.toLocaleString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Generated Invoices Preview Modal */}
      <Dialog open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Utility Invoices Preview</DialogTitle>
            <DialogDescription>
              Review the utility bills before generating invoices
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-80 overflow-y-auto py-4">
            <div className="flex flex-col gap-3">
              {generatedInvoices.map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {invoice.tenantName}
                    </p>
                    <p className="text-sm text-slate-500">Room {invoice.roomNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      ETB {invoice.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Utility Charge</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="font-semibold text-slate-900">Total</p>
              <p className="text-xl font-bold text-emerald-600">
                ETB{" "}
                {generatedInvoices
                  .reduce((sum, inv) => sum + inv.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmInvoices}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Confirm & Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
