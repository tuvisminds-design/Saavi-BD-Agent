import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const seats = [
  {
    role: "HR owner",
    who: "Head of HR, CHRO, or VP of HR",
    ask: "Who owns festival, onboarding, and employee gifts?",
  },
  {
    role: "Chief executive",
    who: "Managing director or CEO",
    ask: "Who sponsors the brand and the artisan story?",
  },
  {
    role: "Finance owner",
    who: "CFO",
    ask: "Who releases the gifting budget?",
  },
]

export default function PersonasPage() {
  return (
    <SiteShell current="/personas">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl">One persona, two minutes</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Do not write a new persona for every inbound lead. Saavi sells into
          the same three seats wherever the company has an HR function. The
          industry can be gears, electronics, or anything else. The dossier
          already fills the seats a public page names. Your job is to verify
          them.
        </p>
      </div>

      <ol className="mt-8 grid gap-3 md:grid-cols-3">
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
          <p>Open Moneycontrol and read the latest annual sales. If it is outside ₹500–1,000 crore, stop. If the page is standalone and the company reports a larger group figure, use the group figure.</p>
          <p>Find the HR head on a company page, a filing, or a public profile. If nothing names an HR function, stop. Industry is not a reason to stop.</p>
          <p>Open the LinkedIn company page. Confirm the legal name, the city, and the business. If LinkedIn’s revenue disagrees with Moneycontrol, keep Moneycontrol.</p>
          <p>Open each stored profile or people search. Keep the person only when the title matches the dossier. If the HR head has resigned and no successor is filed, the account stays medium.</p>
          <p>
            Highly qualified means the score is above 0.80, which needs the
            band, a named HR head, the CEO and the CFO, and the LinkedIn
            company check. A vacant HR seat keeps a good revenue line in the
            medium band.
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
