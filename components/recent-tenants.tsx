"use client"

import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { useMemo } from "react"
import {
  LeasePill,
  PaymentPill,
  type LeaseStatus,
  type PaymentStatus,
} from "@/components/status-pills"
import { useTenants, usePayments, useLeases } from "@/hooks/use-database"

type RecentTenantsProps = {
  buildingId: string | null
  onSeeAll?: () => void
}

export function RecentTenants({ buildingId, onSeeAll }: RecentTenantsProps) {
  const { tenants = [], loading } = useTenants(buildingId)
  const { payments = [] } = usePayments(buildingId)
  const { leases = [] } = useLeases(buildingId)

  // Map tenants with payment and lease status
  const displayTenants = useMemo(() => {
    return tenants
      .slice(0, 5)
      .map((tenant) => {
        const latestPayment = payments
          .filter(p => p.tenant_id === tenant.id)
          .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())
          .at(0)
        
        const activeLease = leases.find(l => l.tenant_id === tenant.id && l.status === 'active')
        
        return {
          id: tenant.id,
          name: tenant.full_name || 'Unknown',
          phone: tenant.phone || '-',
          email: tenant.email || '-',
          roomNo: tenant.room_number || '-',
          payment: (latestPayment?.payment_status === 'paid' ? 'Paid' : 'Unpaid') as PaymentStatus,
          lease: (activeLease?.status === 'active' ? 'Active' : 'Expired') as LeaseStatus,
        }
      })
  }, [tenants, payments, leases])

  if (loading) {
    return (
      <section aria-labelledby="recent-tenants-heading">
        <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse"></div>)}
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="recent-tenants-heading">
      <div className="flex items-center justify-between mb-6">
        <h3 id="recent-tenants-heading" className="text-lg font-semibold text-slate-900">
          Recent Tenants
        </h3>
        <button
          type="button"
          onClick={onSeeAll}
          className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          View All
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {displayTenants.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-500">No tenants found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayTenants.map((tenant) => (
            <div key={tenant.id} className="rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
                    {tenant.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm">{tenant.name}</h4>
                    <div className="mt-1.5 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                        <span>{tenant.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                        <span className="truncate">{tenant.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end flex-shrink-0">
                  <div className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    Room {tenant.roomNo}
                  </div>
                  <div className="flex gap-1.5">
                    <PaymentPill status={tenant.payment} />
                    <LeasePill status={tenant.lease} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
