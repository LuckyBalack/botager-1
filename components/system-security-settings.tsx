"use client"

import { useState } from "react"
import { Shield, Key, Lock, Eye, Copy, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function SystemSecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: "12",
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: "key-1",
      name: "Production API Key",
      key: "sk_live_••••••••••••••••",
      created: "2024-01-01",
      lastUsed: "2024-01-15 10:30",
      status: "Active",
    },
    {
      id: "key-2",
      name: "Staging API Key",
      key: "sk_test_••••••••••••••••",
      created: "2024-01-05",
      lastUsed: "2024-01-14 15:45",
      status: "Active",
    },
  ])

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard")
  }

  const handleRevokeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
    toast.success("API key revoked")
  }

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Require 2FA for all admin accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa-toggle">Enable 2FA Requirement</Label>
            <Switch
              id="2fa-toggle"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          {twoFactorEnabled && (
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
              2FA is required for all administrative accounts. Users will receive setup instructions upon next login.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password Policy
          </CardTitle>
          <CardDescription>Configure password requirements for all users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Minimum Length</Label>
              <div className="mt-2 flex items-center gap-2 rounded border border-slate-200 p-2">
                <span className="text-slate-600">{passwordPolicy.minLength}</span>
                <span className="text-sm text-slate-500">characters</span>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <Label className="text-slate-600">Require Uppercase</Label>
                  <Switch checked={passwordPolicy.requireUppercase} disabled />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <Label className="text-slate-600">Require Numbers</Label>
                  <Switch checked={passwordPolicy.requireNumbers} disabled />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <Label className="text-slate-600">Require Special Characters</Label>
                  <Switch checked={passwordPolicy.requireSpecialChars} disabled />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys
            </CardTitle>
            <CardDescription>Manage API keys for system integrations</CardDescription>
          </div>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Key className="h-4 w-4" />
            Generate New Key
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{apiKey.name}</h3>
                    <Badge variant="outline" className="bg-emerald-50">
                      {apiKey.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2 font-mono text-sm text-slate-600">
                    {apiKey.key}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyApiKey(apiKey.key)}
                      className="h-6 w-6"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Created {apiKey.created} • Last used {apiKey.lastUsed}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleRevokeApiKey(apiKey.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Session Management
          </CardTitle>
          <CardDescription>Configure session timeout and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="timeout">Session Timeout (minutes)</Label>
            <div className="mt-2 flex items-center gap-2 rounded border border-slate-200 p-2">
              <span className="text-slate-900">{sessionTimeout}</span>
              <span className="text-sm text-slate-500">minutes of inactivity</span>
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
            Sessions will automatically end after {sessionTimeout} minutes of inactivity for security.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
