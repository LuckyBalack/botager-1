# Admin Dashboard - Developer Guide

## Quick Start

### Running the Project
```bash
npm run dev
# or
pnpm dev
```

Navigate to the admin dashboard to see all implemented features.

---

## Component Usage Examples

### Dashboard KPIs
```tsx
import { DashboardKPIs } from "@/components/dashboard-kpis"

<DashboardKPIs />
```
Displays 4 KPI cards with trend indicators.

### Billing Automations
```tsx
import { AutomatedInvoices } from "@/components/automated-invoices"
import { PaymentReminders } from "@/components/payment-reminders"
import { DunningSequences } from "@/components/dunning-sequences"

<AutomatedInvoices />
<PaymentReminders />
<DunningSequences />
```

### Maintenance Tracking
```tsx
import { MaintenanceServiceHistory } from "@/components/maintenance-service-history"
import { MaintenanceCostTracking } from "@/components/maintenance-cost-tracking"
import { MaintenanceSLA } from "@/components/maintenance-sla"

<MaintenanceServiceHistory />
<MaintenanceCostTracking />
<MaintenanceSLA />
```

### Document Management
```tsx
import { DocumentTemplates } from "@/components/document-templates"
import { DocumentVersionControl } from "@/components/document-version-control"
import { DocumentExpirationAlerts } from "@/components/document-expiration-alerts"

<DocumentTemplates />
<DocumentVersionControl />
<DocumentExpirationAlerts />
```

### Accounting Reports
```tsx
import { ProfitLossReport } from "@/components/profit-loss-report"
import { BalanceSheet } from "@/components/balance-sheet"
import { AccountReconciliation } from "@/components/account-reconciliation"

<ProfitLossReport />
<BalanceSheet />
<AccountReconciliation />
```

---

## Styling & Customization

### Color Scheme
All components use Tailwind CSS with semantic color classes:
- `bg-emerald-*` - Success/positive
- `bg-amber-*` - Warning/pending
- `bg-red-*` - Critical/error
- `bg-blue-*` - Info/neutral
- `bg-slate-*` - Background

### Modifying Colors
Edit component className directly:
```tsx
// Change badge color from emerald to blue
<Badge className="bg-blue-100 text-blue-700">Active</Badge>
```

### Responsive Breakpoints
Components use Tailwind breakpoints:
- `sm:` - 640px
- `md:` - 768px  
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

---

## Connecting to Real Data

### Example: Replacing Mock Data in Dashboard
```tsx
// Before (mock data)
const initialAlerts = [
  { id: "1", type: "critical", title: "Payment Overdue", ... }
]

// After (connect to database)
const [alerts, setAlerts] = useState([])

useEffect(() => {
  // Fetch from your API
  fetch('/api/alerts')
    .then(r => r.json())
    .then(data => setAlerts(data))
}, [])
```

### API Integration Pattern
```tsx
// In your API route (e.g., /api/alerts)
export async function GET() {
  const alerts = await db.alerts.findMany({
    where: { status: 'active' }
  })
  return Response.json(alerts)
}
```

---

## Common Tasks

### Adding a New KPI Card
Edit `dashboard-kpis.tsx`:
```tsx
<KPICard
  label="New Metric"
  value="123"
  change={5}
  trend="up"
  icon={CustomIcon}
/>
```

### Creating a New Automation Rule
Edit `automated-invoices.tsx` and add to `automationRules` array:
```tsx
{
  id: "auto-5",
  name: "Quarterly Tax Report",
  type: "recurring",
  status: "active",
  frequency: "Quarterly",
  nextRun: "May 1, 2024",
}
```

### Adding a Document Category
Edit `document-templates.tsx`:
```tsx
{
  id: "tmpl-6",
  name: "Eviction Notice",
  category: "Notice",  // Add new type if needed
  description: "...",
}
```

### Updating Financial Metrics
Edit `profit-loss-report.tsx` - all amounts are in the `plReport` array:
```tsx
{ label: "Total Revenue", amount: "ETB 7,150,000", ... }
```

---

## Troubleshooting

### Component Not Rendering
1. Check imports: `import { ComponentName } from "@/components/..."`
2. Verify component is exported: `export function ComponentName()`
3. Check for TypeScript errors in terminal

### Styling Issues
1. Ensure Tailwind CSS is initialized
2. Check class names are spelled correctly
3. Verify color tokens exist in your theme

### Data Not Updating
1. Check if state is being updated correctly
2. Verify API endpoint is returning correct data
3. Check browser console for errors

### Mobile Layout Broken
1. Check responsive classes: `sm:`, `md:`, `lg:`
2. Verify grid columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
3. Test on actual mobile device or use browser DevTools

---

## Component Props Reference

### DashboardKPIs
No props required. Uses internal mock data.

### AutomatedInvoices
No props required. Shows predefined automation rules.

### PaymentReminders
No props required. Displays reminder schedule.

### DunningSequences
No props required. Shows escalation sequences.

### MaintenanceServiceHistory
No props required. Displays service records.

### MaintenanceCostTracking
No props required. Shows budget tracking by category.

### MaintenanceSLA
No props required. Displays SLA metrics and tickets.

### DocumentTemplates
No props required. Shows template library.

### DocumentVersionControl
No props required. Displays version history.

### DocumentExpirationAlerts
No props required. Shows expiring documents.

### ProfitLossReport
No props required. Shows P&L statement.

### BalanceSheet
No props required. Shows balance sheet.

### AccountReconciliation
No props required. Shows bank reconciliation.

---

## Performance Optimization Tips

1. **Memoize Components**: Use `React.memo()` for components that don't need frequent re-renders
2. **Lazy Load Tabs**: Use dynamic imports for tab content
3. **Virtualize Lists**: For 100+ items, use react-window
4. **Debounce Searches**: Delay API calls during user input
5. **Cache API Results**: Use SWR or React Query

---

## Accessibility Checklist

- [x] Semantic HTML (tables, sections, headings)
- [x] ARIA labels on icons
- [x] Color contrast (WCAG AA)
- [x] Keyboard navigation support
- [x] Screen reader friendly
- [x] Focus indicators

### Testing Accessibility
```bash
# Use axe DevTools in Chrome/Firefox
# Or use Lighthouse in DevTools
```

---

## Deployment Notes

1. Ensure all imports use absolute paths (`@/components/...`)
2. Check for console errors before deploying
3. Test responsive layout on mobile
4. Verify all API endpoints are configured
5. Update environment variables if needed

---

## Support & Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [Shadcn/ui Docs](https://ui.shadcn.com)
- [Next.js Docs](https://nextjs.org)

---

## Version History

**v1.0.0** - Initial Phase 1 Implementation
- Dashboard enhancements
- Billing automation
- Maintenance management
- Document system
- Accounting reports

---

Last Updated: May 6, 2026
