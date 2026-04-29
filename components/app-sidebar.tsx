"use client"

import { LayoutGrid, Building2, Users, Settings, LogOut, Receipt, Wrench, BarChart3, FolderOpen, MessageSquare, Store, Zap, HelpCircle, ClipboardCheck, Truck, Upload, Plug, UserPlus, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { buildings } from "@/lib/data"

export type ViewKey = "dashboard" | "properties" | "tenants" | "billing" | "maintenance" | "accounting" | "documents" | "messages" | "marketplace" | "settings" | "portfolio-dashboard" | "team-settings" | "automations" | "help-center" | "data-import" | "inspections" | "vendors" | "utility-tracking" | "waitlist" | "brokers"
export type BuildingSelection = string // building id or "all"

type NavItem = {
  key: ViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export const primaryNav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "properties", label: "Properties", icon: Building2 },
  { key: "inspections", label: "Inspections", icon: ClipboardCheck },
  { key: "tenants", label: "Tenants", icon: Users },
  { key: "waitlist", label: "Waitlist", icon: UserPlus },
  { key: "billing", label: "Billing", icon: Receipt },
  { key: "utility-tracking", label: "Utilities", icon: Plug },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "vendors", label: "Vendors", icon: Truck },
  { key: "brokers", label: "Brokers", icon: Handshake },
  { key: "accounting", label: "Accounting", icon: BarChart3 },
  { key: "documents", label: "Documents", icon: FolderOpen },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "automations", label: "Automations", icon: Zap },
  { key: "marketplace", label: "Marketplace", icon: Store },
  { key: "help-center", label: "Help Center", icon: HelpCircle },
]

type AppSidebarProps = {
  activeView: ViewKey
  onNavigate: (view: ViewKey) => void
  onLogout?: () => void
  selectedBuilding: BuildingSelection
  onBuildingChange: (building: BuildingSelection) => void
  collapsed?: boolean
}

export function AppSidebar({
  activeView,
  onNavigate,
  onLogout,
  selectedBuilding,
  onBuildingChange,
  collapsed = false,
}: AppSidebarProps) {
  const currentBuilding = buildings.find((b) => b.id === selectedBuilding)
  const displayName = selectedBuilding === "all" ? "All Properties" : currentBuilding?.name ?? "Select Building"

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200 md:flex",
          collapsed ? "w-16 px-2 py-6" : "w-64 px-6 py-8"
        )}
      >
        {/* Header - Building Selector */}
        <div className={cn("flex flex-col", collapsed ? "items-center gap-2" : "gap-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
                >
                  <Building2 className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold">{displayName}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Select value={selectedBuilding} onValueChange={onBuildingChange}>
                <SelectTrigger className="w-full border-none bg-transparent p-0 text-xl font-extrabold tracking-tight text-slate-900 shadow-none focus-visible:ring-0 lg:text-2xl">
                  <SelectValue>{displayName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="all">All Properties (Portfolio)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500">We got you covered.</p>
            </>
          )}
        </div>

        <div className={cn("h-px w-full bg-slate-200", collapsed ? "my-4" : "mt-6")} />

        {/* Navigation */}
        <nav
          className={cn("flex flex-col gap-1", collapsed ? "mt-2" : "mt-6")}
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
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
                    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className={cn("mt-auto flex flex-col gap-1", collapsed && "items-center")}>
          {collapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onNavigate("settings")}
                    aria-current={activeView === "settings" ? "page" : undefined}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                      activeView === "settings"
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Settings className="h-5 w-5" aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onNavigate("settings")}
                aria-current={activeView === "settings" ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                  activeView === "settings"
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <Settings className="h-5 w-5" aria-hidden="true" />
                <span>Settings</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span>Logout</span>
              </button>
              <p className="mt-6 text-xs text-slate-400">© 2024 Nicomas Digitals</p>
            </>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}

// Mobile sidebar content - used in Sheet
export function AppSidebarMobile({
  activeView,
  onNavigate,
  onLogout,
  selectedBuilding,
  onBuildingChange,
  onClose,
}: AppSidebarProps & { onClose?: () => void }) {
  const currentBuilding = buildings.find((b) => b.id === selectedBuilding)
  const displayName = selectedBuilding === "all" ? "All Properties" : currentBuilding?.name ?? "Select Building"

  const handleNavigate = (view: ViewKey) => {
    onNavigate(view)
    onClose?.()
  }

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="flex flex-col gap-2">
        <Select value={selectedBuilding} onValueChange={onBuildingChange}>
          <SelectTrigger className="w-full border-none bg-transparent p-0 text-xl font-extrabold tracking-tight text-slate-900 shadow-none focus-visible:ring-0">
            <SelectValue>{displayName}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {buildings.map((building) => (
              <SelectItem key={building.id} value={building.id}>
                {building.name}
              </SelectItem>
            ))}
            <SelectItem value="all">All Properties (Portfolio)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-slate-500">We got you covered.</p>
      </div>

      <div className="mt-6 h-px w-full bg-slate-200" />

      <nav className="mt-6 flex flex-col gap-1" aria-label="Primary">
        {primaryNav.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleNavigate(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                isActive
                  ? "bg-slate-100 font-semibold text-slate-900"
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900",
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
          onClick={() => handleNavigate("settings")}
          aria-current={activeView === "settings" ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
            activeView === "settings"
              ? "bg-slate-100 font-semibold text-slate-900"
              : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          )}
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
          <span>Settings</span>
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span>Logout</span>
        </button>
        <p className="mt-6 text-xs text-slate-400">© 2024 Nicomas Digitals</p>
      </div>
    </div>
  )
}
