"use client"

import { AuthProvider } from "@/lib/auth-context"
import { RouterProvider, useRouter } from "@/lib/router-context"
import { DashboardApp } from "@/components/dashboard-app"
import { LoginPage } from "@/components/auth/login-page"
import { RegisterPage } from "@/components/auth/register-page"
import { LandlordMarketingPage } from "@/components/landlord-marketing-page"
import { LandingPage } from "@/components/landing/landing-page"
import { useAuth } from "@/lib/auth-context"

function AppContent() {
  const { currentPath, navigate } = useRouter()
  const { isAuthenticated, user } = useAuth()

  // Render login page
  if (currentPath === "/login") {
    return <LoginPage />
  }

  // Render register page
  if (currentPath === "/register") {
    return <RegisterPage />
  }

  // Render landlord marketing page
  if (currentPath === "/landlord-marketing") {
    return <LandlordMarketingPage />
  }

  // Render dashboard if authenticated
  if (isAuthenticated) {
    return <DashboardApp />
  }

  // Render marketplace with all views
  return (
    <LandingPage
      onPostListing={() => navigate("/landlord-marketing")}
      onLogin={() => navigate("/login")}
      onGetStarted={() => navigate("/register")}
      currentPath={currentPath}
      onNavigate={navigate}
    />
  )
}

export default function Home() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </RouterProvider>
  )
}
