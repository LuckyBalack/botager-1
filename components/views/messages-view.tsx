"use client"

import { useState } from "react"
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { conversations, messages as allMessages, type Conversation } from "@/lib/data"

export function MessagesView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")

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
    <div className="flex h-[calc(100vh-180px)] overflow-hidden rounded-lg border border-slate-200 bg-white">
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
  )
}
