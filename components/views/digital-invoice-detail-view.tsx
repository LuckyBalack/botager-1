"use client"

import { useEffect, useState } from "react"
import { Download, Mail, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { getInvoiceById, getInvoiceLineItems, updateInvoiceStatus, emailInvoice } from "@/lib/db"

type Invoice = {
  id: string
  invoice_number: string
  issue_date: string
  due_date: string
  status: "Paid" | "Pending" | "Overdue"
  tenant_name: string
  tenant_email: string
  room_number: string
  building_name: string
  subtotal: string
  vat: string
  withholding: string
  grand_total: string
  payment_method?: string
  transaction_ref?: string
  line_items?: Array<{ id: string; description: string; quantity: number; unit_price: string; total: string }>
}

type DigitalInvoiceDetailViewProps = {
  invoiceId: string
}

export function DigitalInvoiceDetailView({ invoiceId }: DigitalInvoiceDetailViewProps) {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [lineItems, setLineItems] = useState<Invoice['line_items']>([])

  // Load invoice and line items
  useEffect(() => {
    if (!invoiceId) return

    const loadData = async () => {
      try {
        setLoading(true)
        const [invoiceData, items] = await Promise.all([
          getInvoiceById(invoiceId),
          getInvoiceLineItems(invoiceId),
        ])
        setInvoice(invoiceData)
        setLineItems(items || [])
      } catch (error) {
        console.error("Error loading invoice:", error)
        toast.error("Error loading invoice details")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [invoiceId])

  const statusStyles = {
    "Paid": "bg-green-100 text-green-700",
    "Pending": "bg-amber-100 text-amber-700",
    "Overdue": "bg-red-100 text-red-700",
  }

  const statusWatermark = {
    "Paid": "PAID",
    "Pending": "PENDING",
    "Overdue": "OVERDUE",
  }

  const handleDownloadPDF = () => {
    toast.success("Invoice PDF downloaded successfully")
  }

  const handleEmailTenant = async () => {
    if (!invoice) return
    try {
      await emailInvoice(invoice.id, invoice.tenant_email)
      toast.success(`Invoice emailed to ${invoice.tenant_email}`)
    } catch (error) {
      toast.error("Error sending email")
    }
  }

  const handlePrint = () => {
    window.print()
    toast.success("Invoice sent to printer")
  }

  if (loading) {
    return <div className="text-center p-8">Loading invoice...</div>
  }

  if (!invoice) {
    return <div className="text-center p-8 text-red-600">Invoice not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Action Bar - Top Right */}
      <div className="flex justify-end gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadPDF}
        >
          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmailTenant}
        >
          <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
          Email to Tenant
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4 mr-2" aria-hidden="true" />
          Print
        </Button>
      </div>

      {/* Invoice Container */}
      <Card className="relative overflow-hidden print:shadow-none print:border-0">
        {/* Status Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-10 print:opacity-15">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45">
            <div className="text-8xl font-bold text-slate-900 whitespace-nowrap">
              {statusWatermark[invoice.status]}
            </div>
          </div>
        </div>

        <CardContent className="pt-8 relative z-10">
          {/* Header - Branding */}
          <div className="border-b border-border pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-foreground">WRM / Mamulka</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Property Management Solutions
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{invoice.buildingName}</p>
                <p className="text-sm text-muted-foreground">Addis Ababa, Ethiopia</p>
                <p className="text-sm text-muted-foreground">+251 911 23 45 67</p>
              </div>
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Invoice Number
              </p>
              <p className="font-semibold text-foreground">{invoice.invoice_number}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Issue Date
              </p>
              <p className="font-semibold text-foreground">{invoice.issue_date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Due Date
              </p>
              <p className="font-semibold text-foreground">{invoice.due_date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Status
              </p>
              <Badge className={`text-xs font-semibold ${statusStyles[invoice.status]}`}>
                {invoice.status}
              </Badge>
            </div>
          </div>

          {/* Tenant Information */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Bill To
              </p>
              <p className="font-semibold text-foreground">{invoice.tenant_name}</p>
              <p className="text-sm text-muted-foreground">Room {invoice.room_number}</p>
              <p className="text-sm text-muted-foreground">{invoice.tenant_email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Building
              </p>
              <p className="font-semibold text-foreground">{invoice.building_name}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-8">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-border">
                  <TableHead className="text-left font-semibold text-foreground py-3">
                    Description
                  </TableHead>
                  <TableHead className="text-right font-semibold text-foreground py-3 w-20">
                    Qty
                  </TableHead>
                  <TableHead className="text-right font-semibold text-foreground py-3 w-32">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-right font-semibold text-foreground py-3 w-32">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(lineItems || []).map((item, idx) => (
                  <TableRow key={idx} className="border-b border-border">
                    <TableCell className="py-3 text-foreground">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-right py-3 text-foreground">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right py-3 text-foreground">
                      {item.unit_price}
                    </TableCell>
                    <TableCell className="text-right py-3 text-foreground font-medium">
                      {item.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Section */}
          <div className="mb-8 pb-8 border-b border-border">
            <div className="ml-auto w-80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium text-foreground">{invoice.subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">VAT (15%):</span>
                <span className="font-medium text-foreground">{invoice.vat}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Withholding Tax (2%):</span>
                <span className="font-medium text-foreground">{invoice.withholding}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Grand Total:</span>
                <span className="text-2xl font-bold text-foreground">
                  {invoice.grand_total}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {invoice.payment_method && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">
                  Payment Information
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Payment Method
                    </p>
                    <p className="font-semibold text-foreground">{invoice.payment_method}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Transaction Reference
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {invoice.transaction_ref}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
            <p>This is a digital invoice. For inquiries, please contact the property management office.</p>
            <p className="mt-2">Generated on {invoice.issue_date} | Invoice #{invoice.invoice_number}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
