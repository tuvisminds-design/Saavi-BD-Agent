import { buildWorkbook } from "@/lib/prospecting/excel"
import { qualificationRows } from "@/lib/prospecting/frameworks"
import { listCompanies, listReviews, listSignals, qualificationFor, toExportCompanies } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  const bytes = await buildWorkbook({
    companies: toExportCompanies(),
    reviews: listReviews().map((item) => ({
      company: item.company ?? "",
      reason: item.reason,
      status: item.status,
    })),
    signals: listSignals().map((signal) => ({
      company: signal.company,
      title: signal.title,
      url: signal.url,
      publishedAt: signal.publishedAt,
      score: signal.score,
    })),
    qualifications: listCompanies().flatMap((company) => {
      const view = qualificationFor(company.id)
      return view ? qualificationRows(company.name, view) : []
    }),
  })
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="saavi-prospects.xlsx"',
    },
  })
}
