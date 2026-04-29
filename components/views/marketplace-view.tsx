"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Wifi,
  Car,
  Building2,
  Globe,
  ArrowLeft,
  Bell,
  Zap,
  SlidersHorizontal,
  X,
} from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { marketplaceListings, type MarketplaceListing } from "@/lib/data"
import { WorkspaceDetailView } from "./workspace-detail-view"
import { PreoccupyFormView } from "./preoccupy-form-view"

type MarketplaceViewProps = {
  onSignIn?: () => void
  showBackToAdmin?: boolean
  onBackToAdmin?: () => void
}

type MarketplaceSubView = "listings" | "detail" | "preoccupy"

export function MarketplaceView({
  onSignIn,
  showBackToAdmin,
  onBackToAdmin,
}: MarketplaceViewProps) {
  const [subView, setSubView] = useState<MarketplaceSubView>("listings")
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [spaceType, setSpaceType] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sizeRange, setSizeRange] = useState<string>("all")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [language, setLanguage] = useState<"en" | "am">("en")
  const [showAlertForm, setShowAlertForm] = useState(false)
  const [alertEmail, setAlertEmail] = useState("")
  const [alertPhone, setAlertPhone] = useState("")

  const amenitiesList = ["WiFi", "Elevator", "Generator", "Parking"]

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  const filteredListings = marketplaceListings.filter((listing) => {
    const matchesSearch =
      searchQuery === "" ||
      listing.buildingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.subcity.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpaceType =
      spaceType === "all" || listing.spaceType.toLowerCase() === spaceType

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "5k-20k" &&
        listing.monthlyRentNumber >= 5000 &&
        listing.monthlyRentNumber <= 20000) ||
      (priceRange === "20k+" && listing.monthlyRentNumber > 20000)

    const matchesSize =
      sizeRange === "all" ||
      (sizeRange === "small" && parseInt(listing.officeSize) < 20) ||
      (sizeRange === "medium" &&
        parseInt(listing.officeSize) >= 20 &&
        parseInt(listing.officeSize) <= 50) ||
      (sizeRange === "large" && parseInt(listing.officeSize) > 50)

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => listing.amenities.includes(amenity))

    return (
      matchesSearch &&
      matchesSpaceType &&
      matchesPrice &&
      matchesSize &&
      matchesAmenities &&
      listing.listedOnMarketplace
    )
  })

  const handleViewDetails = (listing: MarketplaceListing) => {
    setSelectedListing(listing)
    setSubView("detail")
  }

  const handlePreoccupy = (listing: MarketplaceListing) => {
    setSelectedListing(listing)
    setSubView("preoccupy")
  }

  const handleBackToListings = () => {
    setSubView("listings")
    setSelectedListing(null)
  }

  // Workspace Detail View
  if (subView === "detail" && selectedListing) {
    return (
      <WorkspaceDetailView
        listing={selectedListing}
        onBack={handleBackToListings}
        onPreoccupy={() => handlePreoccupy(selectedListing)}
        onSignIn={onSignIn}
        showBackToAdmin={showBackToAdmin}
        onBackToAdmin={onBackToAdmin}
      />
    )
  }

  // Pre-occupy Form View
  if (subView === "preoccupy" && selectedListing) {
    return (
      <PreoccupyFormView
        listing={selectedListing}
        onBack={() => setSubView("detail")}
        onSignIn={onSignIn}
        showBackToAdmin={showBackToAdmin}
        onBackToAdmin={onBackToAdmin}
      />
    )
  }

  // Main Marketplace Listings View
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
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "EN" : "AM"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("am")}>
                  Amharic
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={onSignIn}>
              {language === "en" ? "Sign In" : "ግባ"}
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              {language === "en" ? "Post a Listing" : "ዝርዝር ያስቀምጡ"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Find Your Perfect Workspace in Addis Ababa
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Browse affordable offices, shops, and commercial spaces across the city
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by location or building name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-base"
              />
            </div>
            <Select value={spaceType} onValueChange={setSpaceType}>
              <SelectTrigger className="h-14 w-full sm:w-[180px]">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="co-working">Co-working</SelectItem>
                <SelectItem value="event space">Event Space</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-14 bg-orange-500 px-8 text-base font-semibold text-white hover:bg-orange-600">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Advanced Filters Bar */}
      <section className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <SlidersHorizontal className="h-4 w-4" />
            Filters:
          </div>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="5k-20k">ETB 5,000 - 20,000</SelectItem>
              <SelectItem value="20k+">ETB 20,000+</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sizeRange} onValueChange={setSizeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">{"Small < 20 sq.m"}</SelectItem>
              <SelectItem value="medium">Medium 20-50 sq.m</SelectItem>
              <SelectItem value="large">{"> 50 sq.m"}</SelectItem>
            </SelectContent>
          </Select>

          {/* Amenities Multi-select */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {selectedAmenities.length > 0
                  ? `${selectedAmenities.length} selected`
                  : "Amenities"}
                <Zap className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-4" align="start">
              <div className="space-y-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {selectedAmenities.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAmenities([])}
              className="text-slate-500"
            >
              Clear filters
              <X className="ml-1 h-4 w-4" />
            </Button>
          )}

          <span className="ml-auto text-sm text-slate-500">
            {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""} found
          </span>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-slate-200">
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="h-16 w-16 text-slate-300" />
                  </div>
                  <Badge className="absolute left-3 top-3 bg-green-500 text-white hover:bg-green-600">
                    Available
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="absolute right-3 top-3 bg-white/90"
                  >
                    {listing.spaceType}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {listing.buildingName} - Room {listing.roomNo}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {listing.subcity}, Addis Ababa
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
                    {listing.amenities.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        +{listing.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-lg font-bold text-slate-900">
                        {listing.monthlyRent}
                      </span>
                      <span className="text-sm text-slate-500">/month</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleViewDetails(listing)}
                    >
                      View Details
                    </Button>
                    <Button
                      className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() => handlePreoccupy(listing)}
                    >
                      Pre-occupy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="py-16 text-center">
              <Building2 className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-medium text-slate-900">
                No listings found
              </h3>
              <p className="mt-2 text-slate-500">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Notification Alert Section */}
      <section className="border-t border-slate-200 bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Bell className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            {"Don't see your perfect space?"}
          </h2>
          <p className="mt-2 text-slate-600">
            Set an alert and {"we'll"} notify you via SMS or Email when a matching
            workspace becomes available.
          </p>

          {!showAlertForm ? (
            <Button
              className="mt-6 bg-orange-500 text-white hover:bg-orange-600"
              onClick={() => setShowAlertForm(true)}
            >
              <Bell className="mr-2 h-4 w-4" />
              Set Up Alert
            </Button>
          ) : (
            <div className="mx-auto mt-6 max-w-md">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="text-left">
                    <Label htmlFor="alert-email">Email Address</Label>
                    <Input
                      id="alert-email"
                      type="email"
                      placeholder="you@example.com"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="text-left">
                    <Label htmlFor="alert-phone">Phone Number (Optional)</Label>
                    <Input
                      id="alert-phone"
                      type="tel"
                      placeholder="+251 9XX XXX XXX"
                      value={alertPhone}
                      onChange={(e) => setAlertPhone(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowAlertForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() => {
                        // In a real app, this would save the alert preferences
                        setShowAlertForm(false)
                        setAlertEmail("")
                        setAlertPhone("")
                      }}
                    >
                      Save Alert
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-500">
          <p>&copy; 2024 Mamulka WRM. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Back to Admin Button */}
      {showBackToAdmin && (
        <button
          type="button"
          onClick={onBackToAdmin}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin Dashboard
        </button>
      )}
    </div>
  )
}
