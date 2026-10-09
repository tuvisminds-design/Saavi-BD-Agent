import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { TierBadge } from "@/components/tier-badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { accounts } from "@/lib/accounts"
import { scoreOf, tierLabel, tierOf } from "@/lib/qualification"

export default function HomePage() {
  const ranked = accounts
    .map((account) => ({
      account,
      tier: tierOf(account),
      score: scoreOf(account),
    }))
    .sort((left, right) => right.score - left.score)

  const counts = {
    pursue: ranked.filter((row) => row.tier === "pursue").length,
    verify: ranked.filter((row) => row.tier === "verify").length,
    hold: ranked.filter((row) => row.tier === "hold").length,
  }

  return (
    <SiteShell current="/">
      <div className="flex flex-col gap-8">
        <section className="max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight md:text-5xl">
            Pune manufacturers worth a first meeting
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            This desk qualifies heavy-equipment and process-equipment companies
            for IntelliBuddies IB-X. The bar is audited revenue above ₹500
            crore, with priority above ₹1,000 crore, and a real operating site
            in Pune. Each score is a sum of sourced factors you can open and
            check.
          </p>
        </section>

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
                  {tier === "verify" && "One fact is still a band, a partial site, or a short score."}
                  {tier === "hold" && "Revenue conflict, missing audit, or a competitor."}
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
            {ranked
              .filter((row) => row.tier === "pursue")
              .map(({ account, tier, score }) => (
                <Link key={account.slug} href={`/accounts/${account.slug}`}>
                  <Card className="hover:bg-accent/40">
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle>{account.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-2xl">{score}</span>
                          <TierBadge tier={tier} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      <p>{account.revenueLabel}</p>
                      <p className="mt-1">{account.period}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </SiteShell>
  )
}
