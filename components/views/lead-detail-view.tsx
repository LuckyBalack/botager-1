"use client"

import { Phone, Mail, Calendar, Building2, DollarSign, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { LeadDetail } from "@/lib/data"

type LeadDetailViewProps = {
  lead: LeadDetail
  onConvert?: () => void
}

export function LeadDetailView({ lead, onConvert }: LeadDetailViewProps) {
  const warmthScoreColor = {
    "Cold": "bg-slate-100 text-slate-700",
    "Warm": "bg-amber-100 text-amber-700",
    "Hot": "bg-orange-100 text-orange-700",
    "Highly Interested": "bg-green-100 text-green-700",
  }

  const warmthScoreBg = {
    "Cold": "bg-slate-50",
    "Warm": "bg-amber-50",
    "Hot": "bg-orange-50",
    "Highly Interested": "bg-green-50",
  }

  const statusBadgeStyles = {
    "Contacted": "bg-blue-100 text-blue-700",
    "Interested": "bg-green-100 text-green-700",
    "Waiting": "bg-amber-100 text-amber-700",
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Lead Profile Header */}
      <Card className={warmthScoreBg[lead.warmthScore]}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {lead.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">{lead.name}</h1>
                <p className="text-foreground text-sm mb-3">{lead.company}</p>
                <div className="flex items-center gap-4 flex-wrap text-sm">
                  <div className="flex items-center gap-1 text-foreground">
                    <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    {lead.phone}
                  </div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    {lead.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex flex-col items-end gap-2">
                <Badge className={`text-sm font-semibold ${statusBadgeStyles[lead.status]}`}>
                  {lead.status}
                </Badge>
                <Badge className={`text-sm font-semibold ${warmthScoreColor[lead.warmthScore]}`}>
                  {lead.warmthScore}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Joined {lead.dateJoined}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requirements Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span>Space Size</span>
              </div>
              <p className="font-semibold text-foreground">{lead.desiredSize}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" aria-hidden="true" />
                <span>Budget Range</span>
              </div>
              <p className="font-semibold text-foreground text-sm">{lead.budgetRange}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" aria-hidden="true" />
                <span>Preferred Floor</span>
              </div>
              <p className="font-semibold text-foreground">{lead.desiredFloor}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span>Location</span>
              </div>
              <p className="font-semibold text-foreground text-sm">{lead.desiredLocation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{lead.notes}</p>
        </CardContent>
      </Card>

      {/* Follow-up Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow-up Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lead.activities.map((activity, idx) => (
              <div key={activity.id} className="relative pb-4">
                {/* Timeline Line */}
                {idx < lead.activities.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border" aria-hidden="true"></div>
                )}

                {/* Activity Card */}
                <div className="pl-12 relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary-foreground" aria-hidden="true"></div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground text-sm capitalize">
                          {activity.type === "call" && "📞 Call"}
                          {activity.type === "email" && "📧 Email"}
                          {activity.type === "tour" && "🏢 Tour"}
                          {activity.type === "meeting" && "🤝 Meeting"}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-3">{activity.notes}</p>
                    {activity.nextFollowUp && (
                      <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-2 rounded border border-border">
                        <Calendar className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                        <span className="text-muted-foreground">
                          Next follow-up: <span className="font-medium text-foreground">{activity.nextFollowUp}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Action */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1">
          Send Email
        </Button>
        <Button variant="outline" className="flex-1">
          <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
          Call Lead
        </Button>
        <Button
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onConvert}
        >
          <ArrowRight className="h-4 w-4 mr-2" aria-hidden="true" />
          Convert to Tenant
        </Button>
      </div>
    </div>
  )
}
