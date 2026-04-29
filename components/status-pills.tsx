import { cn } from "@/lib/utils"

export type PaymentStatus = "Paid" | "Unpaid"
export type LeaseStatus = "Active" | "Expired" | "Renewed" | "Upcoming" | "Terminated"

export function PaymentPill({ status }: { status: PaymentStatus }) {
  const styles =
    status === "Paid"
      ? "border-emerald-300 text-emerald-700 bg-emerald-50"
      : "border-rose-300 text-rose-700 bg-rose-50"
  return (
    <span
      className={cn(
        "inline-flex min-w-20 items-center justify-center rounded-full border px-3 py-1 text-xs font-medium",
        styles,
      )}
    >
      {status}
    </span>
  )
}

export function LeasePill({ status }: { status: LeaseStatus }) {
  const map: Record<LeaseStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Expired: "bg-rose-50 text-rose-700 border-rose-200",
    Terminated: "bg-rose-50 text-rose-700 border-rose-200",
    Renewed: "bg-cyan-50 text-teal-700 border-cyan-200",
    Upcoming: "bg-emerald-50 text-emerald-700 border-emerald-200",
  }
  return (
    <span
      className={cn(
        "inline-flex min-w-20 items-center justify-center rounded-full border px-3 py-1 text-xs font-medium",
        map[status],
      )}
    >
      {status}
    </span>
  )
}
