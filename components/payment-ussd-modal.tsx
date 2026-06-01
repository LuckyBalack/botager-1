"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PaymentUSSDModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: string
  dueDate: string
}

export function PaymentUSSDModal({
  open,
  onOpenChange,
  amount,
  dueDate,
}: PaymentUSSDModalProps) {
  const [copiedCBE, setCopiedCBE] = useState(false)
  const [copiedAWASH, setcopiedAWASH] = useState(false)
  const [transactionRef, setTransactionRef] = useState("")
  const [transactionDate, setTransactionDate] = useState("")

  const handleCopyCBE = () => {
    navigator.clipboard.writeText("*321#")
    setCopiedCBE(true)
    setTimeout(() => setCopiedCBE(false), 2000)
  }

  const handleCopyAWASH = () => {
    navigator.clipboard.writeText("*322#")
    setcopiedAWASH(true)
    setTimeout(() => setcopiedAWASH(false), 2000)
  }

  const handleSubmitUSSD = () => {
    if (transactionRef && transactionDate) {
      // Here you would submit the USSD payment data
      console.log("USSD Payment submitted:", { transactionRef, transactionDate })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment Options</DialogTitle>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>

        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online">Pay Online</TabsTrigger>
            <TabsTrigger value="ussd">Pay Offline / USSD</TabsTrigger>
          </TabsList>

          {/* Pay Online Tab */}
          <TabsContent value="online" className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Payment Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount Due:</span>
                  <span className="font-semibold text-slate-900">{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Due Date:</span>
                  <span className="font-semibold text-slate-900">{dueDate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">Available Gateways</h3>

              <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">Chapa</h4>
                    <p className="text-sm text-slate-600">
                      Pay instantly with bank transfer or card
                    </p>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Pay with Chapa
                  </Button>
                </div>
              </Card>

              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">Telebirr</h4>
                    <p className="text-sm text-slate-600">
                      Pay using your Telebirr mobile money account
                    </p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Pay with Telebirr
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Pay Offline / USSD Tab */}
          <TabsContent value="ussd" className="space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                Follow the instructions below to pay using USSD on your phone.
                After payment, fill in your transaction details.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-3 font-semibold text-slate-900">CBE Birr USSD</h3>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <ol className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-semibold">1.</span>
                      <span>Open your phone dialer</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold">2.</span>
                      <span>Dial the USSD code:</span>
                    </li>
                  </ol>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-white p-3">
                    <code className="flex-1 font-mono text-lg font-semibold text-slate-900">
                      *321#
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyCBE}
                      className="gap-2"
                    >
                      {copiedCBE ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <ol start={3} className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-semibold">3.</span>
                      <span>Follow the prompts to complete payment</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold">4.</span>
                      <span>
                        Save your transaction reference number and date
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-slate-900">
                  Awash Bank USSD
                </h3>
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <ol className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-semibold">1.</span>
                      <span>Open your phone dialer</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold">2.</span>
                      <span>Dial the USSD code:</span>
                    </li>
                  </ol>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-white p-3">
                    <code className="flex-1 font-mono text-lg font-semibold text-slate-900">
                      *322#
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyAWASH}
                      className="gap-2"
                    >
                      {copiedAWASH ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <ol start={3} className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="font-semibold">3.</span>
                      <span>Follow the prompts to complete payment</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold">4.</span>
                      <span>
                        Save your transaction reference number and date
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Transaction Details Form */}
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">
                  Confirm Payment Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="transaction-ref" className="text-sm font-medium">
                      Transaction Reference Number
                    </Label>
                    <Input
                      id="transaction-ref"
                      placeholder="e.g., TXN-2024-12345"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transaction-date" className="text-sm font-medium">
                      Transaction Date
                    </Label>
                    <Input
                      id="transaction-date"
                      type="date"
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
