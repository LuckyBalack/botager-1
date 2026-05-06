"use client"

import { Download, FileText, CheckCircle2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Receipt {
  id: string
  invoiceId: string
  amount: number
  paymentDate: string
  paymentMethod: string
  status: "confirmed" | "pending" | "failed"
  transactionId: string
}

export function PaymentReceipts() {
  const receipts: Receipt[] = [
    {
      id: "RCP-001",
      invoiceId: "INV-2024-002",
      amount: 15000,
      paymentDate: "Apr 3, 2024",
      paymentMethod: "Chapa",
      status: "confirmed",
      transactionId: "TXN-20240403-001",
    },
    {
      id: "RCP-002",
      invoiceId: "INV-2024-003",
      amount: 15000,
      paymentDate: "Mar 4, 2024",
      paymentMethod: "Telebirr",
      status: "confirmed",
      transactionId: "TXN-20240304-001",
    },
    {
      id: "RCP-003",
      invoiceId: "INV-2024-004",
      amount: 15000,
      paymentDate: "Feb 5, 2024",
      paymentMethod: "Bank Transfer",
      status: "confirmed",
      transactionId: "TXN-20240205-001",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-600" />
          Payment Receipts & History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receipt #</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell className="font-medium text-slate-900">
                  {receipt.id}
                </TableCell>
                <TableCell className="text-slate-600">
                  {receipt.invoiceId}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ETB {receipt.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-slate-600">
                  {receipt.paymentDate}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{receipt.paymentMethod}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">
                      {receipt.status === "confirmed"
                        ? "Confirmed"
                        : receipt.status === "pending"
                          ? "Pending"
                          : "Failed"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-slate-600 hover:text-slate-900"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-slate-600 hover:text-slate-900"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Transaction Details */}
        <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
          <h3 className="font-semibold text-slate-900">Latest Transaction</h3>
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Transaction ID</p>
                <p className="font-mono font-semibold text-slate-900">
                  {receipts[0].transactionId}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Amount Paid</p>
                <p className="font-semibold text-slate-900">
                  ETB {receipts[0].amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Payment Method</p>
                <p className="font-semibold text-slate-900">
                  {receipts[0].paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Payment Date</p>
                <p className="font-semibold text-slate-900">
                  {receipts[0].paymentDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
