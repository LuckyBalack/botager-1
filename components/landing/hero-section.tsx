"use client"

import { HeroPreviewCards } from "@/components/landing/preview-cards"

type HeroSectionProps = {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:pt-40 lg:pb-28"
    >
      {/* Soft orange radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl sm:h-[640px] sm:w-[1100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 hidden h-[400px] w-[400px] rounded-full bg-orange-300/30 blur-3xl sm:block"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:px-10 2xl:max-w-[1800px]">
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
          <h1 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">
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
          <p className="max-w-lg text-pretty text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
            From tenant management to lease tracking, streamline your property
            operations and focus on what matters.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex w-full items-center justify-center rounded-md bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:w-auto sm:px-7 sm:py-3 sm:text-base"
            >
              Get Started
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-orange-500 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:w-auto sm:px-7 sm:py-3 sm:text-base"
            >
              Request a Demo
            </button>
          </div>
        </div>

        <div className="hidden justify-center sm:flex lg:justify-end">
          <HeroPreviewCards />
        </div>
      </div>
    </section>
  )
}
