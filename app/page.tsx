import { CompanyTable, type CompanyRow } from "@/components/company-table"
import { SiteShell } from "@/components/site-shell"
import { buttonVariants } from "@/components/ui/button"
import { listCompanies, listExecutives, revenueLabel } from "@/lib/prospecting/db"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function statusOf(rows: { persona: string; status: string; full_name: string | null }[]) {
  const hr = rows.filter((row) => row.persona === "HR")
  if (hr.some((row) => row.status === "CONFLICT")) return "CONFLICT"
  if (hr.some((row) => row.full_name && row.status === "MEDIUM")) return "MEDIUM"
  if (hr.some((row) => row.full_name && row.status === "VERIFIED")) return "VERIFIED"
  return "NOT_FOUND"
}

export default function HomePage() {
  const rows: CompanyRow[] = listCompanies().map((company) => ({
    id: company.id,
    name: company.name,
    revenueLabel: revenueLabel(company),
    revenue: company.revenue_inr_crore ?? 0,
    location: company.hq_location ?? "",
    csr: company.csr_obligated === 1 ? "Y" : "",
    tag: company.tag ?? "",
    status: statusOf(listExecutives(company.id)),
    hrName: listExecutives(company.id).find((row) => row.persona === "HR")?.full_name ?? "",
  }))

  return (
    <SiteShell current="/">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl text-balance md:text-4xl">HR heads in the gifting band</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Twenty listed companies. The only person in this book is the HR or People head, and only when a filing
            or the company site names them. Three names are filled. The other HR cells stay blank.
          </p>
        </div>
        <a href="/api/export" download="saavi-prospects.xlsx" className={cn(buttonVariants())}>
          Export Excel
        </a>
      </div>
      <CompanyTable rows={rows} />
    </SiteShell>
  )
}
