"use client"

import { FileText, Receipt, Wrench, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type TenantViewKey = "my-lease" | "invoices" | "maintenance" | "messages"

type NavItem = {
  key: TenantViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export const tenantNav: NavItem[] = [
  { key: "my-lease", label: "My Lease", icon: FileText },
  { key: "invoices", label: "Invoices & Payments", icon: Receipt },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "messages", label: "Messages", icon: MessageSquare },
]

type TenantSidebarProps = {
  activeView: TenantViewKey
  onNavigate: (view: TenantViewKey) => void
  collapsed?: boolean
}

export function TenantSidebar({ activeView, onNavigate, collapsed = false }: TenantSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200 md:flex",
          collapsed ? "w-16 px-2 py-6" : "w-64 px-6 py-8"
        )}
      >
        {/* Header */}
        <div className={cn("flex flex-col", collapsed ? "items-center gap-2" : "gap-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <FileText className="h-5 w-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold">Tenant Portal</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 lg:text-2xl">
                Tenant Portal
              </h1>
              <p className="text-sm text-slate-500">Manage your tenancy</p>
            </>
          )}
        </div>

        <div className={cn("h-px w-full bg-slate-200", collapsed ? "my-4" : "mt-6")} />

        {/* Navigation */}
        <nav
          className={cn("flex flex-col gap-1", collapsed ? "mt-2" : "mt-6")}
          aria-label="Tenant navigation"
        >
          {tenantNav.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.key

            if (collapsed) {
              return (
                <Tooltip key={item.key}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.key)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                        isActive
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
            }

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

        {/* Footer */}
        <div className={cn("mt-auto", collapsed && "text-center")}>
          {!collapsed && (
            <p className="text-xs text-slate-400">© 2024 Nicomas Digitals</p>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
