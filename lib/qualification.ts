import type { Account, SectorFit, Tier } from "@/lib/types"

export const COMPILED_ON = "11 October 2026"

export const BAND_LOW = 500
export const BAND_HIGH = 1000

/** Highly qualified is strictly above this. 0.80 itself stays medium. */
export const HIGH_LINE = 0.8
export const MEDIUM_LINE = 0.5

export const FACTOR_GUIDE = [
  { id: "revenue", label: "Moneycontrol band", max: 20 },
  { id: "sector", label: "Heavy or process equipment", max: 25 },
  { id: "pune", label: "Pune operating weight", max: 15 },
  { id: "persona", label: "Persona already named", max: 20 },
  { id: "linkedin", label: "LinkedIn verification", max: 20 },
] as const

export function pointsOf(account: Account) {
  return account.factors.reduce((sum, factor) => sum + factor.points, 0)
}

export function scoreOf(account: Account) {
  return pointsOf(account) / 100
}

export function formatScore(score: number) {
  return score.toFixed(2)
}

export function tierOf(account: Account): Tier {
  if (!account.inBand || account.sectorFit === "other") return "cutoff"
  const score = scoreOf(account)
  if (score > HIGH_LINE) return "high"
  if (score >= MEDIUM_LINE) return "medium"
  return "cutoff"
}

export function tierLabel(tier: Tier) {
  if (tier === "high") return "Highly qualified"
  if (tier === "medium") return "Medium qualified"
  return "Cut off"
}

export function sectorLabel(fit: SectorFit) {
  if (fit === "equipment") return "Process or heavy equipment"
  if (fit === "industrial") return "Industrial machinery"
  return "Not equipment"
}

export function decisionSentence(account: Account) {
  const score = formatScore(scoreOf(account))
  if (!account.inBand) {
    return `Moneycontrol sales are outside ₹${BAND_LOW}–${BAND_HIGH} crore, so the account is cut off before the ${score} factor score can put it on a call list.`
  }
  if (account.sectorFit === "other") {
    return `The revenue band passes, and the factor score is ${score}, but the company is not heavy equipment or industrial machinery. Random ₹${BAND_LOW}–${BAND_HIGH} crore names are cut here.`
  }
  const tier = tierOf(account)
  if (tier === "high") {
    return `The score is ${score}, above ${HIGH_LINE.toFixed(2)}. Revenue, equipment fit, a named buyer, and a LinkedIn company check all clear. This is a highly qualified lead.`
  }
  if (tier === "medium") {
    return `The score is ${score}, inside ${MEDIUM_LINE.toFixed(2)}–${HIGH_LINE.toFixed(2)}. Keep it, and close the gap named on the dossier before a proposal.`
  }
  return `The score is ${score}, under ${MEDIUM_LINE.toFixed(2)}. Cut it off.`
}
