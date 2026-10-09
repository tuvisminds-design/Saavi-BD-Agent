import Link from "next/link"

import { SiteShell } from "@/components/site-shell"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <SiteShell current="/accounts">
      <h1 className="font-heading text-4xl">That account is not on this desk</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The file only includes the companies researched for the Pune pass.
      </p>
      <Link href="/accounts" className={`${buttonVariants()} mt-6`}>
        Back to accounts
      </Link>
    </SiteShell>
  )
}
