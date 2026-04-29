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

const EXTEND_OPTIONS = [
  { value: "1", label: "A month" },
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
]

type LeaseStatusModalProps = {
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

export function LeaseStatusModal({
  tenant: _tenant,
  open,
  onOpenChange,
}: LeaseStatusModalProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Lease Status
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Edit representative personal information
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 pt-2 md:grid-cols-3">
            <Field label="Lease Start Date" htmlFor="lease-start">
              <Input id="lease-start" name="leaseStart" type="date" />
            </Field>
            <Field label="Lease Expiration Date" htmlFor="lease-end">
              <Input id="lease-end" name="leaseEnd" type="date" />
            </Field>
            <Field label="Rent Amount" htmlFor="rent-amount">
              <Input
                id="rent-amount"
                name="rentAmount"
                type="text"
                inputMode="numeric"
                placeholder="Rent Amount"
              />
            </Field>

            <Field label="Extend Contract">
              <Select defaultValue="1">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {EXTEND_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Extend Contract">
              <Select defaultValue="1">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {EXTEND_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
