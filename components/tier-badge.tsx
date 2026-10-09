import { Badge } from "@/components/ui/badge"
import { tierLabel } from "@/lib/qualification"
import type { Tier } from "@/lib/types"
import { cn } from "@/lib/utils"

const styles: Record<Tier, string> = {
  pursue: "bg-primary text-primary-foreground",
  verify: "bg-accent text-accent-foreground",
  hold: "bg-destructive/15 text-destructive",
}

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <Badge className={cn("h-6 px-2", styles[tier])} variant="secondary">
      {tierLabel(tier)}
    </Badge>
  )
}
