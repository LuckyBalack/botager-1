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
    <section aria-labelledby="recent-tenants-heading" className="mt-10">
      <div className="flex items-center justify-between">
        <h3 id="recent-tenants-heading" className="text-xl font-semibold text-slate-900">
          Recent Tenants
        </h3>
        <button
          type="button"
          onClick={onSeeAll}
          className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          Tenants
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th scope="col" className="py-3 pr-4 text-sm font-semibold text-slate-900">
                Name
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-semibold text-slate-900">
                Contact
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-semibold text-slate-900">
                Room No.
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-semibold text-slate-900">
                Payment Status
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-semibold text-slate-900">
                Lease Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id} className="border-b border-slate-200 last:border-b-0">
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar || "/placeholder.svg"}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                  </div>
                </td>
                <td className="py-5 pr-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Phone className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span>{t.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span>{t.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 pr-4 text-sm text-slate-700">{t.roomNo}</td>
                <td className="py-5 pr-4">
                  <PaymentPill status={t.payment} />
                </td>
                <td className="py-5 pr-4">
                  <LeasePill status={t.lease} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
