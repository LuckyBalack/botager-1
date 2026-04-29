const STEPS = [
  {
    number: 1,
    title: "Add Your Building and Office Spaces",
    description:
      "Enter building information and office details, including size, rent, and floor plans.",
  },
  {
    number: 2,
    title: "Manage Tenants and Leases",
    description:
      "Add tenants, assign them to specific offices, and track lease terms from start to finish.",
  },
  {
    number: 3,
    title: "Track Payments and Invoices",
    description:
      "Monitor rent collection, automate reminders, and gain insights into your cash flow.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-white pb-28 pt-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            How it works
          </h2>
          <p className="text-pretty text-base text-slate-500">
            Simple Steps to Streamlined Property Management
          </p>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          {/* Curving timeline (desktop) */}
          <svg
            viewBox="0 0 1000 280"
            preserveAspectRatio="none"
            className="absolute inset-0 hidden h-full w-full md:block"
            aria-hidden="true"
          >
            <path
              d="M 90 60 C 260 60, 320 260, 500 260 C 680 260, 740 60, 910 60"
              fill="none"
              stroke="#ea580c"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="90" cy="60" r="8" fill="#ea580c" />
            <circle cx="500" cy="260" r="8" fill="#ea580c" />
            <circle cx="910" cy="60" r="8" fill="#ea580c" />
            {/* White ring around end caps */}
            <circle cx="90" cy="60" r="14" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="910" cy="60" r="14" fill="none" stroke="white" strokeWidth="3" />
          </svg>

          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, idx) => (
              <div
                key={step.number}
                className={
                  // Stagger middle item downward to mirror the curve
                  idx === 1
                    ? "flex flex-col gap-3 md:mt-44"
                    : "flex flex-col gap-3"
                }
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold leading-snug text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
