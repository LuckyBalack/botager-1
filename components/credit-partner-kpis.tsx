"use client"

import { TrendingUp, TrendingDown, DollarSign, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PartnerKPI {
  id: string
  name: string
  totalIssued: number
  approvalRate: number
  avgResponseTime: number
  uptime: number
  activeLoans: number
  delinquencyRate: number
}

export function CreditPartnerKPIs({ partners }: { partners: any[] }) {
  const kpis: PartnerKPI[] = partners.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    totalIssued: Math.floor(Math.random() * 5000000) + 100000,
    approvalRate: Math.floor(Math.random() * 40) + 60,
    avgResponseTime: Math.floor(Math.random() * 3000) + 500,
    uptime: Math.floor(Math.random() * 10) + 98,
    activeLoans: Math.floor(Math.random() * 5000) + 100,
    delinquencyRate: Math.floor(Math.random() * 10) + 1,
  }))

  const getTrendColor = (value: number, inverse = false) => {
    if (inverse) return value > 5 ? "text-red-600" : "text-emerald-600"
    return value > 50 ? "text-emerald-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {kpis.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{kpi.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Total Issued</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    ETB {(kpi.totalIssued / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Approval Rate</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{kpi.approvalRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Uptime</p>
                  <p className="mt-1 text-lg font-bold text-emerald-600">{kpi.uptime}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Active Loans</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {(kpi.activeLoans / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Delinquency Rate</span>
                  <span
                    className={`font-medium ${getTrendColor(kpi.delinquencyRate, true)}`}
                  >
                    {kpi.delinquencyRate}%
                  </span>
                </div>
                <Progress value={Math.min(kpi.delinquencyRate * 10, 100)} className="h-2" />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Zap className="h-3 w-3" />
                Avg Response: {(kpi.avgResponseTime / 1000).toFixed(1)}s
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
