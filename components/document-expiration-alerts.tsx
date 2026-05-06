"use client"

import { AlertCircle, Clock, CheckCircle2, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ExpiringDocument = {
  id: string
  name: string
  owner: string
  expiryDate: string
  daysUntilExpiry: number
  category: string
  renewal?: {
    autoRenew: boolean
    renewalDate?: string
  }
}

const expiringDocuments: ExpiringDocument[] = [
  {
    id: "exp-1",
    name: "Property Insurance Certificate",
    owner: "Abuki Building",
    expiryDate: "May 15, 2024",
    daysUntilExpiry: 7,
    category: "Insurance",
    renewal: {
      autoRenew: false,
      renewalDate: "May 1, 2024",
    },
  },
  {
    id: "exp-2",
    name: "Business License Permit",
    owner: "Admin",
    expiryDate: "Jun 30, 2024",
    daysUntilExpiry: 62,
    category: "License",
    renewal: {
      autoRenew: true,
      renewalDate: "Jun 15, 2024",
    },
  },
  {
    id: "exp-3",
    name: "Commercial Lease - Room 310",
    owner: "Alemu Getachew",
    expiryDate: "May 8, 2024",
    daysUntilExpiry: 0,
    category: "Lease",
    renewal: {
      autoRenew: false,
    },
  },
  {
    id: "exp-4",
    name: "Safety Inspection Certificate",
    owner: "Abuki Building",
    expiryDate: "Aug 20, 2024",
    daysUntilExpiry: 114,
    category: "Compliance",
    renewal: {
      autoRenew: true,
    },
  },
]

function getUrgencyColor(daysUntilExpiry: number) {
  if (daysUntilExpiry <= 0) return "bg-red-100 text-red-700"
  if (daysUntilExpiry <= 7) return "bg-red-100 text-red-700"
  if (daysUntilExpiry <= 30) return "bg-amber-100 text-amber-700"
  return "bg-blue-100 text-blue-700"
}

function getUrgencyLabel(daysUntilExpiry: number) {
  if (daysUntilExpiry <= 0) return "EXPIRED"
  if (daysUntilExpiry <= 7) return "URGENT"
  if (daysUntilExpiry <= 30) return "DUE SOON"
  return "UPCOMING"
}

function getUrgencyIcon(daysUntilExpiry: number) {
  if (daysUntilExpiry <= 0) {
    return <AlertCircle className="h-5 w-5 text-red-600" />
  }
  if (daysUntilExpiry <= 7) {
    return <AlertCircle className="h-5 w-5 text-red-600" />
  }
  if (daysUntilExpiry <= 30) {
    return <Clock className="h-5 w-5 text-amber-600" />
  }
  return <Calendar className="h-5 w-5 text-blue-600" />
}

export function DocumentExpirationAlerts() {
  const expiredCount = expiringDocuments.filter((d) => d.daysUntilExpiry <= 0).length
  const urgentCount = expiringDocuments.filter((d) => d.daysUntilExpiry > 0 && d.daysUntilExpiry <= 7).length
  const dueSoonCount = expiringDocuments.filter((d) => d.daysUntilExpiry > 7 && d.daysUntilExpiry <= 30).length

  return (
    <section className="space-y-4">
      <h3 className="font-semibold text-slate-900">Expiration Tracking</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-xs text-red-700 font-medium">Expired</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{expiredCount}</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs text-amber-700 font-medium">Urgent (7 days)</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{urgentCount}</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-xs text-blue-700 font-medium">Due Soon (30 days)</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{dueSoonCount}</p>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {expiringDocuments.map((doc) => (
          <div
            key={doc.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getUrgencyIcon(doc.daysUntilExpiry)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                  <Badge className={getUrgencyColor(doc.daysUntilExpiry)}>
                    {getUrgencyLabel(doc.daysUntilExpiry)}
                  </Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-slate-600">
                    Owner: <span className="font-medium">{doc.owner}</span>
                  </p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>Category: {doc.category}</span>
                    <span>•</span>
                    <span>
                      {doc.daysUntilExpiry > 0
                        ? `Expires in ${doc.daysUntilExpiry} days`
                        : "Expired"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Expiry Date: {doc.expiryDate}
                  </p>
                </div>

                {doc.renewal && (
                  <div className="mt-3 rounded-lg bg-slate-50 p-2">
                    <div className="flex items-center gap-2">
                      {doc.renewal.autoRenew ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-700">
                            Auto-renewal scheduled for {doc.renewal.renewalDate || "later"}
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <span className="text-xs font-medium text-amber-700">
                            Manual renewal required by {doc.renewal.renewalDate || "expiry date"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {doc.daysUntilExpiry <= 30 && (
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Renew Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Tip:</span> Enable email notifications for expiring
          documents. You can also set up auto-renewal for documents that require regular
          renewal (insurance, licenses, etc.).
        </p>
      </div>
    </section>
  )
}
