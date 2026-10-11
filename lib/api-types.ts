import type { Account, Tier } from "@/lib/types"

export type ScoredAccount = Account & {
  points: number
  score: number
  tier: Tier
  decision: string
}

export type SummaryCard = {
  slug: string
  name: string
  score: number
  tier: Tier
  revenueLabel: string
  whatTheyMake: string
  location: string
}

export type HealthResponse = {
  ok: true
  runtime: "nodejs"
  node: string
  compiledOn: string
}

export type SummaryResponse = {
  node: string
  compiledOn: string
  counts: Record<Tier, number>
  high: SummaryCard[]
  medium: SummaryCard[]
}

export type AccountsResponse = {
  node: string
  compiledOn: string
  accounts: ScoredAccount[]
}

export type AccountResponse = {
  node: string
  compiledOn: string
  account: ScoredAccount
}
