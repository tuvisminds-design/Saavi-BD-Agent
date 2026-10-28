import { SiteShell } from "@/components/site-shell"
import { buttonVariants } from "@/components/ui/button"
import { listCompanies, listEvents, listReviews } from "@/lib/prospecting/db"
import { loadPbc } from "@/lib/prospecting/pbc"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default function PbcPage() {
  const manifest = loadPbc()
  const events = listEvents().slice(0, 12)

  return (
    <SiteShell current="/pbc">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">{manifest.organization}</p>
      <h1 className="mt-2 font-heading text-3xl text-balance md:text-4xl">{manifest.name}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{manifest.capability}</p>

      <section className="mt-8 rounded-lg border border-border p-4">
        <h2 className="font-heading text-2xl">Open it here</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          This page is the package. The book, the review queue, the signal feed, and the Excel file are the same
          Saavi desk. On the computer running the desk, the address is http://127.0.0.1:4179. Open that port from
          this agent. A browser on another computer cannot see it.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="/" className={cn(buttonVariants())}>
            Companies
          </a>
          <a href="/review" className={cn(buttonVariants({ variant: "outline" }))}>
            Review
          </a>
          <a href="/signals" className={cn(buttonVariants({ variant: "outline" }))}>
            Signals
          </a>
          <a href="/api/export" download="saavi-prospects.xlsx" className={cn(buttonVariants({ variant: "outline" }))}>
            Excel
          </a>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {listCompanies().length} companies · {listReviews().length} open reviews · workbook saavi-prospects.xlsx in the
          project root. Capability id {manifest.id}.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">APIs</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {manifest.apis.map((api) => (
            <li key={`${api.method} ${api.path}`} className="rounded-lg border border-border px-3 py-2">
              <span className="font-medium">{api.method}</span> {api.path}
              <span className="text-muted-foreground"> — {api.purpose}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Events</h2>
        <p className="mt-2 text-sm text-muted-foreground">{manifest.events.join(" · ")}</p>
        {events.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No events yet.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {events.map((event) => (
              <li key={event.id} className="rounded-lg border border-border px-3 py-2">
                <span className="font-medium">{event.type}</span>
                <span className="text-muted-foreground"> · {event.occurredAt}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Rules this package keeps</h2>
        <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-muted-foreground">
          {manifest.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </SiteShell>
  )
}
