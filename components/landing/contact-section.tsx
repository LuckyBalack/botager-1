"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { toast } from "sonner"

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.firstName || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Message Sent", {
      description: "Thank you for reaching out. We'll get back to you soon!",
    })
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 2xl:max-w-[1800px]">
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Get in <span className="text-orange-600">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Have questions about Mamulka? Our team is here to help you streamline your property management.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Tell us how we can help..."
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Contact Information</h3>
              <p className="mt-3 text-slate-600">
                Reach out to us through any of the following channels. We&apos;re available Monday to Friday, 9 AM to 6 PM EST.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Mail className="h-6 w-6 text-orange-600" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email</h4>
                  <a
                    href="mailto:support@mamulka.com"
                    className="mt-1 text-slate-600 hover:text-orange-600 transition-colors"
                  >
                    support@mamulka.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Phone className="h-6 w-6 text-orange-600" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Phone</h4>
                  <a
                    href="tel:+251970742250"
                    className="mt-1 text-slate-600 hover:text-orange-600 transition-colors"
                  >
                    +251 970 74 22 50
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <MapPin className="h-6 w-6 text-orange-600" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Address</h4>
                  <p className="mt-1 text-slate-600">
                    Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6">
              <h4 className="font-semibold text-slate-900">Response Time</h4>
              <p className="mt-2 text-sm text-slate-600">
                We typically respond to inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
