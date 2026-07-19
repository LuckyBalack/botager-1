"use client"

import { useEffect, useState } from "react"
import { Check, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionHeader } from "@/components/section-header"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

type PropertyData = {
  id?: string
  building_id: string
  room_number: string
  floor: string
  square_meters: number
  monthly_rent: number
  occupancy: string
  listing_type: string
  [key: string]: any
}

const FLOORS = ["2nd", "3rd", "4th", "5th"]
const OCCUPANCY_OPTIONS = ["Occupied", "Vacant"]
const PAYMENT_STATUS_OPTIONS = ["Paid", "Unpaid"]
const LEASE_STATUS_OPTIONS = ["Upcoming", "Renewed", "Expired", "Terminated"]

function FieldRow({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-base font-semibold text-slate-900"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

function SuccessBanner({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex">
        <div className="w-1.5 shrink-0 bg-emerald-500" aria-hidden="true" />
        <div className="flex items-center gap-6 px-6 py-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500"
            aria-hidden="true"
          >
            <Check className="h-6 w-6 text-white" strokeWidth={3} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-slate-900">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

type AddPropertyViewProps = {
  buildingId: string | null
  onSubmit?: (property: PropertyData) => void
  onCancel?: () => void
}

export function AddPropertyView({ buildingId, onSubmit, onCancel }: AddPropertyViewProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Basic Info
  const [room, setRoom] = useState("")
  const [floor, setFloor] = useState("2nd")
  const [squareFootage, setSquareFootage] = useState("")
  const [building] = useState("Abuki Bldg.")

  // Occupancy & Lease
  const [occupancy, setOccupancy] = useState<"Occupied" | "Vacant">("Vacant")
  const [lease, setLease] = useState<"Upcoming" | "Renewed" | "Expired" | "Terminated">("Upcoming")
  const [leaseStartDate, setLeaseStartDate] = useState("")
  const [leaseExpirationDate, setLeaseExpirationDate] = useState("")
  const [leaseDuration, setLeaseDuration] = useState("12 Month")

  // Pricing Configuration
  const [isDimensionBased, setIsDimensionBased] = useState(false)
  const [fixedRate, setFixedRate] = useState("15000")
  const [pricePerSqMeter, setPricePerSqMeter] = useState("500")
  const [roomSize, setRoomSize] = useState("")

  // Listing Type Configuration
  const [listingType, setListingType] = useState<"standard" | "auction">("standard")
  const [auctionStartingPrice, setAuctionStartingPrice] = useState("")
  const [auctionDuration, setAuctionDuration] = useState("7")

  // Payment & Additional
  const [payment, setPayment] = useState<"Paid" | "Unpaid">("Paid")
  const [tenantId, setTenantId] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [outstandingBalance, setOutstandingBalance] = useState("ETB 0")

  // Calculate auto total for dimension-based pricing
  const autoCalculatedTotal = isDimensionBased
    ? (parseFloat(pricePerSqMeter || "0") * parseFloat(roomSize || "0")).toFixed(2)
    : fixedRate

  const displayRent = isDimensionBased
    ? `ETB ${autoCalculatedTotal}`
    : `ETB ${fixedRate}`

  // Auto-dismiss the temporary success banner
  useEffect(() => {
    if (!submitted) return
    const timer = window.setTimeout(() => setSubmitted(false), 4000)
    return () => window.clearTimeout(timer)
  }, [submitted])

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}

    if (!room.trim()) newErrors.room = "Room number is required"
    if (!squareFootage.trim()) newErrors.squareFootage = "Square footage is required"
    if (!leaseStartDate) newErrors.leaseStartDate = "Lease start date is required"
    if (!leaseExpirationDate) newErrors.leaseExpirationDate = "Lease expiration date is required"

    if (isDimensionBased) {
      if (!roomSize.trim()) newErrors.roomSize = "Room size is required for dimension-based pricing"
      if (!pricePerSqMeter.trim()) newErrors.pricePerSqMeter = "Price per sq.m is required"
    }

    if (listingType === "auction") {
      if (!auctionStartingPrice.trim()) newErrors.auctionStartingPrice = "Starting bid price is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    if (!buildingId) {
      setError("Building ID is required")
      return
    }

    setLoading(true)

    try {
      // Create the new property
      const newProperty: PropertyData = {
        building_id: buildingId,
        room_number: room,
        floor,
        square_meters: parseFloat(squareFootage),
        monthly_rent: isDimensionBased ? parseFloat(autoCalculatedTotal) : parseFloat(fixedRate),
        occupancy: occupancy.toLowerCase(),
        listing_type: listingType,
        lease_status: lease.toLowerCase(),
        payment_status: payment.toLowerCase(),
        lease_start_date: leaseStartDate,
        lease_end_date: leaseExpirationDate,
        lease_duration: leaseDuration,
        company_name: companyName || null,
        tenant_id: tenantId || null,
      }

      // Save to Supabase
      const { data, error: insertError } = await supabase
        .from("properties")
        .insert([newProperty])
        .select()
        .single()

      if (insertError) throw insertError

      if (onSubmit) {
        onSubmit(data)
      }

      setSubmitted(true)

      // Reset form
      setRoom("")
      setFloor("2nd")
      setSquareFootage("")
      setOccupancy("Vacant")
      setLease("Upcoming")
      setLeaseStartDate("")
      setLeaseExpirationDate("")
      setLeaseDuration("12 Month")
      setIsDimensionBased(false)
      setFixedRate("15000")
      setPricePerSqMeter("500")
      setRoomSize("")
      setListingType("standard")
      setAuctionStartingPrice("")
      setAuctionDuration("7")
      setPayment("Paid")
      setTenantId("")
      setCompanyName("")
      setOutstandingBalance("ETB 0")
      setErrors({})
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add property")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {submitted && (
        <SuccessBanner
          title="Property Added Successfully"
          description={`Room ${room} has been added to the properties list.`}
        />
      )}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl 2xl:text-3xl">Add New Property</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Basic Information */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <SectionHeader title="Basic Information" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-6">
            <FieldRow label="Room Number" htmlFor="room" error={errors.room}>
              <Input
                id="room"
                name="room"
                placeholder="e.g., 405"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className={errors.room ? "border-red-500" : ""}
              />
            </FieldRow>
            <FieldRow label="Floor" htmlFor="floor">
              <Select value={floor} onValueChange={setFloor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  {FLOORS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow label="Square Footage (sq.m)" htmlFor="sqft" error={errors.squareFootage}>
              <Input
                id="sqft"
                name="sqft"
                type="number"
                placeholder="e.g., 30"
                value={squareFootage}
                onChange={(e) => setSquareFootage(e.target.value)}
                className={errors.squareFootage ? "border-red-500" : ""}
              />
            </FieldRow>
            <FieldRow label="Building" htmlFor="building">
              <Input
                id="building"
                name="building"
                disabled
                value={building}
                className="bg-slate-100"
              />
            </FieldRow>
          </div>
        </section>

        {/* Occupancy & Lease */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <SectionHeader title="Occupancy & Lease Details" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-6">
            <FieldRow label="Occupancy Status" htmlFor="occupancy">
              <Select value={occupancy} onValueChange={(v: any) => setOccupancy(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {OCCUPANCY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow label="Lease Status" htmlFor="lease">
              <Select value={lease} onValueChange={(v: any) => setLease(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {LEASE_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow label="Lease Start Date" htmlFor="leaseStart" error={errors.leaseStartDate}>
              <Input
                id="leaseStart"
                name="leaseStart"
                type="date"
                value={leaseStartDate}
                onChange={(e) => setLeaseStartDate(e.target.value)}
                className={errors.leaseStartDate ? "border-red-500" : ""}
              />
            </FieldRow>
            <FieldRow label="Lease Expiration Date" htmlFor="leaseEnd" error={errors.leaseExpirationDate}>
              <Input
                id="leaseEnd"
                name="leaseEnd"
                type="date"
                value={leaseExpirationDate}
                onChange={(e) => setLeaseExpirationDate(e.target.value)}
                className={errors.leaseExpirationDate ? "border-red-500" : ""}
              />
            </FieldRow>
            <FieldRow label="Lease Duration" htmlFor="leaseDuration">
              <Input
                id="leaseDuration"
                name="leaseDuration"
                placeholder="e.g., 12 Month"
                value={leaseDuration}
                onChange={(e) => setLeaseDuration(e.target.value)}
              />
            </FieldRow>
          </div>
        </section>

        {/* Pricing Configuration */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <SectionHeader title="Pricing Configuration" />

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Pricing Mode</CardTitle>
                  <CardDescription>Choose between fixed rate or dimension-based pricing</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${!isDimensionBased ? "text-slate-900" : "text-slate-500"}`}>
                    Fixed Rate
                  </span>
                  <Switch
                    checked={isDimensionBased}
                    onCheckedChange={setIsDimensionBased}
                  />
                  <span className={`text-sm font-medium ${isDimensionBased ? "text-slate-900" : "text-slate-500"}`}>
                    Dimension-Based
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
                {!isDimensionBased ? (
                  <FieldRow label="Fixed Monthly Rent" htmlFor="fixedRate">
                    <Input
                      id="fixedRate"
                      name="fixedRate"
                      type="number"
                      placeholder="e.g., 15000"
                      value={fixedRate}
                      onChange={(e) => setFixedRate(e.target.value)}
                    />
                  </FieldRow>
                ) : (
                  <>
                    <FieldRow label="Price Per Sq.M" htmlFor="pricePerSqm" error={errors.pricePerSqMeter}>
                      <Input
                        id="pricePerSqm"
                        name="pricePerSqm"
                        type="number"
                        placeholder="e.g., 500"
                        value={pricePerSqMeter}
                        onChange={(e) => setPricePerSqMeter(e.target.value)}
                        className={errors.pricePerSqMeter ? "border-red-500" : ""}
                      />
                    </FieldRow>
                    <FieldRow label="Room Size (sq.m)" htmlFor="roomSize" error={errors.roomSize}>
                      <Input
                        id="roomSize"
                        name="roomSize"
                        type="number"
                        placeholder="e.g., 30"
                        value={roomSize}
                        onChange={(e) => setRoomSize(e.target.value)}
                        className={errors.roomSize ? "border-red-500" : ""}
                      />
                    </FieldRow>
                  </>
                )}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold text-slate-900">
                    Calculated Monthly Rent
                  </label>
                  <div className="flex items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900">
                    {displayRent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Listing Type Configuration */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <SectionHeader title="Listing Type Configuration" />

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Listing Type</CardTitle>
                  <CardDescription>Choose standard rental or auction-based listing</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${listingType === "standard" ? "text-slate-900" : "text-slate-500"}`}>
                    Standard
                  </span>
                  <Switch
                    checked={listingType === "auction"}
                    onCheckedChange={(checked) => setListingType(checked ? "auction" : "standard")}
                  />
                  <span className={`text-sm font-medium ${listingType === "auction" ? "text-slate-900" : "text-slate-500"}`}>
                    Auction
                  </span>
                </div>
              </div>
            </CardHeader>
            {listingType === "auction" && (
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
                  <FieldRow label="Starting Bid Price" htmlFor="auctionStart" error={errors.auctionStartingPrice}>
                    <Input
                      id="auctionStart"
                      name="auctionStart"
                      type="number"
                      placeholder="e.g., 12000"
                      value={auctionStartingPrice}
                      onChange={(e) => setAuctionStartingPrice(e.target.value)}
                      className={errors.auctionStartingPrice ? "border-red-500" : ""}
                    />
                  </FieldRow>
                  <FieldRow label="Auction Duration (days)" htmlFor="auctionDuration">
                    <Input
                      id="auctionDuration"
                      name="auctionDuration"
                      type="number"
                      placeholder="e.g., 7"
                      value={auctionDuration}
                      onChange={(e) => setAuctionDuration(e.target.value)}
                    />
                  </FieldRow>
                </div>
              </CardContent>
            )}
          </Card>
        </section>

        {/* Payment & Additional */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <SectionHeader title="Payment & Additional Info" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-6">
            <FieldRow label="Payment Status" htmlFor="payment">
              <Select value={payment} onValueChange={(v: any) => setPayment(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow label="Tenant ID (Optional)" htmlFor="tenantId">
              <Input
                id="tenantId"
                name="tenantId"
                placeholder="e.g., t-alemu"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
              />
            </FieldRow>
            <FieldRow label="Company Name (Optional)" htmlFor="companyName">
              <Input
                id="companyName"
                name="companyName"
                placeholder="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </FieldRow>
            <FieldRow label="Outstanding Balance" htmlFor="balance">
              <Input
                id="balance"
                name="balance"
                placeholder="e.g., ETB 0"
                value={outstandingBalance}
                onChange={(e) => setOutstandingBalance(e.target.value)}
              />
            </FieldRow>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6 sm:pt-8">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Property"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6 py-3"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
