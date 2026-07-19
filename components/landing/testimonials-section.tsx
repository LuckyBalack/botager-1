import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    quote:
      "Using Mamulka has transformed how I manage my building. Tracking leases and payments has never been this easy!",
    name: "Zelalem Berihun",
    role: "Building Owner",
    avatar: "/professional-man-headshot-2.png",
  },
  {
    quote:
      "The vacancy overview feature saves so much time. I can plan leasing and maintenance efficiently.",
    name: "Workinesh Belayneh",
    role: "Building Owner",
    avatar: "/professional-woman-headshot.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 2xl:max-w-[1800px]">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl 2xl:text-5xl">
            Testimonials
          </h2>
          <p className="text-base text-slate-500">
            A glimpse of key system&apos;s core features
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col gap-6">
              <Quote
                className="h-8 w-8 text-slate-300"
                aria-hidden="true"
                strokeWidth={2.5}
              />
              <blockquote className="text-balance text-base leading-relaxed text-slate-700">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <img
                  src={t.avatar || "/placeholder.svg"}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </span>
                  <span className="text-xs text-slate-500">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
