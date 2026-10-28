import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { describe, it } from "node:test"

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    if (name === "node_modules" || name === ".next" || name === "tests") return []
    if (statSync(full).isDirectory()) return files(full)
    if (/\.(ts|tsx|js|mjs)$/.test(name)) return [full]
    return []
  })
}

describe("linkedin network ban", () => {
  it("has no fetch, playwright, or selenium call beside a linkedin.com string", () => {
    const root = path.resolve(import.meta.dirname, "..")
    const offenders: string[] = []
    for (const file of [...files(path.join(root, "lib")), ...files(path.join(root, "app")), ...files(path.join(root, "components"))]) {
      const text = readFileSync(file, "utf8")
      if (!text.includes("linkedin.com")) continue
      if (/fetch\s*\(|playwright|selenium|axios|from\s+["']got["']/.test(text)) offenders.push(file)
    }
    assert.deepEqual(offenders, [])
  })
})
