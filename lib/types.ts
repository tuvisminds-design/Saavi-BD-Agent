export type Tier = "high" | "medium" | "cutoff"

export type SectorFit = "equipment" | "industrial" | "other"

export type FactorId = "revenue" | "sector" | "pune" | "persona" | "linkedin"

export type Factor = {
  id: FactorId
  label: string
  points: number
  max: number
  justification: string
  sourceLabel: string
  sourceUrl: string
}

export type BuyingRole =
  | "Economic buyer"
  | "Finance owner"
  | "Technical buyer"
  | "Process owner"

export type DecisionMaker = {
  name: string
  title: string
  buyingRole: BuyingRole
  why: string
  /** Public profile, or a LinkedIn people search when no profile URL was indexed. */
  linkedinUrl: string
  linkedinNote: string
  sourceLabel: string
  sourceUrl: string
}

export type Account = {
  slug: string
  name: string
  legalName: string
  website: string
  location: string
  whatTheyMake: string
  /** Latest annual sales used by the gate, in ₹ crore, as shown on Moneycontrol. */
  revenueCrore: number
  revenueLabel: string
  period: string
  moneycontrolUrl: string
  /** True only when Moneycontrol's latest annual sales sit in ₹500–1,000 crore. */
  inBand: boolean
  sectorFit: SectorFit
  linkedinCompanyUrl?: string
  linkedinConfirms?: string
  ibxFit: string
  factors: Factor[]
  people: DecisionMaker[]
  checklist: string[]
  cutoffReason?: string
}
