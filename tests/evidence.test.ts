import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { dueForReverify, insertExecutive, openDatabase, seedDatabase } from "../lib/prospecting/db"

describe("evidence constraint", () => {
  it("marks Admin Head as a proxy procurement title", () => {
    const db = openDatabase(":memory:")
    db.prepare("INSERT INTO companies (name, created_at, updated_at) VALUES ('Empty', '2026-10-11', '2026-10-11')").run()
    const id = insertExecutive(db, 1, "PROCUREMENT", "Admin Head", [
      {
        name: "A Clerk",
        sourceUrl: "https://example.com/board",
        sourceType: "company_site",
        retrievedAt: "2026-10-01",
      },
    ])
    const row = db.prepare("SELECT proxy_title, full_name, status FROM executives WHERE id = ?").get(id) as {
      proxy_title: number
      full_name: string
      status: string
    }
    assert.equal(row.proxy_title, 1)
    assert.equal(row.full_name, "A Clerk")
    assert.equal(row.status, "MEDIUM")
  })

  it("refuses a named executive with no evidence", () => {
    const db = openDatabase(":memory:")
    db.prepare("INSERT INTO companies (name, created_at, updated_at) VALUES ('Empty', '2026-10-11', '2026-10-11')").run()
    assert.throws(() => insertExecutive(db, 1, "HR", "CHRO", [], "Pat Example"))
  })

  it("keeps LinkedIn columns blank until a person pastes a profile", () => {
    const db = openDatabase(":memory:")
    seedDatabase(db)
    const companies = db.prepare("SELECT COUNT(*) AS count FROM companies").get() as { count: number }
    assert.equal(companies.count, 20)
    const linked = db.prepare("SELECT COUNT(*) AS count FROM executives WHERE linkedin_url IS NOT NULL").get() as {
      count: number
    }
    assert.equal(linked.count, 0)
    const named = db.prepare("SELECT full_name, status FROM executives WHERE full_name IS NOT NULL").all() as {
      full_name: string
      status: string
    }[]
    assert.ok(named.length > 0)
    assert.ok(named.every((row) => row.status === "VERIFIED" || row.status === "MEDIUM"))
    const pending = db.prepare("SELECT COUNT(*) AS count FROM executives WHERE full_name IS NOT NULL").get() as {
      count: number
    }
    assert.equal(pending.count, named.length)
    const due = dueForReverify(db, "2027-01-09")
    assert.ok(due.length >= named.length)
    assert.equal(dueForReverify(db, "2026-10-28").length, 0)
  })
})
