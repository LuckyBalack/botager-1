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
  subcity: string
  officeSize: string
  floor: string
  roomNo: string
  monthlyRent: string
  monthlyRentNumber: number
  amenities: string[]
  available: boolean
  image?: string
  spaceType: "Shop" | "Office" | "Co-working" | "Event Space"
  description: string
  buildingFeatures: string[]
  ownerPhone: string
  ownerName: string
  reviews: {
    rating: number
    text: string
    reviewerName: string
    date: string
  }[]
  images: string[]
  listedOnMarketplace: boolean
}

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "ml-001",
    buildingName: "Abuki Bldg.",
    location: "Bole, Addis Ababa",
    subcity: "Bole",
    officeSize: "25 sq.m",
    floor: "3rd Floor",
    roomNo: "302",
    monthlyRent: "ETB 12,000",
    monthlyRentNumber: 12000,
    amenities: ["WiFi", "Parking", "24/7 Security", "Elevator"],
    available: true,
    spaceType: "Office",
    description: "Modern office space with excellent natural lighting and city views. Perfect for small teams or startups looking for a professional environment in the heart of Bole.",
    buildingFeatures: ["24/7 Security", "Backup Generator", "Elevator Access", "On-site Parking", "Cleaning Services"],
    ownerPhone: "+251 911 23 45 67",
    ownerName: "Kebede Teshome",
    reviews: [
      { rating: 5, text: "Great location and very responsive management. Highly recommend!", reviewerName: "Abebe K.", date: "Mar 2024" },
      { rating: 4, text: "Clean and professional space. The generator backup is a lifesaver.", reviewerName: "Sara M.", date: "Feb 2024" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
  {
    id: "ml-002",
    buildingName: "Zefmesh Grand Mall",
    location: "Kazanchis, Addis Ababa",
    subcity: "Kirkos",
    officeSize: "40 sq.m",
    floor: "5th Floor",
    roomNo: "512",
    monthlyRent: "ETB 22,000",
    monthlyRentNumber: 22000,
    amenities: ["WiFi", "Parking", "Conference Room", "Generator"],
    available: true,
    spaceType: "Office",
    description: "Spacious premium office in the prestigious Zefmesh Grand Mall. Features include access to shared conference rooms and premium finishes throughout.",
    buildingFeatures: ["Premium Finishes", "Conference Room Access", "High-Speed Internet", "Central AC", "24/7 Access"],
    ownerPhone: "+251 922 34 56 78",
    ownerName: "Almaz Bekele",
    reviews: [
      { rating: 5, text: "Beautiful space in a great building. Very professional atmosphere.", reviewerName: "Daniel T.", date: "Apr 2024" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
  {
    id: "ml-003",
    buildingName: "Merkato Tower",
    location: "Merkato, Addis Ababa",
    subcity: "Addis Ketema",
    officeSize: "15 sq.m",
    floor: "2nd Floor",
    roomNo: "205",
    monthlyRent: "ETB 8,500",
    monthlyRentNumber: 8500,
    amenities: ["WiFi", "Elevator"],
    available: true,
    spaceType: "Shop",
    description: "Compact shop space ideal for retail or small service businesses. Located in the bustling Merkato area with high foot traffic.",
    buildingFeatures: ["High Foot Traffic", "Elevator Access", "Loading Area", "Security Guard"],
    ownerPhone: "+251 933 45 67 89",
    ownerName: "Dawit Hailu",
    reviews: [
      { rating: 4, text: "Great location for my small business. Lots of customers!", reviewerName: "Meron A.", date: "Jan 2024" },
      { rating: 3, text: "Good price but parking can be difficult.", reviewerName: "Tesfaye G.", date: "Dec 2023" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
  {
    id: "ml-004",
    buildingName: "Abuki Bldg.",
    location: "Bole, Addis Ababa",
    subcity: "Bole",
    officeSize: "50 sq.m",
    floor: "6th Floor",
    roomNo: "601",
    monthlyRent: "ETB 28,000",
    monthlyRentNumber: 28000,
    amenities: ["WiFi", "Parking", "Private Bathroom", "Kitchen", "Generator"],
    available: true,
    spaceType: "Office",
    description: "Premium executive office suite with private bathroom and kitchenette. Top floor location with panoramic city views. Ideal for established businesses.",
    buildingFeatures: ["Private Bathroom", "Kitchenette", "Panoramic Views", "Premium Security", "Reserved Parking"],
    ownerPhone: "+251 911 23 45 67",
    ownerName: "Kebede Teshome",
    reviews: [
      { rating: 5, text: "Absolutely fantastic office. The views alone are worth it!", reviewerName: "Helen Y.", date: "Apr 2024" },
      { rating: 5, text: "Best office I have rented. Very professional building management.", reviewerName: "Samuel G.", date: "Mar 2024" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
  {
    id: "ml-005",
    buildingName: "Zefmesh Grand Mall",
    location: "Kazanchis, Addis Ababa",
    subcity: "Kirkos",
    officeSize: "30 sq.m",
    floor: "4th Floor",
    roomNo: "408",
    monthlyRent: "ETB 18,000",
    monthlyRentNumber: 18000,
    amenities: ["WiFi", "Parking", "Elevator"],
    available: true,
    spaceType: "Co-working",
    description: "Flexible co-working space perfect for freelancers and remote teams. Includes access to shared amenities and meeting rooms.",
    buildingFeatures: ["Shared Meeting Rooms", "Coffee/Tea Station", "High-Speed WiFi", "Flexible Hours", "Community Events"],
    ownerPhone: "+251 922 34 56 78",
    ownerName: "Almaz Bekele",
    reviews: [
      { rating: 4, text: "Nice community of professionals. Great for networking.", reviewerName: "Tigist H.", date: "Feb 2024" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
  {
    id: "ml-006",
    buildingName: "Merkato Tower",
    location: "Merkato, Addis Ababa",
    subcity: "Addis Ketema",
    officeSize: "20 sq.m",
    floor: "3rd Floor",
    roomNo: "315",
    monthlyRent: "ETB 10,000",
    monthlyRentNumber: 10000,
    amenities: ["WiFi", "24/7 Security"],
    available: true,
    spaceType: "Shop",
    description: "Well-maintained shop space suitable for various retail businesses. Good visibility and easy access for customers.",
    buildingFeatures: ["Good Visibility", "Customer Parking", "Security", "Loading Access"],
    ownerPhone: "+251 933 45 67 89",
    ownerName: "Dawit Hailu",
    reviews: [
      { rating: 4, text: "Good value for the price. Management is helpful.", reviewerName: "Yonas T.", date: "Mar 2024" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
  {
    id: "ml-007",
    buildingName: "Sunshine Plaza",
    location: "Piassa, Addis Ababa",
    subcity: "Arada",
    officeSize: "100 sq.m",
    floor: "Ground Floor",
    roomNo: "G-05",
    monthlyRent: "ETB 45,000",
    monthlyRentNumber: 45000,
    amenities: ["WiFi", "Parking", "Generator", "AC"],
    available: true,
    spaceType: "Event Space",
    description: "Large event space perfect for conferences, workshops, and corporate gatherings. Fully equipped with audio-visual equipment and flexible seating arrangements.",
    buildingFeatures: ["AV Equipment", "Flexible Seating", "Catering Kitchen", "Lobby Area", "Dedicated Restrooms"],
    ownerPhone: "+251 944 56 78 90",
    ownerName: "Hana Mengistu",
    reviews: [
      { rating: 5, text: "Hosted our company retreat here. Everything was perfect!", reviewerName: "Corporate Events Ltd.", date: "Apr 2024" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    listedOnMarketplace: true,
  },
]

export function getMarketplaceListingById(id: string): MarketplaceListing | undefined {
  return marketplaceListings.find((l) => l.id === id)
}

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

// Maintenance Ticket Detail (Expanded)
export type MaintenanceMessage = {
  id: string
  sender: string
  senderRole: "manager" | "vendor" | "tenant"
  avatar: string
  message: string
  timestamp: string
  attachments?: {
    name: string
    url: string
    type: "image" | "document"
  }[]
}

export type MaintenanceTicketDetail = {
  id: string
  ticketNumber: string
  roomNumber: string
  tenantName: string
  tenantPhone: string
  priority: MaintenancePriority
  status: MaintenanceStatus
  title: string
  description: string
  dateSubmitted: string
  vendor: {
    name: string
    phone: string
  }
  damagePhotos: string[]
  messages: MaintenanceMessage[]
}

export const maintenanceTicketDetails: MaintenanceTicketDetail[] = [
  {
    id: "mnt-001",
    ticketNumber: "MNT-102",
    roomNumber: "310",
    tenantName: "Getachew Temesgen",
    tenantPhone: "+251 987 67 56 44",
    priority: "High",
    status: "In Progress",
    title: "Water Leak in Ceiling",
    description: "Significant water leak coming from ceiling in the main office area. Needs immediate attention to prevent further damage.",
    dateSubmitted: "Apr 27, 2024",
    vendor: {
      name: "Addis Plumbing",
      phone: "+251 911 55 44 33",
    },
    damagePhotos: ["/placeholder.svg", "/placeholder.svg"],
    messages: [
      {
        id: "msg-1",
        sender: "Getachew Temesgen",
        senderRole: "tenant",
        avatar: "/professional-headshot.png",
        message: "Hi, the ceiling leak is getting worse. Is the plumber coming today?",
        timestamp: "Apr 27, 2024 - 10:30 AM",
      },
      {
        id: "msg-2",
        sender: "Property Manager",
        senderRole: "manager",
        avatar: "/placeholder.svg",
        message: "I've called Addis Plumbing and they're on their way. Should be there by 2 PM.",
        timestamp: "Apr 27, 2024 - 10:45 AM",
      },
      {
        id: "msg-3",
        sender: "Addis Plumbing",
        senderRole: "vendor",
        avatar: "/placeholder.svg",
        message: "Arrived and inspecting the damage. Will send invoice for parts needed shortly.",
        timestamp: "Apr 27, 2024 - 2:15 PM",
        attachments: [
          {
            name: "repair-estimate.pdf",
            url: "#",
            type: "document",
          },
        ],
      },
    ],
  },
]

// Digital Invoice Detail
export type InvoiceLineItem = {
  description: string
  quantity: number
  unitPrice: string
  total: string
}

export type InvoiceDetail = {
  id: string
  invoiceNumber: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  tenantName: string
  roomNumber: string
  tenantEmail: string
  buildingName: string
  lineItems: InvoiceLineItem[]
  subtotal: string
  vat: string
  withholding: string
  grandTotal: string
  paymentMethod?: string
  transactionRef?: string
}

export const invoiceDetails: InvoiceDetail[] = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2024-001",
    issueDate: "Apr 1, 2024",
    dueDate: "May 5, 2024",
    status: "Pending",
    tenantName: "Getachew Temesgen",
    roomNumber: "310",
    tenantEmail: "gech.temu@gmail.com",
    buildingName: "Abuki Bldg.",
    lineItems: [
      {
        description: "Monthly Rent - April 2024",
        quantity: 1,
        unitPrice: "ETB 15,000",
        total: "ETB 15,000",
      },
      {
        description: "Utility Charges (Electricity)",
        quantity: 1,
        unitPrice: "ETB 325",
        total: "ETB 325",
      },
      {
        description: "Water & Maintenance",
        quantity: 1,
        unitPrice: "ETB 500",
        total: "ETB 500",
      },
    ],
    subtotal: "ETB 15,825",
    vat: "ETB 2,373.75 (15%)",
    withholding: "ETB 316.50 (2%)",
    grandTotal: "ETB 18,198.75",
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2024-002",
    issueDate: "Mar 1, 2024",
    dueDate: "Apr 5, 2024",
    status: "Paid",
    tenantName: "Alemayehu Goshu",
    roomNumber: "510",
    tenantEmail: "alemayehu.g@gmail.com",
    buildingName: "Abuki Bldg.",
    lineItems: [
      {
        description: "Monthly Rent - March 2024",
        quantity: 1,
        unitPrice: "ETB 15,000",
        total: "ETB 15,000",
      },
      {
        description: "Utility Charges (Electricity)",
        quantity: 1,
        unitPrice: "ETB 280",
        total: "ETB 280",
      },
    ],
    subtotal: "ETB 15,280",
    vat: "ETB 2,292 (15%)",
    withholding: "ETB 305.60 (2%)",
    grandTotal: "ETB 17,877.60",
    paymentMethod: "Telebirr",
    transactionRef: "TXN-20240405-001",
  },
]

// Lead/Waitlist Detail
export type FollowUpActivity = {
  id: string
  date: string
  type: "call" | "email" | "tour" | "meeting"
  notes: string
  nextFollowUp?: string
}

export type LeadDetail = {
  id: string
  name: string
  company: string
  phone: string
  email: string
  warmthScore: "Cold" | "Warm" | "Hot" | "Highly Interested"
  desiredSize: string
  budgetRange: string
  desiredFloor: string
  desiredLocation: string
  dateJoined: string
  status: LeadStatus
  notes: string
  activities: FollowUpActivity[]
}

export const leadDetails: LeadDetail[] = [
  {
    id: "lead-001",
    name: "Abebe Kebede",
    company: "Kebede Tech Solutions",
    phone: "+251 911 23 45 67",
    email: "abebe.k@gmail.com",
    warmthScore: "Hot",
    desiredSize: "30 sq.m",
    budgetRange: "ETB 12,000 - 18,000",
    desiredFloor: "3rd Floor",
    desiredLocation: "Bole",
    dateJoined: "Apr 25, 2024",
    status: "Interested",
    notes: "Very interested in modern office space. Flexible with timeline. Mentioned budget can be stretched for the right space.",
    activities: [
      {
        id: "act-1",
        date: "Apr 28, 2024",
        type: "tour",
        notes: "Virtual tour of Room 302 - Showed great interest",
        nextFollowUp: "May 1, 2024",
      },
      {
        id: "act-2",
        date: "Apr 25, 2024",
        type: "call",
        notes: "Initial inquiry call - explained requirements",
      },
    ],
  },
]

// Public Listing Detail (Marketplace)
export type PublicListingDetail = {
  id: string
  buildingName: string
  roomNo: string
  floor: string
  size: string
  monthlyPrice: string
  location: string
  subcity: string
  description: string
  amenities: string[]
  buildingFeatures: string[]
  images: string[]
  reviews: {
    rating: number
    text: string
    reviewerName: string
    date: string
    verified: boolean
  }[]
  ownerName: string
  ownerPhone: string
  includesUtilities: boolean
  availableDate: string
  spaceType: string
}

export const publicListingDetails: PublicListingDetail[] = [
  {
    id: "listing-001",
    buildingName: "Abuki Bldg.",
    roomNo: "302",
    floor: "3rd",
    size: "25 sq.m",
    monthlyPrice: "ETB 12,000",
    location: "Bole, Addis Ababa",
    subcity: "Bole",
    description: "Modern office space with excellent natural lighting and city views. Perfect for small teams or startups looking for a professional environment in the heart of Bole. Features dedicated parking and 24/7 security.",
    amenities: ["WiFi", "Parking", "24/7 Security", "Elevator", "Cleaning Service"],
    buildingFeatures: ["Backup Generator", "24/7 Security", "Elevator Access", "On-site Parking", "Coffee Service"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    reviews: [
      {
        rating: 5,
        text: "Excellent location and very responsive management. The building has great amenities and the security is top-notch.",
        reviewerName: "Abebe K.",
        date: "Mar 2024",
        verified: true,
      },
      {
        rating: 4,
        text: "Clean and professional space. The generator backup is a lifesaver during power outages.",
        reviewerName: "Sara M.",
        date: "Feb 2024",
        verified: true,
      },
      {
        rating: 5,
        text: "Perfect for our startup. Great community and networking opportunities.",
        reviewerName: "Yonas T.",
        date: "Jan 2024",
        verified: true,
      },
    ],
    ownerName: "Kebede Teshome",
    ownerPhone: "+251 911 23 45 67",
    includesUtilities: true,
    availableDate: "May 1, 2024",
    spaceType: "Office",
  },
]

export function getMaintenanceTicketDetail(id: string): MaintenanceTicketDetail | undefined {
  return maintenanceTicketDetails.find((t) => t.id === id)
}

export function getInvoiceDetail(id: string): InvoiceDetail | undefined {
  return invoiceDetails.find((inv) => inv.id === id)
}

export function getLeadDetail(id: string): LeadDetail | undefined {
  return leadDetails.find((lead) => lead.id === id)
}

export function getPublicListingDetail(id: string): PublicListingDetail | undefined {
  return publicListingDetails.find((listing) => listing.id === id)
}

// Broker / Delala Detail
export type CommissionEntry = {
  tenantId: string
  tenantName: string
  roomNumber: string
  commissionAmount: string
  dateReferred: string
  status: "Paid" | "Pending"
}

export type BrokerDetail = {
  id: string
  name: string
  phone: string
  email: string
  trustRating: number
  avatar: string
  totalReferrals: number
  activeTenantsBrought: number
  conversionRate: string
  commissions: CommissionEntry[]
}

export const brokerDetails: BrokerDetail[] = [
  {
    id: "broker-001",
    name: "Abebe Kebede",
    phone: "+251 911 23 45 67",
    email: "abebe.kebede@gmail.com",
    trustRating: 4.8,
    avatar: "/placeholder.svg",
    totalReferrals: 24,
    activeTenantsBrought: 18,
    conversionRate: "75%",
    commissions: [
      {
        tenantId: "t-getachew",
        tenantName: "Getachew Temesgen",
        roomNumber: "310",
        commissionAmount: "ETB 3,000",
        dateReferred: "Apr 1, 2024",
        status: "Paid",
      },
      {
        tenantId: "t-alemayehu",
        tenantName: "Alemayehu Goshu",
        roomNumber: "510",
        commissionAmount: "ETB 3,000",
        dateReferred: "Apr 5, 2024",
        status: "Paid",
      },
      {
        tenantId: "t-gete",
        tenantName: "Gete Alemayehu",
        roomNumber: "212",
        commissionAmount: "ETB 3,000",
        dateReferred: "Apr 10, 2024",
        status: "Pending",
      },
      {
        tenantId: "t-sara",
        tenantName: "Sara Mekuria",
        roomNumber: "405",
        commissionAmount: "ETB 3,000",
        dateReferred: "Apr 15, 2024",
        status: "Pending",
      },
    ],
  },
]

// Vendor / Contractor Detail
export type JobRecord = {
  id: string
  ticketNumber: string
  roomNumber: string
  jobTitle: string
  completedDate: string
  jobCost: string
  status: "Completed" | "In Progress"
  photos?: string[]
}

export type VendorDetail = {
  id: string
  businessName: string
  category: string
  contactName: string
  phone: string
  email: string
  verifiedRating: number
  avatar: string
  totalJobsCompleted: number
  avgResolutionTime: string
  activeJobs: JobRecord[]
  jobHistory: JobRecord[]
  outstandingBalance?: string
}

export const vendorDetails: VendorDetail[] = [
  {
    id: "vendor-001",
    businessName: "Addis Electric",
    category: "Electrician",
    contactName: "Dawit Tesfaye",
    phone: "+251 911 55 44 33",
    email: "contact@addiselectric.com",
    verifiedRating: 4.9,
    avatar: "/placeholder.svg",
    totalJobsCompleted: 67,
    avgResolutionTime: "2.3 days",
    activeJobs: [
      {
        id: "job-active-001",
        ticketNumber: "MNT-105",
        roomNumber: "405",
        jobTitle: "Electrical Fault in Room",
        completedDate: "",
        jobCost: "ETB 2,500",
        status: "In Progress",
      },
    ],
    jobHistory: [
      {
        id: "job-001",
        ticketNumber: "MNT-102",
        roomNumber: "310",
        jobTitle: "Complete Electrical Rewiring",
        completedDate: "Apr 28, 2024",
        jobCost: "ETB 8,500",
        status: "Completed",
        photos: ["/placeholder.svg", "/placeholder.svg"],
      },
      {
        id: "job-002",
        ticketNumber: "MNT-098",
        roomNumber: "212",
        jobTitle: "Light Switch Installation",
        completedDate: "Apr 20, 2024",
        jobCost: "ETB 1,200",
        status: "Completed",
      },
      {
        id: "job-003",
        ticketNumber: "MNT-095",
        roomNumber: "510",
        jobTitle: "Ceiling Fan Repair",
        completedDate: "Apr 15, 2024",
        jobCost: "ETB 800",
        status: "Completed",
      },
    ],
    outstandingBalance: "ETB 2,500",
  },
]

// Building Verification (Admin)
export type ComplianceDocument = {
  name: string
  status: "Uploaded" | "Missing" | "Verified"
  uploadedDate?: string
  fileUrl?: string
}

export type BuildingVerification = {
  id: string
  buildingName: string
  location: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  verificationStatus: "Under Review" | "Verified" | "Rejected"
  complianceDocuments: ComplianceDocument[]
  isPublicOnMarketplace: boolean
  platformSubscriptionStatus: "Active" | "Inactive" | "Pending"
}

export const buildingVerifications: BuildingVerification[] = [
  {
    id: "building-verify-001",
    buildingName: "Zefmesh Grand Mall",
    location: "Bole, Addis Ababa",
    ownerName: "Kebede Teshome",
    ownerPhone: "+251 911 23 45 67",
    ownerEmail: "kebede@zefmesh.com",
    verificationStatus: "Under Review",
    complianceDocuments: [
      {
        name: "Property Deed",
        status: "Uploaded",
        uploadedDate: "Apr 25, 2024",
        fileUrl: "/documents/property-deed.pdf",
      },
      {
        name: "Owner ID",
        status: "Verified",
        uploadedDate: "Apr 25, 2024",
        fileUrl: "/documents/owner-id.pdf",
      },
      {
        name: "Building Trade License",
        status: "Uploaded",
        uploadedDate: "Apr 26, 2024",
        fileUrl: "/documents/trade-license.pdf",
      },
      {
        name: "Tax Clearance",
        status: "Missing",
      },
    ],
    isPublicOnMarketplace: false,
    platformSubscriptionStatus: "Pending",
  },
]

export function getBrokerDetail(id: string): BrokerDetail | undefined {
  return brokerDetails.find((b) => b.id === id)
}

export function getVendorDetail(id: string): VendorDetail | undefined {
  return vendorDetails.find((v) => v.id === id)
}

export function getBuildingVerification(id: string): BuildingVerification | undefined {
  return buildingVerifications.find((bv) => bv.id === id)
}

// API Health Logs (Step 3)
export type ApiHealthLog = {
  id: string
  timestamp: string
  partner: string
  endpoint: string
  responseCode: number
  latency: number // in milliseconds
}

export const apiHealthLogs: ApiHealthLog[] = [
  {
    id: "ahl-001",
    timestamp: "Apr 30, 2024 14:32:15",
    partner: "Commercial Bank of Ethiopia",
    endpoint: "/v1/credit/verify",
    responseCode: 200,
    latency: 120,
  },
  {
    id: "ahl-002",
    timestamp: "Apr 30, 2024 14:30:08",
    partner: "Awash Bank",
    endpoint: "/v1/credit/check",
    responseCode: 200,
    latency: 98,
  },
  {
    id: "ahl-003",
    timestamp: "Apr 30, 2024 14:28:45",
    partner: "Commercial Bank of Ethiopia",
    endpoint: "/v1/credit/disburse",
    responseCode: 500,
    latency: 2450,
  },
  {
    id: "ahl-004",
    timestamp: "Apr 30, 2024 14:25:12",
    partner: "Awash Bank",
    endpoint: "/v1/credit/verify",
    responseCode: 200,
    latency: 145,
  },
  {
    id: "ahl-005",
    timestamp: "Apr 30, 2024 14:22:30",
    partner: "M-Birr",
    endpoint: "/v1/wallet/balance",
    responseCode: 401,
    latency: 56,
  },
  {
    id: "ahl-006",
    timestamp: "Apr 30, 2024 14:20:18",
    partner: "Commercial Bank of Ethiopia",
    endpoint: "/v1/credit/verify",
    responseCode: 200,
    latency: 112,
  },
  {
    id: "ahl-007",
    timestamp: "Apr 30, 2024 14:18:05",
    partner: "Awash Bank",
    endpoint: "/v1/credit/disburse",
    responseCode: 200,
    latency: 234,
  },
]

// Credit Utilization by Sub-city (Step 3)
export type CreditUtilization = {
  id: string
  subcity: string
  totalApplications: number
  approvalRate: number // percentage
  totalEtbIssued: string
  totalEtbNumber: number
}

export const creditUtilizationData: CreditUtilization[] = [
  {
    id: "cu-001",
    subcity: "Bole",
    totalApplications: 245,
    approvalRate: 78,
    totalEtbIssued: "ETB 1.2M",
    totalEtbNumber: 1200000,
  },
  {
    id: "cu-002",
    subcity: "Kirkos",
    totalApplications: 189,
    approvalRate: 72,
    totalEtbIssued: "ETB 890K",
    totalEtbNumber: 890000,
  },
  {
    id: "cu-003",
    subcity: "Arada",
    totalApplications: 156,
    approvalRate: 65,
    totalEtbIssued: "ETB 720K",
    totalEtbNumber: 720000,
  },
  {
    id: "cu-004",
    subcity: "Yeka",
    totalApplications: 134,
    approvalRate: 81,
    totalEtbIssued: "ETB 650K",
    totalEtbNumber: 650000,
  },
  {
    id: "cu-005",
    subcity: "Lideta",
    totalApplications: 98,
    approvalRate: 69,
    totalEtbIssued: "ETB 420K",
    totalEtbNumber: 420000,
  },
]

// Support Tickets (Step 4)
export type SupportTicketStatus = "New" | "Open" | "Resolved" | "Escalated"

export type SupportTicket = {
  id: string
  ownerName: string
  ownerEmail: string
  subject: string
  status: SupportTicketStatus
  createdAt: string
  lastUpdated: string
  messages: {
    id: string
    sender: "owner" | "admin"
    senderName: string
    message: string
    timestamp: string
  }[]
}

export const supportTickets: SupportTicket[] = [
  {
    id: "st-001",
    ownerName: "Kebede Teshome",
    ownerEmail: "kebede@gmail.com",
    subject: "Payment Gateway Error",
    status: "New",
    createdAt: "Apr 30, 2024 09:15",
    lastUpdated: "Apr 30, 2024 09:15",
    messages: [
      {
        id: "msg-001",
        sender: "owner",
        senderName: "Kebede Teshome",
        message: "I am trying to process a tenant payment but the Telebirr integration keeps showing an error. The error code is TBR-500. Can you please help?",
        timestamp: "Apr 30, 2024 09:15",
      },
    ],
  },
  {
    id: "st-002",
    ownerName: "Almaz Bekele",
    ownerEmail: "almaz.b@gmail.com",
    subject: "How to add a second building?",
    status: "Open",
    createdAt: "Apr 29, 2024 14:30",
    lastUpdated: "Apr 30, 2024 08:45",
    messages: [
      {
        id: "msg-002",
        sender: "owner",
        senderName: "Almaz Bekele",
        message: "Hello, I want to add my second building to the platform. I already have Unity Plaza registered. How can I add another building under the same account?",
        timestamp: "Apr 29, 2024 14:30",
      },
      {
        id: "msg-003",
        sender: "admin",
        senderName: "WRM Support",
        message: "Hi Almaz, thank you for reaching out. You can add a new building by going to Settings > Buildings > Add New Building. You will need to provide the required documents for verification. Would you like me to guide you through the process?",
        timestamp: "Apr 30, 2024 08:45",
      },
    ],
  },
  {
    id: "st-003",
    ownerName: "Dawit Hailu",
    ownerEmail: "dawit.h@gmail.com",
    subject: "Tenant dispute resolution",
    status: "Open",
    createdAt: "Apr 28, 2024 11:20",
    lastUpdated: "Apr 29, 2024 16:00",
    messages: [
      {
        id: "msg-004",
        sender: "owner",
        senderName: "Dawit Hailu",
        message: "I have a tenant who claims they paid rent but my system shows unpaid. We need help resolving this dispute. Transaction ID: TXN-2024-0428-001",
        timestamp: "Apr 28, 2024 11:20",
      },
      {
        id: "msg-005",
        sender: "admin",
        senderName: "WRM Support",
        message: "We are looking into the transaction. Please allow 24-48 hours for our finance team to investigate.",
        timestamp: "Apr 29, 2024 16:00",
      },
    ],
  },
  {
    id: "st-004",
    ownerName: "Tigist Mengistu",
    ownerEmail: "tigist.m@gmail.com",
    subject: "Cannot generate monthly report",
    status: "Resolved",
    createdAt: "Apr 25, 2024 10:00",
    lastUpdated: "Apr 26, 2024 14:30",
    messages: [
      {
        id: "msg-006",
        sender: "owner",
        senderName: "Tigist Mengistu",
        message: "The monthly report generation is stuck at 50%. It has been like this for 2 hours.",
        timestamp: "Apr 25, 2024 10:00",
      },
      {
        id: "msg-007",
        sender: "admin",
        senderName: "WRM Support",
        message: "We have identified the issue and fixed it. Please try generating the report again. The issue was related to a large number of transactions in April.",
        timestamp: "Apr 26, 2024 14:30",
      },
    ],
  },
]

// System Broadcasts (Step 4)
export type BroadcastAudience = "All Building Owners" | "All Active Tenants" | "Specific Building"

export type SystemBroadcast = {
  id: string
  date: string
  audience: BroadcastAudience
  subject: string
  messagePreview: string
  deliveryMethods: ("SMS" | "Email" | "In-App")[]
  successRate: number // percentage
}

export const systemBroadcasts: SystemBroadcast[] = [
  {
    id: "sb-001",
    date: "Apr 28, 2024",
    audience: "All Building Owners",
    subject: "Scheduled Maintenance Notice",
    messagePreview: "The platform will undergo scheduled maintenance on May 1st from 2:00 AM to 4:00 AM EAT...",
    deliveryMethods: ["Email", "In-App"],
    successRate: 98,
  },
  {
    id: "sb-002",
    date: "Apr 20, 2024",
    audience: "All Active Tenants",
    subject: "New Payment Options Available",
    messagePreview: "We are excited to announce that you can now pay your rent using CBE Birr and M-Pesa...",
    deliveryMethods: ["SMS", "Email", "In-App"],
    successRate: 94,
  },
  {
    id: "sb-003",
    date: "Apr 15, 2024",
    audience: "All Building Owners",
    subject: "Tax Season Reminder",
    messagePreview: "This is a reminder that Q1 tax reports are now available in your dashboard...",
    deliveryMethods: ["Email"],
    successRate: 100,
  },
]

// Audit Logs (Step 5)
export type AuditLogRole = "System Admin" | "Building Owner" | "Tenant"

export type AuditLog = {
  id: string
  timestamp: string
  userName: string
  userEmail: string
  role: AuditLogRole
  ipAddress: string
  action: string
}

export const auditLogs: AuditLog[] = [
  {
    id: "al-001",
    timestamp: "Apr 30, 2024 14:45:22",
    userName: "Admin User",
    userEmail: "admin@wrm.et",
    role: "System Admin",
    ipAddress: "196.188.120.45",
    action: "Updated Tax Config: VAT Rate changed to 15%",
  },
  {
    id: "al-002",
    timestamp: "Apr 30, 2024 14:32:10",
    userName: "Admin User",
    userEmail: "admin@wrm.et",
    role: "System Admin",
    ipAddress: "196.188.120.45",
    action: "Approved Zefmesh Mall - Workspace Verification",
  },
  {
    id: "al-003",
    timestamp: "Apr 30, 2024 13:15:45",
    userName: "Kebede Teshome",
    userEmail: "kebede@gmail.com",
    role: "Building Owner",
    ipAddress: "196.188.45.112",
    action: "Added new tenant: Hanna Girma to Unit 302",
  },
  {
    id: "al-004",
    timestamp: "Apr 30, 2024 12:50:33",
    userName: "Admin User",
    userEmail: "admin@wrm.et",
    role: "System Admin",
    ipAddress: "196.188.120.45",
    action: "Deleted Tenant Record: ID TEN-2024-0089",
  },
  {
    id: "al-005",
    timestamp: "Apr 30, 2024 11:22:18",
    userName: "Almaz Bekele",
    userEmail: "almaz.b@gmail.com",
    role: "Building Owner",
    ipAddress: "196.188.67.89",
    action: "Generated Monthly Financial Report - April 2024",
  },
  {
    id: "al-006",
    timestamp: "Apr 30, 2024 10:45:00",
    userName: "Yohannes Haile",
    userEmail: "yohannes.h@gmail.com",
    role: "Tenant",
    ipAddress: "196.188.33.201",
    action: "Submitted Rent Payment: ETB 15,000 via Telebirr",
  },
  {
    id: "al-007",
    timestamp: "Apr 29, 2024 16:30:55",
    userName: "Admin User",
    userEmail: "admin@wrm.et",
    role: "System Admin",
    ipAddress: "196.188.120.45",
    action: "Updated Platform Fee: Gateway Transaction Fee to 2.5%",
  },
  {
    id: "al-008",
    timestamp: "Apr 29, 2024 14:20:12",
    userName: "Tigist Mengistu",
    userEmail: "tigist.m@gmail.com",
    role: "Building Owner",
    ipAddress: "196.188.89.156",
    action: "Updated Building Info: Sunshine Apartments",
  },
  {
    id: "al-009",
    timestamp: "Apr 29, 2024 11:05:30",
    userName: "Admin User",
    userEmail: "admin@wrm.et",
    role: "System Admin",
    ipAddress: "196.188.120.45",
    action: "Triggered Manual DB Backup",
  },
  {
    id: "al-010",
    timestamp: "Apr 28, 2024 09:15:45",
    userName: "Dawit Hailu",
    userEmail: "dawit.h@gmail.com",
    role: "Building Owner",
    ipAddress: "196.188.55.78",
    action: "Evicted Tenant: Samuel Tadesse from Unit 105",
  },
]

// UI Translation Strings (Step 5)
export type TranslationString = {
  id: string
  component: string
  englishString: string
  amharicTranslation: string
}

export const translationStrings: TranslationString[] = [
  {
    id: "ts-001",
    component: "Sidebar Navigation",
    englishString: "Dashboard",
    amharicTranslation: "ዳሽቦርድ",
  },
  {
    id: "ts-002",
    component: "Sidebar Navigation",
    englishString: "My Buildings",
    amharicTranslation: "ህንፃዎቼ",
  },
  {
    id: "ts-003",
    component: "Sidebar Navigation",
    englishString: "Tenants",
    amharicTranslation: "ተከራዮች",
  },
  {
    id: "ts-004",
    component: "Sidebar Navigation",
    englishString: "Payments",
    amharicTranslation: "ክፍያዎች",
  },
  {
    id: "ts-005",
    component: "Sidebar Navigation",
    englishString: "Settings",
    amharicTranslation: "ቅንብሮች",
  },
  {
    id: "ts-006",
    component: "Button Labels",
    englishString: "Submit",
    amharicTranslation: "አስገባ",
  },
  {
    id: "ts-007",
    component: "Button Labels",
    englishString: "Cancel",
    amharicTranslation: "ሰርዝ",
  },
  {
    id: "ts-008",
    component: "Button Labels",
    englishString: "Save Changes",
    amharicTranslation: "ለውጦችን አስቀምጥ",
  },
  {
    id: "ts-009",
    component: "Form Labels",
    englishString: "Full Name",
    amharicTranslation: "ሙሉ ስም",
  },
  {
    id: "ts-010",
    component: "Form Labels",
    englishString: "Phone Number",
    amharicTranslation: "ስልክ ቁጥር",
  },
  {
    id: "ts-011",
    component: "Form Labels",
    englishString: "Email Address",
    amharicTranslation: "ኢሜይል አድራሻ",
  },
  {
    id: "ts-012",
    component: "Status Labels",
    englishString: "Pending",
    amharicTranslation: "በመጠባበቅ ላይ",
  },
  {
    id: "ts-013",
    component: "Status Labels",
    englishString: "Approved",
    amharicTranslation: "ጸድቋል",
  },
  {
    id: "ts-014",
    component: "Status Labels",
    englishString: "Rejected",
    amharicTranslation: "ውድቅ ተደርጓል",
  },
  {
    id: "ts-015",
    component: "Notifications",
    englishString: "Payment Received",
    amharicTranslation: "ክፍያ ደርሷል",
  },
]
