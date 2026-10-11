import { AccountBrowser } from "@/components/account-browser"
import { SiteShell } from "@/components/site-shell"
import { accounts } from "@/lib/accounts"
import type { Tier } from "@/lib/types"

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
          Five accounts stay on the call list. The rest are here so a random
          ₹500–1,000 crore lead, or a famous plant above ₹1,000 crore, can be
          cut off with the Moneycontrol line still open.
        </p>
      </div>
      <AccountBrowser accounts={accounts} initialTier={initialTier} />
    </SiteShell>
  )
}
