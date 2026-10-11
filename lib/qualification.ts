import type { Account, HrFit, Tier } from "@/lib/types"

export const COMPILED_ON = "11 October 2026"

export const BAND_LOW = 500
export const BAND_HIGH = 1000

/** Highly qualified is strictly above this. 0.80 itself stays medium. */
export const HIGH_LINE = 0.8
export const MEDIUM_LINE = 0.5

export const FACTOR_GUIDE = [
  { id: "revenue", label: "Moneycontrol band", max: 20 },
  { id: "hr", label: "HR in the organisation", max: 25 },
  { id: "pune", label: "Pune operating weight", max: 15 },
  { id: "persona", label: "HR, CEO, and CFO named", max: 20 },
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
  if (!account.inBand || account.hrFit === "none") return "cutoff"
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

export function hrLabel(fit: HrFit) {
  if (fit === "named") return "HR head named"
  if (fit === "function") return "HR function, current head not named"
  return "No HR evidence in this file"
}

export function decisionSentence(account: Account) {
  const score = formatScore(scoreOf(account))
  if (!account.inBand) {
    return `The deciding sales figure is outside ₹${BAND_LOW}–${BAND_HIGH} crore, so the account is cut off. The factor score of ${score} does not put it on a call list.`
  }
  if (account.hrFit === "none") {
    return `The revenue band passes, and the factor score is ${score}. No company page or filing in this file shows an HR seat, so the account is cut off.`
  }
  const tier = tierOf(account)
  if (tier === "high") {
    return `The score is ${score}, above ${HIGH_LINE.toFixed(2)}. The Moneycontrol band, a named HR head, the CEO and the CFO, and a LinkedIn company check all clear. This is a highly qualified lead.`
  }
  if (tier === "medium") {
    return `The score is ${score}, inside ${MEDIUM_LINE.toFixed(2)}–${HIGH_LINE.toFixed(2)}. Keep it, and close the gap named on the dossier before a proposal.`
  }
  return `The score is ${score}, under ${MEDIUM_LINE.toFixed(2)}. Cut it off.`
}
