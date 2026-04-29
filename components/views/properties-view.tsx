"use client"

import { useMemo, useState } from "react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { LeasePill } from "@/components/status-pills"
import { properties, getTenantNameForProperty } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Calculator, DollarSign } from "lucide-react"

const floorOptions = [
  { value: "all", label: "All floors" },
  { value: "2nd", label: "2nd" },
  { value: "3rd", label: "3rd" },
  { value: "4th", label: "4th" },
  { value: "5th", label: "5th" },
]

const leaseOptions = [
  { value: "all", label: "All statuses" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Renewed", label: "Renewed" },
  { value: "Expired", label: "Expired" },
  { value: "Terminated", label: "Terminated" },
]

type PropertiesViewProps = {
  onSelectProperty?: (id: string) => void
}

export function PropertiesView({ onSelectProperty }: PropertiesViewProps) {
  const [search, setSearch] = useState("")
  const [floor, setFloor] = useState("all")
  const [lease, setLease] = useState("all")
  const [page, setPage] = useState(1)
  
  // Pricing Logic State
  const [isDimensionBased, setIsDimensionBased] = useState(false)
  const [fixedRate, setFixedRate] = useState("15000")
  const [pricePerSqMeter, setPricePerSqMeter] = useState("500")
  const [roomSize, setRoomSize] = useState("30") // Default room size in sq.m
  
  // Calculate auto total for dimension-based pricing
  const autoCalculatedTotal = isDimensionBased 
    ? (parseFloat(pricePerSqMeter || "0") * parseFloat(roomSize || "0")).toFixed(2)
    : fixedRate

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return properties.filter((p) => {
      const tenantName = getTenantNameForProperty(p).toLowerCase()
      const matchesSearch =
        !q ||
        p.room.toLowerCase().includes(q) ||
        tenantName.includes(q)
      const matchesFloor = floor === "all" || p.floor === floor
      const matchesLease = lease === "all" || p.lease === lease
      return matchesSearch && matchesFloor && matchesLease
    })
  }, [search, floor, lease])

  return (
    <div className="flex flex-col">
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="properties" className="px-6">Properties</TabsTrigger>
          <TabsTrigger value="pricing" className="px-6">Pricing Logic</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Type a room number or tenant..."
        filters={[
          {
            key: "floor",
            placeholder: "Floor",
            value: floor,
            onChange: setFloor,
            options: floorOptions,
          },
          {
            key: "lease",
            placeholder: "Lease Status",
            value: lease,
            onChange: setLease,
            options: leaseOptions,
          },
        ]}
      />

      <div className="mt-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Room
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Floor
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Square Footage
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Lease Status
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Tenant
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr
                key={p.id}
                onClick={() => onSelectProperty?.(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSelectProperty?.(p.id)
                  }
                }}
                tabIndex={onSelectProperty ? 0 : -1}
                className="cursor-pointer border-t border-slate-200 transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
              >
                <td className="py-5 pr-4 text-sm font-medium text-slate-900">{p.room}</td>
                <td className="py-5 pr-4 text-sm text-slate-700">{p.floor}</td>
                <td className="py-5 pr-4 text-sm text-slate-700">{p.squareFootage}</td>
                <td className="py-5 pr-4">
                  <LeasePill status={p.lease} />
                </td>
                <td className="py-5 pr-4 text-sm font-semibold text-slate-900">
                  {getTenantNameForProperty(p)}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
                  No properties match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination currentPage={page} totalPages={68} onPageChange={setPage} />
        </TabsContent>

        <TabsContent value="pricing">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pricing Mode Selection */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-slate-600" />
                  <CardTitle>Pricing Mode</CardTitle>
                </div>
                <CardDescription>Choose how rent is calculated for properties</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {/* Toggle between Fixed and Dimension-based */}
                <div className="flex flex-col gap-4">
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                      !isDimensionBased ? "border-orange-500 bg-orange-50" : "border-slate-200"
                    }`}
                    onClick={() => setIsDimensionBased(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${!isDimensionBased ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Fixed Rate (Fixed Lease)</p>
                        <p className="text-sm text-slate-500">Set a fixed monthly rent amount</p>
                      </div>
                    </div>
                    <Switch checked={!isDimensionBased} onCheckedChange={(checked) => setIsDimensionBased(!checked)} />
                  </div>

                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                      isDimensionBased ? "border-orange-500 bg-orange-50" : "border-slate-200"
                    }`}
                    onClick={() => setIsDimensionBased(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDimensionBased ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                        <Calculator className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Dimension-Based (Sq. Meter Pricing)</p>
                        <p className="text-sm text-slate-500">Calculate rent based on room size</p>
                      </div>
                    </div>
                    <Switch checked={isDimensionBased} onCheckedChange={setIsDimensionBased} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Configuration */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-slate-600" />
                  <CardTitle>Pricing Configuration</CardTitle>
                </div>
                <CardDescription>
                  {isDimensionBased 
                    ? "Set the price per square meter" 
                    : "Set the fixed monthly rent"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {!isDimensionBased ? (
                  // Fixed Rate Input
                  <div className="grid gap-2">
                    <Label htmlFor="fixed-rate">Fixed Monthly Rent (ETB)</Label>
                    <Input
                      id="fixed-rate"
                      type="number"
                      value={fixedRate}
                      onChange={(e) => setFixedRate(e.target.value)}
                      placeholder="Enter fixed rent amount"
                    />
                  </div>
                ) : (
                  // Dimension-based inputs
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="price-per-sqm">Price per Square Meter (ETB)</Label>
                      <Input
                        id="price-per-sqm"
                        type="number"
                        value={pricePerSqMeter}
                        onChange={(e) => setPricePerSqMeter(e.target.value)}
                        placeholder="Enter price per sq.m"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="room-size">Room Size (sq.m)</Label>
                      <Input
                        id="room-size"
                        type="number"
                        value={roomSize}
                        onChange={(e) => setRoomSize(e.target.value)}
                        placeholder="Enter room size"
                      />
                      <p className="text-xs text-slate-500">This would be auto-filled from property info</p>
                    </div>
                  </>
                )}

                {/* Auto-calculated Total */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        {isDimensionBased ? "Auto-calculated Total" : "Monthly Rent"}
                      </p>
                      {isDimensionBased && (
                        <p className="text-xs text-slate-400 mt-1">
                          {pricePerSqMeter} ETB x {roomSize} sq.m
                        </p>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      ETB {parseFloat(autoCalculatedTotal).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Pricing Summary</CardTitle>
                <CardDescription>Overview of your current pricing configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Pricing Mode</p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">
                      {isDimensionBased ? "Dimension-Based" : "Fixed Rate"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">
                      {isDimensionBased ? "Rate per sq.m" : "Fixed Amount"}
                    </p>
                    <p className="text-lg font-semibold text-slate-900 mt-1">
                      ETB {isDimensionBased ? pricePerSqMeter : fixedRate}
                      {isDimensionBased && <span className="text-sm font-normal text-slate-500">/sq.m</span>}
                    </p>
                  </div>
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <p className="text-sm text-orange-600">Monthly Total</p>
                    <p className="text-lg font-bold text-orange-600 mt-1">
                      ETB {parseFloat(autoCalculatedTotal).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
