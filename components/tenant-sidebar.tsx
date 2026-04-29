"use client"

import { FileText, Receipt, Wrench, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export type TenantViewKey = "my-lease" | "invoices" | "maintenance" | "messages"

type NavItem = {
  key: TenantViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tenantNav: NavItem[] = [
  { key: "my-lease", label: "My Lease", icon: FileText },
  { key: "invoices", label: "Invoices & Payments", icon: Receipt },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "messages", label: "Messages", icon: MessageSquare },
]

type TenantSidebarProps = {
  activeView: TenantViewKey
  onNavigate: (view: TenantViewKey) => void
}

export function TenantSidebar({ activeView, onNavigate }: TenantSidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-6 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Tenant Portal
        </h1>
        <p className="text-sm text-slate-500">Manage your tenancy</p>
      </div>

      <div className="mt-6 h-px w-full bg-slate-200" />

      <nav className="mt-6 flex flex-col gap-1" aria-label="Tenant navigation">
        {tenantNav.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                isActive
                  ? "bg-slate-100 font-semibold text-slate-900"
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto">
        <p className="text-xs text-slate-400">© 2024 Nicomas Digitals</p>
      </div>
    </aside>
  )
}
