type OnboardingSectionProps = {
  title: string
  children?: React.ReactNode
}

/**
 * Subtle section divider used in onboarding forms — small grey label followed
 * by a thin horizontal rule, identical to the dashboard detail-view sections.
 */
export function OnboardingSectionLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-base text-slate-500">{title}</span>
      <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
    </div>
  )
}

export function OnboardingSection({ title, children }: OnboardingSectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <OnboardingSectionLabel title={title} />
      {children}
    </section>
  )
}
