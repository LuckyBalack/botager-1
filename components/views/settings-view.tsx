"use client"

import { useState } from "react"
import { Upload, User, Bell, Shield, Palette, Globe, CreditCard, Users, Receipt, Plus, Trash2, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { taxRules as initialTaxRules, type TaxRule } from "@/lib/data"
import type { ViewKey } from "@/components/app-sidebar"

interface SettingsViewProps {
  onNavigate: (view: ViewKey) => void
  onSystemSubscription?: () => void
}

export function SettingsView({ onNavigate, onSystemSubscription }: SettingsViewProps) {
  const [taxRulesList, setTaxRulesList] = useState<TaxRule[]>(initialTaxRules)
  const [autoApplyTax, setAutoApplyTax] = useState(true)
  const [addTaxModalOpen, setAddTaxModalOpen] = useState(false)
  const [newTaxName, setNewTaxName] = useState("")
  const [newTaxRate, setNewTaxRate] = useState("")

  const handleToggleTax = (id: string) => {
    setTaxRulesList(
      taxRulesList.map((tax) =>
        tax.id === id ? { ...tax, active: !tax.active } : tax
      )
    )
  }

  const handleDeleteTax = (id: string) => {
    setTaxRulesList(taxRulesList.filter((tax) => tax.id !== id))
  }

  const handleAddTax = () => {
    if (newTaxName && newTaxRate) {
      const newTax: TaxRule = {
        id: `tax-${Date.now()}`,
        name: newTaxName,
        rate: parseFloat(newTaxRate),
        active: true,
      }
      setTaxRulesList([...taxRulesList, newTax])
      setNewTaxName("")
      setNewTaxRate("")
      setAddTaxModalOpen(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-1 text-slate-500">
            Configure your account, notifications, and workspace preferences.
          </p>
        </div>
        <Button
          className="gap-2 bg-orange-500 hover:bg-orange-600"
          onClick={() => onNavigate("data-import")}
        >
          <Upload className="h-4 w-4" />
          Import Data
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-600" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" defaultValue="Alemu Getachew" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alemu@nicomasdigitals.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+251 91 234 5678" />
            </div>
            <Button variant="outline" className="mt-2 self-start">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-slate-600" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>Choose how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-slate-500">Receive email alerts for important updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-slate-500">Get text messages for urgent matters</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Reminders</Label>
                <p className="text-sm text-slate-500">Notify before payment due dates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Lease Expiry Alerts</Label>
                <p className="text-sm text-slate-500">Remind 30 days before lease ends</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-slate-600" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Protect your account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-slate-500">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="mt-2 self-start">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-slate-600" />
              <CardTitle>Display & Language</CardTitle>
            </div>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="am">Amharic</SelectItem>
                  <SelectItem value="or">Oromifa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Currency</Label>
              <Select defaultValue="etb">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="etb">ETB (Ethiopian Birr)</SelectItem>
                  <SelectItem value="usd">USD (US Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Date Format</Label>
              <Select defaultValue="dmy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tax & Compliance Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-slate-600" />
                <CardTitle>Tax & Compliance</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddTaxModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Tax Rule
              </Button>
            </div>
            <CardDescription>Configure tax rules for invoice generation</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Auto-apply toggle */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <Label className="text-base">Automatically apply taxes to all invoices</Label>
                <p className="text-sm text-slate-500">
                  When enabled, all generated invoices will include applicable taxes
                </p>
              </div>
              <Switch checked={autoApplyTax} onCheckedChange={setAutoApplyTax} />
            </div>

            {/* Tax Rules List */}
            <div className="flex flex-col gap-3">
              <Label className="text-base">Tax Rules</Label>
              <div className="rounded-lg border border-slate-200 divide-y divide-slate-200">
                {taxRulesList.map((tax) => (
                  <div
                    key={tax.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={tax.active}
                        onCheckedChange={() => handleToggleTax(tax.id)}
                      />
                      <div>
                        <p className="font-medium text-slate-900">{tax.name}</p>
                        <p className="text-sm text-slate-500">{tax.rate}% rate</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-red-500"
                      onClick={() => handleDeleteTax(tax.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {taxRulesList.length === 0 && (
                  <div className="p-4 text-center text-slate-500">
                    No tax rules configured
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access commonly used settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
                onClick={() => onNavigate("team-settings")}
              >
                <Users className="h-6 w-6" />
                <span>Team & Roles</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
                onClick={() => onNavigate("data-import")}
              >
                <Upload className="h-6 w-6" />
                <span>Import Data</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
              >
                <CreditCard className="h-6 w-6" />
                <span>Payment Methods</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-6"
              >
                <Globe className="h-6 w-6" />
                <span>API & Integrations</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-6 border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                onClick={onSystemSubscription}
              >
                <Crown className="h-6 w-6 text-orange-500" />
                <span>Subscription</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Tax Rule Modal */}
      <Dialog open={addTaxModalOpen} onOpenChange={setAddTaxModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Tax Rule</DialogTitle>
            <DialogDescription>
              Create a new tax rule for invoice calculations.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tax-name">Tax Name</Label>
              <Input
                id="tax-name"
                placeholder="e.g., VAT, Service Tax"
                value={newTaxName}
                onChange={(e) => setNewTaxName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                placeholder="e.g., 15"
                value={newTaxRate}
                onChange={(e) => setNewTaxRate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddTaxModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddTax}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Add Tax Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
