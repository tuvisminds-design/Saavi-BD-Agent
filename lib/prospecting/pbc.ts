import { readFileSync } from "node:fs"
import path from "node:path"

import { parse } from "yaml"

export type PbcManifest = {
  id: string
  name: string
  organization: string
  site: string
  version: string
  capability: string
  owns: string[]
  apis: { method: string; path: string; purpose: string }[]
  events: string[]
  rules: string[]
}

export function loadPbc(root = process.cwd()): PbcManifest {
  return parse(readFileSync(path.join(root, "pbc/saavi-prospecting.yaml"), "utf8")) as PbcManifest
}
