import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { loadPersonas, mapTitle } from "../lib/prospecting/role-map"

describe("role map", () => {
  const personas = loadPersonas()

  it("maps Head - Total Rewards to HR", () => {
    assert.equal(mapTitle("Head - Total Rewards", personas)?.persona, "HR")
  })

  it("maps Chief Sustainability Officer to CSR", () => {
    assert.equal(mapTitle("Chief Sustainability Officer", personas)?.persona, "CSR")
  })

  it("maps Admin Head to procurement as a proxy title", () => {
    const mapped = mapTitle("Admin Head", personas)
    assert.equal(mapped?.persona, "PROCUREMENT")
    assert.equal(mapped?.proxy, true)
  })
})
