import Link from "next/link"

import { listCompanies, listExecutives, revenueLabel } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function MobileHome({
  searchParams,
}: {
  searchParams: Promise<{ hr?: string }>
}) {
  const { hr } = await searchParams
  const rows = listCompanies().map((company) => {
    const person = listExecutives(company.id).find((row) => row.persona === "HR")
    return {
      id: company.id,
      name: company.name,
      revenue: revenueLabel(company),
      location: company.hq_location ?? "",
      hrName: person?.full_name ?? "",
      status: person?.full_name ? person.status : "NOT_FOUND",
    }
  })
  const visible = rows.filter((row) => {
    if (hr === "named") return Boolean(row.hrName)
    if (hr === "blank") return !row.hrName
    return true
  })
  const named = rows.filter((row) => row.hrName).length

  return (
    <div>
      <h1 className="font-heading text-3xl text-balance">HR heads</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {named} named of {rows.length}. A blank seat stays blank until a filing or the company site names the HR head.
      </p>
      <div className="mt-4 flex gap-2">
        {[
          ["all", "All"],
          ["named", "Named"],
          ["blank", "Blank"],
        ].map(([value, label]) => {
          const on = (hr ?? "all") === value
          return (
            <Link
              key={value}
              href={value === "all" ? "/m" : `/m?hr=${value}`}
              className={on ? "rounded-full bg-primary px-3 py-2 text-sm text-primary-foreground" : "rounded-full border border-border px-3 py-2 text-sm"}
            >
              {label}
            </Link>
          )
        })}
      </div>
      {visible.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
          No companies in this view.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {visible.map((row) => (
            <li key={row.id}>
              <Link href={`/m/companies/${row.id}`} className="block rounded-2xl border border-border bg-card p-4">
                <p className="text-xs tracking-wide text-primary uppercase">{row.status}</p>
                <p className="mt-1 font-heading text-2xl">{row.hrName || "HR blank"}</p>
                <p className="mt-1 text-sm">{row.name}</p>
                <p className="text-sm text-muted-foreground">
                  {row.revenue}
                  {row.location ? ` · ${row.location}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
