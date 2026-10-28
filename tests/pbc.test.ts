import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { openDatabase, pasteLinkedIn, seedDatabase } from "../lib/prospecting/db"
import { loadPbc } from "../lib/prospecting/pbc"

describe("Saavi packaged capability", () => {
  it("names Saavi gifting prospecting", () => {
    const manifest = loadPbc()
    assert.equal(manifest.id, "saavi.gifting.prospecting")
    assert.equal(manifest.organization, "Saavi")
    assert.ok(manifest.events.includes("linkedin.pasted"))
  })

  it("records a linkedin.pasted event when a rep pastes a profile", () => {
    const db = openDatabase(":memory:")
    seedDatabase(db)
    const executive = db.prepare("SELECT id FROM executives WHERE full_name IS NOT NULL LIMIT 1").get() as { id: number }
    const result = pasteLinkedIn({
      db,
      executiveId: executive.id,
      url: "https://www.linkedin.com/in/confirmed-profile",
      pastedBy: "Saavi rep",
    })
    assert.equal(result.ok, true)
    const event = db.prepare("SELECT type, payload FROM events ORDER BY id DESC LIMIT 1").get() as {
      type: string
      payload: string
    }
    assert.equal(event.type, "linkedin.pasted")
    assert.equal(JSON.parse(event.payload).pastedBy, "Saavi rep")
  })
})
