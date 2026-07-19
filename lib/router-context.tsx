"use client"

import React, { createContext, useContext, useState } from "react"

export type AppRoute = 
  | "/"
  | "/standard-rentals"
  | "/live-auctions"
  | "/landlord-marketing"
  | "/login"
  | "/register"
  | "/landlord-dashboard"
  | "/tenant-dashboard"
  | "/system-admin-dashboard"

interface RouterContextType {
  currentPath: AppRoute
  navigate: (path: AppRoute) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<AppRoute>("/")

  const navigate = (path: AppRoute) => {
    setCurrentPath(path)
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error("useRouter must be used within a RouterProvider")
  }
  return context
}
