import type { Account, RevenueGate, Tier } from "@/lib/types"

export const COMPILED_ON = "9 October 2026"

export const COMPETITOR_PENALTY = 15

export const REVENUE_LINE_CRORE = 500

export const FACTOR_GUIDE = [
  { id: "revenue", label: "Revenue scale", max: 20 },
  { id: "sector", label: "Sector fit", max: 15 },
  { id: "pune", label: "Pune operating weight", max: 10 },
  { id: "process", label: "Process surface for IB-X", max: 20 },
  { id: "committee", label: "Named buying committee", max: 15 },
  { id: "trigger", label: "Public trigger", max: 10 },
  { id: "evidence", label: "Evidence quality", max: 10 },
] as const

export function revenuePoints(gate: RevenueGate, crore: number | null) {
  if (gate === "audited") {
    if (crore == null || crore < REVENUE_LINE_CRORE) return 0
    if (crore >= 5000) return 20
    if (crore >= 1000) return 16
    return 12
  }

  if (gate === "rating") {
    if (crore == null || crore < REVENUE_LINE_CRORE) return 0
    if (crore >= 5000) return 18
    if (crore >= 1000) return 14
    return 10
  }

  if (gate === "band") return 6
  return 0
}

export function baseScoreOf(account: Account) {
  return account.factors.reduce((sum, factor) => sum + factor.points, 0)
}

export function penaltyOf(account: Account) {
  return account.sectorGate === "competitor" ? COMPETITOR_PENALTY : 0
}

export function scoreOf(account: Account) {
  return baseScoreOf(account) - penaltyOf(account)
}

export function tierOf(account: Account): Tier {
  const score = scoreOf(account)
  const revenueBlocked =
    account.revenueGate === "unverified" || account.revenueGate === "conflict"

  if (account.sectorGate === "competitor" || revenueBlocked) {
    return "hold"
  }

  const sectorFits =
    account.sectorGate === "core" || account.sectorGate === "process"
  const revenueClears =
    account.revenueGate === "audited" &&
    account.revenueCrore != null &&
    account.revenueCrore >= REVENUE_LINE_CRORE
  const pursue =
    account.puneGate !== "none" && sectorFits && revenueClears && score >= 75

  if (pursue) return "pursue"

  const partialGate =
    score >= 60 ||
    account.puneGate === "partial" ||
    account.revenueGate === "band" ||
    account.revenueGate === "rating"

  if (partialGate) return "verify"
  return "hold"
}

export function tierLabel(tier: Tier) {
  if (tier === "pursue") return "Pursue"
  if (tier === "verify") return "Verify"
  return "Hold"
}

export type GateRow = {
  label: string
  state: "Pass" | "Fail" | "Partial"
  detail: string
}

export function gateRows(account: Account): GateRow[] {
  const score = scoreOf(account)
  const pune =
    account.puneGate === "none"
      ? "Fail"
      : account.puneGate === "partial"
        ? "Partial"
        : "Pass"
  const sector =
    account.sectorGate === "core" || account.sectorGate === "process"
      ? "Pass"
      : "Fail"
  const revenue =
    account.revenueGate === "audited" &&
    account.revenueCrore != null &&
    account.revenueCrore >= REVENUE_LINE_CRORE
      ? "Pass"
      : account.revenueGate === "band" || account.revenueGate === "rating"
        ? "Partial"
        : "Fail"

  return [
    {
      label: "Pune presence is not none",
      state: pune,
      detail: account.location,
    },
    {
      label: "Sector is core heavy equipment or process equipment",
      state: sector,
      detail: account.whatTheyMake,
    },
    {
      label: "Revenue is audited and at least ₹500 crore",
      state: revenue,
      detail: account.revenueLabel,
    },
    {
      label: "Score is at least 75",
      state: score >= 75 ? "Pass" : "Fail",
      detail: `${score} points, the sum of the factor rows`,
    },
    {
      label: "Not an industrial-automation competitor",
      state: account.sectorGate === "competitor" ? "Fail" : "Pass",
      detail:
        account.sectorGate === "competitor"
          ? `Penalty of ${COMPETITOR_PENALTY} points, and the tier is Hold`
          : "No competitor penalty",
    },
  ]
}

export function decisionSentence(account: Account) {
  const tier = tierOf(account)
  const score = scoreOf(account)

  if (account.sectorGate === "competitor") {
    return `${account.name} sells industrial or building automation. The competitor penalty is applied and the tier is Hold. A partner conversation is the only use of this file.`
  }

  if (account.revenueGate === "conflict") {
    return `Public revenue figures conflict. Nothing is scored in rupees, and the tier is Hold until a statutory filing is opened.`
  }

  if (account.revenueGate === "unverified") {
    return `No audited rupee revenue is in this file. The tier is Hold until MCA Form AOC-4, or the company’s own annual report, is read.`
  }

  if (tier === "pursue") {
    return `Pune presence, sector, and audited revenue all clear, and the score is ${score}. The tier is Pursue.`
  }

  if (tier === "verify") {
    const open = gateRows(account)
      .filter((row) => row.state !== "Pass")
      .map((row) => row.label.replace(/\.$/, ""))
    const because = open.length
      ? open.join("; ")
      : "a partial gate is open"
    return `The score is ${score}. Pursue stays shut because: ${because}. The tier is Verify.`
  }

  return `The score is ${score}, under the verify line, and no partial gate is open. The tier is Hold.`
}
