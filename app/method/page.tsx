import { SiteShell } from "@/components/site-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FACTOR_GUIDE } from "@/lib/qualification"

export default function MethodPage() {
  return (
    <SiteShell current="/method">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl">How an account earns a score</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          The desk is a qualification file, not a scraper. A point exists only
          when a sentence on a public page supports it. If two sources
          disagree, the revenue gate fails and the account stays on Hold.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pursue</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            Pune presence is not none, the sector is core heavy equipment or
            process equipment, revenue is audited and at least ₹500 crore, and
            the score is 75 or more. A competitor never reaches this tier.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verify</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            The account missed Pursue, and either the score is at least 60, or
            Pune is only partial, or revenue is a band, or the figure comes
            from a rating rationale rather than the company’s own filing.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hold</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            The company sells industrial automation, revenue is missing or in
            conflict, or the score sits below the verify line with no partial
            gate. A plant in Pune does not override a failed revenue gate.
          </CardContent>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">Factors</h2>
        <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-foreground/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Factor</th>
                <th className="px-3 py-2 font-medium">Maximum</th>
              </tr>
            </thead>
            <tbody>
              {FACTOR_GUIDE.map((factor) => (
                <tr key={factor.id} className="border-t border-border">
                  <td className="px-3 py-2">{factor.label}</td>
                  <td className="px-3 py-2">{factor.max}</td>
                </tr>
              ))}
              <tr className="border-t border-border">
                <td className="px-3 py-2">Competitive overlap</td>
                <td className="px-3 py-2">−15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Revenue points are computed in code from the gate and the crore
          figure. Audited revenue of at least ₹5,000 crore scores 20. Audited
          revenue of at least ₹1,000 crore and under ₹5,000 crore scores 16.
          Audited revenue of at least ₹500 crore and under ₹1,000 crore scores
          12. A rating-agency figure scores two points under the audited band
          it would have earned, and it does not clear the audited gate. A band
          with no exact rupee amount scores 6. A conflict, an undated
          foreign-currency claim, or no filing scores 0. The other six factors
          are assessed against the maxima above. If the company sells
          industrial or building automation, subtract 15 after the sum and
          force Hold.
        </p>
      </section>

      <section className="mt-8 max-w-3xl">
        <h2 className="font-heading text-2xl">What this desk does not do</h2>
        <div className="mt-3 flex flex-col gap-3 leading-relaxed">
          <p>
            LinkedIn’s terms prohibit scraping, login automation, and bulk
            collection of profiles. This desk does none of that. It does not
            store a LinkedIn URL. A profile snippet is not a current title.
          </p>
          <p>
            Names appear only when an annual report, an exchange filing, a
            company leadership page, a rating rationale, or a named article
            prints them. A professional-network snippet is not enough for a
            current title. Where a CIO is unpublished, the dossier says the
            seat is empty.
          </p>
          <p>
            Personal email addresses and mobile numbers are not collected.
            Company sites are linked. You cross-check by opening the source,
            matching the legal name, the period, and the figure, then deciding
            whether a later filing has replaced it.
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
