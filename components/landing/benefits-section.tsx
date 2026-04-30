"use client"

import { BenefitsPreviewCards } from "@/components/landing/preview-cards"

type BenefitsSectionProps = {
  onGetStarted: () => void
}

export function BenefitsSection({ onGetStarted }: BenefitsSectionProps) {
  return (
    <section className="bg-orange-50/70 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10 2xl:max-w-[1800px]">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-slate-500">Benefits</span>
          <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl 2xl:text-5xl">
            Why Choose Mamulka for Your Property Management Needs
          </h2>
          <p className="max-w-lg text-pretty text-base leading-relaxed text-slate-600">
            Effortlessly manage properties, automate tasks, enhance tenant
            satisfaction, and gain insights to maximize occupancy and revenue.
          </p>

          <div>
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BenefitsPreviewCards />
        </div>
      </div>
    </section>
  )
}
