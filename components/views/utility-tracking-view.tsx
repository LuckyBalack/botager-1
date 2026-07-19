"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Zap } from "lucide-react"
import { useUtilityReadings } from "@/hooks/use-database"
import { useProperties } from "@/hooks/use-database"

interface UtilityReading {
  id: string
  roomName: string
  unitType: "electricity" | "water" | "gas"
  previousReading: number
  currentReading: number
  ratePerUnit: number
}

export function UtilityTrackingView() {
  const { properties, loading: propertiesLoading } = useProperties()
  const selectedProperty = properties?.[0]
  const { readings: dbReadings, loading: readingsLoading } = useUtilityReadings(selectedProperty?.id || null)
  
  const [readings, setReadings] = useState<UtilityReading[]>([])

  // Sync database readings to local state
  useEffect(() => {
    if (dbReadings && Array.isArray(dbReadings) && dbReadings.length > 0) {
      setReadings(dbReadings)
    }
  }, [dbReadings])

  const handleCurrentReadingChange = (id: string, value: string) => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    setReadings((prev) =>
      prev.map((reading) => {
        if (reading.id === id) {
          return {
            ...reading,
            currentReading: numValue,
          }
        }
        return reading
      })
    )
  }

  const getConsumption = (reading: UtilityReading): number => {
    return Math.max(0, reading.currentReading - reading.previousReading)
  }

  const getTotalCost = (reading: UtilityReading): number => {
    return getConsumption(reading) * reading.ratePerUnit
  }

  const handleGenerateInvoices = () => {
    if (readings.length === 0) {
      toast.error("No utility readings to process")
      return
    }

    const totalCost = readings.reduce((sum, reading) => sum + getTotalCost(reading), 0)
    
    toast.success("Utility invoices generated successfully!", {
      description: `Total billing amount: ETB ${totalCost.toFixed(2)}`,
    })

    // Reset readings to previous reading for next cycle
    setReadings((prev) =>
      prev.map((reading) => ({
        ...reading,
        previousReading: reading.currentReading,
        currentReading: reading.currentReading,
      }))
    )
  }

  const totalConsumption = readings.reduce(
    (sum, reading) => sum + getConsumption(reading),
    0
  )
  const totalBilling = readings.reduce((sum, reading) => sum + getTotalCost(reading), 0)

  if (propertiesLoading || readingsLoading) {
    return <div className="text-center text-slate-500">Loading utility data...</div>
  }

  if (!selectedProperty) {
    return <div className="text-center text-slate-500">No properties found. Create a property first.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">Utility Meter Readings</h1>
          <p className="text-slate-600">
            Track electricity consumption and generate utility invoices
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2">
          <Zap className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-semibold text-amber-900">
            {readings.length} units monitored
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-600">Total Consumption</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalConsumption.toFixed(0)} <span className="text-base text-slate-500">kWh</span>
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-600">Total Billing Amount</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            ETB {totalBilling.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Utilities Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableHead className="px-6 py-3 text-slate-700">Room No</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Tenant</TableHead>
              <TableHead className="px-6 py-3 text-right text-slate-700">
                Previous Reading (kWh)
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-slate-700">
                Current Reading (kWh)
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-slate-700">
                Consumption (kWh)
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-slate-700">
                Rate (ETB/kWh)
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-slate-700">Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.map((reading) => {
              const consumption = getConsumption(reading)
              const totalCost = getTotalCost(reading)
              const isEditing = editingId === reading.id

              return (
                <TableRow key={reading.id} className="border-slate-200">
                  <TableCell className="px-6 py-3 font-semibold text-slate-900">
                    {reading.roomNo}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-slate-600">
                    {reading.tenantName}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right font-mono text-slate-600">
                    {reading.previousReading.toFixed(0)}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={reading.currentReading}
                        onChange={(e) =>
                          handleCurrentReadingChange(reading.id, e.target.value)
                        }
                        className="w-24 text-right"
                        autoFocus
                      />
                    ) : (
                      <span
                        className="cursor-pointer font-mono text-slate-600 hover:text-slate-900"
                        onClick={() => setEditingId(reading.id)}
                      >
                        {reading.currentReading.toFixed(0)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right font-mono font-semibold text-slate-900">
                    {consumption.toFixed(0)}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right font-mono text-slate-600">
                    {reading.ratePerUnit.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right font-semibold text-amber-600">
                    ETB {totalCost.toFixed(2)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleGenerateInvoices}
          className="bg-orange-500 hover:bg-orange-600"
          size="lg"
        >
          Generate Utility Invoices
        </Button>
      </div>
    </div>
  )
}
