"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type CostCategory = {
  category: string
  budgeted: string
  spent: string
  percentage: number
  status: "on-track" | "warning" | "critical"
}

const costCategories: CostCategory[] = [
  {
    category: "Plumbing",
    budgeted: "ETB 10,000",
    spent: "ETB 7,850",
    percentage: 78.5,
    status: "on-track",
  },
  {
    category: "Electrical",
    budgeted: "ETB 8,000",
    spent: "ETB 5,200",
    percentage: 65,
    status: "on-track",
  },
  {
    category: "HVAC",
    budgeted: "ETB 12,000",
    spent: "ETB 11,500",
    percentage: 95.8,
    status: "warning",
  },
  {
    category: "General",
    budgeted: "ETB 6,000",
    spent: "ETB 6,200",
    percentage: 103.3,
    status: "critical",
  },
  {
    category: "Emergency",
    budgeted: "ETB 5,000",
    spent: "ETB 3,500",
    percentage: 70,
    status: "on-track",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "on-track":
      return "bg-emerald-100 text-emerald-700"
    case "warning":
      return "bg-amber-100 text-amber-700"
    case "critical":
      return "bg-red-100 text-red-700"
  }
}

function getProgressColor(percentage: number) {
  if (percentage >= 100) return "bg-red-500"
  if (percentage >= 90) return "bg-amber-500"
  return "bg-emerald-500"
}

export function MaintenanceCostTracking() {
  const totalBudget = costCategories.reduce((sum, cat) => {
    const amount = parseInt(cat.budgeted.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  const totalSpent = costCategories.reduce((sum, cat) => {
    const amount = parseInt(cat.spent.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  const overallPercentage = (totalSpent / totalBudget) * 100

  return (
    <section className="space-y-4">
      <h3 className="font-semibold text-slate-900">Budget Tracking</h3>

      {/* Overall Summary */}
      <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-900">Overall Maintenance Budget</h4>
          <Badge className="bg-slate-100 text-slate-700">Current Month</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500">Total Budgeted</p>
            <p className="text-2xl font-bold text-slate-900">
              ETB {(totalBudget / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Spent</p>
            <p className="text-2xl font-bold text-slate-900">
              ETB {(totalSpent / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Budget utilization</span>
            <span className="font-semibold text-slate-900">
              {overallPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full ${getProgressColor(overallPercentage)} transition-all`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* By Category */}
      <div className="space-y-3">
        {costCategories.map((category) => (
          <div key={category.category} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">{category.category}</h4>
              <Badge className={getStatusColor(category.status)}>
                {category.percentage.toFixed(1)}% used
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  {category.spent} of {category.budgeted}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(category.percentage)} transition-all`}
                  style={{ width: `${Math.min(category.percentage, 100)}%` }}
                />
              </div>
            </div>
            {category.status !== "on-track" && (
              <div className="mt-2 flex items-center gap-2 rounded bg-amber-50 p-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-600" />
                <p className="text-xs text-amber-800">
                  {category.status === "critical"
                    ? "Budget exceeded"
                    : "Approaching budget limit"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Tip:</span> Set spending alerts to get notified when a
          category approaches its limit. Adjust budgets based on seasonal trends.
        </p>
      </div>
    </section>
  )
}
