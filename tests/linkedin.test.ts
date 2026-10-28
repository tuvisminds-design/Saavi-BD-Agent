import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { describe, it } from "node:test"

import { linkedInSearchLink, parseSalesNavCsv, validateLinkedInProfile } from "../lib/prospecting/linkedin"

describe("LinkedIn paste rules", () => {
  it("rejects company pages and anything that is not an /in/ profile", () => {
    assert.equal(validateLinkedInProfile("https://www.linkedin.com/company/shanthigears"), null)
    assert.equal(validateLinkedInProfile("https://www.linkedin.com/search/results/people/?keywords=A"), null)
    assert.equal(validateLinkedInProfile("not a url"), null)
    assert.equal(validateLinkedInProfile("https://linkedin.com/in/helena-susan/"), "https://linkedin.com/in/helena-susan/")
  })

  it("builds a search link without making a request", () => {
    const source = readFileSync(new URL("../lib/prospecting/linkedin.ts", import.meta.url), "utf8")
    assert.equal(source.includes("fetch("), false)
    const link = linkedInSearchLink("M. Karunakaran", "Shanthi Gears Limited")
    assert.equal(
      link,
      `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent("M. Karunakaran Shanthi Gears Limited")}`,
    )
  })

  it("imports only valid profile URLs from a CSV", () => {
    const parsed = parseSalesNavCsv(
      ["name,company,url", "Helena Susan,Shanthi Gears,https://www.linkedin.com/in/helena-susan", "Bad,Co,https://www.linkedin.com/company/acme"].join(
        "\n",
      ),
    )
    assert.equal(parsed.rows.length, 1)
    assert.equal(parsed.rows[0]?.source, "salesnav_export")
    assert.equal(parsed.rejected, 1)
  })
})
