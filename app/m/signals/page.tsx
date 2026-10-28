import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addSignalAction } from "@/lib/prospecting/actions"
import { listCompanies, listSignals } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const selectClass =
  "min-h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export default async function MobileSignals({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const signals = listSignals()
  const companies = listCompanies()
  return (
    <div>
      <h1 className="font-heading text-3xl">Signals</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Paste a public tender, CSR note, or news item you have already opened. The feed starts empty.
      </p>
      {error ? <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm">{error}</p> : null}
      <form action={addSignalAction} className="mt-4 flex flex-col gap-3 rounded-2xl border border-border p-4">
        <input type="hidden" name="next" value="/m/signals" />
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
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
        <Input name="title" required placeholder="What the source says" />
        <Input name="url" required type="url" placeholder="https://" />
        <Input name="publishedAt" required type="date" />
        <Button type="submit" className="min-h-11">
          Save signal
        </Button>
      </form>
      {signals.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
          No signals yet. A company stays WARM until one is saved.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {signals.map((signal) => (
            <li key={signal.id} className="rounded-2xl border border-border p-4">
              <p className="text-xs tracking-wide text-primary uppercase">
                {signal.company} · {signal.score}
              </p>
              <p className="mt-1 text-lg">{signal.title}</p>
              <a className="mt-2 block text-sm break-all text-primary" href={signal.url}>
                {signal.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
