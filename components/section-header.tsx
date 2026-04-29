"use client"

import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  editable?: boolean
  onEdit?: () => void
  className?: string
  emphasis?: "muted" | "bold"
}

export function SectionHeader({
  title,
  editable = false,
  onEdit,
  className,
  emphasis = "muted",
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          emphasis === "bold"
            ? "text-base font-semibold text-slate-900"
            : "text-sm text-slate-500",
        )}
      >
        {title}
      </span>
      {editable && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
          className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  )
}
