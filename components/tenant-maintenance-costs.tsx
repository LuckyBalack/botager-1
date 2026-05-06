"use client"

import { DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface MaintenanceCost {
  id: string
  title: string
  category: string
  description: string
  estimatedCost: number
  actualCost?: number
  status: "completed" | "in-progress" | "pending"
  date: string
  vendor?: string
}

export function TenantMaintenanceCosts() {
  const costs: MaintenanceCost[] = [
    {
      id: "MC-001",
      title: "AC Compressor Repair",
      category: "HVAC",
      description: "Freon top-up and compressor maintenance",
      estimatedCost: 8500,
      actualCost: 8500,
      status: "completed",
      date: "Apr 26, 2024",
      vendor: "Tekle Maintenance",
    },
    {
      id: "MC-002",
      title: "Light Fixture Replacement",
      category: "Electrical",
      description: "Replace flickering LED fixture",
      estimatedCost: 2000,
      actualCost: undefined,
      status: "in-progress",
      date: "Apr 28, 2024",
      vendor: "Pending Assignment",
    },
    {
      id: "MC-003",
      title: "Ceiling Water Leak Repair",
      category: "Plumbing",
      description: "Fix water leak source and seal ceiling",
      estimatedCost: 12000,
      status: "pending",
      date: "Apr 28, 2024",
    },
  ]

  const totalEstimated = costs.reduce((sum, c) => sum + c.estimatedCost, 0)
  const totalActual = costs
    .filter((c) => c.actualCost)
    .reduce((sum, c) => sum + (c.actualCost || 0), 0)
  const completedCosts = costs.filter((c) => c.status === "completed")
  const averageRatio =
    completedCosts.length > 0
      ? (totalActual / completedCosts.reduce((sum, c) => sum + c.estimatedCost, 0)) *
        100
      : 0

  return (
    <div className="space-y-6">
      {/* Cost Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Estimated</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  ETB {totalEstimated.toLocaleString()}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">Actual Spent</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  ETB {totalActual.toLocaleString()}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Budget Ratio</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {averageRatio.toFixed(0)}%
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Maintenance Costs Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Estimated</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.map((cost) => {
                const variance =
                  cost.actualCost && cost.estimatedCost
                    ? ((cost.actualCost - cost.estimatedCost) / cost.estimatedCost) *
                      100
                    : 0

                return (
                  <TableRow key={cost.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-900">{cost.title}</p>
                        <p className="text-xs text-slate-500">
                          {cost.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{cost.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">
                      ETB {cost.estimatedCost.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {cost.actualCost ? (
                        <div>
                          <p className="font-semibold text-slate-900">
                            ETB {cost.actualCost.toLocaleString()}
                          </p>
                          <p
                            className={`text-xs ${
                              variance > 10
                                ? "text-red-600"
                                : variance < -10
                                  ? "text-emerald-600"
                                  : "text-slate-600"
                            }`}
                          >
                            {variance > 0 ? "+" : ""}{variance.toFixed(1)}%
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          cost.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          cost.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : cost.status === "in-progress"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                        }
                      >
                        {cost.status === "completed"
                          ? "Completed"
                          : cost.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
