"use client"

import { Building2, Users, TrendingUp, Wallet, Wrench, MapPin } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { buildings, getPortfolioStats } from "@/lib/data"

type StatCardProps = {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}

function StatCard({ label, value, icon: Icon, children }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
          <Icon className="h-6 w-6 text-slate-700" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <span className="mt-1 block text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </span>
      {children}
    </div>
  )
}

type BuildingCardProps = {
  name: string
  location: string
  occupancyPercent: number
  openTickets: number
}

function BuildingCard({ name, location, occupancyPercent, openTickets }: BuildingCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Photo placeholder */}
      <div className="flex h-36 items-center justify-center bg-slate-100">
        <Building2 className="h-12 w-12 text-slate-400" aria-hidden="true" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{location}</span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Occupancy</span>
              <span className="font-medium text-slate-900">{occupancyPercent}%</span>
            </div>
            <Progress
              value={occupancyPercent}
              className="mt-1.5 h-2 bg-slate-100"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Open Tickets
            </span>
            <span className="font-medium text-slate-900">{openTickets}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioDashboardView() {
  const stats = getPortfolioStats()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Portfolio Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage and monitor all your properties in one place.
        </p>
      </div>

      {/* Stat Cards */}
      <section aria-label="Portfolio Statistics">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Buildings"
            value={stats.totalBuildings}
            icon={Building2}
          />
          <StatCard
            label="Total Active Tenants"
            value={stats.totalTenants.toLocaleString()}
            icon={Users}
          />
          <StatCard
            label="Overall Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            icon={TrendingUp}
          >
            <Progress
              value={stats.occupancyRate}
              className="mt-3 h-2 bg-slate-100"
            />
          </StatCard>
          <StatCard
            label="Monthly Portfolio Revenue"
            value={stats.totalRevenue}
            icon={Wallet}
          />
        </div>
      </section>

      {/* Building Cards */}
      <section aria-label="Buildings">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Your Buildings</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buildings.map((building) => {
            const occupancyPercent = Math.round(
              (building.occupiedUnits / building.totalUnits) * 100
            )
            return (
              <BuildingCard
                key={building.id}
                name={building.name}
                location={building.location}
                occupancyPercent={occupancyPercent}
                openTickets={building.openMaintenanceTickets}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
