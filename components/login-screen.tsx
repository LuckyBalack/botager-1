"use client"

import { useState } from "react"
import { AlertTriangle, Building2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type LoginScreenProps = {
  onLogin: () => void
  onForgotPassword?: () => void
  onBackToLanding?: () => void
  isLocked?: boolean
}

export function LoginScreen({
  onLogin,
  onForgotPassword,
  onBackToLanding,
  isLocked = false,
}: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLocked) {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Mamulka
            </span>
            <span className="text-xs text-slate-500">Workspace Rental Management</span>
          </div>
        </div>

        {/* Locked Warning Banner */}
        {isLocked && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Account Locked</h3>
                <p className="mt-1 text-sm text-red-700">
                  Too many failed login attempts. Please contact support or wait 30 minutes
                  before trying again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Card */}
        <Card className={isLocked ? "opacity-75" : ""}>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLocked}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    disabled={isLocked}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-2 w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLocked}
              >
                {isLocked ? "Account Locked" : "Sign In"}
              </Button>
            </form>

            {isLocked && (
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-600">
                  Need help?{" "}
                  <a href="#" className="font-medium text-orange-600 hover:text-orange-700">
                    Contact Support
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to landing */}
        {onBackToLanding && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBackToLanding}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Back to home
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          © 2024 Nicomas Digitals. All rights reserved.
        </p>
      </div>
    </div>
  )
}
