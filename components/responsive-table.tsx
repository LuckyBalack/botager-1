"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ResponsiveTableProps {
  children: React.ReactNode
  className?: string
}

// Wrapper that adds horizontal scroll and proper responsive behavior
export function ResponsiveTable({ children, className }: ResponsiveTableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-slate-200 bg-white",
        // Add shadow on scroll indicator
        "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent",
        className
      )}
    >
      <div className="min-w-full">
        {children}
      </div>
    </div>
  )
}

// Mobile card view for tables - renders each row as a card
interface MobileCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function MobileCard({ children, onClick, className }: MobileCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-4 transition-colors",
        onClick && "cursor-pointer hover:bg-slate-50 active:bg-slate-100",
        className
      )}
    >
      {children}
    </div>
  )
}

// Expandable row for showing hidden columns on mobile
interface ExpandableRowProps {
  children: React.ReactNode
  expandedContent: React.ReactNode
  className?: string
}

export function ExpandableRow({ children, expandedContent, className }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className={cn("border-b border-slate-200 last:border-b-0", className)}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-slate-50"
      >
        <div className="flex-1">{children}</div>
        <button
          type="button"
          className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
          {expandedContent}
        </div>
      )}
    </div>
  )
}

// Table cell that hides on mobile
interface HiddenOnMobileCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  hideBelow?: "sm" | "md" | "lg"
}

export function HiddenOnMobileCell({
  children,
  hideBelow = "md",
  className,
  ...props
}: HiddenOnMobileCellProps) {
  const hideClasses = {
    sm: "hidden sm:table-cell",
    md: "hidden md:table-cell",
    lg: "hidden lg:table-cell",
  }

  return (
    <td className={cn(hideClasses[hideBelow], className)} {...props}>
      {children}
    </td>
  )
}

// Table header that hides on mobile
interface HiddenOnMobileHeaderProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode
  hideBelow?: "sm" | "md" | "lg"
}

export function HiddenOnMobileHeader({
  children,
  hideBelow = "md",
  className,
  ...props
}: HiddenOnMobileHeaderProps) {
  const hideClasses = {
    sm: "hidden sm:table-cell",
    md: "hidden md:table-cell",
    lg: "hidden lg:table-cell",
  }

  return (
    <th className={cn(hideClasses[hideBelow], className)} {...props}>
      {children}
    </th>
  )
}

// Detail row shown on mobile to display hidden column data
interface MobileDetailRowProps {
  label: string
  value: React.ReactNode
  className?: string
}

export function MobileDetailRow({ label, value, className }: MobileDetailRowProps) {
  return (
    <div className={cn("flex items-center justify-between py-1", className)}>
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  )
}
