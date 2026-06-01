"use client"

import { useMemo, useState } from "react"
import { ListToolbar } from "@/components/list-toolbar"
import { TablePagination } from "@/components/table-pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResponsiveTable, HiddenOnMobileCell, HiddenOnMobileHeader } from "@/components/responsive-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"

// Mock data for lease applications
const leaseApplications = [
  {
    id: "app-001",
    applicantName: "Ahmed Hassan",
    applicantEmail: "ahmed@example.com",
    roomNo: "301",
    applicationType: "standard",
    proposedRent: "15000",
    highBid: null,
    status: "pending",
    submittedDate: "2026-05-28",
    applicationDays: 2
  },
  {
    id: "app-002",
    applicantName: "Fatima Abdi",
    applicantEmail: "fatima@example.com",
    roomNo: "302",
    applicationType: "auction",
    proposedRent: "16500",
    highBid: "17000",
    status: "bidding",
    submittedDate: "2026-05-25",
    applicationDays: 5,
    auctionEndsIn: "2 days"
  },
  {
    id: "app-003",
    applicantName: "Mohamed Ali",
    applicantEmail: "mohamed@example.com",
    roomNo: "303",
    applicationType: "auction",
    proposedRent: "14000",
    highBid: "18200",
    status: "bidding",
    submittedDate: "2026-05-26",
    applicationDays: 4,
    auctionEndsIn: "1 day"
  },
  {
    id: "app-004",
    applicantName: "Zainab Mohamed",
    applicantEmail: "zainab@example.com",
    roomNo: "304",
    applicationType: "standard",
    proposedRent: "12000",
    highBid: null,
    status: "approved",
    submittedDate: "2026-05-20",
    applicationDays: 9
  },
]

const applicationTypeOptions = [
  { value: "all", label: "All types" },
  { value: "standard", label: "Standard" },
  { value: "auction", label: "Auction/Bidding" },
]

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending Review" },
  { value: "bidding", label: "Active Bidding" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

type LeaseApplicationsProps = {
  onReview?: (appId: string) => void
}

export function LeaseApplicationsComponent({ onReview }: LeaseApplicationsProps) {
  const [search, setSearch] = useState("")
  const [applicationType, setApplicationType] = useState("all")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)
  const [selectedApp, setSelectedApp] = useState<typeof leaseApplications[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leaseApplications.filter((app) => {
      const matchesSearch =
        !q ||
        app.applicantName.toLowerCase().includes(q) ||
        app.applicantEmail.toLowerCase().includes(q) ||
        app.roomNo.toLowerCase().includes(q)
      const matchesType = applicationType === "all" || app.applicationType === applicationType
      const matchesStatus = status === "all" || app.status === status
      return matchesSearch && matchesType && matchesStatus
    })
  }, [search, applicationType, status])

  const handleReview = (app: typeof leaseApplications[0]) => {
    setSelectedApp(app)
    setDialogOpen(true)
    onReview?.(app.id)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "bidding":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getApplicationTypeBadgeColor = (type: string) => {
    return type === "auction" ? "bg-orange-100 text-orange-800" : "bg-slate-100 text-slate-800"
  }

  return (
    <div className="flex flex-col">
      <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by applicant name, email, or room..."
        filters={[
          {
            key: "type",
            placeholder: "Application Type",
            value: applicationType,
            onChange: setApplicationType,
            options: applicationTypeOptions,
          },
          {
            key: "status",
            placeholder: "Status",
            value: status,
            onChange: setStatus,
            options: statusOptions,
          },
        ]}
      />

      <div className="mt-6 sm:mt-8 lg:mt-10">
        <ResponsiveTable>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th scope="col" className="py-3 pr-4 pl-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Applicant
                </th>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Room
                </th>
                <HiddenOnMobileHeader scope="col" hideBelow="sm" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Type
                </HiddenOnMobileHeader>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Amount
                </th>
                <HiddenOnMobileHeader scope="col" hideBelow="md" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Status
                </HiddenOnMobileHeader>
                <th scope="col" className="py-3 pr-4 text-xs font-medium text-slate-500 sm:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-slate-200 transition-colors hover:bg-slate-50"
                >
                  <td className="py-4 pl-4 pr-4 sm:py-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${app.applicantName}`} />
                        <AvatarFallback>{app.applicantName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="block text-xs font-medium text-slate-900 sm:text-sm">{app.applicantName}</p>
                        <p className="block text-[10px] text-slate-500 sm:text-xs truncate">{app.applicantEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-xs font-semibold text-slate-900 sm:py-5 sm:text-sm">
                    {app.roomNo}
                  </td>
                  <HiddenOnMobileCell hideBelow="sm" className="py-4 pr-4 sm:py-5">
                    <Badge className={getApplicationTypeBadgeColor(app.applicationType)}>
                      {app.applicationType === "auction" ? "Auction" : "Standard"}
                    </Badge>
                  </HiddenOnMobileCell>
                  <td className="py-4 pr-4 text-xs font-semibold text-slate-900 sm:py-5 sm:text-sm">
                    <div className="flex flex-col gap-1">
                      <span>ETB {app.highBid || app.proposedRent}</span>
                      {app.highBid && (
                        <span className="text-[10px] text-slate-500">Bid: ETB {app.highBid}</span>
                      )}
                    </div>
                  </td>
                  <HiddenOnMobileCell hideBelow="md" className="py-4 pr-4 sm:py-5">
                    <Badge className={getStatusBadgeColor(app.status)}>
                      {app.status === "pending" && "Pending"}
                      {app.status === "bidding" && "Active Bidding"}
                      {app.status === "approved" && "Approved"}
                      {app.status === "rejected" && "Rejected"}
                    </Badge>
                  </HiddenOnMobileCell>
                  <td className="py-4 pr-4 sm:py-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReview(app)}>
                          Review Application
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Bid History</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} className="border-t border-slate-200 py-10 text-center text-xs text-slate-500 sm:text-sm">
                    No lease applications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ResponsiveTable>
      </div>

      <TablePagination currentPage={page} totalPages={1} onPageChange={setPage} />

      {/* Application Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedApp?.applicationType === "auction" ? "Auction Application Review" : "Standard Application Review"}
            </DialogTitle>
            <DialogDescription>
              {selectedApp?.applicationType === "auction" 
                ? "Review active bids and select winning applicant"
                : "Review application and approve lease contract"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-6 py-4">
              {/* Applicant Information */}
              <div className="rounded-lg border border-slate-200 p-4 space-y-4">
                <h3 className="font-semibold text-slate-900">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <Label className="text-xs text-slate-500">Name</Label>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{selectedApp.applicantName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Email</Label>
                    <p className="text-sm font-mono text-slate-700 mt-1">{selectedApp.applicantEmail}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Room Number</Label>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{selectedApp.roomNo}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Application Date</Label>
                    <p className="text-sm text-slate-700 mt-1">{selectedApp.submittedDate}</p>
                  </div>
                </div>
              </div>

              {selectedApp.applicationType === "auction" ? (
                /* Auction Specific Section */
                <div className="rounded-lg bg-orange-50 border border-orange-200 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-orange-900">Active Auction Details</h3>
                    <span className="text-sm font-medium text-orange-700">{selectedApp.auctionEndsIn}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-white p-3 border border-orange-200">
                      <p className="text-xs text-orange-700 font-medium">Starting Bid</p>
                      <p className="text-lg font-bold text-orange-900 mt-1">ETB {selectedApp.proposedRent}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-orange-200">
                      <p className="text-xs text-orange-700 font-medium">Current High Bid</p>
                      <p className="text-lg font-bold text-orange-900 mt-1">ETB {selectedApp.highBid}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-orange-200">
                      <p className="text-xs text-orange-700 font-medium">Price Increase</p>
                      <p className="text-lg font-bold text-green-600 mt-1">+ETB {parseInt(selectedApp.highBid!) - parseInt(selectedApp.proposedRent)}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full text-sm">
                      View Bid History
                    </Button>
                  </div>
                </div>
              ) : (
                /* Standard Application Section */
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-4">
                  <h3 className="font-semibold text-slate-900">Proposed Lease Terms</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-xs text-slate-600 font-medium">Proposed Monthly Rent</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">ETB {selectedApp.proposedRent}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-xs text-slate-600 font-medium">Application Submitted</p>
                      <p className="text-sm text-slate-700 mt-1">{selectedApp.applicationDays} days ago</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-semibold">
                  Review Notes (Optional)
                </Label>
                <textarea
                  id="notes"
                  placeholder="Add any notes about this application..."
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 min-h-24"
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button variant="destructive">
              Reject Application
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              {selectedApp?.applicationType === "auction" ? "Accept Winner & Generate Lease" : "Approve & Draft Lease"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
