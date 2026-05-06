"use client"

import { useState } from "react"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Clock, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { conversations, messages as allMessages, type Conversation } from "@/lib/data"

const messageTemplates = [
  {
    id: "payment-reminder",
    name: "Payment Reminder",
    category: "Billing",
    text: "Hi {{tenantName}}, this is a friendly reminder that your rent payment of {{amount}} is due on {{dueDate}}. Please arrange payment at your earliest convenience.",
  },
  {
    id: "maintenance-update",
    name: "Maintenance Update",
    category: "Maintenance",
    text: "Hi {{tenantName}}, we wanted to update you on your maintenance request #{{ticketId}}. Status: {{status}}. We appreciate your patience.",
  },
  {
    id: "lease-renewal",
    name: "Lease Renewal Notice",
    category: "Administrative",
    text: "Hi {{tenantName}}, your lease expires on {{expirationDate}}. Please contact us if you'd like to discuss renewal terms.",
  },
]

export function MessagesView() {
  const [view, setView] = useState<"chat" | "templates">("chat")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<typeof messageTemplates[0] | null>(null)

  const filteredConversations = conversations.filter(
    (c) =>
      searchQuery === "" ||
      c.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const conversationMessages = selectedConversation
    ? allMessages.filter((m) => m.conversationId === selectedConversation.id)
    : []

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to a backend
      setNewMessage("")
    }
  }

  return (
    <Tabs defaultValue="chat" className="flex h-full flex-col rounded-lg border border-slate-200 bg-white">
      <TabsList className="m-4 mb-0 border-b border-slate-200">
        <TabsTrigger value="chat" className="gap-2">
          <Send className="h-4 w-4" />
          Messages
        </TabsTrigger>
        <TabsTrigger value="templates" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Templates
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chat" className="m-0 flex-1 overflow-hidden rounded-none border-0">
        <div className="flex h-[calc(100vh-230px)] overflow-hidden rounded-lg border border-slate-200 bg-white">
      {/* Conversations List */}
      <div className="flex w-80 shrink-0 flex-col border-r border-slate-200">
        {/* Search Header */}
        <div className="border-b border-slate-200 p-4">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setSelectedConversation(conversation)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-slate-100 p-4 text-left transition-colors",
                selectedConversation?.id === conversation.id
                  ? "bg-orange-50"
                  : "hover:bg-slate-50"
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.avatar} alt={conversation.tenantName} />
                  <AvatarFallback>{conversation.tenantName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                {conversation.unread && (
                  <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-orange-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={cn("font-medium", conversation.unread ? "text-slate-900" : "text-slate-700")}>
                    {conversation.tenantName}
                  </span>
                  <span className="text-xs text-slate-400">{conversation.timestamp}</span>
                </div>
                <p className={cn(
                  "mt-1 truncate text-sm",
                  conversation.unread ? "font-medium text-slate-700" : "text-slate-500"
                )}>
                  {conversation.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.tenantName} />
                <AvatarFallback>{selectedConversation.tenantName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900">{selectedConversation.tenantName}</h3>
                <p className="text-sm text-slate-500">Tenant - Room 410</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-slate-500" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "admin" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-md rounded-2xl px-4 py-3",
                      message.sender === "admin"
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-900"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        message.sender === "admin" ? "text-orange-100" : "text-slate-400"
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5 text-slate-500" />
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
                className="shrink-0 gap-2 bg-orange-500 text-white hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-slate-500">
          Select a conversation to start messaging
        </div>
      )}
        </div>
      </TabsContent>

      <TabsContent value="templates" className="m-0 flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Message Templates</h2>
            <p className="text-sm text-slate-500">Use pre-built templates for quick, consistent messaging</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {messageTemplates.map((template) => (
              <Card
                key={template.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-orange-300",
                  selectedTemplate?.id === template.id && "border-orange-500 bg-orange-50"
                )}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <p className="mt-1 text-xs text-slate-500">{template.category}</p>
                    </div>
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-slate-600">{template.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTemplate && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-base">Preview: {selectedTemplate.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-white p-4">
                  <p className="text-sm text-slate-700">{selectedTemplate.text}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Close
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => {
                    setNewMessage(selectedTemplate.text)
                    setSelectedTemplate(null)
                  }}>
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
