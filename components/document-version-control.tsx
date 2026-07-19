"use client"

import { FileText, Eye, Download, RotateCcw, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type DocumentVersion = {
  id: string
  documentName: string
  version: number
  uploadedBy: string
  uploadedDate: string
  size: string
  status: "current" | "previous" | "archived"
  changes: string
}

const versions: DocumentVersion[] = [
  {
    id: "v-1",
    documentName: "Abuki_Lease_Agreement.pdf",
    version: 3,
    uploadedBy: "Admin User",
    uploadedDate: "Apr 28, 2024",
    size: "2.4 MB",
    status: "current",
    changes: "Updated clause 5.2 regarding security deposit",
  },
  {
    id: "v-2",
    documentName: "Abuki_Lease_Agreement.pdf",
    version: 2,
    uploadedBy: "Admin User",
    uploadedDate: "Apr 15, 2024",
    size: "2.3 MB",
    status: "previous",
    changes: "Added maintenance responsibility section",
  },
  {
    id: "v-3",
    documentName: "Abuki_Lease_Agreement.pdf",
    version: 1,
    uploadedBy: "Admin User",
    uploadedDate: "Mar 1, 2024",
    size: "2.1 MB",
    status: "archived",
    changes: "Initial version",
  },
  {
    id: "v-4",
    documentName: "Property_Insurance_Certificate.pdf",
    version: 2,
    uploadedBy: "Insurance Team",
    uploadedDate: "Apr 20, 2024",
    size: "1.8 MB",
    status: "current",
    changes: "Renewed policy for 2024-2025",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "current":
      return <Badge className="bg-emerald-100 text-emerald-700">Current</Badge>
    case "previous":
      return <Badge className="bg-slate-100 text-slate-700">Previous</Badge>
    case "archived":
      return <Badge className="bg-gray-100 text-gray-700">Archived</Badge>
  }
}

export function DocumentVersionControl() {
  // Group by document name
  const groupedVersions: Record<string, DocumentVersion[]> = {}
  versions.forEach((v) => {
    if (!groupedVersions[v.documentName]) {
      groupedVersions[v.documentName] = []
    }
    groupedVersions[v.documentName].push(v)
  })

  return (
    <section className="space-y-6">
      <h3 className="font-semibold text-slate-900">Version Control</h3>

      {Object.entries(groupedVersions).map(([docName, docs]) => (
        <div key={docName} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-slate-400" />
            <h4 className="font-medium text-slate-900">{docName}</h4>
            <Badge className="bg-slate-100 text-slate-700">
              {docs.length} version{docs.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="space-y-3">
            {docs.map((version) => (
              <div
                key={version.id}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">
                        v{version.version}
                      </span>
                      {getStatusBadge(version.status)}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{version.changes}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>Uploaded by: {version.uploadedBy}</span>
                      <span>•</span>
                      <span>{version.uploadedDate}</span>
                      <span>•</span>
                      <span>{version.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      title="Preview"
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      title="Download"
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    {version.status !== "current" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        title="Restore version"
                        className="h-8 w-8"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                    {version.status === "archived" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        title="Delete"
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> All versions are automatically saved
          with timestamps. You can restore any previous version or permanently delete archived
          versions after your retention period.
        </p>
      </div>
    </section>
  )
}
