"use client"

import { useState } from "react"
import { Plus, Clock, Mail, Receipt, AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
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
import { toast } from "sonner"

type Automation = {
  id: string
  name: string
  description: string
  rule: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
}

const initialAutomations: Automation[] = [
  {
    id: "1",
    name: "Late Fee Auto-Billing",
    description: "Automatically add late fees to overdue invoices",
    rule: "If invoice is 3 days overdue, add 5% penalty",
    icon: AlertTriangle,
    active: true,
  },
  {
    id: "2",
    name: "Lease Renewal Reminders",
    description: "Send reminders before lease expiration",
    rule: "Send SMS/Email 60 days before expiration",
    icon: Mail,
    active: true,
  },
  {
    id: "3",
    name: "Invoice Generation",
    description: "Automatically generate and send invoices",
    rule: "Draft and send invoices on the 25th of every month",
    icon: Receipt,
    active: true,
  },
]

const triggers = [
  { id: "invoice_overdue", label: "Invoice is overdue" },
  { id: "lease_expiring", label: "Lease is expiring soon" },
  { id: "maintenance_created", label: "Maintenance request created" },
  { id: "payment_received", label: "Payment is received" },
  { id: "tenant_moved_out", label: "Tenant moves out" },
  { id: "date_monthly", label: "On specific day each month" },
]

const actions = [
  { id: "send_email", label: "Send email notification" },
  { id: "send_sms", label: "Send SMS notification" },
  { id: "add_fee", label: "Add late fee to invoice" },
  { id: "generate_invoice", label: "Generate new invoice" },
  { id: "create_task", label: "Create task for staff" },
  { id: "update_status", label: "Update record status" },
]

function AutomationCard({
  automation,
  onToggle,
}: {
  automation: Automation
  onToggle: (id: string) => void
}) {
  const Icon = automation.icon

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
          <Icon className="h-6 w-6 text-orange-600" />
        </div>
        <Switch
          checked={automation.active}
          onCheckedChange={() => onToggle(automation.id)}
          className="data-[state=checked]:bg-emerald-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-900">{automation.name}</h3>
        <p className="text-sm text-slate-500">{automation.description}</p>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
        <Clock className="h-4 w-4 text-slate-400" />
        <span className="text-sm text-slate-600">{automation.rule}</span>
      </div>
    </div>
  )
}

export function AutomationsView() {
  const [automations, setAutomations] = useState(initialAutomations)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [selectedTrigger, setSelectedTrigger] = useState("")
  const [selectedAction, setSelectedAction] = useState("")

  const handleToggle = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    )
    const automation = automations.find((a) => a.id === id)
    if (automation) {
      toast.success(
        automation.active ? "Automation Disabled" : "Automation Enabled",
        {
          description: `"${automation.name}" has been ${automation.active ? "disabled" : "enabled"}.`,
        }
      )
    }
  }

  const handleCreateWorkflow = () => {
    if (selectedTrigger && selectedAction) {
      const triggerLabel = triggers.find((t) => t.id === selectedTrigger)?.label
      const actionLabel = actions.find((a) => a.id === selectedAction)?.label
      
      const newAutomation: Automation = {
        id: String(automations.length + 1),
        name: "Custom Workflow",
        description: `${triggerLabel} -> ${actionLabel}`,
        rule: `IF ${triggerLabel?.toLowerCase()} THEN ${actionLabel?.toLowerCase()}`,
        icon: Clock,
        active: true,
      }
      
      setAutomations((prev) => [...prev, newAutomation])
      setCreateModalOpen(false)
      toast.success("Workflow Created", {
        description: "Your custom automation has been created and activated.",
      })
      setSelectedTrigger("")
      setSelectedAction("")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Automated Workflows</h1>
        <p className="text-sm text-slate-500">
          Set it and forget it. Let WRM handle the repetitive tasks.
        </p>
      </div>

      {/* Active Automations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {automations.map((automation) => (
          <AutomationCard
            key={automation.id}
            automation={automation}
            onToggle={handleToggle}
          />
        ))}

        {/* Create Custom Workflow Button */}
        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-slate-500 transition-colors hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-current">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-medium">Create Custom Workflow</span>
        </button>
      </div>

      {/* Create Workflow Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Custom Workflow</DialogTitle>
            <DialogDescription>
              Build an automation using the If This Then That pattern
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-4">
            {/* IF Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">
                  IF
                </span>
                <Label className="text-slate-700">Select Trigger</Label>
              </div>
              <Select value={selectedTrigger} onValueChange={setSelectedTrigger}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose what triggers this workflow" />
                </SelectTrigger>
                <SelectContent>
                  {triggers.map((trigger) => (
                    <SelectItem key={trigger.id} value={trigger.id}>
                      {trigger.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Arrow */}
            {selectedTrigger && (
              <div className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* THEN Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-orange-600 text-xs font-bold text-white">
                  DO
                </span>
                <Label className="text-slate-700">Select Action</Label>
              </div>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose what action to perform" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action) => (
                    <SelectItem key={action.id} value={action.id}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            {selectedTrigger && selectedAction && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Preview:</span> When{" "}
                  <span className="font-medium text-slate-900">
                    {triggers.find((t) => t.id === selectedTrigger)?.label.toLowerCase()}
                  </span>
                  , automatically{" "}
                  <span className="font-medium text-slate-900">
                    {actions.find((a) => a.id === selectedAction)?.label.toLowerCase()}
                  </span>
                  .
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={handleCreateWorkflow}
              disabled={!selectedTrigger || !selectedAction}
              className="w-full rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Workflow
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
