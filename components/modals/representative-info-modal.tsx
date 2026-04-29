"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Tenant } from "@/lib/data"

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

type RepresentativeInfoModalProps = {
  tenant: Tenant
  open: boolean
  onOpenChange: (open: boolean) => void
}

function Field({
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
        className="text-sm font-semibold text-slate-900"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export function RepresentativeInfoModal({
  tenant,
  open,
  onOpenChange,
}: RepresentativeInfoModalProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Wired to design only. Persist updates in a future iteration.
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Representative Info
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Edit representative personal information
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 pt-2 md:grid-cols-3">
            <Field label="Firstname" htmlFor="rep-firstname">
              <Input
                id="rep-firstname"
                name="firstname"
                defaultValue={tenant.firstName}
                placeholder="Firstname"
              />
            </Field>
            <Field label="Lastname" htmlFor="rep-lastname">
              <Input
                id="rep-lastname"
                name="lastname"
                defaultValue={tenant.lastName}
                placeholder="Lastname"
              />
            </Field>
            <Field label="Phone" htmlFor="rep-phone">
              <Input
                id="rep-phone"
                name="phone"
                type="tel"
                defaultValue={tenant.phone}
                placeholder="Phone"
              />
            </Field>

            <Field label="Email" htmlFor="rep-email">
              <Input
                id="rep-email"
                name="email"
                type="email"
                defaultValue={tenant.email}
                placeholder="Email"
              />
            </Field>
            <Field label="Region">
              <Select defaultValue={tenant.region}>
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
            </Field>
            <Field label="Subcity">
              <Select defaultValue={tenant.subcity}>
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
            </Field>

            <Field label="Woreda" htmlFor="rep-woreda">
              <Input
                id="rep-woreda"
                name="woreda"
                defaultValue={tenant.woreda}
                placeholder="09"
              />
            </Field>
            <Field label="House No." htmlFor="rep-house">
              <Input
                id="rep-house"
                name="houseNo"
                defaultValue={tenant.houseNo}
                placeholder="110"
              />
            </Field>
          </div>

          <DialogFooter className="gap-3 pt-2 sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Update
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
