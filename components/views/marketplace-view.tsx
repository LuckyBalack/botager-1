"use client"

import { useState } from "react"
import { Search, MapPin, Wifi, Car, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { marketplaceListings } from "@/lib/data"

type MarketplaceViewProps = {
  onSignIn?: () => void
}

export function MarketplaceView({ onSignIn }: MarketplaceViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [squareMeters, setSquareMeters] = useState<string>("all")
  const [amenities, setAmenities] = useState<string>("all")

  const filteredListings = marketplaceListings.filter((listing) => {
    const matchesSearch =
      searchQuery === "" ||
      listing.buildingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-10k" && parseInt(listing.monthlyRent.replace(/[^0-9]/g, "")) < 10000) ||
      (priceRange === "10k-20k" &&
        parseInt(listing.monthlyRent.replace(/[^0-9]/g, "")) >= 10000 &&
        parseInt(listing.monthlyRent.replace(/[^0-9]/g, "")) <= 20000) ||
      (priceRange === "over-20k" && parseInt(listing.monthlyRent.replace(/[^0-9]/g, "")) > 20000)

    const matchesSize =
      squareMeters === "all" ||
      (squareMeters === "under-20" && parseInt(listing.officeSize) < 20) ||
      (squareMeters === "20-40" && parseInt(listing.officeSize) >= 20 && parseInt(listing.officeSize) <= 40) ||
      (squareMeters === "over-40" && parseInt(listing.officeSize) > 40)

    const matchesAmenities =
      amenities === "all" ||
      (amenities === "wifi" && listing.amenities.includes("WiFi")) ||
      (amenities === "parking" && listing.amenities.includes("Parking"))

    return matchesSearch && matchesPrice && matchesSize && matchesAmenities
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Public Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-orange-500" />
            <div>
              <span className="text-xl font-bold text-slate-900">Mamulka</span>
              <span className="ml-1 text-sm text-slate-500">/ WRM</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onSignIn}>
              Sign In
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Post a Listing
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Find Your Perfect Workspace
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Browse affordable offices and commercial spaces across Addis Ababa
          </p>

          <div className="mt-8 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by location, building, or size..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-base"
              />
            </div>
            <Button className="h-14 bg-orange-500 px-8 text-base font-semibold text-white hover:bg-orange-600">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="office">Office Space</SelectItem>
              <SelectItem value="retail">Retail Shop</SelectItem>
              <SelectItem value="warehouse">Warehouse</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under-10k">Under ETB 10,000</SelectItem>
              <SelectItem value="10k-20k">ETB 10,000 - 20,000</SelectItem>
              <SelectItem value="over-20k">Over ETB 20,000</SelectItem>
            </SelectContent>
          </Select>

          <Select value={squareMeters} onValueChange={setSquareMeters}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Square Meters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="under-20">Under 20 sq.m</SelectItem>
              <SelectItem value="20-40">20 - 40 sq.m</SelectItem>
              <SelectItem value="over-40">Over 40 sq.m</SelectItem>
            </SelectContent>
          </Select>

          <Select value={amenities} onValueChange={setAmenities}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Amenities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Amenities</SelectItem>
              <SelectItem value="wifi">WiFi</SelectItem>
              <SelectItem value="parking">Parking</SelectItem>
            </SelectContent>
          </Select>

          <span className="ml-auto text-sm text-slate-500">
            {filteredListings.length} listings found
          </span>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-[16/10] bg-slate-200">
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="h-16 w-16 text-slate-300" />
                  </div>
                  <Badge className="absolute left-3 top-3 bg-green-500 text-white hover:bg-green-600">
                    Available Now
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{listing.buildingName}</h3>
                      <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {listing.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
                    <span>{listing.officeSize}</span>
                    <span className="text-slate-300">|</span>
                    <span>{listing.floor}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {listing.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {amenity === "WiFi" && <Wifi className="h-3 w-3" />}
                        {amenity === "Parking" && <Car className="h-3 w-3" />}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-lg font-bold text-slate-900">{listing.monthlyRent}</span>
                    <span className="text-xs text-slate-500">/month</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-orange-500 text-white hover:bg-orange-600">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
