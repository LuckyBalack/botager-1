"use client"

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
import type { InvoiceDetail } from "@/lib/data"

type DigitalInvoiceDetailViewProps = {
  invoice: InvoiceDetail
}

export function DigitalInvoiceDetailView({ invoice }: DigitalInvoiceDetailViewProps) {
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

  const handleEmailTenant = () => {
    toast.success(`Invoice emailed to ${invoice.tenantEmail}`)
  }

  const handlePrint = () => {
    window.print()
    toast.success("Invoice sent to printer")
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
              <p className="font-semibold text-foreground">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Issue Date
              </p>
              <p className="font-semibold text-foreground">{invoice.issueDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Due Date
              </p>
              <p className="font-semibold text-foreground">{invoice.dueDate}</p>
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
              <p className="font-semibold text-foreground">{invoice.tenantName}</p>
              <p className="text-sm text-muted-foreground">Room {invoice.roomNumber}</p>
              <p className="text-sm text-muted-foreground">{invoice.tenantEmail}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Building
              </p>
              <p className="font-semibold text-foreground">{invoice.buildingName}</p>
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
                {invoice.lineItems.map((item, idx) => (
                  <TableRow key={idx} className="border-b border-border">
                    <TableCell className="py-3 text-foreground">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-right py-3 text-foreground">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right py-3 text-foreground">
                      {item.unitPrice}
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
                  {invoice.grandTotal}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {invoice.paymentMethod && (
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
                    <p className="font-semibold text-foreground">{invoice.paymentMethod}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Transaction Reference
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {invoice.transactionRef}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
            <p>This is a digital invoice. For inquiries, please contact the property management office.</p>
            <p className="mt-2">Generated on {invoice.issueDate} | Invoice #{invoice.invoiceNumber}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
