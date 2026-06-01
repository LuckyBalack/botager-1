"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

interface MobileNavSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
}

export function MobileNavSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: MobileNavSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b border-slate-200 px-6 py-4">
          <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
          {description && (
            <SheetDescription className="text-sm text-slate-500">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="flex flex-col overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileMenuTriggerProps {
  onClick: () => void
  className?: string
}

export function MobileMenuTrigger({ onClick, className }: MobileMenuTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={onClick}
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
