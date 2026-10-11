import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { COMPILED_ON } from "@/lib/qualification"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Desk" },
  { href: "/personas", label: "Personas" },
  { href: "/accounts", label: "Accounts" },
  { href: "/method", label: "Method" },
]

export function SiteShell({
  children,
  current,
}: {
  children: React.ReactNode
  current: string
}) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <p className="text-xs tracking-[0.16em] text-primary uppercase">
              Saavi · corporate gifting · ₹500–1,000 crore
            </p>
            <Link href="/" className="font-heading text-2xl text-foreground">
              Lead qualification desk
            </Link>
          </div>
          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: current === link.href ? "default" : "outline",
                    size: "sm",
                  }),
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:justify-between md:px-6">
          <p>
            Compiled {COMPILED_ON}. Desk API on Node {process.version}. Revenue
            is the Moneycontrol sales line.
          </p>
          <p>LinkedIn is opened to verify the company and the title. It is not scraped.</p>
        </div>
      </footer>
    </div>
  )
}
