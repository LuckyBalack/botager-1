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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Flame, TrendingUp, CheckCircle2, Clock, X } from "lucide-react"

type UserBid = {
  id: string
  auctionId: string
  propertyName: string
  bidAmount: number
  placedAt: string
  status: "winning" | "outbid" | "ended"
  currentHighBid?: number
  auctionEndsAt?: string
}

type BidHistoryModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userBids?: UserBid[]
  onViewAuction?: (auctionId: string) => void
  onPlaceNewBid?: (auctionId: string) => void
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

// Mock data for demo
const mockActiveBids: UserBid[] = [
  {
    id: "bid-1",
    auctionId: "auction-001",
    propertyName: "Synergy Tower - Room 601",
    bidAmount: 28500,
    placedAt: "2024-05-14T10:45:00",
    status: "winning",
    currentHighBid: 28500,
    auctionEndsAt: "2024-05-15T14:30:00",
  },
  {
    id: "bid-2",
    auctionId: "auction-003",
    propertyName: "Silver Plaza - Room 205",
    bidAmount: 20000,
    placedAt: "2024-05-14T14:20:00",
    status: "outbid",
    currentHighBid: 20500,
    auctionEndsAt: "2024-05-17T11:20:00",
  },
]

const mockBidHistory: UserBid[] = [
  ...mockActiveBids,
  {
    id: "bid-3",
    auctionId: "auction-999",
    propertyName: "Downtown Plaza - Room 101",
    bidAmount: 15000,
    placedAt: "2024-05-10T09:00:00",
    status: "ended",
    currentHighBid: 16500,
  },
  {
    id: "bid-4",
    auctionId: "auction-998",
    propertyName: "Business Hub - Room 305",
    bidAmount: 22000,
    placedAt: "2024-05-08T15:30:00",
    status: "ended",
    currentHighBid: 22000,
  },
]

export function BidHistoryModal({
  open,
  onOpenChange,
  userBids = mockActiveBids,
  onViewAuction,
  onPlaceNewBid,
}: BidHistoryModalProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredActiveBids =
    statusFilter === "all"
      ? mockActiveBids
      : mockActiveBids.filter((bid) => bid.status === statusFilter)

  const filteredHistory =
    statusFilter === "all"
      ? mockBidHistory
      : mockBidHistory.filter((bid) => bid.status === statusFilter)

  const getStatusBadge = (status: UserBid["status"]) => {
    switch (status) {
      case "winning":
        return (
          <Badge className="gap-1 bg-green-600 text-white hover:bg-green-700">
            <TrendingUp className="h-3 w-3" />
            Winning
          </Badge>
        )
      case "outbid":
        return (
          <Badge className="gap-1 bg-orange-600 text-white hover:bg-orange-700">
            <Flame className="h-3 w-3" />
            Outbid
          </Badge>
        )
      case "ended":
        return (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Ended
          </Badge>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Bids</DialogTitle>
          <DialogDescription>
            Track your active auctions and bid history
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="gap-2">
              <Flame className="h-4 w-4" />
              Active Auctions
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              All History
            </TabsTrigger>
          </TabsList>

          {/* Active Auctions Tab */}
          <TabsContent value="active" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="winning">Winning</SelectItem>
                  <SelectItem value="outbid">Outbid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bids List */}
            <div className="space-y-3">
              {filteredActiveBids.length > 0 ? (
                filteredActiveBids.map((bid) => (
                  <Card key={bid.id}>
                    <CardContent className="py-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold text-slate-900">
                            {bid.propertyName}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Bid placed {getRelativeTime(bid.placedAt)}
                          </p>

                          <div className="flex flex-wrap gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Your Bid</p>
                              <p className="font-bold text-orange-600">
                                ETB {bid.bidAmount.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">
                                Current Highest
                              </p>
                              <p className="font-bold text-slate-900">
                                ETB{" "}
                                {(bid.currentHighBid || bid.bidAmount).toLocaleString()}
                              </p>
                            </div>
                            {bid.auctionEndsAt && (
                              <div>
                                <p className="text-xs text-slate-500">Ends</p>
                                <p className="font-semibold text-slate-900">
                                  {new Date(bid.auctionEndsAt).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:items-end">
                          {getStatusBadge(bid.status)}

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onViewAuction?.(bid.auctionId)
                              }
                            >
                              View Auction
                            </Button>
                            {bid.status !== "ended" && (
                              <Button
                                size="sm"
                                className="bg-orange-600 hover:bg-orange-700"
                                onClick={() =>
                                  onPlaceNewBid?.(bid.auctionId)
                                }
                              >
                                Bid Again
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Flame className="mx-auto h-12 w-12 text-slate-300" />
                    <h3 className="mt-4 font-semibold text-slate-900">
                      No Active Bids
                    </h3>
                    <p className="mt-1 text-slate-600">
                      You don't have any active auction bids at the moment
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="winning">Winning</SelectItem>
                  <SelectItem value="outbid">Outbid</SelectItem>
                  <SelectItem value="ended">Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* History List */}
            <div className="space-y-3">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((bid) => (
                  <Card key={bid.id}>
                    <CardContent className="py-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold text-slate-900">
                            {bid.propertyName}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Bid placed {getRelativeTime(bid.placedAt)}
                          </p>

                          <div className="flex flex-wrap gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Your Bid</p>
                              <p className="font-bold text-orange-600">
                                ETB {bid.bidAmount.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">
                                Final Bid
                              </p>
                              <p className="font-bold text-slate-900">
                                ETB{" "}
                                {(bid.currentHighBid || bid.bidAmount).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:items-end">
                          {getStatusBadge(bid.status)}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewAuction?.(bid.auctionId)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="mx-auto h-12 w-12 text-slate-300" />
                    <h3 className="mt-4 font-semibold text-slate-900">
                      No Bid History
                    </h3>
                    <p className="mt-1 text-slate-600">
                      You haven't placed any bids yet
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
