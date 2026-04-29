"use client"

import { useState } from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

type StaffMember = {
  id: string
  name: string
  email: string
  role: string
  assignedBranch: string
  status: "Active" | "Pending"
}

type Role = {
  id: string
  name: string
  permissions: string[]
}

const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    permissions: ["view_financials", "edit_leases", "approve_credit", "dispatch_work_orders"],
  },
  {
    id: "branch-manager",
    name: "Branch Manager",
    permissions: ["view_financials", "edit_leases", "dispatch_work_orders"],
  },
  {
    id: "accountant",
    name: "Accountant",
    permissions: ["view_financials"],
  },
  {
    id: "maintenance-supervisor",
    name: "Maintenance Supervisor",
    permissions: ["dispatch_work_orders"],
  },
  {
    id: "receptionist",
    name: "Receptionist",
    permissions: [],
  },
]

const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Abebe Kebede",
    email: "abebe@wrm.com",
    role: "Branch Manager",
    assignedBranch: "Zefmesh Mall Only",
    status: "Active",
  },
  {
    id: "2",
    name: "Tigist Haile",
    email: "tigist@wrm.com",
    role: "Accountant",
    assignedBranch: "All Portfolio",
    status: "Active",
  },
  {
    id: "3",
    name: "Dawit Mekonnen",
    email: "dawit@wrm.com",
    role: "Maintenance Supervisor",
    assignedBranch: "Abuki Tower Only",
    status: "Active",
  },
  {
    id: "4",
    name: "Sara Tadesse",
    email: "sara@wrm.com",
    role: "Receptionist",
    assignedBranch: "Zefmesh Mall Only",
    status: "Pending",
  },
]

const permissionLabels: Record<string, string> = {
  view_financials: "Can view financials",
  edit_leases: "Can edit leases",
  approve_credit: "Can approve credit requests",
  dispatch_work_orders: "Can dispatch work orders",
}

function StatusBadge({ status }: { status: "Active" | "Pending" }) {
  const variants = {
    Active: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
  }

  return (
    <Badge className={`${variants[status]} border-none font-medium`}>
      {status}
    </Badge>
  )
}

export function TeamSettingsView() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    view_financials: false,
    edit_leases: false,
    approve_credit: false,
    dispatch_work_orders: false,
  })

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId)
    const role = roles.find((r) => r.id === roleId)
    if (role) {
      setPermissions({
        view_financials: role.permissions.includes("view_financials"),
        edit_leases: role.permissions.includes("edit_leases"),
        approve_credit: role.permissions.includes("approve_credit"),
        dispatch_work_orders: role.permissions.includes("dispatch_work_orders"),
      })
    }
  }

  const handleTogglePermission = (permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }))
  }

  const handleInvite = () => {
    setInviteModalOpen(false)
    toast.success("Invitation Sent", {
      description: `An invitation has been sent to ${inviteEmail}.`,
    })
    setInviteEmail("")
    setInviteName("")
    setSelectedRole("")
    setPermissions({
      view_financials: false,
      edit_leases: false,
      approve_credit: false,
      dispatch_work_orders: false,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Staff & Branch Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage team members, roles, and permissions across your properties
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInviteModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Staff List Table */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">
                Employee Name
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Role/Title
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Assigned Branch/Building
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-slate-100 text-sm font-medium text-slate-600">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">
                        {member.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{member.role}</TableCell>
                <TableCell className="text-slate-600">
                  {member.assignedBranch}
                </TableCell>
                <TableCell>
                  <StatusBadge status={member.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuItem>Change Branch</DropdownMenuItem>
                      <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove Access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Invite Team Member Modal */}
      <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to add a new team member to your organization
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="invite-name">Full Name</Label>
              <Input
                id="invite-name"
                type="text"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Select Role</Label>
              <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRole && (
              <div className="flex flex-col gap-3">
                <Label className="text-slate-700">Permissions</Label>
                <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{label}</span>
                      <Switch
                        checked={permissions[key]}
                        onCheckedChange={() => handleTogglePermission(key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={handleInvite}
              disabled={!inviteEmail || !inviteName || !selectedRole}
              className="w-full rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Invitation
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
