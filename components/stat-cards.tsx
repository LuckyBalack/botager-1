import { Users, Building, Wallet } from "lucide-react"

type OccupancyCardProps = {
  label: string
  count: number
  percent: number
  variant: "occupied" | "vacant"
  icon: React.ComponentType<{ className?: string }>
}

function OccupancyCard({ label, count, percent, variant, icon: Icon }: OccupancyCardProps) {
  const badgeClasses =
    variant === "occupied"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
      : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center text-slate-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight text-slate-900">{count}</span>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClasses}`}>
            {percent}%
          </span>
          <span className="text-sm text-slate-500">Occupied</span>
        </div>
      </div>
    </div>
  )
}

function Sparkline() {
  // Simple uptrend sparkline matching the design
  return (
    <svg
      viewBox="0 0 160 50"
      className="h-12 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,38 14,32 26,40 38,28 52,34 66,22 80,30 94,18 108,24 122,12 138,16 156,4"
      />
    </svg>
  )
}

function RevenueCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <Wallet className="h-10 w-10 text-slate-700" strokeWidth={1.5} aria-hidden="true" />
        <div className="flex flex-col items-end">
          <span className="text-sm text-slate-500">Total Rent Collected</span>
          <span className="mt-1 text-3xl font-bold tracking-tight text-slate-900">120,000</span>
        </div>
      </div>
      <div className="mt-4">
        <Sparkline />
        <p className="mt-1 text-right text-xs text-slate-500">Up 5% from last month</p>
      </div>
    </div>
  )
}

export function StatCards() {
  return (
    <section aria-label="Overview" className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-sm text-slate-500">Total Offices</span>
        <span className="text-base font-semibold text-slate-900">310</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <OccupancyCard
          label="Occupied Offices"
          count={280}
          percent={80}
          variant="occupied"
          icon={Users}
        />
        <OccupancyCard
          label="Vacant Offices"
          count={30}
          percent={20}
          variant="vacant"
          icon={Building}
        />
        <RevenueCard />
      </div>
    </section>
  )
}
