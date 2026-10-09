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
            Pune operating presence is full, the sector is heavy equipment or
            process equipment, revenue is audited and at least ₹500 crore, and
            the score is 75 or more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verify</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            The score is at least 60, or Pune is only a named site, or revenue
            is a published band rather than a rupee figure. Read the missing
            document before a meeting.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hold</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            Revenue is missing or in conflict, or the company sells automation
            and overlaps with IB-X. A high factory count does not override a
            failed gate.
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
          Revenue points use the audited figure: 20 at ₹10,000 crore or more, 18
          from ₹5,000 crore, 15 from ₹1,000 crore. A band without a rupee amount
          scores 6 and does not pass the audited gate. A conflict scores 0.
        </p>
      </section>

      <section className="mt-8 max-w-3xl">
        <h2 className="font-heading text-2xl">What this desk does not do</h2>
        <div className="mt-3 flex flex-col gap-3 leading-relaxed">
          <p>
            It does not log in to LinkedIn, automate a browser against LinkedIn,
            or collect profiles in bulk. That would break LinkedIn’s terms and
            it is not a source you can drop into an audit file.
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
