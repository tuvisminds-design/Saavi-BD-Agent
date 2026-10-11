import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { TierBadge } from "@/components/tier-badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { summaryPayload } from "@/lib/desk-query"
import { formatScore, tierLabel } from "@/lib/qualification"

export const dynamic = "force-dynamic"

export default function HomePage() {
  const { counts, high, medium } = summaryPayload()

  return (
    <SiteShell current="/">
      <div className="flex flex-col gap-8">
        <section className="max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight md:text-5xl">
            Call when the band is right and HR is named
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            <a className="underline underline-offset-4" href="https://saavi.tuvisminds.com/">
              Saavi
            </a>{" "}
            sells sustainable corporate gifts from Pune. The buyer is HR, with
            the CEO and the CFO in the same pass. Industry does not decide the
            lead. The Node API scores each account from 0 to 1. Above 0.80 is
            highly qualified. 0.50 to 0.80 stays in the file. Under 0.50, outside
            the Moneycontrol band, or with no HR evidence, is cut off.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>The two gates, then the score</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm leading-relaxed md:grid-cols-2">
            <p>
              Revenue is the latest annual sales line on Moneycontrol. It has
              to read between ₹500 crore and ₹1,000 crore. An older year that
              used to fit does not count. When the default view is standalone
              and the company reports a larger group figure, the group figure
              decides.
            </p>
            <p>
              The organisation needs an HR seat: a Head of HR, a CHRO, or a VP
              of HR on a company page, a filing, or a public profile. A vacant
              HR office can stay medium. No evidence of HR cuts the account
              off, whatever the industry.
            </p>
            <p>
              Pune is a score, because Saavi is in Pune. A headquarters or plant
              adds 0.15. An office adds 0.05. No Pune site adds nothing.
            </p>
            <p>
              LinkedIn verifies the company page and the person’s title. It is
              not the revenue source, and it is not scraped.
            </p>
          </CardContent>
        </Card>

        <section className="grid gap-3 sm:grid-cols-3">
          {(
            [
              ["high", "Above 0.80. Book HR, and copy the CEO and the CFO."],
              ["medium", "0.50 to 0.80. Close the open seat on the dossier, then call."],
              ["cutoff", "Under 0.50, no HR evidence, or outside the Moneycontrol band."],
            ] as const
          ).map(([tier, note]) => (
            <Link key={tier} href={`/accounts?tier=${tier}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3">
                    <span className="font-heading text-4xl">{counts[tier]}</span>
                    <TierBadge tier={tier} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {tierLabel(tier)}. {note}
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-heading text-2xl">Highly qualified</h2>
            <Link href="/personas" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Two-minute persona
            </Link>
          </div>
          <div className="grid gap-3">
            {high.map((account) => (
              <Link key={account.slug} href={`/accounts/${account.slug}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-wrap items-center justify-between gap-3">
                      <span>{account.name}</span>
                      <span className="font-mono text-base">{formatScore(account.score)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    {account.revenueLabel}. {account.whatTheyMake}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-2xl">Medium qualified</h2>
          <div className="grid gap-3">
            {medium.map((account) => (
              <Link key={account.slug} href={`/accounts/${account.slug}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-wrap items-center justify-between gap-3">
                      <span>{account.name}</span>
                      <span className="font-mono text-base">{formatScore(account.score)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    {account.revenueLabel}. {account.location}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Why familiar names still fall off</CardTitle>
          </CardHeader>
          <CardContent className="max-w-3xl space-y-3 text-sm leading-relaxed">
            <p>
              On Moneycontrol’s latest year, Thermax is ₹10,694 crore and Bharat
              Forge is ₹16,811 crore. Sanghvi Movers moved from ₹782 crore in
              Mar 2025 to ₹1,070 crore in Mar 2026, so the latest year is over
              the ceiling. Exicom’s default Moneycontrol line is standalone
              ₹894 crore, and the company’s FY26 group revenue is about ₹1,152
              crore. The group figure decides.
            </p>
            <p>
              Azad Engineering and Windsor Machines sit inside the band and
              still fall off, because this file has no public HR seat for them.
              The names that clear 0.80 have a named HR head, a CEO, and a CFO,
              plus a LinkedIn company check. They sit in Coimbatore, Chennai,
              Bengaluru, and Hyderabad. Pune still adds points when a source
              shows a headquarters, a plant, or a branch.
            </p>
            <Link href="/accounts?tier=cutoff" className="inline-block underline underline-offset-4">
              See the cut-off list
            </Link>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  )
}
