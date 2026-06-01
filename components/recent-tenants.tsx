"use client"

import { ArrowUpRight, Mail, Phone } from "lucide-react"
import {
  LeasePill,
  PaymentPill,
  type LeaseStatus,
  type PaymentStatus,
} from "@/components/status-pills"

type Tenant = {
  id: string
  name: string
  avatar: string
  phone: string
  email: string
  roomNo: string
  payment: PaymentStatus
  lease: LeaseStatus
}

const tenants: Tenant[] = [
  {
    id: "1",
    name: "Alemu Getachew",
    avatar: "/professional-headshot.png",
    phone: "+251 970 74 22 50",
    email: "alemu.gech@gmail.com",
    roomNo: "310",
    payment: "Paid",
    lease: "Expired",
  },
  {
    id: "2",
    name: "Gete Alemayehu",
    avatar: "/professional-woman-headshot.png",
    phone: "+251 970 74 22 50",
    email: "alemu.gech@gmail.com",
    roomNo: "310",
    payment: "Paid",
    lease: "Expired",
  },
]

type RecentTenantsProps = {
  onSeeAll?: () => void
}

export function RecentTenants({ onSeeAll }: RecentTenantsProps) {
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

      <div className="space-y-3">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <img
                  src={tenant.avatar || "/placeholder.svg"}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                />
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
    </section>
  )
}
