import { Building2, Mail, Phone, Wallet } from "lucide-react"

function Sparkline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 24 L18 18 L34 22 L52 12 L70 16 L88 6 L106 10 L120 2"
        stroke="#16a34a"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Floating dashboard preview cards used to decorate the hero and benefits
 * sections. They mirror the visual language of the in-app dashboard so the
 * marketing surface and product feel cohesive.
 */
export function HeroPreviewCards() {
  return (
    <div className="relative h-[360px] w-full max-w-md">
      {/* Tenant card */}
      <div className="absolute right-0 top-0 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center gap-3">
          <img
            src="/professional-headshot.png"
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-slate-900">
            Alemu Getachew
          </span>
        </div>
        <div className="mt-3 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            +251 970 74 22 50
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            alemu.gech@gmail.com
          </div>
        </div>
      </div>

      {/* Vacant offices card */}
      <div className="absolute left-2 top-24 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center gap-2 text-slate-500">
          <Building2 className="h-4 w-4" />
          <span className="text-xs font-medium">Vacant Offices</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-slate-900">30</span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
              20%
            </span>
            <span className="text-xs text-slate-500">Occupied</span>
          </div>
        </div>
      </div>

      {/* Total Rent Collected card */}
      <div className="absolute bottom-0 right-4 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Total Rent Collected
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900">120,000</span>
        </div>
        <Sparkline className="mt-2 h-6 w-full" />
        <p className="mt-1 text-[10px] text-slate-400">Up 5% from last month</p>
      </div>
    </div>
  )
}

/**
 * Slightly different arrangement used in the Benefits section. Reuses the same
 * card styling for consistency.
 */
export function BenefitsPreviewCards() {
  return (
    <div className="relative h-[420px] w-full max-w-xl">
      <div className="absolute right-0 top-0 flex w-[22rem] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center gap-3">
          <img
            src="/professional-headshot.png"
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">
              Alemu Getachew
            </span>
            <span className="text-[11px] text-slate-500">
              alemu.gech@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-slate-500">310</span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              Paid
            </span>
            <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
              Expired
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-32 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center gap-2 text-slate-500">
          <Building2 className="h-4 w-4" />
          <span className="text-xs font-medium">Occupied Offices</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-slate-900">280</span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              80%
            </span>
            <span className="text-xs text-slate-500">Occupied</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-32 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center gap-2 text-slate-500">
          <Building2 className="h-4 w-4" />
          <span className="text-xs font-medium">Vacant Offices</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-3xl font-bold text-slate-900">30</span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
              20%
            </span>
            <span className="text-xs text-slate-500">Occupied</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-4 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Total Rent Collected
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900">120,000</span>
        </div>
        <Sparkline className="mt-2 h-6 w-full" />
        <p className="mt-1 text-[10px] text-slate-400">Up 5% from last month</p>
      </div>
    </div>
  )
}
