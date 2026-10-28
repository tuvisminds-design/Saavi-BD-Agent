import { readFileSync } from "node:fs"
import path from "node:path"

import { parse } from "yaml"

type KeywordFile = {
  corporate_gifting: string[]
  sustainability: string[]
  csr_esg: string[]
  seeking_provider_phrases: string[]
}

type SeasonFile = {
  boost_weeks_before: number
  windows: { id: string; label: string; months: number[] }[]
}

type ThresholdFile = {
  seasonal_multiplier_peak: number
  seasonal_multiplier_approach: number
  seasonal_multiplier_base: number
  recency_max: number
  recency_days: number
  keyword_max: number
  persona_max: number
  icp_max: number
}

function load<T>(name: string, root = process.cwd()): T {
  return parse(readFileSync(path.join(root, "config", name), "utf8")) as T
}

export function matchKeywords(text: string, keywords: KeywordFile = load<KeywordFile>("keywords.yaml")) {
  const hay = text.toLowerCase()
  const groups = ["corporate_gifting", "sustainability", "csr_esg"] as const
  const matched = groups.flatMap((group) => keywords[group].filter((phrase) => hay.includes(phrase.toLowerCase())))
  const seeking = keywords.seeking_provider_phrases.filter((phrase) => hay.includes(phrase.toLowerCase()))
  return {
    matched,
    seekingProvider: seeking.length > 0 && matched.length > 0,
  }
}

function windowStart(year: number, month: number) {
  return new Date(Date.UTC(year, month - 1, 1))
}

export function seasonalMultiplier(on: Date, root = process.cwd()) {
  const seasons = load<SeasonFile>("seasons.yaml", root)
  const thresholds = load<ThresholdFile>("thresholds.yaml", root)
  const month = on.getUTCMonth() + 1
  const inPeak = seasons.windows.some((window) => window.months.includes(month))
  if (inPeak) return thresholds.seasonal_multiplier_peak

  const approachMs = seasons.boost_weeks_before * 7 * 24 * 60 * 60 * 1000
  const year = on.getUTCFullYear()
  for (const window of seasons.windows) {
    const startMonth = Math.min(...window.months)
    for (const candidate of [year, year + 1]) {
      const start = windowStart(candidate, startMonth).getTime()
      const delta = start - on.getTime()
      if (delta > 0 && delta <= approachMs) return thresholds.seasonal_multiplier_approach
    }
  }
  return thresholds.seasonal_multiplier_base
}

export function scoreSignal(input: {
  text: string
  publishedAt: string
  personaRelevance?: number
  icpFit?: number
  now?: Date
}) {
  const thresholds = load<ThresholdFile>("thresholds.yaml")
  const keywords = matchKeywords(input.text)
  const published = new Date(input.publishedAt)
  const now = input.now ?? new Date()
  const ageDays = Math.max(0, (now.getTime() - published.getTime()) / (24 * 60 * 60 * 1000))
  const recency =
    ageDays >= thresholds.recency_days ? 0 : Math.round(thresholds.recency_max * (1 - ageDays / thresholds.recency_days))
  const keyword = Math.min(thresholds.keyword_max, keywords.matched.length * 10 + (keywords.seekingProvider ? 10 : 0))
  const persona = Math.max(0, Math.min(thresholds.persona_max, input.personaRelevance ?? 0))
  const icp = Math.max(0, Math.min(thresholds.icp_max, input.icpFit ?? 0))
  const multiplier = seasonalMultiplier(published)
  const score = Math.round((recency + keyword + persona + icp) * multiplier)
  return { score, multiplier, matched: keywords.matched, seekingProvider: keywords.seekingProvider, recency, keyword }
}
