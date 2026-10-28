import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { scoreNames } from "../lib/prospecting/scoring"
import { seasonalMultiplier, scoreSignal } from "../lib/prospecting/signals"

const now = new Date("2026-10-28T00:00:00Z")

describe("verification scoring", () => {
  it("returns CONFLICT when two sources name different people", () => {
    const result = scoreNames(
      [
        {
          name: "Asha Rao",
          sourceUrl: "https://example.com/filing",
          sourceType: "exchange_filing",
          retrievedAt: "2026-09-01",
        },
        {
          name: "Meera Shah",
          sourceUrl: "https://example.com/site",
          sourceType: "company_site",
          retrievedAt: "2026-09-02",
        },
      ],
      now,
    )
    assert.equal(result.status, "CONFLICT")
    assert.equal(result.name, null)
  })

  it("returns VERIFIED when two strong sources agree", () => {
    const result = scoreNames(
      [
        {
          name: "M. Karunakaran",
          sourceUrl: "https://example.com/a.pdf",
          sourceType: "exchange_filing",
          retrievedAt: "2026-09-03",
        },
        {
          name: "M. Karunakaran",
          sourceUrl: "https://example.com/b.pdf",
          sourceType: "company_site",
          retrievedAt: "2026-06-01",
        },
      ],
      now,
    )
    assert.equal(result.status, "VERIFIED")
    assert.ok(result.confidence >= 85)
  })

  it("leaves aggregator-only names blank", () => {
    const result = scoreNames(
      [
        {
          name: "Someone Else",
          sourceUrl: "https://example.com/news",
          sourceType: "aggregator",
          retrievedAt: "2026-09-01",
        },
      ],
      now,
    )
    assert.equal(result.status, "UNVERIFIED")
    assert.equal(result.name, null)
  })
})

describe("seasonal scoring", () => {
  it("boosts a date inside the Diwali window", () => {
    assert.equal(seasonalMultiplier(new Date("2026-09-15T00:00:00Z")), 1.5)
  })

  it("scores a seeking-vendor gifting line above a plain mention", () => {
    const seeking = scoreSignal({
      text: "RFQ for Diwali gifts and corporate gifting hampers",
      publishedAt: "2026-09-15",
      personaRelevance: 10,
      icpFit: 10,
      now: new Date("2026-09-20T00:00:00Z"),
    })
    const plain = scoreSignal({
      text: "Quarterly results",
      publishedAt: "2026-09-15",
      personaRelevance: 0,
      icpFit: 0,
      now: new Date("2026-09-20T00:00:00Z"),
    })
    assert.equal(seeking.seekingProvider, true)
    assert.ok(seeking.score > plain.score)
  })
})
