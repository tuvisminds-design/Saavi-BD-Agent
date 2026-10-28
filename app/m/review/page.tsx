import Link from "next/link"

import { Button } from "@/components/ui/button"
import { resolveReviewAction } from "@/lib/prospecting/actions"
import { listReviews } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default function MobileReview() {
  const items = listReviews()
  return (
    <div>
      <h1 className="font-heading text-3xl">Review</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        HR seats that are still blank. Accept closes the note. Reject clears a stored HR name.
      </p>
      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
          The queue is empty.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-2xl border border-border p-4">
              {item.companyId ? (
                <Link href={`/m/companies/${item.companyId}`} className="font-heading text-xl">
                  {item.company}
                </Link>
              ) : (
                <p className="font-heading text-xl">{item.company}</p>
              )}
              <p className="mt-2 text-sm leading-6">{item.reason}</p>
              <form action={resolveReviewAction} className="mt-3 flex gap-2">
                <input type="hidden" name="id" value={item.id} />
                <Button type="submit" name="decision" value="accepted" className="min-h-11 flex-1">
                  Accept
                </Button>
                <Button type="submit" name="decision" value="rejected" variant="outline" className="min-h-11 flex-1">
                  Reject
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
