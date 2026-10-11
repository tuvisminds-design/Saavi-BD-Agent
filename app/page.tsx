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
            Call only the ₹500–1,000 crore equipment leads
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Inbound names in this revenue band convert slowly because most of
            them are not equipment companies, and the famous Pune plants are
            far larger than the band. The Node API scores each account from 0
            to 1. Above 0.80 is highly qualified. 0.50 to 0.80 stays in the
            file. Under 0.50, or outside the band, is cut off.
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
              used to fit does not count.
            </p>
            <p>
              The company has to make process equipment, heavy equipment, or
              industrial machinery. A random manufacturer inside the band is
              cut off before anyone builds a persona.
            </p>
            <p>
              Pune is a score, not a gate. A plant would add 0.15. A sales
              office adds 0.05. No Pune site adds nothing.
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
              ["high", "Above 0.80. Book the first meeting."],
              ["medium", "0.50 to 0.80. Close the gap on the dossier, then call."],
              ["cutoff", "Under 0.50, wrong product, or outside the Moneycontrol band."],
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
            <CardTitle>Why the familiar Pune names are missing</CardTitle>
          </CardHeader>
          <CardContent className="max-w-3xl space-y-3 text-sm leading-relaxed">
            <p>
              On Moneycontrol’s latest year, Thermax is ₹10,694 crore, Bharat
              Forge is ₹16,811 crore, and Kirloskar Pneumatic is ₹1,786 crore.
              Action Construction Equipment, a crane maker, is ₹3,280 crore.
              Sanghvi Movers moved from ₹782 crore in Mar 2025 to ₹1,070 crore
              in Mar 2026, so the latest year is over the ceiling.
            </p>
            <p>
              The names that survive are process-equipment and industrial
              machinery companies inside the band. Two of them clear 0.80
              without a Pune plant. Pune still adds points when a source shows
              a plant or a branch.
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
