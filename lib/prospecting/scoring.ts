export const STRONG_SOURCE_TYPES = new Set([
  "exchange_filing",
  "annual_report",
  "brsr",
  "company_site",
])

export type SourceType =
  | "exchange_filing"
  | "annual_report"
  | "brsr"
  | "company_site"
  | "news"
  | "aggregator"
  | "moneycontrol"
  | "manual"

export type VerifyStatus = "VERIFIED" | "MEDIUM" | "UNVERIFIED" | "CONFLICT" | "NOT_FOUND"

export type NameHit = {
  name: string
  sourceUrl: string
  sourceType: SourceType
  retrievedAt: string
}

export type ScoreResult = {
  status: VerifyStatus
  confidence: number
  name: string | null
}

const FRESHNESS_MS = 365 * 24 * 60 * 60 * 1000

function normName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim()
}

export function scoreNames(hits: NameHit[], now = new Date()): ScoreResult {
  if (hits.length === 0) return { status: "NOT_FOUND", confidence: 0, name: null }

  const groups = new Map<string, { display: string; hits: NameHit[] }>()
  for (const hit of hits) {
    const key = normName(hit.name)
    if (!key) continue
    const group = groups.get(key) ?? { display: hit.name, hits: [] }
    group.hits.push(hit)
    groups.set(key, group)
  }

  if (groups.size === 0) return { status: "NOT_FOUND", confidence: 0, name: null }

  if (groups.size > 1) {
    return { status: "CONFLICT", confidence: 0, name: null }
  }

  const group = [...groups.values()][0]
  if (!group) return { status: "NOT_FOUND", confidence: 0, name: null }

  const urls = new Set(group.hits.map((hit) => hit.sourceUrl))
  const strong = group.hits.filter((hit) => STRONG_SOURCE_TYPES.has(hit.sourceType))
  const strongUrls = new Set(strong.map((hit) => hit.sourceUrl))
  const newest = group.hits
    .map((hit) => new Date(hit.retrievedAt).getTime())
    .filter((time) => !Number.isNaN(time))
    .sort((a, b) => b - a)[0]
  const stale = newest === undefined || now.getTime() - newest > FRESHNESS_MS

  if (strongUrls.size >= 2) {
    const confidence = stale ? 70 : 92
    return {
      status: stale ? "MEDIUM" : "VERIFIED",
      confidence,
      name: group.display,
    }
  }
  if (strongUrls.size === 1) {
    return { status: "MEDIUM", confidence: stale ? 60 : 74, name: group.display }
  }
  if (urls.size >= 1) {
    return { status: "UNVERIFIED", confidence: 40, name: null }
  }
  return { status: "NOT_FOUND", confidence: 0, name: null }
}
