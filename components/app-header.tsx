"use client"

import { useState } from "react"
import { Bell, ChevronDown, Plus, AlertCircle, CheckCircle, Wrench, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

export type UserRole = "admin" | "tenant"

interface Notification {
  id: string
  icon: "alert" | "success" | "maintenance"
  message: string
  timestamp: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    icon: "alert",
    message: "Lease for Room 405 expires in 30 days.",
    timestamp: "2 hrs ago",
    read: false,
  },
  {
    id: "2",
    icon: "success",
    message: "Payment of ETB 15,000 received from Nicomas Digitals.",
    timestamp: "5 hrs ago",
    read: false,
  },
  {
    id: "3",
    icon: "maintenance",
    message: "New High-Priority Work Order submitted for Room 212.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "4",
    icon: "alert",
    message: "Upcoming inspection scheduled for Building A.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    icon: "success",
    message: "Lease renewal completed for Meaza Tadesse.",
    timestamp: "3 days ago",
    read: true,
  },
]

function NotificationIcon({ type }: { type: Notification["icon"] }) {
  switch (type) {
    case "alert":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-4 w-4 text-red-600" />
        </div>
      )
    case "success":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-4 w-4 text-green-600" />
        </div>
      )
    case "maintenance":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <Wrench className="h-4 w-4 text-orange-600" />
        </div>
      )
  }
}

type AppHeaderProps = {
  title: string
  showAddTenant?: boolean
  onAddTenant?: () => void
  userRole?: UserRole
  onRoleToggle?: () => void
}

export function AppHeader({
  title,
  showAddTenant = false,
  onAddTenant,
  userRole = "admin",
  onRoleToggle,
}: AppHeaderProps) {
  const [notificationList, setNotificationList] = useState(notifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotificationList(
      notificationList.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-10 py-6">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>

      <div className="flex items-center gap-6">
        {/* Role Toggle */}
        {onRoleToggle && (
          <button
            type="button"
            onClick={onRoleToggle}
            className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            {userRole === "admin" ? "Switch to Tenant View" : "Switch to Admin View"}
          </button>
        )}

        {showAddTenant && (
          <button
            type="button"
            onClick={onAddTenant}
            className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          >
            <span>Add Tenant</span>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {/* Notification Bell with Popover */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="end">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Mark all as read
              </button>
            </div>

            {/* Notification List */}
            <ScrollArea className="h-[400px]">
              <div className="flex flex-col">
                {notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`flex cursor-pointer items-start gap-3 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50 ${
                      !notification.read ? "bg-orange-50/50" : "bg-white"
                    }`}
                  >
                    <NotificationIcon type={notification.icon} />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{notification.message}</p>
                      <p className="mt-1 text-xs text-slate-400">{notification.timestamp}</p>
                    </div>
                    {!notification.read && (
                      <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <button
          type="button"
          className="flex items-center gap-3 rounded-md p-1 transition-colors hover:bg-slate-50"
          aria-label="Open user menu"
        >
          <img
            src="/professional-headshot.png"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col items-start text-left leading-tight">
            <span className="text-sm font-semibold text-slate-900">Alemu Getachew</span>
            <span className="text-xs text-slate-500">Admin</span>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
