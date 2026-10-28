import { readFileSync } from "node:fs"
import path from "node:path"

import { parse } from "yaml"

export type PersonaId = "HR" | "CSR" | "MARKETING" | "PROCUREMENT" | "CEO_FOUNDER"

export type PersonaConfig = {
  label: string
  role: string
  why: string
  cares: string
  objection: string
  titles: string[]
  proxies?: string[]
}

export type PersonaFile = {
  personas: Record<PersonaId, PersonaConfig>
}

export type MappedTitle = {
  persona: PersonaId
  proxy: boolean
  matched: string
}

export function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function containsPhrase(title: string, phrase: string) {
  return ` ${normalizeTitle(title)} `.includes(` ${normalizeTitle(phrase)} `)
}

export function mapTitle(title: string, file: PersonaFile): MappedTitle | null {
  let best: MappedTitle | null = null
  for (const persona of Object.keys(file.personas) as PersonaId[]) {
    const config = file.personas[persona]
    const proxies = new Set((config.proxies ?? []).map(normalizeTitle))
    for (const phrase of config.titles) {
      if (!containsPhrase(title, phrase)) continue
      const mapped: MappedTitle = {
        persona,
        proxy: proxies.has(normalizeTitle(phrase)),
        matched: phrase,
      }
      if (!best || normalizeTitle(phrase).length > normalizeTitle(best.matched).length) {
        best = mapped
      }
    }
  }
  return best
}

let cached: PersonaFile | null = null

export function loadPersonas(root = process.cwd()): PersonaFile {
  if (cached && root === process.cwd()) return cached
  const raw = readFileSync(path.join(root, "config/personas.yaml"), "utf8")
  cached = parse(raw) as PersonaFile
  return cached
}
