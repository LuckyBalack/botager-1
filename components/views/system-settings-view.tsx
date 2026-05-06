"use client"

import { useState } from "react"
import {
  Globe,
  Languages,
  ClipboardList,
  Wrench,
  Database,
  Trash2,
  AlertTriangle,
  Download,
  Search,
  Save,
  Calendar,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { auditLogs, translationStrings, type TranslationString } from "@/lib/data"

// Global Config Tab
function GlobalConfigTab() {
  const [vatRate, setVatRate] = useState("15")
  const [whtRate, setWhtRate] = useState("2")
  const [enforceVat, setEnforceVat] = useState(true)
  const [gatewayFee, setGatewayFee] = useState("2.5")
  const [nicomasFee, setNicomasFee] = useState("500")

  const handleSaveGlobalConfig = () => {
    toast.success("Configuration Saved", {
      description: "Global system configuration has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Tax Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Tax Settings
          </CardTitle>
          <CardDescription>Configure VAT and withholding tax rates platform-wide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vat-rate">Default VAT Rate (%)</Label>
              <Input
                id="vat-rate"
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                placeholder="15"
                step="0.01"
              />
              <p className="text-xs text-slate-500">Current: {vatRate}%</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wht-rate">Default Withholding Tax (WHT) Rate (%)</Label>
              <Input
                id="wht-rate"
                type="number"
                value={whtRate}
                onChange={(e) => setWhtRate(e.target.value)}
                placeholder="2"
                step="0.01"
              />
              <p className="text-xs text-slate-500">Current: {whtRate}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="font-medium text-slate-900">Enforce VAT on all commercial leases</p>
              <p className="text-sm text-slate-500">This setting applies to the entire platform</p>
            </div>
            <Switch checked={enforceVat} onCheckedChange={setEnforceVat} />
          </div>
        </CardContent>
      </Card>

      {/* Platform Monetization Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Platform Monetization
          </CardTitle>
          <CardDescription>Configure platform fees and service charges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gateway-fee">Standard Gateway Transaction Fee (%)</Label>
              <Input
                id="gateway-fee"
                type="number"
                value={gatewayFee}
                onChange={(e) => setGatewayFee(e.target.value)}
                placeholder="2.5"
                step="0.01"
              />
              <p className="text-xs text-slate-500">Current: {gatewayFee}%</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nicomas-fee">Nicomas Digital Service Fee (ETB/Month)</Label>
              <Input
                id="nicomas-fee"
                type="number"
                value={nicomasFee}
                onChange={(e) => setNicomasFee(e.target.value)}
                placeholder="500"
                step="1"
              />
              <p className="text-xs text-slate-500">Current: ETB {nicomasFee}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={handleSaveGlobalConfig}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Global Configurations
        </Button>
      </div>
    </div>
  )
}

// Localization Tab
function LocalizationTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [translations, setTranslations] = useState<TranslationString[]>(translationStrings)

  const filteredTranslations = translations.filter(
    (t) =>
      t.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.englishString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.amharicTranslation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveTranslation = (id: string, newAmharic: string) => {
    setTranslations(
      translations.map((t) =>
        t.id === id ? { ...t, amharicTranslation: newAmharic } : t
      )
    )
    setEditingId(null)
    toast.success("Translation Saved", {
      description: "Translation string has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            UI String Translations
          </CardTitle>
          <CardDescription>Manage English and Amharic translations for the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by component, English, or Amharic text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Translation Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Interface Component</TableHead>
                  <TableHead className="font-semibold text-slate-700">English String</TableHead>
                  <TableHead className="font-semibold text-slate-700">Amharic Translation</TableHead>
                  <TableHead className="w-20 text-center font-semibold text-slate-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTranslations.map((translation) => (
                  <TableRow key={translation.id}>
                    <TableCell className="font-medium text-slate-900">
                      {translation.component}
                    </TableCell>
                    <TableCell className="text-slate-600">{translation.englishString}</TableCell>
                    <TableCell>
                      {editingId === translation.id ? (
                        <Input
                          value={translation.amharicTranslation}
                          onChange={(e) => {
                            setTranslations(
                              translations.map((t) =>
                                t.id === translation.id
                                  ? { ...t, amharicTranslation: e.target.value }
                                  : t
                              )
                            )
                          }}
                          autoFocus
                          className="text-slate-900"
                        />
                      ) : (
                        <span className="text-slate-900">{translation.amharicTranslation}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {editingId === translation.id ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleSaveTranslation(
                              translation.id,
                              translations.find((t) => t.id === translation.id)?.amharicTranslation || ""
                            )
                          }
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(translation.id)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTranslations.length === 0 && (
            <div className="flex items-center justify-center py-8 text-slate-500">
              <p>No translations match your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Security Audit Logs Tab
function AuditLogsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = searchTerm === "" || 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm)

    const matchesRole = selectedRole === "all" || log.role === selectedRole

    return matchesSearch && matchesRole
  })

  const handleExportCSV = () => {
    const headers = ["Timestamp", "User Name", "Email", "Role", "IP Address", "Action"]
    const rows = filteredLogs.map((log) => [
      log.timestamp,
      log.userName,
      log.userEmail,
      log.role,
      log.ipAddress,
      log.action,
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
    link.click()

    toast.success("Export Complete", {
      description: "Audit logs have been exported to CSV.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Security Audit Logs
              </CardTitle>
              <CardDescription>
                Track all major platform actions for fraud prevention and compliance
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Search */}
            <div className="sm:col-span-1">
              <Label htmlFor="audit-search" className="text-xs text-slate-600">
                Search
              </Label>
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                <Search className="h-4 w-4 text-slate-400" />
                <Input
                  id="audit-search"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="sm:col-span-1">
              <Label htmlFor="role-filter" className="text-xs text-slate-600">
                Filter by Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role-filter" className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="System Admin">System Admin</SelectItem>
                  <SelectItem value="Building Owner">Building Owner</SelectItem>
                  <SelectItem value="Tenant">Tenant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Placeholder */}
            <div className="sm:col-span-1">
              <Label className="text-xs text-slate-600">Date Range</Label>
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">Last 30 days</span>
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Timestamp</TableHead>
                  <TableHead className="font-semibold text-slate-700">User</TableHead>
                  <TableHead className="font-semibold text-slate-700">Role</TableHead>
                  <TableHead className="font-semibold text-slate-700">IP Address</TableHead>
                  <TableHead className="font-semibold text-slate-700">Action Taken</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm text-slate-600">{log.timestamp}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{log.userName}</p>
                          <p className="text-xs text-slate-500">{log.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-200">
                          {log.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-slate-600">
                        {log.ipAddress}
                      </TableCell>
                      <TableCell className="max-w-md text-slate-900">{log.action}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-slate-500">
                      No audit logs match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// System Maintenance Tab
function SystemMaintenanceTab() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [lastBackup] = useState("Today, 03:00 AM")

  const handleManualBackup = () => {
    toast.success("Backup Started", {
      description: "Database backup has been triggered. This may take several minutes.",
    })
  }

  const handleClearCache = () => {
    toast.success("Cache Cleared", {
      description: "Application cache has been successfully cleared.",
    })
  }

  const handleMaintenanceMode = (enabled: boolean) => {
    setMaintenanceMode(enabled)
    if (enabled) {
      toast.warning("Maintenance Mode Enabled", {
        description: "All Owners and Tenants have been locked out. Enable carefully!",
      })
    } else {
      toast.success("Maintenance Mode Disabled", {
        description: "Users can now access the platform again.",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Database Backup Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Backup
          </CardTitle>
          <CardDescription>Manage platform data backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Last Backup</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{lastBackup}</p>
          </div>
          <Button
            className="w-full bg-slate-800 hover:bg-slate-900"
            onClick={handleManualBackup}
          >
            <Database className="h-4 w-4 mr-2" />
            Trigger Manual DB Backup
          </Button>
        </CardContent>
      </Card>

      {/* Cache Management Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Cache Management
          </CardTitle>
          <CardDescription>Clear application cache to reset system performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-slate-800 hover:bg-slate-900"
            onClick={handleClearCache}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Application Cache
          </Button>
        </CardContent>
      </Card>

      {/* Maintenance Mode Card */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertTriangle className="h-5 w-5" />
            Maintenance Mode
          </CardTitle>
          <CardDescription className="text-red-800">
            Warning: This will lock out all Owners and Tenants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-red-200 bg-white p-4">
            <div>
              <p className="font-medium text-slate-900">Enable Maintenance Mode</p>
              <p className="text-sm text-slate-500">
                Use only during major upgrades and system maintenance
              </p>
            </div>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={handleMaintenanceMode}
              className="data-[state=checked]:bg-red-600"
            />
          </div>
          {maintenanceMode && (
            <div className="rounded-lg border border-red-200 bg-red-100 p-3">
              <p className="text-sm font-medium text-red-900">
                ⚠️ Maintenance mode is currently ENABLED. All users are locked out.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// User Management Tab
function UserManagementTab() {
  const [adminUsers, setAdminUsers] = useState([
    { id: "admin-1", name: "Abebe Assefa", email: "abebe@wrm.com", role: "Super Admin", status: "Active", joinDate: "Jan 15, 2025" },
    { id: "admin-2", name: "Marta Kebede", email: "marta@wrm.com", role: "Admin", status: "Active", joinDate: "Feb 20, 2025" },
    { id: "admin-3", name: "Girma Tesfaye", email: "girma@wrm.com", role: "Admin", status: "Active", joinDate: "Mar 10, 2025" },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminRole, setNewAdminRole] = useState("Admin")

  const handleAddAdmin = () => {
    if (!newAdminEmail.trim()) {
      toast.error("Email Required", { description: "Please enter an email address." })
      return
    }
    setAdminUsers([
      ...adminUsers,
      {
        id: `admin-${Date.now()}`,
        name: "New Administrator",
        email: newAdminEmail,
        role: newAdminRole,
        status: "Pending",
        joinDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      },
    ])
    toast.success("Admin Added", {
      description: `Invitation sent to ${newAdminEmail}. They will appear active after confirming.`,
    })
    setNewAdminEmail("")
    setNewAdminRole("Admin")
    setShowAddForm(false)
  }

  const handleRevokeAdmin = (id: string) => {
    setAdminUsers(adminUsers.filter((a) => a.id !== id))
    toast.warning("Admin Revoked", { description: "The admin access has been removed." })
  }

  const filteredAdmins = adminUsers.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Admin Users Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Administrators</CardTitle>
            <CardDescription>Manage access and permissions for platform administrators</CardDescription>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Address</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-role">Admin Role</Label>
                <Select value={newAdminRole} onValueChange={setNewAdminRole}>
                  <SelectTrigger id="admin-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-700">
                  Send Invitation
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="flex gap-2">
            <Search className="h-5 w-5 text-slate-400 mt-2" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Admin Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Email</TableHead>
                  <TableHead className="font-semibold text-slate-700">Role</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Join Date</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">{admin.name}</TableCell>
                    <TableCell className="text-slate-600">{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50">
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border-none text-xs ${
                          admin.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{admin.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRevokeAdmin(admin.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Card */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys & Integrations</CardTitle>
          <CardDescription>Manage API keys for third-party integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Payment Gateway API Key</p>
                <p className="text-sm text-slate-600">Chapa Integration</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-none">Active</Badge>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              Rotate Key
            </Button>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">SMS Gateway API Key</p>
                <p className="text-sm text-slate-600">Telebirr Integration</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-none">Active</Badge>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              Rotate Key
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main System Settings View Component
export function SystemSettingsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Configuration & Security</h1>
        <p className="mt-1 text-slate-500">
          Manage tax settings, localization, security audits, and system maintenance
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="global-config" className="w-full">
        <TabsList className="w-full grid gap-0 sm:w-auto sm:grid-cols-5">
          <TabsTrigger value="global-config" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Global Config</span>
          </TabsTrigger>
          <TabsTrigger value="localization" className="gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Localization</span>
          </TabsTrigger>
          <TabsTrigger value="audit-logs" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Audit Logs</span>
          </TabsTrigger>
          <TabsTrigger value="user-management" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">User Management</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Maintenance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global-config" className="mt-6">
          <GlobalConfigTab />
        </TabsContent>

        <TabsContent value="localization" className="mt-6">
          <LocalizationTab />
        </TabsContent>

        <TabsContent value="audit-logs" className="mt-6">
          <AuditLogsTab />
        </TabsContent>

        <TabsContent value="user-management" className="mt-6">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <SystemMaintenanceTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
