"use client"

import { useState } from "react"
import {
  Building2,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Key,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  workspaceSubmissions,
  creditPartners,
  type WorkspaceSubmission,
  type CreditPartner,
} from "@/lib/data"

type SystemAdminViewProps = {
  view: "moderation" | "credit-partners" | "settings"
}

function DocumentsModal({
  open,
  onOpenChange,
  submission,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: WorkspaceSubmission | null
}) {
  if (!submission) return null

  const mockDocuments = [
    { name: "Business License.pdf", type: "PDF", size: "2.4 MB" },
    { name: "Property Deed.pdf", type: "PDF", size: "1.8 MB" },
    { name: "Owner ID.jpg", type: "Image", size: "890 KB" },
    { name: "Tax Certificate.pdf", type: "PDF", size: "1.1 MB" },
    { name: "Building Photos.zip", type: "Archive", size: "15.2 MB" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Submitted Documents
          </DialogTitle>
          <DialogDescription>
            Documents for {submission.buildingName} by {submission.ownerName}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          {mockDocuments.slice(0, submission.documentCount).map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <FileText className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{doc.name}</p>
                  <p className="text-xs text-slate-500">{doc.type} - {doc.size}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ApiKeysModal({
  open,
  onOpenChange,
  partner,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  partner: CreditPartner | null
}) {
  if (!partner) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </DialogTitle>
          <DialogDescription>
            Manage API keys for {partner.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm font-medium text-slate-900 mb-2">API Key</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-slate-100 px-3 py-2 text-sm font-mono">
                {partner.apiKeyStatus === "Configured" 
                  ? "sk-****************************" 
                  : "Not configured"
                }
              </code>
              <Button variant="outline" size="sm">
                {partner.apiKeyStatus === "Configured" ? "Rotate" : "Add"}
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm font-medium text-slate-900 mb-2">Webhook URL</p>
            <code className="block rounded bg-slate-100 px-3 py-2 text-sm font-mono text-slate-600">
              https://api.wrm.et/webhooks/{partner.id}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Integration Status</p>
            <Badge
              className={`border-none ${
                partner.integrationStatus === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : partner.integrationStatus === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {partner.integrationStatus}
            </Badge>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SystemAdminView({ view }: SystemAdminViewProps) {
  const [submissions, setSubmissions] = useState(workspaceSubmissions)
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<WorkspaceSubmission | null>(null)
  const [apiKeysModalOpen, setApiKeysModalOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<CreditPartner | null>(null)

  const handleViewDocuments = (submission: WorkspaceSubmission) => {
    setSelectedSubmission(submission)
    setDocumentsModalOpen(true)
  }

  const handleApprove = (id: string) => {
    setSubmissions(
      submissions.map((s) => (s.id === id ? { ...s, status: "Approved" as const } : s))
    )
    toast.success("Workspace Approved", {
      description: "The building owner has been notified.",
    })
  }

  const handleReject = (id: string) => {
    setSubmissions(
      submissions.map((s) => (s.id === id ? { ...s, status: "Rejected" as const } : s))
    )
    toast.error("Workspace Rejected", {
      description: "The building owner has been notified.",
    })
  }

  const handleManageApiKeys = (partner: CreditPartner) => {
    setSelectedPartner(partner)
    setApiKeysModalOpen(true)
  }

  if (view === "moderation") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pending Workspace Verifications</h1>
          <p className="mt-1 text-slate-500">
            Review and approve new building submissions from workspace owners.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <Building2 className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {submissions.filter((s) => s.status === "Pending").length}
                  </p>
                  <p className="text-sm text-slate-500">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {submissions.filter((s) => s.status === "Approved").length}
                  </p>
                  <p className="text-sm text-slate-500">Approved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {submissions.filter((s) => s.status === "Rejected").length}
                  </p>
                  <p className="text-sm text-slate-500">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Queue</CardTitle>
            <CardDescription>Buildings submitted by new workspace owners</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Building Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Owner</TableHead>
                  <TableHead className="font-semibold text-slate-700">Location</TableHead>
                  <TableHead className="font-semibold text-slate-700">Submitted</TableHead>
                  <TableHead className="font-semibold text-slate-700">Documents</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium text-slate-900">
                      {submission.buildingName}
                    </TableCell>
                    <TableCell className="text-slate-600">{submission.ownerName}</TableCell>
                    <TableCell className="text-slate-600">{submission.location}</TableCell>
                    <TableCell className="text-slate-600">{submission.submittedDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDocuments(submission)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        {submission.documentCount} Files
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border-none ${
                          submission.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : submission.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {submission.status === "Pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-emerald-500 hover:bg-emerald-600"
                            onClick={() => handleApprove(submission.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleReject(submission.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                      {submission.status !== "Pending" && (
                        <span className="text-sm text-slate-400">Processed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <DocumentsModal
          open={documentsModalOpen}
          onOpenChange={setDocumentsModalOpen}
          submission={selectedSubmission}
        />
      </div>
    )
  }

  if (view === "credit-partners") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Credit Service Partners</h1>
          <p className="mt-1 text-slate-500">
            Manage banks and fintech partners providing credit services on the platform.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Partners</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{creditPartners.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Active Integrations</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">
                {creditPartners.filter((p) => p.integrationStatus === "Active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Total Credit Issued</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">ETB 4.2M</p>
            </CardContent>
          </Card>
        </div>

        {/* Partners Table */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Partners</CardTitle>
            <CardDescription>Banks and fintech providers integrated with the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Partner Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Integration Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total Credit Issued</TableHead>
                  <TableHead className="font-semibold text-slate-700">API Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium text-slate-900">{partner.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-200">
                        {partner.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border-none ${
                          partner.integrationStatus === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : partner.integrationStatus === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {partner.integrationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {partner.totalCreditIssued}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border-none ${
                          partner.apiKeyStatus === "Configured"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {partner.apiKeyStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManageApiKeys(partner)}
                      >
                        <Key className="h-4 w-4 mr-1" />
                        Manage API Keys
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <ApiKeysModal
          open={apiKeysModalOpen}
          onOpenChange={setApiKeysModalOpen}
          partner={selectedPartner}
        />
      </div>
    )
  }

  // Settings view
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Admin Settings</h1>
        <p className="mt-1 text-slate-500">
          Configure platform-wide settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-slate-600" />
            <CardTitle>Platform Configuration</CardTitle>
          </div>
          <CardDescription>Manage system-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">System admin settings configuration coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
