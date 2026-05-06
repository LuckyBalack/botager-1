"use client"

import {
  ShieldCheck,
  Building2,
  CreditCard,
  Settings,
  LogOut,
  BarChart3,
  Headphones,
  Users,
  Package,
  TrendingUp,
  Wrench,
  Home,
  AlertTriangle,
  Tag,
  BookOpen,
} from "lucide-react"

export type SystemAdminViewKey = 
  | "dashboard"
  | "moderation"
  | "reported-listings"
  | "marketplace"
  | "sys-financials"
  | "settlements"
  | "promo-codes"
  | "credit-partners"
  | "revenue-share"
  | "default-risk"
  | "broker-network"
  | "system-helpdesk"
  | "knowledge-base"
  | "settings"
  | "feature-flags"

type NavItem = {
  key: SystemAdminViewKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}

type NavGroup = {
  group: string
  items: NavItem[]
}

export const systemAdminNav: NavGroup[] = [
  {
    group: "OVERVIEW",
    items: [
      { key: "dashboard", label: "Dashboard", icon: Home },
    ],
  },
  {
    group: "OPERATIONS",
    items: [
      { key: "moderation", label: "Moderation Queue", icon: ShieldCheck },
      { key: "reported-listings", label: "Reported Listings", icon: AlertTriangle },
      { key: "marketplace", label: "Marketplace Admin", icon: Package },
    ],
  },
  {
    group: "ECOSYSTEM",
    items: [
      { key: "credit-partners", label: "Credit Partners", icon: CreditCard },
      { key: "revenue-share", label: "Revenue Share", icon: TrendingUp },
      { key: "default-risk", label: "Default Risk", icon: AlertTriangle },
      { key: "broker-network", label: "Broker Network", icon: Users },
    ],
  },
  {
    group: "FINANCE",
    items: [
      { key: "sys-financials", label: "Financials & Billing", icon: BarChart3 },
      { key: "settlements", label: "Settlements", icon: CreditCard },
      { key: "promo-codes", label: "Promo Codes", icon: Tag },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { key: "system-helpdesk", label: "Support Hub", icon: Headphones },
      { key: "knowledge-base", label: "Knowledge Base", icon: BookOpen },
      { key: "settings", label: "Settings", icon: Settings },
      { key: "feature-flags", label: "Feature Flags", icon: Wrench },
    ],
  },
]

type SystemAdminSidebarProps = {
  activeView: SystemAdminViewKey
  onNavigate: (view: SystemAdminViewKey) => void
  onLogout?: () => void
  collapsed?: boolean
}

export function SystemAdminSidebar({
  activeView,
  onNavigate,
  onLogout,
  collapsed = false,
}: SystemAdminSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-slate-200 bg-slate-900 transition-all duration-200 md:flex",
          collapsed ? "w-16 px-2 py-6" : "w-64 px-6 py-8"
        )}
      >
        {/* Header */}
        <div className={cn("flex flex-col", collapsed ? "items-center gap-2" : "gap-2")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold">WRM System Admin</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-extrabold tracking-tight text-white lg:text-xl">WRM</span>
                  <p className="text-xs text-slate-400">System Admin</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-400">Nicomas Digitals Platform</p>
            </>
          )}
        </div>

        <div className={cn("h-px w-full bg-slate-700", collapsed ? "my-4" : "mt-6")} />

        {/* Navigation */}
        <nav
          className={cn("flex flex-col gap-6", collapsed ? "mt-2" : "mt-6")}
          aria-label="System Admin Navigation"
        >
          {systemAdminNav.map((group) => (
            <div key={group.group} className="flex flex-col gap-1">
              {!collapsed && (
                <div className="px-3 py-1.5">
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">{group.group}</p>
                </div>
              )}
              {group.items.map((item) => {
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
                              ? "bg-orange-500 text-white"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
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
                        ? "bg-orange-500 font-semibold text-white"
                        : "font-medium text-slate-400 hover:bg-slate-800 hover:text-white",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={cn("mt-auto flex flex-col gap-1", collapsed && "items-center")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <LogOut className="h-5 w-5" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Exit Admin</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
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
            </>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}

// Mobile sidebar content
export function SystemAdminSidebarMobile({
  activeView,
  onNavigate,
  onLogout,
  onClose,
}: SystemAdminSidebarProps & { onClose?: () => void }) {
  const handleNavigate = (view: SystemAdminViewKey) => {
    onNavigate(view)
    onClose?.()
  }

  return (
    <div className="flex h-full flex-col bg-slate-900 px-4 py-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-white">WRM</span>
          <p className="text-xs text-slate-400">System Admin</p>
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-slate-700" />

      <nav className="mt-6 flex flex-col gap-6" aria-label="System Admin Navigation">
        {systemAdminNav.map((group) => (
          <div key={group.group} className="flex flex-col gap-1">
            <div className="px-3 py-1.5">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">{group.group}</p>
            </div>
            {group.items.map((item) => {
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
                      ? "bg-orange-500 font-semibold text-white"
                      : "font-medium text-slate-400 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
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
    </div>
  )
}
