"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import { TierStamp } from "@/components/tier-stamp"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DeskAccount } from "@/lib/accounts"
import { tierLabel } from "@/lib/qualification"
import type { Tier } from "@/lib/types"

type TierFilter = "all" | Tier

export function AccountBrowser({ accounts }: { accounts: DeskAccount[] }) {
  const [query, setQuery] = useState("")
  const [tier, setTier] = useState<TierFilter>("all")

  const counts = useMemo(() => {
    return {
      all: accounts.length,
      pursue: accounts.filter((account) => account.tier === "pursue").length,
      verify: accounts.filter((account) => account.tier === "verify").length,
      hold: accounts.filter((account) => account.tier === "hold").length,
    }
  }, [accounts])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return accounts.filter((account) => {
      if (tier !== "all" && account.tier !== tier) return false
      if (!needle) return true
      const people = account.people.map((person) => person.name).join(" ")
      const haystack = [
        account.name,
        account.legalName,
        account.cin,
        account.location,
        account.whatTheyMake,
        account.revenueLabel,
        account.ibxFit,
        people,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [accounts, query, tier])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="flex w-full max-w-md flex-col gap-2 text-sm">
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            Search the file
          </span>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, CIN, place, or product"
            className="h-10 bg-card"
          />
        </label>
        <Tabs
          value={tier}
          onValueChange={(value) => {
            if (
              value === "all" ||
              value === "pursue" ||
              value === "verify" ||
              value === "hold"
            ) {
              setTier(value)
            }
          }}
        >
          <TabsList className="h-auto flex-wrap">
            {(
              [
                ["all", `All ${counts.all}`],
                ["pursue", `${tierLabel("pursue")} ${counts.pursue}`],
                ["verify", `${tierLabel("verify")} ${counts.verify}`],
                ["hold", `${tierLabel("hold")} ${counts.hold}`],
              ] as const
            ).map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-foreground/30 bg-card px-4 py-12 text-center">
          <p className="font-heading text-2xl">No account matches.</p>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Nothing in this thirteen-company file matches that search
            {tier !== "all" ? ` inside ${tierLabel(tier)}` : ""}. Clear the
            box, or set the tier back to All.
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setQuery("")
              setTier("all")
            }}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4">
          {filtered.map((account) => (
            <li key={account.slug}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle>
                        <Link
                          href={`/accounts/${account.slug}`}
                          className="font-heading text-xl hover:underline"
                        >
                          {account.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {account.legalName}
                        {account.cin ? ` · ${account.cin}` : ""}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{account.score}</span>
                      <TierStamp tier={account.tier} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p>{account.revenueLabel}</p>
                  <p className="text-muted-foreground">{account.location}</p>
                  {account.holdReason ? (
                    <p className="border-l-2 border-hold pl-3 text-sm">
                      {account.holdReason}
                    </p>
                  ) : null}
                  <Link
                    href={`/accounts/${account.slug}`}
                    className="text-sm underline decoration-foreground/30 underline-offset-4"
                  >
                    Open dossier
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
