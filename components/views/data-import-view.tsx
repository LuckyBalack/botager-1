"use client"

import { useState } from "react"
import { Upload, Download, FileSpreadsheet, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const steps = [
  { id: 1, label: "Upload CSV" },
  { id: 2, label: "Map Columns" },
  { id: 3, label: "Review" },
  { id: 4, label: "Complete" },
]

const sampleMappings = [
  { csvColumn: "Client Name", systemField: "tenant_full_name" },
  { csvColumn: "Email Address", systemField: "tenant_email" },
  { csvColumn: "Phone", systemField: "tenant_phone" },
  { csvColumn: "Unit #", systemField: "property_unit" },
  { csvColumn: "Monthly Rent", systemField: "lease_rent_amount" },
  { csvColumn: "Move In Date", systemField: "lease_start_date" },
]

const systemFields = [
  { value: "tenant_full_name", label: "Firstname & Lastname" },
  { value: "tenant_email", label: "Email Address" },
  { value: "tenant_phone", label: "Phone Number" },
  { value: "tenant_company", label: "Company Name" },
  { value: "property_unit", label: "Unit/Room Number" },
  { value: "property_building", label: "Building Name" },
  { value: "lease_rent_amount", label: "Monthly Rent" },
  { value: "lease_start_date", label: "Lease Start Date" },
  { value: "lease_end_date", label: "Lease End Date" },
  { value: "lease_deposit", label: "Security Deposit" },
]

export function DataImportView() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [mappings, setMappings] = useState(sampleMappings)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Simulate file upload
    setUploadedFile("tenants_data_export.csv")
    setCurrentStep(2)
  }

  const handleMappingChange = (index: number, value: string) => {
    const newMappings = [...mappings]
    newMappings[index].systemField = value
    setMappings(newMappings)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bulk Import Wizard</h1>
        <p className="mt-1 text-slate-500">
          Easily migrate your existing properties, tenants, and lease data.
        </p>
      </div>

      {/* Step Tracker */}
      <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  currentStep > step.id
                    ? "bg-green-500 text-white"
                    : currentStep === step.id
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.id ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="mx-6 h-5 w-5 text-slate-300" />
            )}
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex min-h-[240px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
              isDragging
                ? "border-orange-400 bg-orange-50"
                : uploadedFile
                  ? "border-green-400 bg-green-50"
                  : "border-slate-300 bg-slate-50"
            }`}
          >
            {uploadedFile ? (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  {uploadedFile}
                </p>
                <p className="mt-1 text-sm text-green-600">
                  File uploaded successfully
                </p>
              </>
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <Upload className="h-8 w-8 text-slate-400" />
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Drop your Excel or CSV file here
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  or click to browse from your computer
                </p>
              </>
            )}
          </div>

          {/* Template Downloads */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Tenant Template
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Properties Template
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Active Leases Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Column Mapping Preview */}
      {uploadedFile && (
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Column Mapping
            </h3>
            <p className="mb-6 text-sm text-slate-500">
              Match your CSV columns to the corresponding WRM system fields.
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Your CSV Column Header</TableHead>
                  <TableHead className="w-1/2">WRM System Field</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mappings.map((mapping, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-slate-400" />
                        {mapping.csvColumn}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={mapping.systemField}
                        onValueChange={(value) => handleMappingChange(index, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {systemFields.map((field) => (
                            <SelectItem key={field.value} value={field.value}>
                              {field.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setCurrentStep(3)}
              >
                Run Import
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
