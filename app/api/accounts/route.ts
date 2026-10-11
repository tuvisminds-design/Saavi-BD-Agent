import { queryAccounts } from "@/lib/desk-query"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export function GET(request: Request) {
  const url = new URL(request.url)
  return Response.json(
    queryAccounts({
      tier: url.searchParams.get("tier"),
      q: url.searchParams.get("q"),
    }),
  )
}
