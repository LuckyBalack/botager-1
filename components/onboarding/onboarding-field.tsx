type FieldProps = {
  label: string
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

/** Stacked label + input layout used across onboarding form rows. */
export function OnboardingField({
  label,
  htmlFor,
  children,
  className,
}: FieldProps) {
  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <label htmlFor={htmlFor} className="text-base font-semibold text-slate-900">
        {label}
      </label>
      {children}
    </div>
  )
}

/**
 * Faux floating-label container used for the Lease Start / Expiration date
 * inputs in the onboarding form. The label sits inside the top border for the
 * exact look of the design references.
 */
export function FloatingDateField({
  label,
  defaultValue,
  name,
}: {
  label: string
  defaultValue?: string
  name?: string
}) {
  return (
    <div className="relative rounded-md border border-slate-300 bg-white px-4 pb-2 pt-3">
      <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-semibold text-slate-900">
        {label}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder="mm/dd/yyyy"
        className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  )
}
