"use client"

import { useState } from "react"
import { Plus, Star, Phone, User, Briefcase, Receipt, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Vendor {
  id: string
  businessName: string
  category: string
  contactName: string
  phone: string
  rating: number
  totalJobs: number
}

const vendors: Vendor[] = [
  {
    id: "1",
    businessName: "Addis Fast Plumbing",
    category: "Plumber",
    contactName: "Bekele Worku",
    phone: "+251 91 234 5678",
    rating: 4.5,
    totalJobs: 23,
  },
  {
    id: "2",
    businessName: "Ethio Electric Services",
    category: "Electrician",
    contactName: "Dawit Tesfaye",
    phone: "+251 92 345 6789",
    rating: 4.8,
    totalJobs: 45,
  },
  {
    id: "3",
    businessName: "CleanPro Janitorial",
    category: "Janitorial",
    contactName: "Sara Kebede",
    phone: "+251 93 456 7890",
    rating: 4.2,
    totalJobs: 67,
  },
  {
    id: "4",
    businessName: "Cool Air HVAC",
    category: "HVAC",
    contactName: "Yonas Alemu",
    phone: "+251 94 567 8901",
    rating: 4.6,
    totalJobs: 31,
  },
  {
    id: "5",
    businessName: "SecureLock Systems",
    category: "Security",
    contactName: "Mulu Abebe",
    phone: "+251 95 678 9012",
    rating: 4.9,
    totalJobs: 18,
  },
  {
    id: "6",
    businessName: "Green Gardens Landscaping",
    category: "Landscaping",
    contactName: "Helen Tadesse",
    phone: "+251 96 789 0123",
    rating: 4.3,
    totalJobs: 12,
  },
]

const categoryColors: Record<string, string> = {
  Plumber: "bg-blue-100 text-blue-700",
  Electrician: "bg-yellow-100 text-yellow-700",
  Janitorial: "bg-green-100 text-green-700",
  HVAC: "bg-purple-100 text-purple-700",
  Security: "bg-red-100 text-red-700",
  Landscaping: "bg-emerald-100 text-emerald-700",
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star - 0.5 <= rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-600">{rating}/5</span>
    </div>
  )
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {vendor.businessName}
            </h3>
            <Badge className={`mt-1 ${categoryColors[vendor.category] || "bg-slate-100 text-slate-700"}`}>
              {vendor.category}
            </Badge>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <Briefcase className="h-5 w-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="h-4 w-4" />
            <span>{vendor.contactName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4" />
            <span>{vendor.phone}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <StarRating rating={vendor.rating} />
          <span className="text-xs text-slate-500">{vendor.totalJobs} jobs completed</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 border-t border-slate-100 pt-4">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <ClipboardList className="h-4 w-4" />
            Assign to Work Order
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <Receipt className="h-4 w-4" />
            Pay Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function VendorsView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            External Vendors & Contacts
          </h1>
          <p className="mt-1 text-slate-500">
            Manage your trusted service providers and contractors
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
              <DialogDescription>
                Add a new service provider to your vendor directory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Enter business name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="janitorial">Janitorial</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="landscaping">Landscaping</SelectItem>
                    <SelectItem value="general">General Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Primary Contact Name</Label>
                <Input id="contact-name" placeholder="Enter contact name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+251 9X XXX XXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="vendor@example.com" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Add Vendor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vendor Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  )
}
