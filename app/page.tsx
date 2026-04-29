"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing/landing-page"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { DashboardApp } from "@/components/dashboard-app"

type PublicView = "landing" | "onboarding"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [publicView, setPublicView] = useState<PublicView>("landing")

  if (isAuthenticated) {
    return <DashboardApp />
  }

  if (publicView === "onboarding") {
    return <OnboardingFlow onComplete={() => setIsAuthenticated(true)} />
  }

  return <LandingPage onGetStarted={() => setPublicView("onboarding")} />
}
