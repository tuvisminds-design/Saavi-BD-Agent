import { SiteShell } from "@/components/site-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addSignalAction } from "@/lib/prospecting/actions"
import { listCompanies, listSignals } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export default async function SignalsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const signals = listSignals()
  const companies = listCompanies()

  return (
    <SiteShell current="/signals">
      <h1 className="font-heading text-3xl text-balance md:text-4xl">Gifting signals</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        The feed starts empty. Paste a public tender, CSR note, or news item you have already opened. A match on a
        seeking-vendor phrase plus a gifting word raises the score. Nothing here is pulled from LinkedIn.
      </p>
      {error ? (
        <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">{error}</p>
      ) : null}
      <form action={addSignalAction} className="mt-6 grid gap-3 rounded-lg border border-border p-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground md:col-span-2">
          Company
          <select suppressHydrationWarning className={selectClass} name="companyId" required defaultValue="">
            <option value="" disabled>
              Choose a company
            </option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground md:col-span-2">
          What the source says
          <Input name="title" required placeholder="Diwali employee gifts RFQ" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Source URL
          <Input name="url" required type="url" placeholder="https://" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Published
          <Input name="publishedAt" type="date" required />
        </label>
        <div className="md:col-span-2">
          <Button type="submit">Save signal</Button>
        </div>
      </form>
      {signals.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
          No signals yet. A company stays WARM until one is saved.
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {signals.map((signal) => (
            <li key={signal.id} className="rounded-lg border border-border p-4">
              <p className="text-xs tracking-wide text-primary uppercase">
                {signal.company} · score {signal.score}
              </p>
              <p className="mt-1 text-lg">{signal.title}</p>
              <p className="text-sm text-muted-foreground">{signal.publishedAt}</p>
              <a className="mt-2 inline-block text-sm break-all text-primary underline-offset-4 hover:underline" href={signal.url}>
                {signal.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </SiteShell>
  )
}
