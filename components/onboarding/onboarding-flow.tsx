"use client"

import { useState } from "react"
import { LandingHeader } from "@/components/landing/landing-header"
import { BuildingInfoForm } from "@/components/onboarding/building-info-form"
import { OfficeInfoForm } from "@/components/onboarding/office-info-form"

type OnboardingStep = "basic" | "office"

type OnboardingFlowProps = {
  /** Called when the user finishes the flow — authenticates them. */
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>("basic")

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <LandingHeader onGetStarted={onComplete} onLogin={onComplete} />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10 lg:pt-36">
        {step === "basic" && (
          <BuildingInfoForm onNext={() => setStep("office")} />
        )}
        {step === "office" && <OfficeInfoForm onComplete={onComplete} />}
      </main>
    </div>
  )
}
