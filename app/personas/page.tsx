import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const seats = [
  {
    role: "Economic buyer",
    who: "Managing director or CEO",
    ask: "Who can say yes to a workflow pilot on the order file?",
  },
  {
    role: "Finance owner",
    who: "CFO or the person who signs the invoice pack",
    ask: "Who feels the cost of a document that is rebuilt for every job?",
  },
  {
    role: "Technical buyer",
    who: "Engineering systems, IT, or the digital lead",
    ask: "Who will refuse a tool that cannot sit next to the drawings?",
  },
  {
    role: "Process owner",
    who: "Plant head, project execution, or service",
    ask: "Who actually moves a job from specification to dispatch?",
  },
]

export default function PersonasPage() {
  return (
    <SiteShell current="/personas">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl">One persona, two minutes</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Do not write a new persona for every inbound lead. IB-X sells into
          the same four seats at an equipment company. The dossier already
          fills the seats a public page names. Your job is to verify them, not
          to research the industry again.
        </p>
      </div>

      <ol className="mt-8 grid gap-3 md:grid-cols-2">
        {seats.map((seat, index) => (
          <li key={seat.role}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {index + 1}. {seat.role}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-relaxed">
                <p>{seat.who}</p>
                <p className="text-muted-foreground">{seat.ask}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>The pass</CardTitle>
        </CardHeader>
        <CardContent className="max-w-3xl space-y-3 text-sm leading-relaxed">
          <p>Open Moneycontrol and read the latest annual sales. If it is not ₹500–1,000 crore, stop.</p>
          <p>Read what the company makes. If it is not equipment or industrial machinery, stop.</p>
          <p>Open the LinkedIn company page. Confirm the legal name, the city, and the industry. If LinkedIn’s revenue disagrees with Moneycontrol, keep Moneycontrol.</p>
          <p>Open each stored profile or people search. Keep the person only when the title matches the dossier. If the CFO is missing, that is the gap. Do not invent the name.</p>
          <p>
            Highly qualified means the score is above 0.80, which needs the
            band, the equipment fit, named buyers, and the LinkedIn company
            check. A missing CFO keeps a good plant in the medium band.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Link href="/accounts?tier=high" className={buttonVariants()}>
          Open the highly qualified accounts
        </Link>
      </div>
    </SiteShell>
  )
}
