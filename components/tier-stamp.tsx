import { Badge } from "@/components/ui/badge"
import { tierLabel } from "@/lib/qualification"
import type { Tier } from "@/lib/types"
import { cn } from "@/lib/utils"

const tone: Record<Tier, string> = {
  high: "border-pursue/50 bg-pursue/10 text-pursue",
  medium: "border-verify/50 bg-verify/15 text-verify",
  cutoff: "border-hold/50 bg-hold/10 text-hold",
}

export function TierStamp({ tier }: { tier: Tier }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto rounded-sm px-2 py-1 font-mono text-[11px] tracking-[0.14em] uppercase",
        tone[tier],
      )}
    >
      {tierLabel(tier)}
    </Badge>
  )
}
