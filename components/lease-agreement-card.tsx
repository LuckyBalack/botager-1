"use client"

import { Download, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

type LeaseAgreementCardProps = {
  filename: string
  onDownload?: () => void
  className?: string
}

export function LeaseAgreementCard({ filename, onDownload, className }: LeaseAgreementCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 rounded-md border border-dashed border-slate-300 bg-white px-5 py-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 text-sm">
        <FileText className="h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
        <span className="truncate text-slate-500">{filename}</span>
      </div>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex shrink-0 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download
      </button>
    </div>
  )
}
