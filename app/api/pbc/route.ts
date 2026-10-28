import { listCompanies, listEvents, listReviews } from "@/lib/prospecting/db"
import { loadPbc } from "@/lib/prospecting/pbc"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export function GET() {
  const manifest = loadPbc()
  return Response.json({
    ...manifest,
    access: {
      companies: "/",
      capability: "/pbc",
      excel: "/api/export",
      workbook: "saavi-prospects.xlsx",
    },
    counts: {
      companies: listCompanies().length,
      openReviews: listReviews().length,
      events: listEvents().length,
    },
  })
}
