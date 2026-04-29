"use client"

import { useEffect, useRef, useState } from "react"
import { Check, FileText, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"
import { brokers } from "@/lib/data"

const REGIONS = ["Addis Ababa", "Oromia", "Amhara", "Tigray", "Sidama"]
const SUBCITIES = [
  "Akaki Kality",
  "Bole",
  "Yeka",
  "Lideta",
  "Kirkos",
  "Arada",
  "Gulele",
]
const BUSINESS_TYPES = ["Office", "Retail", "Warehouse", "Studio"]

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-base font-semibold text-slate-900"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function SuccessBanner({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex">
        <div className="w-1.5 shrink-0 bg-emerald-500" aria-hidden="true" />
        <div className="flex items-center gap-6 px-6 py-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500"
            aria-hidden="true"
          >
            <Check className="h-6 w-6 text-white" strokeWidth={3} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-slate-900">{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AddTenantView() {
  const [submitted, setSubmitted] = useState(false)
  const [tradeLicense, setTradeLicense] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-dismiss the temporary success banner.
  useEffect(() => {
    if (!submitted) return
    const timer = window.setTimeout(() => setSubmitted(false), 4000)
    return () => window.clearTimeout(timer)
  }, [submitted])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-8">
      {submitted && (
        <SuccessBanner
          title="Successfully Added"
          description="You can always update office information from properties page."
        />
      )}

      <h2 className="text-2xl font-semibold text-slate-900">New Tenant Form</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {/* Representative Info */}
        <section className="flex flex-col gap-6">
          <SectionHeader title="Representative Info" />

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
            <FieldRow label="Firstname" htmlFor="firstname">
              <Input id="firstname" name="firstname" placeholder="Firstname" />
            </FieldRow>
            <FieldRow label="Lastname" htmlFor="lastname">
              <Input id="lastname" name="lastname" placeholder="Lastname" />
            </FieldRow>
            <FieldRow label="Phone" htmlFor="phone">
              <Input id="phone" name="phone" type="tel" placeholder="Phone" />
            </FieldRow>

            <FieldRow label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" placeholder="Email" />
            </FieldRow>
            <FieldRow label="Region">
              <Select defaultValue="Addis Ababa">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow label="Subcity">
              <Select defaultValue="Akaki Kality">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subcity" />
                </SelectTrigger>
                <SelectContent>
                  {SUBCITIES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>

            <FieldRow label="Woreda" htmlFor="woreda">
              <Input id="woreda" name="woreda" placeholder="09" />
            </FieldRow>
            <FieldRow label="House No." htmlFor="houseNo">
              <Input id="houseNo" name="houseNo" placeholder="110" />
            </FieldRow>
            <FieldRow label="Referred by Broker?">
              <Select defaultValue="none">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a broker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Broker / Walk-in</SelectItem>
                  {brokers.map((broker) => (
                    <SelectItem key={broker.id} value={broker.id}>
                      {broker.name} ({broker.licenseNo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
          </div>
        </section>

        {/* Company Info */}
        <section className="flex flex-col gap-6">
          <SectionHeader title="Company Info" />

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
            <FieldRow label="Company Name" htmlFor="companyName">
              <Input
                id="companyName"
                name="companyName"
                placeholder="Company Name"
              />
            </FieldRow>
            <FieldRow label="Business Type">
              <Select defaultValue="Office">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldRow>
            <FieldRow label="Trade License">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-between gap-3 rounded-md border-2 border-dashed border-slate-300 bg-white px-4 py-2.5 text-left transition-colors hover:border-slate-400 focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200"
              >
                <span className="flex items-center gap-3 truncate">
                  <FileText
                    className="h-5 w-5 shrink-0 text-rose-400"
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm text-slate-400">
                    {tradeLicense
                      ? tradeLicense.name
                      : "Upload trade license"}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Upload
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="sr-only"
                onChange={(event) =>
                  setTradeLicense(event.target.files?.[0] ?? null)
                }
              />
            </FieldRow>
          </div>
        </section>

        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-10 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
