import {
  baseScoreOf,
  FACTOR_GUIDE,
  penaltyOf,
  revenuePoints,
  scoreOf,
  tierOf,
} from "@/lib/qualification"
import type { Account, DecisionMaker, Factor, Tier } from "@/lib/types"

type Copy = [justification: string, sourceLabel: string, sourceUrl: string]

function buildFactors(points: number[], copies: Copy[]): Factor[] {
  return FACTOR_GUIDE.map((guide, index) => ({
    id: guide.id,
    label: guide.label,
    max: guide.max,
    points: points[index] ?? 0,
    justification: copies[index]?.[0] ?? "",
    sourceLabel: copies[index]?.[1] ?? "",
    sourceUrl: copies[index]?.[2] ?? "",
  }))
}

function person(
  input: Omit<DecisionMaker, "buyingRole"> & { buyingRole: string },
): DecisionMaker {
  return input
}

const accounts: Account[] = [
  {
    slug: "thermax",
    name: "Thermax",
    legalName: "Thermax Limited",
    website: "https://www.thermaxglobal.com/",
    location:
      "Headquarters in Pune. Registered office D-13, MIDC Chinchwad. Corporate office Thermax House, Wakdewadi.",
    whatTheyMake:
      "Energy and environment projects: process heat, water, and steam, plus industrial products.",
    revenueLabel: "₹10,389 crore consolidated revenue, FY2024-25",
    revenueCrore: 10389,
    period: "FY2024-25",
    puneGate: "full",
    sectorGate: "process",
    revenueGate: "audited",
    ibxFit:
      "Project execution, vendor SLAs, and document-heavy energy jobs are the IB-X surface. Do not name an ERP. No source in this file does.",
    factors: buildFactors(
      [20, 15, 10, 20, 15, 10, 10],
      [
        [
          "Consolidated revenue of ₹10,389 crore for FY2024-25 is audited and well above ₹5,000 crore, so revenue scale scores 20.",
          "Thermax Q4 FY2024-25 press release",
          "https://www.thermaxglobal.com/sites/default/files/2026-03/Press-Release-Thermax-Limited-Q4-FY-2024-25_0.pdf",
        ],
        [
          "Process heat, water, and steam equipment is core process and industrial equipment, so sector fit scores 15.",
          "Thermax digital annual report 2024-25, corporate overview",
          "https://www.thermaxglobal.com/annual-reports/digital-annual-report-2024-25/corporate-overview.html",
        ],
        [
          "The registered office and the corporate office are both in Pune, so Pune weight scores 10.",
          "Thermax digital annual report 2024-25, corporate overview",
          "https://www.thermaxglobal.com/annual-reports/digital-annual-report-2024-25/corporate-overview.html",
        ],
        [
          "The work is project execution with vendor SLAs and heavy documentation, which is a full process surface for workflow and RPA, so this scores 20.",
          "Thermax digital annual report 2024-25, corporate overview",
          "https://www.thermaxglobal.com/annual-reports/digital-annual-report-2024-25/corporate-overview.html",
        ],
        [
          "The MD, Group CFO, Chief Digital and Information Officer, and the president of industrial products are all named on the company leadership page, so the committee scores 15.",
          "Thermax executive council",
          "https://www.thermaxglobal.com/company-overview/leadership/executive-council",
        ],
        [
          "On the Q4 FY2025 call, Ashish Bhandari said the company is investing heavily on digital execution, so the public trigger scores 10.",
          "Thermax Q4 FY2025 results conference call",
          "https://www.thermaxglobal.com/sites/default/files/2025-10/Q4-FY2025-Results-Conference-Call.pdf",
        ],
        [
          "The annual report, the results press release, the leadership page, and the call transcript agree, so evidence quality scores 10.",
          "Thermax digital annual report 2024-25, corporate overview",
          "https://www.thermaxglobal.com/annual-reports/digital-annual-report-2024-25/corporate-overview.html",
        ],
      ],
    ),
    people: [
      person({
        name: "Ashish Bhandari",
        title: "Managing Director and Chief Executive Officer",
        buyingRole: "Economic buyer",
        why: "He runs the company and has put digital transformation, AI, and IIoT on the record. Budget for an on-prem workflow stack sits with this seat.",
        verify: "Confirm he is still MD before a meeting, and do not claim a named ERP.",
        evidenceGrade: "Company page",
        asOf: "Executive council page, with the digital-execution remark on the Q4 FY2025 call",
        sourceLabel: "Thermax executive council",
        sourceUrl:
          "https://www.thermaxglobal.com/company-overview/leadership/executive-council",
      }),
      person({
        name: "Rajendran Arunachalam",
        title: "EVP and Group CFO",
        buyingRole: "Economic buyer",
        why: "His brief covers finance, shared services, legal, EXIM, and enterprise risk. Shared services is a direct home for document workflow.",
        verify: "Re-read the next annual report before treating the title as current.",
        evidenceGrade: "Company page",
        asOf: "Executive council page",
        sourceLabel: "Thermax executive council",
        sourceUrl:
          "https://www.thermaxglobal.com/company-overview/leadership/executive-council",
      }),
      person({
        name: "Dr. Amit Sethi",
        title: "EVP and Chief Digital and Information Officer, since October 2022",
        buyingRole: "Technical buyer",
        why: "Industry 4.0, ERP, and SaaS are his published brief. He is the technical buyer for connectors into SAP, Oracle, or Microsoft 365.",
        verify: "The sources name the themes, not a product. Do not assert which ERP Thermax runs.",
        evidenceGrade: "Company page",
        asOf: "Executive council page; in role since October 2022",
        sourceLabel: "Thermax executive council",
        sourceUrl:
          "https://www.thermaxglobal.com/company-overview/leadership/executive-council",
      }),
      person({
        name: "B.C. Mahesh",
        title: "President, Industrial Products",
        buyingRole: "Process owner",
        why: "Process heat, water, and steam are the document-heavy project lines. He is the named operator of that book.",
        verify: "Confirm the title still reads President, Industrial Products.",
        evidenceGrade: "Company page",
        asOf: "Executive council page",
        sourceLabel: "Thermax executive council",
        sourceUrl:
          "https://www.thermaxglobal.com/company-overview/leadership/executive-council",
      }),
    ],
    checklist: [
      "Open the FY2024-25 corporate overview and the Q4 press release side by side before quoting ₹10,389 crore.",
      "Do not name an ERP, a plant system, or a personal email. None of those are in the sources.",
      "Re-check the executive council if the meeting is after October 2026.",
      "Use the Q4 FY2025 call for the digital-execution quote, not a profile page.",
    ],
  },
  {
    slug: "bharat-forge",
    name: "Bharat Forge",
    legalName: "Bharat Forge Limited",
    cin: "L25209PN1961PLC012046",
    website: "https://www.bharatforge.com/",
    location: "Registered office Mundhwa, Pune 411036.",
    whatTheyMake:
      "Forgings and heavy engineering for auto, industrial, and defence programmes.",
    revenueLabel:
      "₹15,123 crore consolidated revenue, FY2024-25 (standalone ₹8,844 crore)",
    revenueCrore: 15123,
    period: "FY2024-25",
    puneGate: "full",
    sectorGate: "core",
    revenueGate: "audited",
    ibxFit:
      "Multi-plant forging, defence programmes, and export documentation are the workflow surface. The company bio also describes an AI incubation lab led by the Joint MD.",
    factors: buildFactors(
      [20, 15, 10, 16, 11, 7, 9],
      [
        [
          "FY2024-25 consolidated revenue of ₹15,123 crore is audited and above ₹5,000 crore, so revenue scale scores 20. Standalone revenue was ₹8,844 crore.",
          "Bharat Forge annual report 2025",
          "https://www.bharatforge.com/AR2025/index.html",
        ],
        [
          "Forgings and heavy engineering are core capital goods, so sector fit scores 15.",
          "Bharat Forge annual report 2025",
          "https://www.bharatforge.com/AR2025/index.html",
        ],
        [
          "The registered office is at Mundhwa, Pune 411036, so Pune weight scores 10.",
          "Bharat Forge FY25 corporate information",
          "https://www.bharatforge.com/AR2025/pdf/corporate-information.pdf",
        ],
        [
          "Forging, defence programmes, and export paperwork are a real process surface, but this file does not show a project-SLA book as explicit as Thermax, so process scores 16.",
          "Bharat Forge annual report 2025",
          "https://www.bharatforge.com/AR2025/index.html",
        ],
        [
          "The Chairman and MD, the Joint MD, and the CFO are named. The FY25 corporate information does not name a CIO, so the committee scores 11 of 15.",
          "Bharat Forge FY25 corporate information",
          "https://www.bharatforge.com/AR2025/pdf/corporate-information.pdf",
        ],
        [
          "The company bio says the Joint MD set up an AI incubation lab and leads finance, M&A, and talent. That is a real trigger, but it is not a dated programme in the FY25 PDF, so the trigger scores 7.",
          "Amit B. Kalyani company biography",
          "https://www.bharatforge.com/company/amit-kalyani",
        ],
        [
          "The annual report and the corporate-information PDF are primary filings. A CIO name was left out because outside snippets conflict with a 2018 end date, so evidence scores 9.",
          "Bharat Forge FY25 corporate information",
          "https://www.bharatforge.com/AR2025/pdf/corporate-information.pdf",
        ],
      ],
    ),
    people: [
      person({
        name: "B.N. Kalyani",
        title: "Chairman and Managing Director",
        buyingRole: "Economic buyer",
        why: "He is the chairman and managing director on the FY25 corporate information. Economic approval sits here.",
        verify: "Confirm the chair is unchanged in the next annual report.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2024-25 corporate information",
        sourceLabel: "Bharat Forge FY25 corporate information",
        sourceUrl: "https://www.bharatforge.com/AR2025/pdf/corporate-information.pdf",
      }),
      person({
        name: "Amit B. Kalyani",
        title: "Vice-Chairman and Joint Managing Director",
        buyingRole: "Economic buyer",
        why: "The company bio says he leads finance, M&A, and talent, and that he set up an AI incubation lab. He can sponsor a digital pilot.",
        verify: "Treat the lab as a company-bio claim. Ask what it actually runs before proposing IB-X.",
        evidenceGrade: "Company page",
        asOf: "Company biography",
        sourceLabel: "Amit B. Kalyani company biography",
        sourceUrl: "https://www.bharatforge.com/company/amit-kalyani",
      }),
      person({
        name: "Kedar Dixit",
        title: "Chief Financial Officer",
        buyingRole: "Economic buyer",
        why: "The FY25 corporate information names him as CFO. Shared-services and finance workflow need this seat.",
        verify: "Confirm he is still CFO. The company secretary on the same PDF, Tejaswini Chaudhari, is a filing signatory, not a buyer.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2024-25 corporate information",
        sourceLabel: "Bharat Forge FY25 corporate information",
        sourceUrl: "https://www.bharatforge.com/AR2025/pdf/corporate-information.pdf",
      }),
      person({
        name: "Not named",
        title: "Chief Information Officer",
        buyingRole: "Role gap",
        why: "The FY25 corporate information does not name a CIO. A profile and an undated CMR piece that mention Yogesh Zope conflict with a 2018 end date, so he is not listed.",
        verify: "Ask the company who holds the CIO or CDIO seat. Do not fill it from a profile.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2024-25 corporate information",
        sourceLabel: "Bharat Forge FY25 corporate information",
        sourceUrl: "https://www.bharatforge.com/AR2025/pdf/corporate-information.pdf",
      }),
    ],
    checklist: [
      "Quote consolidated ₹15,123 crore and standalone ₹8,844 crore separately.",
      "Do not list Yogesh Zope as current CIO.",
      "Open the Amit Kalyani bio before describing the AI lab.",
      "CIN on the corporate information is L25209PN1961PLC012046.",
    ],
  },
  {
    slug: "cummins-india",
    name: "Cummins India",
    legalName: "Cummins India Limited",
    website: "https://www.cummins.com/",
    location: "Headquarters in Pune.",
    whatTheyMake:
      "Engines and power systems. FY26 call segments: power generation, distribution, industrial, and exports.",
    revenueLabel:
      "₹12,143.19 crore standalone and consolidated revenue from operations, FY2025-26. The results press release also states sales of ₹11,950 crore, up 18%.",
    revenueCrore: 12143.19,
    period: "FY2025-26",
    puneGate: "full",
    sectorGate: "core",
    revenueGate: "audited",
    ibxFit:
      "Manufacturing plus distribution and export paperwork. The MD chair is empty until 1 November 2026, so the first economic conversation is with the CFO.",
    factors: buildFactors(
      [20, 15, 10, 16, 9, 9, 10],
      [
        [
          "The FY2025-26 annual report states standalone and consolidated revenue from operations of ₹12,143.19 crore, above ₹5,000 crore, so revenue scale scores 20. The press release’s sales figure of ₹11,950 crore is the same year and also clears the line.",
          "Cummins India annual report 2025-26",
          "https://www.cummins.com/sites/default/files/india/Legal/cummins-india_annual-report_2025_26.pdf",
        ],
        [
          "Engines, power generation, and industrial equipment are core heavy equipment, so sector fit scores 15.",
          "Cummins India results press release",
          "https://www.cummins.com/sites/default/files/india/Legal/seintimationpressrelease.pdf",
        ],
        [
          "The company headquarters is in Pune, so Pune weight scores 10.",
          "Cummins India annual report 2025-26",
          "https://www.cummins.com/sites/default/files/india/Legal/cummins-india_annual-report_2025_26.pdf",
        ],
        [
          "Power generation, distribution, industrial, and exports are a manufacturing and paperwork surface, short of a named project-SLA book, so process scores 16.",
          "Cummins India results press release",
          "https://www.cummins.com/sites/default/files/india/Legal/seintimationpressrelease.pdf",
        ],
        [
          "The CFO is in seat and was confirmed at the 6 August 2026 AGM. The MD seat is vacant until 1 November 2026, and no CIO is corroborated in the annual report, so the committee scores 9.",
          "Cummins India 65th AGM transcript",
          "https://www.cummins.com/sites/default/files/india/Legal/cil-65th-agm-transcript.pdf",
        ],
        [
          "Shveta Arya resigned as MD effective 31 August 2026, and Gbile Adewunmi is appointed MD from 1 November 2026. That leadership change is a current trigger, so this scores 9.",
          "Cummins India board outcome, 5 August 2026",
          "https://www.cummins.com/sites/default/files/india/Legal/seintimationoutcome05082026final_0.pdf",
        ],
        [
          "Revenue, the CFO appointment, the AGM, the resignation, and the incoming MD are all exchange filings, so evidence quality scores 10.",
          "Cummins India annual report 2025-26",
          "https://www.cummins.com/sites/default/files/india/Legal/cummins-india_annual-report_2025_26.pdf",
        ],
      ],
    ),
    people: [
      person({
        name: "Soma Dilip Ghosh",
        title: "Chief Financial Officer, from 21 July 2025",
        buyingRole: "Economic buyer",
        why: "He is the sitting finance head while the MD chair is empty. A workflow proposal has to be intelligible to him first.",
        verify: "He was still CFO at the 6 August 2026 AGM. Re-check if the meeting is much later.",
        evidenceGrade: "Statutory filing",
        asOf: "Appointment 21 July 2025; AGM 6 August 2026",
        sourceLabel: "CFO appointment intimation, 21 July 2025",
        sourceUrl:
          "https://www.cummins.com/sites/default/files/india/Legal/signedseintimationcfo21072025final.pdf",
      }),
      person({
        name: "Shveta Arya",
        title: "Managing Director, resigned effective 31 August 2026",
        buyingRole: "Resigned",
        why: "She is not the current economic buyer. The resignation is why the MD seat is empty on 9 October 2026.",
        verify: "Do not book a meeting in her name.",
        evidenceGrade: "Statutory filing",
        asOf: "Board outcome 5 August 2026",
        sourceLabel: "Cummins India board outcome, 5 August 2026",
        sourceUrl:
          "https://www.cummins.com/sites/default/files/india/Legal/seintimationoutcome05082026final_0.pdf",
      }),
      person({
        name: "Adegbile Adedapo Adewunmi (Gbile Adewunmi)",
        title: "Additional Director and Managing Director from 1 November 2026, for three years",
        buyingRole: "Incoming economic buyer",
        why: "He becomes MD on 1 November 2026. On 9 October 2026 he is not yet in the seat, so he does not fill the committee score.",
        verify: "After 1 November 2026, confirm the appointment took effect before calling him MD.",
        evidenceGrade: "Statutory filing",
        asOf: "Board intimation 8 October 2026",
        sourceLabel: "Cummins India board intimation, 8 October 2026",
        sourceUrl:
          "https://www.cummins.com/sites/default/files/india/Legal/seintimationbm08102026.pdf",
      }),
      person({
        name: "Not named",
        title: "Chief Information Officer",
        buyingRole: "Role gap",
        why: "A profile snippet for Ashish Thakur was not corroborated in the annual report. He is omitted and scores nothing.",
        verify: "Do not add a CIO from a profile. Ask the company.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2025-26 annual report",
        sourceLabel: "Cummins India annual report 2025-26",
        sourceUrl:
          "https://www.cummins.com/sites/default/files/india/Legal/cummins-india_annual-report_2025_26.pdf",
      }),
    ],
    checklist: [
      "Score revenue from operations of ₹12,143.19 crore. Mention sales of ₹11,950 crore only as the press line.",
      "On 9 October 2026 the MD seat is vacant. Gbile Adewunmi starts 1 November 2026.",
      "Do not name Ashish Thakur.",
      "Segments to use in a first call: power generation, distribution, industrial, exports.",
    ],
  },
  {
    slug: "kirloskar-oil-engines",
    name: "Kirloskar Oil Engines",
    legalName: "Kirloskar Oil Engines Limited",
    website: "https://www.kirloskaroilengines.com/",
    location:
      "Registered office Laxmanrao Kirloskar Road, Khadki, Pune 411003. Factories include Pune.",
    whatTheyMake: "Engines, agri equipment, and gensets.",
    revenueLabel: "₹5,604 crore standalone net sales, FY2025-26",
    revenueCrore: 5604,
    period: "FY2025-26",
    puneGate: "full",
    sectorGate: "core",
    revenueGate: "audited",
    ibxFit:
      "Engine and genset manufacturing, with an agri-equipment line. No public CDIO was found, so the technical seat is a question, not a name.",
    factors: buildFactors(
      [20, 15, 10, 15, 11, 8, 9],
      [
        [
          "FY2025-26 standalone net sales of ₹5,604 crore are audited and above ₹5,000 crore, so revenue scale scores 20. FY2024-25 standalone net sales were ₹5,073 crore.",
          "KOEL annual report FY2025-26",
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
        ],
        [
          "Engines, agri equipment, and gensets are core heavy equipment, so sector fit scores 15.",
          "KOEL press release, 14 May 2025",
          "https://www.kirloskaroilengines.com/documents/541738/o/SE_PressRelease_14May2025.pdf/1a7a72c6-2db9-6859-64c2-0ed35587f6b0",
        ],
        [
          "The registered office is in Khadki, Pune, and factories include Pune, so Pune weight scores 10.",
          "KOEL annual report FY2025-26",
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
        ],
        [
          "Manufacturing of engines, agri equipment, and gensets is a solid plant surface, without a published project-SLA book in this file, so process scores 15.",
          "KOEL annual report FY2025-26",
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
        ],
        [
          "The FY26 report names the Managing Director, the Chairman, and the CFO. No public CDIO was found, so the committee scores 11.",
          "KOEL annual report FY2025-26",
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
        ],
        [
          "Gauri Kirloskar became Vice Chairperson and Rahul C. Kirloskar became Chairman with effect from 1 April 2026, so the leadership change scores 8.",
          "KOEL annual report FY2025-26",
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
        ],
        [
          "The FY26 annual report and the 14 May 2025 press release are primary. The missing CDIO is stated as a gap rather than filled, so evidence scores 9.",
          "KOEL annual report FY2025-26",
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
        ],
      ],
    ),
    people: [
      person({
        name: "Gauri Kirloskar",
        title: "Vice Chairperson with effect from 1 April 2026, and Managing Director",
        buyingRole: "Economic buyer",
        why: "She is Managing Director and, from 1 April 2026, Vice Chairperson. She was already MD when FY25 sales were announced.",
        verify: "Use the FY26 report for the vice-chair title. The May 2025 release is the earlier MD reference.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2025-26 annual report; MD also on the 14 May 2025 release",
        sourceLabel: "KOEL annual report FY2025-26",
        sourceUrl:
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
      }),
      person({
        name: "Rahul C. Kirloskar",
        title: "Chairman with effect from 1 April 2026",
        buyingRole: "Economic buyer",
        why: "He took the chair on 1 April 2026. Board sponsorship of a multi-year workflow programme runs through this seat.",
        verify: "Confirm the chair date against any filing after the FY26 report.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2025-26 annual report",
        sourceLabel: "KOEL annual report FY2025-26",
        sourceUrl:
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
      }),
      person({
        name: "Sachin Kejriwal",
        title: "Chief Financial Officer",
        buyingRole: "Economic buyer",
        why: "The FY26 report names him CFO. Finance has to live with any shared-services automation.",
        verify: "Confirm he is still CFO before a proposal.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2025-26 annual report",
        sourceLabel: "KOEL annual report FY2025-26",
        sourceUrl:
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
      }),
      person({
        name: "Not named",
        title: "Chief Digital and Information Officer",
        buyingRole: "Role gap",
        why: "No public CDIO was found in the FY26 report or the May 2025 release.",
        verify: "Ask who owns ERP and plant systems. Do not invent the name.",
        evidenceGrade: "Statutory filing",
        asOf: "FY2025-26 annual report",
        sourceLabel: "KOEL annual report FY2025-26",
        sourceUrl:
          "https://www.kirloskaroilengines.com/documents/d/oil-engines-ltd/annual-report_koel_fy-25-26",
      }),
    ],
    checklist: [
      "Quote FY26 standalone net sales of ₹5,604 crore. FY25 standalone net sales were ₹5,073 crore.",
      "Say plainly that no public CDIO was found.",
      "Registered office is Khadki, Pune 411003, and factories include Pune.",
    ],
  },
  {
    slug: "suzlon",
    name: "Suzlon",
    legalName: "Suzlon Energy Limited",
    website: "https://www.suzlon.com/",
    location:
      "Corporate and global headquarters: One Earth, Hadapsar, Pune 411028. Registered office: Ahmedabad.",
    whatTheyMake:
      "Wind turbine generators, a foundry and forging line, and a large operations-and-maintenance book.",
    revenueLabel:
      "₹16,679 crore audited consolidated revenue from operations, FY2025-26 (FY2024-25 ₹10,851 crore)",
    revenueCrore: 16679,
    period: "FY2025-26",
    puneGate: "full",
    sectorGate: "core",
    revenueGate: "audited",
    ibxFit:
      "Turbine manufacturing plus operations and maintenance of ₹2,483.85 crore in FY26: work orders, vendor follow-up, and SLAs. The registered office is in Ahmedabad, so say Pune corporate HQ, not Pune registered office.",
    factors: buildFactors(
      [20, 15, 8, 20, 12, 8, 10],
      [
        [
          "FY26 audited consolidated revenue from operations is ₹16,679 crore, above ₹5,000 crore, so revenue scale scores 20. FY25 was ₹10,851 crore.",
          "Suzlon Q4 FY26 results release",
          "https://www.suzlon.com/pdf/investor/financial-reports-presentations/2025-26/fourth-quarter/Q4FY26_Results_Release_FINAL.pdf",
        ],
        [
          "Wind turbine generators, foundry and forging, and operations and maintenance are core heavy equipment, so sector fit scores 15.",
          "Suzlon results for 31 March 2026",
          "https://www.suzlon.com/pdf/green-business/Results31march26.pdf",
        ],
        [
          "The corporate and global headquarters is One Earth, Hadapsar, Pune. The registered office is Ahmedabad, so Pune weight scores 8 rather than 10.",
          "Suzlon contact page",
          "https://www.suzlon.com/in-en/contact-us",
        ],
        [
          "FY26 segment revenue includes wind turbine generators of ₹14,040.19 crore and operations and maintenance of ₹2,483.85 crore. That service book is work orders and SLAs, so process scores 20.",
          "Suzlon results for 31 March 2026",
          "https://www.suzlon.com/pdf/green-business/Results31march26.pdf",
        ],
        [
          "The factsheet and the investor helpdesk name the Chairman and MD, the Executive Vice Chairman, the Group CEO, and the Group CFO. No CIO is named in the factsheet, so the committee scores 12.",
          "Suzlon factsheet, June 2026",
          "https://www.suzlon.com/uploads/Suzlon_Factsheet_June_2026_68389bc38e.pdf",
        ],
        [
          "Rahul Jain was appointed Group CFO with effect from 15 December 2025, so the leadership trigger scores 8.",
          "Suzlon investor helpdesk",
          "https://www.suzlon.com/investors/helpdesk/",
        ],
        [
          "The results release, the results PDF, the June 2026 factsheet, and the Pune helpdesk agree on the officers, so evidence quality scores 10.",
          "Suzlon Q4 FY26 results release",
          "https://www.suzlon.com/pdf/investor/financial-reports-presentations/2025-26/fourth-quarter/Q4FY26_Results_Release_FINAL.pdf",
        ],
      ],
    ),
    people: [
      person({
        name: "Vinod R. Tanti",
        title: "Chairman and Managing Director",
        buyingRole: "Economic buyer",
        why: "He is Chairman and MD, named at the Pune corporate office on the investor helpdesk.",
        verify: "Confirm the chair against the next results filing.",
        evidenceGrade: "Company page",
        asOf: "Investor helpdesk and June 2026 factsheet",
        sourceLabel: "Suzlon investor helpdesk",
        sourceUrl: "https://www.suzlon.com/investors/helpdesk/",
      }),
      person({
        name: "Girish R. Tanti",
        title: "Executive Vice Chairman",
        buyingRole: "Economic buyer",
        why: "He is the executive vice chairman on the same helpdesk and factsheet.",
        verify: "Confirm the title if the meeting is after the June 2026 factsheet.",
        evidenceGrade: "Company page",
        asOf: "June 2026 factsheet",
        sourceLabel: "Suzlon factsheet, June 2026",
        sourceUrl:
          "https://www.suzlon.com/uploads/Suzlon_Factsheet_June_2026_68389bc38e.pdf",
      }),
      person({
        name: "Ajay Kapur",
        title: "Group Chief Executive Officer",
        buyingRole: "Economic buyer",
        why: "Group CEO is the operating sponsor for a service-book workflow across manufacturing and maintenance.",
        verify: "Confirm he is still Group CEO.",
        evidenceGrade: "Company page",
        asOf: "June 2026 factsheet",
        sourceLabel: "Suzlon factsheet, June 2026",
        sourceUrl:
          "https://www.suzlon.com/uploads/Suzlon_Factsheet_June_2026_68389bc38e.pdf",
      }),
      person({
        name: "Rahul Jain",
        title: "Group Chief Financial Officer, appointed with effect from 15 December 2025",
        buyingRole: "Economic buyer",
        why: "A new Group CFO owns the case for service-margin and vendor-cost workflow.",
        verify: "The appointment date is 15 December 2025. Confirm he is still in seat.",
        evidenceGrade: "Company page",
        asOf: "Investor helpdesk",
        sourceLabel: "Suzlon investor helpdesk",
        sourceUrl: "https://www.suzlon.com/investors/helpdesk/",
      }),
      person({
        name: "Not named",
        title: "Chief Information Officer",
        buyingRole: "Role gap",
        why: "The June 2026 factsheet does not name a CIO.",
        verify: "Ask who owns turbine and service systems. Do not fill the gap from a profile.",
        evidenceGrade: "Company page",
        asOf: "June 2026 factsheet",
        sourceLabel: "Suzlon factsheet, June 2026",
        sourceUrl:
          "https://www.suzlon.com/uploads/Suzlon_Factsheet_June_2026_68389bc38e.pdf",
      }),
    ],
    checklist: [
      "Say corporate HQ Pune and registered office Ahmedabad in the same breath.",
      "FY26 segments: wind turbine generators ₹14,040.19 crore, foundry and forging ₹596.49 crore, operations and maintenance ₹2,483.85 crore.",
      "No CIO is named in the factsheet.",
      "Foundry and forging is part of Suzlon. Do not merge this file with Bharat Forge.",
    ],
  },
  {
    slug: "kirloskar-brothers",
    name: "Kirloskar Brothers",
    legalName: "Kirloskar Brothers Limited",
    website: "https://www.kirloskarpumps.com/",
    location:
      "The FY25 investor release is datelined Pune, 14 May 2025. This file does not invent a street address.",
    whatTheyMake: "Pumps and fluid-management projects.",
    revenueLabel:
      "₹4,492 crore consolidated revenue from operations, FY2024-25. FY2025-26 was not verified.",
    revenueCrore: 4492,
    period: "FY2024-25",
    puneGate: "full",
    sectorGate: "process",
    revenueGate: "audited",
    ibxFit:
      "Pump and fluid-management projects produce vendor files, site reports, and handover packs. The Pune gate rests on a Pune dateline, not a street address copied from the release.",
    factors: buildFactors(
      [16, 15, 7, 17, 11, 7, 8],
      [
        [
          "FY25 consolidated revenue from operations is ₹4,492 crore, audited and between ₹1,000 crore and ₹5,000 crore, so revenue scale scores 16. FY26 is not in this file.",
          "Kirloskar Brothers investor release, 14 May 2025",
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/IntimationInvestorRelease.pdf",
        ],
        [
          "Pumps and fluid-management projects are process and industrial equipment, so sector fit scores 15.",
          "Kirloskar Brothers Q4 FY25 call transcript",
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/Kirloskar-Brothers-Limited-Q4FY25-Transcript.pdf",
        ],
        [
          "The release is datelined Pune and no street address was taken from it, so Pune weight scores 7. Presence is not none.",
          "Kirloskar Brothers investor release, 14 May 2025",
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/IntimationInvestorRelease.pdf",
        ],
        [
          "Fluid-management projects are a document and vendor surface close to a full project book, so process scores 17.",
          "Kirloskar Brothers Q4 FY25 call transcript",
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/Kirloskar-Brothers-Limited-Q4FY25-Transcript.pdf",
        ],
        [
          "The Chairman and MD, the Joint MD, and the CFO are named. No CDIO is named, so the committee scores 11.",
          "Kirloskar Brothers board report 2025",
          "https://www.kirloskarpumps.com/virtual-annual-report-2025/pdf/Board's%20Report.pdf",
        ],
        [
          "Sanjay C. Kirloskar was reappointed Chairman and MD with effect from 19 November 2025, so the trigger scores 7.",
          "Kirloskar Brothers board report 2025",
          "https://www.kirloskarpumps.com/virtual-annual-report-2025/pdf/Board's%20Report.pdf",
        ],
        [
          "The investor release, the call, and the board report are primary, but FY26 revenue is unverified, so evidence scores 8.",
          "Kirloskar Brothers investor release, 14 May 2025",
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/IntimationInvestorRelease.pdf",
        ],
      ],
    ),
    people: [
      person({
        name: "Sanjay C. Kirloskar",
        title: "Chairman and Managing Director, reappointed with effect from 19 November 2025",
        buyingRole: "Economic buyer",
        why: "He is Chairman and MD. Project-business investment needs this seat.",
        verify: "The reappointment date is 19 November 2025, from the board report. Confirm it is still current.",
        evidenceGrade: "Statutory filing",
        asOf: "Board report 2025",
        sourceLabel: "Kirloskar Brothers board report 2025",
        sourceUrl:
          "https://www.kirloskarpumps.com/virtual-annual-report-2025/pdf/Board's%20Report.pdf",
      }),
      person({
        name: "Rama Kirloskar",
        title: "Joint Managing Director",
        buyingRole: "Economic buyer",
        why: "Joint MD is the second economic seat on the India business.",
        verify: "Confirm the title in a filing later than the FY25 board report.",
        evidenceGrade: "Statutory filing",
        asOf: "Board report 2025",
        sourceLabel: "Kirloskar Brothers board report 2025",
        sourceUrl:
          "https://www.kirloskarpumps.com/virtual-annual-report-2025/pdf/Board's%20Report.pdf",
      }),
      person({
        name: "Bhavesh Chheda",
        title: "Chief Financial Officer",
        buyingRole: "Economic buyer",
        why: "He is named as CFO on the Q4 FY25 call. Project cash and vendor terms sit with finance.",
        verify: "The name is from the call, not a separate appointment intimation in this file. Re-check.",
        evidenceGrade: "Statutory filing",
        asOf: "Q4 FY25 call, May 2025",
        sourceLabel: "Kirloskar Brothers Q4 FY25 call transcript",
        sourceUrl:
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/Kirloskar-Brothers-Limited-Q4FY25-Transcript.pdf",
      }),
      person({
        name: "Alok Kirloskar",
        title: "Managing Director, Kirloskar Brothers International BV",
        buyingRole: "Process owner",
        why: "He runs the international subsidiary, which matters for export projects. He is not a substitute for an India plant or IT owner.",
        verify: "Do not describe him as MD of the Indian listed company.",
        evidenceGrade: "Statutory filing",
        asOf: "Q4 FY25 call",
        sourceLabel: "Kirloskar Brothers Q4 FY25 call transcript",
        sourceUrl:
          "https://www.kirloskarpumps.com/wp-content/uploads/2025/05/Kirloskar-Brothers-Limited-Q4FY25-Transcript.pdf",
      }),
    ],
    checklist: [
      "Label the revenue FY2024-25. FY2025-26 was not verified.",
      "Do not invent a street address. The release is datelined Pune.",
      "Keep Kirloskar Brothers distinct from Kirloskar Oil Engines.",
      "No CDIO is named.",
    ],
  },
  {
    slug: "praj",
    name: "Praj",
    legalName: "Praj Industries Limited",
    website: "https://www.praj.net/",
    location:
      "The FY25 results release is datelined Pune, 29 April 2025. This file does not invent a street address.",
    whatTheyMake:
      "Process plants and critical equipment for bioenergy, breweries, and zero-liquid-discharge.",
    revenueLabel:
      "₹3,228.04 crore consolidated income from operations, FY2024-25 (₹32,280.422 million)",
    revenueCrore: 3228.04,
    period: "FY2024-25",
    puneGate: "full",
    sectorGate: "process",
    revenueGate: "audited",
    ibxFit:
      "Process-plant projects are document-heavy: design packs, vendor follow-up, and commissioning files. Leadership below is as of the 11 August 2025 AGM and must be re-checked.",
    factors: buildFactors(
      [16, 15, 7, 18, 11, 8, 8],
      [
        [
          "FY25 consolidated income from operations is ₹32,280.422 million, which is ₹3,228.04 crore, between ₹1,000 crore and ₹5,000 crore, so revenue scale scores 16.",
          "Praj Q4 FY25 results release",
          "https://www.praj.net/wp-content/uploads/2025/04/Praj-Q4-FY25-Results-Release.pdf",
        ],
        [
          "Bioenergy, brewery, and zero-liquid-discharge plants are process equipment, so sector fit scores 15.",
          "Praj Q4 FY25 results release",
          "https://www.praj.net/wp-content/uploads/2025/04/Praj-Q4-FY25-Results-Release.pdf",
        ],
        [
          "The results release is datelined Pune and no street address was taken from it, so Pune weight scores 7. Presence is not none.",
          "Praj Q4 FY25 results release",
          "https://www.praj.net/wp-content/uploads/2025/04/Praj-Q4-FY25-Results-Release.pdf",
        ],
        [
          "Turnkey process plants and critical equipment create a project-file surface close to the top of the scale, so process scores 18.",
          "Praj 39th AGM transcript, 11 August 2025",
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
        ],
        [
          "As of the August 2025 AGM the Chairman, Managing Director, and CFO are named. No CDIO is named, and a later filing was not opened, so the committee scores 11.",
          "Praj 39th AGM transcript, 11 August 2025",
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
        ],
        [
          "Shishir Joshipura was CEO and MD on the 29 April 2025 release, and Ashish Gaikwad is Managing Director on the 11 August 2025 AGM transcript, so the change scores 8.",
          "Praj 39th AGM transcript, 11 August 2025",
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
        ],
        [
          "The results release and the AGM transcript are primary, but leadership is only as of August 2025, so evidence scores 8.",
          "Praj 39th AGM transcript, 11 August 2025",
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
        ],
      ],
    ),
    people: [
      person({
        name: "Dr. Pramod Chaudhari",
        title: "Chairman",
        buyingRole: "Economic buyer",
        why: "He is Chairman on the 11 August 2025 AGM transcript.",
        verify: "Re-check a filing after August 2025 before using this as current.",
        evidenceGrade: "Statutory filing",
        asOf: "AGM 11 August 2025",
        sourceLabel: "Praj 39th AGM transcript",
        sourceUrl:
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
      }),
      person({
        name: "Ashish Gaikwad",
        title: "Managing Director",
        buyingRole: "Economic buyer",
        why: "The August 2025 AGM transcript lists him as Managing Director. He is the operating economic buyer as of that date.",
        verify: "This replaced Shishir Joshipura, who was CEO and MD on 29 April 2025. Open a later filing.",
        evidenceGrade: "Statutory filing",
        asOf: "AGM 11 August 2025",
        sourceLabel: "Praj 39th AGM transcript",
        sourceUrl:
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
      }),
      person({
        name: "Sachin Raole",
        title: "CFO and Director-Resources",
        buyingRole: "Economic buyer",
        why: "Finance and resources are named together on the AGM transcript. That is the shared-services seat.",
        verify: "Re-check the title against a post-August 2025 filing.",
        evidenceGrade: "Statutory filing",
        asOf: "AGM 11 August 2025",
        sourceLabel: "Praj 39th AGM transcript",
        sourceUrl:
          "https://www.praj.net/wp-content/uploads/2025/09/Transcript-of-39th-AGM-11.08.2025.pdf",
      }),
      person({
        name: "Shishir Joshipura",
        title: "Chief Executive Officer and Managing Director as of 29 April 2025",
        buyingRole: "Resigned",
        why: "He was CEO and MD on the FY25 results date. The August 2025 AGM names a different Managing Director. Do not use him as the current buyer.",
        verify: "Treat this as prior. Confirm the transition in a later filing if a precise end date is needed.",
        evidenceGrade: "Statutory filing",
        asOf: "Results release 29 April 2025",
        sourceLabel: "Praj Q4 FY25 results release",
        sourceUrl:
          "https://www.praj.net/wp-content/uploads/2025/04/Praj-Q4-FY25-Results-Release.pdf",
      }),
    ],
    checklist: [
      "State leadership as of the 11 August 2025 AGM, and tell the reader to open a later filing.",
      "Keep the unit straight: ₹32,280.422 million is ₹3,228.04 crore.",
      "Do not invent a street address.",
      "No CDIO is named.",
    ],
  },
  {
    slug: "alfa-laval-india",
    name: "Alfa Laval India",
    legalName: "Alfa Laval India Private Limited",
    cin: "U29299PN1937PTC002732",
    website: "https://www.alfalaval.com/",
    location:
      "Aggregators give the registered office as Mumbai-Pune Road, Dapodi, Pune 411012. Confirm that on MCA. CRISIL was used for revenue, not for the address.",
    whatTheyMake:
      "Process technology (turnkey plants) and equipment such as separators and heat exchangers.",
    revenueLabel:
      "₹2,212 crore in fiscal 2025, cited by CRISIL on 20 March 2026. Nine-month FY26 revenue ₹1,960 crore. This file did not open the company’s own annual report.",
    revenueCrore: 2212,
    period: "Fiscal 2025, rating rationale 20 March 2026",
    puneGate: "full",
    sectorGate: "process",
    revenueGate: "rating",
    ibxFit:
      "Turnkey plants and an unexecuted order book of about ₹1,800 crore as of December 2025 are a project surface. The MD is medium-grade only, so this stays on Verify.",
    factors: buildFactors(
      [14, 15, 8, 17, 6, 7, 6],
      [
        [
          "CRISIL cites revenue of ₹2,212 crore in fiscal 2025. That would score 16 if it were the company’s own annual report. It is a rating rationale, so the factor scores 14 and the audited-revenue gate stays shut.",
          "CRISIL rating rationale, 20 March 2026",
          "https://www.crisilratings.com/mnt/winshare/Ratings/RatingList/RatingDocs/AlfaLavalIndiaPrivateLimited_March%2020_%202026_RR_389596.html",
        ],
        [
          "Turnkey process plants, separators, and heat exchangers are process equipment, so sector fit scores 15.",
          "CRISIL rating rationale, 20 March 2026",
          "https://www.crisilratings.com/mnt/winshare/Ratings/RatingList/RatingDocs/AlfaLavalIndiaPrivateLimited_March%2020_%202026_RR_389596.html",
        ],
        [
          "The CIN is a Pune registration and aggregators state a Dapodi registered office. That is not the CRISIL document, so Pune weight scores 8.",
          "The Company Check, Alfa Laval India",
          "https://www.thecompanycheck.com/company/alfa-laval-india-private-limited/U29299PN1937PTC002732",
        ],
        [
          "CRISIL describes turnkey plants and an unexecuted order book of about ₹1,800 crore as of December 2025, so process scores 17.",
          "CRISIL rating rationale, 20 March 2026",
          "https://www.crisilratings.com/mnt/winshare/Ratings/RatingList/RatingDocs/AlfaLavalIndiaPrivateLimited_March%2020_%202026_RR_389596.html",
        ],
        [
          "Subhasis Das is named Managing Director on aggregators and The Org. CRISIL does not name him. That is not a full committee, so this scores 6.",
          "The Org profile of Subhasis Das",
          "https://theorg.com/org/alfa-laval/org-chart/subhasis-das",
        ],
        [
          "CRISIL also cites nine-month FY26 revenue of ₹1,960 crore and the December 2025 order book, so the public trigger scores 7.",
          "CRISIL rating rationale, 20 March 2026",
          "https://www.crisilratings.com/mnt/winshare/Ratings/RatingList/RatingDocs/AlfaLavalIndiaPrivateLimited_March%2020_%202026_RR_389596.html",
        ],
        [
          "A rating rationale plus aggregators is medium evidence. The company’s annual report was not opened, so evidence quality scores 6.",
          "CRISIL rating rationale, 20 March 2026",
          "https://www.crisilratings.com/mnt/winshare/Ratings/RatingList/RatingDocs/AlfaLavalIndiaPrivateLimited_March%2020_%202026_RR_389596.html",
        ],
      ],
    ),
    people: [
      person({
        name: "Subhasis Das",
        title: "Managing Director, as stated by aggregators and The Org",
        buyingRole: "Economic buyer",
        why: "The Org calls him Cluster President and Managing Director, India. A 2020 press release announced the MD appointment from 1 December 2020. CRISIL’s 2026 rationale does not name him, so he does not receive full committee points.",
        verify: "Open an MCA director list or a company filing before using the title in a letter.",
        evidenceGrade: "Aggregator",
        asOf: "The Org profile; appointment press release 10 December 2020; CRISIL 20 March 2026 is silent on the name",
        sourceLabel: "The Org profile of Subhasis Das",
        sourceUrl: "https://theorg.com/org/alfa-laval/org-chart/subhasis-das",
      }),
    ],
    checklist: [
      "Do not treat ₹2,212 crore as qualified audited revenue until the company’s own financial statements are opened.",
      "CIN U29299PN1937PTC002732. Confirm the Dapodi address on MCA.",
      "CRISIL: nine-month FY26 revenue ₹1,960 crore; unexecuted order book about ₹1,800 crore as of December 2025.",
      "Do not give the MD full committee points.",
    ],
  },
  {
    slug: "sany-india",
    name: "SANY India",
    legalName: "SANY Heavy Industry India Pvt Ltd",
    cin: "U45201PN2002PTC181239",
    website: "https://www.sany.in/",
    location:
      "Plot E-4, Chakan Industrial Area Phase III, Taluka Khed, Pune 410501.",
    whatTheyMake:
      "Construction and mining equipment, built at the Chakan plant.",
    revenueLabel:
      "Not scored. A CEO Magazine interview claims revenue of almost US$1 billion and does not state a fiscal year. This file does not convert that into crore.",
    revenueCrore: null,
    period: "Not established",
    puneGate: "full",
    sectorGate: "core",
    revenueGate: "unverified",
    holdReason:
      "Revenue is not audited in this file. Open MCA Form AOC-4 before treating the account as qualified.",
    ibxFit:
      "The Chakan plant is a real heavy-equipment site. The account still waits, because the revenue gate fails.",
    factors: buildFactors(
      [0, 15, 10, 12, 6, 3, 3],
      [
        [
          "The only revenue sentence in this file is an undated ‘almost US$1 billion’ claim. It is not converted and it scores 0.",
          "CEO Magazine interview with Deepak Garg",
          "https://www.theceomagazine.com/executive-interviews/manufacturing/deepak-garg-2/",
        ],
        [
          "Excavators, cranes, concrete equipment, and related construction machinery are core heavy equipment, so sector fit scores 15.",
          "SANY India",
          "https://www.sany.in/",
        ],
        [
          "The company contact page states the Chakan plant address and the CIN, so Pune weight scores 10.",
          "SANY India contact page",
          "https://www.sany.in/contact-us/",
        ],
        [
          "The plant and the product lines are described. A workflow or SLA map is not, so process scores 12.",
          "SANY India",
          "https://www.sany.in/",
        ],
        [
          "Deepak Garg is Vice Chairman and Managing Director on the company leadership page. No CFO or CIO is named in this file, so the committee scores 6.",
          "SANY India leadership",
          "https://www.sany.in/leadership/",
        ],
        [
          "The interview is not a dated investment or leadership filing, so the public trigger scores 3.",
          "CEO Magazine interview with Deepak Garg",
          "https://www.theceomagazine.com/executive-interviews/manufacturing/deepak-garg-2/",
        ],
        [
          "The plant page is a company source. The revenue claim is not a filing, so evidence quality scores 3.",
          "SANY India contact page",
          "https://www.sany.in/contact-us/",
        ],
      ],
    ),
    people: [
      person({
        name: "Deepak Garg",
        title: "Vice Chairman and Managing Director",
        buyingRole: "Economic buyer",
        why: "The company leadership page names him Vice Chairman and MD. He is the only buyer in this file, and the revenue gap blocks qualification.",
        verify: "Open AOC-4 before a pursuit. Do not quote the US-dollar claim as Indian revenue.",
        evidenceGrade: "Company page",
        asOf: "SANY India leadership page",
        sourceLabel: "SANY India leadership",
        sourceUrl: "https://www.sany.in/leadership/",
      }),
    ],
    checklist: [
      "Open MCA AOC-4 for CIN U45201PN2002PTC181239 before any revenue is treated as qualified.",
      "Do not convert ‘almost US$1 billion’ into crore.",
      "The Chakan address is on the company contact page. Do not add a phone number or a mailbox from that page to this desk.",
    ],
  },
  {
    slug: "jcb-india",
    name: "JCB India",
    legalName: "JCB India Limited",
    cin: "U74899DL1979PLC009431",
    website: "https://www.jcb.com/",
    location:
      "Registered office New Delhi. Pune, in this file, is a global engineering centre only. Do not claim a Pune factory.",
    whatTheyMake: "Construction equipment.",
    revenueLabel:
      "Not an exact figure. Tofler shows an operating-revenue range of ‘Over INR 500 cr’ for the year ended 31 March 2025.",
    revenueCrore: null,
    period: "Year ended 31 March 2025, band only",
    puneGate: "partial",
    sectorGate: "core",
    revenueGate: "band",
    ibxFit:
      "ET Realty reports ₹200–250 crore earmarked for tooling, R&D, and digital innovation, and a plan to grow the Pune engineering centre from 700 to 1,000 people. That is a partial Pune gate and a band-only revenue gate.",
    factors: buildFactors(
      [6, 15, 4, 12, 7, 9, 5],
      [
        [
          "The only revenue statement is a band, ‘Over INR 500 cr’, so the factor scores 6 and the account is not qualified on revenue.",
          "Tofler, JCB India Limited",
          "https://www.tofler.in/jcb-india-limited/company/U74899DL1979PLC009431",
        ],
        [
          "Construction equipment is core heavy equipment, so sector fit scores 15.",
          "ET Realty, 2025 interview with Deepak Shetty",
          "https://realty.economictimes.indiatimes.com/news/allied-industries/jcb-india-forecasts-strong-growth-amid-infrastructure-demand-in-fy26/121494710",
        ],
        [
          "Pune is an engineering centre in the ET report, not a factory, and the registered office is New Delhi, so Pune weight scores 4.",
          "ET Realty, 2025 interview with Deepak Shetty",
          "https://realty.economictimes.indiatimes.com/news/allied-industries/jcb-india-forecasts-strong-growth-amid-infrastructure-demand-in-fy26/121494710",
        ],
        [
          "The same interview describes tooling, R&D, and digital innovation spend, not a plant workflow map, so process scores 12.",
          "ET Realty, 2025 interview with Deepak Shetty",
          "https://realty.economictimes.indiatimes.com/news/allied-industries/jcb-india-forecasts-strong-growth-amid-infrastructure-demand-in-fy26/121494710",
        ],
        [
          "Tofler names Deepak Jagannath Shetty as MD and Sunil Khurana as whole-time director. No CFO or CIO is in this file, so the committee scores 7.",
          "Tofler, JCB India Limited",
          "https://www.tofler.in/jcb-india-limited/company/U74899DL1979PLC009431",
        ],
        [
          "The interview says FY25 growth was 11 percent, ₹500 crore was invested in FY25, and ₹200–250 crore is earmarked for tooling, R&D, and digital innovation, so the trigger scores 9.",
          "ET Realty, 2025 interview with Deepak Shetty",
          "https://realty.economictimes.indiatimes.com/news/allied-industries/jcb-india-forecasts-strong-growth-amid-infrastructure-demand-in-fy26/121494710",
        ],
        [
          "A registrar band plus one press interview is not an annual report, so evidence quality scores 5.",
          "Tofler, JCB India Limited",
          "https://www.tofler.in/jcb-india-limited/company/U74899DL1979PLC009431",
        ],
      ],
    ),
    people: [
      person({
        name: "Deepak Jagannath Shetty",
        title: "Managing Director on Tofler; CEO and MD in the ET Realty interview",
        buyingRole: "Economic buyer",
        why: "He is the named MD, and he is the person quoted on the engineering-centre and digital-innovation plan.",
        verify: "DIN on Tofler is 08857174. Confirm the title against a filing, and do not treat the revenue band as an exact number.",
        evidenceGrade: "Press",
        asOf: "Tofler for the year ended 31 March 2025; ET Realty interview",
        sourceLabel: "Tofler, JCB India Limited",
        sourceUrl:
          "https://www.tofler.in/jcb-india-limited/company/U74899DL1979PLC009431",
      }),
      person({
        name: "Sunil Khurana",
        title: "Whole-time director",
        buyingRole: "Economic buyer",
        why: "Tofler lists him as whole-time director. The file does not give him an operating brief.",
        verify: "Ask what he runs before assigning a process role.",
        evidenceGrade: "Aggregator",
        asOf: "Tofler",
        sourceLabel: "Tofler, JCB India Limited",
        sourceUrl:
          "https://www.tofler.in/jcb-india-limited/company/U74899DL1979PLC009431",
      }),
    ],
    checklist: [
      "Do not claim an exact revenue. The Tofler range is ‘Over INR 500 cr’.",
      "Do not claim a Pune factory. The Pune fact is an engineering centre, with headcount planned from 700 to 1,000.",
      "Registered office is New Delhi. CIN U74899DL1979PLC009431.",
      "₹500 crore invested in FY25, and ₹200–250 crore earmarked for tooling, R&D, and digital innovation, are interview figures. Open a filing before quoting them in a proposal.",
    ],
  },
  {
    slug: "john-deere-india",
    name: "John Deere India",
    legalName: "John Deere India Private Limited",
    cin: "U74220PN1997PTC112441",
    website: "https://www.deere.co.in/",
    location:
      "Aggregators give the registered office as Tower XIV, Cybercity, Magarpatta City, Hadapsar, Pune 411013. Confirm on MCA.",
    whatTheyMake:
      "John Deere’s Indian equipment company. This file does not describe a factory workflow, and it does not mix in the NBFC.",
    revenueLabel:
      "Not scored. Secondary summaries conflict, and no annual report or AOC-4 was read.",
    revenueCrore: null,
    period: "Not established",
    puneGate: "full",
    sectorGate: "core",
    revenueGate: "conflict",
    holdReason:
      "Rupee revenue was not scored. Read AOC-4. Keep John Deere Financial India, a different NBFC, out of this account.",
    ibxFit:
      "Sector and a Pune registered office are not enough. The revenue gate fails, so the account is Hold.",
    factors: buildFactors(
      [0, 15, 8, 8, 5, 4, 3],
      [
        [
          "Revenue summaries disagree and none of them is an annual report opened for this file, so revenue scale scores 0.",
          "The Company Check, John Deere India Private Limited",
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
        ],
        [
          "John Deere’s equipment business is core agri and construction machinery, so sector fit scores 15. The group’s Indian NBFC is a different company and is not this score.",
          "John Deere India financing page, for the entity split",
          "https://www.deere.co.in/en/finance/financing/",
        ],
        [
          "Aggregators place the registered office in Magarpatta, Pune. That is not a filing opened here, so Pune weight scores 8.",
          "The Company Check, John Deere India Private Limited",
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
        ],
        [
          "This file has a registered office and an MD appointment. It does not have a plant or service workflow, so process scores 8.",
          "The Company Check, John Deere India Private Limited",
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
        ],
        [
          "The Company Check lists Rajesh Kumar Sinha as MD, appointed 15 October 2024. That is one aggregator name, so the committee scores 5.",
          "The Company Check, John Deere India Private Limited",
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
        ],
        [
          "The MD appointment of 15 October 2024 is more than a year before this file date, and it is not a fresh operating trigger, so the trigger scores 4.",
          "The Company Check, John Deere India Private Limited",
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
        ],
        [
          "Identity comes from an aggregator, and revenue tables elsewhere conflict, so evidence quality scores 3.",
          "The Company Check, John Deere India Private Limited",
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
        ],
      ],
    ),
    people: [
      person({
        name: "Rajesh Kumar Sinha",
        title: "Managing Director, appointed 15 October 2024",
        buyingRole: "Economic buyer",
        why: "The Company Check lists him as MD of John Deere India Private Limited. The revenue gate still fails, so the name does not qualify the account.",
        verify: "Confirm the appointment on MCA. Do not build a committee from this one aggregator row.",
        evidenceGrade: "Aggregator",
        asOf: "The Company Check, appointment 15 October 2024",
        sourceLabel: "The Company Check, John Deere India Private Limited",
        sourceUrl:
          "https://www.thecompanycheck.com/company/john-deere-india-private-limited/U74220PN1997PTC112441",
      }),
      person({
        name: "Abhay Dhokte",
        title: "Managing Director, John Deere Financial India Private Limited",
        buyingRole: "Different legal entity",
        why: "John Deere’s own financing page describes John Deere Financial India as an NBFC. He is that company’s MD on the investor page. He is not the MD of the equipment company in this dossier.",
        verify: "Do not mix CIN U65923PN2011PTC141149 with CIN U74220PN1997PTC112441.",
        evidenceGrade: "Company page",
        asOf: "John Deere India investor-information page",
        sourceLabel: "John Deere India investor information",
        sourceUrl: "https://www.deere.co.in/en/investor-information/",
      }),
    ],
    checklist: [
      "Do not score a rupee revenue until AOC-4 is read.",
      "CIN of this account is U74220PN1997PTC112441.",
      "John Deere Financial India is a different NBFC. Abhay Dhokte belongs to that entity.",
      "The Magarpatta address is from aggregators. Confirm it on MCA.",
    ],
  },
  {
    slug: "honeywell-automation-india",
    name: "Honeywell Automation India",
    legalName: "Honeywell Automation India Limited",
    website: "https://www.honeywell.com/",
    location: "Registered office Hadapsar Industrial Estate, Pune 411013.",
    whatTheyMake:
      "Industrial and building automation. This is a competitor-adjacent file, not a customer pursuit.",
    revenueLabel: "₹4,189.6 crore revenue from operations, FY2024-25 (₹41,896 million)",
    revenueCrore: 4189.6,
    period: "FY2024-25",
    puneGate: "full",
    sectorGate: "competitor",
    revenueGate: "audited",
    holdReason:
      "They sell industrial and building automation. Hold as a competitor. A partner conversation is the only use of this file, and titles should be re-checked against a post-FY25 filing.",
    ibxFit:
      "IB-X would sit in the same plants Honeywell Automation already sells into. Do not pursue them as a customer.",
    factors: buildFactors(
      [16, 4, 10, 4, 11, 5, 9],
      [
        [
          "FY2024-25 revenue from operations is ₹4,189.6 crore, between ₹1,000 crore and ₹5,000 crore, so revenue scale scores 16. The competitor penalty is applied after the factor sum.",
          "Honeywell Automation India annual report 2024-25",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/financials/annual-reports/hon-corp-hail-annual-report-2024-25.pdf",
        ],
        [
          "They sell industrial and building automation rather than heavy equipment, so sector fit scores 4.",
          "Honeywell Automation India annual report 2024-25",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/financials/annual-reports/hon-corp-hail-annual-report-2024-25.pdf",
        ],
        [
          "The registered office is Hadapsar Industrial Estate, Pune 411013, so Pune weight scores 10.",
          "Honeywell Automation India annual report 2024-25",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/financials/annual-reports/hon-corp-hail-annual-report-2024-25.pdf",
        ],
        [
          "The process surface for buying IB-X is low because they are the automation vendor, so process scores 4.",
          "Honeywell Automation India annual report 2024-25",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/financials/annual-reports/hon-corp-hail-annual-report-2024-25.pdf",
        ],
        [
          "The 27 June 2025 AGM proceedings name the MD and the CFO. That would be a strong committee at a customer. Here it scores 11, and then the competitor penalty applies.",
          "Honeywell Automation India 41st AGM proceedings, 27 June 2025",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/agm-egm-postal-ballot/hon-corp-stock-exchange-intimation-proceedings-of-41st-agm-27062025.pdf",
        ],
        [
          "The latest governance event in this file is the 27 June 2025 AGM, with no customer-side digital trigger, so the trigger scores 5.",
          "Honeywell Automation India 41st AGM proceedings, 27 June 2025",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/agm-egm-postal-ballot/hon-corp-stock-exchange-intimation-proceedings-of-41st-agm-27062025.pdf",
        ],
        [
          "The annual report and the AGM proceedings are primary filings, so evidence quality scores 9. Titles should still be re-checked after FY25.",
          "Honeywell Automation India annual report 2024-25",
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/financials/annual-reports/hon-corp-hail-annual-report-2024-25.pdf",
        ],
      ],
    ),
    people: [
      person({
        name: "Atul Vinayak Pai",
        title: "Managing Director",
        buyingRole: "Economic buyer",
        why: "He is MD in the FY2024-25 annual report and at the 27 June 2025 AGM. The use of the name is a partner map, not a pursuit.",
        verify: "Re-check the title against a filing after FY2024-25.",
        evidenceGrade: "Statutory filing",
        asOf: "AGM 27 June 2025",
        sourceLabel: "Honeywell Automation India 41st AGM proceedings",
        sourceUrl:
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/agm-egm-postal-ballot/hon-corp-stock-exchange-intimation-proceedings-of-41st-agm-27062025.pdf",
      }),
      person({
        name: "Pulkit Goyal",
        title: "Chief Financial Officer",
        buyingRole: "Economic buyer",
        why: "He is CFO at the 27 June 2025 AGM. Same limit: partner context only.",
        verify: "Re-check the title against a post-FY25 filing.",
        evidenceGrade: "Statutory filing",
        asOf: "AGM 27 June 2025",
        sourceLabel: "Honeywell Automation India 41st AGM proceedings",
        sourceUrl:
          "https://www.honeywell.com/content/dam/honeywellbt/en/documents/downloads/india-hail/agm-egm-postal-ballot/hon-corp-stock-exchange-intimation-proceedings-of-41st-agm-27062025.pdf",
      }),
    ],
    checklist: [
      "Do not open a customer pursuit. Competitive overlap is the point of the penalty.",
      "Revenue from operations ₹4,189.6 crore is ₹41,896 million, FY2024-25.",
      "Re-check MD and CFO titles against a filing after 27 June 2025.",
      "Registered office Hadapsar Industrial Estate, Pune 411013.",
    ],
  },
  {
    slug: "forbes-marshall",
    name: "Forbes Marshall",
    legalName: "Forbes Marshall",
    website: "https://www.forbesmarshall.com/",
    location:
      "Steam-engineering manufacturer with a campus at MIDC Chakan Phase II, near Savardari, Pune. The 2015 company note describes a 50-acre site.",
    whatTheyMake: "Steam systems and control instrumentation for process industry.",
    revenueLabel:
      "Not scored. BusinessLine in 2017 reported about ₹800 crore. A LinkedIn company-page estimate near ₹1,800 crore is also in circulation. Those conflict, and LinkedIn was not opened.",
    revenueCrore: null,
    period: "Conflict — 2017 press versus an unopened profile estimate",
    puneGate: "full",
    sectorGate: "process",
    revenueGate: "conflict",
    holdReason:
      "Evidence gap. The revenue sources conflict, neither is a current statutory filing, and the account is not qualified.",
    ibxFit:
      "Steam engineering for process plants would otherwise be a fit. The file is here so the rubric’s refusal is visible.",
    factors: buildFactors(
      [0, 15, 10, 12, 4, 2, 2],
      [
        [
          "BusinessLine in 2017 reported about ₹800 crore, and a LinkedIn company-page estimate of about ₹1,800 crore conflicts with it. LinkedIn is not a source on this desk, and no current filing was opened, so revenue scores 0.",
          "BusinessLine, 2017, Naushad Forbes on exports",
          "https://www.thehindubusinessline.com/companies/forbes-marshall-plans-to-step-up-export-business/article64240812.ece",
        ],
        [
          "Steam systems and control instrumentation for process industry are process equipment, so sector fit scores 15. Sector fit does not override the revenue block.",
          "Forbes Marshall, Chakan steam-systems facility",
          "https://www.forbesmarshall.com/news-media/forbes-marshall-inaugurates-a-new-steam-systems-manufacturing-facility-at-chakan/",
        ],
        [
          "The company describes a manufacturing campus at MIDC Chakan Phase II, so Pune weight scores 10.",
          "Forbes Marshall, Chakan steam-systems facility",
          "https://www.forbesmarshall.com/news-media/forbes-marshall-inaugurates-a-new-steam-systems-manufacturing-facility-at-chakan/",
        ],
        [
          "The Chakan note describes steam-product manufacturing. It is not a current map of vendor or service workflow, so process scores 12.",
          "Forbes Marshall, Chakan steam-systems facility",
          "https://www.forbesmarshall.com/news-media/forbes-marshall-inaugurates-a-new-steam-systems-manufacturing-facility-at-chakan/",
        ],
        [
          "BusinessLine in 2017 called Naushad Forbes Director. A World Economic Forum bio calls him Co-Chairman. That is not a current statutory filing, so the committee scores 4.",
          "World Economic Forum biography of Naushad Forbes",
          "https://www.weforum.org/stories/authors/naushad-forbes/",
        ],
        [
          "The revenue interview is from 2017. There is no current buying trigger in this file, so the trigger scores 2.",
          "BusinessLine, 2017, Naushad Forbes on exports",
          "https://www.thehindubusinessline.com/companies/forbes-marshall-plans-to-step-up-export-business/article64240812.ece",
        ],
        [
          "The two revenue clues conflict and the newer one was not opened because it sits on LinkedIn, so evidence quality scores 2.",
          "BusinessLine, 2017, Naushad Forbes on exports",
          "https://www.thehindubusinessline.com/companies/forbes-marshall-plans-to-step-up-export-business/article64240812.ece",
        ],
      ],
    ),
    people: [
      person({
        name: "Naushad Forbes",
        title: "Director in a 2017 interview; Co-Chairman on a World Economic Forum bio",
        buyingRole: "Economic buyer",
        why: "He is the public name attached to Forbes Marshall. The title is not stable across these two pages, and neither page is a current filing.",
        verify: "Do not use either title in a letter until a current company page or filing is opened.",
        evidenceGrade: "Stale or conflicting",
        asOf: "BusinessLine, updated 8 December 2017; WEF bio undated in this file",
        sourceLabel: "BusinessLine, 2017",
        sourceUrl:
          "https://www.thehindubusinessline.com/companies/forbes-marshall-plans-to-step-up-export-business/article64240812.ece",
      }),
    ],
    checklist: [
      "Do not qualify. The 2017 figure of about ₹800 crore and a LinkedIn estimate near ₹1,800 crore conflict.",
      "Do not open or scrape LinkedIn to resolve the conflict. Ask for audited financials instead.",
      "Pune manufacturing at Chakan is established by the company’s own 2015 campus note. That does not clear revenue.",
      "Re-check Naushad Forbes’s current title before using it.",
    ],
  },
]

export type DeskAccount = Account & {
  baseScore: number
  penalty: number
  score: number
  tier: Tier
}

function enrich(account: Account): DeskAccount {
  const penalty = penaltyOf(account)
  const baseScore = baseScoreOf(account)
  return {
    ...account,
    baseScore,
    penalty,
    score: baseScore - penalty,
    tier: tierOf(account),
  }
}

function assertDesk(list: Account[]) {
  const slugs = new Set<string>()

  for (const account of list) {
    if (slugs.has(account.slug)) {
      throw new Error(`Duplicate slug ${account.slug}`)
    }
    slugs.add(account.slug)

    if (account.factors.length !== FACTOR_GUIDE.length) {
      throw new Error(`${account.slug} does not have ${FACTOR_GUIDE.length} factors`)
    }

    account.factors.forEach((factor, index) => {
      const guide = FACTOR_GUIDE[index]
      if (!guide || factor.id !== guide.id || factor.max !== guide.max) {
        throw new Error(`${account.slug} factor ${index} does not match the guide`)
      }
      if (factor.points < 0 || factor.points > factor.max) {
        throw new Error(`${account.slug} ${factor.id} points out of range`)
      }
      if (!factor.justification.trim() || !factor.sourceLabel.trim()) {
        throw new Error(`${account.slug} ${factor.id} is missing a justification`)
      }
      if (!factor.sourceUrl.startsWith("https://")) {
        throw new Error(`${account.slug} ${factor.id} needs an https source`)
      }
      if (factor.sourceUrl.toLowerCase().includes("linkedin.com")) {
        throw new Error(`${account.slug} cites LinkedIn`)
      }
    })

    const expectedRevenue = revenuePoints(account.revenueGate, account.revenueCrore)
    if (account.factors[0]?.points !== expectedRevenue) {
      throw new Error(
        `${account.slug} revenue points ${account.factors[0]?.points} != ${expectedRevenue}`,
      )
    }

    const blob = JSON.stringify(account).toLowerCase()
    if (blob.includes("linkedin.com")) {
      throw new Error(`${account.slug} contains a LinkedIn URL`)
    }
    if (blob.includes("@")) {
      throw new Error(`${account.slug} contains an email-like string`)
    }

    const tier = tierOf(account)
    const blocked =
      account.sectorGate === "competitor" ||
      account.revenueGate === "unverified" ||
      account.revenueGate === "conflict"
    if (blocked && tier !== "hold") {
      throw new Error(`${account.slug} should be Hold`)
    }
    if (tier === "pursue" && scoreOf(account) < 75) {
      throw new Error(`${account.slug} pursued below 75`)
    }
  }
}

assertDesk(accounts)

export const desk: DeskAccount[] = accounts.map(enrich)

export function getAccount(slug: string) {
  return desk.find((account) => account.slug === slug)
}

export function tierCounts() {
  return {
    pursue: desk.filter((account) => account.tier === "pursue").length,
    verify: desk.filter((account) => account.tier === "verify").length,
    hold: desk.filter((account) => account.tier === "hold").length,
  }
}

export function pursueNow() {
  return desk
    .filter((account) => account.tier === "pursue")
    .slice()
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

export function evidenceGap() {
  return desk.filter(
    (account) =>
      account.revenueGate === "conflict" || account.revenueGate === "unverified",
  )
}

export { desk as accounts }
