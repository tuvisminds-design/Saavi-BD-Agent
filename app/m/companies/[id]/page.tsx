import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { deleteCompanyAction, pasteLinkedInAction } from "@/lib/prospecting/actions"
import { evidenceFor, listCompanies, listExecutives, qualificationFor, revenueLabel } from "@/lib/prospecting/db"
import { linkedInSearchLink } from "@/lib/prospecting/linkedin"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function MobileCompany({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  const company = listCompanies().find((row) => row.id === Number(id))
  if (!company) notFound()
  const hr = listExecutives(company.id).find((row) => row.persona === "HR")
  const evidence = evidenceFor(company.id)
  const sources = evidence.filter((row) => row.executiveId === hr?.id)
  const view = qualificationFor(company.id)
  const search = hr?.full_name ? linkedInSearchLink(hr.full_name, company.name) : null

  return (
    <div>
      <Link href="/m" className="text-sm text-primary">
        HR book
      </Link>
      <h1 className="mt-2 font-heading text-3xl text-balance">{hr?.full_name || "HR blank"}</h1>
      <p className="mt-1 text-sm">{company.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {revenueLabel(company)}
        {company.hq_location ? ` · ${company.hq_location}` : ""}
        {hr?.raw_title ? ` · ${hr.raw_title}` : ""}
        {hr?.full_name ? ` · ${hr.status}` : " · NOT_FOUND"}
        {hr?.full_name && !hr.linkedin_url ? " · LinkedIn pending" : ""}
      </p>
      {error ? <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm">{error}</p> : null}

      {search ? (
        <a className="mt-4 block min-h-11 rounded-lg border border-border px-3 py-3 text-sm text-primary" href={search}>
          Open a LinkedIn people search in your own session
        </a>
      ) : null}

      {hr?.full_name && !hr.linkedin_url ? (
        <form action={pasteLinkedInAction} className="mt-4 flex flex-col gap-2">
          <input type="hidden" name="next" value={`/m/companies/${company.id}`} />
          <input type="hidden" name="companyId" value={company.id} />
          <input type="hidden" name="executiveId" value={hr.id} />
          <Input name="url" required placeholder="https://www.linkedin.com/in/…" />
          <Input name="pastedBy" required placeholder="Your name" />
          <Button type="submit" className="min-h-11">
            Paste profile
          </Button>
        </form>
      ) : null}

      {hr?.linkedin_url ? <p className="mt-3 text-sm break-all">Pasted profile: {hr.linkedin_url}</p> : null}

      {sources.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {sources.map((source) => (
            <li key={source.sourceUrl}>
              <a className="break-all text-primary" href={source.sourceUrl}>
                {source.sourceType}: {source.value}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No public HR source in this pilot.</p>
      )}

      {view ? (
        <section className="mt-6">
          <h2 className="font-heading text-2xl">Qualification</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {view.priorityScore}/100. {view.priorityReason}
          </p>
          {(
            [
              ["BANT", view.bant],
              ["SPICED", view.spiced],
              ["MEDDPICC", view.meddpicc],
            ] as const
          ).map(([name, fields]) => (
            <article key={name} className="mt-3 rounded-2xl border border-border p-4">
              <h3 className="text-xs tracking-wide text-primary uppercase">{name}</h3>
              <ul className="mt-2 flex flex-col gap-2 text-sm">
                {Object.entries(fields).map(([element, field]) => (
                  <li key={element}>
                    <p className="font-medium capitalize">{element.replaceAll("_", " ")}</p>
                    <p>{field.known ?? "Missing"}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      ) : null}

      <form action={deleteCompanyAction} className="mt-8 flex flex-col gap-3 rounded-2xl border border-border p-4">
        <input type="hidden" name="id" value={company.id} />
        <input type="hidden" name="next" value={`/m/companies/${company.id}`} />
        <p className="font-heading text-xl">Remove this company</p>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input suppressHydrationWarning type="checkbox" name="confirm" className="size-4" />
          I want this record removed
        </label>
        <Button type="submit" variant="outline" className="min-h-11">
          Delete
        </Button>
      </form>
    </div>
  )
}
