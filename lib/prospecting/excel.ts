import ExcelJS from "exceljs"

export const MAIN_HEADERS = [
  "Company Name",
  "Revenue",
  "Location",
  "CEO / Founder Name",
  "CEO / Founder LinkedIn",
  "HR Head Name",
  "HR Head LinkedIn",
  "CSR Head Name",
  "CSR Head LinkedIn",
  "Marketing / Brand Head Name",
  "Marketing / Brand Head LinkedIn",
  "Procurement / Admin Head Name",
  "Procurement / Admin Head LinkedIn",
] as const

export const EXTRA_HEADERS = [
  "Industry",
  "Headcount",
  "Website",
  "Revenue Source URL",
  "Revenue FY",
  "CSR Obligated (Y/N)",
  "Verification Status",
  "Confidence",
  "Sources (per executive)",
  "Verified On",
  "Tag (HOT/WARM)",
  "Latest Trigger Signal",
  "Signal Date",
  "CEO / Founder LinkedIn Search",
  "HR Head LinkedIn Search",
  "CSR Head LinkedIn Search",
  "Marketing / Brand Head LinkedIn Search",
  "Procurement / Admin Head LinkedIn Search",
  "LinkedIn Status (pending/pasted)",
] as const

export const EXPORT_HEADERS = [...MAIN_HEADERS, ...EXTRA_HEADERS]

export type ExportExecutive = {
  persona: "CEO_FOUNDER" | "HR" | "CSR" | "MARKETING" | "PROCUREMENT"
  name: string | null
  linkedinUrl: string | null
  searchLink: string | null
  status: string
  confidence: number | null
  sources: string
  verifiedOn: string | null
}

export type ExportCompany = {
  name: string
  revenue: string
  location: string
  industry: string
  headcount: string
  website: string
  revenueSourceUrl: string
  revenueFy: string
  csr: string
  tag: string
  signal: string
  signalDate: string
  executives: ExportExecutive[]
}

const PERSONA_ORDER = ["CEO_FOUNDER", "HR", "CSR", "MARKETING", "PROCUREMENT"] as const

function byPersona(company: ExportCompany, persona: (typeof PERSONA_ORDER)[number]) {
  return company.executives.find((row) => row.persona === persona)
}

function rowStatus(company: ExportCompany) {
  const named = company.executives.filter((row) => row.name)
  if (named.some((row) => row.status === "CONFLICT")) return "CONFLICT"
  if (named.some((row) => row.status === "MEDIUM")) return "MEDIUM"
  if (named.some((row) => row.status === "VERIFIED")) return "VERIFIED"
  return "NOT_FOUND"
}

function linkedInStatus(company: ExportCompany) {
  const named = company.executives.filter((row) => row.name)
  if (named.length === 0) return ""
  return named.every((row) => row.linkedinUrl) ? "pasted" : "pending"
}

export function companyToRow(company: ExportCompany): (string | number | null)[] {
  const cells: (string | null)[] = []
  for (const persona of PERSONA_ORDER) {
    const executive = byPersona(company, persona)
    cells.push(executive?.name ?? "")
    cells.push(executive?.linkedinUrl ?? "")
  }
  const named = company.executives.filter((row) => row.name)
  const confidence = named.reduce<number | null>((min, row) => {
    if (row.confidence === null) return min
    return min === null ? row.confidence : Math.min(min, row.confidence)
  }, null)
  const sources = named
    .filter((row) => row.sources)
    .map((row) => `${row.persona}: ${row.sources}`)
    .join(" | ")
  const verifiedOn = named
    .map((row) => row.verifiedOn)
    .filter(Boolean)
    .sort()
    .at(-1)
  return [
    company.name,
    company.revenue,
    company.location,
    ...cells,
    company.industry,
    company.headcount,
    company.website,
    company.revenueSourceUrl,
    company.revenueFy,
    company.csr,
    rowStatus(company),
    confidence ?? "",
    sources,
    verifiedOn ?? "",
    company.tag,
    company.signal,
    company.signalDate,
    ...PERSONA_ORDER.map((persona) => byPersona(company, persona)?.searchLink ?? ""),
    linkedInStatus(company),
  ]
}

function paint(row: ExcelJS.Row, argb: string) {
  row.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb } }
  })
}

export async function buildWorkbook(input: {
  companies: ExportCompany[]
  reviews: { company: string; reason: string; status: string }[]
  signals: { company: string; title: string; url: string; publishedAt: string; score: number }[]
}) {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Companies")
  sheet.addRow([...EXPORT_HEADERS])
  sheet.views = [{ state: "frozen", ySplit: 1 }]
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: EXPORT_HEADERS.length },
  }
  sheet.getRow(1).font = { bold: true }

  for (const company of input.companies) {
    const values = companyToRow(company)
    const row = sheet.addRow(values)
    const status = rowStatus(company)
    if (status === "MEDIUM") paint(row, "FFFFF2CC")
    if (status === "CONFLICT") paint(row, "FFF4CCCC")
    for (let column = 1; column <= values.length; column += 1) {
      const value = values[column - 1]
      if (typeof value === "string" && value.startsWith("https://")) {
        row.getCell(column).value = { text: value, hyperlink: value }
      }
    }
  }

  const reviews = workbook.addWorksheet("Review Queue")
  reviews.addRow(["Company", "Reason", "Status"])
  for (const item of input.reviews) reviews.addRow([item.company, item.reason, item.status])

  const signals = workbook.addWorksheet("Signals")
  signals.addRow(["Company", "Title", "URL", "Published", "Score"])
  for (const signal of input.signals) {
    const row = signals.addRow([signal.company, signal.title, signal.url, signal.publishedAt, signal.score])
    if (signal.url.startsWith("https://")) {
      row.getCell(3).value = { text: signal.url, hyperlink: signal.url }
    }
  }

  return Buffer.from(await workbook.xlsx.writeBuffer())
}
