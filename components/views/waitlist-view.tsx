"use client"

import { useMemo, useState } from "react"
import { Plus, UserPlus } from "lucide-react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { waitlistLeads as initialLeads, type LeadStatus } from "@/lib/data"

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "Contacted", label: "Contacted" },
  { value: "Interested", label: "Interested" },
  { value: "Waiting", label: "Waiting" },
]

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const variants: Record<LeadStatus, string> = {
    Contacted: "bg-blue-100 text-blue-700",
    Interested: "bg-emerald-100 text-emerald-700",
    Waiting: "bg-amber-100 text-amber-700",
  }

  return (
    <Badge className={`${variants[status]} border-none font-medium`}>
      {status}
    </Badge>
  )
}

type WaitlistViewProps = {
  onInviteToLease?: (leadData: {
    name: string
    phone: string
    email: string
  }) => void
}

export function WaitlistView({ onInviteToLease }: WaitlistViewProps) {
  const [leads, setLeads] = useState(initialLeads)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<(typeof leads)[0] | null>(null)

  // New lead form state
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    desiredSize: "",
    budgetRange: "",
    desiredFloor: "",
  })

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leads.filter((lead) => {
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q)
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter, leads])

  const handleAddLead = () => {
    if (newLead.name && newLead.email && newLead.phone) {
      const newLeadEntry = {
        id: `lead-${Date.now()}`,
        ...newLead,
        dateJoined: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "Waiting" as LeadStatus,
      }
      setLeads([newLeadEntry, ...leads])
      setAddLeadModalOpen(false)
      setNewLead({
        name: "",
        phone: "",
        email: "",
        desiredSize: "",
        budgetRange: "",
        desiredFloor: "",
      })
      toast.success("Lead Added", {
        description: `${newLead.name} has been added to the waitlist.`,
      })
    }
  }

  const handleInviteToLease = (lead: (typeof leads)[0]) => {
    setSelectedLead(lead)
    setInviteModalOpen(true)
  }

  const handleConfirmInvite = () => {
    if (selectedLead && onInviteToLease) {
      onInviteToLease({
        name: selectedLead.name,
        phone: selectedLead.phone,
        email: selectedLead.email,
      })
      toast.success("Invitation Sent", {
        description: `${selectedLead.name} has been invited to lease. Add Tenant form opened.`,
      })
    } else {
      toast.success("Invitation Sent", {
        description: `${selectedLead?.name} has been invited to lease.`,
      })
    }
    setInviteModalOpen(false)
    setSelectedLead(null)
  }

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    )
    toast.success("Status Updated", {
      description: `Lead status changed to ${newStatus}.`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Prospective Tenants & Waitlist
          </h1>
          <p className="text-sm text-slate-500">
            Manage leads and prospects before they become tenants
          </p>
        </div>
        <Button
          onClick={() => setAddLeadModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, or phone..."
        filters={[
          {
            key: "status",
            placeholder: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: statusOptions,
          },
        ]}
      />

      {/* Leads Table */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">Lead Name</TableHead>
              <TableHead className="font-semibold text-slate-700">Contact</TableHead>
              <TableHead className="font-semibold text-slate-700">Desired Size</TableHead>
              <TableHead className="font-semibold text-slate-700">Budget Range</TableHead>
              <TableHead className="font-semibold text-slate-700">Desired Floor</TableHead>
              <TableHead className="font-semibold text-slate-700">Date Joined</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium text-slate-900">
                  {lead.name}
                </TableCell>
                <TableCell className="text-slate-600">
                  <div className="flex flex-col">
                    <span className="text-sm">{lead.phone}</span>
                    <span className="text-xs text-slate-500">{lead.email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{lead.desiredSize}</TableCell>
                <TableCell className="text-slate-600">{lead.budgetRange}</TableCell>
                <TableCell className="text-slate-600">{lead.desiredFloor}</TableCell>
                <TableCell className="text-slate-600">{lead.dateJoined}</TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(value) =>
                      handleStatusChange(lead.id, value as LeadStatus)
                    }
                  >
                    <SelectTrigger className="w-28 border-none bg-transparent p-0">
                      <LeadStatusBadge status={lead.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Waiting">Waiting</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInviteToLease(lead)}
                    className="gap-1"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Invite to Lease</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {visible.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No leads match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={page}
        totalPages={Math.ceil(leads.length / 10)}
        onPageChange={setPage}
      />

      {/* Add Lead Modal */}
      <Dialog open={addLeadModalOpen} onOpenChange={setAddLeadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Add a prospective tenant to the waitlist
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="lead-name">Full Name</Label>
              <Input
                id="lead-name"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lead-phone">Phone</Label>
                <Input
                  id="lead-phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  placeholder="+251..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lead-email">Email</Label>
                <Input
                  id="lead-email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lead-size">Desired Size</Label>
                <Input
                  id="lead-size"
                  value={newLead.desiredSize}
                  onChange={(e) =>
                    setNewLead({ ...newLead, desiredSize: e.target.value })
                  }
                  placeholder="e.g., 30 sq.m"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lead-floor">Desired Floor</Label>
                <Input
                  id="lead-floor"
                  value={newLead.desiredFloor}
                  onChange={(e) =>
                    setNewLead({ ...newLead, desiredFloor: e.target.value })
                  }
                  placeholder="e.g., 3rd Floor"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-budget">Budget Range</Label>
              <Input
                id="lead-budget"
                value={newLead.budgetRange}
                onChange={(e) =>
                  setNewLead({ ...newLead, budgetRange: e.target.value })
                }
                placeholder="e.g., ETB 10,000 - 15,000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddLeadModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddLead}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Add Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite to Lease Confirmation Modal */}
      <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to Lease</DialogTitle>
            <DialogDescription>
              Send a lease invitation to this prospective tenant
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="py-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-medium text-slate-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Contact</p>
                    <p className="font-medium text-slate-900">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Desired Size</p>
                    <p className="font-medium text-slate-900">
                      {selectedLead.desiredSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Budget</p>
                    <p className="font-medium text-slate-900">
                      {selectedLead.budgetRange}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                This will open the Add Tenant form with their contact information
                pre-filled.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmInvite}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Proceed to Add Tenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
