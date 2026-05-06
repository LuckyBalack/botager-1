"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FilterState {
  status: string
  riskLevel: string
  submittedAfter: string
  documentCount: string
}

export function ModerationAdvancedFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: FilterState) => void
}) {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    riskLevel: "all",
    submittedAfter: "",
    documentCount: "all",
  })

  const [isOpen, setIsOpen] = useState(false)

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all" && v !== ""
  ).length

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const resetState: FilterState = {
      status: "all",
      riskLevel: "all",
      submittedAfter: "",
      documentCount: "all",
    }
    setFilters(resetState)
    onFilterChange(resetState)
  }

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="h-4 w-4" />
        Advanced Filters
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk">Risk Level</Label>
                <Select value={filters.riskLevel} onValueChange={(v) => handleFilterChange("riskLevel", v)}>
                  <SelectTrigger id="risk">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Submitted After</Label>
                <Input
                  id="date"
                  type="date"
                  value={filters.submittedAfter}
                  onChange={(e) => handleFilterChange("submittedAfter", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="docs">Document Count</Label>
                <Select value={filters.documentCount} onValueChange={(v) => handleFilterChange("documentCount", v)}>
                  <SelectTrigger id="docs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Count</SelectItem>
                    <SelectItem value="incomplete">Incomplete (&lt;5)</SelectItem>
                    <SelectItem value="complete">Complete (5+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
