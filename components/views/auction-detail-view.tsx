"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Building2,
  Clock,
  Flame,
  Phone,
  MapPin,
  Wifi,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AuctionListing } from "@/lib/data"
import { getMarketplaceListingsByBuilding } from "@/lib/db"

type AuctionDetailViewProps = {
  auction?: AuctionListing
  buildingId?: string
  onBack: () => void
  onPlaceBid: () => void
  onSignIn?: () => void
  showBackToAdmin?: boolean
  onBackToAdmin?: () => void
}

function formatTimeRemaining(endTime: string): { text: string; color: string } {
  const end = new Date(endTime).getTime()
  const now = new Date().getTime()
  const diff = end - now

  if (diff <= 0) {
    return { text: "Auction Ended", color: "text-red-600" }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  let text = ""
  if (days > 0) text += `${days}d `
  text += `${hours}h ${minutes}m ${seconds}s`

  let color = "text-green-600"
  if (diff < 3600000) color = "text-red-600"
  else if (diff < 86400000) color = "text-orange-600"
  else if (diff < 86400000 * 2) color = "text-yellow-600"

  return { text, color }
}

function getRelativeTime(timestamp: string): string {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = now.getTime() - time.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function AuctionDetailView({
  auction: initialAuction,
  buildingId,
  onBack,
  onPlaceBid,
  onSignIn,
  showBackToAdmin,
  onBackToAdmin,
}: AuctionDetailViewProps) {
  const [auction, setAuction] = useState(initialAuction)
  const [loading, setLoading] = useState(buildingId && !initialAuction)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(() =>
    auction ? formatTimeRemaining(auction.auctionEndsAt) : { text: "Loading...", color: "text-gray-600" }
  )

  useEffect(() => {
    if (buildingId && !initialAuction) {
      loadAuction()
    }
  }, [buildingId, initialAuction])

  async function loadAuction() {
    if (!buildingId) return
    try {
      const listings = await getMarketplaceListingsByBuilding(buildingId)
      const auctionListing = listings?.find((l: any) => l.is_auction)
      if (auctionListing) {
        setAuction({
          id: auctionListing.id,
          title: auctionListing.building_name,
          description: auctionListing.description,
          currentBid: auctionListing.current_bid || auctionListing.price,
          minimumBid: auctionListing.price,
          auctionEndsAt: auctionListing.auction_end_time || new Date().toISOString(),
          images: auctionListing.images || [],
          amenities: auctionListing.amenities || [],
          location: auctionListing.location,
          contact: auctionListing.contact || "N/A",
        } as AuctionListing)
      }
    } catch (error) {
      console.error("Error loading auction:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(auction.auctionEndsAt))
    }, 1000)

    return () => clearInterval(interval)
  }, [auction.auctionEndsAt])

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? 0 : prev - 1))
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading auction details...</p>
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Auction not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Button>
          </div>
          <div className="flex items-center gap-4">
            {showBackToAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToAdmin}
              >
                Back to Admin
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column - Images */}
          <div className="md:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-200">
              <div className="flex h-full items-center justify-center">
                <Building2 className="h-32 w-32 text-slate-300" />
              </div>

              {/* Badges */}
              <Badge className="absolute left-4 top-4 gap-2 bg-orange-500 text-white hover:bg-orange-600">
                <Flame className="h-4 w-4" />
                Live Auction
              </Badge>

              <Badge
                variant="secondary"
                className={`absolute right-4 top-4 bg-white/90 text-sm font-semibold ${timeRemaining.color}`}
              >
                {timeRemaining.text}
              </Badge>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Auction Details Card */}
            <Card>
              <CardContent className="space-y-6 py-6">
                {/* Title and Location */}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    {auction.buildingName} - Room {auction.roomNo}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-slate-600">
                    <MapPin className="h-5 w-5" />
                    {auction.location}
                  </p>
                </div>

                {/* Bid Information */}
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-orange-50 p-4">
                      <p className="text-sm font-medium text-slate-600">Current Bid</p>
                      <p className="mt-2 text-3xl font-bold text-orange-600">
                        ETB {auction.currentBid.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {auction.totalBids} bids placed
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-100 p-4">
                      <p className="text-sm font-medium text-slate-600">Starting Bid</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        ETB {auction.startingBid.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Minimum increment: ETB {auction.minimumIncrement.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600">Highest Bidder</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {auction.highestBidder}
                    </p>
                  </div>
                </div>

                {/* Property Specifications */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Floor</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{auction.floor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Size</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{auction.officeSize}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Type</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{auction.spaceType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Ends</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {new Date(auction.auctionEndsAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-slate-900">Description</h3>
                  <p className="mt-2 text-slate-600">{auction.description}</p>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-slate-900">Amenities</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {auction.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="gap-2">
                        {amenity === "WiFi" && <Wifi className="h-3 w-3" />}
                        {amenity === "Parking" && <Car className="h-3 w-3" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Building Features */}
                <div>
                  <h3 className="font-semibold text-slate-900">Building Features</h3>
                  <ul className="mt-3 space-y-2">
                    {(auction.buildingFeatures || []).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Location Map */}
                <div>
                  <h3 className="font-semibold text-slate-900">Location</h3>
                  <div className="mt-4 aspect-[16/9] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-300">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-slate-400" />
                      <p className="mt-2 text-sm font-medium text-slate-600">
                        {auction.location}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Map integration coming soon
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bid History */}
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Bid History ({auction.bidHistory?.length || 0} bids)
                  </h3>
                  <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                    {(auction.bidHistory || []).map((bid) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{bid.bidderName}</p>
                          <p className="text-xs text-slate-500">{getRelativeTime(bid.placedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">
                            ETB {bid.amount.toLocaleString()}
                          </p>
                          {bid.status === "current" && (
                            <Badge className="mt-1 bg-orange-500 text-white hover:bg-orange-600 text-xs">
                              Highest
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Owner Contact & CTA */}
          <div className="space-y-6">
            {/* Owner Contact Card */}
            <Card>
              <CardContent className="space-y-4 py-6">
                <h3 className="font-semibold text-slate-900">Auction Details</h3>
                
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Owner</p>
                  <p className="mt-1 font-semibold text-slate-900">{auction.ownerName}</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Contact</p>
                  <a
                    href={`tel:${auction.ownerPhone}`}
                    className="mt-1 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    <Phone className="h-4 w-4" />
                    {auction.ownerPhone}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Auction Status</p>
                  <p className="mt-1">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                      {auction.auctionStatus === "live" ? "Live" : auction.auctionStatus === "ending-soon" ? "Ending Soon" : "Ended"}
                    </Badge>
                  </p>
                </div>

                {auction.reservePrice && (
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">Reserve Price</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      ETB {auction.reservePrice.toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Place Bid Button */}
            <Button
              onClick={onPlaceBid}
              className="w-full bg-orange-600 py-6 text-lg font-semibold text-white hover:bg-orange-700"
            >
              <Flame className="mr-2 h-5 w-5" />
              Place a Bid
            </Button>

            {/* Sign In Prompt */}
            {onSignIn && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="py-4">
                  <p className="text-sm text-slate-600">
                    New to auctions?
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={onSignIn}
                  >
                    Sign In to Bid
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
