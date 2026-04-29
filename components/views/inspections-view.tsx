"use client"

import { useState } from "react"
import { Camera, Check, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type ConditionStatus = "excellent" | "fair" | "damaged" | ""

interface InspectionArea {
  id: string
  name: string
  status: ConditionStatus
  notes: string
  hasPhoto: boolean
}

const initialAreas: InspectionArea[] = [
  { id: "main-office", name: "Main Office", status: "", notes: "", hasPhoto: false },
  { id: "private-bathroom", name: "Private Bathroom", status: "", notes: "", hasPhoto: false },
  { id: "windows", name: "Windows", status: "", notes: "", hasPhoto: false },
  { id: "hvac", name: "HVAC System", status: "", notes: "", hasPhoto: false },
  { id: "flooring", name: "Flooring", status: "", notes: "", hasPhoto: false },
  { id: "walls-ceiling", name: "Walls & Ceiling", status: "", notes: "", hasPhoto: false },
  { id: "electrical", name: "Electrical Outlets", status: "", notes: "", hasPhoto: false },
  { id: "door-locks", name: "Door & Locks", status: "", notes: "", hasPhoto: false },
]

export function InspectionsView() {
  const [inspectionType, setInspectionType] = useState<string>("move-in")
  const [areas, setAreas] = useState<InspectionArea[]>(initialAreas)
  const [managerSigned, setManagerSigned] = useState(false)
  const [tenantSigned, setTenantSigned] = useState(false)

  const updateArea = (id: string, field: keyof InspectionArea, value: string | boolean) => {
    setAreas(areas.map(area => 
      area.id === id ? { ...area, [field]: value } : area
    ))
  }

  const getStatusColor = (status: ConditionStatus) => {
    switch (status) {
      case "excellent": return "bg-green-500 text-white border-green-500"
      case "fair": return "bg-yellow-500 text-white border-yellow-500"
      case "damaged": return "bg-red-500 text-white border-red-500"
      default: return "bg-white text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {/* Header - Optimized for tablet */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Property Inspections & Condition Reports
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Document property conditions during move-in, move-out, or routine inspections
        </p>
      </div>

      {/* Inspection Header */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-600">Unit Number</Label>
                <div className="mt-1 text-xl font-bold text-slate-900">Room 310</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600">Tenant Name</Label>
                <div className="mt-1 text-xl font-bold text-slate-900">Meaza Tadesse</div>
              </div>
            </div>
            <div>
              <Label htmlFor="inspection-type" className="text-sm font-medium text-slate-600">
                Type of Inspection
              </Label>
              <Select value={inspectionType} onValueChange={setInspectionType}>
                <SelectTrigger id="inspection-type" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="move-in">Move-In Inspection</SelectItem>
                  <SelectItem value="move-out">Move-Out Inspection</SelectItem>
                  <SelectItem value="routine">Routine Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Checklist */}
      <div className="flex flex-col gap-4">
        {areas.map((area) => (
          <Card key={area.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{area.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Status Pills */}
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-600">
                  Condition
                </Label>
                <RadioGroup
                  value={area.status}
                  onValueChange={(value) => updateArea(area.id, "status", value as ConditionStatus)}
                  className="flex gap-2"
                >
                  <div className="flex-1">
                    <RadioGroupItem
                      value="excellent"
                      id={`${area.id}-excellent`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${area.id}-excellent`}
                      className={`flex cursor-pointer items-center justify-center rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                        area.status === "excellent" ? getStatusColor("excellent") : "border-slate-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      Excellent
                    </Label>
                  </div>
                  <div className="flex-1">
                    <RadioGroupItem
                      value="fair"
                      id={`${area.id}-fair`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${area.id}-fair`}
                      className={`flex cursor-pointer items-center justify-center rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                        area.status === "fair" ? getStatusColor("fair") : "border-slate-200 hover:border-yellow-300 hover:bg-yellow-50"
                      }`}
                    >
                      Fair
                    </Label>
                  </div>
                  <div className="flex-1">
                    <RadioGroupItem
                      value="damaged"
                      id={`${area.id}-damaged`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`${area.id}-damaged`}
                      className={`flex cursor-pointer items-center justify-center rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                        area.status === "damaged" ? getStatusColor("damaged") : "border-slate-200 hover:border-red-300 hover:bg-red-50"
                      }`}
                    >
                      Damaged
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Notes Input */}
              <div>
                <Label htmlFor={`${area.id}-notes`} className="text-sm font-medium text-slate-600">
                  Notes/Comments
                </Label>
                <Textarea
                  id={`${area.id}-notes`}
                  placeholder="Add any observations or notes..."
                  value={area.notes}
                  onChange={(e) => updateArea(area.id, "notes", e.target.value)}
                  className="mt-1 min-h-[60px]"
                />
              </div>

              {/* Photo Upload Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => updateArea(area.id, "hasPhoto", true)}
                className={`flex h-20 w-full items-center justify-center gap-2 border-2 border-dashed ${
                  area.hasPhoto ? "border-green-400 bg-green-50 text-green-700" : "border-slate-300"
                }`}
              >
                {area.hasPhoto ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Photo Added</span>
                  </>
                ) : (
                  <>
                    <Camera className="h-5 w-5" />
                    <span>Add Photo</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Signature Block */}
      <Card>
        <CardHeader>
          <CardTitle>Signatures</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Manager Signature */}
          <div>
            <Label className="text-sm font-medium text-slate-600">
              Property Manager Signature
            </Label>
            <div
              onClick={() => setManagerSigned(true)}
              className={`mt-2 flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                managerSigned
                  ? "border-green-400 bg-green-50"
                  : "border-slate-300 hover:border-slate-400"
              }`}
            >
              {managerSigned ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="font-signature text-2xl text-slate-700">Alemu Getachew</span>
                  <span className="text-xs text-green-600">Signed on {new Date().toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-sm text-slate-400">Tap to sign</span>
              )}
            </div>
          </div>

          {/* Tenant Signature */}
          <div>
            <Label className="text-sm font-medium text-slate-600">
              Tenant Signature
            </Label>
            <div
              onClick={() => setTenantSigned(true)}
              className={`mt-2 flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                tenantSigned
                  ? "border-green-400 bg-green-50"
                  : "border-slate-300 hover:border-slate-400"
              }`}
            >
              {tenantSigned ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="font-signature text-2xl text-slate-700">Meaza Tadesse</span>
                  <span className="text-xs text-green-600">Signed on {new Date().toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-sm text-slate-400">Tap to sign</span>
              )}
            </div>
          </div>

          {/* Save Button */}
          <Button className="h-14 w-full bg-orange-500 text-lg font-semibold hover:bg-orange-600">
            <Save className="mr-2 h-5 w-5" />
            Save Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
