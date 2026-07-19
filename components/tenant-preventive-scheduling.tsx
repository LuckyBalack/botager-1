"use client"

import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PreventiveTask {
  id: string
  name: string
  category: string
  frequency: string
  lastCompleted: string
  nextDue: string
  daysUntilDue: number
  description: string
  estimatedDuration: string
  priority: "critical" | "high" | "medium" | "low"
}

export function TenantPreventiveScheduling() {
  const preventiveTasks: PreventiveTask[] = [
    {
      id: "PT-001",
      name: "AC Filter Replacement",
      category: "HVAC",
      frequency: "Every 3 months",
      lastCompleted: "Jan 15, 2024",
      nextDue: "Apr 15, 2024",
      daysUntilDue: 18,
      description: "Replace AC filter to maintain cooling efficiency",
      estimatedDuration: "15 minutes",
      priority: "high",
    },
    {
      id: "PT-002",
      name: "Electrical System Inspection",
      category: "Electrical",
      frequency: "Every 6 months",
      lastCompleted: "Jan 20, 2024",
      nextDue: "Jul 20, 2024",
      daysUntilDue: 84,
      description: "Annual safety inspection of electrical systems",
      estimatedDuration: "1 hour",
      priority: "medium",
    },
    {
      id: "PT-003",
      name: "Plumbing Inspection",
      category: "Plumbing",
      frequency: "Every 6 months",
      lastCompleted: "Feb 10, 2024",
      nextDue: "Aug 10, 2024",
      daysUntilDue: 105,
      description: "Check for leaks and water pressure issues",
      estimatedDuration: "45 minutes",
      priority: "medium",
    },
    {
      id: "PT-004",
      name: "Lock & Security Check",
      category: "Security",
      frequency: "Every 3 months",
      lastCompleted: "Jan 10, 2024",
      nextDue: "Apr 10, 2024",
      daysUntilDue: 13,
      description: "Test locks and security systems functionality",
      estimatedDuration: "20 minutes",
      priority: "high",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700"
      case "high":
        return "bg-orange-100 text-orange-700"
      case "medium":
        return "bg-amber-100 text-amber-700"
      case "low":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getUrgencyStatus = (daysUntilDue: number) => {
    if (daysUntilDue <= 7) return "urgent"
    if (daysUntilDue <= 30) return "upcoming"
    return "scheduled"
  }

  const upcomingTasks = preventiveTasks.filter((t) => t.daysUntilDue <= 30)
  const completedPercentage = preventiveTasks.filter(
    (t) => t.daysUntilDue > 0
  ).length

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Tasks</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {preventiveTasks.length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <CheckCircle2 className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-amber-600">Due Soon (30 days)</p>
                <p className="mt-2 text-3xl font-bold text-amber-700">
                  {upcomingTasks.length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">On Schedule</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {completedPercentage}/{preventiveTasks.length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preventive Tasks List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Preventive Maintenance Schedule</CardTitle>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {preventiveTasks.map((task) => {
            const urgency = getUrgencyStatus(task.daysUntilDue)

            return (
              <div
                key={task.id}
                className={`rounded-lg border p-4 ${
                  urgency === "urgent"
                    ? "border-red-200 bg-red-50"
                    : urgency === "upcoming"
                      ? "border-amber-200 bg-amber-50"
                      : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">
                        {task.name}
                      </h4>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      {urgency === "urgent" && (
                        <Badge className="border-none bg-red-100 text-red-700">
                          Urgent
                        </Badge>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-slate-600">
                      {task.description}
                    </p>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        {task.frequency}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4" />
                        {task.estimatedDuration}
                      </div>
                      <div className="text-sm text-slate-600">
                        Last completed: {task.lastCompleted}
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        Next due: {task.nextDue}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col items-end gap-2">
                    <div
                      className={`rounded-lg px-3 py-1 text-center font-semibold ${
                        task.daysUntilDue <= 7
                          ? "bg-red-100 text-red-700"
                          : task.daysUntilDue <= 30
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {task.daysUntilDue} days
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <ChevronRight className="h-4 w-4" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex gap-4 py-6">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold">Preventive Maintenance Benefits</p>
            <ul className="mt-2 space-y-1">
              <li>• Extends equipment lifespan by 20-30%</li>
              <li>• Reduces emergency repair costs</li>
              <li>• Improves safety and comfort</li>
              <li>• Maintains warranty coverage</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
