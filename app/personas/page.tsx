import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { accounts } from "@/lib/accounts"

export const metadata = {
  title: "Personas",
}

function people(role: string) {
  return accounts.flatMap((account) =>
    account.people
      .filter((person) => person.buyingRole === role && person.name !== "Not named")
      .map((person) => ({ person, account })),
  )
}

export default function PersonasPage() {
  const economic = people("Economic buyer")
  const technical = people("Technical buyer")
  const process = people("Process owner")
  const gaps = accounts.flatMap((account) =>
    account.people
      .filter((person) => person.buyingRole === "Role gap")
      .map((person) => ({ person, account })),
  )

  return (
    <SiteShell current="/personas">
      <div className="flex max-w-3xl flex-col gap-3">
        <h1 className="font-heading text-4xl">Who buys IB-X in this market</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          IB-X joins conversational AI, workflow, and RPA, and it can run
          on-prem with connectors into SAP, Oracle, and Microsoft 365. In Pune
          heavy equipment the buyer is the person who still carries approvals,
          plant updates, and the audit file.
        </p>
      </div>

      <Tabs className="mt-8" defaultValue="economic">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="economic">Economic buyer</TabsTrigger>
          <TabsTrigger value="technical">Technical buyer</TabsTrigger>
          <TabsTrigger value="process">Process owner</TabsTrigger>
          <TabsTrigger value="champion">Champion</TabsTrigger>
          <TabsTrigger value="anti">Anti-persona</TabsTrigger>
        </TabsList>

        <TabsContent value="economic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>CFO, managing director, or the chair who still runs the business</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                This seat owns budget, shared services, and the audit trail.
                Open with cycle time on invoices, project files, and export
                documents, not with a model name.
              </p>
              <p>
                At Cummins India on 9 October 2026 the MD seat is vacant until
                1 November. The live economic conversation is with the CFO.
              </p>
              <ul className="flex flex-col gap-2">
                {economic.map(({ person, account }) => (
                  <li key={`${account.slug}-${person.name}`}>
                    <Link className="underline underline-offset-4" href={`/accounts/${account.slug}`}>
                      {person.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {" "}
                      · {person.title} · {account.name} · {person.evidenceGrade}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>CIO or chief digital and information officer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                This seat decides whether a bot can reach SAP, Oracle, or
                Microsoft 365, and whether it has to stay on the plant network.
                Only one technical buyer is named on a company page in this file.
              </p>
              <ul className="flex flex-col gap-2">
                {technical.map(({ person, account }) => (
                  <li key={`${account.slug}-${person.name}`}>
                    <Link className="underline underline-offset-4" href={`/accounts/${account.slug}`}>
                      {person.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {" "}
                      · {person.title} · {account.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-medium">Seats left blank on purpose</p>
              <ul className="flex flex-col gap-2">
                {gaps.map(({ person, account }) => (
                  <li key={`${account.slug}-${person.title}`}>
                    <Link className="underline underline-offset-4" href={`/accounts/${account.slug}`}>
                      {account.name}
                    </Link>
                    <span className="text-muted-foreground"> · {person.why}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Supply chain, projects, operations and maintenance, shared services</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                This is the person who lives in work orders, vendor dates, and
                service jobs. A named process owner is rare in the filings.
                Where the file names one, use that name. Where it does not, map
                the process in the first meeting instead of inventing a title.
              </p>
              <ul className="flex flex-col gap-2">
                {process.map(({ person, account }) => (
                  <li key={`${account.slug}-${person.name}`}>
                    <Link className="underline underline-offset-4" href={`/accounts/${account.slug}`}>
                      {person.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {" "}
                      · {person.title} · {account.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                Suzlon’s operations-and-maintenance revenue was ₹2,483.85 crore
                in FY26. That book is the process, even though the factsheet
                does not name the service head.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="champion" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Business excellence</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                The champion is usually a business-excellence or transformation
                lead who will sit with a pilot. No filing in this set names
                that person. The seat is open on every dossier.
              </p>
              <p>
                Ashish Bhandari’s remark on digital execution, and Amit
                Kalyani’s AI incubation lab, are public signals. Both men are
                already scored as economic buyers. They are not scored again as
                champions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anti" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Do not pursue these patterns</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                Industrial-automation vendors overlap with IB-X. Honeywell
                Automation India is on Hold for that reason. A partner
                conversation is the only use of that file.
              </p>
              <p>
                Unverified revenue stays on Hold: SANY India, John Deere India,
                and Forbes Marshall. A band or a rating rationale, as with JCB
                India and Alfa Laval India, stays on Verify.
              </p>
              <p>
                No Pune site means the account is outside this pass. JCB’s Pune
                fact is an engineering centre only, so the gate is partial.
                Suzlon’s registered office is Ahmedabad and its corporate
                headquarters is in Pune, which is enough presence, with that
                split stated on the dossier.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SiteShell>
  )
}
