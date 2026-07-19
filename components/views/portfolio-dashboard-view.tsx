"use client"

import { useEffect, useMemo, useState } from "react"
import { Building2, Users, TrendingUp, Wallet, Wrench, MapPin } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { getAllBuildings, getPropertiesByBuilding, getTenantsByBuilding, getMaintenanceTicketsByBuilding } from "@/lib/db"

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
  const [buildingsData, setBuildingsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true)
        const allBuildings = await getAllBuildings()
        
        // Fetch detailed metrics for each building
        const buildingsWithStats = await Promise.all(
          (allBuildings || []).map(async (building) => {
            const [properties, tenants, tickets] = await Promise.all([
              getPropertiesByBuilding(building.id),
              getTenantsByBuilding(building.id),
              getMaintenanceTicketsByBuilding(building.id),
            ])
            
            const occupied = (properties || []).filter(p => p.occupancy === 'occupied').length
            const total = (properties || []).length
            const occupancyPercent = total > 0 ? Math.round((occupied / total) * 100) : 0
            const openTickets = (tickets || []).filter(t => t.status !== 'completed').length
            
            return {
              ...building,
              occupancyPercent,
              openTickets,
              totalTenants: (tenants || []).length,
              totalProperties: total,
              monthlyRevenue: (properties || [])
                .filter(p => p.occupancy === 'occupied')
                .reduce((sum, p) => sum + (p.monthly_rent || 0), 0),
            }
          })
        )
        
        setBuildingsData(buildingsWithStats)
      } catch (error) {
        console.error("Error loading portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioData()
  }, [])

  // Calculate portfolio stats
  const stats = useMemo(() => {
    const totalBuildings = buildingsData.length
    const totalTenants = buildingsData.reduce((sum, b) => sum + b.totalTenants, 0)
    const totalProperties = buildingsData.reduce((sum, b) => sum + b.totalProperties, 0)
    const occupiedProperties = buildingsData.reduce((sum, b) => sum + Math.round((b.occupancyPercent * b.totalProperties) / 100), 0)
    const occupancyRate = totalProperties > 0 ? Math.round((occupiedProperties / totalProperties) * 100) : 0
    const totalRevenue = buildingsData.reduce((sum, b) => sum + b.monthlyRevenue, 0)

    return {
      totalBuildings,
      totalTenants,
      occupancyRate,
      totalRevenue: `ETB ${totalRevenue.toLocaleString()}`,
    }
  }, [buildingsData])

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="h-20 bg-slate-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded animate-pulse"></div>)}
        </div>
      </div>
    )
  }

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
        {buildingsData.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-500">No buildings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buildingsData.map((building) => (
              <BuildingCard
                key={building.id}
                name={building.name}
                location={building.address}
                occupancyPercent={building.occupancyPercent}
                openTickets={building.openTickets}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
