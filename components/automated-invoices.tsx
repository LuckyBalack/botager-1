"use client"

import { useState } from "react"
import { Clock, CheckCircle2, AlertCircle, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type AutomationRule = {
  id: string
  name: string
  type: "recurring" | "event-based"
  status: "active" | "inactive"
  frequency?: string
  nextRun?: string
  lastRun?: string
}

const automationRules: AutomationRule[] = [
  {
    id: "auto-1",
    name: "Monthly Rent Invoice",
    type: "recurring",
    status: "active",
    frequency: "Monthly (1st of month)",
    nextRun: "May 1, 2024",
    lastRun: "Apr 1, 2024",
  },
  {
    id: "auto-2",
    name: "Payment Reminder - 3 Days Before Due",
    type: "event-based",
    status: "active",
    lastRun: "Apr 28, 2024",
  },
  {
    id: "auto-3",
    name: "Late Fee Application",
    type: "event-based",
    status: "active",
    lastRun: "Apr 25, 2024",
  },
  {
    id: "auto-4",
    name: "Quarterly Utility Invoice",
    type: "recurring",
    status: "inactive",
    frequency: "Quarterly",
  },
]

function getStatusColor(status: string) {
  return status === "active"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-slate-100 text-slate-700"
}

function getTypeColor(type: string) {
  return type === "recurring"
    ? "bg-blue-100 text-blue-700"
    : "bg-purple-100 text-purple-700"
}

export function AutomatedInvoices() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    type: "recurring" as const,
    frequency: "monthly",
    enabled: true,
  })

  const handleCreateRule = () => {
    setIsDialogOpen(false)
    setNewRule({
      name: "",
      type: "recurring",
      frequency: "monthly",
      enabled: true,
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Automation Rules</h3>
        <Button
          onClick={() => setIsDialogOpen(true)}
          size="sm"
          variant="outline"
        >
          <Settings className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <div className="space-y-3">
        {automationRules.map((rule) => (
          <div
            key={rule.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-900">{rule.name}</h4>
                  <Badge className={getTypeColor(rule.type)}>
                    {rule.type === "recurring" ? "Recurring" : "Event-Based"}
                  </Badge>
                  <Badge className={getStatusColor(rule.status)}>
                    {rule.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="mt-3 space-y-1">
                  {rule.frequency && (
                    <p className="text-sm text-slate-600">
                      Frequency: {rule.frequency}
                    </p>
                  )}
                  {rule.nextRun && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      Next run: {rule.nextRun}
                    </div>
                  )}
                  {rule.lastRun && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Last run: {rule.lastRun}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <button className="text-sm font-medium text-teal-700 hover:text-teal-800">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Automation Rule</DialogTitle>
            <DialogDescription>
              Set up automatic invoice generation or payment reminders
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input
                id="rule-name"
                placeholder="e.g., Monthly Rent Invoice"
                value={newRule.name}
                onChange={(e) =>
                  setNewRule({ ...newRule, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="rule-type">Rule Type</Label>
              <Select
                value={newRule.type}
                onValueChange={(value) =>
                  setNewRule({
                    ...newRule,
                    type: value as "recurring" | "event-based",
                  })
                }
              >
                <SelectTrigger id="rule-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="event-based">Event-Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newRule.type === "recurring" && (
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={newRule.frequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Checkbox
                id="enabled"
                checked={newRule.enabled}
                onCheckedChange={(checked) =>
                  setNewRule({ ...newRule, enabled: checked === true })
                }
              />
              <Label htmlFor="enabled" className="cursor-pointer">
                Enable this rule immediately
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRule}>Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
