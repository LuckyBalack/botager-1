"use client"

import { useState } from "react"
import { Check, CreditCard, Calendar, History, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { subscriptionPlans, subscriptionPayments } from "@/lib/data"
import { toast } from "sonner"

const paymentMethods = [
  { id: "chapa", name: "Chapa", description: "Pay with Chapa" },
  { id: "telebirr", name: "Telebirr", description: "Pay with Telebirr" },
  { id: "cbe-birr", name: "CBE Birr", description: "Pay with CBE Birr" },
]

export function SystemSubscriptionView() {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("telebirr")

  const currentPlan = subscriptionPlans.find((p) => p.isCurrent)
  const renewalDate = "May 1, 2024"

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId)
    setUpgradeModalOpen(true)
  }

  const handleConfirmUpgrade = () => {
    const plan = subscriptionPlans.find((p) => p.id === selectedPlan)
    setUpgradeModalOpen(false)
    toast.success("Subscription Updated", {
      description: `Successfully upgraded to ${plan?.name} plan.`,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Subscription</h1>
        <p className="mt-1 text-slate-500">
          Manage your WRM platform subscription and payment history.
        </p>
      </div>

      {/* Current Plan & Renewal */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Plan Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-orange-500" />
              <CardTitle>Current Plan</CardTitle>
            </div>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            {currentPlan && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{currentPlan.name}</h3>
                    <p className="text-slate-500">{currentPlan.price}/month</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-none">Active</Badge>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-slate-700 mb-2">Plan Features:</p>
                  <ul className="grid gap-2">
                    {currentPlan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Renewal Date Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-slate-600" />
              <CardTitle>Renewal Date</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{renewalDate}</p>
                <p className="text-sm text-slate-500 mt-1">Next billing cycle</p>
              </div>
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Compare plans and upgrade anytime</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg border p-6 ${
                  plan.isCurrent
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.isCurrent && (
                  <Badge className="absolute -top-3 left-4 bg-orange-500 text-white">
                    Current Plan
                  </Badge>
                )}
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-2">
                      {plan.price}
                      <span className="text-sm font-normal text-slate-500">/month</span>
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.isCurrent ? "outline" : "default"}
                    className={plan.isCurrent ? "" : "bg-orange-500 hover:bg-orange-600"}
                    disabled={plan.isCurrent}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.isCurrent ? "Current Plan" : "Upgrade"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-slate-600" />
            <CardTitle>Payment History</CardTitle>
          </div>
          <CardDescription>Your subscription payment records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Payment ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Date</TableHead>
                <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                <TableHead className="font-semibold text-slate-700">Method</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium text-slate-900">{payment.id}</TableCell>
                  <TableCell className="text-slate-600">{payment.date}</TableCell>
                  <TableCell className="font-medium text-slate-900">{payment.amount}</TableCell>
                  <TableCell className="text-slate-600">{payment.method}</TableCell>
                  <TableCell>
                    <Badge
                      className={`border-none ${
                        payment.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : payment.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <Dialog open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Subscription</DialogTitle>
            <DialogDescription>
              Select a payment method to upgrade to{" "}
              {subscriptionPlans.find((p) => p.id === selectedPlan)?.name} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
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
                        <span className="font-medium text-slate-900">{method.name}</span>
                        <span className="text-xs text-slate-500">{method.description}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleConfirmUpgrade}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Confirm Upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
