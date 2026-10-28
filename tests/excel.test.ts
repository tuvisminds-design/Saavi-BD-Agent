import assert from "node:assert/strict"
import { describe, it } from "node:test"

import ExcelJS from "exceljs"

import { buildWorkbook, EXPORT_HEADERS, MAIN_HEADERS } from "../lib/prospecting/excel"

describe("excel export", () => {
  it("exports the HR head and leaves every other seat out", async () => {
    assert.deepEqual(EXPORT_HEADERS.slice(0, 5), [...MAIN_HEADERS])
    assert.equal((EXPORT_HEADERS as readonly string[]).includes("CEO / Founder Name"), false)
    const bytes = await buildWorkbook({
      companies: [
        {
          name: "Example Limited",
          revenue: "₹742 Cr (FY25, consolidated)",
          location: "Pune",
          industry: "",
          headcount: "",
          website: "https://example.com",
          revenueSourceUrl: "https://example.com/filing",
          revenueFy: "FY25",
          csr: "Y",
          tag: "WARM",
          signal: "",
          signalDate: "",
          executives: [
            {
              persona: "HR",
              name: "A Person",
              linkedinUrl: null,
              searchLink: "https://www.linkedin.com/search/results/people/?keywords=A%20Person",
              status: "MEDIUM",
              confidence: 74,
              sources: "https://example.com/hr",
              verifiedOn: "2026-10-11",
            },
          ],
        },
      ],
      reviews: [{ company: "Example Limited", reason: "CSR blank", status: "open" }],
      signals: [],
    })
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(bytes as unknown as Parameters<ExcelJS.Xlsx["load"]>[0])
    const sheet = workbook.getWorksheet("Companies")
    assert.ok(sheet)
    assert.equal(sheet.getRow(1).getCell(1).value, "Company Name")
    assert.equal(sheet.getRow(1).getCell(4).value, "HR Head Name")
    assert.equal(sheet.getRow(1).getCell(5).value, "HR Head LinkedIn")
    assert.equal(sheet.getRow(2).getCell(4).value, "A Person")
    assert.equal(sheet.getRow(2).getCell(5).value, "")
    assert.ok(workbook.getWorksheet("Review Queue"))
    assert.ok(workbook.getWorksheet("Signals"))
  })
})
