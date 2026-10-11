import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteShell } from "@/components/site-shell"
import { TierBadge } from "@/components/tier-badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { accounts, getAccount } from "@/lib/accounts"
import { decisionSentence, formatScore, scoreOf, tierOf } from "@/lib/qualification"

export function generateStaticParams() {
  return accounts.map((account) => ({ slug: account.slug }))
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const account = getAccount(slug)
  if (!account) notFound()

  const score = scoreOf(account)
  const tier = tierOf(account)
  const peopleSearch = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${account.name} Managing Director`)}`

  return (
    <SiteShell current="/accounts">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{account.legalName}</p>
          <h1 className="font-heading text-4xl">{account.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-heading text-5xl">{formatScore(score)}</span>
          <TierBadge tier={tier} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Moneycontrol sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{account.revenueLabel}</p>
            <a
              className="mt-2 inline-block text-sm underline underline-offset-4"
              href={account.moneycontrolUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open the sales line
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Place</CardTitle>
          </CardHeader>
          <CardContent>{account.location}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What they make</CardTitle>
          </CardHeader>
          <CardContent>{account.whatTheyMake}</CardContent>
        </Card>
      </div>

      {account.cutoffReason ? (
        <Card className="mt-3">
          <CardHeader>
            <CardTitle>Why this is cut off</CardTitle>
          </CardHeader>
          <CardContent>{account.cutoffReason}</CardContent>
        </Card>
      ) : null}

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Persona in one pass</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          {account.ibxFit}
        </p>
        <p className="mt-3">
          <a
            className="underline underline-offset-4"
            href={account.website}
            rel="noreferrer"
            target="_blank"
          >
            Company site
          </a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Score</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">{decisionSentence(account)}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {account.factors.map((factor) => (
            <li key={factor.id} className="border border-border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{factor.label}</p>
                <p className="font-mono text-sm">
                  {(factor.points / 100).toFixed(2)} / {(factor.max / 100).toFixed(2)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{factor.justification}</p>
              <a
                className="mt-2 inline-block text-sm underline underline-offset-4"
                href={factor.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                {factor.sourceLabel}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">LinkedIn check</h2>
        {account.linkedinCompanyUrl ? (
          <div className="mt-3 max-w-3xl">
            <p className="leading-relaxed">{account.linkedinConfirms}</p>
            <a
              className="mt-2 inline-block underline underline-offset-4"
              href={account.linkedinCompanyUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open the company page
            </a>
          </div>
        ) : (
          <p className="mt-3 max-w-3xl text-muted-foreground">
            No company page is stored. The account is already cut off on
            revenue or sector, so do not start a LinkedIn pass.
          </p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Decision makers</h2>
        {account.people.length === 0 ? (
          <div className="mt-3 max-w-3xl">
            <p className="text-muted-foreground">
              No person is named from a company page or a filing in this file.
              {tier === "cutoff"
                ? " Leave it that way."
                : " Use the search, then keep a profile only when the title matches MD, CEO, or CFO."}
            </p>
            {tier !== "cutoff" ? (
              <a
                className="mt-2 inline-block underline underline-offset-4"
                href={peopleSearch}
                rel="noreferrer"
                target="_blank"
              >
                Search LinkedIn for a managing director
              </a>
            ) : null}
          </div>
        ) : (
          <ul className="mt-4 grid gap-3">
            {account.people.map((person) => (
              <li key={`${person.name}-${person.title}`} className="border border-border bg-card p-4">
                <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  {person.buyingRole}
                </p>
                <p className="mt-1 font-heading text-2xl">{person.name}</p>
                <p className="text-sm">{person.title}</p>
                <p className="mt-2 text-sm leading-relaxed">{person.why}</p>
                <p className="mt-2 text-sm text-muted-foreground">{person.linkedinNote}</p>
                <div className="mt-3 flex flex-col gap-1 text-sm">
                  <a className="underline underline-offset-4" href={person.linkedinUrl} rel="noreferrer" target="_blank">
                    LinkedIn verification
                  </a>
                  <a className="underline underline-offset-4" href={person.sourceUrl} rel="noreferrer" target="_blank">
                    {person.sourceLabel}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Cross-verify</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          {account.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <div className="mt-8">
        <Link href="/accounts" className={buttonVariants({ variant: "outline" })}>
          Back to accounts
        </Link>
      </div>
    </SiteShell>
  )
}
