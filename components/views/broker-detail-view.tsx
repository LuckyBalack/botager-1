"use client"

import { Star, Phone, Mail, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { BrokerDetail } from "@/lib/data"

type BrokerDetailViewProps = {
  broker: BrokerDetail
  onBack?: () => void
}

export function BrokerDetailView({ broker, onBack }: BrokerDetailViewProps) {
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
            Back to Brokers
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-10 lg:py-8">
        {/* Profile Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="h-32 w-32 rounded-full bg-slate-200 mb-4"></div>
            <h1 className="text-2xl font-bold text-foreground">{broker.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">{broker.phone}</p>
            
            {/* Trust Rating */}
            <div className="flex flex-col items-center gap-2 py-4 border-t border-b border-border w-full">
              <span className="text-sm font-medium text-foreground">Trust Rating</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(broker.trustRating)
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{broker.trustRating}/5.0</span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mt-4 w-full">
              <a
                href={`mailto:${broker.email}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
              <a
                href={`tel:${broker.phone}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </div>
          </div>

          {/* Impact Cards */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">{broker.totalReferrals}</p>
                    <p className="text-xs text-muted-foreground mt-2">Total Referrals</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">{broker.activeTenantsBrought}</p>
                    <p className="text-xs text-muted-foreground mt-2">Active Tenants</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-500">{broker.conversionRate}</p>
                    <p className="text-xs text-muted-foreground mt-2">Conversion</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Assign New Referral
              </Button>
              <Button variant="outline" className="flex-1">
                Pay Commission
              </Button>
            </div>
          </div>
        </div>

        {/* Commission Ledger */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Commission Ledger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Date Referred</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {broker.commissions.map((commission) => (
                    <TableRow key={commission.tenantId}>
                      <TableCell className="font-medium">{commission.tenantName}</TableCell>
                      <TableCell>{commission.roomNumber}</TableCell>
                      <TableCell className="font-semibold text-orange-600">{commission.commissionAmount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{commission.dateReferred}</TableCell>
                      <TableCell>
                        <Badge
                          className={commission.status === "Paid" ? "bg-emerald-100 text-emerald-700 border-none" : "bg-amber-100 text-amber-700 border-none"}
                        >
                          {commission.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
