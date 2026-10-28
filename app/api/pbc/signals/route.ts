import { addManualSignal } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = (await request.json()) as { companyId?: number; title?: string; url?: string; publishedAt?: string }
  const result = addManualSignal({
    companyId: Number(body.companyId),
    title: String(body.title ?? ""),
    url: String(body.url ?? ""),
    publishedAt: String(body.publishedAt ?? ""),
  })
  return Response.json(result, { status: result.ok ? 200 : 400 })
}
