import { AccountBrowser } from "@/components/account-browser"
import { SiteShell } from "@/components/site-shell"
import { accounts } from "@/lib/accounts"

export default function AccountsPage() {
  return (
    <SiteShell current="/accounts">
      <div className="mb-6 max-w-3xl">
        <h1 className="font-heading text-4xl">Accounts</h1>
        <p className="mt-3 text-muted-foreground">
          Thirteen companies. The score is the sum of the factors on the
          dossier. Open a company to see the justification and the source.
        </p>
      </div>
      <AccountBrowser accounts={accounts} />
    </SiteShell>
  )
}
