"use client"

import { useAuth } from "@/lib/auth-context"
import { StatCards } from "@/components/stat-cards"
import { RecentTenants } from "@/components/recent-tenants"
import { DashboardKPIs } from "@/components/dashboard-kpis"
import { DashboardAlerts } from "@/components/dashboard-alerts"
import { ActivityFeed } from "@/components/activity-feed"
import type { ViewKey } from "@/components/app-sidebar"

type DashboardViewProps = {
  onNavigate: (view: ViewKey) => void
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const { buildingId } = useAuth()

  return (
    <div className="flex flex-col gap-8">
      <StatCards buildingId={buildingId} />
      <DashboardKPIs buildingId={buildingId} />
      <DashboardAlerts buildingId={buildingId} />
      <div className="flex flex-col gap-8">
        <ActivityFeed />
        <RecentTenants buildingId={buildingId} onSeeAll={() => onNavigate("tenants")} />
      </div>
    </div>
  )
}
