import ExcelJS from "exceljs"

export const MAIN_HEADERS = [
  "Company Name",
  "Revenue",
  "Location",
  "HR Head Name",
  "HR Head LinkedIn",
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
  "HR Head LinkedIn Search",
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

function hrOf(company: ExportCompany) {
  return company.executives.find((row) => row.persona === "HR")
}

function rowStatus(company: ExportCompany) {
  const named = company.executives.filter((row) => row.persona === "HR" && row.name)
  if (named.some((row) => row.status === "CONFLICT")) return "CONFLICT"
  if (named.some((row) => row.status === "MEDIUM")) return "MEDIUM"
  if (named.some((row) => row.status === "VERIFIED")) return "VERIFIED"
  return "NOT_FOUND"
}

function linkedInStatus(company: ExportCompany) {
  const named = company.executives.filter((row) => row.persona === "HR" && row.name)
  if (named.length === 0) return ""
  return named.every((row) => row.linkedinUrl) ? "pasted" : "pending"
}

export function companyToRow(company: ExportCompany): (string | number | null)[] {
  const executive = hrOf(company)
  const named = executive?.name ? [executive] : []
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
    executive?.name ?? "",
    executive?.linkedinUrl ?? "",
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
    executive?.searchLink ?? "",
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
  qualifications?: { company: string; framework: string; element: string; known: string; missing: string; source: string }[]
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

  const qualification = workbook.addWorksheet("Qualification")
  qualification.addRow(["Company", "Framework", "Element", "Known", "Missing", "Source"])
  qualification.getRow(1).font = { bold: true }
  qualification.views = [{ state: "frozen", ySplit: 1 }]
  for (const item of input.qualifications ?? []) {
    const row = qualification.addRow([item.company, item.framework, item.element, item.known, item.missing, item.source])
    if (item.source.startsWith("https://")) {
      row.getCell(6).value = { text: item.source, hyperlink: item.source }
    }
  }

  return Buffer.from(await workbook.xlsx.writeBuffer())
}
