"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { TierBadge } from "@/components/tier-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { scoreOf, tierOf } from "@/lib/qualification"
import type { Account, Tier } from "@/lib/types"

const filters: Array<{ id: "all" | Tier; label: string }> = [
  { id: "all", label: "All" },
  { id: "pursue", label: "Pursue" },
  { id: "verify", label: "Verify" },
  { id: "hold", label: "Hold" },
]

export function AccountBrowser({ accounts }: { accounts: Account[] }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all")

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return accounts
      .map((account) => ({
        account,
        tier: tierOf(account),
        score: scoreOf(account),
      }))
      .filter((row) => (filter === "all" ? true : row.tier === filter))
      .filter((row) => {
        if (!needle) return true
        const haystack = [
          row.account.name,
          row.account.legalName,
          row.account.whatTheyMake,
          row.account.location,
          row.account.revenueLabel,
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(needle)
      })
      .sort((left, right) => right.score - left.score)
  }, [accounts, filter, query])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search company, product, or place"
          aria-label="Search accounts"
          className="h-10 bg-card md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={filter === item.id ? "default" : "outline"}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      {rows.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No accounts match</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Clear the search or switch the tier filter. The desk only lists the
            thirteen companies researched for this pass.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {rows.map(({ account, tier, score }) => (
            <Link key={account.slug} href={`/accounts/${account.slug}`} className="block">
              <Card className="transition-colors hover:bg-accent/40">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xl">{score}</span>
                      <TierBadge tier={tier} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 text-muted-foreground">
                  <p>{account.revenueLabel}</p>
                  <p>{account.period}</p>
                  <p>{account.whatTheyMake}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
