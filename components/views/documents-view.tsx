"use client"

import { useState } from "react"
import { Folder, FileText, Upload, Search, MoreVertical, Download, Trash2, Eye, Image, File } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentTemplates } from "@/components/document-templates"
import { DocumentVersionControl } from "@/components/document-version-control"
import { DocumentExpirationAlerts } from "@/components/document-expiration-alerts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { documentFolders, recentDocuments, type DocumentFolder } from "@/lib/data"

export function DocumentsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<DocumentFolder | null>(null)

  const filteredDocuments = recentDocuments.filter(
    (doc) =>
      searchQuery === "" ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Image":
        return <Image className="h-5 w-5 text-blue-500" />
      case "DWG":
        return <File className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-slate-400" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
          <p className="mt-1 text-sm text-slate-500">Manage leases, contracts, and files</p>
        </div>
        <Button className="gap-2 bg-orange-500 text-white hover:bg-orange-600">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="mb-6 bg-slate-100">
          <TabsTrigger value="library" className="px-6">
            Document Library
          </TabsTrigger>
          <TabsTrigger value="expiration" className="px-6">
            Expiration Alerts
          </TabsTrigger>
          <TabsTrigger value="templates" className="px-6">
            Templates
          </TabsTrigger>
          <TabsTrigger value="versions" className="px-6">
            Version Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Folders Panel */}
            <div className="lg:col-span-1">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Folders</h2>
              <div className="space-y-2">
                {documentFolders.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => setSelectedFolder(folder)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                      selectedFolder?.id === folder.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`rounded-lg p-2 ${folder.type === "tenant" ? "bg-blue-100" : "bg-amber-100"}`}>
                      <Folder className={`h-5 w-5 ${folder.type === "tenant" ? "text-blue-600" : "text-amber-600"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{folder.name}</p>
                      <p className="text-sm text-slate-500">{folder.fileCount} files</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Documents */}
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {selectedFolder ? `Files in ${selectedFolder.name}` : "Recent Documents"}
              </h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {getFileIcon(doc.type)}
                              <span className="font-medium text-slate-900">{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                              {doc.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-500">{doc.uploadedDate}</TableCell>
                          <TableCell className="text-slate-500">{doc.size}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2">
                                  <Eye className="h-4 w-4" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Download className="h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expiration">
          <DocumentExpirationAlerts />
        </TabsContent>

        <TabsContent value="templates">
          <DocumentTemplates />
        </TabsContent>

        <TabsContent value="versions">
          <DocumentVersionControl />
        </TabsContent>
      </Tabs>
    </div>
  )
}
