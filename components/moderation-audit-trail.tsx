"use client"

import { CheckCircle2, XCircle, UserCheck, Clock, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AuditEvent {
  id: string
  timestamp: string
  action: "approved" | "rejected" | "reviewed" | "commented"
  reviewer: string
  submissionId: string
  buildingName: string
  notes?: string
}

export function ModerationAuditTrail() {
  const auditEvents: AuditEvent[] = [
    {
      id: "1",
      timestamp: "2024-01-15 14:32",
      action: "approved",
      reviewer: "Sarah Chen",
      submissionId: "SUB-001",
      buildingName: "Business Hub Tower",
    },
    {
      id: "2",
      timestamp: "2024-01-15 13:15",
      action: "rejected",
      reviewer: "Mike Johnson",
      submissionId: "SUB-002",
      buildingName: "Commerce Plaza",
      notes: "Missing ownership verification documents",
    },
    {
      id: "3",
      timestamp: "2024-01-15 12:45",
      action: "reviewed",
      reviewer: "Sarah Chen",
      submissionId: "SUB-003",
      buildingName: "Executive Centre",
    },
    {
      id: "4",
      timestamp: "2024-01-15 11:20",
      action: "commented",
      reviewer: "Mike Johnson",
      submissionId: "SUB-001",
      buildingName: "Business Hub Tower",
      notes: "Need clearer photos of building entrance",
    },
  ]

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "reviewed":
        return <UserCheck className="h-5 w-5 text-blue-600" />
      case "commented":
        return <MessageSquare className="h-5 w-5 text-slate-600" />
      default:
        return null
    }
  }

  const getActionLabel = (action: string) => {
    switch (action) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "reviewed":
        return "Reviewed"
      case "commented":
        return "Commented"
      default:
        return action
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "approved":
        return "bg-emerald-100 text-emerald-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "reviewed":
        return "bg-blue-100 text-blue-700"
      case "commented":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
        <CardDescription>Recent moderation actions and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4 pr-4">
            {auditEvents.map((event) => (
              <div key={event.id} className="flex gap-4 border-l-2 border-slate-200 pb-4 pl-4">
                <div className="mt-0.5 flex-shrink-0">
                  {getActionIcon(event.action)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">
                        {event.buildingName}
                      </p>
                      <p className="text-sm text-slate-500">
                        Reviewed by {event.reviewer}
                      </p>
                    </div>
                    <Badge className={getActionColor(event.action)}>
                      {getActionLabel(event.action)}
                    </Badge>
                  </div>

                  {event.notes && (
                    <p className="mt-1 text-sm text-slate-600">"{event.notes}"</p>
                  )}

                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {event.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
