"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, BarChart3, Clock, Users, Shield, TrendingUp, Zap } from "lucide-react"
import { useRouter } from "@/lib/router-context"

export function LandlordMarketingPage() {
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Marketplace</span>
          </button>
          <div className="text-2xl font-bold text-orange-600">Mamulka</div>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Effortlessly Manage Your Office Spaces with Mamulka
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            List, manage, and monetize your office spaces in Addis Ababa. Connect with thousands of tenants looking for premium workspace solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold h-12 px-8"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold h-12 px-8"
              onClick={() => navigate("/")}
            >
              View Marketplace
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why List with Mamulka?</h2>
            <p className="text-slate-600 text-lg">Everything you need to succeed as a landlord</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <div className="rounded-lg bg-orange-100 w-12 h-12 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Easy Management</h3>
                <p className="text-slate-600">
                  Manage all your listings, tenants, and communications from one intuitive dashboard
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <div className="rounded-lg bg-blue-100 w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Access to Tenants</h3>
                <p className="text-slate-600">
                  Connect with thousands of verified tenants actively searching for office spaces
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <div className="rounded-lg bg-green-100 w-12 h-12 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Maximize Revenue</h3>
                <p className="text-slate-600">
                  Smart pricing tools and real-time analytics to optimize your rental income
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <div className="rounded-lg bg-purple-100 w-12 h-12 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Save Time</h3>
                <p className="text-slate-600">
                  Automate screening, lease management, and payment collection processes
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <div className="rounded-lg bg-red-100 w-12 h-12 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Secure & Safe</h3>
                <p className="text-slate-600">
                  Verified tenants, secure payments, and dispute resolution support
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 space-y-4">
                <div className="rounded-lg bg-yellow-100 w-12 h-12 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">24/7 Support</h3>
                <p className="text-slate-600">
                  Dedicated support team ready to help you succeed at any time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Join hundreds of landlords who are already making more money with Mamulka. List your spaces and start earning today.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-slate-100 text-orange-600 font-semibold h-12 px-8"
            onClick={() => navigate("/register")}
          >
            Request a Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 Mamulka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
