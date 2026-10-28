import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { qualifyAccount } from "../lib/prospecting/frameworks"

const base = {
  companyName: "Shanthi Gears Limited",
  revenueLabel: "₹518.72 Cr (FY26, standalone)",
  revenueSourceUrl: "https://example.com/revenue",
  inBand: true,
  location: "Coimbatore",
  priorityCity: false,
  csrObligated: false,
  signals: [],
  now: new Date("2026-10-28T00:00:00Z"),
}

describe("Saavi qualification frameworks", () => {
  it("records the HR head as authority and leaves the gifting budget missing", () => {
    const view = qualifyAccount({
      ...base,
      hrName: "Helena Susan",
      hrTitle: "Head – Human Resources",
      hrSourceUrl: "https://example.com/filing",
    })
    assert.deepEqual(view.frameworks, ["MEDDPICC", "BANT", "SPICED"])
    assert.match(view.bant.authority.known ?? "", /Helena Susan/)
    assert.equal(view.bant.authority.sourceUrl, "https://example.com/filing")
    assert.match(view.bant.budget.missing ?? "", /gifting budget/i)
    assert.equal(view.meddpicc.champion.known, null)
    assert.equal(view.bant.need.known, null)
  })

  it("does not invent an HR name when the seat is empty", () => {
    const view = qualifyAccount({ ...base, hrName: null, hrTitle: null, hrSourceUrl: null })
    const text = JSON.stringify(view)
    assert.equal(view.bant.authority.known, null)
    assert.equal(text.includes("Helena"), false)
    assert.ok(view.priorityScore < 50)
  })

  it("treats a saved signal as the only known need", () => {
    const view = qualifyAccount({
      ...base,
      hrName: null,
      hrTitle: null,
      hrSourceUrl: null,
      signals: [{ title: "RFQ for Diwali employee gifts", url: "https://example.com/rfq" }],
    })
    assert.equal(view.bant.need.known, "RFQ for Diwali employee gifts")
    assert.equal(view.bant.need.sourceUrl, "https://example.com/rfq")
  })
})