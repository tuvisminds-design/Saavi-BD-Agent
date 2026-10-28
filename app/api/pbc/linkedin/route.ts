import { pasteLinkedIn } from "@/lib/prospecting/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = (await request.json()) as { executiveId?: number; url?: string; pastedBy?: string }
  const result = pasteLinkedIn({
    executiveId: Number(body.executiveId),
    url: String(body.url ?? ""),
    pastedBy: String(body.pastedBy ?? ""),
  })
  return Response.json(result, { status: result.ok ? 200 : 400 })
}
