"use client"

import { useMemo, useState } from "react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { LeasePill } from "@/components/status-pills"
import { properties, getTenantNameForProperty, type Property } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calculator, DollarSign, LayoutGrid, List, Building2, User, Download, Trash2, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { ResponsiveTable, HiddenOnMobileCell, HiddenOnMobileHeader } from "@/components/responsive-table"
import { toast } from "sonner"

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
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<Set<string>>(new Set())
  
  // Pricing Logic State
  const [isDimensionBased, setIsDimensionBased] = useState(false)
  const [fixedRate, setFixedRate] = useState("15000")
  const [pricePerSqMeter, setPricePerSqMeter] = useState("500")
  const [roomSize, setRoomSize] = useState("30") // Default room size in sq.m
  
  // Calculate auto total for dimension-based pricing
  const autoCalculatedTotal = isDimensionBased 
    ? (parseFloat(pricePerSqMeter || "0") * parseFloat(roomSize || "0")).toFixed(2)
    : fixedRate

  // Get unit color based on status
  const getUnitColor = (property: Property) => {
    if (property.occupancy === "Vacant") return "bg-slate-200 border-slate-300 text-slate-600"
    if (property.lease === "Expired" || property.lease === "Terminated") 
      return "bg-orange-100 border-orange-400 text-orange-700"
    return "bg-emerald-100 border-emerald-400 text-emerald-700"
  }

  // Get tenant type icon
  const getTenantIcon = (property: Property) => {
    if (property.occupancy === "Vacant") return null
    return <User className="h-3 w-3" />
  }

  // Floor map data structure - organized by floor
  const floorMap = useMemo(() => {
    const floors: Record<string, Property[]> = {}
    properties.forEach((p) => {
      if (!floors[p.floor]) floors[p.floor] = []
      floors[p.floor].push(p)
    })
    return floors
  }, [])

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

  // Bulk action handlers
  const handleSelectAll = () => {
    if (selectedPropertyIds.size === visible.length) {
      setSelectedPropertyIds(new Set())
    } else {
      setSelectedPropertyIds(new Set(visible.map(p => p.id)))
    }
  }

  const handleSelectProperty = (id: string) => {
    const newSelection = new Set(selectedPropertyIds)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedPropertyIds(newSelection)
  }

  const handleExportData = () => {
    const selectedProps = visible.filter(p => selectedPropertyIds.has(p.id))
    const csvContent = [
      ["Room", "Floor", "Tenant", "Lease Status", "Occupancy", "Rent Amount"],
      ...selectedProps.map(p => [
        p.room,
        p.floor,
        getTenantNameForProperty(p),
        p.lease,
        p.occupancy,
        p.rentAmount
      ])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `properties-export-${Date.now()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success("Export Complete", {
      description: `${selectedProps.length} properties exported as CSV`
    })
  }

  const handleBulkDelete = () => {
    toast.success("Properties Deleted", {
      description: `${selectedPropertyIds.size} properties marked for review`
    })
    setSelectedPropertyIds(new Set())
  }

  return (
    <div className="flex flex-col">
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="properties" className="px-6">Properties</TabsTrigger>
          <TabsTrigger value="pricing" className="px-6">Pricing Logic</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          {/* View Toggle */}
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 sm:gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm ${viewMode === "list" ? "bg-slate-900" : ""}`}
              >
                <List className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">List</span>
                <span className="xs:hidden">List</span>
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={`h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm ${viewMode === "map" ? "bg-slate-900" : ""}`}
              >
                <LayoutGrid className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Map</span>
                <span className="xs:hidden">Map</span>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:gap-3 sm:text-sm">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded bg-emerald-400 sm:h-3 sm:w-3" /> Occupied
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded bg-slate-300 sm:h-3 sm:w-3" /> Vacant
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded bg-orange-400 sm:h-3 sm:w-3" /> Expiring
              </span>
            </div>
          </div>

          {viewMode === "list" ? (
            <>
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

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <ResponsiveTable>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th scope="col" className="py-3 pl-4 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Room
                </th>
                <HiddenOnMobileHeader scope="col" hideBelow="sm" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Floor
                </HiddenOnMobileHeader>
                <HiddenOnMobileHeader scope="col" hideBelow="md" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Square Footage
                </HiddenOnMobileHeader>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Status
                </th>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
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
                  <td className="py-4 pl-4 pr-4 sm:py-5">
                    <div className="min-w-0">
                      <span className="block text-xs font-medium text-slate-900 sm:text-sm">{p.room}</span>
                      {/* Show floor on mobile in room cell */}
                      <span className="block text-[10px] text-slate-500 sm:hidden">{p.floor}</span>
                    </div>
                  </td>
                  <HiddenOnMobileCell hideBelow="sm" className="py-4 pr-4 text-xs text-slate-700 sm:py-5 sm:text-sm">
                    {p.floor}
                  </HiddenOnMobileCell>
                  <HiddenOnMobileCell hideBelow="md" className="py-4 pr-4 text-xs text-slate-700 sm:py-5 sm:text-sm">
                    {p.squareFootage}
                  </HiddenOnMobileCell>
                  <td className="py-4 pr-4 sm:py-5">
                    <LeasePill status={p.lease} />
                  </td>
                  <td className="py-4 pr-4 text-xs font-semibold text-slate-900 sm:py-5 sm:text-sm">
                    <span className="block max-w-[100px] truncate sm:max-w-none">
                      {getTenantNameForProperty(p)}
                    </span>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="border-t border-slate-200 py-10 text-center text-xs text-slate-500 sm:text-sm">
                    No properties match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ResponsiveTable>
      </div>

      <TablePagination currentPage={page} totalPages={68} onPageChange={setPage} />
            </>
          ) : (
            /* Map View - Visual Floor Plan */
            <div className="flex flex-col gap-6">
              {Object.entries(floorMap)
                .sort((a, b) => {
                  const floorOrder = ["2nd", "3rd", "4th", "5th", "6th"]
                  return floorOrder.indexOf(a[0]) - floorOrder.indexOf(b[0])
                })
                .map(([floorName, units]) => (
                  <Card key={floorName}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Building2 className="h-4 w-4" />
                        {floorName} Floor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
                        {units.map((unit) => (
                          <Popover key={unit.id}>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className={`flex h-20 flex-col items-center justify-center rounded-lg border-2 p-2 transition-all hover:scale-105 hover:shadow-md ${getUnitColor(unit)}`}
                              >
                                <span className="text-lg font-bold">{unit.room}</span>
                                <span className="flex items-center gap-1 text-xs">
                                  {getTenantIcon(unit)}
                                  <span>
                                    {unit.occupancy === "Vacant" ? "Vacant" : "Occ."}
                                  </span>
                                </span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-slate-900">
                                    Room {unit.room}
                                  </h4>
                                  <LeasePill status={unit.lease} />
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="text-slate-500">Size</p>
                                    <p className="font-medium">{unit.squareFootage}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Floor</p>
                                    <p className="font-medium">{unit.floor}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-slate-500">Tenant</p>
                                    <p className="font-medium">
                                      {getTenantNameForProperty(unit)}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => onSelectProperty?.(unit.id)}
                                  className="w-full"
                                >
                                  View Detail
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
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
