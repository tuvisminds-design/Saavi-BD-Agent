import { readFileSync } from "node:fs"
import path from "node:path"

import { parse } from "yaml"

import { loadIcp } from "@/lib/prospecting/icp"

type SeasonFile = {
  windows: { id: string; label: string; months: number[]; note?: string }[]
}

export type QualField = {
  known: string | null
  missing: string | null
  sourceUrl: string | null
}

export type Qualification = {
  frameworks: ["MEDDPICC", "BANT", "SPICED"]
  meddpicc: Record<"metrics" | "economic_buyer" | "decision_criteria" | "decision_process" | "identify_pain" | "champion" | "competition" | "paper_process", QualField>
  bant: Record<"budget" | "authority" | "need" | "timeline", QualField>
  spiced: Record<"situation" | "pain" | "impact" | "critical_event" | "decision", QualField>
  missing: string[]
  priorityScore: number
  priorityReason: string
}

export type QualInput = {
  companyName: string
  revenueLabel: string | null
  revenueSourceUrl: string | null
  inBand: boolean
  location: string | null
  priorityCity: boolean
  csrObligated: boolean
  hrName: string | null
  hrTitle: string | null
  hrSourceUrl: string | null
  signals: { title: string; url: string }[]
  now?: Date
}

const blank = (missing: string): QualField => ({ known: null, missing, sourceUrl: null })

function seasonNow(now: Date) {
  const file = parse(readFileSync(path.join(process.cwd(), "config/seasons.yaml"), "utf8")) as SeasonFile
  const month = now.getUTCMonth() + 1
  return file.windows.find((window) => window.months.includes(month)) ?? null
}

export function qualifyAccount(input: QualInput, icp = loadIcp()): Qualification {
  const now = input.now ?? new Date()
  const season = seasonNow(now)
  const signal = input.signals[0]
  const hrKnown = input.hrName
    ? `${input.hrName}${input.hrTitle ? `, ${input.hrTitle}` : ""} is the HR head on file.`
    : null

  const situationParts = [
    input.revenueLabel ? `Filed sales ${input.revenueLabel}.` : null,
    input.location ? `Location on file: ${input.location}.` : null,
    input.inBand ? `Inside the Saavi band of ₹${icp.revenue_inr_crore_min}–${icp.revenue_inr_crore_max} crore.` : null,
  ].filter(Boolean)

  const meddpicc = {
    metrics: blank("Per-head gifting budget and order quantity are not on file."),
    economic_buyer: input.hrName
      ? {
          known: hrKnown,
          missing: "Whether this person signs the purchase order is not on file.",
          sourceUrl: input.hrSourceUrl,
        }
      : blank("No HR head is on file, so the budget owner is unknown."),
    decision_criteria: blank("Brand, packaging, and delivery requirements are not on file."),
    decision_process: blank("The approval path is not on file."),
    identify_pain: signal
      ? { known: signal.title, missing: null, sourceUrl: signal.url }
      : blank("No stated gifting need is on file."),
    champion: blank("No one at the company has been confirmed as a champion."),
    competition: blank("No incumbent gifting vendor is on file."),
    paper_process: blank("Vendor empanelment and the purchase-order path are not on file."),
  }

  const bant = {
    budget: input.revenueLabel
      ? {
          known: `Company sales are ${input.revenueLabel}. That is company scale, not a gifting budget.`,
          missing: "The festive gifting budget is not on file.",
          sourceUrl: input.revenueSourceUrl,
        }
      : blank("No filed sales line and no gifting budget are on file."),
    authority: meddpicc.economic_buyer,
    need: meddpicc.identify_pain,
    timeline: season
      ? {
          known: `Saavi's calendar is in the ${season.label} window.${season.note ? ` ${season.note}` : ""} The company has not confirmed an order date.`,
          missing: "The company's own order date is not on file.",
          sourceUrl: null,
        }
      : blank("No company order date is on file, and today's month is outside Saavi's festive windows."),
  }

  const spiced = {
    situation: situationParts.length
      ? {
          known: situationParts.join(" "),
          missing: input.hrName ? null : "The HR head is not on file.",
          sourceUrl: input.revenueSourceUrl,
        }
      : blank("Company scale and location are not on file."),
    pain: meddpicc.identify_pain,
    impact: input.csrObligated
      ? {
          known: "Filed turnover meets the CSR-obligation test, so a livelihood story can be put next to the spend.",
          missing: "No measured gifting impact for this account is on file.",
          sourceUrl: input.revenueSourceUrl,
        }
      : blank("CSR obligation is not confirmed, and no measured gifting impact is on file."),
    critical_event: bant.timeline,
    decision: input.hrName
      ? {
          known: hrKnown,
          missing: "The rest of the decision path is not on file.",
          sourceUrl: input.hrSourceUrl,
        }
      : blank("The HR decision seat is empty."),
  }

  const missing = [
    ...Object.values(meddpicc),
    ...Object.values(bant),
    ...Object.values(spiced),
  ]
    .map((field) => field.missing)
    .filter((item): item is string => Boolean(item))
    .filter((item, index, all) => all.indexOf(item) === index)

  let priorityScore = 0
  const reasons: string[] = []
  if (input.inBand) {
    priorityScore += 20
    reasons.push("in the revenue band")
  }
  if (input.hrName) {
    priorityScore += 25
    reasons.push("HR head named from a source")
  }
  if (input.csrObligated) {
    priorityScore += 10
    reasons.push("CSR obligation met on the filed turnover")
  }
  if (signal) {
    priorityScore += 25
    reasons.push("a gifting signal is on file")
  }
  if (input.priorityCity) {
    priorityScore += 10
    reasons.push("priority city")
  }
  if (season) {
    priorityScore += 10
    reasons.push(`Saavi ${season.label} window`)
  }

  return {
    frameworks: ["MEDDPICC", "BANT", "SPICED"],
    meddpicc,
    bant,
    spiced,
    missing,
    priorityScore,
    priorityReason: reasons.length ? `Score uses only on-file facts: ${reasons.join(", ")}.` : "Nothing on file raises the score.",
  }
}

export function qualificationRows(companyName: string, view: Qualification) {
  const blocks = [
    ["MEDDPICC", view.meddpicc],
    ["BANT", view.bant],
    ["SPICED", view.spiced],
  ] as const
  return blocks.flatMap(([framework, fields]) =>
    Object.entries(fields).map(([element, field]) => ({
      company: companyName,
      framework,
      element,
      known: field.known ?? "",
      missing: field.missing ?? "",
      source: field.sourceUrl ?? "",
    })),
  )
}
