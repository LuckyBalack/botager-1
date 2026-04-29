"use client"

import { useState } from "react"
import {
  Search,
  LogOut,
  CreditCard,
  FileText,
  PenTool,
  MessageCircle,
  X,
  Send,
} from "lucide-react"
import { Input } from "@/components/ui/input"

type QuickLink = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const quickLinks: QuickLink[] = [
  {
    id: "move-out",
    title: "How to process a move-out",
    icon: LogOut,
  },
  {
    id: "telebirr",
    title: "Setting up Telebirr payments",
    icon: CreditCard,
  },
  {
    id: "tax-reports",
    title: "Generating Tax Reports",
    icon: FileText,
  },
  {
    id: "e-signatures",
    title: "Troubleshooting E-Signatures",
    icon: PenTool,
  },
]

type ChatMessage = {
  id: string
  sender: "user" | "agent"
  message: string
  timestamp: string
}

export function HelpCenterView() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">
          WRM Help Center & Support
        </h1>
        <p className="text-sm text-slate-500">
          Find answers to your questions or get in touch with our support team
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="How can we help you today? Search articles and guides..."
          className="h-14 pl-12 text-base"
        />
      </div>

      {/* Quick Links */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <button
                key={link.id}
                type="button"
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-orange-300 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                  <Icon className="h-7 w-7 text-orange-600" />
                </div>
                <span className="font-medium text-slate-700">{link.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Additional Help Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Popular Articles</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Getting started with WRM Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                How to add a new property
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Managing tenant contracts and renewals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Setting up automated rent reminders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Understanding the billing dashboard
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Video Tutorials</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Complete WRM walkthrough (15 min)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Setting up your first building
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Processing payments with Telebirr
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Generating monthly financial reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-orange-600 hover:underline"
              >
                Managing maintenance requests
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Support */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-900">
            Still need help?
          </h3>
          <p className="text-sm text-slate-600">
            Our support team is available Monday to Saturday, 8 AM - 6 PM EAT
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Email Support
          </button>
          <button
            type="button"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            Call Support
          </button>
        </div>
      </div>
    </div>
  )
}

// Live Chat Widget Component - to be used in dashboard-app.tsx
export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "agent",
      message: "Hello! Welcome to WRM Support. How can I help you today?",
      timestamp: "Just now",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: String(messages.length + 1),
        sender: "user",
        message: message.trim(),
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: ChatMessage = {
          id: String(messages.length + 2),
          sender: "agent",
          message:
            "Thank you for your message. A support agent will be with you shortly. In the meantime, you can check our Help Center for quick answers.",
          timestamp: "Just now",
        }
        setMessages((prev) => [...prev, agentResponse])
      }, 1500)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-700"
          aria-label="Open live chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[450px] w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-orange-600 px-4 py-3 text-white">
            <div className="flex flex-col">
              <span className="font-semibold">WRM Live Support</span>
              <span className="text-xs text-orange-100">
                Typically replies in under 5 minutes
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-orange-500"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-orange-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`mt-1 text-xs ${
                      msg.sender === "user" ? "text-orange-200" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-200 p-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
