/**
 * Utility Functions for WRM Platform
 * - Ethiopian Calendar Conversion
 * - Rent & Financial Calculations
 * - Utility Cost Distribution
 * - Date & Number Formatting
 */

// ============================================
// ETHIOPIAN CALENDAR UTILITIES
// ============================================

/**
 * Convert Gregorian date to Ethiopian Calendar date
 * Ethiopian Calendar is ~7-8 years behind Gregorian calendar
 */
export function gregorianToEthiopian(date: Date | string): string {
  const gregorianDate = typeof date === "string" ? new Date(date) : date
  
  // Ethiopian calendar year calculation (offset: -7.65 years on average)
  const eYear = gregorianDate.getFullYear() - 1900 + (gregorianDate.getMonth() + 1 > 8 ? 1 : 0)
  
  // Ethiopian months (13 months: 12 of 30 days + 1 of 5-6 days)
  const months = [
    "Meskerem", "Tikimet", "Hidar", "Tahsas",
    "Terr", "Yekatit", "Megabit", "Miazia",
    "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
  ]
  
  // Calculate day of year
  const startOfYear = new Date(gregorianDate.getFullYear(), 7, 11) // Sept 11
  const dayOfYear = Math.floor((gregorianDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
  
  let eMonth = 0
  let eDay = dayOfYear + 1
  
  while (eDay > (eMonth === 12 ? 5 : 30)) {
    eDay -= eMonth === 12 ? 5 : 30
    eMonth++
  }
  
  if (eDay <= 0) {
    eMonth = 12
    eDay = 5 + eDay
  }
  
  const monthName = months[eMonth]
  return `${monthName} ${eDay}, ${eYear}`
}

/**
 * Convert Ethiopian Calendar date to Gregorian
 */
export function ethiopianToGregorian(ethiopianDateStr: string): Date {
  // Parse "Ginbot 7, 2016" format
  const months: Record<string, number> = {
    meskerem: 9, tikimet: 10, hidar: 11, tahsas: 12,
    terr: 1, yekatit: 2, megabit: 3, miazia: 4,
    ginbot: 5, sene: 6, hamle: 7, nehase: 8, pagume: 0
  }
  
  const parts = ethiopianDateStr.toLowerCase().split(/[\s,]+/).filter(p => p)
  if (parts.length < 3) return new Date()
  
  const monthName = parts[0]
  const day = parseInt(parts[1])
  const eYear = parseInt(parts[2])
  
  const eMonth = months[monthName] || 0
  const gYear = eYear + 1900 - (eMonth >= 9 ? 0 : 1)
  const gMonth = (eMonth + 8) % 12
  
  // This is a simplified conversion; precise conversion requires more complex logic
  return new Date(gYear, gMonth, day)
}

/**
 * Format date to display both Gregorian and Ethiopian
 */
export function formatDualDate(date: Date | string): { gregorian: string; ethiopian: string } {
  const d = typeof date === "string" ? new Date(date) : date
  const gregorian = d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
  const ethiopian = gregorianToEthiopian(d)
  return { gregorian, ethiopian }
}

// ============================================
// FINANCIAL CALCULATION UTILITIES
// ============================================

/**
 * Calculate rent based on pricing model
 */
export function calculateMonthlyRent(
  pricingModel: "PER_SQM" | "FLAT_PRICE",
  size?: number,
  baseRentPerSqm?: number,
  flatMonthlyRent?: number
): number {
  if (pricingModel === "PER_SQM" && size && baseRentPerSqm) {
    return size * baseRentPerSqm
  }
  return flatMonthlyRent || 0
}

/**
 * Calculate invoice totals with VAT and WHT
 */
export function calculateInvoiceTotals(
  subtotal: number,
  vatRate: number = 0.15,
  whtRate: number = 0.02
): {
  subtotal: number
  vat: number
  wht: number
  grandTotal: number
} {
  const vat = subtotal * vatRate
  const wht = subtotal * whtRate
  const grandTotal = subtotal + vat - wht
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    wht: Math.round(wht * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100
  }
}

/**
 * Format currency to ETB with 2 decimals
 */
export function formatETB(amount: number): string {
  return new Intl.NumberFormat("am-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Calculate gateway fees
 */
export function calculateGatewayFee(amount: number, feeRate: number = 0.025): number {
  return Math.round(amount * feeRate * 100) / 100
}

/**
 * Calculate pre-paid rent value
 */
export function calculatePrePaidValue(monthlyRent: number, prePayMonths: number): number {
  return Math.round(monthlyRent * prePayMonths * 100) / 100
}

/**
 * Calculate commission based on lease and rate
 */
export function calculateCommission(monthlyRent: number, commissionRate: number = 0.05): number {
  return Math.round(monthlyRent * commissionRate * 100) / 100
}

// ============================================
// UTILITY COST DISTRIBUTION
// ============================================

export interface UtilitySplit {
  roomId: string
  roomNumber: string
  tenantName: string
  roomAreaPercentage: number
  allocatedAmount: number
}

/**
 * Distribute utility bill across rooms based on area percentage
 */
export function distributeUtilityCost(
  totalBillAmount: number,
  rooms: Array<{
    id: string
    roomNumber: string
    tenantName: string
    sizeInSqm: number
  }>,
  buildingTotalSqm: number
): UtilitySplit[] {
  const totalBuiltUpArea = buildingTotalSqm || rooms.reduce((sum, r) => sum + r.sizeInSqm, 0)
  
  return rooms.map(room => {
    const areaPercentage = (room.sizeInSqm / totalBuiltUpArea) * 100
    const allocatedAmount = Math.round((totalBillAmount * (areaPercentage / 100)) * 100) / 100
    
    return {
      roomId: room.id,
      roomNumber: room.roomNumber,
      tenantName: room.tenantName,
      roomAreaPercentage: Math.round(areaPercentage * 100) / 100,
      allocatedAmount
    }
  })
}

/**
 * Verify utility distribution (should sum to total)
 */
export function verifyUtilityDistribution(splits: UtilitySplit[], expectedTotal: number): boolean {
  const actualTotal = Math.round(splits.reduce((sum, s) => sum + s.allocatedAmount, 0) * 100) / 100
  return Math.abs(actualTotal - expectedTotal) < 0.01 // Allow for rounding
}

// ============================================
// INVOICE & PAYMENT TRACKING
// ============================================

/**
 * Generate unique invoice number
 */
export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `INV-${year}-${random}`
}

/**
 * Calculate days overdue
 */
export function getDaysOverdue(dueDate: Date | string): number {
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate
  const today = new Date()
  const diffTime = today.getTime() - due.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

/**
 * Calculate payment progress percentage
 */
export function getPaymentProgress(paid: number, total: number): number {
  if (total === 0) return 0
  return Math.round((paid / total) * 100)
}

/**
 * Get payment status badge info
 */
export function getPaymentStatusInfo(
  status: "PENDING" | "PAID" | "OVERDUE" | "VOID",
  dueDate?: Date | string
): {
  label: string
  color: string
  bgColor: string
} {
  switch (status) {
    case "PAID":
      return { label: "Paid", color: "text-green-700", bgColor: "bg-green-100" }
    case "OVERDUE":
      return { label: "Overdue", color: "text-red-700", bgColor: "bg-red-100" }
    case "VOID":
      return { label: "Void", color: "text-slate-700", bgColor: "bg-slate-100" }
    default:
      return { label: "Pending", color: "text-amber-700", bgColor: "bg-amber-100" }
  }
}

// ============================================
// DATE FORMATTING & HELPERS
// ============================================

/**
 * Format date to readable format
 */
export function formatDate(date: Date | string | null, format: "short" | "long" = "short"): string {
  if (!date) return "—"
  
  const d = typeof date === "string" ? new Date(date) : date
  
  if (format === "short") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }
  
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
}

/**
 * Format time to readable format
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

/**
 * Format date and time together
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return `${formatDate(d)} ${formatTime(d)}`
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return formatDate(d, "short")
}

// ============================================
// NUMBER FORMATTING & PARSING
// ============================================

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("am-ET").format(num)
}

/**
 * Parse number from formatted string
 */
export function parseFormattedNumber(str: string): number {
  // Remove common thousand separators and return parsed number
  return parseFloat(str.replace(/,/g, "").replace(/\s/g, ""))
}

/**
 * Round to 2 decimals
 */
export function round2(num: number): number {
  return Math.round(num * 100) / 100
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number, decimals: number = 1): number {
  if (total === 0) return 0
  return round2((value / total) * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate Ethiopian phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Ethiopian phone numbers: +251XXXXXXXXX or 0XXXXXXXXX
  const phoneRegex = /^(\+251|0)\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

/**
 * Validate positive amount
 */
export function isValidAmount(amount: number | string): boolean {
  const num = typeof amount === "string" ? parseFloat(amount) : amount
  return !isNaN(num) && num > 0
}

/**
 * Validate date range
 */
export function isValidDateRange(startDate: Date | string, endDate: Date | string): boolean {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  const end = typeof endDate === "string" ? new Date(endDate) : endDate
  return start < end
}

// ============================================
// AMHARIC TEXT UTILITIES
// ============================================

/**
 * Replace placeholders in template with values
 */
export function replacePlaceholders(
  template: string,
  values: Record<string, string | number>
): string {
  let result = template
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = new RegExp(`\\[${key}\\]`, "g")
    result = result.replace(placeholder, String(value))
  })
  return result
}

/**
 * Common placeholder replacements for SMS templates
 */
export const SMS_PLACEHOLDERS = {
  EN: {
    TENANT: "[Tenant]",
    RENT_AMOUNT: "[RentAmount]",
    DUE_DATE: "[DueDate]",
    BUILDING: "[Building]",
    ROOM: "[Room]"
  },
  AM: {
    TENANT: "[ተከራይ]",
    RENT_AMOUNT: "[ክፍያ]",
    DUE_DATE: "[ቀን]",
    BUILDING: "[ህንፃ]",
    ROOM: "[ክፍል]"
  }
}

export default {
  gregorianToEthiopian,
  ethiopianToGregorian,
  formatDualDate,
  calculateMonthlyRent,
  calculateInvoiceTotals,
  formatETB,
  calculateGatewayFee,
  calculatePrePaidValue,
  calculateCommission,
  distributeUtilityCost,
  verifyUtilityDistribution,
  generateInvoiceNumber,
  getDaysOverdue,
  getPaymentProgress,
  getPaymentStatusInfo,
  formatDate,
  formatTime,
  formatDateTime,
  getRelativeTime,
  formatNumber,
  parseFormattedNumber,
  round2,
  calculatePercentage,
  isValidEmail,
  isValidPhoneNumber,
  isValidAmount,
  isValidDateRange,
  replacePlaceholders
}
