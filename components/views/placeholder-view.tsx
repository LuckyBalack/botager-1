import type { LucideIcon } from "lucide-react"

type PlaceholderViewProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function PlaceholderView({ title, description, icon: Icon }: PlaceholderViewProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex max-w-md flex-col items-center gap-4 rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm leading-relaxed text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  )
}
