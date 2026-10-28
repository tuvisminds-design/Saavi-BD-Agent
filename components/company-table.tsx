"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"

export type CompanyRow = {
  id: number
  name: string
  revenueLabel: string
  revenue: number
  location: string
  csr: string
  tag: string
  status: string
  hrName: string
}

const selectClass =
  "h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export function CompanyTable({ rows }: { rows: CompanyRow[] }) {
  const [city, setCity] = useState("all")
  const [tag, setTag] = useState("all")
  const [csr, setCsr] = useState("all")
  const [status, setStatus] = useState("all")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")

  const cities = useMemo(
    () => [...new Set(rows.map((row) => row.location).filter(Boolean))].sort(),
    [rows],
  )

  const visible = rows.filter((row) => {
    if (city !== "all" && row.location !== city) return false
    if (tag !== "all" && row.tag !== tag) return false
    if (csr === "Y" && row.csr !== "Y") return false
    if (csr === "unknown" && row.csr === "Y") return false
    if (status !== "all" && row.status !== status) return false
    const floor = min === "" ? null : Number(min)
    const ceiling = max === "" ? null : Number(max)
    if (floor !== null && !Number.isNaN(floor) && row.revenue < floor) return false
    if (ceiling !== null && !Number.isNaN(ceiling) && row.revenue > ceiling) return false
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          City
          <select suppressHydrationWarning className={selectClass} value={city} onChange={(event) => setCity(event.target.value)}>
            <option value="all">All cities</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Revenue from ₹ cr
          <Input inputMode="decimal" value={min} onValueChange={setMin} placeholder="100" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Revenue to ₹ cr
          <Input inputMode="decimal" value={max} onValueChange={setMax} placeholder="5000" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          CSR obligated
          <select suppressHydrationWarning className={selectClass} value={csr} onChange={(event) => setCsr(event.target.value)}>
            <option value="all">All</option>
            <option value="Y">Yes</option>
            <option value="unknown">Not confirmed</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Tag
          <select suppressHydrationWarning className={selectClass} value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">All</option>
            <option value="HOT">HOT</option>
            <option value="WARM">WARM</option>
            <option value="EDGE_OF_BAND">EDGE_OF_BAND</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Status
          <select suppressHydrationWarning className={selectClass} value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="CONFLICT">CONFLICT</option>
            <option value="NOT_FOUND">NOT_FOUND</option>
          </select>
        </label>
      </div>
      <p className="text-sm text-muted-foreground">
        {visible.length} of {rows.length} companies. A blank name is a blank on purpose.
      </p>
      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
          No companies match these filters.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-lg border border-border md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-3 py-2 font-medium">Company</th>
                  <th className="px-3 py-2 font-medium">Revenue</th>
                  <th className="px-3 py-2 font-medium">Location</th>
                  <th className="px-3 py-2 font-medium">HR head</th>
                  <th className="px-3 py-2 font-medium">Tag</th>
                  <th className="px-3 py-2 font-medium">CSR</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="px-3 py-2">
                      <Link href={`/companies/${row.id}`} className="font-medium text-foreground underline-offset-4 hover:underline">
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{row.revenueLabel}</td>
                    <td className="px-3 py-2">{row.location || "—"}</td>
                    <td className="px-3 py-2">{row.hrName || "Blank"}</td>
                    <td className="px-3 py-2">{row.tag}</td>
                    <td className="px-3 py-2">{row.csr || "—"}</td>
                    <td className="px-3 py-2">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="flex flex-col gap-3 md:hidden">
            {visible.map((row) => (
              <li key={row.id} className="rounded-lg border border-border p-4">
                <Link href={`/companies/${row.id}`} className="font-heading text-lg">
                  {row.name}
                </Link>
                <p className="mt-1 text-sm">{row.revenueLabel}</p>
                <p className="text-sm text-muted-foreground">
                  HR {row.hrName || "blank"} · {row.location || "Location not filed here"} · {row.tag} · {row.status}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
