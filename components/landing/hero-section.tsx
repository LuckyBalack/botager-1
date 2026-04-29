"use client"

import { HeroPreviewCards } from "@/components/landing/preview-cards"

type HeroSectionProps = {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Soft orange radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 h-[400px] w-[400px] rounded-full bg-orange-300/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col gap-8">
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 lg:text-6xl">
            Effortlessly{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Manage
            </span>{" "}
            Your Office{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Spaces
            </span>{" "}
            with Mamulka
          </h1>
          <p className="max-w-lg text-pretty text-lg leading-relaxed text-slate-600">
            From tenant management to lease tracking, streamline your property
            operations and focus on what matters.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
            >
              Get Started
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-orange-500 bg-white px-7 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
            >
              Request a Demo
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroPreviewCards />
        </div>
      </div>
    </section>
  )
}
