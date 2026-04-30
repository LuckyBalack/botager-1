"use client"

import { useState } from "react"

import { AppSidebar, AppSidebarMobile, type ViewKey, type BuildingSelection } from "@/components/app-sidebar"
import { AppHeader, type UserRole } from "@/components/app-header"
import { TenantSidebar } from "@/components/tenant-sidebar"
import { TenantBottomNav } from "@/components/tenant-bottom-nav"
import { SystemAdminSidebar, SystemAdminSidebarMobile, type SystemAdminViewKey } from "@/components/system-admin-sidebar"
import { TenantDashboardView } from "@/components/views/tenant-dashboard-view"
import { TenantInvoicesView } from "@/components/views/tenant-invoices-view"
import { TenantMaintenanceView } from "@/components/views/tenant-maintenance-view"
import { TenantMessagesView } from "@/components/views/tenant-messages-view"
import { DashboardView } from "@/components/views/dashboard-view"
import { PropertiesView } from "@/components/views/properties-view"
import { TenantsView } from "@/components/views/tenants-view"
import { TenantDetailView } from "@/components/views/tenant-detail-view"
import { PropertyDetailView } from "@/components/views/property-detail-view"
import { AddTenantView } from "@/components/views/add-tenant-view"
import { PublicListingDetailView } from "@/components/views/public-listing-detail-view"
import { MaintenanceTicketDetailView } from "@/components/views/maintenance-ticket-detail-view"
import { DigitalInvoiceDetailView } from "@/components/views/digital-invoice-detail-view"
import { LeadDetailView } from "@/components/views/lead-detail-view"
import { BrokerDetailView } from "@/components/views/broker-detail-view"
import { VendorDetailView } from "@/components/views/vendor-detail-view"
import { BuildingVerificationView } from "@/components/views/building-verification-view"
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
import { SystemAdminView } from "@/components/views/system-admin-view"
import {
  getPropertyById,
  getTenantById,
  getMaintenanceTicketDetail,
  getInvoiceDetail,
  getLeadDetail,
  getPublicListingDetail,
  getBrokerDetail,
  getVendorDetail,
  getBuildingVerification,
} from "@/lib/data"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import type { TenantViewKey } from "@/components/tenant-sidebar"
import { useResponsive } from "@/hooks/use-responsive"

type ActiveView =
  | ViewKey
  | "detail"
  | "add-tenant"
  | "system-subscription"
  | "lease-settlement"
  | "listing-detail"
  | "maintenance-ticket-detail"
  | "invoice-detail"
  | "lead-detail"
  | "broker-detail"
  | "vendor-detail"
  | "building-verification"
type DetailKind = "tenant" | "property" | "listing" | "maintenance-ticket" | "invoice" | "lead" | "broker" | "vendor" | "building"
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
  const { isTablet } = useResponsive()
  
  const [userRole, setUserRole] = useState<UserRole>("admin")
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")
  const [tenantView, setTenantView] = useState<TenantViewKey>("my-lease")
  const [systemAdminView, setSystemAdminView] = useState<SystemAdminViewKey>("moderation")
  const [selected, setSelected] = useState<Selected>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingSelection>("abuki")
  const [cameFromAdmin, setCameFromAdmin] = useState(false)
  
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Sidebar collapse state (for tablet view)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Auto-collapse sidebar on tablet
  const effectiveCollapsed = isTablet ? true : sidebarCollapsed

  const handleRoleToggle = () => {
    setUserRole((prev) => {
      if (prev === "admin") return "tenant"
      if (prev === "tenant") return "system-admin"
      return "admin"
    })
    setMobileMenuOpen(false)
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
    setMobileMenuOpen(false)
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

  const openListingDetail = (id: string) => {
    setSelected({ kind: "listing", id })
    setActiveView("listing-detail")
  }

  const openMaintenanceTicketDetail = (id: string) => {
    setSelected({ kind: "maintenance-ticket", id })
    setActiveView("maintenance-ticket-detail")
  }

  const openInvoiceDetail = (id: string) => {
    setSelected({ kind: "invoice", id })
    setActiveView("invoice-detail")
  }

  const openLeadDetail = (id: string) => {
    setSelected({ kind: "lead", id })
    setActiveView("lead-detail")
  }

  const openBrokerDetail = (id: string) => {
    setSelected({ kind: "broker", id })
    setActiveView("broker-detail")
  }

  const openVendorDetail = (id: string) => {
    setSelected({ kind: "vendor", id })
    setActiveView("vendor-detail")
  }

  const openBuildingVerification = (id: string) => {
    setSelected({ kind: "building", id })
    setActiveView("building-verification")
  }

  const sidebarActive: ViewKey =
    activeView === "detail"
      ? selected?.kind === "tenant"
        ? "tenants"
        : "properties"
      : activeView === "add-tenant" || activeView === "lease-settlement"
        ? "tenants"
        : activeView === "listing-detail"
          ? "marketplace"
          : activeView === "maintenance-ticket-detail"
            ? "maintenance"
            : activeView === "invoice-detail"
              ? "billing"
              : activeView === "lead-detail"
                ? "waitlist"
                : activeView === "broker-detail"
                  ? "brokers"
                  : activeView === "vendor-detail"
                    ? "vendors"
                    : activeView === "building-verification"
                      ? "dashboard"
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
          : activeView === "listing-detail"
            ? "Listing Details"
            : activeView === "maintenance-ticket-detail"
              ? "Maintenance Ticket"
              : activeView === "invoice-detail"
                ? "Invoice Details"
                : activeView === "lead-detail"
                  ? "Lead Details"
                  : activeView === "broker-detail"
                    ? "Broker Profile"
                    : activeView === "vendor-detail"
                      ? "Vendor Profile"
                      : activeView === "building-verification"
                        ? "Building Verification"
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
  const selectedListing =
    activeView === "listing-detail" && selected?.kind === "listing"
      ? getPublicListingDetail(selected.id)
      : undefined
  const selectedMaintenanceTicket =
    activeView === "maintenance-ticket-detail" && selected?.kind === "maintenance-ticket"
      ? getMaintenanceTicketDetail(selected.id)
      : undefined
  const selectedInvoice =
    activeView === "invoice-detail" && selected?.kind === "invoice"
      ? getInvoiceDetail(selected.id)
      : undefined
  const selectedLead =
    activeView === "lead-detail" && selected?.kind === "lead"
      ? getLeadDetail(selected.id)
      : undefined
  const selectedBroker =
    activeView === "broker-detail" && selected?.kind === "broker"
      ? getBrokerDetail(selected.id)
      : undefined
  const selectedVendor =
    activeView === "vendor-detail" && selected?.kind === "vendor"
      ? getVendorDetail(selected.id)
      : undefined
  const selectedBuildingVerification =
    activeView === "building-verification" && selected?.kind === "building"
      ? getBuildingVerification(selected.id)
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
        {/* Desktop Sidebar */}
        <SystemAdminSidebar
          activeView={systemAdminView}
          onNavigate={setSystemAdminView}
          onLogout={() => setUserRole("admin")}
          collapsed={effectiveCollapsed}
        />

        {/* Mobile Navigation Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>System admin navigation menu</SheetDescription>
            </SheetHeader>
            <SystemAdminSidebarMobile
              activeView={systemAdminView}
              onNavigate={setSystemAdminView}
              onLogout={() => setUserRole("admin")}
              onClose={() => setMobileMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader
            title={systemAdminTitleMap[systemAdminView]}
            userRole={userRole}
            onRoleToggle={handleRoleToggle}
            onMenuToggle={() => setMobileMenuOpen(true)}
            sidebarCollapsed={effectiveCollapsed}
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* TV max-width container */}
          <main className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-10 lg:py-8 2xl:px-12 2xl:py-10">
            <div className="mx-auto max-w-[1800px]">
              <SystemAdminView view={systemAdminView} />
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Tenant Portal Render
  if (userRole === "tenant") {
    return (
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        {/* Desktop Sidebar - hidden on mobile */}
        <TenantSidebar
          activeView={tenantView}
          onNavigate={setTenantView}
          collapsed={effectiveCollapsed}
        />

        <div className="flex min-w-0 flex-1 flex-col pb-16 md:pb-0">
          <AppHeader
            title={tenantTitleMap[tenantView]}
            userRole={userRole}
            onRoleToggle={handleRoleToggle}
            showMenuButton={false}
            sidebarCollapsed={effectiveCollapsed}
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* TV max-width container */}
          <main className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-10 lg:py-8 2xl:px-12 2xl:py-10">
            <div className="mx-auto max-w-[1800px]">
              {tenantView === "my-lease" && <TenantDashboardView onNavigate={setTenantView} />}
              {tenantView === "invoices" && <TenantInvoicesView />}
              {tenantView === "maintenance" && <TenantMaintenanceView />}
              {tenantView === "messages" && <TenantMessagesView />}
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <TenantBottomNav activeView={tenantView} onNavigate={setTenantView} />
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
      {/* Desktop Sidebar */}
      <AppSidebar
        activeView={sidebarActive}
        onNavigate={handleNavigate}
        selectedBuilding={selectedBuilding}
        onBuildingChange={handleBuildingChange}
        collapsed={effectiveCollapsed}
      />

      {/* Mobile Navigation Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main navigation menu</SheetDescription>
          </SheetHeader>
          <AppSidebarMobile
            activeView={sidebarActive}
            onNavigate={handleNavigate}
            selectedBuilding={selectedBuilding}
            onBuildingChange={handleBuildingChange}
            onClose={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          title={headerTitle}
          showAddTenant={showAddTenant}
          onAddTenant={openAddTenant}
          userRole={userRole}
          onRoleToggle={handleRoleToggle}
          onMenuToggle={() => setMobileMenuOpen(true)}
          sidebarCollapsed={effectiveCollapsed}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* TV max-width container with responsive padding */}
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-10 lg:py-8 2xl:px-12 2xl:py-10">
          <div className="mx-auto max-w-[1800px]">
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
            {activeView === "listing-detail" && selectedListing && (
              <PublicListingDetailView
                listing={selectedListing}
                onBack={() => navigate("marketplace")}
              />
            )}
            {activeView === "maintenance-ticket-detail" && selectedMaintenanceTicket && (
              <MaintenanceTicketDetailView ticket={selectedMaintenanceTicket} />
            )}
            {activeView === "invoice-detail" && selectedInvoice && (
              <DigitalInvoiceDetailView invoice={selectedInvoice} />
            )}
            {activeView === "lead-detail" && selectedLead && (
              <LeadDetailView
                lead={selectedLead}
                onConvert={() => openAddTenant()}
              />
            )}
            {activeView === "broker-detail" && selectedBroker && (
              <BrokerDetailView
                broker={selectedBroker}
                onBack={() => navigate("brokers")}
              />
            )}
            {activeView === "vendor-detail" && selectedVendor && (
              <VendorDetailView
                vendor={selectedVendor}
                onBack={() => navigate("vendors")}
              />
            )}
            {activeView === "building-verification" && selectedBuildingVerification && (
              <BuildingVerificationView
                building={selectedBuildingVerification}
                onBack={() => navigate("dashboard")}
              />
            )}
          </div>
        </main>
      </div>

      {/* Live Chat Widget - Always visible */}
      <LiveChatWidget />
    </div>
  )
}
