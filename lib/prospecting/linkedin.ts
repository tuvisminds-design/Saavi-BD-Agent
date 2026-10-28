const PROFILE = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]+\/?$/

export type LinkedInSource = "manual" | "salesnav_export" | "provider"

export function linkedInSearchLink(fullName: string, company: string) {
  const keywords = encodeURIComponent(`${fullName} ${company}`.replace(/\s+/g, " ").trim())
  return `https://www.linkedin.com/search/results/people/?keywords=${keywords}`
}

export function validateLinkedInProfile(url: string) {
  const trimmed = url.trim()
  if (!PROFILE.test(trimmed)) return null
  if (trimmed.includes("/company/") || trimmed.includes("/search/")) return null
  return trimmed
}

export type CsvLinkedInRow = {
  fullName: string
  company: string
  url: string
  source: "salesnav_export"
}

/** Parse a Sales Navigator export. Invalid profile URLs are skipped, never fetched. */
export function parseSalesNavCsv(csv: string): { rows: CsvLinkedInRow[]; rejected: number } {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  if (lines.length === 0) return { rows: [], rejected: 0 }
  const header = lines[0]!.split(",").map((cell) => cell.trim().toLowerCase())
  const nameIdx = header.indexOf("name")
  const companyIdx = header.indexOf("company")
  const urlIdx = header.findIndex((cell) => cell === "url" || cell === "linkedin")
  const rows: CsvLinkedInRow[] = []
  let rejected = 0
  for (const line of lines.slice(1)) {
    const cells = line.split(",").map((cell) => cell.trim())
    const url = validateLinkedInProfile(cells[urlIdx] ?? "")
    const fullName = cells[nameIdx] ?? ""
    const company = cells[companyIdx] ?? ""
    if (!url || !fullName || !company) {
      rejected += 1
      continue
    }
    rows.push({ fullName, company, url, source: "salesnav_export" })
  }
  return { rows, rejected }
}
