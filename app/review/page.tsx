import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { Button } from "@/components/ui/button"
import { resolveReviewAction } from "@/lib/prospecting/actions"
import { evidenceFor, listReviews } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default function ReviewPage() {
  const items = listReviews()

  return (
    <SiteShell current="/review">
      <h1 className="font-heading text-3xl text-balance md:text-4xl">Review queue</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Companies whose HR head is still blank, with the source note beside the company. Accept closes the note.
        Reject clears an HR name so the Excel cell stays blank.
      </p>
      {items.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
          The queue is empty.
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {items.map((item) => {
            const evidence = item.companyId ? evidenceFor(item.companyId) : []
            return (
              <li key={item.id} className="rounded-lg border border-border p-4">
                <p className="text-xs tracking-wide text-primary uppercase">{item.entityType}</p>
                <p className="mt-1 font-heading text-xl">
                  {item.companyId ? (
                    <Link href={`/companies/${item.companyId}`} className="underline-offset-4 hover:underline">
                      {item.company}
                    </Link>
                  ) : (
                    item.company
                  )}
                </p>
                <p className="mt-2 text-sm leading-6">{item.reason}</p>
                {evidence.length > 0 ? (
                  <ul className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
                    {evidence.slice(0, 6).map((row) => (
                      <li key={`${row.field}-${row.sourceUrl}-${row.executiveId ?? "c"}`}>
                        <a className="break-all underline-offset-4 hover:underline" href={row.sourceUrl}>
                          {row.field}: {row.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <form action={resolveReviewAction} className="mt-3 flex gap-2">
                  <input type="hidden" name="id" value={item.id} />
                  <Button type="submit" name="decision" value="accepted" size="sm">
                    Accept
                  </Button>
                  <Button type="submit" name="decision" value="rejected" size="sm" variant="outline">
                    Reject
                  </Button>
                </form>
              </li>
            )
          })}
        </ul>
      )}
    </SiteShell>
  )
}
