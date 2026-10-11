import { desk, tierCounts, byTier } from "@/lib/accounts"
import { COMPILED_ON, decisionSentence } from "@/lib/qualification"
import type { AccountsResponse, ScoredAccount, SummaryCard, SummaryResponse } from "@/lib/api-types"
import type { DeskAccount } from "@/lib/accounts"
import type { Tier } from "@/lib/types"

export function nodeVersion() {
  return process.version
}

export function scoreAccount(account: DeskAccount): ScoredAccount {
  return { ...account, decision: decisionSentence(account) }
}

function card(account: DeskAccount): SummaryCard {
  return {
    slug: account.slug,
    name: account.name,
    score: account.score,
    tier: account.tier,
    revenueLabel: account.revenueLabel,
    whatTheyMake: account.whatTheyMake,
    location: account.location,
  }
}

export function isTier(value: string | null): value is Tier {
  return value === "high" || value === "medium" || value === "cutoff"
}

export function queryAccounts(input: {
  tier?: string | null
  q?: string | null
}): AccountsResponse {
  const needle = input.q?.trim().toLowerCase() ?? ""
  const tier = input.tier && isTier(input.tier) ? input.tier : null
  const accounts = desk.filter((account) => {
    if (tier && account.tier !== tier) return false
    if (!needle) return true
    const people = account.people.map((person) => person.name).join(" ")
    const haystack = [
      account.name,
      account.legalName,
      account.location,
      account.whatTheyMake,
      account.revenueLabel,
      account.ibxFit,
      account.cutoffReason,
      people,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
    return haystack.includes(needle)
  })

  return {
    node: nodeVersion(),
    compiledOn: COMPILED_ON,
    accounts: accounts.map(scoreAccount),
  }
}

export function summaryPayload(): SummaryResponse {
  return {
    node: nodeVersion(),
    compiledOn: COMPILED_ON,
    counts: tierCounts(),
    high: byTier("high").map(card),
    medium: byTier("medium").map(card),
  }
}
