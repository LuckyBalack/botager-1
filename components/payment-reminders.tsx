"use client"

import { Mail, MessageSquare, Clock, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ReminderConfiguration = {
  id: string
  days: number
  method: "email" | "sms" | "both"
  status: "active" | "inactive"
  sentCount: number
}

const reminders: ReminderConfiguration[] = [
  {
    id: "rem-1",
    days: 0,
    method: "email",
    status: "active",
    sentCount: 24,
  },
  {
    id: "rem-2",
    days: 3,
    method: "email",
    status: "active",
    sentCount: 18,
  },
  {
    id: "rem-3",
    days: 7,
    method: "both",
    status: "active",
    sentCount: 12,
  },
  {
    id: "rem-4",
    days: 14,
    method: "sms",
    status: "inactive",
    sentCount: 0,
  },
]

function getMethodIcon(method: string) {
  switch (method) {
    case "email":
      return <Mail className="h-4 w-4" />
    case "sms":
      return <MessageSquare className="h-4 w-4" />
    case "both":
      return (
        <div className="flex gap-1">
          <Mail className="h-4 w-4" />
          <MessageSquare className="h-4 w-4" />
        </div>
      )
  }
}

function getMethodLabel(method: string) {
  switch (method) {
    case "email":
      return "Email"
    case "sms":
      return "SMS"
    case "both":
      return "Email + SMS"
  }
}

export function PaymentReminders() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Payment Reminder Schedule</h3>
        <Button size="sm" variant="outline">
          Configure
        </Button>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <span className="font-medium text-slate-900">
                    {reminder.days === 0
                      ? "On Due Date"
                      : `${reminder.days} days before due date`}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-slate-600">
                    {getMethodIcon(reminder.method)}
                    <span className="text-sm">
                      {getMethodLabel(reminder.method)}
                    </span>
                  </div>
                  <Badge
                    className={
                      reminder.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }
                  >
                    {reminder.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-slate-900">
                    {reminder.sentCount} sent
                  </span>
                </div>
                <button className="mt-2 text-sm font-medium text-teal-700 hover:text-teal-800">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h4 className="font-medium text-amber-900">Dunning Sequence Configuration</h4>
        <p className="mt-2 text-sm text-amber-800">
          Late fee application and escalation rules are configured in the Billing Settings.{" "}
          <button className="font-medium underline hover:no-underline">
            Configure now
          </button>
        </p>
      </div>
    </section>
  )
}
