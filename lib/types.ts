export type Tier = "high" | "medium" | "cutoff"

/** Named head, an HR function whose current head is not named, or no evidence. */
export type HrFit = "named" | "function" | "none"

export type FactorId = "revenue" | "hr" | "pune" | "persona" | "linkedin"

export type Factor = {
  id: FactorId
  label: string
  points: number
  max: number
  justification: string
  sourceLabel: string
  sourceUrl: string
}

export type BuyingRole = "Chief executive" | "Finance owner" | "HR owner"

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
  /** Latest annual sales used by the gate, in ₹ crore. Group figure when it is larger. */
  revenueCrore: number
  revenueLabel: string
  period: string
  moneycontrolUrl: string
  /** True only when the deciding sales figure sits in ₹500–1,000 crore. */
  inBand: boolean
  hrFit: HrFit
  linkedinCompanyUrl?: string
  linkedinConfirms?: string
  giftFit: string
  factors: Factor[]
  people: DecisionMaker[]
  checklist: string[]
  cutoffReason?: string
}
