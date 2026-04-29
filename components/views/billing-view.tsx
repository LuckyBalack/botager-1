"use client"

import { useState } from "react"
import { MoreHorizontal, Plus } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import {
  invoices,
  receipts,
  creditRequests,
  type InvoiceStatus,
} from "@/lib/data"

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const variants: Record<InvoiceStatus, string> = {
    Paid: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Overdue: "bg-red-100 text-red-700",
  }

  return (
    <Badge className={`${variants[status]} border-none font-medium`}>
      {status}
    </Badge>
  )
}

function CreditStatusBadge({
  status,
}: {
  status: "Approved" | "Pending" | "Rejected"
}) {
  const variants = {
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Rejected: "bg-red-100 text-red-700",
  }

  return (
    <Badge className={`${variants[status]} border-none font-medium`}>
      {status}
    </Badge>
  )
}

const paymentMethods = [
  { id: "chapa", name: "Chapa", description: "Pay with Chapa" },
  { id: "telebirr", name: "Telebirr", description: "Pay with Telebirr" },
  { id: "cbe-birr", name: "CBE Birr", description: "Pay with CBE Birr" },
  {
    id: "cash-bank",
    name: "Cash/Bank Transfer",
    description: "Manual payment",
  },
]

export function BillingView() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("chapa")

  const handleRecordPayment = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId)
    if (invoice) {
      setSelectedInvoice(invoiceId)
      setPaymentAmount(invoice.amountDue.replace("ETB ", "").replace(",", ""))
      setPaymentModalOpen(true)
    }
  }

  const handleConfirmPayment = () => {
    setPaymentModalOpen(false)
    toast.success("Digital Receipt Sent", {
      description: `Payment of ETB ${paymentAmount} recorded successfully via ${paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}.`,
    })
    setSelectedInvoice(null)
    setPaymentAmount("")
    setSelectedPaymentMethod("chapa")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Financials & Billing
          </h1>
          <p className="text-sm text-slate-500">
            Manage invoices, receipts, and payment requests
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
        >
          <span>Generate Invoice</span>
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="mb-4 bg-slate-100">
          <TabsTrigger value="invoices" className="px-6">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="receipts" className="px-6">
            Receipts
          </TabsTrigger>
          <TabsTrigger value="credit" className="px-6">
            Credit/BNPL Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <div className="rounded-lg border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">
                    Invoice ID
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Tenant Name
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Room No
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Amount Due
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Due Date
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium text-slate-900">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.tenantName}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.roomNo}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {invoice.amountDue}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={invoice.status} />
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
                          <DropdownMenuItem
                            onClick={() => handleRecordPayment(invoice.id)}
                          >
                            Record Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Void Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="receipts">
          <div className="rounded-lg border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">
                    Receipt ID
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Tenant Name
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Room No
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Amount Paid
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Payment Date
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Payment Method
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium text-slate-900">
                      {receipt.id}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {receipt.tenantName}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {receipt.roomNo}
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600">
                      {receipt.amountPaid}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {receipt.paymentDate}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {receipt.paymentMethod}
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
                          <DropdownMenuItem>View Receipt</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Resend to Tenant</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="credit">
          <div className="rounded-lg border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">
                    Request ID
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Tenant Name
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Room No
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Requested Amount
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Request Date
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium text-slate-900">
                      {request.id}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {request.tenantName}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {request.roomNo}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {request.requestedAmount}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {request.requestDate}
                    </TableCell>
                    <TableCell>
                      <CreditStatusBadge status={request.status} />
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
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Record Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment for invoice {selectedInvoice}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="text"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Payment Method</Label>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="grid gap-3"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label
                      htmlFor={method.id}
                      className="flex cursor-pointer items-center gap-3 font-normal"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <span className="text-xs font-semibold text-slate-600">
                          {method.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                          {method.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {method.description}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={handleConfirmPayment}
              className="w-full rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Confirm Payment
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
