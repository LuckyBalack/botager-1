"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Ban, Upload, MoreHorizontal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

// Mock data for pending verifications
const pendingVerifications = [
  {
    id: "pending-001",
    buildingName: "New Tech Hub",
    ownerName: "Abebe Worku",
    submittedDate: "Apr 25, 2026",
    complianceScore: 80,
    missingDocs: "TIN",
  },
  {
    id: "pending-002",
    buildingName: "Innovation Center",
    ownerName: "Hiwot Tesfaye",
    submittedDate: "Apr 23, 2026",
    complianceScore: 65,
    missingDocs: "Trade License, Tax Clearance",
  },
  {
    id: "pending-003",
    buildingName: "Office Complex",
    ownerName: "Girma Assefa",
    submittedDate: "Apr 20, 2026",
    complianceScore: 90,
    missingDocs: "None",
  },
]

// Mock data for expiring licenses
const expiringLicenses = [
  {
    id: "exp-001",
    buildingName: "Addis Tower",
    ownerName: "Sara Mekuria",
    documentType: "Trade License",
    expirationDate: "May 5, 2026",
    daysUntilExpiry: 5,
  },
  {
    id: "exp-002",
    buildingName: "Business Hub",
    ownerName: "Yohannes Tadesse",
    documentType: "Property Deed",
    expirationDate: "May 12, 2026",
    daysUntilExpiry: 12,
  },
  {
    id: "exp-003",
    buildingName: "Summit Office Park",
    ownerName: "Almaz Getahun",
    documentType: "Building Permit",
    expirationDate: "June 8, 2026",
    daysUntilExpiry: 39,
  },
]

// Mock data for blacklisted owners
const blacklistedOwners = [
  {
    id: "ban-001",
    ownerName: "Abebe Kebede",
    phone: "+251 911 234 567",
    reasonForBan: "Fraudulent Listings",
    dateBanned: "Mar 10, 2026",
  },
  {
    id: "ban-002",
    ownerName: "Tadelle Assefa",
    phone: "+251 922 345 678",
    reasonForBan: "Unpaid Platform Fees",
    dateBanned: "Feb 28, 2026",
  },
  {
    id: "ban-003",
    ownerName: "Lemma Getnet",
    phone: "+251 933 456 789",
    reasonForBan: "Harassment of Tenants",
    dateBanned: "Jan 15, 2026",
  },
]

function ComplianceScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "bg-emerald-100 text-emerald-700" : score >= 70 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
  return (
    <Badge className={`${color} border-none font-semibold`}>
      {score}% - {score >= 85 ? "Good" : score >= 70 ? "Fair" : "Poor"}
    </Badge>
  )
}

function ExpirationBadge({ daysUntilExpiry }: { daysUntilExpiry: number }) {
  const isUrgent = daysUntilExpiry <= 30
  return (
    <Badge className={isUrgent ? "bg-red-100 text-red-700 border-none font-semibold" : "bg-slate-100 text-slate-700 border-none"}>
      {daysUntilExpiry} days
    </Badge>
  )
}

export function AdvancedModerationView() {
  const [selectedPending, setSelectedPending] = useState<string | null>(null)

  const handleAction = (action: string, id: string) => {
    if (action === "request-docs") {
      toast.success("Document request sent to owner")
    } else if (action === "send-warning") {
      toast.success("Legal warning sent")
    } else if (action === "upload-license") {
      toast.success("Upload dialog opened")
    } else if (action === "permanent-ban") {
      toast.error("Owner permanently banned")
    } else if (action === "reinstate") {
      toast.success("Owner account reinstated")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-900">Advanced Moderation & Compliance</h1>
        <p className="text-slate-600">Monitor workspace verifications, expiring documents, and banned accounts</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Pending Verification
          </TabsTrigger>
          <TabsTrigger value="expiring" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Expiring Licenses
          </TabsTrigger>
          <TabsTrigger value="blacklist" className="flex items-center gap-2">
            <Ban className="h-4 w-4" />
            Blacklist
          </TabsTrigger>
        </TabsList>

        {/* Pending Verification Tab */}
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Workspace Verifications</CardTitle>
              <CardDescription>Review and approve new workspace submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Building Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Owner Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Submitted Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Compliance Score</TableHead>
                    <TableHead className="font-semibold text-slate-700">Missing Documents</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVerifications.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{item.buildingName}</TableCell>
                      <TableCell className="text-slate-700">{item.ownerName}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{item.submittedDate}</TableCell>
                      <TableCell>
                        <ComplianceScoreBadge score={item.complianceScore} />
                      </TableCell>
                      <TableCell>
                        {item.missingDocs === "None" ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-none">All Complete</Badge>
                        ) : (
                          <span className="text-sm text-slate-600">{item.missingDocs}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("request-docs", item.id)}
                          className="text-xs"
                        >
                          Request Missing Docs
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expiring Licenses Tab */}
        <TabsContent value="expiring" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Expiring Legal Documents</CardTitle>
              <CardDescription>Buildings with documents expiring within 90 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Building Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Owner Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Document Type</TableHead>
                    <TableHead className="font-semibold text-slate-700">Expiration Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Days Remaining</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringLicenses.map((item) => (
                    <TableRow
                      key={item.id}
                      className={item.daysUntilExpiry <= 30 ? "bg-red-50 hover:bg-red-100" : "hover:bg-slate-50"}
                    >
                      <TableCell className="font-medium text-slate-900">{item.buildingName}</TableCell>
                      <TableCell className="text-slate-700">{item.ownerName}</TableCell>
                      <TableCell className="text-slate-600">{item.documentType}</TableCell>
                      <TableCell className={item.daysUntilExpiry <= 30 ? "font-semibold text-red-700" : "text-slate-700"}>
                        {item.expirationDate}
                      </TableCell>
                      <TableCell>
                        <ExpirationBadge daysUntilExpiry={item.daysUntilExpiry} />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant={item.daysUntilExpiry <= 30 ? "default" : "outline"}
                          size="sm"
                          className={item.daysUntilExpiry <= 30 ? "bg-orange-600 hover:bg-orange-700" : ""}
                          onClick={() => handleAction("send-warning", item.id)}
                        >
                          Send Legal Warning
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("upload-license", item.id)}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload Renewed
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blacklist Tab */}
        <TabsContent value="blacklist" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Blacklisted Owners</CardTitle>
              <CardDescription>Suspended and banned accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Owner Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Phone</TableHead>
                    <TableHead className="font-semibold text-slate-700">Reason for Ban</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date Banned</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blacklistedOwners.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{item.ownerName}</TableCell>
                      <TableCell className="text-slate-600 font-mono text-sm">{item.phone}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-700 border-none">{item.reasonForBan}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{item.dateBanned}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction("permanent-ban", item.id)}
                        >
                          Permanent Ban
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("reinstate", item.id)}
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          Reinstate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
