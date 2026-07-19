"use client"

import { useEffect, useState } from "react"
import { Plus, Camera, Check, AlertTriangle, Package, Store, Eye, EyeOff, Zap, Droplet, Wind } from "lucide-react"
import { LeaseAgreementCard } from "@/components/lease-agreement-card"
import { LeasePill, PaymentPill } from "@/components/status-pills"
import { getPropertyById, getPropertyAssets, createPropertyAsset } from "@/lib/db"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
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
import { Switch } from "@/components/ui/switch"

type Property = {
  id: string
  room_number: string
  floor: string | number
  square_footage: string
  rent_number: string
  occupancy: string
  lease_start_date: string
  lease_expiration_date: string
  last_pay_day: string
  lease: string
  payment: string
  outstanding_balance: string
  lease_duration: string
  rent_amount: string
  outstanding_balance_secondary: string
  company_name: string
  tenant_id?: string
  lease_agreement_file?: string
}

type PropertyAsset = {
  id: string
  property_id: string
  name: string
  serial_number: string
  condition: "New" | "Good" | "Damaged"
  photo_url?: string
  last_inspected: string
}

type PropertyDetailViewProps = {
  propertyId: string
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

export function PropertyDetailView({ propertyId, onTerminate, onExtend }: PropertyDetailViewProps) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false)
  const [assetsList, setAssetsList] = useState<PropertyAsset[]>([])
  const [newAssetName, setNewAssetName] = useState("")
  const [newAssetSerial, setNewAssetSerial] = useState("")
  const [newAssetCondition, setNewAssetCondition] = useState<"New" | "Good" | "Damaged">("New")
  const [listedOnMarketplace, setListedOnMarketplace] = useState(false)
  const [linkedUtilities, setLinkedUtilities] = useState<{electricity: boolean, water: boolean, gas: boolean}>({
    electricity: false,
    water: false,
    gas: false,
  })

  // Load property and assets on mount
  useEffect(() => {
    if (!propertyId) return

    const loadData = async () => {
      try {
        setLoading(true)
        const [propertyData, assets] = await Promise.all([
          getPropertyById(propertyId),
          getPropertyAssets(propertyId),
        ])
        setProperty(propertyData)
        setAssetsList(assets || [])
      } catch (error) {
        console.error("Error loading property:", error)
        toast.error("Error loading property details")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [propertyId])

  const handleMarketplaceToggle = (checked: boolean) => {
    setListedOnMarketplace(checked)
    if (checked) {
      toast.success("Listed on Marketplace", {
        description: `Room ${property.room} is now visible to the public on the Marketplace.`,
      })
    } else {
      toast.info("Removed from Marketplace", {
        description: `Room ${property.room} is no longer visible on the Marketplace.`,
      })
    }
  }

  const handleAddAsset = async () => {
    if (newAssetName && newAssetSerial && property) {
      try {
        const result = await createPropertyAsset(property.id, {
          name: newAssetName,
          serial_number: newAssetSerial,
          condition: newAssetCondition,
          last_inspected: new Date().toISOString(),
        })
        
        if (result) {
          setAssetsList([...assetsList, result[0]])
          toast.success("Asset Added", {
            description: `${newAssetName} has been added to the inventory.`,
          })
          setNewAssetName("")
          setNewAssetSerial("")
          setNewAssetCondition("New")
          setAddAssetModalOpen(false)
        }
      } catch (error) {
        toast.error("Error adding asset")
        console.error("Error:", error)
      }
    }
  }

  if (loading) {
    return <div className="text-center p-8">Loading property details...</div>
  }

  if (!property) {
    return <div className="text-center p-8 text-red-600">Property not found</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-slate-900">Property Information</h2>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4 bg-slate-100">
          <TabsTrigger value="details" className="px-6">Property Details</TabsTrigger>
          <TabsTrigger value="utilities" className="px-6">
            <Zap className="mr-2 h-4 w-4" />
            Utilities
          </TabsTrigger>
          <TabsTrigger value="assets" className="px-6">
            <Package className="mr-2 h-4 w-4" />
            Assets ({assetsList.length})
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="px-6">
            <Store className="mr-2 h-4 w-4" />
            Marketplace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="flex flex-col gap-10">
          {/* Top stat row */}
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        <StatColumn label="Room Number" value={property.room_number} />
        <StatColumn label="Floor" value={property.floor} />
        <StatColumn label="Size" value={property.square_footage} />
        <StatColumn label="Rent Number" value={property.rent_number} />
        <StatColumn label="Status" value={property.occupancy} />
      </div>

      <hr className="border-slate-200" />

      {/* Lease dates + amounts */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-4">
            <span className="text-sm text-slate-500">Lease Start Date:</span>
            <span className="text-sm font-semibold text-slate-900">{property.lease_start_date}</span>
            <span className="text-sm text-slate-500">Lease Expiration Date:</span>
            <span className="text-sm font-semibold text-slate-900">{property.lease_expiration_date}</span>
            <span className="text-sm text-slate-500">Last Pay Day</span>
            <span className="text-sm font-semibold text-slate-900">{property.last_pay_day}</span>
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
          <ValueChip>{property.outstanding_balance}</ValueChip>
          <span className="text-sm text-slate-500">Lease Duration</span>
          <ValueChip>{property.lease_duration}</ValueChip>
          <span className="text-sm text-slate-500">Rent Amount</span>
          <ValueChip>{property.rent_amount}</ValueChip>
          <span className="text-sm text-slate-500">Outstanding balance</span>
          <ValueChip>{property.outstanding_balance_secondary}</ValueChip>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Company + Tenant + Lease Agreement */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-500">Company Name</span>
              <span className="text-base font-semibold text-slate-900">{property.company_name}</span>
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
            <LeaseAgreementCard filename={property.lease_agreement_file} />
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

        {/* Utilities Tab */}
        <TabsContent value="utilities">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Utility Meters & Tracking</h3>
              <p className="text-sm text-slate-500 mt-1">Link utility accounts and enable automatic meter tracking</p>
            </div>

            {/* Utilities Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Electricity */}
              <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-100 p-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Electricity</h4>
                      <p className="text-xs text-slate-500">Power meter tracking</p>
                    </div>
                  </div>
                  <Switch
                    checked={linkedUtilities.electricity}
                    onCheckedChange={(checked) => setLinkedUtilities({...linkedUtilities, electricity: checked})}
                  />
                </div>
                {linkedUtilities.electricity && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-600 mb-2">Meter Number</p>
                    <Input placeholder="ETH-ABC-123456" defaultValue="ETH-ABC-123456" className="text-sm" />
                  </div>
                )}
              </div>

              {/* Water */}
              <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Droplet className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Water</h4>
                      <p className="text-xs text-slate-500">Water meter tracking</p>
                    </div>
                  </div>
                  <Switch
                    checked={linkedUtilities.water}
                    onCheckedChange={(checked) => setLinkedUtilities({...linkedUtilities, water: checked})}
                  />
                </div>
                {linkedUtilities.water && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-600 mb-2">Meter Number</p>
                    <Input placeholder="WAT-DEF-789012" defaultValue="WAT-DEF-789012" className="text-sm" />
                  </div>
                )}
              </div>

              {/* Gas */}
              <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <Wind className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Gas</h4>
                      <p className="text-xs text-slate-500">Gas meter tracking</p>
                    </div>
                  </div>
                  <Switch
                    checked={linkedUtilities.gas}
                    onCheckedChange={(checked) => setLinkedUtilities({...linkedUtilities, gas: checked})}
                  />
                </div>
                {linkedUtilities.gas && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-600 mb-2">Meter Number</p>
                    <Input placeholder="GAS-GHI-345678" defaultValue="GAS-GHI-345678" className="text-sm" />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                When utilities are linked, tenants and managers will see meter readings and usage charges in the billing portal.
              </p>
            </div>
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
                          {asset.serial_number}
                        </TableCell>
                        <TableCell>
                          <ConditionBadge condition={asset.condition} />
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {new Date(asset.last_inspected).toLocaleDateString()}
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

        {/* Marketplace Tab */}
        <TabsContent value="marketplace">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Marketplace Visibility</h3>
              <p className="text-sm text-slate-500">
                Control whether this property is visible to the public on the Workspace Marketplace
              </p>
            </div>

            {/* Main Toggle Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    listedOnMarketplace ? "bg-green-100" : "bg-slate-100"
                  }`}>
                    {listedOnMarketplace ? (
                      <Eye className="h-6 w-6 text-green-600" />
                    ) : (
                      <EyeOff className="h-6 w-6 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">List on Marketplace</h4>
                    <p className="text-sm text-slate-500">
                      {listedOnMarketplace
                        ? "This property is visible to prospective tenants"
                        : "This property is hidden from the public marketplace"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={listedOnMarketplace}
                  onCheckedChange={handleMarketplaceToggle}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>
            </div>

            {/* Listing Preview */}
            {listedOnMarketplace && (
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Listing Preview</h4>
                <div className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-200 flex items-center justify-center">
                    <Store className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-slate-900">Room {property.room}</h5>
                    <p className="text-sm text-slate-500">{property.floor} Floor • {property.squareFootage}</p>
                    <p className="mt-2 font-semibold text-orange-600">ETB {property.rentNumber}/month</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Check className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                      <span className="text-xs text-slate-500">Visible on marketplace</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <Store className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">About the Marketplace</p>
                <p className="text-sm text-blue-700 mt-1">
                  When listed, prospective tenants can view this property on the public Marketplace, 
                  see details, and send pre-occupy requests directly to you.
                </p>
              </div>
            </div>

            {/* Warning for Occupied Properties */}
            {property.occupancy === "Occupied" && (
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Property Currently Occupied</p>
                  <p className="text-sm text-amber-700 mt-1">
                    This property has an active tenant. Listing it on the marketplace will show it as 
                    &quot;Available Soon&quot; rather than &quot;Available Now&quot;.
                  </p>
                </div>
              </div>
            )}
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
