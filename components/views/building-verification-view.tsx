"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, ArrowLeft, CheckCircle, AlertCircle, Clock, FileText, Download, Eye, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import type { BuildingVerification } from "@/lib/data"

type BuildingVerificationViewProps = {
  building: BuildingVerification
  onBack?: () => void
}

export function BuildingVerificationView({ building, onBack }: BuildingVerificationViewProps) {
  const [verificationStatus, setVerificationStatus] = useState(building.verificationStatus)
  const [isPublic, setIsPublic] = useState(building.isPublicOnMarketplace)
  const [documentPreviewOpen, setDocumentPreviewOpen] = useState(false)
  const [selectedDocName, setSelectedDocName] = useState<string | null>(null)

  const statusColors = {
    "Under Review": "bg-amber-100 text-amber-700",
    "Verified": "bg-emerald-100 text-emerald-700",
    "Rejected": "bg-red-100 text-red-700",
  }

  const docStatusIcons = {
    "Uploaded": <Clock className="h-5 w-5 text-amber-500" aria-hidden="true" />,
    "Verified": <CheckCircle className="h-5 w-5 text-emerald-500" aria-hidden="true" />,
    "Missing": <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      {onBack && (
        <div className="border-b border-border bg-card px-4 py-3 md:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Verification
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-10 lg:py-8">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{building.buildingName}</h1>
                <p className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {building.location}
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Owner:</span> {building.ownerName}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <a href={`tel:${building.ownerPhone}`} className="text-blue-600 hover:underline">
                      {building.ownerPhone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <a href={`mailto:${building.ownerEmail}`} className="text-blue-600 hover:underline">
                      {building.ownerEmail}
                    </a>
                  </p>
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Verification Status</p>
                  <div className="flex items-center gap-3">
                    <Badge className={`${statusColors[verificationStatus]} border-none`}>
                      {verificationStatus}
                    </Badge>
                    <select
                      value={verificationStatus}
                      onChange={(e) => setVerificationStatus(e.target.value as any)}
                      className="text-sm border border-slate-200 rounded-md px-2 py-1 bg-white"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Verified">Verified</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Platform Subscription</p>
                  <Badge className={`${
                    building.platformSubscriptionStatus === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : building.platformSubscriptionStatus === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                  } border-none`}>
                    {building.platformSubscriptionStatus}
                  </Badge>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Public on Marketplace</span>
                    <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isPublic ? "Building is visible to renters" : "Building is hidden from public view"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compliance Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {building.complianceDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">
                      {docStatusIcons[doc.status]}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{doc.name}</p>
                      {doc.uploadedDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploaded: {doc.uploadedDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.status === "Missing" && (
                      <Badge variant="outline" className="text-red-700 border-red-200">Missing</Badge>
                    )}
                    {doc.status === "Uploaded" && (
                      <Badge variant="outline" className="text-amber-700 border-amber-200">Pending Review</Badge>
                    )}
                    {doc.status === "Verified" && (
                      <Badge variant="outline" className="text-emerald-700 border-emerald-200">Verified</Badge>
                    )}

                    {doc.fileUrl && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedDocName(doc.name)
                            setDocumentPreviewOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Missing Documents Alert */}
            {building.complianceDocuments.some(doc => doc.status === "Missing") && (
              <Alert className="mt-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
                <AlertDescription className="text-red-800">
                  {building.complianceDocuments.filter(doc => doc.status === "Missing").length} required document(s) are missing. Please contact the owner to upload them.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Message Owner for Missing Docs
          </Button>
          {verificationStatus === "Verified" && building.platformSubscriptionStatus === "Pending" && (
            <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
              Activate Platform Subscription
            </Button>
          )}
          {verificationStatus === "Verified" && (
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              Make Public on Marketplace
            </Button>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      <Dialog open={documentPreviewOpen} onOpenChange={setDocumentPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedDocName}</DialogTitle>
            <DialogDescription>Document Preview</DialogDescription>
          </DialogHeader>
          <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" aria-hidden="true" />
              <p className="text-muted-foreground">PDF Preview</p>
              <p className="text-xs text-muted-foreground mt-2">Document preview would display here</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentPreviewOpen(false)}>
              Close
            </Button>
            <Button>Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
