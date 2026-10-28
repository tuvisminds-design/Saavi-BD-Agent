import { mkdirSync } from "node:fs"
import path from "node:path"
import { DatabaseSync } from "node:sqlite"

import { bandTag, csrFromTurnover } from "@/lib/prospecting/icp"
import { loadPersonas, mapTitle } from "@/lib/prospecting/role-map"
import { linkedInSearchLink, validateLinkedInProfile, type LinkedInSource } from "@/lib/prospecting/linkedin"
import { SCHEMA } from "@/lib/prospecting/schema"
import { scoreNames, type NameHit, type SourceType } from "@/lib/prospecting/scoring"
import { SEED } from "@/lib/prospecting/seed-data"
import { scoreSignal } from "@/lib/prospecting/signals"
import type { ExportCompany } from "@/lib/prospecting/excel"

type EvidenceInput = {
  field: string
  value: string
  sourceUrl: string
  sourceType: SourceType
  retrievedAt: string
}

let singleton: DatabaseSync | null = null

export function openDatabase(filename = ":memory:") {
  const db = new DatabaseSync(filename)
  db.exec(SCHEMA)
  return db
}

export function assertCanWriteExecutive(name: string | null, evidenceCount: number) {
  if (name && evidenceCount < 1) {
    throw new Error("executive name requires evidence")
  }
}

function addDays(iso: string, days: number) {
  const date = new Date(`${iso.slice(0, 10)}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function insertEvidence(db: DatabaseSync, row: EvidenceInput & { executiveId?: number; companyId?: number }) {
  if (!row.sourceUrl.startsWith("https://")) throw new Error("evidence source_url must be https")
  db.prepare(
    `INSERT INTO evidence (executive_id, company_id, field, value, source_url, source_type, retrieved_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    row.executiveId ?? null,
    row.companyId ?? null,
    row.field,
    row.value,
    row.sourceUrl,
    row.sourceType,
    row.retrievedAt,
  )
}

export function insertExecutive(
  db: DatabaseSync,
  companyId: number,
  persona: string,
  title: string,
  hits: NameHit[],
  claimedName?: string | null,
) {
  const scored = scoreNames(hits)
  const name = claimedName === undefined ? scored.name : claimedName
  assertCanWriteExecutive(name, hits.length)
  const mapped = mapTitle(title, loadPersonas())
  const proxy = mapped?.proxy && mapped.persona === persona ? 1 : 0
  const verifiedOn = name ? (hits.map((hit) => hit.retrievedAt).sort().at(-1) ?? "").slice(0, 10) : null
  const result = db.prepare(
    `INSERT INTO executives (
      company_id, persona, full_name, raw_title, proxy_title, status, confidence, verified_on, next_reverify_on
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    companyId,
    persona,
    name,
    name ? title : null,
    proxy,
    name ? scored.status : hits.length === 0 ? "NOT_FOUND" : scored.status,
    name ? scored.confidence : scored.confidence,
    verifiedOn,
    verifiedOn ? addDays(verifiedOn, 90) : null,
  )
  const executiveId = Number(result.lastInsertRowid)
  if (name) {
    for (const item of hits) {
      insertEvidence(db, {
        executiveId,
        companyId,
        field: "full_name",
        value: item.name,
        sourceUrl: item.sourceUrl,
        sourceType: item.sourceType,
        retrievedAt: item.retrievedAt,
      })
    }
  }
  if (scored.status === "CONFLICT") {
    db.prepare(
      `INSERT INTO review_items (entity_type, entity_id, reason, status) VALUES ('executive', ?, ?, 'open')`,
    ).run(executiveId, "Two sources name different people for this role.")
  }
  return executiveId
}

export function seedDatabase(db: DatabaseSync) {
  const now = "2026-10-11"
  const insertCompany = db.prepare(
    `INSERT INTO companies (
      name, website, industry, hq_location, country, headcount, revenue_inr_crore, revenue_fiscal_year,
      revenue_basis, revenue_source_url, csr_obligated, csr_rule_source_url, tag, created_at, updated_at
    ) VALUES (?, ?, NULL, ?, 'India', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  for (const company of SEED) {
    if (!company.revenueSourceUrl.startsWith("https://")) throw new Error(`${company.name} missing revenue source`)
    const obligated = csrFromTurnover(company.revenue)
    const tag = bandTag(company.revenue, false).tag
    const result = insertCompany.run(
      company.name,
      company.website ?? null,
      company.hq ?? null,
      company.revenue,
      company.fy,
      company.basis,
      company.revenueSourceUrl,
      obligated ? 1 : null,
      obligated ? company.revenueSourceUrl : null,
      tag,
      now,
      now,
    )
    const companyId = Number(result.lastInsertRowid)
    insertEvidence(db, {
      companyId,
      field: "revenue",
      value: String(company.revenue),
      sourceUrl: company.revenueSourceUrl,
      sourceType: company.revenueSourceType,
      retrievedAt: now,
    })
    if (company.hq && company.hqSourceUrl && company.hqSourceType) {
      insertEvidence(db, {
        companyId,
        field: "hq_location",
        value: company.hq,
        sourceUrl: company.hqSourceUrl,
        sourceType: company.hqSourceType,
        retrievedAt: now,
      })
    }
    for (const executive of company.executives) {
      if (executive.persona !== "HR") continue
      insertExecutive(db, companyId, executive.persona, executive.title, executive.hits)
    }
    if (company.review) {
      db.prepare(
        `INSERT INTO review_items (entity_type, entity_id, reason, status) VALUES ('company', ?, ?, 'open')`,
      ).run(companyId, company.review)
    }
  }
}

export function getDb() {
  if (singleton) return singleton
  const filename = process.env.PROSPECT_DB ?? path.join(process.cwd(), "data", "prospects.db")
  if (filename !== ":memory:") mkdirSync(path.dirname(filename), { recursive: true })
  const db = openDatabase(filename)
  const row = db.prepare("SELECT COUNT(*) AS count FROM companies").get() as { count: number }
  if (row.count === 0) seedDatabase(db)
  db.prepare("DELETE FROM evidence WHERE executive_id IN (SELECT id FROM executives WHERE persona != 'HR')").run()
  db.prepare("DELETE FROM executives WHERE persona != 'HR'").run()
  backfillListedEvents(db)
  singleton = db
  return db
}

export function resetDbForTests() {
  singleton = null
}

type CompanyRecord = {
  id: number
  name: string
  website: string | null
  industry: string | null
  hq_location: string | null
  country: string | null
  headcount: number | null
  revenue_inr_crore: number | null
  revenue_fiscal_year: string | null
  revenue_basis: string | null
  revenue_source_url: string | null
  csr_obligated: number | null
  tag: string | null
}

type ExecutiveRecord = {
  id: number
  company_id: number
  persona: ExportCompany["executives"][number]["persona"]
  full_name: string | null
  raw_title: string | null
  linkedin_url: string | null
  linkedin_source: string | null
  status: string
  confidence: number | null
  verified_on: string | null
}

export function listCompanies(db = getDb()) {
  return db.prepare("SELECT * FROM companies ORDER BY revenue_inr_crore DESC").all() as CompanyRecord[]
}

export function listExecutives(companyId: number, db = getDb()) {
  return db
    .prepare("SELECT * FROM executives WHERE company_id = ? ORDER BY id")
    .all(companyId) as ExecutiveRecord[]
}

export function evidenceFor(companyId: number, db = getDb()) {
  return db
    .prepare(
      `SELECT field, value, source_url AS sourceUrl, source_type AS sourceType, retrieved_at AS retrievedAt, executive_id AS executiveId
       FROM evidence WHERE company_id = ? ORDER BY id`,
    )
    .all(companyId) as {
    field: string
    value: string
    sourceUrl: string
    sourceType: string
    retrievedAt: string
    executiveId: number | null
  }[]
}

export function listReviews(db = getDb()) {
  return db
    .prepare(
      `SELECT review_items.id, review_items.reason, review_items.status, review_items.entity_type AS entityType,
              review_items.entity_id AS entityId, companies.name AS company, companies.id AS companyId
       FROM review_items
       LEFT JOIN companies ON (
         (review_items.entity_type = 'company' AND companies.id = review_items.entity_id)
         OR (review_items.entity_type = 'executive' AND companies.id = (
           SELECT company_id FROM executives WHERE executives.id = review_items.entity_id
         ))
       )
       WHERE review_items.status = 'open'
       ORDER BY review_items.id`,
    )
    .all() as {
    id: number
    reason: string
    status: string
    entityType: string
    entityId: number
    company: string | null
    companyId: number | null
  }[]
}

export function listSignals(db = getDb()) {
  return db
    .prepare(
      `SELECT signals.id, signals.title, signals.url, signals.published_at AS publishedAt, signals.score,
              signals.matched_keywords AS matchedKeywords, signals.type, companies.name AS company, companies.id AS companyId
       FROM signals JOIN companies ON companies.id = signals.company_id
       ORDER BY signals.published_at DESC, signals.id DESC`,
    )
    .all() as {
    id: number
    title: string
    url: string
    publishedAt: string
    score: number
    matchedKeywords: string
    type: string
    company: string
    companyId: number
  }[]
}

export function revenueLabel(company: CompanyRecord) {
  if (company.revenue_inr_crore === null) return ""
  const amount = Number.isInteger(company.revenue_inr_crore)
    ? String(company.revenue_inr_crore)
    : String(company.revenue_inr_crore)
  return `₹${amount} Cr (${company.revenue_fiscal_year}, ${company.revenue_basis})`
}

export function toExportCompanies(db = getDb()): ExportCompany[] {
  return listCompanies(db).map((company) => ({
    name: company.name,
    revenue: revenueLabel(company),
    location: company.hq_location ?? "",
    industry: company.industry ?? "",
    headcount: company.headcount === null ? "" : String(company.headcount),
    website: company.website ?? "",
    revenueSourceUrl: company.revenue_source_url ?? "",
    revenueFy: company.revenue_fiscal_year ?? "",
    csr: company.csr_obligated === 1 ? "Y" : "",
    tag: company.tag ?? "",
    signal: listSignals(db).find((signal) => signal.companyId === company.id)?.title ?? "",
    signalDate: listSignals(db).find((signal) => signal.companyId === company.id)?.publishedAt ?? "",
    executives: listExecutives(company.id, db)
      .filter((executive) => executive.persona === "HR")
      .map((executive) => ({
      persona: executive.persona,
      name: executive.full_name,
      linkedinUrl: executive.linkedin_url,
      searchLink: executive.full_name ? linkedInSearchLink(executive.full_name, company.name) : null,
      status: executive.status,
      confidence: executive.confidence,
      sources: evidenceFor(company.id, db)
        .filter((row) => row.executiveId === executive.id)
        .map((row) => row.sourceUrl)
        .join(" "),
      verifiedOn: executive.verified_on,
    })),
  }))
}

export function pasteLinkedIn(input: {
  executiveId: number
  url: string
  pastedBy: string
  db?: DatabaseSync
}) {
  const db = input.db ?? getDb()
  const url = validateLinkedInProfile(input.url)
  if (!url) return { ok: false as const, error: "Paste a linkedin.com/in profile URL. Company pages and search links are rejected." }
  const executive = db.prepare("SELECT id, company_id, full_name FROM executives WHERE id = ?").get(input.executiveId) as
    | { id: number; company_id: number; full_name: string | null }
    | undefined
  if (!executive?.full_name) return { ok: false as const, error: "Paste a profile only after the name is verified." }
  const pastedBy = input.pastedBy.trim()
  if (!pastedBy) return { ok: false as const, error: "Enter who pasted the profile." }
  const now = new Date().toISOString()
  const source: LinkedInSource = "manual"
  db.prepare(
    `UPDATE executives SET linkedin_url = ?, linkedin_source = ?, linkedin_pasted_by = ?, linkedin_pasted_at = ? WHERE id = ?`,
  ).run(url, source, pastedBy, now, executive.id)
  insertEvidence(db, {
    executiveId: executive.id,
    companyId: executive.company_id,
    field: "linkedin_url",
    value: url,
    sourceUrl: url,
    sourceType: "manual",
    retrievedAt: now.slice(0, 10),
  })
  recordEvent(db, "linkedin.pasted", "executive", executive.id, {
    companyId: executive.company_id,
    linkedinSource: source,
    pastedBy,
  })
  return { ok: true as const }
}

export function addManualSignal(input: {
  companyId: number
  title: string
  url: string
  publishedAt: string
  db?: DatabaseSync
}) {
  const db = input.db ?? getDb()
  if (!input.url.startsWith("https://")) return { ok: false as const, error: "The signal needs an https source URL." }
  if (!input.title.trim()) return { ok: false as const, error: "The signal needs a title." }
  const scored = scoreSignal({
    text: input.title,
    publishedAt: input.publishedAt || new Date().toISOString().slice(0, 10),
    personaRelevance: 10,
    icpFit: 10,
  })
  db.prepare(
    `INSERT INTO signals (company_id, type, title, url, published_at, matched_keywords, persona_relevance, score, seasonal_multiplier)
     VALUES (?, 'manual', ?, ?, ?, ?, 'manual', ?, ?)`,
  ).run(
    input.companyId,
    input.title.trim(),
    input.url.trim(),
    input.publishedAt || new Date().toISOString().slice(0, 10),
    scored.matched.join(", "),
    scored.score,
    scored.multiplier,
  )
  const company = db.prepare("SELECT tag, revenue_inr_crore FROM companies WHERE id = ?").get(input.companyId) as
    | { tag: string | null; revenue_inr_crore: number | null }
    | undefined
  const hot = company && bandTag(company.revenue_inr_crore, true).tag === "HOT"
  if (hot) {
    db.prepare("UPDATE companies SET tag = 'HOT', updated_at = ? WHERE id = ?").run(new Date().toISOString(), input.companyId)
  }
  recordEvent(db, "signal.captured", "company", input.companyId, {
    title: input.title.trim(),
    url: input.url.trim(),
    score: scored.score,
  })
  if (hot) recordEvent(db, "company.tagged", "company", input.companyId, { tag: "HOT" })
  return { ok: true as const }
}

export function deleteCompany(id: number, db = getDb()) {
  const company = db.prepare("SELECT name FROM companies WHERE id = ?").get(id) as { name: string } | undefined
  if (company) recordEvent(db, "company.removed", "company", id, { name: company.name })
  db.prepare("DELETE FROM review_items WHERE entity_type = 'company' AND entity_id = ?").run(id)
  db.prepare(
    `DELETE FROM review_items WHERE entity_type = 'executive' AND entity_id IN (SELECT id FROM executives WHERE company_id = ?)`,
  ).run(id)
  db.prepare("DELETE FROM companies WHERE id = ?").run(id)
}

export function resolveReview(id: number, decision: "accepted" | "rejected", db = getDb()) {
  const item = db
    .prepare("SELECT entity_type, entity_id FROM review_items WHERE id = ?")
    .get(id) as { entity_type: string; entity_id: number } | undefined
  if (!item) return
  if (decision === "rejected" && item.entity_type === "executive") {
    db.prepare(
      `UPDATE executives SET full_name = NULL, raw_title = NULL, status = 'NOT_FOUND', confidence = 0,
       linkedin_url = NULL, linkedin_source = NULL, linkedin_pasted_by = NULL, linkedin_pasted_at = NULL,
       verified_on = NULL, next_reverify_on = NULL WHERE id = ?`,
    ).run(item.entity_id)
  }
  db.prepare("UPDATE review_items SET status = ?, resolved_at = ? WHERE id = ?").run(
    decision,
    new Date().toISOString(),
    id,
  )
  recordEvent(db, "review.resolved", item.entity_type, item.entity_id, { decision, reviewId: id })
}

export function recordEvent(
  db: DatabaseSync,
  type: string,
  subjectType: string,
  subjectId: number | null,
  payload: Record<string, unknown>,
) {
  db.prepare(
    `INSERT INTO events (type, subject_type, subject_id, payload, occurred_at) VALUES (?, ?, ?, ?, ?)`,
  ).run(type, subjectType, subjectId, JSON.stringify(payload), new Date().toISOString())
}

function backfillListedEvents(db: DatabaseSync) {
  const count = db.prepare("SELECT COUNT(*) AS count FROM events").get() as { count: number }
  if (count.count > 0) return
  const companies = db.prepare("SELECT id, name, tag FROM companies").all() as {
    id: number
    name: string
    tag: string | null
  }[]
  for (const company of companies) {
    recordEvent(db, "company.listed", "company", company.id, { name: company.name, tag: company.tag })
  }
}

export function listEvents(db = getDb()) {
  return (
    db.prepare("SELECT id, type, subject_type AS subjectType, subject_id AS subjectId, payload, occurred_at AS occurredAt FROM events ORDER BY id DESC").all() as {
      id: number
      type: string
      subjectType: string
      subjectId: number | null
      payload: string
      occurredAt: string
    }[]
  ).map((event) => ({ ...event, payload: JSON.parse(event.payload) as Record<string, unknown> }))
}

export function dueForReverify(db: DatabaseSync, today: string) {
  return db
    .prepare(
      `SELECT id, full_name, next_reverify_on FROM executives
       WHERE full_name IS NOT NULL AND next_reverify_on IS NOT NULL AND next_reverify_on <= ?`,
    )
    .all(today) as { id: number; full_name: string; next_reverify_on: string }[]
}
