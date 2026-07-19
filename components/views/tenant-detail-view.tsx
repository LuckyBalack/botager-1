"use client"

import { useEffect, useState } from "react"
import { FileText, Mail, MapPin, Phone, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LeaseAgreementCard } from "@/components/lease-agreement-card"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { TenantEmergencyContacts } from "@/components/tenant-emergency-contacts"
import { TenantVerificationStatus } from "@/components/tenant-verification-status"
import { LeaseSummary } from "@/components/lease-summary"
import { getTenantWithDetails, getTenantDocuments } from "@/lib/db"
import { toast } from "sonner"

type Tenant = {
  id: string
  full_name: string
  avatar?: string
  company_name?: string
  phone: string
  email: string
  region: string
  subcity: string
  room_number: string
  floor: string
  square_footage: string
  house_number: string
  woreda: string
  lease: string
  payment: string
  lease_start_date: string
  lease_expiration_date: string
  last_pay_day: string
  outstanding_balance: string
  lease_duration: string
  rent_amount: string
  outstanding_balance_secondary: string
  trade_license_file?: string
  lease_agreement_file?: string
}

type TenantDetailViewProps = {
  tenantId: string
  onTerminateLease?: (tenantId: string) => void
}

export function TenantDetailView({ tenantId, onTerminateLease }: TenantDetailViewProps) {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([])

  // Load tenant details and documents
  useEffect(() => {
    if (!tenantId) return

    const loadData = async () => {
      try {
        setLoading(true)
        const [tenantData, docs] = await Promise.all([
          getTenantWithDetails(tenantId),
          getTenantDocuments(tenantId),
        ])
        setTenant(tenantData)
        setDocuments(docs || [])
      } catch (error) {
        console.error("Error loading tenant:", error)
        toast.error("Error loading tenant details")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [tenantId])

  if (loading) {
    return <div className="text-center p-8">Loading tenant details...</div>
  }

  if (!tenant) {
    return <div className="text-center p-8 text-red-600">Tenant not found</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Tenant Info */}
      <div className="space-y-6 lg:col-span-1">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={tenant.avatar} alt={tenant.full_name} />
                <AvatarFallback className="text-xl">
                  {tenant.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                {tenant.full_name}
              </h2>
              <p className="text-sm text-slate-500">{tenant.company_name}</p>
              
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
            {tenant.trade_license_file && (
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Trade License</p>
                  <p className="text-xs text-slate-500">{tenant.trade_license_file}</p>
                </div>
              </div>
            )}
            {tenant.lease_agreement_file && (
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Lease Agreement</p>
                  <p className="text-xs text-slate-500">{tenant.lease_agreement_file}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Lease Details */}
      <div className="space-y-6 lg:col-span-2">
        <LeaseSummary />
        
        <TenantVerificationStatus />
        
        <LeaseAgreementCard
          leaseStartDate={tenant.lease_start_date}
          leaseExpirationDate={tenant.lease_expiration_date}
          lastPayDay={tenant.last_pay_day}
          outstandingBalance={tenant.outstanding_balance}
          leaseDuration={tenant.lease_duration}
          rentAmount={tenant.rent_amount}
          outstandingBalanceSecondary={tenant.outstanding_balance_secondary}
          companyName={tenant.company_name || ""}
          leaseAgreementFile={tenant.lease_agreement_file}
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
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.room_number}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Floor</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.floor}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Square Footage</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.square_footage}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">House No.</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.house_number}</p>
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
                <p className="mt-1 text-sm font-medium text-slate-900">{tenant.house_number}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Verification Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Screening & Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">Background Check</p>
                  <p className="text-sm text-slate-500">Verified - Apr 2024</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-none">Clear</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-900">Employment Verification</p>
                  <p className="text-sm text-slate-500">Verified - Apr 2024</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-none">Verified</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-slate-900">Credit Score Check</p>
                  <p className="text-sm text-slate-500">Pending review</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-700 border-none">Pending</Badge>
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
