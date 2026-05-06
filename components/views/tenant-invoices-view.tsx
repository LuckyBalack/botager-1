"use client"

import { useState } from "react"
import {
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  FileText,
  ChevronRight,
  Wallet,
  Building2,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoiceAgingAnalysis } from "@/components/invoice-aging-analysis"
import { PaymentReceipts } from "@/components/payment-receipts"
import { InvoiceLateFees } from "@/components/invoice-late-fees"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Mock data for tenant invoices
const tenantInvoices = [
  {
    id: "INV-2024-001",
    month: "May 2024",
    dueDate: "May 5, 2024",
    amount: 15000,
    status: "pending" as const,
    items: [
      { description: "Monthly Rent - Room 310", amount: 13000 },
      { description: "Common Area Maintenance", amount: 1500 },
      { description: "Water & Utilities", amount: 500 },
    ],
  },
  {
    id: "INV-2024-002",
    month: "April 2024",
    dueDate: "Apr 5, 2024",
    amount: 15000,
    status: "paid" as const,
    paidDate: "Apr 3, 2024",
    paymentMethod: "Chapa",
    items: [
      { description: "Monthly Rent - Room 310", amount: 13000 },
      { description: "Common Area Maintenance", amount: 1500 },
      { description: "Water & Utilities", amount: 500 },
    ],
  },
  {
    id: "INV-2024-003",
    month: "March 2024",
    dueDate: "Mar 5, 2024",
    amount: 15000,
    status: "paid" as const,
    paidDate: "Mar 4, 2024",
    paymentMethod: "Telebirr",
    items: [
      { description: "Monthly Rent - Room 310", amount: 13000 },
      { description: "Common Area Maintenance", amount: 1500 },
      { description: "Water & Utilities", amount: 500 },
    ],
  },
  {
    id: "INV-2024-004",
    month: "February 2024",
    dueDate: "Feb 5, 2024",
    amount: 15000,
    status: "paid" as const,
    paidDate: "Feb 5, 2024",
    paymentMethod: "Bank Transfer",
    items: [
      { description: "Monthly Rent - Room 310", amount: 13000 },
      { description: "Common Area Maintenance", amount: 1500 },
      { description: "Water & Utilities", amount: 500 },
    ],
  },
]

const paymentMethods = [
  { id: "chapa", name: "Chapa", icon: Wallet, description: "Pay instantly with Chapa" },
  { id: "telebirr", name: "Telebirr", icon: CreditCard, description: "Pay with Telebirr" },
  { id: "cbe-birr", name: "CBE Birr", icon: Building2, description: "Pay with CBE Birr" },
]

type Invoice = typeof tenantInvoices[0]

function StatusBadge({ status }: { status: "pending" | "paid" | "overdue" }) {
  const config = {
    pending: { label: "Pending", className: "bg-amber-100 text-amber-700", icon: Clock },
    paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    overdue: { label: "Overdue", className: "bg-red-100 text-red-700", icon: AlertCircle },
  }
  const { label, className, icon: Icon } = config[status]
  return (
    <Badge className={cn("border-none font-medium gap-1", className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}

export function TenantInvoicesView() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("chapa")
  const [isProcessing, setIsProcessing] = useState(false)

  const pendingInvoices = tenantInvoices.filter((i) => i.status === "pending")
  const paidInvoices = tenantInvoices.filter((i) => i.status === "paid")

  const totalDue = pendingInvoices.reduce((sum, i) => sum + i.amount, 0)

  const handlePayNow = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setPaymentModalOpen(true)
  }

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setDetailModalOpen(true)
  }

  const handleConfirmPayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentModalOpen(false)
      toast.success("Payment Successful!", {
        description: `Your payment of ETB ${selectedInvoice?.amount.toLocaleString()} has been processed via ${paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}.`,
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Invoices & Payments</h1>
        <p className="mt-1 text-slate-500">View and pay your invoices</p>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="invoices" className="px-6">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="aging" className="px-6">
            Aging Analysis
          </TabsTrigger>
          <TabsTrigger value="receipts" className="px-6">
            Receipts
          </TabsTrigger>
          <TabsTrigger value="lateFees" className="px-6">
            Late Fees Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          {/* Summary Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Due</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  ETB {totalDue.toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Receipt className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Invoices</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{pendingInvoices.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Paid This Year</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{paidInvoices.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
          </div>

          {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Pending Invoices</h2>
          <div className="flex flex-col gap-4">
            {pendingInvoices.map((invoice) => (
              <Card key={invoice.id} className="border-l-4 border-l-orange-500">
                <CardContent className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <FileText className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{invoice.month}</h3>
                        <StatusBadge status={invoice.status} />
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        Due: {invoice.dueDate} &bull; {invoice.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        ETB {invoice.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(invoice)}
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => handlePayNow(invoice)}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Payment History */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Payment History</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {paidInvoices.map((invoice) => (
                <button
                  key={invoice.id}
                  type="button"
                  onClick={() => handleViewDetails(invoice)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{invoice.month}</h3>
                      <p className="text-sm text-slate-500">
                        Paid {invoice.paidDate} via {invoice.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-slate-900">
                      ETB {invoice.amount.toLocaleString()}
                    </p>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
          </div>
        </TabsContent>

        <TabsContent value="aging">
          <InvoiceAgingAnalysis />
        </TabsContent>

        <TabsContent value="receipts">
          <PaymentReceipts />
        </TabsContent>

        <TabsContent value="lateFees">
          <InvoiceLateFees />
        </TabsContent>
      </Tabs>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Pay Invoice</DialogTitle>
            <DialogDescription>
              Choose a payment method to pay your {selectedInvoice?.month} invoice
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {/* Invoice Summary */}
            <div className="mb-6 rounded-lg bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Invoice</span>
                <span className="font-medium text-slate-900">{selectedInvoice?.id}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-slate-500">Amount Due</span>
                <span className="text-xl font-bold text-slate-900">
                  ETB {selectedInvoice?.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Payment Method</Label>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="space-y-3"
              >
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                        selectedPaymentMethod === method.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 hover:bg-slate-50"
                      )}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <Label htmlFor={method.id} className="cursor-pointer font-medium">
                          {method.name}
                        </Label>
                        <p className="text-sm text-slate-500">{method.description}</p>
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleConfirmPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay ETB ${selectedInvoice?.amount.toLocaleString()}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.id} - {selectedInvoice?.month}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Status and Date */}
            <div className="mb-6 flex items-center justify-between">
              <StatusBadge status={selectedInvoice?.status || "pending"} />
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                Due: {selectedInvoice?.dueDate}
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              {selectedInvoice?.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-600">{item.description}</span>
                  <span className="font-medium text-slate-900">
                    ETB {item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">
                    ETB {selectedInvoice?.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info (for paid invoices) */}
            {selectedInvoice?.status === "paid" && (
              <div className="mt-6 rounded-lg bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">Payment Received</span>
                </div>
                <p className="mt-2 text-sm text-emerald-600">
                  Paid on {selectedInvoice.paidDate} via {selectedInvoice.paymentMethod}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            {selectedInvoice?.status === "pending" && (
              <Button
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  setDetailModalOpen(false)
                  handlePayNow(selectedInvoice)
                }}
              >
                Pay Now
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
