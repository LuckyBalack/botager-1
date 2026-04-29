"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Phone,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { MarketplaceListing } from "@/lib/data"

type WorkspaceDetailViewProps = {
  listing: MarketplaceListing
  onBack: () => void
  onPreoccupy: () => void
  onSignIn?: () => void
  showBackToAdmin?: boolean
  onBackToAdmin?: () => void
}

export function WorkspaceDetailView({
  listing,
  onBack,
  onPreoccupy,
  onSignIn,
  showBackToAdmin,
  onBackToAdmin,
}: WorkspaceDetailViewProps) {
  const [language, setLanguage] = useState<"en" | "am">("en")
  const [showPhone, setShowPhone] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const averageRating =
    listing.reviews.length > 0
      ? (
          listing.reviews.reduce((sum, r) => sum + r.rating, 0) /
          listing.reviews.length
        ).toFixed(1)
      : "N/A"

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Public Header */}
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
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold text-slate-900">Mamulka</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          {/* Main Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-200 lg:aspect-[21/9]">
            <div className="flex h-full items-center justify-center">
              <Building2 className="h-24 w-24 text-slate-300" />
            </div>
            <Badge className="absolute left-4 top-4 bg-green-500 text-white">
              Available Now
            </Badge>
            <Badge
              variant="secondary"
              className="absolute right-4 top-4 bg-white/90"
            >
              {listing.spaceType}
            </Badge>

            {/* Navigation arrows */}
            {listing.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {listing.images.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === activeImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {listing.images.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-video w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200 transition-all ${
                  index === activeImageIndex
                    ? "ring-2 ring-orange-500"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex h-full items-center justify-center">
                  <Building2 className="h-8 w-8 text-slate-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {listing.buildingName} - Room {listing.roomNo}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">{listing.officeSize}</Badge>
                <Badge variant="secondary">{listing.floor}</Badge>
                <Badge variant="secondary">{listing.spaceType}</Badge>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  About This Space
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {listing.description}
                </p>
              </CardContent>
            </Card>

            {/* Building Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Building Features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {listing.buildingFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-slate-600"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Amenities
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="py-1.5">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Renter Feedback */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Renter Feedback
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-slate-900">
                      {averageRating}
                    </span>
                    <span className="text-slate-500">
                      ({listing.reviews.length} review
                      {listing.reviews.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                </div>

                {listing.reviews.length > 0 ? (
                  <div className="mt-6 space-y-6">
                    {listing.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">
                              {review.reviewerName.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-900">
                              {review.reviewerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-slate-600">{review.text}</p>
                        <p className="mt-2 text-sm text-slate-400">
                          {review.date}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-slate-500">
                    No reviews yet for this workspace.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Location
                </h2>
                <div className="mt-4 aspect-[16/9] rounded-lg bg-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-500">
                      {listing.location}
                    </p>
                    <p className="text-xs text-slate-400">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sticky Price Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">
                      {listing.monthlyRent}
                    </div>
                    <p className="text-slate-500">per month</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {/* Call Owner Button */}
                    {!showPhone ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowPhone(true)}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call Owner
                      </Button>
                    ) : (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
                        <p className="text-sm text-slate-500">Owner Contact</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {listing.ownerName}
                        </p>
                        <a
                          href={`tel:${listing.ownerPhone}`}
                          className="mt-1 block text-lg font-semibold text-orange-600 hover:underline"
                        >
                          {listing.ownerPhone}
                        </a>
                      </div>
                    )}

                    {/* Pre-occupy Button */}
                    <Button
                      className="w-full bg-orange-500 text-white hover:bg-orange-600"
                      onClick={onPreoccupy}
                    >
                      Pre-occupy Workspace
                    </Button>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-medium text-slate-900">
                      Quick Info
                    </h3>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Size</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.officeSize}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Floor</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.floor}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Type</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.spaceType}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Room</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.roomNo}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

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
