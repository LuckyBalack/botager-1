"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Flame } from "lucide-react"
import type { AuctionListing } from "@/lib/data"

type PlaceBidModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  auction: AuctionListing
  userInfo?: {
    name: string
    email: string
    phone: string
  }
}

type BidStep = 1 | 2 | 3

export function PlaceBidModal({
  open,
  onOpenChange,
  auction,
  userInfo,
}: PlaceBidModalProps) {
  const [currentStep, setCurrentStep] = useState<BidStep>(1)
  const [bidAmount, setBidAmount] = useState("")
  const [autobid, setAutobid] = useState(false)
  const [autobidMax, setAutobidMax] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bidReference, setBidReference] = useState("")

  const minimumBid = auction.currentBid + auction.minimumIncrement
  const bidAmountNum = parseInt(bidAmount) || 0
  const isValidBid =
    bidAmountNum >= minimumBid && bidAmountNum <= minimumBid * 10

  const handleNext = () => {
    if (currentStep === 1 && isValidBid) {
      setCurrentStep(2)
    } else if (currentStep === 2 && agreedToTerms) {
      setCurrentStep(3)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BidStep)
    }
  }

  const handleSubmit = () => {
    // Generate mock bid reference
    const ref = `BID-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    setBidReference(ref)
    setIsSubmitted(true)

    // Auto-close after 3 seconds
    setTimeout(() => {
      resetForm()
      onOpenChange(false)
    }, 3000)
  }

  const resetForm = () => {
    setCurrentStep(1)
    setBidAmount("")
    setAutobid(false)
    setAutobidMax("")
    setAgreedToTerms(false)
    setIsSubmitted(false)
    setBidReference("")
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-6 py-6 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Bid Placed Successfully!
              </h3>
              <p className="mt-2 text-slate-600">
                Your bid has been recorded in the auction system.
              </p>
            </div>

            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-600">Bid Reference</p>
                <p className="mt-1 font-mono font-bold text-slate-900">{bidReference}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Amount</p>
                <p className="mt-1 text-xl font-bold text-orange-600">
                  ETB {bidAmountNum.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Property</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {auction.buildingName} - Room {auction.roomNo}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Keep your bid reference for records. You'll be notified if you're outbid.
            </p>

            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
          <DialogDescription>
            {auction.buildingName} - Room {auction.roomNo}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 rounded-full py-2 text-center text-sm font-semibold transition-all ${
                step === currentStep
                  ? "bg-orange-600 text-white"
                  : step < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-slate-200 text-slate-600"
              }`}
            >
              Step {step}
            </div>
          ))}
        </div>

        {/* Step 1: Bid Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="bg-slate-50">
              <CardContent className="space-y-4 py-6">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Bid</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ETB {auction.currentBid.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Minimum Increment</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ETB {auction.minimumIncrement.toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm font-medium text-slate-600">Minimum Bid Required</p>
                  <p className="text-xl font-bold text-slate-900">
                    ETB {minimumBid.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label htmlFor="bid-amount" className="text-base font-semibold">
                Your Bid Amount (ETB)
              </Label>
              <Input
                id="bid-amount"
                type="number"
                placeholder={`Minimum: ${minimumBid.toLocaleString()}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="mt-2 text-lg"
                min={minimumBid}
                max={minimumBid * 10}
              />
              {bidAmount && !isValidBid && (
                <div className="mt-2 flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">
                    Bid must be at least ETB {minimumBid.toLocaleString()}
                  </span>
                </div>
              )}
              {bidAmount && isValidBid && (
                <div className="mt-2 flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Valid bid amount</span>
                </div>
              )}
            </div>

            <div className="space-y-3 rounded-lg bg-orange-50 p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="autobid"
                  checked={autobid}
                  onCheckedChange={(checked) => setAutobid(checked as boolean)}
                />
                <Label htmlFor="autobid" className="cursor-pointer text-sm font-medium">
                  Enable Auto-bid
                </Label>
              </div>
              {autobid && (
                <div>
                  <Label htmlFor="autobid-max" className="text-sm">
                    Maximum Bid Amount (ETB)
                  </Label>
                  <Input
                    id="autobid-max"
                    type="number"
                    placeholder="Your maximum bid limit"
                    value={autobidMax}
                    onChange={(e) => setAutobidMax(e.target.value)}
                    className="mt-2"
                    min={bidAmountNum || minimumBid}
                  />
                  <p className="mt-1 text-xs text-slate-600">
                    We'll automatically bid on your behalf up to this amount
                  </p>
                </div>
              )}
            </div>

            {/* Bid Summary */}
            <Card>
              <CardContent className="space-y-3 py-6">
                <h4 className="font-semibold text-slate-900">Bid Summary</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Current Bid:</span>
                  <span className="font-semibold text-slate-900">
                    ETB {auction.currentBid.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Your Bid:</span>
                  <span className="font-semibold text-slate-900">
                    ETB {bidAmountNum.toLocaleString() || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Bid Increment:</span>
                  <span className="font-semibold text-slate-900">
                    ETB {(bidAmountNum - auction.currentBid).toLocaleString() || "—"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Bidder Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="bg-slate-50">
              <CardContent className="space-y-4 py-6">
                <h4 className="font-semibold text-slate-900">Your Information</h4>
                <div>
                  <p className="text-sm text-slate-600">Full Name</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {userInfo?.name || "Guest Bidder"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {userInfo?.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {userInfo?.phone || "Not provided"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label
                  htmlFor="terms"
                  className="cursor-pointer text-sm leading-relaxed"
                >
                  I confirm that I am bidding in good faith and agree to the terms and
                  conditions of the auction. I understand that placing a bid constitutes a
                  binding contract to purchase the property.
                </Label>
              </div>
              <p className="text-xs text-slate-600">
                By placing a bid, you agree to our{" "}
                <a href="#" className="text-orange-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 py-6">
                <h4 className="font-semibold text-slate-900">Review Your Bid</h4>

                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Property</span>
                    <span className="font-semibold text-slate-900">
                      {auction.buildingName} - Room {auction.roomNo}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Your Bid</span>
                    <span className="text-xl font-bold text-orange-600">
                      ETB {bidAmountNum.toLocaleString()}
                    </span>
                  </div>
                  {autobid && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Auto-bid Up To</span>
                      <span className="font-semibold text-slate-900">
                        ETB {(parseInt(autobidMax) || 0).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Auction Ends</span>
                    <span className="font-semibold text-slate-900">
                      {new Date(auction.auctionEndsAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
              <Flame className="h-5 w-5 flex-shrink-0 text-blue-600" />
              <p className="text-sm text-blue-900">
                You'll receive notifications if you're outbid. Make sure your contact
                information is up to date.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && !isValidBid}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm & Place Bid
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
