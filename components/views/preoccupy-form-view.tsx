"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Building2,
  Globe,
  Check,
  Upload,
  User,
  Briefcase,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { MarketplaceListing } from "@/lib/data"

type PreoccupyFormViewProps = {
  listing: MarketplaceListing
  onBack: () => void
  onSignIn?: () => void
  showBackToAdmin?: boolean
  onBackToAdmin?: () => void
}

type FormStep = 1 | 2 | 3
type FormData = {
  fullName: string
  phone: string
  email: string
  businessNature: string
  preferredStartDate: string
  documentFile: File | null
}

export function PreoccupyFormView({
  listing,
  onBack,
  onSignIn,
  showBackToAdmin,
  onBackToAdmin,
}: PreoccupyFormViewProps) {
  const [language, setLanguage] = useState<"en" | "am">("en")
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    businessNature: "",
    preferredStartDate: "",
    documentFile: null,
  })

  const steps = [
    { number: 1, title: "Identity", icon: User },
    { number: 2, title: "Use Case", icon: Briefcase },
    { number: 3, title: "Documents", icon: FileText },
  ]

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = (step: FormStep): boolean => {
    switch (step) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.email.trim() !== ""
        )
      case 2:
        return (
          formData.businessNature.trim() !== "" &&
          formData.preferredStartDate.trim() !== ""
        )
      case 3:
        return true // Document is optional
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as FormStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep)
    } else {
      onBack()
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit the form data to an API
    setIsSubmitted(true)
  }

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold text-slate-900">Mamulka</span>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    {language === "en" ? "EN" : "AM"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("am")}>
                    Amharic
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={onSignIn}>
                Sign In
              </Button>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <main className="mx-auto max-w-2xl px-6 py-16">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Request Sent!
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              The owner will review your business profile and contact you shortly.
            </p>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-sm font-medium text-slate-500">
                  Requested Space
                </h2>
                <div className="mt-4 flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200">
                    <Building2 className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900">
                      {listing.buildingName} - Room {listing.roomNo}
                    </h3>
                    <p className="text-sm text-slate-500">{listing.location}</p>
                    <p className="mt-1 font-medium text-orange-600">
                      {listing.monthlyRent}/month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="outline" onClick={onBack}>
                Browse More Spaces
              </Button>
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={onSignIn}
              >
                Create Account to Track Request
              </Button>
            </div>
          </div>
        </main>

        {/* Floating Back to Admin Button */}
        {showBackToAdmin && (
          <button
            type="button"
            onClick={onBackToAdmin}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin Dashboard
          </button>
        )}
      </div>
    )
  }

  // Form View
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold text-slate-900">Mamulka</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "EN" : "AM"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("am")}>
                  Amharic
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={onSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Pre-occupy Request
          </h1>
          <p className="mt-2 text-slate-600">
            Complete this form to send a booking request to the workspace owner
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isCompleted = currentStep > step.number
                const isCurrent = currentStep === step.number

                return (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                              ? "bg-orange-500 text-white"
                              : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm ${
                          isCurrent ? "font-medium text-slate-900" : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 h-0.5 w-16 ${
                          currentStep > step.number ? "bg-green-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {/* Step 1: Identity */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Your Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            updateFormData("fullName", e.target.value)
                          }
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+251 9XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) =>
                            updateFormData("phone", e.target.value)
                          }
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Use Case */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Business Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="businessNature">Nature of Business *</Label>
                        <Textarea
                          id="businessNature"
                          placeholder="Describe your business and how you plan to use this space..."
                          value={formData.businessNature}
                          onChange={(e) =>
                            updateFormData("businessNature", e.target.value)
                          }
                          className="mt-1.5 min-h-[120px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredStartDate">
                          Preferred Start Date *
                        </Label>
                        <Input
                          id="preferredStartDate"
                          type="date"
                          value={formData.preferredStartDate}
                          onChange={(e) =>
                            updateFormData("preferredStartDate", e.target.value)
                          }
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Supporting Documents
                    </h2>
                    <p className="text-sm text-slate-500">
                      Upload your trade license or ID copy. This is optional for
                      the initial request but may speed up the approval process.
                    </p>
                    <div>
                      <Label>Trade License or ID Copy (Optional)</Label>
                      <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition-colors hover:border-orange-400 hover:bg-orange-50/50">
                        <Upload className="h-10 w-10 text-slate-400" />
                        <p className="mt-3 text-sm font-medium text-slate-700">
                          {formData.documentFile
                            ? formData.documentFile.name
                            : "Drag and drop or click to upload"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          PDF, JPG, or PNG up to 5MB
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            updateFormData("documentFile", file)
                          }}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                        <Button variant="outline" className="mt-4">
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
                  <Button variant="outline" onClick={handleBack}>
                    {currentStep === 1 ? "Cancel" : "Back"}
                  </Button>
                  {currentStep < 3 ? (
                    <Button
                      className="bg-orange-500 text-white hover:bg-orange-600"
                      onClick={handleNext}
                      disabled={!isStepValid(currentStep)}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      className="bg-orange-500 text-white hover:bg-orange-600"
                      onClick={handleSubmit}
                    >
                      Send Pre-occupy Request
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Pane */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-slate-500">
                  Selected Workspace
                </h3>
                <div className="mt-4">
                  <div className="aspect-video overflow-hidden rounded-lg bg-slate-200">
                    <div className="flex h-full items-center justify-center">
                      <Building2 className="h-12 w-12 text-slate-300" />
                    </div>
                  </div>
                  <h4 className="mt-4 font-semibold text-slate-900">
                    {listing.buildingName}
                  </h4>
                  <p className="text-sm text-slate-500">Room {listing.roomNo}</p>
                  <p className="text-sm text-slate-500">{listing.location}</p>

                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Size</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.officeSize}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Floor</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.floor}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Type</dt>
                        <dd className="font-medium text-slate-900">
                          {listing.spaceType}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {listing.monthlyRent}
                      </div>
                      <p className="text-sm text-slate-500">per month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Floating Back to Admin Button */}
      {showBackToAdmin && (
        <button
          type="button"
          onClick={onBackToAdmin}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin Dashboard
        </button>
      )}
    </div>
  )
}
