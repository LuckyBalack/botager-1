"use client"

import { useState } from "react"
import { Plus, Camera, Check, AlertTriangle, Package } from "lucide-react"
import { LeaseAgreementCard } from "@/components/lease-agreement-card"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { getTenantById, getAssetsForProperty, type Property, type PropertyAsset, type AssetCondition } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { toast } from "sonner"

type PropertyDetailViewProps = {
  property: Property
  onTerminate?: () => void
  onExtend?: () => void
}

function ValueChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900",
        className,
      )}
    >
      {children}
    </span>
  )
}

function StatColumn({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}

function ConditionBadge({ condition }: { condition: AssetCondition }) {
  const variants: Record<AssetCondition, string> = {
    New: "bg-emerald-100 text-emerald-700",
    Good: "bg-blue-100 text-blue-700",
    Damaged: "bg-red-100 text-red-700",
  }

  return (
    <Badge className={`${variants[condition]} border-none font-medium`}>
      {condition}
    </Badge>
  )
}

export function PropertyDetailView({ property, onTerminate, onExtend }: PropertyDetailViewProps) {
  const tenant = property.tenantId ? getTenantById(property.tenantId) : undefined
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false)
  const [assetsList, setAssetsList] = useState<PropertyAsset[]>(getAssetsForProperty(property.id))
  const [newAssetName, setNewAssetName] = useState("")
  const [newAssetSerial, setNewAssetSerial] = useState("")
  const [newAssetCondition, setNewAssetCondition] = useState<AssetCondition>("New")

  const handleAddAsset = () => {
    if (newAssetName && newAssetSerial) {
      const newAsset: PropertyAsset = {
        id: `asset-${Date.now()}`,
        propertyId: property.id,
        name: newAssetName,
        serialNumber: newAssetSerial,
        condition: newAssetCondition,
        photoUrl: "/placeholder.svg",
        lastInspected: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }
      setAssetsList([...assetsList, newAsset])
      toast.success("Asset Added", {
        description: `${newAssetName} has been added to the inventory.`,
      })
      setNewAssetName("")
      setNewAssetSerial("")
      setNewAssetCondition("New")
      setAddAssetModalOpen(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-slate-900">Property Information</h2>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4 bg-slate-100">
          <TabsTrigger value="details" className="px-6">Property Details</TabsTrigger>
          <TabsTrigger value="assets" className="px-6">
            <Package className="mr-2 h-4 w-4" />
            Assets ({assetsList.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="flex flex-col gap-10">
          {/* Top stat row */}
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        <StatColumn label="Room Number" value={property.room} />
        <StatColumn label="Floor" value={property.floor} />
        <StatColumn label="Size" value={property.squareFootage} />
        <StatColumn label="Rent Number" value={property.rentNumber} />
        <StatColumn label="Status" value={property.occupancy} />
      </div>

      <hr className="border-slate-200" />

      {/* Lease dates + amounts */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-4">
            <span className="text-sm text-slate-500">Lease Start Date:</span>
            <span className="text-sm font-semibold text-slate-900">{property.leaseStartDate}</span>
            <span className="text-sm text-slate-500">Lease Expiration Date:</span>
            <span className="text-sm font-semibold text-slate-900">{property.leaseExpirationDate}</span>
            <span className="text-sm text-slate-500">Last Pay Day</span>
            <span className="text-sm font-semibold text-slate-900">{property.lastPayDay}</span>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">Lease Status</span>
              <LeasePill status={property.lease} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">Payment Status</span>
              <PaymentPill status={property.payment} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-4 self-start">
          <span className="text-sm text-slate-500">Outstanding balance</span>
          <ValueChip>{property.outstandingBalance}</ValueChip>
          <span className="text-sm text-slate-500">Lease Duration</span>
          <ValueChip>{property.leaseDuration}</ValueChip>
          <span className="text-sm text-slate-500">Rent Amount</span>
          <ValueChip>{property.rentAmount}</ValueChip>
          <span className="text-sm text-slate-500">Outstanding balance</span>
          <ValueChip>{property.outstandingBalanceSecondary}</ValueChip>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Company + Tenant + Lease Agreement */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-500">Company Name</span>
              <span className="text-base font-semibold text-slate-900">{property.companyName}</span>
            </div>
            {tenant && (
              <div className="flex items-center gap-3">
                <img
                  src={tenant.avatar || "/placeholder.svg"}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500">Tenant</span>
                  <span className="text-base font-semibold text-slate-900">
                    {tenant.firstName} {tenant.lastName}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold text-slate-900">Lease Agreement</span>
            <LeaseAgreementCard filename={property.leaseAgreementFile} />
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onTerminate}
              className="inline-flex items-center justify-center rounded-md border border-rose-500 bg-white px-6 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              Terminate lease
            </button>
            <button
              type="button"
              onClick={onExtend}
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
            >
              Extend Lease
            </button>
          </div>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets">
          <div className="flex flex-col gap-6">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Asset Inventory</h3>
                <p className="text-sm text-slate-500">
                  Track furniture, equipment, and fixtures for this unit
                </p>
              </div>
              <Button
                className="gap-2 bg-orange-600 hover:bg-orange-700"
                onClick={() => setAddAssetModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Asset
              </Button>
            </div>

            {/* Assets Table */}
            {assetsList.length > 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Photo</TableHead>
                      <TableHead className="font-semibold text-slate-700">Asset Name</TableHead>
                      <TableHead className="font-semibold text-slate-700">Serial Number</TableHead>
                      <TableHead className="font-semibold text-slate-700">Condition</TableHead>
                      <TableHead className="font-semibold text-slate-700">Last Inspected</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetsList.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                            <Camera className="h-5 w-5 text-slate-400" />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {asset.name}
                        </TableCell>
                        <TableCell className="text-slate-600 font-mono text-sm">
                          {asset.serialNumber}
                        </TableCell>
                        <TableCell>
                          <ConditionBadge condition={asset.condition} />
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {asset.lastInspected}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 py-12">
                <Package className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No Assets Recorded</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">
                  Add furniture, equipment, or fixtures to track for this unit.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setAddAssetModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Asset
                </Button>
              </div>
            )}

            {/* Inspection Link Note */}
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Move-Out Inspection Sync</p>
                <p className="text-sm text-amber-700 mt-1">
                  During a move-out inspection, the manager will be prompted to verify the condition of each asset listed above.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Asset Modal */}
      <Dialog open={addAssetModalOpen} onOpenChange={setAddAssetModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Add a new item to the property inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="asset-name">Asset Name</Label>
              <Input
                id="asset-name"
                placeholder="e.g., Split A/C Unit, Office Desk"
                value={newAssetName}
                onChange={(e) => setNewAssetName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="asset-serial">Serial Number</Label>
              <Input
                id="asset-serial"
                placeholder="e.g., AC-2024-001"
                value={newAssetSerial}
                onChange={(e) => setNewAssetSerial(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="asset-condition">Condition</Label>
              <Select value={newAssetCondition} onValueChange={(v) => setNewAssetCondition(v as AssetCondition)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Photo (Optional)</Label>
              <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 hover:border-slate-300 cursor-pointer">
                <Camera className="mr-2 h-4 w-4" />
                Click to upload photo
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAssetModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddAsset}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Add Asset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
