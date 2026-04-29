type BrandMarkProps = {
  className?: string
  showWordmark?: boolean
}

export function BrandMark({ className, showWordmark = true }: BrandMarkProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8 text-slate-900"
          aria-hidden="true"
        >
          <path d="M2 4 L16 28 L16 12 Z" fill="currentColor" />
          <path d="M16 12 L16 28 L30 4 Z" fill="currentColor" opacity="0.85" />
        </svg>
        {showWordmark && (
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Mamulka
          </span>
        )}
      </div>
    </div>
  )
}
