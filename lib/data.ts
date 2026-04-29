import type { LeaseStatus, PaymentStatus } from "@/components/status-pills"

export type PropertyOccupancy = "Occupied" | "Vacant"

export type Building = {
  id: string
  name: string
  location: string
  totalUnits: number
  occupiedUnits: number
  openMaintenanceTickets: number
  monthlyRevenue: string
  image?: string
}

export const buildings: Building[] = [
  {
    id: "abuki",
    name: "Abuki Bldg.",
    location: "Bole, Addis Ababa",
    totalUnits: 120,
    occupiedUnits: 108,
    openMaintenanceTickets: 12,
    monthlyRevenue: "ETB 1.8M",
  },
]

// Utility Meter Readings Data (Step 29)
export type UtilityReading = {
  id: string
  roomNo: string
  tenantId: string
  tenantName: string
  previousReading: number
  currentReading: number
  ratePerUnit: number // ETB per kWh
  readingDate: string
}

export const utilityReadings: UtilityReading[] = [
  {
    id: "ur-001",
    roomNo: "310",
    tenantId: "t-alemu",
    tenantName: "Getachew Temesgen",
    previousReading: 1250,
    currentReading: 1380,
    ratePerUnit: 2.5,
    readingDate: "Apr 28, 2024",
  },
  {
    id: "ur-002",
    roomNo: "510",
    tenantId: "t-alemayehu",
    tenantName: "Alemayehu Goshu",
    previousReading: 890,
    currentReading: 945,
    ratePerUnit: 2.5,
    readingDate: "Apr 28, 2024",
  },
  {
    id: "ur-003",
    roomNo: "212",
    tenantId: "t-gete",
    tenantName: "Gete Alemayehu",
    previousReading: 720,
    currentReading: 810,
    ratePerUnit: 2.5,
    readingDate: "Apr 28, 2024",
  },
  {
    id: "ur-004",
    roomNo: "405",
    tenantId: "t-jenbere",
    tenantName: "Jenbere Gutu",
    previousReading: 560,
    currentReading: 620,
    ratePerUnit: 2.5,
    readingDate: "Apr 28, 2024",
  },
]

// Waitlist / Lead Data (Step 32)
export type LeadStatus = "Contacted" | "Interested" | "Waiting"

export type WaitlistLead = {
  id: string
  name: string
  phone: string
  email: string
  desiredSize: string
  budgetRange: string
  desiredFloor: string
  dateJoined: string
  status: LeadStatus
}

export const waitlistLeads: WaitlistLead[] = [
  {
    id: "lead-001",
    name: "Abebe Kebede",
    phone: "+251 911 23 45 67",
    email: "abebe.k@gmail.com",
    desiredSize: "30 sq.m",
    budgetRange: "ETB 12,000 - 18,000",
    desiredFloor: "3rd Floor",
    dateJoined: "Apr 25, 2024",
    status: "Interested",
  },
  {
    id: "lead-002",
    name: "Tigist Haile",
    phone: "+251 922 34 56 78",
    email: "tigist.h@gmail.com",
    desiredSize: "20 sq.m",
    budgetRange: "ETB 8,000 - 12,000",
    desiredFloor: "2nd Floor",
    dateJoined: "Apr 22, 2024",
    status: "Contacted",
  },
  {
    id: "lead-003",
    name: "Yonas Tesfaye",
    phone: "+251 933 45 67 89",
    email: "yonas.t@gmail.com",
    desiredSize: "40 sq.m",
    budgetRange: "ETB 20,000 - 25,000",
    desiredFloor: "5th Floor",
    dateJoined: "Apr 20, 2024",
    status: "Waiting",
  },
  {
    id: "lead-004",
    name: "Hana Mengistu",
    phone: "+251 944 56 78 90",
    email: "hana.m@gmail.com",
    desiredSize: "25 sq.m",
    budgetRange: "ETB 10,000 - 15,000",
    desiredFloor: "4th Floor",
    dateJoined: "Apr 18, 2024",
    status: "Interested",
  },
]


export type SubscriptionPlan = {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  recommended?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan-basic",
    name: "Basic",
    price: "ETB 5,000",
    period: "per month",
    features: ["Up to 20 units", "Basic reporting", "Email support"],
  },
  {
    id: "plan-pro",
    name: "Professional",
    price: "ETB 12,000",
    period: "per month",
    features: ["Up to 100 units", "Advanced reporting", "Priority support", "API access"],
    recommended: true,
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    price: "ETB 25,000",
    period: "per month",
    features: ["Unlimited units", "Custom reporting", "Dedicated support", "Full API access", "Custom integrations"],
  },
]

export type SubscriptionPayment = {
  id: string
  date: string
  amount: string
  status: "Paid" | "Pending" | "Failed"
  method: string
}

export const subscriptionPayments: SubscriptionPayment[] = [
  { id: "sp-001", date: "Apr 1, 2024", amount: "ETB 12,000", status: "Paid", method: "Telebirr" },
  { id: "sp-002", date: "Mar 1, 2024", amount: "ETB 12,000", status: "Paid", method: "CBE Birr" },
  { id: "sp-003", date: "Feb 1, 2024", amount: "ETB 12,000", status: "Paid", method: "Telebirr" },
  { id: "sp-004", date: "Jan 1, 2024", amount: "ETB 12,000", status: "Paid", method: "Chapa" },
]

// Tax Rules Data (Step 25)
export type TaxRule = {
  id: string
  name: string
  rate: number
  active: boolean
}

export const taxRules: TaxRule[] = [
  { id: "tax-001", name: "VAT", rate: 15, active: true },
  { id: "tax-002", name: "Service Tax", rate: 2, active: true },
  { id: "tax-003", name: "Withholding Tax", rate: 2, active: false },
]

// Workspace Verification Queue (Step 27)
export type WorkspaceSubmission = {
  id: string
  ownerName: string
  buildingName: string
  location: string
  submittedDate: string
  status: "Pending" | "Approved" | "Rejected"
  documentCount: number
}

export const workspaceSubmissions: WorkspaceSubmission[] = [
  {
    id: "ws-001",
    ownerName: "Kebede Teshome",
    buildingName: "Sunshine Tower",
    location: "Bole, Addis Ababa",
    submittedDate: "Apr 28, 2024",
    status: "Pending",
    documentCount: 5,
  },
  {
    id: "ws-002",
    ownerName: "Almaz Bekele",
    buildingName: "Unity Plaza",
    location: "Piassa, Addis Ababa",
    submittedDate: "Apr 27, 2024",
    status: "Pending",
    documentCount: 4,
  },
  {
    id: "ws-003",
    ownerName: "Dawit Hailu",
    buildingName: "Commerce Center",
    location: "Mexico, Addis Ababa",
    submittedDate: "Apr 25, 2024",
    status: "Pending",
    documentCount: 6,
  },
]

// Credit Service Partners (Step 27)
export type CreditPartner = {
  id: string
  name: string
  type: "Bank" | "Fintech"
  integrationStatus: "Active" | "Inactive" | "Pending"
  totalCreditIssued: string
  apiKeyStatus: "Configured" | "Needs Setup"
}

export const creditPartners: CreditPartner[] = [
  {
    id: "cp-001",
    name: "Commercial Bank of Ethiopia",
    type: "Bank",
    integrationStatus: "Active",
    totalCreditIssued: "ETB 2.4M",
    apiKeyStatus: "Configured",
  },
  {
    id: "cp-002",
    name: "Awash Bank",
    type: "Bank",
    integrationStatus: "Active",
    totalCreditIssued: "ETB 1.8M",
    apiKeyStatus: "Configured",
  },
  {
    id: "cp-003",
    name: "M-Birr",
    type: "Fintech",
    integrationStatus: "Pending",
    totalCreditIssued: "ETB 0",
    apiKeyStatus: "Needs Setup",
  },
]

// Space Type for Marketplace (Step 28)
export type SpaceType = "Shop" | "Office" | "Co-working" | "Event Space"


export function getBuildingById(id: string): Building | undefined {
  return buildings.find((b) => b.id === id)
}

export function getPortfolioStats() {
  const totalBuildings = buildings.length
  const totalTenants = buildings.reduce((sum, b) => sum + b.occupiedUnits, 0)
  const totalUnits = buildings.reduce((sum, b) => sum + b.totalUnits, 0)
  const occupancyRate = Math.round((totalTenants / totalUnits) * 100)
  const totalRevenue = "ETB 4.5M"
  return { totalBuildings, totalTenants, occupancyRate, totalRevenue }
}

export type Property = {
  id: string
  room: string
  floor: string
  squareFootage: string
  rentNumber: string
  occupancy: PropertyOccupancy
  lease: LeaseStatus
  payment: PaymentStatus
  leaseStartDate: string
  leaseExpirationDate: string
  lastPayDay: string
  outstandingBalance: string
  leaseDuration: string
  rentAmount: string
  outstandingBalanceSecondary: string
  companyName: string
  tenantId: string | null
  leaseAgreementFile: string
}

export type Tenant = {
  id: string
  firstName: string
  lastName: string
  avatar: string
  phone: string
  email: string
  region: string
  subcity: string
  woreda: string
  houseNo: string
  roomNo: string
  floor: string
  squareFootage: string
  payment: PaymentStatus
  lease: LeaseStatus
  leaseStartDate: string
  leaseExpirationDate: string
  lastPayDay: string
  outstandingBalance: string
  leaseDuration: string
  rentAmount: string
  outstandingBalanceSecondary: string
  companyName: string
  tradeLicenseFile: string
  leaseAgreementFile: string
  propertyId: string
}

export const properties: Property[] = [
  {
    id: "p-405",
    room: "405",
    floor: "4th",
    squareFootage: "30 sq.m",
    rentNumber: "15,000",
    occupancy: "Occupied",
    lease: "Upcoming",
    payment: "Paid",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Nicomas Digitals",
    tenantId: "t-jenbere",
    leaseAgreementFile: "Nico 2.0 V.pdf",
  },
  {
    id: "p-510",
    room: "510",
    floor: "5th",
    squareFootage: "20 sq.m",
    rentNumber: "15,000",
    occupancy: "Occupied",
    lease: "Renewed",
    payment: "Paid",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Goshu Holdings",
    tenantId: "t-alemayehu",
    leaseAgreementFile: "Lease-510.pdf",
  },
  {
    id: "p-310",
    room: "310",
    floor: "3rd",
    squareFootage: "20 sq.m",
    rentNumber: "15,000",
    occupancy: "Occupied",
    lease: "Renewed",
    payment: "Paid",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Nicomas Digitals",
    tenantId: "t-alemu",
    leaseAgreementFile: "Nico 2.0 V.pdf",
  },
  {
    id: "p-305",
    room: "305",
    floor: "3rd",
    squareFootage: "10 sq.m",
    rentNumber: "12,000",
    occupancy: "Occupied",
    lease: "Expired",
    payment: "Unpaid",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Asayta Trading",
    tenantId: null,
    leaseAgreementFile: "Lease-305.pdf",
  },
  {
    id: "p-212",
    room: "212",
    floor: "2nd",
    squareFootage: "15 sq.m",
    rentNumber: "13,500",
    occupancy: "Occupied",
    lease: "Terminated",
    payment: "Unpaid",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Bekalu Group",
    tenantId: "t-gete",
    leaseAgreementFile: "Lease-212.pdf",
  },
]

export const tenants: Tenant[] = [
  {
    id: "t-alemu",
    firstName: "Getachew",
    lastName: "Temesgen",
    avatar: "/professional-headshot.png",
    phone: "+251 987 67 56 44",
    email: "gech.temu@gmail.com",
    region: "Addis Ababa",
    subcity: "Akaki Kality",
    woreda: "10",
    houseNo: "310",
    roomNo: "410",
    floor: "4th",
    squareFootage: "120 sq.m",
    payment: "Unpaid",
    lease: "Expired",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Nicomas Digitals",
    tradeLicenseFile: "Nico 2.0 V.pdf",
    leaseAgreementFile: "Agreement Final.pdf",
    propertyId: "p-310",
  },
  {
    id: "t-alemayehu",
    firstName: "Alemayehu",
    lastName: "Goshu",
    avatar: "/professional-man-headshot-2.png",
    phone: "+251 970 74 22 50",
    email: "alemayehu.g@gmail.com",
    region: "Addis Ababa",
    subcity: "Bole",
    woreda: "03",
    houseNo: "510",
    roomNo: "510",
    floor: "5th",
    squareFootage: "20 sq.m",
    payment: "Paid",
    lease: "Renewed",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Goshu Holdings",
    tradeLicenseFile: "Goshu-license.pdf",
    leaseAgreementFile: "Goshu-agreement.pdf",
    propertyId: "p-510",
  },
  {
    id: "t-gete",
    firstName: "Gete",
    lastName: "Alemayehu",
    avatar: "/professional-woman-headshot.png",
    phone: "+251 970 74 22 50",
    email: "gete.alem@gmail.com",
    region: "Addis Ababa",
    subcity: "Yeka",
    woreda: "07",
    houseNo: "212",
    roomNo: "212",
    floor: "2nd",
    squareFootage: "15 sq.m",
    payment: "Paid",
    lease: "Expired",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Bekalu Group",
    tradeLicenseFile: "Bekalu-license.pdf",
    leaseAgreementFile: "Bekalu-agreement.pdf",
    propertyId: "p-212",
  },
  {
    id: "t-jenbere",
    firstName: "Jenbere",
    lastName: "Gutu",
    avatar: "/professional-man-headshot-3.png",
    phone: "+251 970 74 22 50",
    email: "jenbere.g@gmail.com",
    region: "Addis Ababa",
    subcity: "Lideta",
    woreda: "04",
    houseNo: "405",
    roomNo: "405",
    floor: "4th",
    squareFootage: "30 sq.m",
    payment: "Paid",
    lease: "Upcoming",
    leaseStartDate: "Jan 10, 2024",
    leaseExpirationDate: "Mar 25, 2024",
    lastPayDay: "Feb 10, 2024",
    outstandingBalance: "ETB 7,500",
    leaseDuration: "12 Month",
    rentAmount: "ETB 7,500",
    outstandingBalanceSecondary: "ETB 7,500",
    companyName: "Gutu Trading",
    tradeLicenseFile: "Gutu-license.pdf",
    leaseAgreementFile: "Gutu-agreement.pdf",
    propertyId: "p-405",
  },
]

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function getTenantNameForProperty(p: Property): string {
  if (!p.tenantId) return "—"
  const t = getTenantById(p.tenantId)
  return t ? `${t.firstName} ${t.lastName}` : "—"
}

// Billing & Invoices
export type InvoiceStatus = "Paid" | "Pending" | "Overdue"

export type Invoice = {
  id: string
  tenantName: string
  roomNo: string
  amountDue: string
  dueDate: string
  status: InvoiceStatus
}

export const invoices: Invoice[] = [
  {
    id: "INV-001",
    tenantName: "Getachew Temesgen",
    roomNo: "410",
    amountDue: "ETB 15,000",
    dueDate: "May 5, 2024",
    status: "Pending",
  },
  {
    id: "INV-002",
    tenantName: "Alemayehu Goshu",
    roomNo: "510",
    amountDue: "ETB 15,000",
    dueDate: "Apr 28, 2024",
    status: "Paid",
  },
  {
    id: "INV-003",
    tenantName: "Gete Alemayehu",
    roomNo: "212",
    amountDue: "ETB 13,500",
    dueDate: "Apr 15, 2024",
    status: "Overdue",
  },
  {
    id: "INV-004",
    tenantName: "Jenbere Gutu",
    roomNo: "405",
    amountDue: "ETB 15,000",
    dueDate: "May 10, 2024",
    status: "Pending",
  },
  {
    id: "INV-005",
    tenantName: "Bekalu Tadesse",
    roomNo: "305",
    amountDue: "ETB 12,000",
    dueDate: "Apr 20, 2024",
    status: "Overdue",
  },
]

export type Receipt = {
  id: string
  tenantName: string
  roomNo: string
  amountPaid: string
  paymentDate: string
  paymentMethod: string
}

export const receipts: Receipt[] = [
  {
    id: "RCP-001",
    tenantName: "Alemayehu Goshu",
    roomNo: "510",
    amountPaid: "ETB 15,000",
    paymentDate: "Apr 28, 2024",
    paymentMethod: "Telebirr",
  },
  {
    id: "RCP-002",
    tenantName: "Getachew Temesgen",
    roomNo: "410",
    amountPaid: "ETB 15,000",
    paymentDate: "Apr 5, 2024",
    paymentMethod: "CBE Birr",
  },
]

export type CreditRequest = {
  id: string
  tenantName: string
  roomNo: string
  requestedAmount: string
  requestDate: string
  status: "Approved" | "Pending" | "Rejected"
}

export const creditRequests: CreditRequest[] = [
  {
    id: "CR-001",
    tenantName: "Gete Alemayehu",
    roomNo: "212",
    requestedAmount: "ETB 27,000",
    requestDate: "Apr 10, 2024",
    status: "Pending",
  },
  {
    id: "CR-002",
    tenantName: "Bekalu Tadesse",
    roomNo: "305",
    requestedAmount: "ETB 24,000",
    requestDate: "Apr 8, 2024",
    status: "Approved",
  },
]

// Maintenance
export type MaintenancePriority = "High" | "Medium" | "Low"
export type MaintenanceStatus = "Open" | "In Progress" | "Resolved"

export type MaintenanceTicket = {
  id: string
  unitNumber: string
  title: string
  description: string
  priority: MaintenancePriority
  status: MaintenanceStatus
  dateSubmitted: string
  assignedTo: {
    name: string
    avatar: string
  }
}

// Marketplace Listings
export type MarketplaceListing = {
  id: string
  buildingName: string
  location: string
  officeSize: string
  floor: string
  monthlyRent: string
  amenities: string[]
  available: boolean
  image?: string
}

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "ml-001",
    buildingName: "Abuki Bldg.",
    location: "Bole, Addis Ababa",
    officeSize: "25 sq.m",
    floor: "3rd Floor",
    monthlyRent: "ETB 12,000",
    amenities: ["WiFi", "Parking", "24/7 Security"],
    available: true,
  },
  {
    id: "ml-002",
    buildingName: "Zefmesh Grand Mall",
    location: "Kazanchis, Addis Ababa",
    officeSize: "40 sq.m",
    floor: "5th Floor",
    monthlyRent: "ETB 22,000",
    amenities: ["WiFi", "Parking", "Conference Room"],
    available: true,
  },
  {
    id: "ml-003",
    buildingName: "Merkato Tower",
    location: "Merkato, Addis Ababa",
    officeSize: "15 sq.m",
    floor: "2nd Floor",
    monthlyRent: "ETB 8,500",
    amenities: ["WiFi", "Elevator"],
    available: true,
  },
  {
    id: "ml-004",
    buildingName: "Abuki Bldg.",
    location: "Bole, Addis Ababa",
    officeSize: "50 sq.m",
    floor: "6th Floor",
    monthlyRent: "ETB 28,000",
    amenities: ["WiFi", "Parking", "Private Bathroom", "Kitchen"],
    available: true,
  },
  {
    id: "ml-005",
    buildingName: "Zefmesh Grand Mall",
    location: "Kazanchis, Addis Ababa",
    officeSize: "30 sq.m",
    floor: "4th Floor",
    monthlyRent: "ETB 18,000",
    amenities: ["WiFi", "Parking"],
    available: true,
  },
  {
    id: "ml-006",
    buildingName: "Merkato Tower",
    location: "Merkato, Addis Ababa",
    officeSize: "20 sq.m",
    floor: "3rd Floor",
    monthlyRent: "ETB 10,000",
    amenities: ["WiFi", "24/7 Security"],
    available: true,
  },
]

// Financial Reports Data
export type FinancialReport = {
  totalRevenue: string
  totalExpenses: string
  netOperatingIncome: string
  outstandingDebt: string
  revenueChange: number
  expenseChange: number
}

export const financialReport: FinancialReport = {
  totalRevenue: "ETB 4,520,000",
  totalExpenses: "ETB 1,280,000",
  netOperatingIncome: "ETB 3,240,000",
  outstandingDebt: "ETB 485,000",
  revenueChange: 12.5,
  expenseChange: -3.2,
}

export const monthlyFinancials = [
  { month: "Jan", revenue: 680000, expenses: 195000 },
  { month: "Feb", revenue: 720000, expenses: 210000 },
  { month: "Mar", revenue: 750000, expenses: 205000 },
  { month: "Apr", revenue: 780000, expenses: 220000 },
  { month: "May", revenue: 795000, expenses: 225000 },
  { month: "Jun", revenue: 795000, expenses: 225000 },
]

export const expenseBreakdown = [
  { category: "Maintenance", amount: 380000, percentage: 30 },
  { category: "Salaries", amount: 510000, percentage: 40 },
  { category: "Utilities", amount: 255000, percentage: 20 },
  { category: "Taxes", amount: 135000, percentage: 10 },
]

// Documents Data
export type DocumentFolder = {
  id: string
  name: string
  type: "tenant" | "building"
  fileCount: number
}

export type DocumentFile = {
  id: string
  name: string
  type: string
  uploadedDate: string
  size: string
  folderId: string
}

export const documentFolders: DocumentFolder[] = [
  { id: "f-001", name: "Nicomas Digitals", type: "tenant", fileCount: 5 },
  { id: "f-002", name: "Goshu Holdings", type: "tenant", fileCount: 3 },
  { id: "f-003", name: "Building Blueprints", type: "building", fileCount: 8 },
  { id: "f-004", name: "Legal Documents", type: "building", fileCount: 12 },
  { id: "f-005", name: "Bekalu Group", type: "tenant", fileCount: 4 },
  { id: "f-006", name: "Insurance Papers", type: "building", fileCount: 6 },
]

export const recentDocuments: DocumentFile[] = [
  { id: "d-001", name: "Trade License - Nicomas.pdf", type: "PDF", uploadedDate: "Apr 28, 2024", size: "2.4 MB", folderId: "f-001" },
  { id: "d-002", name: "Lease Agreement - Goshu.pdf", type: "PDF", uploadedDate: "Apr 27, 2024", size: "1.8 MB", folderId: "f-002" },
  { id: "d-003", name: "Floor Plan - 4th Floor.dwg", type: "DWG", uploadedDate: "Apr 25, 2024", size: "5.2 MB", folderId: "f-003" },
  { id: "d-004", name: "ID Copy - Jenbere Gutu.jpg", type: "Image", uploadedDate: "Apr 24, 2024", size: "890 KB", folderId: "f-001" },
  { id: "d-005", name: "Tax Certificate 2024.pdf", type: "PDF", uploadedDate: "Apr 22, 2024", size: "1.1 MB", folderId: "f-004" },
]

// Messages Data
export type Conversation = {
  id: string
  tenantName: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

export type Message = {
  id: string
  conversationId: string
  sender: "admin" | "tenant"
  content: string
  timestamp: string
}

export const conversations: Conversation[] = [
  { id: "c-001", tenantName: "Getachew Temesgen", avatar: "/professional-headshot.png", lastMessage: "Thank you for the update on the maintenance request.", timestamp: "10:30 AM", unread: true },
  { id: "c-002", tenantName: "Alemayehu Goshu", avatar: "/professional-man-headshot-2.png", lastMessage: "I will send the payment receipt shortly.", timestamp: "Yesterday", unread: false },
  { id: "c-003", tenantName: "Gete Alemayehu", avatar: "/professional-woman-headshot.png", lastMessage: "Can we schedule a meeting to discuss the lease renewal?", timestamp: "Yesterday", unread: true },
  { id: "c-004", tenantName: "Jenbere Gutu", avatar: "/professional-man-headshot-3.png", lastMessage: "The office is perfect, thank you!", timestamp: "Apr 26", unread: false },
]

export const messages: Message[] = [
  { id: "m-001", conversationId: "c-001", sender: "tenant", content: "Hi, I wanted to follow up on my maintenance request for the A/C unit.", timestamp: "10:15 AM" },
  { id: "m-002", conversationId: "c-001", sender: "admin", content: "Hello Getachew, our technician will visit your office tomorrow between 9-11 AM.", timestamp: "10:25 AM" },
  { id: "m-003", conversationId: "c-001", sender: "tenant", content: "Thank you for the update on the maintenance request.", timestamp: "10:30 AM" },
]

// Team & Staff Data
export type StaffRole = "Accountant" | "Maintenance Supervisor" | "Branch Manager" | "Receptionist" | "Property Manager"
export type StaffStatus = "Active" | "Pending"

export type StaffMember = {
  id: string
  name: string
  email: string
  avatar: string
  role: StaffRole
  assignedBranch: string
  status: StaffStatus
}

export const staffMembers: StaffMember[] = [
  {
    id: "staff-001",
    name: "Tadesse Bekele",
    email: "tadesse.b@wrm.com",
    avatar: "/professional-man-headshot-2.png",
    role: "Maintenance Supervisor",
    assignedBranch: "All Portfolio",
    status: "Active",
  },
  {
    id: "staff-002",
    name: "Meron Haile",
    email: "meron.h@wrm.com",
    avatar: "/professional-woman-headshot.png",
    role: "Accountant",
    assignedBranch: "Zefmesh Mall Only",
    status: "Active",
  },
  {
    id: "staff-003",
    name: "Abebe Kebede",
    email: "abebe.k@wrm.com",
    avatar: "/professional-man-headshot-3.png",
    role: "Branch Manager",
    assignedBranch: "Abuki Bldg.",
    status: "Active",
  },
  {
    id: "staff-004",
    name: "Selam Girma",
    email: "selam.g@wrm.com",
    avatar: "/professional-headshot.png",
    role: "Receptionist",
    assignedBranch: "Merkato Tower",
    status: "Pending",
  },
]

export type Permission = {
  key: string
  label: string
  description: string
}

export const permissions: Permission[] = [
  { key: "view_financials", label: "Can view financials", description: "Access to financial reports and billing" },
  { key: "edit_leases", label: "Can edit leases", description: "Create and modify lease agreements" },
  { key: "approve_credit", label: "Can approve credit requests", description: "Approve or reject tenant credit requests" },
  { key: "dispatch_work_orders", label: "Can dispatch work orders", description: "Assign and manage maintenance tasks" },
]

// Automations Data
export type Automation = {
  id: string
  name: string
  description: string
  rule: string
  active: boolean
  icon: string
}

export const automations: Automation[] = [
  {
    id: "auto-001",
    name: "Late Fee Auto-Billing",
    description: "Automatically applies late fees to overdue invoices",
    rule: "If invoice is 3 days overdue, add 5% penalty",
    active: true,
    icon: "receipt",
  },
  {
    id: "auto-002",
    name: "Lease Renewal Reminders",
    description: "Sends notifications before lease expiration",
    rule: "Send SMS/Email 60 days before expiration",
    active: true,
    icon: "bell",
  },
  {
    id: "auto-003",
    name: "Invoice Generation",
    description: "Automatically creates and sends monthly invoices",
    rule: "Draft and send invoices on the 25th of every month",
    active: true,
    icon: "file-text",
  },
]

export const automationTriggers = [
  "Invoice is overdue",
  "Lease expires within X days",
  "New tenant is added",
  "Maintenance ticket is created",
  "Payment is received",
]

export const automationActions = [
  "Send email notification",
  "Send SMS notification",
  "Apply late fee",
  "Generate invoice",
  "Create reminder task",
  "Notify property manager",
]

// Help Center Data
export type FAQItem = {
  id: string
  title: string
  icon: string
}

export const faqItems: FAQItem[] = [
  { id: "faq-001", title: "How to process a move-out", icon: "door-open" },
  { id: "faq-002", title: "Setting up Telebirr payments", icon: "credit-card" },
  { id: "faq-003", title: "Generating Tax Reports", icon: "file-text" },
  { id: "faq-004", title: "Troubleshooting E-Signatures", icon: "pen-tool" },
]

export const maintenanceTickets: MaintenanceTicket[] = [
  {
    id: "MT-001",
    unitNumber: "Rm 310",
    title: "Leaking A/C Unit",
    description: "Water leaking from the air conditioning unit onto the floor.",
    priority: "High",
    status: "Open",
    dateSubmitted: "Apr 28, 2024",
    assignedTo: {
      name: "Tadesse Bekele",
      avatar: "/professional-man-headshot-2.png",
    },
  },
  {
    id: "MT-002",
    unitNumber: "Rm 405",
    title: "Broken Door Lock",
    description: "Main entrance door lock is not functioning properly.",
    priority: "High",
    status: "Open",
    dateSubmitted: "Apr 27, 2024",
    assignedTo: {
      name: "Abebe Kebede",
      avatar: "/professional-man-headshot-3.png",
    },
  },
  {
    id: "MT-003",
    unitNumber: "Rm 510",
    title: "Flickering Lights",
    description: "Office lights are flickering intermittently.",
    priority: "Low",
    status: "In Progress",
    dateSubmitted: "Apr 25, 2024",
    assignedTo: {
      name: "Tadesse Bekele",
      avatar: "/professional-man-headshot-2.png",
    },
  },
  {
    id: "MT-004",
    unitNumber: "Rm 212",
    title: "Clogged Sink",
    description: "Bathroom sink is draining very slowly.",
    priority: "Medium",
    status: "In Progress",
    dateSubmitted: "Apr 24, 2024",
    assignedTo: {
      name: "Abebe Kebede",
      avatar: "/professional-man-headshot-3.png",
    },
  },
  {
    id: "MT-005",
    unitNumber: "Rm 305",
    title: "Window Won't Close",
    description: "Office window is stuck and won't close properly.",
    priority: "Medium",
    status: "Resolved",
    dateSubmitted: "Apr 20, 2024",
    assignedTo: {
      name: "Tadesse Bekele",
      avatar: "/professional-man-headshot-2.png",
    },
  },
  {
    id: "MT-006",
    unitNumber: "Rm 410",
    title: "Electrical Outlet Issue",
    description: "Wall outlet not working in the main office area.",
    priority: "Low",
    status: "Resolved",
    dateSubmitted: "Apr 18, 2024",
    assignedTo: {
      name: "Abebe Kebede",
      avatar: "/professional-man-headshot-3.png",
    },
  },
]

// Broker (Delala) Data (Step 33)
export type Broker = {
  id: string
  name: string
  phone: string
  licenseNo: string
  totalReferrals: number
  unpaidCommissions: string
}

export const brokers: Broker[] = [
  {
    id: "broker-001",
    name: "Meseret Taye",
    phone: "+251 911 22 33 44",
    licenseNo: "BRK-2024-001",
    totalReferrals: 8,
    unpaidCommissions: "ETB 45,000",
  },
  {
    id: "broker-002",
    name: "Samuel Girma",
    phone: "+251 922 33 44 55",
    licenseNo: "BRK-2024-002",
    totalReferrals: 12,
    unpaidCommissions: "ETB 15,000",
  },
  {
    id: "broker-003",
    name: "Helen Yohannes",
    phone: "+251 933 44 55 66",
    licenseNo: "BRK-2024-003",
    totalReferrals: 5,
    unpaidCommissions: "ETB 0",
  },
]

export type CommissionRecord = {
  id: string
  brokerId: string
  brokerName: string
  leaseId: string
  roomNo: string
  tenantName: string
  commissionAmount: string
  dateEarned: string
  status: "Pending" | "Paid"
  paidDate?: string
}

export const commissionRecords: CommissionRecord[] = [
  {
    id: "comm-001",
    brokerId: "broker-001",
    brokerName: "Meseret Taye",
    leaseId: "lease-310",
    roomNo: "310",
    tenantName: "Getachew Temesgen",
    commissionAmount: "ETB 15,000",
    dateEarned: "Mar 15, 2024",
    status: "Pending",
  },
  {
    id: "comm-002",
    brokerId: "broker-001",
    brokerName: "Meseret Taye",
    leaseId: "lease-405",
    roomNo: "405",
    tenantName: "Jenbere Gutu",
    commissionAmount: "ETB 15,000",
    dateEarned: "Feb 28, 2024",
    status: "Pending",
  },
  {
    id: "comm-003",
    brokerId: "broker-002",
    brokerName: "Samuel Girma",
    leaseId: "lease-510",
    roomNo: "510",
    tenantName: "Alemayehu Goshu",
    commissionAmount: "ETB 15,000",
    dateEarned: "Jan 20, 2024",
    status: "Paid",
    paidDate: "Feb 5, 2024",
  },
]

// Property Assets Data (Step 35)
export type AssetCondition = "New" | "Good" | "Damaged"

export type PropertyAsset = {
  id: string
  propertyId: string
  name: string
  serialNumber: string
  condition: AssetCondition
  photoUrl: string
  lastInspected: string
}

export const propertyAssets: PropertyAsset[] = [
  {
    id: "asset-001",
    propertyId: "p-310",
    name: "Split A/C Unit",
    serialNumber: "AC-2024-001",
    condition: "Good",
    photoUrl: "/placeholder.svg",
    lastInspected: "Apr 15, 2024",
  },
  {
    id: "asset-002",
    propertyId: "p-310",
    name: "Office Desk",
    serialNumber: "DSK-2024-001",
    condition: "New",
    photoUrl: "/placeholder.svg",
    lastInspected: "Apr 15, 2024",
  },
  {
    id: "asset-003",
    propertyId: "p-310",
    name: "Office Chair",
    serialNumber: "CHR-2024-001",
    condition: "Good",
    photoUrl: "/placeholder.svg",
    lastInspected: "Apr 15, 2024",
  },
  {
    id: "asset-004",
    propertyId: "p-405",
    name: "Backup Generator",
    serialNumber: "GEN-2024-001",
    condition: "Good",
    photoUrl: "/placeholder.svg",
    lastInspected: "Apr 10, 2024",
  },
  {
    id: "asset-005",
    propertyId: "p-405",
    name: "Window A/C Unit",
    serialNumber: "AC-2024-002",
    condition: "Damaged",
    photoUrl: "/placeholder.svg",
    lastInspected: "Apr 10, 2024",
  },
  {
    id: "asset-006",
    propertyId: "p-510",
    name: "Ceiling Fan",
    serialNumber: "FAN-2024-001",
    condition: "Good",
    photoUrl: "/placeholder.svg",
    lastInspected: "Apr 12, 2024",
  },
]

export function getAssetsForProperty(propertyId: string): PropertyAsset[] {
  return propertyAssets.filter((a) => a.propertyId === propertyId)
}

export function getBrokerById(id: string): Broker | undefined {
  return brokers.find((b) => b.id === id)
}
