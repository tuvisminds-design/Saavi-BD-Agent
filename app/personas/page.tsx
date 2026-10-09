import { SiteShell } from "@/components/site-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const personas = [
  {
    title: "Economic buyer",
    who: "Managing director, chief executive, or chairman who still runs operations.",
    pain: "Plants and project sites lose days between a request, an approval, and the update in the system of record. A chatbot that only answers does not move that work.",
    say: "IB-X finishes the job: it captures the request, routes the approval with an SLA, updates the application, and keeps an audit trail. Thermax’s MD has already said digital execution is how project risk shows up earlier. Use that kind of sentence, tied to their filing, not a generic AI pitch.",
  },
  {
    title: "Finance owner",
    who: "CFO, or a finance director who also runs shared services.",
    pain: "Invoice packs, credit holds, three-way match, and export documents sit in mail and spreadsheets. The cost is cycle time and audit effort, which a CFO already measures.",
    say: "Lead with the finance and shared-services remit. Rajendran Arunachalam at Thermax and Soma Ghosh at Cummins are the pattern: named finance officers, public sources, a process they already own. At Cummins, on 9 October 2026, finance is the live buyer because the MD seat is empty until 1 November.",
  },
  {
    title: "Technical buyer",
    who: "Chief digital and information officer, or the CIO if a filing or the company page names one.",
    pain: "Bots break on messy plant data. Separate chat, workflow, and RPA tools leave no single log. Plant systems often have to stay on the local network.",
    say: "IB-X runs conversational capture, workflow, and RPA in one governed platform, including a local agent behind the firewall. Only Thermax publishes a CDIO in this set, Dr. Amit Sethi. Where no CIO is named, say so. Do not fill the seat from a profile snippet.",
  },
  {
    title: "Process owner",
    who: "Head of industrial products, projects, distribution, operations and maintenance, or supply chain.",
    pain: "Work orders, material shortages, vendor dates, and service jobs bounce between procurement, finance, and the plant.",
    say: "Suzlon’s operations-and-maintenance book was ₹2,483.85 crore in FY26. Cummins distribution sales were ₹3,278 crore. Those are the workflows to map in the first meeting: one queue, an SLA, and a human review when the document is wrong.",
  },
]

export default function PersonasPage() {
  return (
    <SiteShell current="/personas">
      <div className="flex max-w-3xl flex-col gap-3">
        <h1 className="font-heading text-4xl">Who buys IB-X in this market</h1>
        <p className="text-lg text-muted-foreground">
          IntelliBuddies sells a governed platform that joins conversational AI,
          workflow, and RPA so a request becomes finished work. In Pune heavy
          equipment, the buyer is not a digital novelty seeker. It is the person
          who still carries approvals, plant updates, and the audit file.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {personas.map((persona) => (
          <Card key={persona.title}>
            <CardHeader>
              <CardTitle className="text-xl">{persona.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                <span className="font-medium text-foreground">Who. </span>
                {persona.who}
              </p>
              <p>
                <span className="font-medium text-foreground">What hurts. </span>
                {persona.pain}
              </p>
              <p>
                <span className="font-medium text-foreground">How to open. </span>
                {persona.say}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Leave these out of the first list</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            Companies that sell industrial automation, such as Honeywell
            Automation India, overlap with IB-X. They stay on Hold.
          </p>
          <p>
            Companies whose revenue is a band, an interview, or a conflict
            between websites stay on Hold or Verify until the MCA statement or
            the annual report is opened.
          </p>
          <p>
            A sales office with no plant, headquarters, or named engineering
            centre in Pune is outside this pass.
          </p>
        </CardContent>
      </Card>
    </SiteShell>
  )
}
