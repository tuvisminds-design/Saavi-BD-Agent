import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteShell } from "@/components/site-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { deleteCompanyAction, pasteLinkedInAction } from "@/lib/prospecting/actions"
import { evidenceFor, listCompanies, listExecutives, revenueLabel } from "@/lib/prospecting/db"
import { PERSONA_LABEL } from "@/lib/prospecting/labels"
import { linkedInSearchLink } from "@/lib/prospecting/linkedin"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function CompanyPage({
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
  const executives = listExecutives(company.id)
  const evidence = evidenceFor(company.id)

  return (
    <SiteShell current="/">
      <p className="text-sm">
        <Link href="/" className="text-primary underline-offset-4 hover:underline">
          Companies
        </Link>
      </p>
      <h1 className="mt-2 font-heading text-3xl text-balance">{company.name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {revenueLabel(company)}
        {company.hq_location ? ` · ${company.hq_location}` : ""}
        {company.csr_obligated === 1 ? " · CSR obligated Y" : " · CSR not confirmed"}
        {company.tag ? ` · ${company.tag}` : ""}
      </p>
      {company.website ? (
        <p className="mt-2 text-sm">
          <a className="text-primary underline-offset-4 hover:underline" href={company.website}>
            {company.website}
          </a>
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">{error}</p>
      ) : null}

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Buying committee</h2>
        <ul className="mt-4 flex flex-col gap-4">
          {(["CEO_FOUNDER", "HR", "CSR", "MARKETING", "PROCUREMENT"] as const).map((persona) => {
            const executive = executives.find((row) => row.persona === persona)
            const sources = executive ? evidence.filter((row) => row.executiveId === executive.id) : []
            const search = executive?.full_name ? linkedInSearchLink(executive.full_name, company.name) : null
            return (
              <li key={persona} className="rounded-lg border border-border p-4">
                <p className="text-xs tracking-wide text-primary uppercase">{PERSONA_LABEL[persona]}</p>
                <p className="mt-1 text-lg">{executive?.full_name ?? "Blank"}</p>
                <p className="text-sm text-muted-foreground">
                  {executive?.raw_title ?? "No public source in this pilot"} · {executive?.status ?? "NOT_FOUND"}
                  {executive?.confidence ? ` · ${executive.confidence}` : ""}
                  {executive?.full_name && !executive.linkedin_url ? " · LinkedIn pending" : ""}
                  {executive?.linkedin_url ? " · LinkedIn pasted" : ""}
                </p>
                {search ? (
                  <p className="mt-2 text-sm">
                    <a className="text-primary underline-offset-4 hover:underline" href={search} target="_blank" rel="noreferrer">
                      Open a LinkedIn people search
                    </a>
                    <span className="text-muted-foreground"> in your own LinkedIn session.</span>
                  </p>
                ) : null}
                {executive?.linkedin_url ? (
                  <p className="mt-2 text-sm break-all">
                    Pasted profile ({executive.linkedin_source}): {executive.linkedin_url}
                  </p>
                ) : executive?.full_name ? (
                  <form action={pasteLinkedInAction} className="mt-3 grid gap-2 sm:grid-cols-[1fr_12rem_auto]">
                    <input type="hidden" name="companyId" value={company.id} />
                    <input type="hidden" name="executiveId" value={executive.id} />
                    <Input name="url" placeholder="https://www.linkedin.com/in/…" required />
                    <Input name="pastedBy" placeholder="Your name" required />
                    <Button type="submit" variant="outline">
                      Paste profile
                    </Button>
                  </form>
                ) : null}
                {sources.length > 0 ? (
                  <ul className="mt-3 flex flex-col gap-1 text-sm">
                    {sources.map((source) => (
                      <li key={`${source.field}-${source.sourceUrl}`}>
                        <a className="break-all text-primary underline-offset-4 hover:underline" href={source.sourceUrl}>
                          {source.sourceType}: {source.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Company evidence</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {evidence
            .filter((row) => row.executiveId === null)
            .map((row) => (
              <li key={`${row.field}-${row.sourceUrl}`}>
                {row.field}: {row.value} —{" "}
                <a className="break-all text-primary underline-offset-4 hover:underline" href={row.sourceUrl}>
                  {row.sourceType}
                </a>
              </li>
            ))}
        </ul>
      </section>

      <form action={deleteCompanyAction} className="mt-10 flex flex-col gap-3 rounded-lg border border-border p-4">
        <input type="hidden" name="id" value={company.id} />
        <p className="font-heading text-xl">Remove this company</p>
        <p className="text-sm text-muted-foreground">Deletes the company, its executives, evidence, and signals.</p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="confirm" className="size-4" />
          I want this record removed
        </label>
        <Button type="submit" variant="outline" className="w-fit">
          Delete
        </Button>
      </form>
    </SiteShell>
  )
}
