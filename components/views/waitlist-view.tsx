"use client"

import { useState, useEffect } from "react"
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
import { useWaitlistLeads } from "@/hooks/use-database"
import { useProperties } from "@/hooks/use-database"

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

export function WaitlistView({
  leads = undefined,
  onInviteToLease,
  onAddLead,
}: WaitlistViewProps) {
  const { properties, loading: propertiesLoading } = useProperties()
  const selectedProperty = properties?.[0]
  const { leads: dbLeads, loading: leadsLoading } = useWaitlistLeads(selectedProperty?.id || null)
  
  const [localLeads, setLocalLeads] = useState<WaitlistLead[]>(leads || [])
  const [statusFilter, setStatusFilter] = useState<string>("All")

  // Sync database leads to local state
  useEffect(() => {
    if (dbLeads && Array.isArray(dbLeads) && dbLeads.length > 0) {
      setLocalLeads(dbLeads)
    } else if (leads) {
      setLocalLeads(leads)
    }
  }, [dbLeads, leads])

  const filteredLeads =
    statusFilter === "All"
      ? localLeads
      : localLeads.filter((lead) => lead.status === statusFilter)

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
    setLocalLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    )
    toast.success("Status updated")
  }

  const handleRemoveLead = (leadId: string, leadName: string) => {
    setLocalLeads((prev) => prev.filter((lead) => lead.id !== leadId))
    toast.success(`${leadName} removed from waitlist`)
  }

  if (propertiesLoading || leadsLoading) {
    return <div className="text-center text-slate-500">Loading waitlist data...</div>
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
