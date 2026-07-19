"use client"

import { useState } from "react"
import { LogOut, LayoutDashboard, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function AvatarDropdown() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  if (!user) return null

  const handleLogout = () => {
    logout()
    window.location.href = "/"
    setOpen(false)
  }

  const handleDashboard = () => {
    if (user.role === "landlord") {
      window.location.href = "/landlord-dashboard"
    } else if (user.role === "admin") {
      window.location.href = "/system-admin-dashboard"
    } else {
      window.location.href = "/tenant-dashboard"
    }
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span>{user.name.charAt(0).toUpperCase()}</span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-600 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={handleDashboard}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-slate-500" />
                My Dashboard
              </button>
              <button
                onClick={() => {
                  window.location.href = "/"
                  setOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-3 transition-colors"
              >
                <User className="h-4 w-4 text-slate-500" />
                Profile
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
