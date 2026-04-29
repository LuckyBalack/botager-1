"use client"

import { useMemo, useState } from "react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { tenants } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResponsiveTable, HiddenOnMobileCell, HiddenOnMobileHeader } from "@/components/responsive-table"

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

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <ResponsiveTable>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th scope="col" className="py-3 pr-4 pl-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Tenant
                </th>
                <HiddenOnMobileHeader scope="col" hideBelow="md" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Company
                </HiddenOnMobileHeader>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Room
                </th>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Lease
                </th>
                <HiddenOnMobileHeader scope="col" hideBelow="sm" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Payment
                </HiddenOnMobileHeader>
                <HiddenOnMobileHeader scope="col" hideBelow="lg" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Contact
                </HiddenOnMobileHeader>
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
                  <td className="py-4 pr-4 pl-4 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                        <AvatarImage src={t.avatar} alt={`${t.firstName} ${t.lastName}`} />
                        <AvatarFallback className="text-xs sm:text-sm">{t.firstName[0]}{t.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <span className="block truncate text-xs font-medium text-slate-900 sm:text-sm">
                          {t.firstName} {t.lastName}
                        </span>
                        {/* Show company on mobile in the name cell */}
                        <span className="block truncate text-[10px] text-slate-500 md:hidden">
                          {t.companyName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <HiddenOnMobileCell hideBelow="md" className="py-4 pr-4 text-xs text-slate-700 sm:py-5 sm:text-sm">
                    {t.companyName}
                  </HiddenOnMobileCell>
                  <td className="py-4 pr-4 text-xs text-slate-700 sm:py-5 sm:text-sm">{t.roomNo}</td>
                  <td className="py-4 pr-4 sm:py-5">
                    <LeasePill status={t.lease} />
                  </td>
                  <HiddenOnMobileCell hideBelow="sm" className="py-4 pr-4 sm:py-5">
                    <PaymentPill status={t.payment} />
                  </HiddenOnMobileCell>
                  <HiddenOnMobileCell hideBelow="lg" className="py-4 pr-4 text-xs text-slate-700 sm:py-5 sm:text-sm">
                    {t.phone}
                  </HiddenOnMobileCell>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} className="border-t border-slate-200 py-10 text-center text-xs text-slate-500 sm:text-sm">
                    No tenants match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ResponsiveTable>
      </div>

      <TablePagination currentPage={page} totalPages={Math.ceil(tenants.length / 10)} onPageChange={setPage} />
    </div>
  )
}
