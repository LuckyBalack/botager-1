"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "@/lib/router-context"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const { navigate } = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Use provided email or default to admin demo
    const loginEmail = email || "admin@mamulka.com"
    const loginPassword = password || "admin123"

    // Simulate user detection by email domain
    const role = loginEmail.includes("admin") ? "admin" : loginEmail.includes("landlord") ? "landlord" : "tenant"

    login({
      id: "user-" + Date.now(),
      name: loginEmail.split("@")[0],
      email: loginEmail,
      phone: "+251912345678",
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginEmail}`,
    })

    // Navigate to home - DashboardApp will render based on authenticated user's role
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Marketplace</span>
        </button>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-10"
              >
                Sign In
              </Button>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-sm text-slate-600">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Sign Up
                  </button>
                </span>
              </div>

              {/* Admin Shortcut */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@mamulka.com")
                    setPassword("admin123")
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Testing? Use admin demo
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
