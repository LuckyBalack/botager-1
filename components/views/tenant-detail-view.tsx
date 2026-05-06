"use client"

import { FileText, Mail, MapPin, Phone, AlertTriangle } from "lucide-react"
import type { Tenant } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LeaseAgreementCard } from "@/components/lease-agreement-card"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { TenantEmergencyContacts } from "@/components/tenant-emergency-contacts"
import { TenantVerificationStatus } from "@/components/tenant-verification-status"
import { LeaseSummary } from "@/components/lease-summary"

type TenantDetailViewProps = {
  tenant: Tenant
  onTerminateLease?: (tenantId: string) => void
}

export function TenantDetailView({ tenant, onTerminateLease }: TenantDetailViewProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Tenant Info */}
      <div className="space-y-6 lg:col-span-1">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={tenant.avatar} alt={`${tenant.firstName} ${tenant.lastName}`} />
                <AvatarFallback className="text-xl">
                  {tenant.firstName[0]}{tenant.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                {tenant.firstName} {tenant.lastName}
              </h2>
              <p className="text-sm text-slate-500">{tenant.companyName}</p>
              
              <div className="mt-4 flex gap-2">
                <LeasePill status={tenant.lease} />
                <PaymentPill status={tenant.payment} />
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">
                  {tenant.subcity}, {tenant.region}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <TenantEmergencyContacts />

        {/* Documents Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Trade License</p>
                <p className="text-xs text-slate-500">{tenant.tradeLicenseFile}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Lease Agreement</p>
                <p className="text-xs text-slate-500">{tenant.leaseAgreementFile}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Lease Details */}
      <div className="space-y-6 lg:col-span-2">
        <LeaseSummary />
        
        <TenantVerificationStatus />
        
        <LeaseAgreementCard
          leaseStartDate={tenant.leaseStartDate}
          leaseExpirationDate={tenant.leaseExpirationDate}
          lastPayDay={tenant.lastPayDay}
          outstandingBalance={tenant.outstandingBalance}
          leaseDuration={tenant.leaseDuration}
          rentAmount={tenant.rentAmount}
          outstandingBalanceSecondary={tenant.outstandingBalanceSecondary}
          companyName={tenant.companyName}
          leaseAgreementFile={tenant.leaseAgreementFile}
        />

        {/* Property Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Room No.</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.roomNo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Floor</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.floor}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Square Footage</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.squareFootage}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">House No.</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.houseNo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Region</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.region}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Subcity</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.subcity}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Woreda</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.woreda}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">House No.</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.houseNo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terminate Lease Card */}
        {onTerminateLease && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Terminate Lease</p>
                  <p className="text-sm text-slate-500">
                    End the lease and process security deposit settlement
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700"
                onClick={() => onTerminateLease(tenant.id)}
              >
                Terminate Lease
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
