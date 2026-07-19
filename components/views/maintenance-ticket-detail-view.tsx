"use client"

import { useEffect, useState } from "react"
import { Send, Paperclip, AlertCircle, CheckCircle, Clock, Phone, Mail, FileText } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getMaintenanceTicketById, getTicketMessages, addTicketMessage, updateMaintenanceTicketStatus } from "@/lib/db"

type MaintenanceTicket = {
  id: string
  ticket_number: string
  title: string
  status: "Open" | "In Progress" | "Resolved"
  room_number: string
  tenant_name: string
  priority: "High" | "Medium" | "Low"
  vendor: { id: string; name: string; phone: string }
  description: string
  damage_photos: string[]
  tenant_phone: string
  messages: Array<{ id: string; sender: string; message: string; avatar?: string; timestamp: string; attachments?: Array<{ name: string }> }>
}

type MaintenanceTicketDetailViewProps = {
  ticketId: string
}

export function MaintenanceTicketDetailView({ ticketId }: MaintenanceTicketDetailViewProps) {
  const [ticket, setTicket] = useState<MaintenanceTicket | null>(null)
  const [loading, setLoading] = useState(true)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<MaintenanceTicket['messages']>([])

  // Load ticket and messages
  useEffect(() => {
    if (!ticketId) return

    const loadData = async () => {
      try {
        setLoading(true)
        const [ticketData, ticketMessages] = await Promise.all([
          getMaintenanceTicketById(ticketId),
          getTicketMessages(ticketId),
        ])
        setTicket(ticketData)
        setMessages(ticketMessages || [])
      } catch (error) {
        console.error("Error loading ticket:", error)
        toast.error("Error loading ticket details")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [ticketId])

  const handleSendMessage = async () => {
    if (!messageText.trim() || !ticket) return
    try {
      await addTicketMessage(ticket.id, {
        sender: "You",
        message: messageText,
        timestamp: new Date().toISOString(),
      })
      toast.success("Message Sent", {
        description: `Your message has been sent to ${ticket.vendor.name}`,
      })
      setMessageText("")
      // Reload messages
      const updated = await getTicketMessages(ticket.id)
      setMessages(updated || [])
    } catch (error) {
      toast.error("Error sending message")
    }
  }

  const handleReassignVendor = () => {
    toast.info("Reassign Vendor", {
      description: "Vendor reassignment dialog would open here",
    })
  }

  const handleOrderParts = () => {
    toast.info("Order Parts", {
      description: "Parts ordering form would open here",
    })
  }

  const handleMarkResolved = async () => {
    if (!ticket) return
    try {
      await updateMaintenanceTicketStatus(ticket.id, "Resolved")
      setTicket({ ...ticket, status: "Resolved" })
      toast.success("Ticket Resolved", {
        description: `Maintenance ticket #${ticket.ticket_number} has been marked as resolved`,
      })
    } catch (error) {
      toast.error("Error updating ticket status")
    }
  }

  if (loading) {
    return <div className="text-center p-8">Loading ticket details...</div>
  }

  if (!ticket) {
    return <div className="text-center p-8 text-red-600">Ticket not found</div>
  }

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
              Ticket #{ticket.ticket_number}
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
              <p className="font-semibold text-foreground">{ticket.room_number}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Tenant</p>
              <p className="font-semibold text-foreground text-sm">{ticket.tenant_name}</p>
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
              {ticket.damage_photos?.map((photo, idx) => (
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
                <span className="text-sm text-foreground">{ticket.tenant_phone}</span>
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
            {messages.map((msg) => (
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
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
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
        <Button variant="outline" onClick={handleReassignVendor}>Reassign Vendor</Button>
        <Button variant="outline" onClick={handleOrderParts}>Order Parts</Button>
        <Button className="ml-auto" onClick={handleMarkResolved}>Mark as Resolved</Button>
      </div>
    </div>
  )
}
