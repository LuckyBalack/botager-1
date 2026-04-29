"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing/landing-page"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { DashboardApp } from "@/components/dashboard-app"
import { LoginScreen } from "@/components/login-screen"

type PublicView = "landing" | "onboarding" | "login" | "login-locked"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [publicView, setPublicView] = useState<PublicView>("landing")

  if (isAuthenticated) {
    return <DashboardApp />
  }

  if (publicView === "login") {
    return (
      <LoginScreen
        onLogin={() => setIsAuthenticated(true)}
        onBackToLanding={() => setPublicView("landing")}
        isLocked={false}
      />
    )
  }

  if (publicView === "login-locked") {
    return (
      <LoginScreen
        onLogin={() => {}}
        onBackToLanding={() => setPublicView("landing")}
        isLocked={true}
      />
    )
  }

  if (publicView === "onboarding") {
    return <OnboardingFlow onComplete={() => setIsAuthenticated(true)} />
  }

  return (
    <LandingPage
      onGetStarted={() => setPublicView("onboarding")}
      onLogin={() => setPublicView("login")}
    />
  )
}
