"use client"

import { MapPin, Phone, Star, MapPinIcon, Wifi, Shield, Zap, Coffee, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PublicListingDetail } from "@/lib/data"

type PublicListingDetailViewProps = {
  listing: PublicListingDetail
  onBack?: () => void
}

export function PublicListingDetailView({ listing, onBack }: PublicListingDetailViewProps) {
  // Icon mapping for amenities
  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-6 w-6" aria-hidden="true" />,
    "24/7 Security": <Shield className="h-6 w-6" aria-hidden="true" />,
    "Backup Generator": <Zap className="h-6 w-6" aria-hidden="true" />,
    "Coffee Service": <Coffee className="h-6 w-6" aria-hidden="true" />,
  }

  const averageRating = (
    listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length
  ).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      {onBack && (
        <div className="border-b border-border bg-card px-4 py-3 md:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Marketplace
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 px-4 py-6 md:px-6 lg:px-10 lg:py-8">
        {/* Left Column - Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery - Masonry Grid */}
          <div className="grid grid-cols-2 gap-3 rounded-lg overflow-hidden">
            <div className="col-span-2 h-80 bg-slate-200 rounded-lg"></div>
            {listing.images.slice(1, 4).map((_, idx) => (
              <div key={idx} className="h-32 bg-slate-200 rounded-lg"></div>
            ))}
          </div>

          {/* Breadcrumbs & Title */}
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Marketplace</span>
              <span>›</span>
              <span>{listing.subcity}</span>
              <span>›</span>
              <span>{listing.buildingName}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{listing.buildingName}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {listing.location}
              </span>
              <span>{listing.size}</span>
              <span>{listing.floor}</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed">{listing.description}</p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Workspace Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listing.amenities.map((amenity) => (
                <div key={amenity} className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-muted-foreground mb-2">
                    {amenityIcons[amenity] || <MapPinIcon className="h-6 w-6" aria-hidden="true" />}
                  </div>
                  <span className="text-sm font-medium text-center text-foreground">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Building Features */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Building Features</h2>
            <ul className="grid grid-cols-2 gap-3">
              {listing.buildingFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Renter Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Renter Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{averageRating}</span>
              </div>
            </div>
            <div className="space-y-4">
              {listing.reviews.map((review) => (
                <Card key={review.reviewerName}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{review.reviewerName}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
                    {review.verified && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Verified Tenant
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Location</h2>
            <div className="w-full h-80 rounded-lg bg-slate-100 border border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">{listing.location}</p>
                <p className="text-xs text-muted-foreground mt-1">Map view placeholder</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <Card>
              <CardContent className="pt-6">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Monthly Rent</p>
                  <p className="text-4xl font-bold text-foreground">{listing.monthlyPrice}</p>
                </div>

                {/* Utilities Badge */}
                {listing.includesUtilities && (
                  <Badge className="mb-6 bg-green-100 text-green-700 border-green-300">
                    Includes Utilities
                  </Badge>
                )}

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => console.log("Call property manager")}
                  >
                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                    Call Property Manager
                  </Button>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Apply to Rent / Pre-occupy
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Number:</span>
                    <span className="font-medium text-foreground">{listing.roomNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor:</span>
                    <span className="font-medium text-foreground">{listing.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available:</span>
                    <span className="font-medium text-foreground">{listing.availableDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium text-foreground">{listing.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="font-medium text-foreground">{listing.ownerPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
