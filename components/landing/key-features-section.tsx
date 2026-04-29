import { ClipboardList, RefreshCcw, BarChart3 } from "lucide-react"

const FEATURES = [
  {
    icon: ClipboardList,
    title: "Comprehensive Lease Management",
    description:
      "Track lease terms, renewals, and expirations in one place to never miss a lease renewal or rent payment.",
  },
  {
    icon: RefreshCcw,
    title: "Tenant Management",
    description:
      "Easily manage tenant information, lease status, and payment history for each office space.",
  },
  {
    icon: BarChart3,
    title: "Detailed Financial Insights",
    description:
      "Get valuable financial insights, including rent collected, overdue payments, and revenue forecasts.",
  },
]

export function KeyFeaturesSection() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Key Features
          </h2>
          <p className="text-base text-slate-500">
            A glimpse of key system&apos;s core features
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-5 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Icon className="h-7 w-7 text-orange-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
