"use client"

import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FilterControl = {
  /** Stable key used for React keys */
  key: string
  /** Placeholder shown when no value is chosen, e.g. "Floor" */
  placeholder: string
  /** Current value (controlled) */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Options for the select */
  options: { value: string; label: string }[]
}

export type SortControl = FilterControl

type ListToolbarProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters?: FilterControl[]
  sort?: SortControl
}

export function ListToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Type a command or search...",
  filters = [],
  sort,
}: ListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <label htmlFor="list-search" className="sr-only">
          Search
        </label>
        <input
          id="list-search"
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {filters.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Filter:</span>
          {filters.map((f) => (
            <Select key={f.key} value={f.value} onValueChange={f.onChange}>
              <SelectTrigger className="h-12 min-w-[180px] gap-3 rounded-lg border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 [&>svg]:text-slate-500">
                <SelectValue placeholder={f.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {f.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      )}

      {sort && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Sort by:</span>
          <Select value={sort.value} onValueChange={sort.onChange}>
            <SelectTrigger className="h-12 min-w-[180px] gap-3 rounded-lg border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 [&>svg]:text-slate-500">
              <SelectValue placeholder={sort.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {sort.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}
