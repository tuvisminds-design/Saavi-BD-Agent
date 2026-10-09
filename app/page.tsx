import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { TierBadge } from "@/components/tier-badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { evidenceGap, pursueNow, tierCounts } from "@/lib/accounts"
import { tierLabel } from "@/lib/qualification"

export default function HomePage() {
  const counts = tierCounts()
  const pursue = pursueNow()
  const gaps = evidenceGap()

  return (
    <SiteShell current="/">
      <div className="flex flex-col gap-8">
        <section className="max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight md:text-5xl">
            Pune manufacturers worth a first meeting
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            IB-X is IntelliBuddies’ conversational AI, workflow, and RPA stack.
            It can run on-prem and connects to SAP, Oracle, and Microsoft 365.
            This desk asks which Pune heavy-equipment companies are large
            enough, and evidenced enough, for a first meeting.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Who belongs in the file</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm leading-relaxed md:grid-cols-2">
            <p>India. Audited revenue above ₹500 crore, with the working priority above ₹1,000 crore.</p>
            <p>Heavy equipment or capital goods, including process and industrial equipment.</p>
            <p>A Pune site that is more than none. An engineering centre alone is a partial gate.</p>
            <p>Every figure links to a filing, a company page, a rating rationale, or a press report. LinkedIn is not a source.</p>
          </CardContent>
        </Card>

        <section className="grid gap-3 sm:grid-cols-3">
          {(["pursue", "verify", "hold"] as const).map((tier) => (
            <Card key={tier}>
              <CardHeader>
                <CardTitle>{tierLabel(tier)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-4xl">{counts[tier]}</p>
                <p className="mt-1 text-muted-foreground">
                  {tier === "pursue" && "Gates passed and score at least 75."}
                  {tier === "verify" && "Score at least 60, or a partial Pune site, a revenue band, or a rating-agency figure."}
                  {tier === "hold" && "Competitor, conflicting or missing revenue, or a score that does not clear Verify."}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 className="font-heading text-2xl">Pursue now</h2>
            <Link href="/accounts" className={buttonVariants({ variant: "outline", size: "sm" })}>
              All accounts
            </Link>
          </div>
          <div className="grid gap-3">
            {pursue.map((account) => (
                <Link key={account.slug} href={`/accounts/${account.slug}`}>
                  <Card className="hover:bg-accent/40">
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle>{account.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-2xl">{account.score}</span>
                          <TierBadge tier={account.tier} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      <p>{account.revenueLabel}</p>
                      <p className="mt-1">{account.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl">Evidence gap</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            These names stay in the file so a conflict or a missing audit is
            visible. They are not qualified.
          </p>
          <div className="mt-4 grid gap-3">
            {gaps.map((account) => (
              <Link key={account.slug} href={`/accounts/${account.slug}`}>
                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle>{account.name}</CardTitle>
                      <TierBadge tier={account.tier} />
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    {account.holdReason}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>LinkedIn is not used</CardTitle>
          </CardHeader>
          <CardContent className="max-w-3xl leading-relaxed">
            LinkedIn’s terms prohibit scraping, login automation, and bulk
            collection of profiles. This desk does not do that. A profile
            snippet is not a source, and no LinkedIn URL is stored here.
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  )
}
