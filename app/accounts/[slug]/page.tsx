import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteShell } from "@/components/site-shell"
import { TierBadge } from "@/components/tier-badge"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { accounts, getAccount } from "@/lib/accounts"
import { decisionSentence, scoreOf, tierOf } from "@/lib/qualification"

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

  return (
    <SiteShell current="/accounts">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{account.legalName}</p>
          <h1 className="font-heading text-4xl">{account.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-heading text-5xl">{score}</span>
          <TierBadge tier={tier} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{account.revenueLabel}</p>
            <p className="mt-1 text-muted-foreground">{account.period}</p>
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

      {account.holdReason ? (
        <Card className="mt-3">
          <CardHeader>
            <CardTitle>Why this is not a pursuit</CardTitle>
          </CardHeader>
          <CardContent>{account.holdReason}</CardContent>
        </Card>
      ) : null}

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Why IB-X fits</h2>
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
          {account.cin ? <span className="text-muted-foreground"> · CIN {account.cin}</span> : null}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Qualification math</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {decisionSentence(account)} The headline number is the sum of the
          factor points
          {account.penalty > 0 ? `, minus ${account.penalty} for competitive overlap` : ""}.
        </p>
        <p className="mt-3 font-mono text-sm">
          {account.factors.map((factor) => factor.points).join(" + ")}
          {account.penalty > 0 ? ` − ${account.penalty}` : ""} = {score}
        </p>
        <div className="mt-4 grid gap-3 md:hidden">
          {account.factors.map((factor) => (
            <Card key={factor.id} size="sm">
              <CardHeader>
                <CardTitle>
                  {factor.label} · {factor.points}/{factor.max}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p>{factor.justification}</p>
                <a className="underline underline-offset-4" href={factor.sourceUrl} rel="noreferrer" target="_blank">
                  {factor.sourceLabel}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 hidden overflow-x-auto rounded-xl ring-1 ring-foreground/10 md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Factor</th>
                <th className="px-3 py-2 font-medium">Points</th>
                <th className="px-3 py-2 font-medium">Justification</th>
                <th className="px-3 py-2 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {account.factors.map((factor) => (
                <tr key={factor.id} className="border-t border-border align-top">
                  <td className="px-3 py-3 font-medium">{factor.label}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {factor.points} / {factor.max}
                  </td>
                  <td className="px-3 py-3 leading-relaxed">{factor.justification}</td>
                  <td className="px-3 py-3">
                    <a
                      className="underline underline-offset-4"
                      href={factor.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {factor.sourceLabel}
                    </a>
                  </td>
                </tr>
              ))}
              {account.penalty > 0 ? (
                <tr className="border-t border-border align-top">
                  <td className="px-3 py-3 font-medium">Competitor penalty</td>
                  <td className="px-3 py-3 whitespace-nowrap">−{account.penalty}</td>
                  <td className="px-3 py-3 leading-relaxed">
                    The company sells industrial or building automation, so this line is subtracted and the tier is Hold.
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">Applied in the scorer</td>
                </tr>
              ) : null}
              <tr className="border-t border-border bg-muted/60">
                <td className="px-3 py-3 font-medium">Score</td>
                <td className="px-3 py-3 font-medium">{score}</td>
                <td className="px-3 py-3" colSpan={2}>
                  {tierOf(account) === "pursue" ? "Pursue" : tierOf(account) === "verify" ? "Verify" : "Hold"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Decision makers</h2>
        <div className="mt-4 grid gap-3">
          {account.people.map((person) => (
            <Card key={person.name}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-xl">{person.name}</CardTitle>
                  <Badge variant="outline">{person.buyingRole}</Badge>
                </div>
                <p className="text-muted-foreground">{person.title}</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
                <p>{person.why}</p>
                <Separator />
                <p>
                  <span className="font-medium">Check before you write. </span>
                  {person.verify}
                </p>
                <p className="text-muted-foreground">
                  {person.evidenceGrade} · {person.asOf}
                </p>
                <a
                  className="underline underline-offset-4"
                  href={person.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {person.sourceLabel}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Cross-verify</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          {account.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href="/method" className={`${buttonVariants({ variant: "outline" })} mt-4`}>
          How the score is built
        </Link>
      </section>
    </SiteShell>
  )
}
