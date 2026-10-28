import { readFileSync } from "node:fs"
import path from "node:path"

import { parse } from "yaml"

export type IcpFile = {
  geographies: string[]
  priority_cities: string[]
  revenue_inr_crore_min: number
  revenue_inr_crore_max: number
  edge_band_ratio: number
}

export function loadIcp(root = process.cwd()): IcpFile {
  return parse(readFileSync(path.join(root, "config/icp.yaml"), "utf8")) as IcpFile
}

export function bandTag(revenue: number | null, hasSignal: boolean, icp = loadIcp()) {
  if (revenue === null) return { inIcp: false, tag: null as string | null, edge: false }
  const min = icp.revenue_inr_crore_min
  const max = icp.revenue_inr_crore_max
  const edge =
    Math.abs(revenue - min) / min <= icp.edge_band_ratio || Math.abs(revenue - max) / max <= icp.edge_band_ratio
  const inIcp = revenue >= min && revenue <= max
  if (!inIcp) return { inIcp, tag: edge ? "EDGE_OF_BAND" : null, edge }
  if (edge) return { inIcp, tag: "EDGE_OF_BAND", edge }
  return { inIcp, tag: hasSignal ? "HOT" : "WARM", edge }
}

export function csrFromTurnover(revenueCrore: number) {
  return revenueCrore >= 1000
}
