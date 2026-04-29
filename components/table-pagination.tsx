"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type TablePaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/** Build a compact page list like [1, 2, 3, "…", 67, 68] around the current page. */
function buildPages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "ellipsis")[] = []
  const showLeft = current > 4
  const showRight = current < total - 3

  pages.push(1)
  if (showLeft) pages.push("ellipsis")

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (showRight) pages.push("ellipsis")
  pages.push(total - 1, total)

  // de-duplicate sequential numbers (can happen when current is near edges)
  return pages.filter((p, i, arr) => p !== arr[i - 1])
}

export function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
  const pages = buildPages(currentPage, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-end gap-2 text-sm text-slate-600"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-medium text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </button>

      <ul className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li key={`e-${i}`} aria-hidden="true" className="px-2 text-slate-400">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors",
                  p === currentPage
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-medium text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  )
}
