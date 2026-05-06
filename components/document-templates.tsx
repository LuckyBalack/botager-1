"use client"

import { FileText, Download, Copy, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type DocumentTemplate = {
  id: string
  name: string
  category: "Lease" | "Notice" | "Contract" | "Insurance" | "Other"
  lastUsed: string
  usageCount: number
  description: string
}

const templates: DocumentTemplate[] = [
  {
    id: "tmpl-1",
    name: "Standard Lease Agreement",
    category: "Lease",
    lastUsed: "Apr 25, 2024",
    usageCount: 12,
    description: "Standard residential lease agreement template with all required clauses",
  },
  {
    id: "tmpl-2",
    name: "Notice to Vacate",
    category: "Notice",
    lastUsed: "Apr 22, 2024",
    usageCount: 8,
    description: "Legal notice form for tenant termination with proper notice period",
  },
  {
    id: "tmpl-3",
    name: "Maintenance Service Agreement",
    category: "Contract",
    lastUsed: "Apr 20, 2024",
    usageCount: 5,
    description: "Contract template for ongoing maintenance service with vendors",
  },
  {
    id: "tmpl-4",
    name: "Property Insurance Certificate",
    category: "Insurance",
    lastUsed: "Apr 18, 2024",
    usageCount: 3,
    description: "Template for documenting property insurance coverage details",
  },
  {
    id: "tmpl-5",
    name: "Late Payment Notice",
    category: "Notice",
    lastUsed: "Apr 15, 2024",
    usageCount: 15,
    description: "Formal notice for late rent payments with escalation terms",
  },
]

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Lease: "bg-blue-100 text-blue-700",
    Notice: "bg-red-100 text-red-700",
    Contract: "bg-purple-100 text-purple-700",
    Insurance: "bg-green-100 text-green-700",
    Other: "bg-slate-100 text-slate-700",
  }
  return colors[category] || "bg-slate-100 text-slate-700"
}

export function DocumentTemplates() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Document Templates</h3>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="h-5 w-5 flex-shrink-0 text-slate-400 mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{template.name}</h4>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{template.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span>Last used: {template.lastUsed}</span>
                    <span>•</span>
                    <span>Used {template.usageCount} times</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" title="Copy template">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" title="Download template">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Tip:</span> Create custom templates for your most
          commonly used documents. Templates can be customized with variable fields like
          {"  "} tenant name, property address, and dates.
        </p>
      </div>
    </section>
  )
}
