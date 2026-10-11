import { COMPILED_ON } from "@/lib/qualification"
import { nodeVersion } from "@/lib/desk-query"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export function GET() {
  return Response.json({
    ok: true,
    runtime: "nodejs",
    node: nodeVersion(),
    compiledOn: COMPILED_ON,
  })
}
