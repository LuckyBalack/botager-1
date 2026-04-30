"use client"

import { useState } from "react"
import { Send, Paperclip, AlertCircle, CheckCircle, Clock, Phone, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { MaintenanceTicketDetail } from "@/lib/data"

type MaintenanceTicketDetailViewProps = {
  ticket: MaintenanceTicketDetail
}

export function MaintenanceTicketDetailView({ ticket }: MaintenanceTicketDetailViewProps) {
  const [messageText, setMessageText] = useState("")

  const statusIcon = {
    "Open": <AlertCircle className="h-5 w-5 text-orange-500" aria-hidden="true" />,
    "In Progress": <Clock className="h-5 w-5 text-blue-500" aria-hidden="true" />,
    "Resolved": <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />,
  }[ticket.status] || null

  const priorityStyles = {
    "High": "bg-red-100 text-red-700",
    "Medium": "bg-amber-100 text-amber-700",
    "Low": "bg-slate-100 text-slate-600",
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ticket #{ticket.ticketNumber}
            </h1>
            <p className="text-lg text-foreground font-semibold">{ticket.title}</p>
          </div>
          <div className="flex items-center gap-2">
            {statusIcon}
            <Badge variant="outline" className="text-sm">
              {ticket.status}
            </Badge>
          </div>
        </div>

        {/* Context Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Room Number</p>
              <p className="font-semibold text-foreground">{ticket.roomNumber}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Tenant</p>
              <p className="font-semibold text-foreground text-sm">{ticket.tenantName}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Priority</p>
              <Badge className={`text-xs ${priorityStyles[ticket.priority]}`}>
                {ticket.priority}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Vendor</p>
              <p className="font-semibold text-foreground text-sm">{ticket.vendor.name}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issue Description Section */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
            <p className="text-foreground leading-relaxed">{ticket.description}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Damage Photos</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ticket.damagePhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg bg-slate-200 border border-border flex items-center justify-center"
                >
                  <span className="text-xs text-muted-foreground">Photo {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-2">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-foreground">{ticket.tenantPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-foreground">{ticket.vendor.phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Thread / Chat */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Thread</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {ticket.messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={msg.avatar} alt={msg.sender} />
                  <AvatarFallback className="text-xs">
                    {msg.sender.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm text-foreground">{msg.sender}</p>
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3 mb-2">
                    <p className="text-sm text-foreground leading-relaxed break-words">
                      {msg.message}
                    </p>
                  </div>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="space-y-2">
                      {msg.attachments.map((attachment, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded border border-border bg-slate-50 text-sm"
                        >
                          <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span className="text-foreground flex-1 truncate">
                            {attachment.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border pt-4 space-y-3">
            <Textarea
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4 mr-2" aria-hidden="true" />
                Attach Invoice
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  console.log("Send message:", messageText)
                  setMessageText("")
                }}
              >
                <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline">Reassign Vendor</Button>
        <Button variant="outline">Order Parts</Button>
        <Button className="ml-auto">Mark as Resolved</Button>
      </div>
    </div>
  )
}
