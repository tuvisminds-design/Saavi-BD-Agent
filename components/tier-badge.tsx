import { Badge } from "@/components/ui/badge"
import { tierLabel } from "@/lib/qualification"
import type { Tier } from "@/lib/types"
import { cn } from "@/lib/utils"

const styles: Record<Tier, string> = {
  high: "bg-primary text-primary-foreground",
  medium: "bg-accent text-accent-foreground",
  cutoff: "bg-destructive/15 text-destructive",
}

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <Badge className={cn("h-6 px-2", styles[tier])} variant="secondary">
      {tierLabel(tier)}
    </Badge>
  )
}
