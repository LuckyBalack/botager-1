"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Archive, Trash2, Send, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface BulkAction {
  id: string
  label: string
  icon: React.ReactNode
  variant: "default" | "destructive"
  count: number
}

export function ModerationBulkActions({
  selectedCount,
  onApproveAll,
  onRejectAll,
  onArchiveAll,
}: {
  selectedCount: number
  onApproveAll: () => void
  onRejectAll: () => void
  onArchiveAll: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleApproveAll = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onApproveAll()
    toast.success(`Approved ${selectedCount} submissions`, {
      description: "Workspace owners have been notified.",
    })
    setIsLoading(false)
  }

  const handleRejectAll = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onRejectAll()
    toast.error(`Rejected ${selectedCount} submissions`, {
      description: "Rejection notices have been sent.",
    })
    setIsLoading(false)
  }

  const handleArchiveAll = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onArchiveAll()
    toast.info(`Archived ${selectedCount} submissions`, {
      description: "Items moved to archive.",
    })
    setIsLoading(false)
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox checked disabled />
            <span className="font-medium text-slate-900">
              {selectedCount} selected
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleApproveAll}
              disabled={isLoading}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Approve All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectAll}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Reject All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleArchiveAll}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Archive className="h-4 w-4" />
              )}
              Archive
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
