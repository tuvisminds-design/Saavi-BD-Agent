import { AccountBrowser } from "@/components/account-browser"
import { SiteShell } from "@/components/site-shell"
import { queryAccounts } from "@/lib/desk-query"
import type { Tier } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>
}) {
  const { tier } = await searchParams
  const initialTier: "all" | Tier =
    tier === "high" || tier === "medium" || tier === "cutoff" ? tier : "all"

  return (
    <SiteShell current="/accounts">
      <div className="mb-6 max-w-3xl">
        <h1 className="font-heading text-4xl">Accounts</h1>
        <p className="mt-3 text-muted-foreground">
          Highly qualified and medium accounts stay on the call list. Cut
          off stays in the file so an over-band name, a standalone-sales trap,
          or an in-band company with no public HR seat can be checked against
          the source.
        </p>
      </div>
      <AccountBrowser accounts={queryAccounts({}).accounts} initialTier={initialTier} />
    </SiteShell>
  )
}
