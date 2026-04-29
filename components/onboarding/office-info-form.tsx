"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  OnboardingField,
  FloatingDateField,
} from "@/components/onboarding/onboarding-field"
import { OnboardingSectionLabel } from "@/components/onboarding/onboarding-section"
import { DashedUpload } from "@/components/onboarding/dashed-upload"
import { cn } from "@/lib/utils"

const SERVICE_CHARGE_TYPES = [
  "Electric utility",
  "Water",
  "Internet",
  "Maintenance",
]
const LEASE_STATUSES = ["Active", "Upcoming", "Expired", "Terminated"]
const OFFICE_CONDITIONS = ["New", "Good", "Average", "Needs Repair"]
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

type OfficeInfoFormProps = {
  /** Triggered by both the outline "Finish" and the orange "Add" buttons. */
  onComplete: () => void
}

export function OfficeInfoForm({ onComplete }: OfficeInfoFormProps) {
  const [tenantOpen, setTenantOpen] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onComplete()
  }

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Building Information
        </h1>
        <p className="text-base text-slate-500">Office Information</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {/* Office identity */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          <OnboardingField label="Office Number" htmlFor="officeNumber">
            <Input id="officeNumber" name="officeNumber" placeholder="Eg. 310" />
          </OnboardingField>
          <OnboardingField label="Floor" htmlFor="officeFloor">
            <Input id="officeFloor" name="officeFloor" placeholder="4th" />
          </OnboardingField>
          <OnboardingField label="Office Size in sq.meters" htmlFor="officeSize">
            <Input id="officeSize" name="officeSize" placeholder="20" />
          </OnboardingField>
          <OnboardingField
            label="Price per square meter (optional)"
            htmlFor="officePrice"
          >
            <Input id="officePrice" name="officePrice" placeholder="400" />
          </OnboardingField>
        </div>

        {/* Charges + status */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          <OnboardingField label="Service Charges (if applicable)">
            <Select defaultValue="Electric utility">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CHARGE_TYPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </OnboardingField>
          <OnboardingField
            label="How much service charge"
            htmlFor="serviceCharge"
          >
            <Input id="serviceCharge" name="serviceCharge" placeholder="2000" />
          </OnboardingField>
          <OnboardingField label="Current lease status">
            <Select defaultValue="Active">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEASE_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </OnboardingField>
          <OnboardingField label="Office Condition">
            <Select defaultValue="New">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OFFICE_CONDITIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </OnboardingField>
        </div>

        {/* Lease dates + photo */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <FloatingDateField
            label="Lease Start Date"
            name="leaseStart"
            defaultValue="05/12/2023"
          />
          <FloatingDateField
            label="Lease Expiration Date"
            name="leaseEnd"
            defaultValue="05/07/2024"
          />
          <OnboardingField label="Office Photo (optional)">
            <DashedUpload placeholder="Office photo in image format" />
          </OnboardingField>
        </div>

        {/* Collapsible Add Tenant Info */}
        <Collapsible open={tenantOpen} onOpenChange={setTenantOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="group flex w-full items-center gap-4 text-left"
            >
              <span className="whitespace-nowrap text-base font-medium text-slate-900">
                Add Tenant Info
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-slate-700 transition-transform",
                  tenantOpen ? "rotate-180" : "",
                )}
                aria-hidden="true"
              />
              <span
                className="h-px flex-1 bg-slate-200"
                aria-hidden="true"
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-hidden">
            <div className="flex flex-col gap-10 pt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                New Tenant Form
              </h2>

              {/* Representative Info */}
              <section className="flex flex-col gap-6">
                <OnboardingSectionLabel title="Representative Info" />
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
                  <OnboardingField label="Firstname" htmlFor="tFirst">
                    <Input id="tFirst" name="tFirst" placeholder="Firstname" />
                  </OnboardingField>
                  <OnboardingField label="Lastname" htmlFor="tLast">
                    <Input id="tLast" name="tLast" placeholder="Lastname" />
                  </OnboardingField>
                  <OnboardingField label="Phone" htmlFor="tPhone">
                    <Input id="tPhone" name="tPhone" placeholder="Phone" />
                  </OnboardingField>

                  <OnboardingField label="Email" htmlFor="tEmail">
                    <Input
                      id="tEmail"
                      name="tEmail"
                      type="email"
                      placeholder="Email"
                    />
                  </OnboardingField>
                  <OnboardingField label="Region">
                    <Select defaultValue="Addis Ababa">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </OnboardingField>
                  <OnboardingField label="Subcity">
                    <Select defaultValue="Akaki Kality">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBCITIES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </OnboardingField>

                  <OnboardingField label="Woreda" htmlFor="tWoreda">
                    <Input id="tWoreda" name="tWoreda" placeholder="09" />
                  </OnboardingField>
                  <OnboardingField label="House No." htmlFor="tHouseNo">
                    <Input id="tHouseNo" name="tHouseNo" placeholder="110" />
                  </OnboardingField>
                </div>
              </section>

              {/* Company Info */}
              <section className="flex flex-col gap-6">
                <OnboardingSectionLabel title="Company Info" />
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
                  <OnboardingField label="Company Name" htmlFor="tCompany">
                    <Input
                      id="tCompany"
                      name="tCompany"
                      placeholder="Company Name"
                    />
                  </OnboardingField>
                  <OnboardingField label="Business Type">
                    <Select defaultValue="Office">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </OnboardingField>
                  <OnboardingField label="Trade License">
                    <DashedUpload
                      placeholder="Upload trade license"
                      accept="application/pdf"
                    />
                  </OnboardingField>
                </div>
              </section>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-4">
          {!tenantOpen && (
            <button
              type="button"
              onClick={onComplete}
              className="inline-flex items-center justify-center rounded-md border border-orange-500 bg-white px-10 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
            >
              Finish
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-10 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
