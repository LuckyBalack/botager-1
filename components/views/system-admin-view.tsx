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

  if (view === "credit-partners") {
    return <CreditPartnersDeepView />
  }

  if (view === "system-helpdesk") {
    return <SystemHelpdeskView />
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
