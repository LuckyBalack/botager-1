"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { AppSidebar, type ViewKey, type BuildingSelection } from "@/components/app-sidebar"
import { AppHeader, type UserRole } from "@/components/app-header"
import { TenantSidebar, type TenantViewKey } from "@/components/tenant-sidebar"
import { TenantDashboardView } from "@/components/views/tenant-dashboard-view"
import { DashboardView } from "@/components/views/dashboard-view"
import { PropertiesView } from "@/components/views/properties-view"
import { TenantsView } from "@/components/views/tenants-view"
import { TenantDetailView } from "@/components/views/tenant-detail-view"
import { PropertyDetailView } from "@/components/views/property-detail-view"
import { AddTenantView } from "@/components/views/add-tenant-view"
import { PlaceholderView } from "@/components/views/placeholder-view"
import { PortfolioDashboardView } from "@/components/views/portfolio-dashboard-view"
import { BillingView } from "@/components/views/billing-view"
import { MaintenanceView } from "@/components/views/maintenance-view"
import { MarketplaceView } from "@/components/views/marketplace-view"
import { AccountingView } from "@/components/views/accounting-view"
import { DocumentsView } from "@/components/views/documents-view"
import { MessagesView } from "@/components/views/messages-view"
import { TeamSettingsView } from "@/components/views/team-settings-view"
import { AutomationsView } from "@/components/views/automations-view"
import { HelpCenterView, LiveChatWidget } from "@/components/views/help-center-view"
import { DataImportView } from "@/components/views/data-import-view"
import { InspectionsView } from "@/components/views/inspections-view"
import { VendorsView } from "@/components/views/vendors-view"
import { SettingsView } from "@/components/views/settings-view"
import { UtilityTrackingView } from "@/components/views/utility-tracking-view"
import { LeaseSettlementView } from "@/components/views/lease-settlement-view"
import { WaitlistView } from "@/components/views/waitlist-view"
import { BrokersView } from "@/components/views/brokers-view"
import { SystemSubscriptionView } from "@/components/views/system-subscription-view"
import { SystemAdminSidebar, type SystemAdminViewKey } from "@/components/system-admin-sidebar"
import { SystemAdminView } from "@/components/views/system-admin-view"
import { getPropertyById, getTenantById } from "@/lib/data"

type ActiveView = ViewKey | "detail" | "add-tenant" | "system-subscription" | "lease-settlement"
type DetailKind = "tenant" | "property"
type Selected = { kind: DetailKind; id: string } | null

const titleMap: Record<ViewKey | "system-subscription" | "lease-settlement", string> = {
  dashboard: "Dashboard",
  properties: "Properties",
  tenants: "Tenants",
  billing: "Financials & Billing",
  maintenance: "Work Orders & Maintenance",
  accounting: "Accounting & Reports",
  documents: "Documents",
  messages: "Messages",
  marketplace: "Marketplace",
  settings: "Settings",
  "portfolio-dashboard": "Portfolio Overview",
  "team-settings": "Staff & Branch Management",
  automations: "Automated Workflows",
  "help-center": "Help Center & Support",
  "data-import": "Data Migration & Import",
  inspections: "Property Inspections",
  vendors: "External Vendors & Contacts",
  "system-subscription": "System Subscription",
  "utility-tracking": "Utility Meter Readings",
  "waitlist": "Prospective Tenants & Waitlist",
  "lease-settlement": "Final Lease Settlement",
  "brokers": "Brokers & Commissions",
}

export function DashboardApp() {
  const [userRole, setUserRole] = useState<UserRole>("admin")
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")
  const [tenantView, setTenantView] = useState<TenantViewKey>("my-lease")
  const [systemAdminView, setSystemAdminView] = useState<SystemAdminViewKey>("moderation")
  const [selected, setSelected] = useState<Selected>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingSelection>("abuki")
  // Track if user came from admin side (to show "Back to Admin" button in marketplace)
  const [cameFromAdmin, setCameFromAdmin] = useState(false)

  const handleRoleToggle = () => {
    setUserRole((prev) => {
      if (prev === "admin") return "tenant"
      if (prev === "tenant") return "system-admin"
      return "admin"
    })
  }

  const handleBuildingChange = (building: BuildingSelection) => {
    setSelectedBuilding(building)
    if (building === "all") {
      setActiveView("portfolio-dashboard")
      setSelected(null)
    } else if (activeView === "portfolio-dashboard") {
      setActiveView("dashboard")
    }
  }

  const navigate = (view: ViewKey) => {
    setSelected(null)
    setActiveView(view)
  }

  const openTenantDetail = (id: string) => {
    setSelected({ kind: "tenant", id })
    setActiveView("detail")
  }

  const openPropertyDetail = (id: string) => {
    setSelected({ kind: "property", id })
    setActiveView("detail")
  }

  const openAddTenant = () => {
    setSelected(null)
    setActiveView("add-tenant")
  }

  const openLeaseSettlement = (tenantId: string) => {
    setSelected({ kind: "tenant", id: tenantId })
    setActiveView("lease-settlement")
  }

  const sidebarActive: ViewKey =
    activeView === "detail"
      ? selected?.kind === "tenant"
        ? "tenants"
        : "properties"
      : activeView === "add-tenant" || activeView === "lease-settlement"
        ? "tenants"
        : activeView as ViewKey

  const headerTitle =
    activeView === "detail"
      ? selected?.kind === "tenant"
        ? "Tenants"
        : "Properties"
      : activeView === "add-tenant"
        ? "Add Tenants"
        : activeView === "lease-settlement"
          ? "Final Lease Settlement"
          : titleMap[activeView as keyof typeof titleMap]

  const showAddTenant =
    activeView === "dashboard" ||
    activeView === "tenants" ||
    (activeView === "detail" && selected?.kind === "tenant")

  const selectedTenant =
    activeView === "detail" && selected?.kind === "tenant"
      ? getTenantById(selected.id)
      : undefined
  const selectedProperty =
    activeView === "detail" && selected?.kind === "property"
      ? getPropertyById(selected.id)
      : undefined

  // Tenant view titles
  const tenantTitleMap: Record<TenantViewKey, string> = {
    "my-lease": "My Lease",
    invoices: "Invoices & Payments",
    maintenance: "Maintenance",
    messages: "Messages",
  }

  // System Admin View Titles
  const systemAdminTitleMap: Record<SystemAdminViewKey, string> = {
    moderation: "Workspace Verifications",
    "credit-partners": "Credit Service Partners",
    settings: "System Settings",
  }

  // System Admin Portal Render
  if (userRole === "system-admin") {
    return (
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        <SystemAdminSidebar
          activeView={systemAdminView}
          onNavigate={setSystemAdminView}
          onLogout={() => setUserRole("admin")}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader
            title={systemAdminTitleMap[systemAdminView]}
            userRole={userRole}
            onRoleToggle={handleRoleToggle}
          />

          <main className="flex-1 px-10 py-8">
            <SystemAdminView view={systemAdminView} />
          </main>
        </div>
      </div>
    )
  }

  // Tenant Portal Render
  if (userRole === "tenant") {
    return (
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        <TenantSidebar activeView={tenantView} onNavigate={setTenantView} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader
            title={tenantTitleMap[tenantView]}
            userRole={userRole}
            onRoleToggle={handleRoleToggle}
          />

          <main className="flex-1 px-10 py-8">
            {tenantView === "my-lease" && <TenantDashboardView />}
            {tenantView === "invoices" && (
              <PlaceholderView
                title="Invoices & Payments"
                description="View your invoices and make payments."
                icon={Settings}
              />
            )}
            {tenantView === "maintenance" && (
              <PlaceholderView
                title="Maintenance Requests"
                description="Submit and track maintenance requests."
                icon={Settings}
              />
            )}
            {tenantView === "messages" && (
              <PlaceholderView
                title="Messages"
                description="Communicate with your property manager."
                icon={Settings}
              />
            )}
          </main>
        </div>
      </div>
    )
  }

  const navigateToMarketplace = () => {
    setCameFromAdmin(true)
    setActiveView("marketplace")
  }

  const handleMarketplaceSignIn = () => {
    setCameFromAdmin(false)
    setActiveView("dashboard")
  }

  const handleBackToAdmin = () => {
    setCameFromAdmin(false)
    setActiveView("dashboard")
  }

  // Override navigate for marketplace
  const handleNavigate = (view: ViewKey) => {
    if (view === "marketplace") {
      navigateToMarketplace()
    } else {
      setCameFromAdmin(false)
      navigate(view)
    }
  }

  // Public Marketplace View (Full Width, No Sidebar)
  if (activeView === "marketplace") {
    return (
      <MarketplaceView
        onSignIn={handleMarketplaceSignIn}
        showBackToAdmin={cameFromAdmin}
        onBackToAdmin={handleBackToAdmin}
      />
    )
  }

  // Admin View Render
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AppSidebar
        activeView={sidebarActive}
        onNavigate={handleNavigate}
        selectedBuilding={selectedBuilding}
        onBuildingChange={handleBuildingChange}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          title={headerTitle}
          showAddTenant={showAddTenant}
          onAddTenant={openAddTenant}
          userRole={userRole}
          onRoleToggle={handleRoleToggle}
        />

        <main className="flex-1 px-10 py-8">
          {activeView === "portfolio-dashboard" && <PortfolioDashboardView />}
          {activeView === "dashboard" && (
            <DashboardView onNavigate={handleNavigate} />
          )}
          {activeView === "properties" && (
            <PropertiesView onSelectProperty={openPropertyDetail} />
          )}
          {activeView === "tenants" && (
            <TenantsView onSelectTenant={openTenantDetail} />
          )}
          {activeView === "billing" && <BillingView />}
          {activeView === "maintenance" && <MaintenanceView />}
          {activeView === "accounting" && <AccountingView />}
          {activeView === "documents" && <DocumentsView />}
          {activeView === "messages" && <MessagesView />}
          {activeView === "detail" && selectedTenant && (
            <TenantDetailView
              tenant={selectedTenant}
              onTerminateLease={openLeaseSettlement}
            />
          )}
          {activeView === "detail" && selectedProperty && (
            <PropertyDetailView property={selectedProperty} />
          )}
          {activeView === "add-tenant" && <AddTenantView />}
          {activeView === "settings" && (
            <SettingsView
              onNavigate={handleNavigate}
              onSystemSubscription={() => setActiveView("system-subscription")}
            />
          )}
          {activeView === "team-settings" && <TeamSettingsView />}
          {activeView === "automations" && <AutomationsView />}
          {activeView === "help-center" && <HelpCenterView />}
          {activeView === "data-import" && <DataImportView />}
          {activeView === "inspections" && <InspectionsView />}
          {activeView === "vendors" && <VendorsView />}
          {activeView === "brokers" && <BrokersView />}
          {activeView === "system-subscription" && <SystemSubscriptionView />}
          {activeView === "utility-tracking" && <UtilityTrackingView />}
          {activeView === "waitlist" && (
            <WaitlistView
              onInviteToLease={(leadData) => {
                // Here we would typically pass the lead data to the add tenant form
                openAddTenant()
              }}
            />
          )}
          {activeView === "lease-settlement" && selectedTenant && (
            <LeaseSettlementView
              tenant={selectedTenant}
              onClose={() => navigate("tenants")}
            />
          )}
        </main>
      </div>

      {/* Live Chat Widget - Always visible */}
      <LiveChatWidget />
    </div>
  )
}
