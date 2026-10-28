import { deleteCompany, listCompanies } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const company = listCompanies().find((row) => row.id === Number(id))
  if (!company) return Response.json({ ok: false, error: "Company not found" }, { status: 404 })
  deleteCompany(company.id)
  return Response.json({ ok: true })
}
