import { resolveReview } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = (await request.json()) as { id?: number; decision?: string }
  if (body.decision !== "accepted" && body.decision !== "rejected") {
    return Response.json({ ok: false, error: "Decision must be accepted or rejected." }, { status: 400 })
  }
  resolveReview(Number(body.id), body.decision)
  return Response.json({ ok: true })
}
