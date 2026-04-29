"use client"

import { StatCards } from "@/components/stat-cards"
import { RecentTenants } from "@/components/recent-tenants"
import type { ViewKey } from "@/components/app-sidebar"

type DashboardViewProps = {
  onNavigate: (view: ViewKey) => void
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div className="flex flex-col">
      <StatCards />
      <RecentTenants onSeeAll={() => onNavigate("tenants")} />
    </div>
  )
}
