import { toExportCompanies } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export function GET() {
  return Response.json({ companies: toExportCompanies() })
}
