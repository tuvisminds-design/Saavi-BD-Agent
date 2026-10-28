import Link from "next/link"

import { CompanyTable, type CompanyRow } from "@/components/company-table"
import { SiteShell } from "@/components/site-shell"
import { buttonVariants } from "@/components/ui/button"
import { listCompanies, listExecutives, revenueLabel } from "@/lib/prospecting/db"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function statusOf(rows: { status: string; full_name: string | null }[]) {
  if (rows.some((row) => row.status === "CONFLICT")) return "CONFLICT"
  if (rows.some((row) => row.full_name && row.status === "MEDIUM")) return "MEDIUM"
  if (rows.some((row) => row.full_name && row.status === "VERIFIED")) return "VERIFIED"
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
  }))

  return (
    <SiteShell current="/">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl text-balance md:text-4xl">Companies in the gifting band</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Twenty listed companies with a filed sales line between ₹100 crore and ₹5,000 crore. Names appear only
            when a filing, annual report, BRSR, or the company site says so. Marketing and procurement heads are
            usually not public, so those cells stay blank until a rep finds a source.
          </p>
        </div>
        <Link href="/api/export" className={cn(buttonVariants())}>
          Export Excel
        </Link>
      </div>
      <CompanyTable rows={rows} />
    </SiteShell>
  )
}
