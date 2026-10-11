import { SiteShell } from "@/components/site-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FACTOR_GUIDE } from "@/lib/qualification"

export default function MethodPage() {
  return (
    <SiteShell current="/method">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl">How a lead gets a number</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          The score runs from 0 to 1. Above 0.80 is highly qualified. From
          0.50 to 0.80, including 0.80, is medium. Under 0.50 is cut off. Two
          gates can cut a lead off even when the arithmetic would look fine:
          the Moneycontrol band, and evidence of HR.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Above 0.80</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            Latest Moneycontrol sales are inside ₹500–1,000 crore, an HR head
            is named, the CEO and the CFO are named, and the LinkedIn company
            page confirms name, place, and business.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>0.50 to 0.80</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            The band passes and an HR function is evidenced, and something is
            thin: the current HR head is not named, a Pune site is missing, or
            one of the three seats is still open. Keep the lead.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cut off</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            Sales are under ₹500 crore or over ₹1,000 crore, or no source
            shows an HR function. A score under 0.50 is also cut off. Industry
            is not a cutoff.
          </CardContent>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">The five parts</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {FACTOR_GUIDE.map((factor) => (
            <li key={factor.id} className="border border-border bg-card p-4 text-sm leading-relaxed">
              <p className="font-medium">
                {factor.label}{" "}
                <span className="font-mono text-muted-foreground">
                  up to {(factor.max / 100).toFixed(2)}
                </span>
              </p>
              <p className="mt-1 text-muted-foreground">{factorNote(factor.id)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed">
        <h2 className="font-heading text-2xl">Moneycontrol, then LinkedIn</h2>
        <p>
          Revenue is the latest annual Sales row on the Moneycontrol profit and
          loss page, in ₹ crore. Consolidated is used when that is the view.
          A news line that says “sources put revenue at” is not the sales row.
          SEDEMAC Mechatronics has a Moneycontrol page and no sales row yet, so
          it is not scored.
        </p>
        <p>
          If Moneycontrol’s default view is standalone and the company reports
          a larger group figure, the group figure decides the band. Exicom is
          the example in this file: standalone sales are ₹894 crore, and FY26
          consolidated revenue from operations is ₹1,151.7 crore.
        </p>
        <p>
          LinkedIn is the verification pass. Open the company page and check
          the name, the city, and the business. Open a profile or a people
          search and check the title. If LinkedIn prints a revenue number that
          disagrees with Moneycontrol, Moneycontrol wins. Profiles are not
          collected in bulk, and nothing here logs into LinkedIn.
        </p>
        <p>
          Personal email addresses are not stored. Where a seat is missing, the
          dossier says so. A person is named only when a company page, a filing,
          or a public profile names them.
        </p>
      </section>
    </SiteShell>
  )
}

function factorNote(id: string) {
  if (id === "revenue") {
    return "0.20 only when the deciding Moneycontrol sales figure is from ₹500 crore to ₹1,000 crore. Outside that, the account is cut off and this part is 0."
  }
  if (id === "hr") {
    return "0.25 when a Head of HR, CHRO, or VP-HR is named on a company page, a filing, or a current public profile. 0.12 when an HR office is evidenced and the current head is not named. 0 when this file has no HR evidence, and that account is cut off. Industry does not change this part."
  }
  if (id === "pune") {
    return "0.15 for a Pune headquarters or plant stated in a source. 0.05 for a Pune branch or sales office. 0 when the sources do not mention Pune. Saavi is in Pune, and Pune is still a score, not a gate."
  }
  if (id === "persona") {
    return "0.20 when HR, the CEO, and the CFO are all named. 0.12 when two of the three are named. 0.04 when the seats are still to be found."
  }
  return "0.20 when a public LinkedIn company page confirms the name, the business, and an Indian headquarters. Revenue on that page is not used. Without this check, a perfect file stops at 0.80, which stays medium."
}
