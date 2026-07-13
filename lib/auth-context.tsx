"use client"

import React, { createContext, useContext, useState } from "react"

export type UserRole = "tenant" | "landlord" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  buildingId?: string
}

interface AuthContextType {
  user: User | null
  buildingId: string | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  register: (user: User) => void
  setBuildingId: (buildingId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [buildingId, setBuildingIdState] = useState<string | null>(null)

  const login = (loginUser: User) => {
    setUser(loginUser)
    if (loginUser.buildingId) {
      setBuildingIdState(loginUser.buildingId)
    }
  }

  const logout = () => {
    setUser(null)
    setBuildingIdState(null)
  }

  const register = (newUser: User) => {
    setUser(newUser)
    if (newUser.buildingId) {
      setBuildingIdState(newUser.buildingId)
    }
  }

  const setBuildingId = (id: string) => {
    setBuildingIdState(id)
    if (user) {
      setUser({ ...user, buildingId: id })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        buildingId,
        isAuthenticated: user !== null,
        login,
        logout,
        register,
        setBuildingId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
