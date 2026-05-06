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
  Plus,
  Wifi,
  WifiOff,
  Activity,
  Send,
  MessageSquare,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Search,
  Save,
  Database,
  Trash2,
  ShieldAlert,
  Globe,
  Languages,
  ClipboardList,
  Wrench,
  User,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModerationBulkActions } from "@/components/moderation-bulk-actions"
import { ModerationRiskScoring } from "@/components/moderation-risk-scoring"
import { ModerationAdvancedFilters } from "@/components/moderation-advanced-filters"
import { ModerationAuditTrail } from "@/components/moderation-audit-trail"
import { CreditPartnerKPIs } from "@/components/credit-partner-kpis"
import { CreditTransactionMonitoring } from "@/components/credit-transaction-monitoring"
import { CreditPartnerSLA } from "@/components/credit-partner-sla"
import { SystemUserManagement } from "@/components/system-user-management"
import { SystemSecuritySettings } from "@/components/system-security-settings"
import { SystemSettingsView as StandaloneSystemSettingsView } from "@/components/views/system-settings-view"
import { SystemDashboardView } from "@/components/views/system-dashboard-view"
import { HelpdeskTicketFilters } from "@/components/helpdesk-ticket-filters"
import { HelpdeskEscalation } from "@/components/helpdesk-escalation"
import { HelpdeskResponseTemplates } from "@/components/helpdesk-response-templates"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts"
import {
  workspaceSubmissions,
  creditPartners,
  apiHealthLogs,
  creditUtilizationData,
  supportTickets,
  systemBroadcasts,
  auditLogs,
  translationStrings,
  type WorkspaceSubmission,
  type CreditPartner,
  type SupportTicket,
  type BroadcastAudience,
  type AuditLogRole,
  type TranslationString,
} from "@/lib/data"

type SystemAdminViewProps = {
  view: "moderation" | "credit-partners" | "settings" | "system-helpdesk"
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

function OnboardCSPModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [testing, setTesting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  const handleTestConnection = () => {
    setTesting(true)
    setConnectionStatus("idle")
    // Simulate API test
    setTimeout(() => {
      setTesting(false)
      setConnectionStatus("success")
      toast.success("Connection Successful", {
        description: "API endpoint is reachable and responding.",
      })
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Onboard New Credit Service Provider
          </DialogTitle>
          <DialogDescription>
            Add a new bank or fintech partner to the platform
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bank-name">Bank / Fintech Name</Label>
            <Input id="bank-name" placeholder="e.g., Dashen Bank" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-endpoint">API Endpoint URL</Label>
            <Input id="api-endpoint" placeholder="https://api.bank.com/v1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" type="password" placeholder="sk-..." />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={testing}
            >
              {testing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-pulse" />
                  Testing...
                </>
              ) : connectionStatus === "success" ? (
                <>
                  <Wifi className="h-4 w-4 mr-2 text-emerald-600" />
                  Connected
                </>
              ) : connectionStatus === "error" ? (
                <>
                  <WifiOff className="h-4 w-4 mr-2 text-red-600" />
                  Failed
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  Test Connection
                </>
              )}
            </Button>
            {connectionStatus === "success" && (
              <span className="text-sm text-emerald-600">API is reachable</span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              toast.success("CSP Onboarded", {
                description: "New credit service provider has been added.",
              })
              onOpenChange(false)
            }}
          >
            Onboard Partner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Credit Partners Deep Management View
function CreditPartnersDeepView() {
  const [onboardModalOpen, setOnboardModalOpen] = useState(false)
  const [apiKeysModalOpen, setApiKeysModalOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<CreditPartner | null>(null)
  const [showErrorsOnly, setShowErrorsOnly] = useState(false)

  const handleManageApiKeys = (partner: CreditPartner) => {
    setSelectedPartner(partner)
    setApiKeysModalOpen(true)
  }

  const filteredLogs = showErrorsOnly
    ? apiHealthLogs.filter((log) => log.responseCode >= 400)
    : apiHealthLogs

  // Chart data for Credit Utilization
  const chartData = creditUtilizationData.map((item) => ({
    name: item.subcity,
    value: item.totalEtbNumber / 1000, // Convert to thousands for display
  }))

  const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"]

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

      {/* Tabs */}
      <Tabs defaultValue="partner-directory" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="partner-directory">Partner Directory</TabsTrigger>
          <TabsTrigger value="performance">Performance KPIs</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Monitoring</TabsTrigger>
          <TabsTrigger value="sla">SLA Tracking</TabsTrigger>
          <TabsTrigger value="api-health">API Health Logs</TabsTrigger>
          <TabsTrigger value="credit-utilization">Credit Utilization</TabsTrigger>
        </TabsList>

        {/* Partner Directory Tab */}
        <TabsContent value="partner-directory" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Credit Partners</CardTitle>
                <CardDescription>Banks and fintech providers integrated with the platform</CardDescription>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setOnboardModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Onboard New CSP
              </Button>
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
        </TabsContent>

        {/* API Health Logs Tab */}
        <TabsContent value="api-health" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Health Logs</CardTitle>
                <CardDescription>Monitor real-time bank API connections and responses</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="error-filter" className="text-sm text-slate-600">
                  Filter by Errors
                </Label>
                <Switch
                  id="error-filter"
                  checked={showErrorsOnly}
                  onCheckedChange={setShowErrorsOnly}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Timestamp</TableHead>
                    <TableHead className="font-semibold text-slate-700">Partner</TableHead>
                    <TableHead className="font-semibold text-slate-700">Endpoint</TableHead>
                    <TableHead className="font-semibold text-slate-700">Response Code</TableHead>
                    <TableHead className="font-semibold text-slate-700">Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-slate-600 font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{log.partner}</TableCell>
                      <TableCell>
                        <code className="rounded bg-slate-100 px-2 py-1 text-sm font-mono text-slate-600">
                          {log.endpoint}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`border-none ${
                            log.responseCode >= 200 && log.responseCode < 300
                              ? "bg-emerald-100 text-emerald-700"
                              : log.responseCode >= 400 && log.responseCode < 500
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {log.responseCode} {log.responseCode === 200 ? "OK" : log.responseCode === 500 ? "Error" : "Auth Error"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            log.latency < 150
                              ? "text-emerald-600"
                              : log.latency < 500
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {log.latency}ms
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance KPIs Tab */}
        <TabsContent value="performance" className="mt-6">
          <CreditPartnerKPIs partners={creditPartners} />
        </TabsContent>

        {/* Transaction Monitoring Tab */}
        <TabsContent value="transactions" className="mt-6">
          <CreditTransactionMonitoring />
        </TabsContent>

        {/* SLA Tracking Tab */}
        <TabsContent value="sla" className="mt-6">
          <CreditPartnerSLA />
        </TabsContent>

        {/* Credit Utilization Tab */}
        <TabsContent value="credit-utilization" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Issued by Sub-city</CardTitle>
              <CardDescription>
                Distribution of BNPL credit across Addis Ababa sub-cities (in thousands ETB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}K`} />
                    <RechartsTooltip
                      formatter={(value: number) => [`ETB ${value}K`, "Credit Issued"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Sub-city</TableHead>
                    <TableHead className="font-semibold text-slate-700">Total Applications</TableHead>
                    <TableHead className="font-semibold text-slate-700">Approval Rate</TableHead>
                    <TableHead className="font-semibold text-slate-700">Total ETB Issued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditUtilizationData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-slate-900">{item.subcity}</TableCell>
                      <TableCell className="text-slate-600">{item.totalApplications}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-slate-200">
                            <div
                              className="h-2 rounded-full bg-orange-500"
                              style={{ width: `${item.approvalRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">
                            {item.approvalRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{item.totalEtbIssued}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <OnboardCSPModal open={onboardModalOpen} onOpenChange={setOnboardModalOpen} />
      <ApiKeysModal
        open={apiKeysModalOpen}
        onOpenChange={setApiKeysModalOpen}
        partner={selectedPartner}
      />
    </div>
  )
}

// Support & Helpdesk View
const supportStaff = [
  { id: "staff-1", name: "Abebe Assefa", role: "Senior Support Lead", avatar: "AA", status: "Available" },
  { id: "staff-2", name: "Marta Kebede", role: "Support Specialist", avatar: "MK", status: "Busy" },
  { id: "staff-3", name: "Girma Tesfaye", role: "Support Agent", avatar: "GT", status: "Available" },
  { id: "staff-4", name: "Selam Tewodros", role: "Technical Support", avatar: "ST", status: "Away" },
]

function SystemHelpdeskView() {
  const [tickets, setTickets] = useState(supportTickets)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(tickets[0] || null)
  const [replyText, setReplyText] = useState("")
  const [broadcastAudience, setBroadcastAudience] = useState<BroadcastAudience>("All Building Owners")
  const [deliveryMethods, setDeliveryMethods] = useState({
    sms: false,
    email: true,
    inApp: true,
  })
  const [broadcastSubject, setBroadcastSubject] = useState("")
  const [broadcastBody, setBroadcastBody] = useState("")
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [assignedTickets, setAssignedTickets] = useState<Record<string, string>>({})

  const handleSendReply = () => {
    if (!selectedTicket || !replyText.trim()) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "admin" as const,
      senderName: "WRM Support",
      message: replyText,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    const updatedTickets = tickets.map((t) =>
      t.id === selectedTicket.id
        ? { ...t, messages: [...t.messages, newMessage], status: "Open" as const }
        : t
    )
    setTickets(updatedTickets)
    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      status: "Open",
    })
    setReplyText("")
    toast.success("Reply Sent", {
      description: "Your response has been sent to the building owner.",
    })
  }

  const handleMarkResolved = () => {
    if (!selectedTicket) return

    const updatedTickets = tickets.map((t) =>
      t.id === selectedTicket.id ? { ...t, status: "Resolved" as const } : t
    )
    setTickets(updatedTickets)
    setSelectedTicket({ ...selectedTicket, status: "Resolved" })
    toast.success("Ticket Resolved", {
      description: "The support ticket has been marked as resolved.",
    })
  }

  const handleEscalate = () => {
    if (!selectedTicket) return

    const updatedTickets = tickets.map((t) =>
      t.id === selectedTicket.id ? { ...t, status: "Escalated" as const } : t
    )
    setTickets(updatedTickets)
    setSelectedTicket({ ...selectedTicket, status: "Escalated" })
    toast.info("Ticket Escalated", {
      description: "The ticket has been escalated to the tech team.",
    })
  }

  const handleAssignTicket = (staffId: string) => {
    if (!selectedTicket) return
    setAssignedTickets({
      ...assignedTickets,
      [selectedTicket.id]: staffId,
    })
    const staffName = supportStaff.find((s) => s.id === staffId)?.name || "Support Staff"
    toast.success("Ticket Assigned", {
      description: `Ticket assigned to ${staffName}. They will be notified.`,
    })
  }

  const handleSendBroadcast = () => {
    if (!broadcastSubject.trim() || !broadcastBody.trim()) {
      toast.error("Missing Fields", {
        description: "Please fill in both subject and message body.",
      })
      return
    }

    toast.success("Broadcast Sent", {
      description: `Message sent to ${broadcastAudience} via ${
        [
          deliveryMethods.sms && "SMS",
          deliveryMethods.email && "Email",
          deliveryMethods.inApp && "In-App",
        ]
          .filter(Boolean)
          .join(", ")
      }`,
    })
    setBroadcastSubject("")
    setBroadcastBody("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Global Support & Communication</h1>
        <p className="mt-1 text-slate-500">
          Handle support tickets from building owners and send platform-wide announcements.
        </p>
      </div>

      <Tabs defaultValue="owner-tickets" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="owner-tickets">Owner Tickets</TabsTrigger>
          <TabsTrigger value="escalation">Escalation Queue</TabsTrigger>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="system-broadcasts">System Broadcasts</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        {/* Owner Tickets Tab */}
        <TabsContent value="owner-tickets" className="mt-6 space-y-6">
          <HelpdeskTicketFilters onFilterChange={() => {}} />
          <Card>
            <CardContent className="p-0">
              <div className="flex h-[600px]">
                {/* Left Sidebar - Ticket List */}
                <div className="w-[30%] border-r border-slate-200">
                  <div className="border-b border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900">Support Inbox</h3>
                    <p className="text-sm text-slate-500">{tickets.length} tickets</p>
                  </div>
                  <ScrollArea className="h-[calc(600px-73px)]">
                    <div className="flex flex-col">
                      {tickets.map((ticket) => (
                        <button
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket)}
                          className={`flex flex-col gap-1 border-b border-slate-100 p-4 text-left transition-colors hover:bg-slate-50 ${
                            selectedTicket?.id === ticket.id ? "bg-orange-50" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 truncate max-w-[70%]">
                              {ticket.ownerName}
                            </span>
                            <Badge
                              className={`border-none text-xs ${
                                ticket.status === "New"
                                  ? "bg-blue-100 text-blue-700"
                                  : ticket.status === "Open"
                                    ? "bg-amber-100 text-amber-700"
                                    : ticket.status === "Escalated"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {ticket.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-600 truncate">
                            {ticket.subject}
                          </span>
                          <span className="text-xs text-slate-400">{ticket.createdAt}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Right Area - Ticket Detail */}
                <div className="flex w-[70%] flex-col">
                  {selectedTicket ? (
                    <>
                      {/* Ticket Header */}
                      <div className="border-b border-slate-200 p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">{selectedTicket.subject}</h3>
                            <p className="text-sm text-slate-500">
                              From: {selectedTicket.ownerName} ({selectedTicket.ownerEmail})
                            </p>
                            {assignedTickets[selectedTicket.id] && (
                              <p className="text-xs text-slate-600 mt-2">
                                Assigned to:{" "}
                                <span className="font-medium">
                                  {supportStaff.find((s) => s.id === assignedTickets[selectedTicket.id])?.name}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <User className="h-4 w-4 mr-1" />
                                {assignedTickets[selectedTicket.id] ? "Reassign" : "Assign To"}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              {supportStaff.map((staff) => (
                                <DropdownMenuItem
                                  key={staff.id}
                                  onClick={() => handleAssignTicket(staff.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium">
                                      {staff.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium">{staff.name}</span>
                                      <span className="text-xs text-slate-500">{staff.role}</span>
                                    </div>
                                    <Badge
                                      className={`ml-2 text-xs border-none ${
                                        staff.status === "Available"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : staff.status === "Busy"
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {staff.status}
                                    </Badge>
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEscalate}
                            disabled={selectedTicket.status === "Escalated" || selectedTicket.status === "Resolved"}
                          >
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            Escalate
                          </Button>
                          <Button
                            size="sm"
                            className="bg-emerald-500 hover:bg-emerald-600"
                            onClick={handleMarkResolved}
                            disabled={selectedTicket.status === "Resolved"}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        </div>
                      </div>

                      {/* Conversation */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="flex flex-col gap-4">
                          {selectedTicket.messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  msg.sender === "admin"
                                    ? "bg-orange-500 text-white"
                                    : "bg-slate-100 text-slate-900"
                                }`}
                              >
                                <p className="text-sm font-medium mb-1">{msg.senderName}</p>
                                <p className="text-sm">{msg.message}</p>
                                <p
                                  className={`text-xs mt-2 ${
                                    msg.sender === "admin" ? "text-orange-100" : "text-slate-500"
                                  }`}
                                >
                                  {msg.timestamp}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      {/* Reply Box */}
                      <div className="border-t border-slate-200 p-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Type your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="resize-none"
                            rows={2}
                          />
                          <Button
                            className="bg-orange-500 hover:bg-orange-600 h-auto"
                            onClick={handleSendReply}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-1 items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">Select a ticket to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

        {/* Escalation Queue Tab */}
        <TabsContent value="escalation" className="mt-6">
          <HelpdeskEscalation />
        </TabsContent>

        {/* Response Templates Tab */}
        <TabsContent value="templates" className="mt-6">
          <HelpdeskResponseTemplates />
        </TabsContent>

        {/* System Broadcasts Tab */}
        <TabsContent value="system-broadcasts" className="mt-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Send System Broadcast</CardTitle>
                <CardDescription>
                  Send alerts and announcements to platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Select Audience</Label>
                      <Select
                        value={broadcastAudience}
                        onValueChange={(v) => setBroadcastAudience(v as BroadcastAudience)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Building Owners">All Building Owners</SelectItem>
                          <SelectItem value="All Active Tenants">All Active Tenants</SelectItem>
                          <SelectItem value="Specific Building">Specific Building</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery Method</Label>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="sms"
                            checked={deliveryMethods.sms}
                            onCheckedChange={(checked) =>
                              setDeliveryMethods({ ...deliveryMethods, sms: checked as boolean })
                            }
                          />
                          <Label htmlFor="sms" className="font-normal">SMS</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="email"
                            checked={deliveryMethods.email}
                            onCheckedChange={(checked) =>
                              setDeliveryMethods({ ...deliveryMethods, email: checked as boolean })
                            }
                          />
                          <Label htmlFor="email" className="font-normal">Email</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="inApp"
                            checked={deliveryMethods.inApp}
                            onCheckedChange={(checked) =>
                              setDeliveryMethods({ ...deliveryMethods, inApp: checked as boolean })
                            }
                          />
                          <Label htmlFor="inApp" className="font-normal">In-App Notification</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Message Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Scheduled Maintenance Notice"
                      value={broadcastSubject}
                      onChange={(e) => setBroadcastSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">Message Body</Label>
                    <Textarea
                      id="body"
                      placeholder="Type your broadcast message here..."
                      rows={5}
                      value={broadcastBody}
                      onChange={(e) => setBroadcastBody(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={handleSendBroadcast}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send System Broadcast
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past Broadcasts Table */}
            <Card>
              <CardHeader>
                <CardTitle>Past Broadcasts</CardTitle>
                <CardDescription>History of system-wide announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Date</TableHead>
                      <TableHead className="font-semibold text-slate-700">Audience</TableHead>
                      <TableHead className="font-semibold text-slate-700">Message Preview</TableHead>
                      <TableHead className="font-semibold text-slate-700">Delivery Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemBroadcasts.map((broadcast) => (
                      <TableRow key={broadcast.id}>
                        <TableCell className="text-slate-600">{broadcast.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-slate-200">
                            {broadcast.audience}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <div>
                            <p className="font-medium text-slate-900">{broadcast.subject}</p>
                            <p className="text-sm text-slate-500 truncate">
                              {broadcast.messagePreview}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-slate-200">
                              <div
                                className={`h-2 rounded-full ${
                                  broadcast.successRate >= 95
                                    ? "bg-emerald-500"
                                    : broadcast.successRate >= 80
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${broadcast.successRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-900">
                              {broadcast.successRate}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Analytics Tab */}
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Tickets (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{tickets.length}</div>
                <p className="mt-2 text-sm text-slate-600">
                  {tickets.filter((t) => t.status === "Resolved").length} resolved
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Avg Resolution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">4.2 hrs</div>
                <p className="mt-2 text-sm text-emerald-600">↓ 12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">4.8/5</div>
                <p className="mt-2 text-sm text-slate-600">Based on 156 ratings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Active Escalations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {tickets.filter((t) => t.status === "Escalated").length}
                </div>
                <p className="mt-2 text-sm text-red-600">Requiring immediate attention</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Staff Performance</CardTitle>
              <CardDescription>Individual metrics for support team members</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Staff Member</TableHead>
                    <TableHead className="font-semibold text-slate-700">Role</TableHead>
                    <TableHead className="font-semibold text-slate-700">Tickets Handled</TableHead>
                    <TableHead className="font-semibold text-slate-700">Avg Resolution Time</TableHead>
                    <TableHead className="font-semibold text-slate-700">Satisfaction Rating</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportStaff.map((staff) => (
                    <TableRow key={staff.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{staff.name}</TableCell>
                      <TableCell className="text-slate-700">{staff.role}</TableCell>
                      <TableCell className="text-slate-700">
                        {Math.floor(Math.random() * 15) + 8}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {(Math.random() * 3 + 2).toFixed(1)} hrs
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-slate-900">
                            {(Math.random() * 0.5 + 4.3).toFixed(1)}
                          </span>
                          <span className="text-xs text-slate-500">/5</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`border-none text-xs ${
                            staff.status === "Available"
                              ? "bg-emerald-100 text-emerald-700"
                              : staff.status === "Busy"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {staff.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {[
                  { status: "New", count: tickets.filter((t) => t.status === "New").length, color: "bg-blue-500" },
                  { status: "Open", count: tickets.filter((t) => t.status === "Open").length, color: "bg-amber-500" },
                  {
                    status: "Escalated",
                    count: tickets.filter((t) => t.status === "Escalated").length,
                    color: "bg-red-500",
                  },
                  {
                    status: "Resolved",
                    count: tickets.filter((t) => t.status === "Resolved").length,
                    color: "bg-emerald-500",
                  },
                ].map((item) => (
                  <div key={item.status}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">{item.status}</span>
                      <span className="text-sm font-semibold text-slate-700">{item.count}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / tickets.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function SystemAdminView({ view }: SystemAdminViewProps) {
  const [submissions, setSubmissions] = useState(workspaceSubmissions)
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<WorkspaceSubmission | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({ status: "all", riskLevel: "all", submittedAfter: "", documentCount: "all" })

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

  const handleBulkApprove = () => {
    const newSubmissions = submissions.map((s) =>
      selectedIds.has(s.id) ? { ...s, status: "Approved" as const } : s
    )
    setSubmissions(newSubmissions)
    setSelectedIds(new Set())
  }

  const handleBulkReject = () => {
    const newSubmissions = submissions.map((s) =>
      selectedIds.has(s.id) ? { ...s, status: "Rejected" as const } : s
    )
    setSubmissions(newSubmissions)
    setSelectedIds(new Set())
  }

  const handleBulkArchive = () => {
    const newSubmissions = submissions.map((s) =>
      selectedIds.has(s.id) ? { ...s, status: "Archived" as const } : s
    )
    setSubmissions(newSubmissions)
    setSelectedIds(new Set())
  }

  const toggleSelection = (id: string) => {
    const newIds = new Set(selectedIds)
    if (newIds.has(id)) {
      newIds.delete(id)
    } else {
      newIds.add(id)
    }
    setSelectedIds(newIds)
  }

  // Dashboard view
  if (view === "dashboard") {
    return <SystemDashboardView />
  }

  // Reported listings view
  if (view === "reported-listings") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reported Listings</h1>
          <p className="mt-1 text-slate-500">
            Review and manage building listings reported by users
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reported Buildings</CardTitle>
            <CardDescription>5 listings awaiting review</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Building</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Reported</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 1, building: "Bole Residence Tower", owner: "Abebe M.", reports: 3, reason: "Inappropriate Content", status: "Under Review", date: "May 5, 2026" },
                  { id: 2, building: "Nefas Silk Heights", owner: "Marta K.", reports: 2, reason: "False Information", status: "Pending", date: "May 4, 2026" },
                  { id: 3, building: "Addis Plaza Complex", owner: "Girma T.", reports: 1, reason: "Pricing Issue", status: "Resolved", date: "May 3, 2026" },
                ].map((listing) => (
                  <TableRow key={listing.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">{listing.building}</TableCell>
                    <TableCell className="text-slate-700">{listing.owner}</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-700 border-none">{listing.reports}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{listing.reason}</TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${
                        listing.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                        listing.status === "Under Review" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{listing.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Marketplace admin view
  if (view === "marketplace") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketplace Admin</h1>
          <p className="mt-1 text-slate-500">
            Manage featured listings and marketplace SEO settings
          </p>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured Listings</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Featured Listings</CardTitle>
                  <CardDescription>Promote premium listings on the marketplace</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Featured
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Building</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Views (30d)</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { building: "Bole Premium Tower", position: 1, views: "2,847", expires: "Jun 5, 2026", cost: "ETB 500" },
                      { building: "Nefas Silk Estate", position: 2, views: "1,923", expires: "Jun 10, 2026", cost: "ETB 500" },
                      { building: "Addis Centro Plaza", position: 3, views: "1,456", expires: "Jun 15, 2026", cost: "ETB 500" },
                    ].map((listing, idx) => (
                      <TableRow key={idx} className="hover:bg-slate-50">
                        <TableCell className="font-medium text-slate-900">{listing.building}</TableCell>
                        <TableCell>#{listing.position}</TableCell>
                        <TableCell className="text-slate-700">{listing.views}</TableCell>
                        <TableCell className="text-slate-600">{listing.expires}</TableCell>
                        <TableCell className="font-semibold text-slate-900">{listing.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketplace SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="WRM - Discover Premium Buildings & Offices in Addis Ababa"
                    defaultValue="WRM - Discover Premium Buildings & Offices in Addis Ababa"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-desc">Meta Description</Label>
                  <Textarea
                    id="meta-desc"
                    placeholder="Find your perfect building or office space. Browse verified listings with photos, pricing, and detailed information."
                    defaultValue="Find your perfect building or office space. Browse verified listings with photos, pricing, and detailed information."
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm font-medium text-slate-700">Index marketplace in search engines</span>
                  <Switch defaultChecked />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
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

        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger value="queue" className="px-6">
              Verification Queue
            </TabsTrigger>
            <TabsTrigger value="risk" className="px-6">
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="audit" className="px-6">
              Audit Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-6">
            <ModerationAdvancedFilters onFilterChange={setFilters} />
            <ModerationBulkActions
              selectedCount={selectedIds.size}
              onApproveAll={handleBulkApprove}
              onRejectAll={handleBulkReject}
              onArchiveAll={handleBulkArchive}
            />

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
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.size === submissions.length && submissions.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds(new Set(submissions.map((s) => s.id)))
                        } else {
                          setSelectedIds(new Set())
                        }
                      }}
                    />
                  </TableHead>
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
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(submission.id)}
                        onCheckedChange={() => toggleSelection(submission.id)}
                      />
                    </TableCell>
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
          </TabsContent>

          <TabsContent value="risk">
            <div className="space-y-6">
              <ModerationRiskScoring submissions={submissions} />
            </div>
          </TabsContent>

          <TabsContent value="audit">
            <div className="space-y-6">
              <ModerationAuditTrail />
            </div>
          </TabsContent>
        </Tabs>

        <DocumentsModal
          open={documentsModalOpen}
          onOpenChange={setDocumentsModalOpen}
          submission={selectedSubmission}
        />
      </div>
    )
  }

  // Revenue share view
  if (view === "revenue-share") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Revenue Share Program</h1>
          <p className="mt-1 text-slate-500">
            Manage partner revenue sharing and commission structures
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Partners", value: "24", change: "+3 this month" },
            { label: "Monthly Payout", value: "ETB 142K", change: "↑ 8% from last month" },
            { label: "Avg Commission", value: "12.5%", change: "Industry standard" },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <p className="mt-2 text-sm text-slate-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Share Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Tier</TableHead>
                  <TableHead>Criteria</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Partners</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { tier: "Bronze", criteria: "< ETB 100K/month", commission: "8%", partners: 12, revenue: "ETB 45K" },
                  { tier: "Silver", criteria: "ETB 100K - 500K", commission: "12%", partners: 8, revenue: "ETB 72K" },
                  { tier: "Gold", criteria: "> ETB 500K/month", commission: "15%", partners: 4, revenue: "ETB 25K" },
                ].map((tier, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50">
                    <TableCell className="font-semibold text-slate-900">{tier.tier}</TableCell>
                    <TableCell className="text-slate-600">{tier.criteria}</TableCell>
                    <TableCell className="text-slate-900 font-semibold">{tier.commission}</TableCell>
                    <TableCell className="text-slate-700">{tier.partners}</TableCell>
                    <TableCell className="text-slate-700">{tier.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Default risk view
  if (view === "default-risk") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Default Risk Management</h1>
          <p className="mt-1 text-slate-500">
            Monitor and manage credit default risks across partners
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "At-Risk Partners", value: "3", color: "bg-red-100 text-red-700" },
            { label: "Monitored Accounts", value: "7", color: "bg-amber-100 text-amber-700" },
            { label: "Good Standing", value: "14", color: "bg-emerald-100 text-emerald-700" },
            { label: "Default Rate", value: "1.2%", color: "bg-slate-100 text-slate-700" },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <Badge className={`${stat.color} border-none text-xs mt-2`}>Monitor</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Partner</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Outstanding</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { partner: "Partner A Solutions", risk: "High", outstanding: "ETB 45K", days: "30+", action: "Escalate" },
                  { partner: "Partner B Network", risk: "Medium", outstanding: "ETB 18K", days: "15", action: "Monitor" },
                  { partner: "Partner C Group", risk: "Low", outstanding: "ETB 5K", days: "5", action: "Track" },
                ].map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">{item.partner}</TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${
                        item.risk === "High" ? "bg-red-100 text-red-700" :
                        item.risk === "Medium" ? "bg-amber-100 text-amber-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {item.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{item.outstanding}</TableCell>
                    <TableCell className="text-slate-700">{item.days}</TableCell>
                    <TableCell><Button size="sm" variant="outline">{item.action}</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Broker network view
  if (view === "broker-network") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Broker Network</h1>
            <p className="mt-1 text-slate-500">
              Manage broker partnerships and performance metrics
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Broker
          </Button>
        </div>

        <Tabs defaultValue="directory" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="directory">Broker Directory</TabsTrigger>
            <TabsTrigger value="kpis">Performance KPIs</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Brokers</CardTitle>
                <CardDescription>Network of verified property brokers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Broker Name</TableHead>
                      <TableHead>Listings</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Member Since</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Addis Properties Ltd", listings: 42, commission: "10%", status: "Active", date: "Jan 2025" },
                      { name: "Capital Realty Group", listings: 38, commission: "10%", status: "Active", date: "Mar 2025" },
                      { name: "Elite Buildings Inc", listings: 28, commission: "8%", status: "Verified", date: "Feb 2025" },
                      { name: "Metro Office Solutions", listings: 15, commission: "10%", status: "Pending", date: "May 2026" },
                    ].map((broker, idx) => (
                      <TableRow key={idx} className="hover:bg-slate-50">
                        <TableCell className="font-medium text-slate-900">{broker.name}</TableCell>
                        <TableCell className="text-slate-700">{broker.listings}</TableCell>
                        <TableCell className="text-slate-700">{broker.commission}</TableCell>
                        <TableCell>
                          <Badge className={`border-none text-xs ${
                            broker.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                            broker.status === "Verified" ? "bg-blue-100 text-blue-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {broker.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{broker.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpis" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Avg Listings/Broker", value: "30.75" },
                { label: "Avg Commission Rate", value: "9.5%" },
                { label: "Network Revenue", value: "ETB 285K" },
                { label: "Growth (30d)", value: "+12%" },
              ].map((kpi, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">{kpi.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (view === "credit-partners") {
    return <CreditPartnersManagementView />
  }

  if (view === "system-helpdesk") {
    return <SystemHelpdeskView />
  }

  // Financial sub-views
  if (view === "settlements") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fund Settlements</h1>
          <p className="mt-1 text-slate-500">
            Track and manage fund transfers between partners and the platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Settlement Transactions</CardTitle>
            <CardDescription>Recent fund transfers and settlement history</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Partner/Entity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 1, entity: "Chapa Payments", amount: "ETB 125,000", type: "Deposit", status: "Completed", date: "May 5, 2026", ref: "REF-20260505-001" },
                  { id: 2, entity: "Telebirr Gateway", amount: "ETB 85,500", type: "Payout", status: "Completed", date: "May 4, 2026", ref: "REF-20260504-002" },
                  { id: 3, entity: "CBE Birr", amount: "ETB 42,300", type: "Deposit", status: "Pending", date: "May 6, 2026", ref: "REF-20260506-003" },
                  { id: 4, entity: "Nicomas Reserve", amount: "ETB 200,000", type: "Transfer", status: "Processing", date: "May 6, 2026", ref: "REF-20260506-004" },
                ].map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">{tx.entity}</TableCell>
                    <TableCell className="text-slate-700">{tx.amount}</TableCell>
                    <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${
                        tx.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                        tx.status === "Pending" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{tx.date}</TableCell>
                    <TableCell className="text-slate-600">{tx.ref}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (view === "promo-codes") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Promotional Codes</h1>
            <p className="mt-1 text-slate-500">
              Create and manage discount codes for platform growth
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Code
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Promo Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { code: "LAUNCH25", discount: "25%", type: "Percentage", uses: "142/500", status: "Active", expires: "Jun 30, 2026" },
                  { code: "WELCOME100", discount: "ETB 100", type: "Fixed", uses: "89/unlimited", status: "Active", expires: "Dec 31, 2026" },
                  { code: "PARTNER20", discount: "20%", type: "Percentage", uses: "0/100", status: "Active", expires: "May 31, 2026" },
                  { code: "SUMMER50", discount: "ETB 50", type: "Fixed", uses: "256/1000", status: "Expired", expires: "May 5, 2026" },
                ].map((promo) => (
                  <TableRow key={promo.code} className="hover:bg-slate-50">
                    <TableCell className="font-mono font-semibold text-slate-900">{promo.code}</TableCell>
                    <TableCell className="text-slate-700">{promo.discount}</TableCell>
                    <TableCell><Badge variant="outline">{promo.type}</Badge></TableCell>
                    <TableCell className="text-slate-600">{promo.uses}</TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${promo.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                        {promo.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{promo.expires}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Knowledge base view
  if (view === "knowledge-base") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Knowledge Base</h1>
            <p className="mt-1 text-slate-500">
              Create and manage help documentation for users
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Articles & Documentation</CardTitle>
            <CardDescription>47 published articles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { title: "Getting Started with WRM", category: "Basics", views: "2,847", date: "May 1, 2026", status: "Published" },
                  { title: "Building Listings Best Practices", category: "Listings", views: "1,923", date: "Apr 28, 2026", status: "Published" },
                  { title: "Payment Methods Guide", category: "Payments", views: "1,456", date: "Apr 20, 2026", status: "Published" },
                  { title: "New Feature: Advanced Search", category: "Features", views: "342", date: "May 3, 2026", status: "Draft" },
                ].map((article, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">{article.title}</TableCell>
                    <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                    <TableCell className="text-slate-700">{article.views}</TableCell>
                    <TableCell className="text-slate-600">{article.date}</TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${
                        article.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {article.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Feature flags view
  if (view === "feature-flags") {
    const [flags, setFlags] = useState([
      { id: 1, name: "Advanced Search", description: "Full-text search and filters", enabled: true, rollout: 100, risk: "Low" },
      { id: 2, name: "AI Recommendations", description: "Machine learning suggestions", enabled: true, rollout: 50, risk: "Medium" },
      { id: 3, name: "Video Listings", description: "Property video support", enabled: false, rollout: 25, risk: "High" },
      { id: 4, name: "3D Tours", description: "Virtual property tours", enabled: false, rollout: 10, risk: "High" },
      { id: 5, name: "Blockchain Verification", description: "Blockchain-based title verification", enabled: false, rollout: 5, risk: "Critical" },
    ])

    const toggleFlag = (id: number) => {
      setFlags(flags.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))
      toast.success("Feature Flag Updated")
    }

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Feature Flags (Beta)</h1>
          <p className="mt-1 text-slate-500">
            Enable/disable experimental features and manage rollout percentages
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Feature Flags</CardTitle>
            <CardDescription>Control feature availability and rollout strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {flags.map((flag) => (
              <div key={flag.id} className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{flag.name}</h3>
                  <p className="text-sm text-slate-600">{flag.description}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-600">Rollout:</span>
                      <div className="w-32 h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${flag.rollout}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{flag.rollout}%</span>
                    </div>
                    <Badge className={`border-none text-xs ${
                      flag.risk === "Low" ? "bg-emerald-100 text-emerald-700" :
                      flag.risk === "Medium" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {flag.risk} Risk
                    </Badge>
                  </div>
                </div>
                <Switch
                  checked={flag.enabled}
                  onCheckedChange={() => toggleFlag(flag.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Settings view - Full System Configuration & Security
  return <StandaloneSystemSettingsView />
}

// Translation Row Component with inline editing
function TranslationRow({
  item,
  onSave,
}: {
  item: TranslationString
  onSave: (id: string, newAmharic: string) => void
}) {
  const [amharicValue, setAmharicValue] = useState(item.amharicTranslation)

  return (
    <TableRow>
      <TableCell className="text-slate-600">{item.component}</TableCell>
      <TableCell className="font-medium text-slate-900">{item.englishString}</TableCell>
      <TableCell>
        <Input
          value={amharicValue}
          onChange={(e) => setAmharicValue(e.target.value)}
          className="font-medium"
          style={{ fontFamily: "Nyala, Abyssinica SIL, sans-serif" }}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-600 hover:text-orange-600"
          onClick={() => onSave(item.id, amharicValue)}
        >
          <Save className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
