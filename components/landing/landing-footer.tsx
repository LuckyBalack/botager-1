import { Facebook, Instagram, Send, Twitter } from "lucide-react"
import { BrandMark } from "@/components/landing/brand-mark"

const NAV = ["Home", "Features", "Contact", "Pricing"]

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Telegram", icon: Send, href: "#" },
]

export function LandingFooter() {
  return (
    <footer className="bg-slate-100/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-14 lg:px-10 2xl:max-w-[1800px] 2xl:px-12">
        <BrandMark />

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-slate-500 transition-colors hover:text-slate-900"
              >
                <Icon className="h-5 w-5" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
