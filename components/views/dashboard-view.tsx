"use client"

import { StatCards } from "@/components/stat-cards"
import { RecentTenants } from "@/components/recent-tenants"
import { DashboardKPIs } from "@/components/dashboard-kpis"
import { DashboardAlerts } from "@/components/dashboard-alerts"
import { QuickActions } from "@/components/quick-actions"
import { ActivityFeed } from "@/components/activity-feed"
import type { ViewKey } from "@/components/app-sidebar"

type DashboardViewProps = {
  onNavigate: (view: ViewKey) => void
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-8">
      <StatCards />
      <DashboardKPIs />
      <DashboardAlerts />
      <QuickActions onAction={(action) => {
        // Handle quick action navigation
        if (action === "add-tenant") onNavigate("tenants")
        if (action === "add-property") onNavigate("properties")
        if (action === "create-invoice") onNavigate("billing")
        if (action === "new-maintenance") onNavigate("maintenance")
      }} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <RecentTenants onSeeAll={() => onNavigate("tenants")} />
        </div>
      </div>
    </div>
  )
}
