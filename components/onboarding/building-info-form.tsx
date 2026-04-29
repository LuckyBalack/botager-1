"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OnboardingField } from "@/components/onboarding/onboarding-field"
import { OnboardingSection } from "@/components/onboarding/onboarding-section"
import { DashedUpload } from "@/components/onboarding/dashed-upload"

const REGIONS = ["Addis Ababa", "Oromia", "Amhara", "Tigray", "Sidama"]

type BuildingInfoFormProps = {
  onNext: () => void
}

export function BuildingInfoForm({ onNext }: BuildingInfoFormProps) {
  const [internetOn, setInternetOn] = useState(true)
  const [parkingOn, setParkingOn] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onNext()
  }

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Building Information
        </h1>
        <p className="text-base text-slate-500">Basic Information</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        {/* Top: identity + capacity */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            <OnboardingField label="Building Name" htmlFor="bldgName">
              <Input id="bldgName" name="bldgName" placeholder="Official Name" />
            </OnboardingField>
            <OnboardingField label="Building Owner" htmlFor="bldgOwner">
              <Input id="bldgOwner" name="bldgOwner" placeholder="Owner" />
            </OnboardingField>
            <OnboardingField label="City" htmlFor="city">
              <Input id="city" name="city" placeholder="Addis Ababa" />
            </OnboardingField>
            <OnboardingField label="State/Region">
              <Select defaultValue="Addis Ababa">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </OnboardingField>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            <OnboardingField label="Total Floors" htmlFor="totalFloors">
              <Input id="totalFloors" name="totalFloors" placeholder="4" />
            </OnboardingField>
            <OnboardingField label="Total Units" htmlFor="totalUnits">
              <Input id="totalUnits" name="totalUnits" placeholder="400" />
            </OnboardingField>
            <div className="lg:col-span-2">
              <DashedUpload
                label="Building Photo (optional)"
                placeholder="Upload trade license"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <OnboardingSection title="Amenities">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
            <OnboardingField label="Elevators" htmlFor="elevators">
              <Input
                id="elevators"
                name="elevators"
                placeholder="2 passenger elevators"
              />
            </OnboardingField>
            <OnboardingField label="Security Features" htmlFor="security">
              <Input
                id="security"
                name="security"
                placeholder="CCTV, 24/7 security"
              />
            </OnboardingField>
            <OnboardingField label="Power Backup" htmlFor="power">
              <Input id="power" name="power" placeholder="Generator" />
            </OnboardingField>
          </div>

          <div className="flex flex-wrap items-center gap-12">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-slate-900">
                Internet/WiFi
              </span>
              <Switch
                checked={internetOn}
                onCheckedChange={setInternetOn}
                className="data-[state=checked]:bg-sky-500"
                aria-label="Toggle Internet/WiFi"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-slate-900">
                Parking Space
              </span>
              <Switch
                checked={parkingOn}
                onCheckedChange={setParkingOn}
                className="data-[state=checked]:bg-sky-500"
                aria-label="Toggle Parking Space"
              />
            </div>
          </div>
        </OnboardingSection>

        {/* Representative */}
        <OnboardingSection title="Representative">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            <OnboardingField label="Firstname" htmlFor="repFirst">
              <Input id="repFirst" name="repFirst" placeholder="Bizualem" />
            </OnboardingField>
            <OnboardingField label="Lastname" htmlFor="repLast">
              <Input id="repLast" name="repLast" placeholder="Geremew" />
            </OnboardingField>
            <OnboardingField label="Email" htmlFor="repEmail">
              <Input
                id="repEmail"
                name="repEmail"
                type="email"
                placeholder="bldg@gmail.com"
              />
            </OnboardingField>
            <OnboardingField label="Phone I" htmlFor="repPhone1">
              <Input id="repPhone1" name="repPhone1" placeholder="+251 9..." />
            </OnboardingField>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            <OnboardingField label="Phone II" htmlFor="repPhone2">
              <Input id="repPhone2" name="repPhone2" placeholder="+251 9..." />
            </OnboardingField>
            <OnboardingField label="Role" htmlFor="repRole">
              <Input id="repRole" name="repRole" placeholder="+251 9..." />
            </OnboardingField>
            <DashedUpload
              label="Building Photo (optional)"
              placeholder="Photo"
            />
          </div>
        </OnboardingSection>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-10 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
