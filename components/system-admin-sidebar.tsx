"use client"

import { ShieldCheck, Building2, CreditCard, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export type SystemAdminViewKey = "moderation" | "credit-partners" | "settings"

type NavItem = {
  key: SystemAdminViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { key: "moderation", label: "Moderation Queue", icon: ShieldCheck },
  { key: "credit-partners", label: "Credit Partners", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
]

type SystemAdminSidebarProps = {
  activeView: SystemAdminViewKey
  onNavigate: (view: SystemAdminViewKey) => void
  onLogout?: () => void
}

export function SystemAdminSidebar({
  activeView,
  onNavigate,
  onLogout,
}: SystemAdminSidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-900 px-6 py-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white">WRM</span>
            <p className="text-xs text-slate-400">System Admin</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-400">Nicomas Digitals Platform</p>
      </div>

      <div className="mt-6 h-px w-full bg-slate-700" />

      <nav className="mt-6 flex flex-col gap-1" aria-label="System Admin Navigation">
        {navItems.map((item) => {
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
                  ? "bg-slate-800 font-semibold text-white"
                  : "font-medium text-slate-400 hover:bg-slate-800 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span>Exit Admin</span>
        </button>

        <p className="mt-6 text-xs text-slate-500">WRM Platform v2.0</p>
        <p className="text-xs text-slate-600">© 2024 Nicomas Digitals</p>
      </div>
    </aside>
  )
}
