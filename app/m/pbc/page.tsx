import { listCompanies, listEvents, listReviews } from "@/lib/prospecting/db"
import { loadPbc } from "@/lib/prospecting/pbc"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default function MobilePbc() {
  const manifest = loadPbc()
  const events = listEvents().slice(0, 8)
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-primary uppercase">{manifest.id}</p>
      <h1 className="mt-2 font-heading text-3xl text-balance">{manifest.name}</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{manifest.capability}</p>
      <p className="mt-4 text-sm">
        {listCompanies().length} companies · {listReviews().length} open reviews
      </p>
      <a
        href="/api/export"
        download="saavi-prospects.xlsx"
        className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-primary px-3 text-sm text-primary-foreground"
      >
        Download Excel
      </a>
      <h2 className="mt-6 font-heading text-2xl">Events</h2>
      <ul className="mt-2 flex flex-col gap-2 text-sm">
        {events.map((event) => (
          <li key={event.id} className="rounded-xl border border-border px-3 py-2">
            {event.type}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-6 text-muted-foreground">
        Add this screen to your home screen from the browser menu. It opens the same Saavi book. LinkedIn profiles are
        pasted by a person.
      </p>
    </div>
  )
}
