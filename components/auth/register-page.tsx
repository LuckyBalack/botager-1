"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Phone, ArrowLeft, Building2, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "@/lib/router-context"
import type { UserRole } from "@/lib/auth-context"

interface RegisterPageProps {
  preSelectedRole?: UserRole
}

export function RegisterPage({ preSelectedRole }: RegisterPageProps) {
  const [step, setStep] = useState<"role" | "form">(preSelectedRole ? "form" : "role")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(preSelectedRole || null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+251",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const { register } = useAuth()
  const { navigate } = useRouter()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep("form")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    register({
      id: "user-" + Date.now(),
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: selectedRole!,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
    })

    // Route based on role
    if (selectedRole === "landlord") {
      navigate("/landlord-dashboard")
    } else {
      navigate("/tenant-dashboard")
    }
  }

  // Role Selection Step
  if (step === "role") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Marketplace</span>
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Create Your Account</h1>
            <p className="text-slate-600">Who are you?</p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tenant Card */}
            <button
              onClick={() => handleRoleSelect("tenant")}
              className="group"
            >
              <Card className="h-full border-2 border-slate-200 hover:border-orange-400 transition-all hover:shadow-lg cursor-pointer">
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-blue-100 p-4 group-hover:bg-blue-200 transition-colors">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">I am a Tenant</h3>
                    <p className="text-sm text-slate-600 mt-2">
                      Looking for the perfect workspace in Addis Ababa
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>

            {/* Landlord Card */}
            <button
              onClick={() => handleRoleSelect("landlord")}
              className="group"
            >
              <Card className="h-full border-2 border-slate-200 hover:border-orange-400 transition-all hover:shadow-lg cursor-pointer">
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-200 transition-colors">
                      <Building2 className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">I am a Landlord</h3>
                    <p className="text-sm text-slate-600 mt-2">
                      Looking to list and manage your office spaces
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-sm text-slate-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Sign In
              </button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Registration Form Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Back Button */}
        <button
          onClick={() => setStep("role")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Register Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              {selectedRole === "landlord" ? "Register as Landlord" : "Register as Tenant"}
            </CardTitle>
            <CardDescription>Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-700 font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email */}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="phone"
                    placeholder="+251912345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-10"
              >
                Create Account
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Sign In
                  </button>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
