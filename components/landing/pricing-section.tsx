"use client"

import { Check } from "lucide-react"

type PricingPlan = {
  name: string
  description: string
  price: number
  period: string
  rooms: string
  features: string[]
  highlighted?: boolean
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for small property managers",
    price: 29,
    period: "/month",
    rooms: "1-10 rooms",
    features: [
      "Up to 10 rooms",
      "Basic tenant management",
      "Rent tracking",
      "Mobile app access",
      "Email support",
      "Monthly reports",
    ],
  },
  {
    name: "Professional",
    description: "For growing property portfolios",
    price: 79,
    period: "/month",
    rooms: "11-50 rooms",
    features: [
      "Up to 50 rooms",
      "Advanced tenant management",
      "Automated rent reminders",
      "Maintenance tracking",
      "Expense management",
      "Financial analytics",
      "Priority support",
      "Custom reports",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: 199,
    period: "/month",
    rooms: "50+ rooms",
    features: [
      "Unlimited rooms",
      "Multi-property management",
      "Advanced automation",
      "Full accounting integration",
      "Custom workflows",
      "White-label options",
      "Dedicated account manager",
      "24/7 phone support",
      "Advanced security",
      "Custom integrations",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 2xl:max-w-[1800px]">
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Simple, Transparent <span className="text-orange-600">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Choose the perfect plan for your property management needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border transition-all ${
                plan.highlighted
                  ? "border-orange-600 bg-white shadow-2xl ring-2 ring-orange-100 lg:scale-105"
                  : "border-slate-200 bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                  <span className="rounded-full bg-orange-600 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>

                {/* Room Info */}
                <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
                  <p className="text-sm font-medium text-slate-600">
                    <span className="text-orange-600 font-semibold">{plan.rooms}</span>
                  </p>
                </div>

                {/* Pricing */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Billed monthly. Cancel anytime.</p>
                </div>

                {/* CTA Button */}
                <button
                  className={`mt-8 w-full rounded-lg px-6 py-3 font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-orange-600 text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600"
                      : "border-2 border-slate-200 text-slate-900 hover:border-orange-600 hover:text-orange-600"
                  }`}
                >
                  Get Started
                </button>
              </div>

              {/* Features */}
              <div className="flex-1 border-t border-slate-200 p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Included Features</p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-orange-600" aria-hidden="true" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 lg:mt-20">
          <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>

          <div className="mt-8 space-y-8">
            <div>
              <h4 className="font-semibold text-slate-900">Can I switch plans anytime?</h4>
              <p className="mt-2 text-slate-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected on your next billing cycle.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">What payment methods do you accept?</h4>
              <p className="mt-2 text-slate-600">
                We accept all major credit cards, bank transfers, and mobile payments. Enterprise customers can arrange custom payment terms.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">Is there a long-term contract?</h4>
              <p className="mt-2 text-slate-600">
                No, there&apos;s no long-term contract. You can cancel your subscription at any time with no penalties or hidden fees.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">What if I exceed the room limit?</h4>
              <p className="mt-2 text-slate-600">
                We&apos;ll notify you as you approach your limit. Simply upgrade to a higher tier to continue adding rooms without interruption.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 p-8 text-center sm:p-12 lg:mt-20">
          <h3 className="text-3xl font-bold text-white sm:text-4xl">Ready to get started?</h3>
          <p className="mt-3 text-lg text-orange-100">
            Start your free 14-day trial today. No credit card required.
          </p>
          <button className="mt-6 inline-flex rounded-lg bg-white px-8 py-3 font-semibold text-orange-600 hover:bg-orange-50 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  )
}
