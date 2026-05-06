"use client"

import { Copy, Trash2, Plus, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface ResponseTemplate {
  id: string
  name: string
  category: string
  content: string
  usageCount: number
}

export function HelpdeskResponseTemplates() {
  const templates: ResponseTemplate[] = [
    {
      id: "T-001",
      name: "Account Verification",
      category: "Account",
      content: "Thank you for contacting support. To proceed with your request, we need to verify your identity. Please provide your account email and the last 4 digits of your registered phone number.",
      usageCount: 24,
    },
    {
      id: "T-002",
      name: "Password Reset",
      category: "Account",
      content: "We've sent a password reset link to your registered email address. If you don't see it, please check your spam folder. The link will expire in 24 hours for security purposes.",
      usageCount: 18,
    },
    {
      id: "T-003",
      name: "Billing Inquiry",
      category: "Billing",
      content: "Thank you for your inquiry about your billing. Your invoice has been attached to this message. If you have questions about specific charges, please let us know the invoice date and we'll be happy to clarify.",
      usageCount: 12,
    },
    {
      id: "T-004",
      name: "Technical Issue - Investigating",
      category: "Technical",
      content: "Thank you for reporting this issue. Our technical team is currently investigating. We'll keep you updated and provide an estimated resolution time within the next 2 hours.",
      usageCount: 15,
    },
  ]

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Template copied to clipboard")
  }

  const handleDeleteTemplate = (id: string) => {
    toast.success("Template deleted")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Account":
        return "bg-blue-100 text-blue-700"
      case "Billing":
        return "bg-emerald-100 text-emerald-700"
      case "Technical":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Response Templates
          </CardTitle>
          <CardDescription>Pre-written responses for common issues</CardDescription>
        </div>
        <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {templates.map((template) => (
          <div key={template.id} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-slate-900">{template.name}</h3>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {template.content}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Used {template.usageCount} times
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyTemplate(template.content)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
