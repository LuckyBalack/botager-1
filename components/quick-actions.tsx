"use client"

import { Plus, FileText, Users, Wrench } from "lucide-react"

type QuickAction = {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  color: "blue" | "emerald" | "amber" | "violet"
}

type QuickActionsProps = {
  onAction?: (action: string) => void
}

const actions: QuickAction[] = [
  {
    id: "add-property",
    label: "Add Property",
    description: "Register a new property",
    icon: Plus,
    color: "blue",
    onClick: () => {},
  },
  {
    id: "add-tenant",
    label: "Add Tenant",
    description: "Add new tenant to lease",
    icon: Users,
    color: "emerald",
    onClick: () => {},
  },
  {
    id: "create-invoice",
    label: "Create Invoice",
    description: "Generate new invoice",
    icon: FileText,
    color: "amber",
    onClick: () => {},
  },
  {
    id: "new-maintenance",
    label: "Report Issue",
    description: "Create maintenance ticket",
    icon: Wrench,
    color: "violet",
    onClick: () => {},
  },
]

function getBgColor(color: string) {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-700 hover:bg-blue-100"
    case "emerald":
      return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    case "amber":
      return "bg-amber-50 text-amber-700 hover:bg-amber-100"
    case "violet":
      return "bg-violet-50 text-violet-700 hover:bg-violet-100"
  }
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <section aria-label="Quick Actions" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                action.onClick()
                onAction?.(action.id)
              }}
              className={`rounded-lg border border-slate-200 p-4 text-left transition-colors ${getBgColor(
                action.color
              )}`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <p className="font-semibold text-sm">{action.label}</p>
              <p className="text-xs opacity-75 mt-1">{action.description}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
