"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Receipt, Phone, FileText, Check } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { brokers, commissionRecords, type CommissionRecord } from "@/lib/data"

function CommissionStatusBadge({ status }: { status: "Pending" | "Paid" }) {
  const variants = {
    Pending: "bg-amber-100 text-amber-700",
    Paid: "bg-emerald-100 text-emerald-700",
  }

  return (
    <Badge className={`${variants[status]} border-none font-medium`}>
      {status}
    </Badge>
  )
}

export function BrokersView() {
  const [addBrokerModalOpen, setAddBrokerModalOpen] = useState(false)
  const [paymentReceiptModalOpen, setPaymentReceiptModalOpen] = useState(false)
  const [selectedCommission, setSelectedCommission] = useState<CommissionRecord | null>(null)
  const [newBrokerName, setNewBrokerName] = useState("")
  const [newBrokerPhone, setNewBrokerPhone] = useState("")
  const [newBrokerLicense, setNewBrokerLicense] = useState("")
  const [commissionsList, setCommissionsList] = useState(commissionRecords)

  const handleAddBroker = () => {
    if (newBrokerName && newBrokerPhone) {
      toast.success("Broker Added", {
        description: `${newBrokerName} has been added to the directory.`,
      })
      setNewBrokerName("")
      setNewBrokerPhone("")
      setNewBrokerLicense("")
      setAddBrokerModalOpen(false)
    }
  }

  const handleMarkAsPaid = (commission: CommissionRecord) => {
    setSelectedCommission(commission)
    setPaymentReceiptModalOpen(true)
  }

  const handleConfirmPayment = () => {
    if (selectedCommission) {
      setCommissionsList(
        commissionsList.map((c) =>
          c.id === selectedCommission.id
            ? { ...c, status: "Paid" as const, paidDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
            : c
        )
      )
      toast.success("Commission Paid", {
        description: `Payment receipt generated for ${selectedCommission.brokerName}.`,
      })
      setPaymentReceiptModalOpen(false)
      setSelectedCommission(null)
    }
  }

  const pendingCommissions = commissionsList.filter((c) => c.status === "Pending")
  const paidCommissions = commissionsList.filter((c) => c.status === "Paid")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Brokers & Commissions
          </h1>
          <p className="text-sm text-slate-500">
            Manage broker referrals and commission payments
          </p>
        </div>
        <Button
          className="gap-2 bg-orange-600 hover:bg-orange-700"
          onClick={() => setAddBrokerModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Broker
        </Button>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="mb-4 bg-slate-100">
          <TabsTrigger value="directory" className="px-6">
            Broker Directory
          </TabsTrigger>
          <TabsTrigger value="commissions" className="px-6">
            Commission Ledger
          </TabsTrigger>
        </TabsList>

        {/* Broker Directory */}
        <TabsContent value="directory">
          <div className="rounded-lg border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Phone</TableHead>
                  <TableHead className="font-semibold text-slate-700">License No.</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total Referrals</TableHead>
                  <TableHead className="font-semibold text-slate-700">Unpaid Commissions</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brokers.map((broker) => (
                  <TableRow key={broker.id}>
                    <TableCell className="font-medium text-slate-900">
                      {broker.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        {broker.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {broker.licenseNo}
                    </TableCell>
                    <TableCell className="text-slate-900 font-medium">
                      {broker.totalReferrals}
                    </TableCell>
                    <TableCell>
                      <span className={broker.unpaidCommissions === "ETB 0" ? "text-slate-400" : "font-medium text-amber-600"}>
                        {broker.unpaidCommissions}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Referrals</DropdownMenuItem>
                          <DropdownMenuItem>Edit Broker</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Commission Ledger */}
        <TabsContent value="commissions">
          <div className="flex flex-col gap-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                    <Receipt className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Pending Commissions</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {pendingCommissions.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <Check className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Paid This Month</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {paidCommissions.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                    <FileText className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Outstanding</p>
                    <p className="text-2xl font-bold text-amber-600">
                      ETB 60,000
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Commission Table */}
            <div className="rounded-lg border border-slate-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Lease</TableHead>
                    <TableHead className="font-semibold text-slate-700">Broker</TableHead>
                    <TableHead className="font-semibold text-slate-700">Tenant</TableHead>
                    <TableHead className="font-semibold text-slate-700">Commission Due</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date Earned</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionsList.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium text-slate-900">
                        Room {commission.roomNo}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {commission.brokerName}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {commission.tenantName}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {commission.commissionAmount}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {commission.dateEarned}
                      </TableCell>
                      <TableCell>
                        <CommissionStatusBadge status={commission.status} />
                      </TableCell>
                      <TableCell>
                        {commission.status === "Pending" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                            onClick={() => handleMarkAsPaid(commission)}
                          >
                            Mark as Paid
                          </Button>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Paid: {commission.paidDate}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Broker Modal */}
      <Dialog open={addBrokerModalOpen} onOpenChange={setAddBrokerModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Broker</DialogTitle>
            <DialogDescription>
              Add a new broker to your referral network.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="broker-name">Full Name</Label>
              <Input
                id="broker-name"
                placeholder="Enter broker name"
                value={newBrokerName}
                onChange={(e) => setNewBrokerName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="broker-phone">Phone Number</Label>
              <Input
                id="broker-phone"
                placeholder="+251 9XX XX XX XX"
                value={newBrokerPhone}
                onChange={(e) => setNewBrokerPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="broker-license">License Number (Optional)</Label>
              <Input
                id="broker-license"
                placeholder="BRK-2024-XXX"
                value={newBrokerLicense}
                onChange={(e) => setNewBrokerLicense(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddBrokerModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddBroker}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Add Broker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Receipt Modal */}
      <Dialog open={paymentReceiptModalOpen} onOpenChange={setPaymentReceiptModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Commission Payment Receipt</DialogTitle>
            <DialogDescription>
              Confirm payment to generate a receipt.
            </DialogDescription>
          </DialogHeader>
          {selectedCommission && (
            <div className="flex flex-col gap-4 py-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Broker</p>
                    <p className="font-medium text-slate-900">{selectedCommission.brokerName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Lease</p>
                    <p className="font-medium text-slate-900">Room {selectedCommission.roomNo}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Tenant</p>
                    <p className="font-medium text-slate-900">{selectedCommission.tenantName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Date Earned</p>
                    <p className="font-medium text-slate-900">{selectedCommission.dateEarned}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Commission Amount</span>
                    <span className="text-lg font-bold text-emerald-600">
                      {selectedCommission.commissionAmount}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500">
                A payment receipt will be generated and can be downloaded after confirmation.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentReceiptModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Confirm & Generate Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
