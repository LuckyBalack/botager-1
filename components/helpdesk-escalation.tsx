"use client"

import { AlertTriangle, Clock, UserCheck, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface EscalationTicket {
  id: string
  title: string
  category: string
  priority: string
  createdTime: string
  hoursOpen: number
  assignee: string
  reason: string
}

export function HelpdeskEscalation() {
  const escalationCandidates: EscalationTicket[] = [
    {
      id: "TIK-001",
      title: "Login issues affecting 50+ users",
      category: "Technical",
      priority: "High",
      createdTime: "2024-01-15 08:30",
      hoursOpen: 6,
      assignee: "Support Team",
      reason: "SLA violation - Open for 6+ hours",
    },
    {
      id: "TIK-002",
      title: "Payment integration failure",
      category: "Billing",
      priority: "Critical",
      createdTime: "2024-01-15 10:15",
      hoursOpen: 4,
      assignee: "Unassigned",
      reason: "Critical priority with no assignment",
    },
    {
      id: "TIK-003",
      title: "Data export request - urgent",
      category: "Account",
      priority: "High",
      createdTime: "2024-01-14 14:00",
      hoursOpen: 20,
      assignee: "Support Team",
      reason: "SLA violation - Open for 20+ hours",
    },
  ]

  const handleEscalate = (ticketId: string) => {
    toast.success("Ticket Escalated", {
      description: "Management team has been notified.",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700"
      case "High":
        return "bg-orange-100 text-orange-700"
      case "Medium":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          Escalation Queue
        </CardTitle>
        <CardDescription>Tickets requiring urgent attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {escalationCandidates.length === 0 ? (
          <div className="rounded-lg bg-emerald-50 p-4 text-center text-sm text-emerald-700">
            No tickets requiring escalation at this time.
          </div>
        ) : (
          escalationCandidates.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-lg border-l-4 border-red-500 bg-red-50 p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <h3 className="font-medium text-slate-900">{ticket.title}</h3>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{ticket.id}</p>
                <div className="mt-2 flex gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Open {ticket.hoursOpen}h
                  </span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    {ticket.assignee}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-red-600">{ticket.reason}</p>
              </div>
              <Button
                onClick={() => handleEscalate(ticket.id)}
                className="gap-2 bg-red-600 hover:bg-red-700"
              >
                <TrendingUp className="h-4 w-4" />
                Escalate
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
