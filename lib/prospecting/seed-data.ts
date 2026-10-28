import type { NameHit, SourceType } from "@/lib/prospecting/scoring"

const ON = "2026-10-11"
const MC = "https://www.moneycontrol.com/markets/financials/profit-loss"

function hit(name: string, sourceUrl: string, sourceType: SourceType): NameHit {
  return { name, sourceUrl, sourceType, retrievedAt: ON }
}

function mc(slug: string, revenue: number, basis: "standalone" | "consolidated"): SeedCompany {
  return {
    name: slug,
    revenue,
    fy: "FY26",
    basis,
    revenueSourceUrl: `${MC}/${slug}/`,
    revenueSourceType: "moneycontrol",
    executives: [],
    review: "No leadership page or filing was collected for this company. Names stay blank.",
  }
}

export type SeedExecutive = {
  persona: "CEO_FOUNDER" | "HR" | "CSR" | "MARKETING" | "PROCUREMENT"
  title: string
  hits: NameHit[]
}

export type SeedCompany = {
  name: string
  website?: string
  hq?: string
  hqSourceUrl?: string
  hqSourceType?: SourceType
  revenue: number
  fy: string
  basis: "standalone" | "consolidated"
  revenueSourceUrl: string
  revenueSourceType: SourceType
  executives: SeedExecutive[]
  review?: string
}

const filing = "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf"

export const SEED: SeedCompany[] = [
  {
    name: "Shanthi Gears Limited",
    website: "https://www.shanthigears.com/",
    hq: "Coimbatore",
    hqSourceUrl: filing,
    hqSourceType: "exchange_filing",
    revenue: 518.72,
    fy: "FY26",
    basis: "standalone",
    revenueSourceUrl: "https://www.murugappa.com/uploads/Press_Release_Shanthi_Gears_Q4_FY_2025_26_26dbe937bb.pdf",
    revenueSourceType: "news",
    executives: [
      {
        persona: "HR",
        title: "Head – Human Resources",
        hits: [hit("Helena Susan", filing, "exchange_filing")],
      },
      {
        persona: "CEO_FOUNDER",
        title: "Whole-time Director and CEO",
        hits: [
          hit("M. Karunakaran", filing, "exchange_filing"),
          hit("M. Karunakaran", "https://www.shanthigears.com/wp-content/uploads/2026/06/Profile-of-Directors-1.pdf", "company_site"),
        ],
      },
    ],
    review: "CSR, marketing, and procurement heads are not in the 3 September 2026 filing. The CFO on that filing is finance, not a gifting persona, so the name is not in the buyer columns.",
  },
  {
    name: "Data Patterns (India) Limited",
    website: "https://www.datapatternsindia.com/",
    hq: "Chennai",
    hqSourceUrl: "https://www.datapatternsindia.com/investors/files/Audited-Financial-Results-Q4-&-FY-2025-26.pdf",
    hqSourceType: "exchange_filing",
    revenue: 924.77,
    fy: "FY26",
    basis: "standalone",
    revenueSourceUrl: "https://www.datapatternsindia.com/investors/files/Audited-Financial-Results-Q4-&-FY-2025-26.pdf",
    revenueSourceType: "exchange_filing",
    executives: [
      {
        persona: "HR",
        title: "VP-HR",
        hits: [hit("Lakshminarayanan K.V.", "https://www.datapatternsindia.com/aboutus/senior_management.php", "company_site")],
      },
      {
        persona: "CEO_FOUNDER",
        title: "Chairman and Managing Director",
        hits: [
          hit("Srinivasagopalan Rangarajan", "https://www.datapatternsindia.com/aboutus/directors.php", "company_site"),
          hit(
            "Srinivasagopalan Rangarajan",
            "https://www.datapatternsindia.com/investors/files/Proceedings-of-Annual-General-Meeting-31-July-2026.pdf",
            "exchange_filing",
          ),
        ],
      },
    ],
    review: "CSR, marketing, and procurement are blank. The CFO is public on the company key-management page and is not a gifting persona.",
  },
  {
    name: "Centum Electronics Limited",
    website: "https://www.centumelectronics.com/",
    hq: "Bengaluru",
    hqSourceUrl: "https://www.centumelectronics.com/contact-details/",
    hqSourceType: "company_site",
    revenue: 962,
    fy: "FY26",
    basis: "consolidated",
    revenueSourceUrl: `${MC}/centumelectronics-CE10/`,
    revenueSourceType: "moneycontrol",
    executives: [
      {
        persona: "CEO_FOUNDER",
        title: "Chairman and Managing Director",
        hits: [
          hit("Apparao Mallavarapu", "https://www.centumelectronics.com/management/", "company_site"),
          hit(
            "Apparao Mallavarapu",
            "https://www.centumelectronics.com/wp-content/uploads/2026/09/Investor_Presentation.pdf",
            "company_site",
          ),
        ],
      },
    ],
    review: "HR, CSR, marketing, and procurement are blank. The management page lists Nanda Kishore Vempati without a title in the text collected here, so no HR name is stored.",
  },
  {
    name: "MTAR Technologies Limited",
    website: "https://mtar.in/",
    hq: "Hyderabad",
    hqSourceUrl: "https://mtar.in/management-team/",
    hqSourceType: "company_site",
    revenue: 876.2,
    fy: "FY26",
    basis: "consolidated",
    revenueSourceUrl: "https://mtar.in/wp-content/uploads/2026/05/Press-Release-Q4-FY-26.pdf",
    revenueSourceType: "company_site",
    executives: [
      {
        persona: "CEO_FOUNDER",
        title: "Managing Director",
        hits: [hit("P. Srinivas Reddy", "https://mtar.in/management-team/", "company_site")],
      },
    ],
    review: "HR, CSR, marketing, and procurement are blank. A LinkedIn post names an HR leader and is not used. The CFO is on the management page and is not a gifting persona.",
  },
  {
    name: "Zen Technologies Limited",
    website: "https://www.zentechnologies.com/",
    hq: "Hyderabad",
    hqSourceUrl: "https://www.zentechnologies.com/Contact-us/",
    hqSourceType: "company_site",
    revenue: 687,
    fy: "FY26",
    basis: "consolidated",
    revenueSourceUrl: `${MC}/zentechnologies-ZT01/`,
    revenueSourceType: "moneycontrol",
    executives: [
      {
        persona: "CEO_FOUNDER",
        title: "Chairman and Managing Director",
        hits: [
          hit(
            "Ashok Atluri",
            "https://www.zentechnologies.com/assets/uploads/files/change-in-management-on-2-feb-2026.pdf",
            "exchange_filing",
          ),
        ],
      },
    ],
    review:
      "HR is blank. Gowri Chintala Siddamshetty resigned as CHRO on 4 July 2025 (https://www.zentechnologies.com/assets/uploads/files/change-in-senior-management-personnel.pdf). No successor is in the filings used here. Confirm the May 2026 reappointment of Ashok Atluri before a letter.",
  },
  {
    name: "Exicom Tele-Systems Limited",
    website: "https://www.exicom.com/",
    hq: "Gurugram",
    hqSourceUrl: "https://www.exicom.com/investors",
    hqSourceType: "company_site",
    revenue: 1151.7,
    fy: "FY26",
    basis: "consolidated",
    revenueSourceUrl: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/30b0ed1c-5990-4ea9-a9fd-a6a757eea27e.pdf",
    revenueSourceType: "exchange_filing",
    executives: [
      {
        persona: "HR",
        title: "Head of HR",
        hits: [hit("Pooja Duggal", "https://www.exicom.com/investors", "company_site")],
      },
      {
        persona: "CEO_FOUNDER",
        title: "Managing Director and CEO",
        hits: [hit("Anant Nahata", "https://www.exicom.com/investors", "company_site")],
      },
    ],
    review: "CSR, marketing, and procurement are blank. Moneycontrol’s standalone sales are ₹894 crore. The group figure above is the one stored.",
  },
  {
    name: "Azad Engineering Limited",
    website: "https://azad.in/",
    hq: "Hyderabad",
    hqSourceUrl: "https://azad.in/team/",
    hqSourceType: "company_site",
    revenue: 602,
    fy: "FY26",
    basis: "consolidated",
    revenueSourceUrl: `${MC}/azadengineering-AEL02/`,
    revenueSourceType: "moneycontrol",
    executives: [],
    review: "The team page names a CFO and does not name an HR, CSR, marketing, or procurement head. The CEO is only on an aggregator, so the name is not stored.",
  },
  { ...mc("windsormachines-WM01", 570, "consolidated"), name: "Windsor Machines Limited", website: "https://windsormachines.com/" },
  { ...mc("kilburnengineering-KE03", 628, "consolidated"), name: "Kilburn Engineering Limited", website: "https://www.kilburnengg.com/" },
  { ...mc("theanupengineering-ANUP54246", 822, "consolidated"), name: "The Anup Engineering Limited", website: "https://www.anupengg.com/" },
  { ...mc("sanghvimovers-SM10", 1070, "consolidated"), name: "Sanghvi Movers Limited" },
  { ...mc("kirloskarpneumaticcompany-KGK", 1786, "consolidated"), name: "Kirloskar Pneumatic Company Limited" },
  { ...mc("actionconstructionequipment-ACE3", 3280, "consolidated"), name: "Action Construction Equipment Limited", website: "https://www.ace-cranes.com/" },
  { ...mc("20microns-2M", 953, "consolidated"), name: "20 Microns Limited" },
  { ...mc("servotechrenewablepowersystem-SPS04", 671, "consolidated"), name: "Servotech Renewable Power System Limited" },
  {
    ...mc("fosecoindia-FI12", 604, "standalone"),
    name: "Foseco India Limited",
    fy: "year ended Dec 2025",
  },
  { ...mc("precisioncamshafts-PC16", 772, "consolidated"), name: "Precision Camshafts Limited", website: "https://www.pclindia.in/" },
  { ...mc("kirloskarelectricco-KEC02", 589, "consolidated"), name: "Kirloskar Electric Company Limited" },
  { ...mc("til-TIL", 323, "consolidated"), name: "TIL Limited" },
  { ...mc("indefmanufacturing-IM04", 195, "standalone"), name: "Indef Manufacturing Limited" },
]
