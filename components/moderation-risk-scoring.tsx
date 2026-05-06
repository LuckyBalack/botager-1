"use client"

import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface RiskScoreData {
  submissionId: string
  buildingName: string
  riskScore: number
  factors: {
    incompleteDocuments: number
    redFlags: number
    documentQuality: number
    ownerVerification: number
  }
}

export function ModerationRiskScoring({ submissions }: { submissions: any[] }) {
  const calculateRiskScore = (submission: any): RiskScoreData => {
    let score = 0
    const factors = {
      incompleteDocuments: 0,
      redFlags: 0,
      documentQuality: 75,
      ownerVerification: 80,
    }

    // Calculate based on document count
    if (submission.documentCount < 5) {
      factors.incompleteDocuments = (5 - submission.documentCount) * 10
      score += factors.incompleteDocuments
    }

    // Random red flags for demo
    factors.redFlags = Math.random() > 0.7 ? 15 : 0
    score += factors.redFlags

    return {
      submissionId: submission.id,
      buildingName: submission.buildingName,
      riskScore: Math.min(score, 100),
      factors,
    }
  }

  const getRiskLevel = (score: number) => {
    if (score < 20) return { label: "Low", color: "bg-emerald-100 text-emerald-700" }
    if (score < 50) return { label: "Medium", color: "bg-amber-100 text-amber-700" }
    if (score < 80) return { label: "High", color: "bg-orange-100 text-orange-700" }
    return { label: "Critical", color: "bg-red-100 text-red-700" }
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "Pending").slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
        <CardDescription>Automated risk scoring for submissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {pendingSubmissions.map((submission) => {
          const riskData = calculateRiskScore(submission)
          const riskLevel = getRiskLevel(riskData.riskScore)

          return (
            <div key={riskData.submissionId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">{riskData.buildingName}</h3>
                  <p className="text-sm text-slate-500">Score: {riskData.riskScore}/100</p>
                </div>
                <Badge className={riskLevel.color}>{riskLevel.label} Risk</Badge>
              </div>

              <div className="space-y-1">
                <Progress value={riskData.riskScore} className="h-2" />
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                  <p className="font-medium text-slate-900">
                    {riskData.factors.incompleteDocuments}
                  </p>
                  <p className="text-slate-500">Missing Docs</p>
                </div>
                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                  <p className="font-medium text-slate-900">{riskData.factors.redFlags}</p>
                  <p className="text-slate-500">Red Flags</p>
                </div>
                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                  <p className="font-medium text-slate-900">
                    {riskData.factors.documentQuality}%
                  </p>
                  <p className="text-slate-500">Quality</p>
                </div>
                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                  <p className="font-medium text-slate-900">
                    {riskData.factors.ownerVerification}%
                  </p>
                  <p className="text-slate-500">Verified</p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
