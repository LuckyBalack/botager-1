"use client"

import { Plus, GripVertical } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaintenanceServiceHistory } from "@/components/maintenance-service-history"
import { MaintenanceCostTracking } from "@/components/maintenance-cost-tracking"
import { MaintenanceSLA } from "@/components/maintenance-sla"
import {
  maintenanceTickets,
  type MaintenancePriority,
  type MaintenanceStatus,
} from "@/lib/data"

function PriorityBadge({ priority }: { priority: MaintenancePriority }) {
  const variants: Record<MaintenancePriority, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-slate-100 text-slate-600",
  }

  return (
    <Badge className={`${variants[priority]} border-none text-xs font-medium`}>
      {priority}
    </Badge>
  )
}

type KanbanColumnProps = {
  title: string
  status: MaintenanceStatus
  count: number
}

function KanbanColumn({ title, status, count }: KanbanColumnProps) {
  const tickets = maintenanceTickets.filter((t) => t.status === status)

  return (
    <div className="flex flex-1 flex-col rounded-lg bg-slate-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">
            {count}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="group cursor-grab rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
          >
            {/* Drag handle indicator */}
            <div className="mb-3 flex items-center justify-between">
              <PriorityBadge priority={ticket.priority} />
              <GripVertical className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Unit number */}
            <p className="text-sm font-medium text-slate-500">
              {ticket.unitNumber}
            </p>

            {/* Title */}
            <h4 className="mt-1 font-semibold text-slate-900">{ticket.title}</h4>

            {/* Date and Assignee */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {ticket.dateSubmitted}
              </span>
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={ticket.assignedTo.avatar}
                  alt={ticket.assignedTo.name}
                />
                <AvatarFallback className="text-xs">
                  {ticket.assignedTo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MaintenanceView() {
  const openCount = maintenanceTickets.filter((t) => t.status === "Open").length
  const inProgressCount = maintenanceTickets.filter(
    (t) => t.status === "In Progress"
  ).length
  const resolvedCount = maintenanceTickets.filter(
    (t) => t.status === "Resolved"
  ).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Work Orders & Maintenance
          </h1>
          <p className="text-sm text-slate-500">
            Track and manage maintenance requests
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>New Request</span>
        </button>
      </div>

      <Tabs defaultValue="board" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="board" className="px-6">
            Work Board
          </TabsTrigger>
          <TabsTrigger value="history" className="px-6">
            Service History
          </TabsTrigger>
          <TabsTrigger value="costs" className="px-6">
            Cost Tracking
          </TabsTrigger>
          <TabsTrigger value="sla" className="px-6">
            SLA Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          {/* Kanban Board */}
          <div className="flex gap-6">
            <KanbanColumn title="Open" status="Open" count={openCount} />
            <KanbanColumn
              title="In Progress"
              status="In Progress"
              count={inProgressCount}
            />
            <KanbanColumn title="Resolved" status="Resolved" count={resolvedCount} />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <MaintenanceServiceHistory />
        </TabsContent>

        <TabsContent value="costs">
          <MaintenanceCostTracking />
        </TabsContent>

        <TabsContent value="sla">
          <MaintenanceSLA />
        </TabsContent>
      </Tabs>
    </div>
  )
}
