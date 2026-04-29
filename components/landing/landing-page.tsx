"use client"

import { LandingHeader } from "@/components/landing/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { KeyFeaturesSection } from "@/components/landing/key-features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { LandingFooter } from "@/components/landing/landing-footer"

type LandingPageProps = {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <LandingHeader onGetStarted={onGetStarted} />
      <main>
        <HeroSection onGetStarted={onGetStarted} />
        <KeyFeaturesSection />
        <HowItWorksSection />
        <BenefitsSection onGetStarted={onGetStarted} />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </div>
  )
}
