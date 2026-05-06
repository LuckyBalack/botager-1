"use client"

import { useState } from "react"
import {
  Plus,
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ChevronRight,
  Camera,
  Send,
  X,
  Zap,
  Droplets,
  Thermometer,
  Lock,
  Lightbulb,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TenantMaintenanceSLA } from "@/components/tenant-maintenance-sla"
import { TenantMaintenanceCosts } from "@/components/tenant-maintenance-costs"
import { TenantPreventiveScheduling } from "@/components/tenant-preventive-scheduling"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Categories with icons
const categories = [
  { id: "electrical", name: "Electrical", icon: Zap, color: "text-amber-600 bg-amber-100" },
  { id: "plumbing", name: "Plumbing", icon: Droplets, color: "text-blue-600 bg-blue-100" },
  { id: "hvac", name: "AC / Heating", icon: Thermometer, color: "text-cyan-600 bg-cyan-100" },
  { id: "security", name: "Locks / Security", icon: Lock, color: "text-red-600 bg-red-100" },
  { id: "lighting", name: "Lighting", icon: Lightbulb, color: "text-yellow-600 bg-yellow-100" },
  { id: "other", name: "Other", icon: Wrench, color: "text-slate-600 bg-slate-100" },
]

// Mock data for tenant maintenance requests
const tenantMaintenanceRequests = [
  {
    id: "MR-001",
    title: "AC not cooling properly",
    category: "hvac",
    description: "The air conditioning unit is running but not producing cold air. Temperature stays at 28°C even when set to 20°C.",
    status: "in-progress" as const,
    priority: "high" as const,
    dateSubmitted: "Apr 25, 2024",
    lastUpdate: "Apr 26, 2024",
    assignedTo: "Tekle Maintenance",
    updates: [
      { date: "Apr 26, 2024", message: "Technician scheduled for tomorrow morning", by: "Property Manager" },
      { date: "Apr 25, 2024", message: "Request received and assigned to maintenance team", by: "System" },
    ],
  },
  {
    id: "MR-002",
    title: "Light fixture flickering",
    category: "electrical",
    description: "The main ceiling light in the office keeps flickering intermittently.",
    status: "open" as const,
    priority: "medium" as const,
    dateSubmitted: "Apr 27, 2024",
    lastUpdate: "Apr 27, 2024",
    updates: [
      { date: "Apr 27, 2024", message: "Request received. Awaiting assignment.", by: "System" },
    ],
  },
  {
    id: "MR-003",
    title: "Door lock issue",
    category: "security",
    description: "The main door lock is difficult to turn and sometimes gets stuck.",
    status: "resolved" as const,
    priority: "high" as const,
    dateSubmitted: "Apr 15, 2024",
    lastUpdate: "Apr 17, 2024",
    resolvedDate: "Apr 17, 2024",
    assignedTo: "Dawit Security Services",
    updates: [
      { date: "Apr 17, 2024", message: "Lock replaced and working properly now.", by: "Technician" },
      { date: "Apr 16, 2024", message: "Technician on-site, assessing the lock.", by: "Property Manager" },
      { date: "Apr 15, 2024", message: "Request received and marked as high priority", by: "System" },
    ],
  },
  {
    id: "MR-004",
    title: "Sink drain slow",
    category: "plumbing",
    description: "The bathroom sink is draining very slowly.",
    status: "resolved" as const,
    priority: "low" as const,
    dateSubmitted: "Apr 10, 2024",
    lastUpdate: "Apr 12, 2024",
    resolvedDate: "Apr 12, 2024",
    assignedTo: "Abebe Plumbing",
    updates: [
      { date: "Apr 12, 2024", message: "Drain cleared. Please let us know if issues persist.", by: "Technician" },
      { date: "Apr 10, 2024", message: "Request received", by: "System" },
    ],
  },
]

type MaintenanceRequest = typeof tenantMaintenanceRequests[0]

function StatusBadge({ status }: { status: "open" | "in-progress" | "resolved" }) {
  const config = {
    open: { label: "Open", className: "bg-amber-100 text-amber-700", icon: Clock },
    "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-700", icon: Loader2 },
    resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  }
  const { label, className, icon: Icon } = config[status]
  return (
    <Badge className={cn("border-none font-medium gap-1", className)}>
      <Icon className={cn("h-3 w-3", status === "in-progress" && "animate-spin")} />
      {label}
    </Badge>
  )
}

function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const config = {
    high: { label: "High Priority", className: "bg-red-100 text-red-700" },
    medium: { label: "Medium", className: "bg-amber-100 text-amber-700" },
    low: { label: "Low", className: "bg-slate-100 text-slate-600" },
  }
  const { label, className } = config[priority]
  return <Badge className={cn("border-none font-medium", className)}>{label}</Badge>
}

function CategoryIcon({ categoryId }: { categoryId: string }) {
  const category = categories.find((c) => c.id === categoryId)
  if (!category) return null
  const Icon = category.icon
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", category.color)}>
      <Icon className="h-5 w-5" />
    </div>
  )
}

export function TenantMaintenanceView() {
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New request form state
  const [newCategory, setNewCategory] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPriority, setNewPriority] = useState("medium")

  const openRequests = tenantMaintenanceRequests.filter(
    (r) => r.status === "open" || r.status === "in-progress"
  )
  const resolvedRequests = tenantMaintenanceRequests.filter((r) => r.status === "resolved")

  const handleViewDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request)
    setDetailModalOpen(true)
  }

  const handleSubmitRequest = () => {
    if (!newCategory || !newTitle || !newDescription) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setNewRequestModalOpen(false)
      setNewCategory("")
      setNewTitle("")
      setNewDescription("")
      setNewPriority("medium")
      toast.success("Maintenance Request Submitted", {
        description: "Your request has been sent to the property manager.",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Maintenance Requests</h1>
          <p className="mt-1 text-slate-500">Submit and track your maintenance requests</p>
        </div>
        <Button
          className="gap-2 bg-orange-600 hover:bg-orange-700"
          onClick={() => setNewRequestModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="requests" className="px-6">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="sla" className="px-6">
            SLA Tracking
          </TabsTrigger>
          <TabsTrigger value="costs" className="px-6">
            Cost History
          </TabsTrigger>
          <TabsTrigger value="preventive" className="px-6">
            Preventive Care
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Requests</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{openRequests.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">In Progress</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {tenantMaintenanceRequests.filter((r) => r.status === "in-progress").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Loader2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Resolved This Month</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{resolvedRequests.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests */}
      {openRequests.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Active Requests</h2>
          <div className="flex flex-col gap-4">
            {openRequests.map((request) => (
              <Card
                key={request.id}
                className={cn(
                  "border-l-4",
                  request.status === "in-progress" ? "border-l-blue-500" : "border-l-amber-500"
                )}
              >
                <CardContent className="py-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <CategoryIcon categoryId={request.category} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{request.title}</h3>
                          <StatusBadge status={request.status} />
                          <PriorityBadge priority={request.priority} />
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{request.id}</p>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                          {request.description}
                        </p>
                        {request.assignedTo && (
                          <p className="mt-2 text-sm text-slate-500">
                            Assigned to: <span className="font-medium">{request.assignedTo}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm text-slate-500">Updated {request.lastUpdate}</p>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Active */}
      {openRequests.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <CheckCircle2 className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No Active Requests</h3>
            <p className="mt-2 text-center text-slate-500">
              You don&apos;t have any pending maintenance requests.
            </p>
            <Button
              className="mt-4 gap-2 bg-orange-600 hover:bg-orange-700"
              onClick={() => setNewRequestModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Submit a Request
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resolved Requests */}
      {resolvedRequests.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recently Resolved</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {resolvedRequests.map((request) => (
                  <button
                    key={request.id}
                    type="button"
                    onClick={() => handleViewDetails(request)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <CategoryIcon categoryId={request.category} />
                      <div>
                        <h3 className="font-medium text-slate-900">{request.title}</h3>
                        <p className="text-sm text-slate-500">
                          Resolved on {request.resolvedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={request.status} />
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla">
          <TenantMaintenanceSLA />
        </TabsContent>

        <TabsContent value="costs">
          <TenantMaintenanceCosts />
        </TabsContent>

        <TabsContent value="preventive">
          <TenantPreventiveScheduling />
        </TabsContent>
      </Tabs>

      {/* New Request Modal */}
      <Dialog open={newRequestModalOpen} onOpenChange={setNewRequestModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Maintenance Request</DialogTitle>
            <DialogDescription>
              Describe your maintenance issue and we&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 py-4">
            {/* Category */}
            <div className="flex flex-col gap-2">
              <Label>Category *</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {cat.name}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue in detail, including when it started and any relevant information..."
                rows={4}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-2">
              <Label>Priority Level</Label>
              <Select value={newPriority} onValueChange={setNewPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      High - Urgent, affecting safety or work
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      Medium - Important but not urgent
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-slate-600" />
                      Low - Minor issue, can wait
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Photo Upload (placeholder) */}
            <div className="flex flex-col gap-2">
              <Label>Attach Photos (Optional)</Label>
              <div className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-200 transition-colors hover:border-slate-300 hover:bg-slate-50">
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <Camera className="h-6 w-6" />
                  <span className="text-sm">Click to upload photos</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNewRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="gap-2 bg-orange-600 hover:bg-orange-700"
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CategoryIcon categoryId={selectedRequest?.category || ""} />
              <span>{selectedRequest?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedRequest?.id} - Submitted {selectedRequest?.dateSubmitted}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Status and Priority */}
            <div className="mb-6 flex items-center gap-3">
              <StatusBadge status={selectedRequest?.status || "open"} />
              <PriorityBadge priority={selectedRequest?.priority || "medium"} />
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-medium text-slate-700">Description</h4>
              <p className="text-sm text-slate-600">{selectedRequest?.description}</p>
            </div>

            {/* Assigned To */}
            {selectedRequest?.assignedTo && (
              <div className="mb-6 rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Assigned Technician</p>
                <p className="mt-1 font-semibold text-slate-900">{selectedRequest.assignedTo}</p>
              </div>
            )}

            {/* Updates Timeline */}
            <div>
              <h4 className="mb-4 text-sm font-medium text-slate-700">Updates</h4>
              <div className="space-y-4">
                {selectedRequest?.updates.map((update, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-slate-300" />
                      {index < (selectedRequest?.updates.length || 0) - 1 && (
                        <div className="absolute top-2 h-full w-px bg-slate-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-slate-900">{update.message}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {update.date} &bull; {update.by}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
