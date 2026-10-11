import { getAccount } from "@/lib/accounts"
import { scoreAccount, nodeVersion } from "@/lib/desk-query"
import { COMPILED_ON } from "@/lib/qualification"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  const account = getAccount(slug)
  if (!account) {
    return Response.json({ error: "No account with that slug." }, { status: 404 })
  }
  return Response.json({
    node: nodeVersion(),
    compiledOn: COMPILED_ON,
    account: scoreAccount(account),
  })
}
