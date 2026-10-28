"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const tabs = [
  { href: "/m", label: "HR book" },
  { href: "/m/review", label: "Review" },
  { href: "/m/signals", label: "Signals" },
  { href: "/m/pbc", label: "Package" },
]

export function MobileShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <div className="mx-auto min-h-svh max-w-md bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <p className="text-[0.65rem] tracking-[0.16em] text-primary uppercase">Saavi · gifting</p>
        <p className="font-heading text-xl">Prospecting</p>
      </header>
      <main className="px-4 py-4 pb-28">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex max-w-md border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active = tab.href === "/m" ? path === "/m" : path.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex min-h-14 flex-1 items-center justify-center text-xs tracking-wide",
                active ? "font-medium text-primary" : "text-muted-foreground",
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
