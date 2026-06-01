"use client"

import { FileText, Receipt, Wrench, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TenantViewKey } from "@/components/tenant-sidebar"

type NavItem = {
  key: TenantViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tenantNav: NavItem[] = [
  { key: "my-lease", label: "Lease", icon: FileText },
  { key: "invoices", label: "Invoices", icon: Receipt },
  { key: "maintenance", label: "Repairs", icon: Wrench },
  { key: "messages", label: "Messages", icon: MessageSquare },
]

interface TenantBottomNavProps {
  activeView: TenantViewKey
  onNavigate: (view: TenantViewKey) => void
}

export function TenantBottomNav({ activeView, onNavigate }: TenantBottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white pb-safe md:hidden"
      aria-label="Tenant navigation"
    >
      <div className="flex items-center justify-around">
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
                "flex flex-1 flex-col items-center gap-1 px-2 py-3 text-xs transition-colors",
                isActive
                  ? "text-orange-600"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive && "text-orange-600"
                )}
                aria-hidden="true"
              />
              <span className={cn("font-medium", isActive && "font-semibold")}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
