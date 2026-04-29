"use client"

import { LeaseAgreementCard } from "@/components/lease-agreement-card"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { getTenantById, type Property } from "@/lib/data"
import { cn } from "@/lib/utils"

type PropertyDetailViewProps = {
  property: Property
  onTerminate?: () => void
  onExtend?: () => void
}

function ValueChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900",
        className,
      )}
    >
      {children}
    </span>
  )
}

function StatColumn({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}

export function PropertyDetailView({ property, onTerminate, onExtend }: PropertyDetailViewProps) {
  const tenant = property.tenantId ? getTenantById(property.tenantId) : undefined

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-semibold text-slate-900">Property Information</h2>

      {/* Top stat row */}
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        <StatColumn label="Room Number" value={property.room} />
        <StatColumn label="Floor" value={property.floor} />
        <StatColumn label="Size" value={property.squareFootage} />
        <StatColumn label="Rent Number" value={property.rentNumber} />
        <StatColumn label="Status" value={property.occupancy} />
      </div>

      <hr className="border-slate-200" />

      {/* Lease dates + amounts */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-4">
            <span className="text-sm text-slate-500">Lease Start Date:</span>
            <span className="text-sm font-semibold text-slate-900">{property.leaseStartDate}</span>
            <span className="text-sm text-slate-500">Lease Expiration Date:</span>
            <span className="text-sm font-semibold text-slate-900">{property.leaseExpirationDate}</span>
            <span className="text-sm text-slate-500">Last Pay Day</span>
            <span className="text-sm font-semibold text-slate-900">{property.lastPayDay}</span>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">Lease Status</span>
              <LeasePill status={property.lease} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">Payment Status</span>
              <PaymentPill status={property.payment} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-4 self-start">
          <span className="text-sm text-slate-500">Outstanding balance</span>
          <ValueChip>{property.outstandingBalance}</ValueChip>
          <span className="text-sm text-slate-500">Lease Duration</span>
          <ValueChip>{property.leaseDuration}</ValueChip>
          <span className="text-sm text-slate-500">Rent Amount</span>
          <ValueChip>{property.rentAmount}</ValueChip>
          <span className="text-sm text-slate-500">Outstanding balance</span>
          <ValueChip>{property.outstandingBalanceSecondary}</ValueChip>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Company + Tenant + Lease Agreement */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-500">Company Name</span>
              <span className="text-base font-semibold text-slate-900">{property.companyName}</span>
            </div>
            {tenant && (
              <div className="flex items-center gap-3">
                <img
                  src={tenant.avatar || "/placeholder.svg"}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500">Tenant</span>
                  <span className="text-base font-semibold text-slate-900">
                    {tenant.firstName} {tenant.lastName}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold text-slate-900">Lease Agreement</span>
            <LeaseAgreementCard filename={property.leaseAgreementFile} />
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onTerminate}
          className="inline-flex items-center justify-center rounded-md border border-rose-500 bg-white px-6 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          Terminate lease
        </button>
        <button
          type="button"
          onClick={onExtend}
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
        >
          Extend Lease
        </button>
      </div>
    </div>
  )
}
