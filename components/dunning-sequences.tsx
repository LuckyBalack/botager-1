"use client"

import { AlertTriangle, Clock, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type DunningStep = {
  id: string
  daysOverdue: number
  action: string
  feePercent: number
  status: "active" | "inactive"
}

type DunningSequence = {
  id: string
  name: string
  status: "active" | "inactive"
  steps: DunningStep[]
}

const dunningSequences: DunningSequence[] = [
  {
    id: "dun-1",
    name: "Standard Payment Recovery",
    status: "active",
    steps: [
      {
        id: "step-1",
        daysOverdue: 3,
        action: "Send gentle reminder (Email + SMS)",
        feePercent: 0,
        status: "active",
      },
      {
        id: "step-2",
        daysOverdue: 7,
        action: "Send formal payment notice",
        feePercent: 2,
        status: "active",
      },
      {
        id: "step-3",
        daysOverdue: 14,
        action: "Apply late fee & send notice",
        feePercent: 5,
        status: "active",
      },
      {
        id: "step-4",
        daysOverdue: 30,
        action: "Escalate to management + suspend services",
        feePercent: 5,
        status: "active",
      },
    ],
  },
  {
    id: "dun-2",
    name: "Aggressive Collections",
    status: "inactive",
    steps: [
      {
        id: "step-5",
        daysOverdue: 1,
        action: "Send immediate payment reminder",
        feePercent: 0,
        status: "inactive",
      },
      {
        id: "step-6",
        daysOverdue: 5,
        action: "Apply late fee immediately",
        feePercent: 3,
        status: "inactive",
      },
      {
        id: "step-7",
        daysOverdue: 15,
        action: "Contact guarantor + suspend access",
        feePercent: 8,
        status: "inactive",
      },
    ],
  },
]

export function DunningSequences() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Dunning Sequences</h3>
        <Button size="sm" variant="outline">
          New Sequence
        </Button>
      </div>

      {dunningSequences.map((sequence) => (
        <div key={sequence.id} className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900">{sequence.name}</h4>
                <p className="mt-1 text-sm text-slate-600">
                  {sequence.steps.length} escalation steps
                </p>
              </div>
              <Badge
                className={
                  sequence.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-700"
                }
              >
                {sequence.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          <div className="space-y-0 divide-y divide-slate-200">
            {sequence.steps.map((step, index) => (
              <div key={step.id} className="p-4 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <span className="font-semibold text-slate-700">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-900">
                        {step.daysOverdue} days overdue
                      </span>
                    </div>
                    <p className="mt-2 text-slate-700">{step.action}</p>
                    {step.feePercent > 0 && (
                      <div className="mt-2 flex items-center gap-1.5 rounded bg-amber-50 p-2 w-fit">
                        <DollarSign className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900">
                          Late fee: {step.feePercent}%
                        </span>
                      </div>
                    )}
                  </div>
                  {sequence.status === "active" && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 sm:p-6">
            <Button size="sm" variant="outline" className="mr-2">
              Edit
            </Button>
            {sequence.status === "active" && (
              <Button size="sm" variant="outline">
                Deactivate
              </Button>
            )}
            {sequence.status === "inactive" && (
              <Button size="sm" variant="outline">
                Activate
              </Button>
            )}
          </div>
        </div>
      ))}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="flex items-center gap-2 font-medium text-blue-900">
          <AlertTriangle className="h-5 w-5" />
          Pro Tip
        </h4>
        <p className="mt-2 text-sm text-blue-800">
          Customize dunning sequences by property type, tenant profile, or region. Test your
          sequence with a sample tenant before deploying to all properties.
        </p>
      </div>
    </section>
  )
}
