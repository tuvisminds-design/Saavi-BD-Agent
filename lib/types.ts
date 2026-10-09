export type Tier = "pursue" | "verify" | "hold"

export type PuneGate = "full" | "partial" | "none"
export type SectorGate = "core" | "process" | "adjacent" | "competitor"
export type RevenueGate =
  | "audited"
  | "band"
  | "rating"
  | "unverified"
  | "conflict"

export type EvidenceGrade =
  | "Statutory filing"
  | "Company page"
  | "Rating rationale"
  | "Press"
  | "Aggregator"
  | "Stale or conflicting"

export type Factor = {
  id: string
  label: string
  points: number
  max: number
  justification: string
  sourceLabel: string
  sourceUrl: string
}

export type DecisionMaker = {
  name: string
  title: string
  buyingRole: string
  why: string
  verify: string
  evidenceGrade: EvidenceGrade
  asOf: string
  sourceLabel: string
  sourceUrl: string
}

export type Account = {
  slug: string
  name: string
  legalName: string
  cin?: string
  website: string
  location: string
  whatTheyMake: string
  revenueLabel: string
  /** Rupee crore figure used by the scorer. Null when the file refuses to score one. */
  revenueCrore: number | null
  period: string
  puneGate: PuneGate
  sectorGate: SectorGate
  revenueGate: RevenueGate
  ibxFit: string
  factors: Factor[]
  people: DecisionMaker[]
  checklist: string[]
  holdReason?: string
}
