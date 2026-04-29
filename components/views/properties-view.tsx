"use client"

import { useMemo, useState } from "react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { LeasePill } from "@/components/status-pills"
import { properties, getTenantNameForProperty } from "@/lib/data"

const floorOptions = [
  { value: "all", label: "All floors" },
  { value: "2nd", label: "2nd" },
  { value: "3rd", label: "3rd" },
  { value: "4th", label: "4th" },
  { value: "5th", label: "5th" },
]

const leaseOptions = [
  { value: "all", label: "All statuses" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Renewed", label: "Renewed" },
  { value: "Expired", label: "Expired" },
  { value: "Terminated", label: "Terminated" },
]

type PropertiesViewProps = {
  onSelectProperty?: (id: string) => void
}

export function PropertiesView({ onSelectProperty }: PropertiesViewProps) {
  const [search, setSearch] = useState("")
  const [floor, setFloor] = useState("all")
  const [lease, setLease] = useState("all")
  const [page, setPage] = useState(1)

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return properties.filter((p) => {
      const tenantName = getTenantNameForProperty(p).toLowerCase()
      const matchesSearch =
        !q ||
        p.room.toLowerCase().includes(q) ||
        tenantName.includes(q)
      const matchesFloor = floor === "all" || p.floor === floor
      const matchesLease = lease === "all" || p.lease === lease
      return matchesSearch && matchesFloor && matchesLease
    })
  }, [search, floor, lease])

  return (
    <div className="flex flex-col">
      <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Type a room number or tenant..."
        filters={[
          {
            key: "floor",
            placeholder: "Floor",
            value: floor,
            onChange: setFloor,
            options: floorOptions,
          },
          {
            key: "lease",
            placeholder: "Lease Status",
            value: lease,
            onChange: setLease,
            options: leaseOptions,
          },
        ]}
      />

      <div className="mt-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Room
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Floor
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Square Footage
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Lease Status
              </th>
              <th scope="col" className="py-3 pr-4 text-sm font-medium text-slate-500">
                Tenant
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr
                key={p.id}
                onClick={() => onSelectProperty?.(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSelectProperty?.(p.id)
                  }
                }}
                tabIndex={onSelectProperty ? 0 : -1}
                className="cursor-pointer border-t border-slate-200 transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
              >
                <td className="py-5 pr-4 text-sm font-medium text-slate-900">{p.room}</td>
                <td className="py-5 pr-4 text-sm text-slate-700">{p.floor}</td>
                <td className="py-5 pr-4 text-sm text-slate-700">{p.squareFootage}</td>
                <td className="py-5 pr-4">
                  <LeasePill status={p.lease} />
                </td>
                <td className="py-5 pr-4 text-sm font-semibold text-slate-900">
                  {getTenantNameForProperty(p)}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
                  No properties match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination currentPage={page} totalPages={68} onPageChange={setPage} />
    </div>
  )
}
