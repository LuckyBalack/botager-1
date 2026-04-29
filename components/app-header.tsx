"use client"

import { useState } from "react"
import { Bell, ChevronDown, Plus, AlertCircle, CheckCircle, Wrench, Globe, Menu, PanelLeftClose, PanelLeft } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type UserRole = "admin" | "tenant" | "system-admin"

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
  onMenuToggle?: () => void
  showMenuButton?: boolean
  sidebarCollapsed?: boolean
  onSidebarToggle?: () => void
}

export function AppHeader({
  title,
  showAddTenant = false,
  onAddTenant,
  userRole = "admin",
  onRoleToggle,
  onMenuToggle,
  showMenuButton = true,
  sidebarCollapsed = false,
  onSidebarToggle,
}: AppHeaderProps) {
  const [notificationList, setNotificationList] = useState(notifications)
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "am">("en")

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
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6 md:py-5 lg:px-10 lg:py-6 2xl:px-12 2xl:py-7">
      {/* Left side: Menu button + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger menu */}
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {/* Desktop sidebar toggle */}
        {onSidebarToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={onSidebarToggle}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>
        )}

        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl lg:text-3xl 2xl:text-4xl">
          {title}
        </h2>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Language Switcher - Hidden on small mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:flex sm:px-3 sm:py-2 sm:text-sm"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden lg:inline">{language === "en" ? "English" : "Amharic"}</span>
              <span className="lg:hidden">{language === "en" ? "EN" : "AM"}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("am")}>
              Amharic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Role Toggle - Hidden on mobile, shown from tablet up */}
        {onRoleToggle && (
          <button
            type="button"
            onClick={onRoleToggle}
            className="hidden rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 md:block md:px-4 md:py-2 md:text-sm"
          >
            <span className="hidden lg:inline">
              {userRole === "admin" && "Switch to Tenant View"}
              {userRole === "tenant" && "Switch to System Admin"}
              {userRole === "system-admin" && "Switch to Admin View"}
            </span>
            <span className="lg:hidden">
              {userRole === "admin" && "Tenant"}
              {userRole === "tenant" && "Sys Admin"}
              {userRole === "system-admin" && "Admin"}
            </span>
          </button>
        )}

        {/* Add Tenant Button */}
        {showAddTenant && (
          <button
            type="button"
            onClick={onAddTenant}
            className="inline-flex items-center gap-1 rounded-md bg-orange-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm lg:px-5"
          >
            <span className="hidden sm:inline">Add Tenant</span>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {/* Notification Bell */}
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
          <PopoverContent className="w-80 p-0 sm:w-96" align="end">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">Notifications</h3>
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs text-orange-600 hover:text-orange-700 sm:text-sm"
              >
                Mark all as read
              </button>
            </div>

            {/* Notification List */}
            <ScrollArea className="h-[320px] sm:h-[400px]">
              <div className="flex flex-col">
                {notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50",
                      !notification.read ? "bg-orange-50/50" : "bg-white"
                    )}
                  >
                    <NotificationIcon type={notification.icon} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 sm:text-sm">{notification.message}</p>
                      <p className="mt-1 text-xs text-slate-400">{notification.timestamp}</p>
                    </div>
                    {!notification.read && (
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* User Profile - Simplified on mobile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-md p-1 transition-colors hover:bg-slate-50 sm:gap-3"
          aria-label="Open user menu"
        >
          <img
            src="/professional-headshot.png"
            alt=""
            className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
          />
          <div className="hidden flex-col items-start text-left leading-tight md:flex">
            <span className="text-sm font-semibold text-slate-900">Alemu Getachew</span>
            <span className="text-xs text-slate-500">Admin</span>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-slate-500 sm:block" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
