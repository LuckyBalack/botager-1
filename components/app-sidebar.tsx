"use client"

import { LayoutGrid, Building2, Users, Settings, LogOut, Receipt, Wrench, BarChart3, FolderOpen, MessageSquare, Store, Zap, HelpCircle, ClipboardCheck, Truck, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buildings } from "@/lib/data"

export type ViewKey = "dashboard" | "properties" | "tenants" | "billing" | "maintenance" | "accounting" | "documents" | "messages" | "marketplace" | "settings" | "portfolio-dashboard" | "team-settings" | "automations" | "help-center" | "data-import" | "inspections" | "vendors"
export type BuildingSelection = string // building id or "all"

type NavItem = {
  key: ViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const primaryNav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "properties", label: "Properties", icon: Building2 },
  { key: "inspections", label: "Inspections", icon: ClipboardCheck },
  { key: "tenants", label: "Tenants", icon: Users },
  { key: "billing", label: "Billing", icon: Receipt },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "vendors", label: "Vendors", icon: Truck },
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
}

export function AppSidebar({
  activeView,
  onNavigate,
  onLogout,
  selectedBuilding,
  onBuildingChange,
}: AppSidebarProps) {
  const currentBuilding = buildings.find((b) => b.id === selectedBuilding)
  const displayName = selectedBuilding === "all" ? "All Properties" : currentBuilding?.name ?? "Select Building"

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-6 py-8">
      <div className="flex flex-col gap-2">
        <Select value={selectedBuilding} onValueChange={onBuildingChange}>
          <SelectTrigger className="w-full border-none bg-transparent p-0 text-2xl font-extrabold tracking-tight text-slate-900 shadow-none focus-visible:ring-0">
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

      <div className="mt-auto flex flex-col gap-1">
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
      </div>
    </aside>
  )
}
