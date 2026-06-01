"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, UserPlus, Plus } from "lucide-react"
import { toast } from "sonner"

interface WaitlistLead {
  id: string
  name: string
  phone: string
  email: string
  desiredSize: string
  budgetRange: string
  desiredFloor: string
  dateJoined: string
  status: "Contacted" | "Interested" | "Waiting"
}

interface WaitlistViewProps {
  leads?: WaitlistLead[]
  onInviteToLease?: (leadId: string) => void
  onAddLead?: () => void
}

const mockLeads: WaitlistLead[] = [
  {
    id: "lead-001",
    name: "Aron Tegene",
    phone: "+251912345678",
    email: "aron@example.com",
    desiredSize: "45-55 m²",
    budgetRange: "ETB 8,000 - 12,000",
    desiredFloor: "2nd - 3rd",
    dateJoined: "Apr 10, 2024",
    status: "Interested",
  },
  {
    id: "lead-002",
    name: "Sintayehu Kebede",
    phone: "+251987654321",
    email: "sintayehu@example.com",
    desiredSize: "50-60 m²",
    budgetRange: "ETB 10,000 - 15,000",
    desiredFloor: "4th floor",
    dateJoined: "Apr 8, 2024",
    status: "Contacted",
  },
  {
    id: "lead-003",
    name: "Eliana Tadesse",
    phone: "+251911111111",
    email: "eliana@example.com",
    desiredSize: "40-50 m²",
    budgetRange: "ETB 7,000 - 10,000",
    desiredFloor: "2nd floor",
    dateJoined: "Apr 15, 2024",
    status: "Waiting",
  },
  {
    id: "lead-004",
    name: "Girma Assefa",
    phone: "+251922222222",
    email: "girma@example.com",
    desiredSize: "55-70 m²",
    budgetRange: "ETB 12,000 - 18,000",
    desiredFloor: "3rd - 4th",
    dateJoined: "Apr 5, 2024",
    status: "Interested",
  },
  {
    id: "lead-005",
    name: "Zainab Mustafa",
    phone: "+251933333333",
    email: "zainab@example.com",
    desiredSize: "45-50 m²",
    budgetRange: "ETB 8,500 - 11,000",
    desiredFloor: "Any",
    dateJoined: "Apr 12, 2024",
    status: "Waiting",
  },
]

export function WaitlistView({
  leads = mockLeads,
  onInviteToLease,
  onAddLead,
}: WaitlistViewProps) {
  const [displayLeads, setDisplayLeads] = useState<WaitlistLead[]>(leads)
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Contacted" | "Interested" | "Waiting">(
    "All"
  )

  const filteredLeads =
    selectedStatus === "All"
      ? displayLeads
      : displayLeads.filter((lead) => lead.status === selectedStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Contacted":
        return "bg-blue-100 text-blue-700"
      case "Interested":
        return "bg-emerald-100 text-emerald-700"
      case "Waiting":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const handleInviteToLease = (lead: WaitlistLead) => {
    toast.success("Lead invited to lease!", {
      description: `${lead.name} has been invited. The Add Tenant form is ready.`,
    })
    onInviteToLease?.(lead.id)
  }

  const handleUpdateStatus = (
    leadId: string,
    newStatus: "Contacted" | "Interested" | "Waiting"
  ) => {
    setDisplayLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    )
    toast.success("Status updated")
  }

  const handleRemoveLead = (leadId: string, leadName: string) => {
    setDisplayLeads((prev) => prev.filter((lead) => lead.id !== leadId))
    toast.success(`${leadName} removed from waitlist`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">Prospective Tenants & Waitlist</h1>
          <p className="text-slate-600">
            Manage leads and convert them to active leases
          </p>
        </div>
        <Button
          onClick={onAddLead}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {(["All", "Contacted", "Interested", "Waiting"] as const).map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            onClick={() => setSelectedStatus(status)}
            size="sm"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Total Leads</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{displayLeads.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Contacted</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {displayLeads.filter((l) => l.status === "Contacted").length}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Interested</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            {displayLeads.filter((l) => l.status === "Interested").length}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Waiting</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">
            {displayLeads.filter((l) => l.status === "Waiting").length}
          </p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableHead className="px-6 py-3 text-slate-700">Lead Name</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Contact</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Desired Size</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Budget Range</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Desired Floor</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Date Joined</TableHead>
              <TableHead className="px-6 py-3 text-slate-700">Status</TableHead>
              <TableHead className="px-6 py-3 text-right text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="border-slate-200 hover:bg-slate-50">
                <TableCell className="px-6 py-3 font-semibold text-slate-900">
                  {lead.name}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <div className="text-sm">
                    <p className="text-slate-900 font-medium">{lead.phone}</p>
                    <p className="text-slate-500">{lead.email}</p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-3 text-slate-600">
                  {lead.desiredSize}
                </TableCell>
                <TableCell className="px-6 py-3 text-slate-600">
                  {lead.budgetRange}
                </TableCell>
                <TableCell className="px-6 py-3 text-slate-600">
                  {lead.desiredFloor}
                </TableCell>
                <TableCell className="px-6 py-3 text-slate-600">
                  {lead.dateJoined}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleInviteToLease(lead)}
                      title="Invite to Lease"
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(lead.id, "Contacted")
                          }
                        >
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(lead.id, "Interested")
                          }
                        >
                          Mark as Interested
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(lead.id, "Waiting")}
                        >
                          Mark as Waiting
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            handleRemoveLead(lead.id, lead.name)
                          }
                        >
                          Remove Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredLeads.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-600">No leads found for selected status</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Lead Management Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Update lead status as you communicate with prospects</li>
          <li>• Use "Invite to Lease" to convert interested leads into tenants</li>
          <li>• Keep track of budget ranges to match available units</li>
          <li>• Follow up with "Waiting" status leads for better conversion</li>
        </ul>
      </div>
    </div>
  )
}
