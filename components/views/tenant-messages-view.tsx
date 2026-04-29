"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Paperclip,
  Phone,
  Building2,
  User,
  Clock,
  CheckCheck,
  Image as ImageIcon,
  FileText,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data for tenant conversations
const propertyManager = {
  id: "pm-001",
  name: "Kebede Teshome",
  role: "Property Manager",
  avatar: undefined,
  phone: "+251 911 23 45 67",
  online: true,
}

const tenantMessages = [
  {
    id: "msg-001",
    sender: "manager",
    content: "Hello Alemu! Welcome to Abuki Building. Let me know if you have any questions about your new office space.",
    timestamp: "Mar 26, 2024 10:30 AM",
    read: true,
  },
  {
    id: "msg-002",
    sender: "tenant",
    content: "Thank you! I had a question about the parking allocation. How many spots are included with my lease?",
    timestamp: "Mar 26, 2024 11:15 AM",
    read: true,
  },
  {
    id: "msg-003",
    sender: "manager",
    content: "Your lease includes 1 reserved parking spot in the basement level. You can purchase additional spots for ETB 2,000/month if needed. I'll send you the parking sticker by tomorrow.",
    timestamp: "Mar 26, 2024 11:45 AM",
    read: true,
  },
  {
    id: "msg-004",
    sender: "tenant",
    content: "Perfect, one spot should be enough for now. Thank you for the quick response!",
    timestamp: "Mar 26, 2024 12:00 PM",
    read: true,
  },
  {
    id: "msg-005",
    sender: "manager",
    content: "You're welcome! Also, just a reminder that your first month's rent is due on April 5th. You can pay through the Invoices section in your portal or at the management office.",
    timestamp: "Mar 28, 2024 9:00 AM",
    read: true,
  },
  {
    id: "msg-006",
    sender: "tenant",
    content: "Noted. I'll make the payment through the portal. By the way, is there WiFi available in the common areas?",
    timestamp: "Mar 28, 2024 2:30 PM",
    read: true,
  },
  {
    id: "msg-007",
    sender: "manager",
    content: "Yes! There's free WiFi in all common areas. Network: \"Abuki-Guest\", Password: \"Welcome2024\". For your office, you can set up your own internet - we have fiber optic ready in each unit.",
    timestamp: "Mar 28, 2024 3:15 PM",
    read: true,
  },
  {
    id: "msg-008",
    sender: "manager",
    content: "Hi Alemu, this is a reminder that your rent payment is due in 3 days (April 5th). Please let me know if you need any assistance with the payment process.",
    timestamp: "Apr 2, 2024 10:00 AM",
    read: true,
  },
  {
    id: "msg-009",
    sender: "tenant",
    content: "Thanks for the reminder! I'll process the payment today.",
    timestamp: "Apr 2, 2024 11:30 AM",
    read: true,
  },
  {
    id: "msg-010",
    sender: "manager",
    content: "Payment received. Thank you, Alemu! Your receipt has been generated and sent to your email. Have a great month!",
    timestamp: "Apr 3, 2024 9:15 AM",
    read: true,
  },
]

// Quick reply suggestions
const quickReplies = [
  "I have a maintenance issue",
  "Question about my invoice",
  "When is my rent due?",
  "Request parking access",
]

type Message = typeof tenantMessages[0]

export function TenantMessagesView() {
  const [messages, setMessages] = useState<Message[]>(tenantMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    // Add tenant message
    const tenantMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "tenant",
      content: newMessage,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      read: true,
    }

    setMessages((prev) => [...prev, tenantMsg])
    setNewMessage("")

    // Simulate manager typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const managerResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "manager",
        content: "Thank you for your message! I'll get back to you shortly. If this is urgent, please call me at +251 911 23 45 67.",
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        read: false,
      }
      setMessages((prev) => [...prev, managerResponse])
    }, 2000)
  }

  const handleQuickReply = (text: string) => {
    setNewMessage(text)
  }

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="mt-1 text-slate-500">Communicate with your property manager</p>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {/* Contact Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={propertyManager.avatar} alt={propertyManager.name} />
                <AvatarFallback className="bg-orange-100 text-orange-700">
                  {propertyManager.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {propertyManager.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{propertyManager.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Building2 className="mr-1 h-3 w-3" />
                  {propertyManager.role}
                </Badge>
                {propertyManager.online ? (
                  <span className="text-xs text-emerald-600">Online</span>
                ) : (
                  <span className="text-xs text-slate-400">Offline</span>
                )}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Phone className="h-4 w-4" />
            {propertyManager.phone}
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {/* Date Separator */}
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-white px-4 py-1 text-xs text-slate-500 shadow-sm">
                Conversation started Mar 26, 2024
              </div>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.sender === "tenant" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "flex max-w-md flex-col gap-1",
                    message.sender === "tenant" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3",
                      message.sender === "tenant"
                        ? "rounded-br-sm bg-orange-500 text-white"
                        : "rounded-bl-sm bg-white text-slate-900 shadow-sm"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-1 px-1">
                    <span
                      className={cn(
                        "text-xs",
                        message.sender === "tenant" ? "text-slate-500" : "text-slate-400"
                      )}
                    >
                      {message.timestamp}
                    </span>
                    {message.sender === "tenant" && message.read && (
                      <CheckCheck className="h-3 w-3 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Replies */}
        <div className="border-t border-slate-100 bg-white px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => handleQuickReply(reply)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-slate-600">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="shrink-0 gap-2 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400"
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
