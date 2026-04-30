"use client"

import { Star, Phone, Mail, ArrowLeft, Clock, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { VendorDetail } from "@/lib/data"

type VendorDetailViewProps = {
  vendor: VendorDetail
  onBack?: () => void
}

export function VendorDetailView({ vendor, onBack }: VendorDetailViewProps) {
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
            Back to Vendors
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-10 lg:py-8">
        {/* Profile Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="h-32 w-32 rounded-full bg-slate-200 mb-4"></div>
            <h1 className="text-2xl font-bold text-foreground">{vendor.businessName}</h1>
            <Badge className="mt-2 bg-blue-100 text-blue-700 border-none">{vendor.category}</Badge>
            <p className="text-sm text-muted-foreground mt-2">{vendor.contactName}</p>
            
            {/* Rating */}
            <div className="flex flex-col items-center gap-2 py-4 border-t border-b border-border w-full mt-4">
              <span className="text-sm font-medium text-foreground">Verified Rating</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(vendor.verifiedRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{vendor.verifiedRating}/5.0</span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mt-4 w-full">
              <a
                href={`mailto:${vendor.email}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
              <a
                href={`tel:${vendor.phone}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">{vendor.totalJobsCompleted}</p>
                    <p className="text-xs text-muted-foreground mt-2">Jobs Completed</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center flex flex-col items-center">
                    <Clock className="h-6 w-6 text-blue-500 mb-2" aria-hidden="true" />
                    <p className="text-lg font-bold text-foreground">{vendor.avgResolutionTime}</p>
                    <p className="text-xs text-muted-foreground mt-1">Avg Resolution</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="h-6 w-6 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
                    <p className="text-sm font-semibold text-foreground">Highly Rated</p>
                    <p className="text-xs text-muted-foreground mt-1">4.9+ Stars</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Outstanding Balance Alert */}
            {vendor.outstandingBalance && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-orange-900">
                    <span className="font-semibold">Outstanding Balance:</span> {vendor.outstandingBalance}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                Hire for New Task
              </Button>
              <Button variant="outline" className="flex-1">
                Pay Outstanding Balance
              </Button>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Active Jobs ({vendor.activeJobs.length})
            </TabsTrigger>
            <TabsTrigger value="history">Work History</TabsTrigger>
          </TabsList>

          {/* Active Jobs */}
          <TabsContent value="active" className="space-y-4">
            {vendor.activeJobs.length > 0 ? (
              vendor.activeJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Ticket #</p>
                        <p className="font-semibold text-foreground">{job.ticketNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Room</p>
                        <p className="font-semibold text-foreground">{job.roomNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Job Title</p>
                        <p className="font-semibold text-foreground">{job.jobTitle}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-700 border-none">In Progress</Badge>
                      <Button size="sm" variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        View Live Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No active jobs at the moment
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Work History */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket #</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Completed Date</TableHead>
                        <TableHead>Photos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendor.jobHistory.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.ticketNumber}</TableCell>
                          <TableCell>{job.roomNumber}</TableCell>
                          <TableCell className="text-sm">{job.jobTitle}</TableCell>
                          <TableCell className="font-semibold text-blue-600">{job.jobCost}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{job.completedDate}</TableCell>
                          <TableCell>
                            {job.photos ? (
                              <Badge variant="outline">{job.photos.length} photos</Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
