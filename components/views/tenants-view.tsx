"use client"

import { useMemo, useState } from "react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { tenants } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const leaseOptions = [
  { value: "all", label: "All statuses" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Renewed", label: "Renewed" },
  { value: "Expired", label: "Expired" },
  { value: "Terminated", label: "Terminated" },
]

const paymentOptions = [
  { value: "all", label: "All payments" },
  { value: "Paid", label: "Paid" },
  { value: "Unpaid", label: "Unpaid" },
]

type TenantsViewProps = {
  onSelectTenant?: (id: string) => void
}

export function TenantsView({ onSelectTenant }: TenantsViewProps) {
  const [search, setSearch] = useState("")
  const [lease, setLease] = useState("all")
  const [payment, setPayment] = useState("all")
  const [page, setPage] = useState(1)

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tenants.filter((t) => {
      const fullName = `${t.firstName} ${t.lastName}`.toLowerCase()
      const matchesSearch =
        !q ||
        fullName.includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.companyName.toLowerCase().includes(q) ||
        t.roomNo.toLowerCase().includes(q)
      const matchesLease = lease === "all" || t.lease === lease
      const matchesPayment = payment === "all" || t.payment === payment
      return matchesSearch && matchesLease && matchesPayment
    })
  }, [search, lease, payment])

  return (
    <div className="flex flex-col">
      <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, or company..."
        filters={[
          {
            key: "lease",
            placeholder: "Lease Status",
            value: lease,
            onChange: setLease,
            options: leaseOptions,
          },
          {
            key: "payment",
            placeholder: "Payment Status",
            value: payment,
            onChange: setPayment,
            options: paymentOptions,
          },
        ]}
      />

      <div className="mt-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Tenant
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Company
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Room No.
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Lease Status
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Payment
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr
                key={t.id}
                onClick={() => onSelectTenant?.(t.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSelectTenant?.(t.id)
                  }
                }}
                tabIndex={onSelectTenant ? 0 : -1}
                className="cursor-pointer border-t border-slate-200 transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
              >
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={t.avatar} alt={`${t.firstName} ${t.lastName}`} />
                      <AvatarFallback>{t.firstName[0]}{t.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-900">
                      {t.firstName} {t.lastName}
                    </span>
                  </div>
                </td>
                <td className="py-5 pr-4 text-sm text-slate-700">{t.companyName}</td>
                <td className="py-5 pr-4 text-sm text-slate-700">{t.roomNo}</td>
                <td className="py-5 pr-4">
                  <LeasePill status={t.lease} />
                </td>
                <td className="py-5 pr-4">
                  <PaymentPill status={t.payment} />
                </td>
                <td className="py-5 pr-4 text-sm text-slate-700">{t.phone}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
                  No tenants match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination currentPage={page} totalPages={Math.ceil(tenants.length / 10)} onPageChange={setPage} />
    </div>
  )
}
