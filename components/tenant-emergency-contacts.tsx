"use client"

import { Phone, Mail, Plus, Edit2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  isPrimary: boolean
}

export function TenantEmergencyContacts() {
  const contacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Abebe Alemu",
      relationship: "Spouse",
      phone: "+251 911 234 567",
      email: "abebe@example.com",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Sara Alemu",
      relationship: "Sister",
      phone: "+251 912 345 678",
      email: "sara@example.com",
      isPrimary: false,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Emergency Contacts</CardTitle>
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-start justify-between rounded-lg border border-slate-200 p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-900">{contact.name}</h4>
                {contact.isPrimary && (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    Primary
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600">{contact.relationship}</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
