"use client"

import { BrandMark } from "@/components/landing/brand-mark"

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
  { label: "Pricing", href: "#pricing" },
]

type LandingHeaderProps = {
  onGetStarted: () => void
  onLogin?: () => void
}

export function LandingHeader({ onGetStarted, onLogin }: LandingHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-10 2xl:max-w-[1800px]">
        <BrandMark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 lg:flex lg:gap-10"
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onLogin ?? onGetStarted}
            className="hidden rounded-md border border-orange-500 px-4 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-orange-50 sm:inline-flex sm:px-5 sm:py-2 sm:text-sm"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:px-5 sm:py-2 sm:text-sm"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
