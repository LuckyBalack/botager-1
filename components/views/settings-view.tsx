"use client"

import { Upload, User, Bell, Shield, Palette, Globe, CreditCard, Users } from "lucide-react"
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
import type { ViewKey } from "@/components/app-sidebar"

interface SettingsViewProps {
  onNavigate: (view: ViewKey) => void
}

export function SettingsView({ onNavigate }: SettingsViewProps) {
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

        {/* Quick Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access commonly used settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
