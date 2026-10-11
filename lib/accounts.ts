import {
  FACTOR_GUIDE,
  pointsOf,
  scoreOf,
  tierOf,
} from "@/lib/qualification"
import type { Account, DecisionMaker, Factor, FactorId, Tier } from "@/lib/types"

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

function person(input: DecisionMaker): DecisionMaker {
  return input
}

const MC = "https://www.moneycontrol.com/markets/financials/profit-loss"

const accounts: Account[] = [
  {
    slug: "anup-engineering",
    name: "Anup Engineering",
    legalName: "The Anup Engineering Limited",
    website: "https://www.anupengg.com/",
    location:
      "Ahmedabad works, with a Vadodara engineering office named in the FY26 release. No Pune plant is in the sources used here.",
    whatTheyMake:
      "Static process equipment: heat exchangers, reactors, vessels, towers, tanks, and silos for oil and gas, petrochemicals, and newer energy work.",
    revenueCrore: 822,
    revenueLabel: "₹822 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/theanupengineering-ANUP54246/`,
    inBand: true,
    sectorFit: "equipment",
    linkedinCompanyUrl: "https://www.linkedin.com/company/the-anup-engineering-limited",
    linkedinConfirms:
      "The company page describes a pressure-vessel and process-equipment manufacturer headquartered in Ahmedabad. LinkedIn’s revenue range is about ₹700–800 crore. Moneycontrol’s ₹822 crore sales line is the figure this desk uses.",
    ibxFit:
      "Each job is engineered to order: a specification, a drawing set, vendor documents, and an inspection file. That is the IB-X surface. Do not name an ERP. No source here does.",
    factors: buildFactors(
      [20, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s consolidated sales line for Mar 2026 is ₹822 crore, inside ₹500–1,000 crore, so the band scores 0.20. The company’s own FY26 release says consolidated revenue of ₹822 crore for the same year.",
          "Moneycontrol profit and loss, The Anup Engineering",
          `${MC}/theanupengineering-ANUP54246/`,
        ],
        [
          "Heat exchangers were 54% of the quarter’s product mix in the FY26 release, with reactors and vessels at 39%. That is process equipment, so sector scores the full 0.25.",
          "Anup Engineering Q4 FY26 press release",
          "https://www.anupengg.com/wp-content/uploads/2026/05/Q4-Press-release-of-31.03.2026.pdf",
        ],
        [
          "The release places the works in Ahmedabad and an engineering office in Vadodara. Nothing in these sources puts a plant in Pune, so Pune scores 0.",
          "Anup Engineering Q4 FY26 press release",
          "https://www.anupengg.com/wp-content/uploads/2026/05/Q4-Press-release-of-31.03.2026.pdf",
        ],
        [
          "The economic buyer and the finance owner are both named on public pages, so the persona does not have to be rebuilt from scratch. That scores 0.20.",
          "MarketScreener company managers",
          "https://www.marketscreener.com/quote/stock/THE-ANUP-ENGINEERING-LIMI-55399625/company/",
        ],
        [
          "The LinkedIn company page confirms the legal name, Ahmedabad headquarters, and process-equipment manufacturing. That verification scores 0.20. Do not replace the Moneycontrol sales line with LinkedIn’s revenue range.",
          "LinkedIn company page, The Anup Engineering Limited",
          "https://www.linkedin.com/company/the-anup-engineering-limited",
        ],
      ],
    ),
    people: [
      person({
        name: "Reginaldo Dsouza",
        title: "Managing Director and CEO",
        buyingRole: "Economic buyer",
        why: "He is the named chief executive. A first meeting on workflow for engineered-to-order jobs starts here, or with someone he names.",
        linkedinUrl: "https://www.linkedin.com/in/reginaldo-dsouza-174710145",
        linkedinNote:
          "Public profile indexed for this name. Open it and confirm the current title still reads Managing Director and CEO at The Anup Engineering Limited.",
        sourceLabel: "MarketScreener company managers",
        sourceUrl:
          "https://www.marketscreener.com/quote/stock/THE-ANUP-ENGINEERING-LIMI-55399625/company/",
      }),
      person({
        name: "Nilesh Hirapara",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "Order files, inspection packs, and invoice packs sit with finance as much as with the shop. He is the named finance seat.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Nilesh%20Hirapara%20Anup%20Engineering",
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "MarketScreener company managers",
        sourceUrl:
          "https://www.marketscreener.com/quote/stock/THE-ANUP-ENGINEERING-LIMI-55399625/company/",
      }),
    ],
    checklist: [
      "Open the Moneycontrol sales line and confirm Mar 2026 still reads ₹822 crore.",
      "Open the LinkedIn company page and confirm Ahmedabad plus process equipment. Ignore its revenue range.",
      "Open Reginaldo Dsouza’s public profile and confirm the title.",
      "Search Nilesh Hirapara and confirm he is still CFO before using the name in a letter.",
      "Ask who owns engineering document control. That seat is not named in this file.",
    ],
  },
  {
    slug: "kilburn-engineering",
    name: "Kilburn Engineering",
    legalName: "Kilburn Engineering Limited",
    website: "https://www.kilburnengg.com/",
    location:
      "LinkedIn lists the headquarters in Kolkata. These sources do not show a Pune plant.",
    whatTheyMake:
      "Custom thermal process equipment. The company page describes dryers and related process plant, built to a customer specification.",
    revenueCrore: 628,
    revenueLabel: "₹628 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/kilburnengineering-KE03/`,
    inBand: true,
    sectorFit: "equipment",
    linkedinCompanyUrl: "https://www.linkedin.com/company/kilburn-engineering-ltd",
    linkedinConfirms:
      "The company page says industrial machinery manufacturing, custom process equipment, headquarters Kolkata. Its dollar revenue figure does not match ₹628 crore. Use Moneycontrol for revenue.",
    ibxFit:
      "A dryer or calciner order is a specification, a vendor list, and a commissioning file. IB-X fits that paper trail. Do not name an ERP.",
    factors: buildFactors(
      [20, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s consolidated sales line for Mar 2026 is ₹628 crore, inside the band, so revenue scores 0.20. The prior column on the same page is ₹424 crore, which would have failed the floor. Use the latest year only.",
          "Moneycontrol profit and loss, Kilburn Engineering",
          `${MC}/kilburnengineering-KE03/`,
        ],
        [
          "LinkedIn classifies the company as industrial machinery and describes custom thermal process equipment. That is process equipment, so sector scores 0.25.",
          "LinkedIn company page, Kilburn Engineering Ltd",
          "https://www.linkedin.com/company/kilburn-engineering-ltd",
        ],
        [
          "Headquarters on the LinkedIn page is Kolkata. No Pune plant is stated, so Pune scores 0.",
          "LinkedIn company page, Kilburn Engineering Ltd",
          "https://www.linkedin.com/company/kilburn-engineering-ltd",
        ],
        [
          "The company board page names the managing director and the chief financial officer, so the two seats that usually stall a first call are already filled. Persona scores 0.20.",
          "Kilburn Engineering board of directors",
          "https://www.kilburnengg.com/investor-relations/board-of-directors/",
        ],
        [
          "The LinkedIn company page confirms the name, Kolkata, and industrial machinery. That scores 0.20. Do not use the dollar revenue shown there.",
          "LinkedIn company page, Kilburn Engineering Ltd",
          "https://www.linkedin.com/company/kilburn-engineering-ltd",
        ],
      ],
    ),
    people: [
      person({
        name: "Ranjit Lala",
        title: "Managing Director",
        buyingRole: "Economic buyer",
        why: "The board page names him Managing Director. He is the economic buyer until the company says otherwise.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Ranjit%20Lala%20Kilburn%20Engineering",
        linkedinNote:
          "People search only. Open a profile and match it to the board page before you use the name.",
        sourceLabel: "Kilburn Engineering board of directors",
        sourceUrl: "https://www.kilburnengg.com/investor-relations/board-of-directors/",
      }),
      person({
        name: "Sachin Vijaykar",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "Named on the same board page as CFO. Project billing and document packs route through this seat.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Sachin%20Vijaykar%20Kilburn",
        linkedinNote: "People search only. Confirm the profile against the board page.",
        sourceLabel: "Kilburn Engineering board of directors",
        sourceUrl: "https://www.kilburnengg.com/investor-relations/board-of-directors/",
      }),
      person({
        name: "Anil S. Karnad",
        title: "Whole Time Director",
        buyingRole: "Process owner",
        why: "A whole-time director on the board page is the closest named operating seat. Ask which plants and order files he actually runs.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Anil%20Karnad%20Kilburn%20Engineering",
        linkedinNote: "People search only. Confirm he is still a whole-time director.",
        sourceLabel: "Kilburn Engineering board of directors",
        sourceUrl: "https://www.kilburnengg.com/investor-relations/board-of-directors/",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm Mar 2026 consolidated sales still read ₹628 crore, not the ₹424 crore year before.",
      "Open the LinkedIn company page. Check industry and Kolkata. Ignore the dollar revenue.",
      "Open the board page and confirm Ranjit Lala and Sachin Vijaykar are still in those seats.",
      "Run the three people searches and keep only profiles that match the board titles.",
      "Ask who owns engineering IT. That seat is not on the board page.",
    ],
  },
  {
    slug: "shanthi-gears",
    name: "Shanthi Gears",
    legalName: "Shanthi Gears Limited",
    website: "https://www.shanthigears.com/",
    location: "Coimbatore. The LinkedIn company page says Tamil Nadu. Not Pune.",
    whatTheyMake:
      "Industrial gears and gearboxes for process, power, steel, cement, and sugar plants. This is industrial machinery, not a crane or construction-equipment OEM.",
    revenueCrore: 518,
    revenueLabel: "₹518 crore standalone sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/shanthigears-SG04/`,
    inBand: true,
    sectorFit: "industrial",
    linkedinCompanyUrl: "https://www.linkedin.com/company/shanthigears",
    linkedinConfirms:
      "The company page says mechanical or industrial engineering, headquarters Coimbatore, gears for process and heavy industry. Its dollar revenue is close to, but not the same as, the Moneycontrol line. Use Moneycontrol.",
    ibxFit:
      "Gearbox orders are configured, quoted, and released against a drawing. The persona work is already started. The gap is Pune: there is no local plant in these sources.",
    factors: buildFactors(
      [20, 15, 0, 20, 20],
      [
        [
          "Moneycontrol standalone sales for Mar 2026 are ₹518 crore, inside the band, so revenue scores 0.20. The Murugappa release for the same year says revenue of ₹518.72 crore.",
          "Moneycontrol profit and loss, Shanthi Gears",
          `${MC}/shanthigears-SG04/`,
        ],
        [
          "The LinkedIn page describes industrial gears for process, power, steel, and cement. That is industrial machinery supplying heavy plants, not a heavy-equipment OEM, so sector scores 0.15 of 0.25.",
          "LinkedIn company page, Shanthi Gears",
          "https://www.linkedin.com/company/shanthigears",
        ],
        [
          "Headquarters are Coimbatore. Pune scores 0.",
          "LinkedIn company page, Shanthi Gears",
          "https://www.linkedin.com/company/shanthigears",
        ],
        [
          "A board disclosure reported by Business Upturn names the whole-time director and CEO and the CFO. Both seats exist, so persona scores 0.20. Confirm the exchange filing before a letter.",
          "Business Upturn, Shanthi Gears CFO appointment",
          "https://businessupturn.com/business/corporates/shanthi-gears-board-appoints-sai-krishna-alluri-as-chief-financial-officer-also-names-new-hr-head/",
        ],
        [
          "The LinkedIn company page confirms Coimbatore and industrial gear manufacturing. That scores 0.20.",
          "LinkedIn company page, Shanthi Gears",
          "https://www.linkedin.com/company/shanthigears",
        ],
      ],
    ),
    people: [
      person({
        name: "M. Karunakaran",
        title: "Whole-time Director and CEO",
        buyingRole: "Economic buyer",
        why: "Named as whole-time director and CEO in the report of the board disclosure. He is the economic buyer to verify.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Karunakaran%20Shanthi%20Gears",
        linkedinNote:
          "People search only. Match the profile to the exchange filing, not to the news rewrite alone.",
        sourceLabel: "Business Upturn, Shanthi Gears CFO appointment",
        sourceUrl:
          "https://businessupturn.com/business/corporates/shanthi-gears-board-appoints-sai-krishna-alluri-as-chief-financial-officer-also-names-new-hr-head/",
      }),
      person({
        name: "Sai Krishna Alluri",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The same report says the board appointed him CFO and that the interim CFO stepped down.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Sai%20Krishna%20Alluri%20Shanthi%20Gears",
        linkedinNote: "People search only. Confirm against the BSE filing dated 3 September.",
        sourceLabel: "Business Upturn, Shanthi Gears CFO appointment",
        sourceUrl:
          "https://businessupturn.com/business/corporates/shanthi-gears-board-appoints-sai-krishna-alluri-as-chief-financial-officer-also-names-new-hr-head/",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm Mar 2026 sales are ₹518 crore.",
      "Open the Murugappa release and confirm ₹518.72 crore for the same year.",
      "Open the LinkedIn company page and confirm Coimbatore and gears.",
      "Find the 3 September exchange filing and confirm Karunakaran and Alluri before writing.",
      "Do not pitch this as a Pune account.",
    ],
  },
  {
    slug: "kirloskar-electric",
    name: "Kirloskar Electric",
    legalName: "Kirloskar Electric Company Limited",
    website: "https://kirloskarelectric.com/",
    location:
      "Headquarters in Bengaluru. The company board page lists Pune as a west-zone branch, with Mumbai and Surat. That is an office, not a plant.",
    whatTheyMake:
      "Industrial motors, generators, transformers, and switchgear. LinkedIn calls it industrial machinery. It is not a construction-equipment OEM.",
    revenueCrore: 589,
    revenueLabel: "₹589 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/kirloskarelectricco-KEC02/`,
    inBand: true,
    sectorFit: "industrial",
    linkedinCompanyUrl: "https://www.linkedin.com/company/kirloskarelectric",
    linkedinConfirms:
      "The company page says industrial machinery, headquarters Bengaluru, and revenue of about ₹590 crore, which agrees with Moneycontrol’s ₹589 crore. It also lists a Pune sales office among other cities. Revenue still comes from Moneycontrol.",
    ibxFit:
      "Five plants and a branch network mean the same order-to-dispatch paperwork in more than one city. The missing seat is the CFO. Do not invent one, and do not invent an ERP.",
    factors: buildFactors(
      [20, 15, 5, 10, 20],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹589 crore, inside the band, so revenue scores 0.20.",
          "Moneycontrol profit and loss, Kirloskar Electric",
          `${MC}/kirloskarelectricco-KEC02/`,
        ],
        [
          "Motors, generators, and transformers are industrial capital goods, not cranes or process vessels. Sector scores 0.15 of 0.25.",
          "LinkedIn company page, Kirloskar Electric",
          "https://www.linkedin.com/company/kirloskarelectric",
        ],
        [
          "The board page’s west-zone branch list includes Pune. A branch is not a plant, so Pune scores 0.05 of 0.15.",
          "Kirloskar Electric board of directors",
          "https://kirloskarelectric.com/investors/people/board-of-",
        ],
        [
          "The executive chairman and the managing director are named. The CFO is not on that page, so persona scores 0.10 of 0.20.",
          "Kirloskar Electric board of directors",
          "https://kirloskarelectric.com/investors/people/board-of-",
        ],
        [
          "LinkedIn confirms Bengaluru, industrial machinery, and a revenue figure in line with Moneycontrol. That scores 0.20.",
          "LinkedIn company page, Kirloskar Electric",
          "https://www.linkedin.com/company/kirloskarelectric",
        ],
      ],
    ),
    people: [
      person({
        name: "Vijay R. Kirloskar",
        title: "Executive Chairman",
        buyingRole: "Economic buyer",
        why: "The board page names him Executive Chairman and describes him as the promoter directing the company. DIN 00031253 is on that page.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Vijay%20Kirloskar%20Kirloskar%20Electric",
        linkedinNote: "People search only. Match the profile to the board page.",
        sourceLabel: "Kirloskar Electric board of directors",
        sourceUrl: "https://kirloskarelectric.com/investors/people/board-of-",
      }),
      person({
        name: "Anand B. Hunnur",
        title: "Managing Director",
        buyingRole: "Process owner",
        why: "The board page names him Managing Director. The same page says the July 2022 appointment was for three years. Confirm the term is current.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Anand%20Hunnur%20Kirloskar%20Electric",
        linkedinNote: "People search only. Confirm the profile and the current term.",
        sourceLabel: "Kirloskar Electric board of directors",
        sourceUrl: "https://kirloskarelectric.com/investors/people/board-of-",
      }),
      person({
        name: "Janaki Kirloskar",
        title: "Joint Managing Director",
        buyingRole: "Economic buyer",
        why: "Named Joint Managing Director on the same board page. Treat her as a second economic seat, not as a substitute for a CFO.",
        linkedinUrl:
          "https://www.linkedin.com/search/results/people/?keywords=Janaki%20Kirloskar%20Kirloskar%20Electric",
        linkedinNote: "People search only. Confirm against the board page.",
        sourceLabel: "Kirloskar Electric board of directors",
        sourceUrl: "https://kirloskarelectric.com/investors/people/board-of-",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm Mar 2026 consolidated sales are ₹589 crore.",
      "Open LinkedIn and confirm Bengaluru, industrial machinery, and that the revenue note still agrees.",
      "On the board page, confirm Pune is still only a west-zone branch.",
      "Confirm Anand Hunnur’s term. The page records a three-year appointment from 12 July 2022.",
      "Ask the company who the CFO is. Do not fill that seat from a search result.",
    ],
  },
  {
    slug: "windsor-machines",
    name: "Windsor Machines",
    legalName: "Windsor Machines Limited",
    website: "https://windsormachines.com/",
    location: "LinkedIn lists the headquarters in Ahmedabad. No Pune site is in these sources.",
    whatTheyMake:
      "Plastic processing machinery: injection moulding machines, blown-film lines, and pipe extrusion lines.",
    revenueCrore: 570,
    revenueLabel: "₹570 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/windsormachines-WM01/`,
    inBand: true,
    sectorFit: "industrial",
    linkedinCompanyUrl: "https://www.linkedin.com/company/windsormachinesofficial",
    linkedinConfirms:
      "The company page says industrial machinery manufacturing, injection moulding and extrusion, headquarters Ahmedabad. Its dollar revenue does not match ₹570 crore. Use Moneycontrol.",
    ibxFit:
      "Machine orders need a configuration, a dispatch file, and a service history. The persona is the open gap: this file has no MD or CFO from a company page. Spend the two minutes on LinkedIn, not on a new industry study.",
    factors: buildFactors(
      [20, 15, 0, 4, 20],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹570 crore, inside the band, so revenue scores 0.20.",
          "Moneycontrol profit and loss, Windsor Machines",
          `${MC}/windsormachines-WM01/`,
        ],
        [
          "The company builds industrial machines, not mobile heavy equipment. Sector scores 0.15 of 0.25.",
          "LinkedIn company page, Windsor Machines",
          "https://www.linkedin.com/company/windsormachinesofficial",
        ],
        [
          "Headquarters are Ahmedabad. Pune scores 0.",
          "LinkedIn company page, Windsor Machines",
          "https://www.linkedin.com/company/windsormachinesofficial",
        ],
        [
          "No managing director or CFO is named from a company page in this file, so persona scores 0.04. That is the conversion gap, not a reason to research the plastics industry again.",
          "LinkedIn company page, Windsor Machines",
          "https://www.linkedin.com/company/windsormachinesofficial",
        ],
        [
          "LinkedIn confirms the name, Ahmedabad, and machinery manufacturing. That scores 0.20. Ignore LinkedIn’s dollar revenue.",
          "LinkedIn company page, Windsor Machines",
          "https://www.linkedin.com/company/windsormachinesofficial",
        ],
      ],
    ),
    people: [],
    checklist: [
      "Open Moneycontrol and confirm Mar 2026 consolidated sales are ₹570 crore.",
      "Open the LinkedIn company page and confirm Ahmedabad and plastic machinery.",
      "Use the people search below and keep a profile only if the current title is MD, CEO, or CFO.",
      "Do not write a letter until those two seats have a company-page or filing source.",
      "Do not treat this as a Pune heavy-equipment account.",
    ],
  },
  {
    slug: "sanghvi-movers",
    name: "Sanghvi Movers",
    legalName: "Sanghvi Movers Limited",
    website: "https://www.sanghvimovers.com/",
    location: "Registered office is not copied here. Confirm it before calling this a Pune account.",
    whatTheyMake:
      "Crane and heavy-lift contracting. Confirm the current fleet mix on the company site. The cut-off does not depend on that sentence.",
    revenueCrore: 1070,
    revenueLabel: "₹1,070 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/sanghvimovers-SM10/`,
    inBand: false,
    sectorFit: "equipment",
    ibxFit: "Do not build a persona. The latest sales year is outside the band.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹1,070 crore, above ₹1,000 crore, so the band scores 0. The Mar 2025 column on the same table is ₹782 crore. The rule uses the latest year only.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "Sector is not scored. The sales table does not describe the product, and the account is already outside the band.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "Pune is not scored. This file does not include a page that states the registered office.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "Persona is not built for an account outside the revenue band.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "LinkedIn is not required once the sales line fails the band.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
      ],
    ),
    people: [],
    checklist: [
      "Open Moneycontrol. If Mar 2026 consolidated sales are still above ₹1,000 crore, leave the account cut off.",
      "Do not switch the test back to the ₹782 crore year.",
    ],
    cutoffReason:
      "Latest Moneycontrol consolidated sales are ₹1,070 crore, above the ₹1,000 crore ceiling. Mar 2025 on the same page was ₹782 crore, inside the band. The desk uses the latest year.",
  },
  {
    slug: "tega-industries",
    name: "Tega Industries",
    legalName: "Tega Industries Limited",
    website: "https://www.tegaindustries.com/",
    location: "Group revenue is the test. A city is not needed to cut this account off.",
    whatTheyMake:
      "Mining wear parts and related equipment. The company filing, not the standalone sales line, decides the band.",
    revenueCrore: 1774,
    revenueLabel:
      "₹1,774 crore group total income for FY26 in the company filing. Moneycontrol’s default sales line is standalone ₹789 crore.",
    period: "FY26",
    moneycontrolUrl: `${MC}/tegaindustries-TI26/`,
    inBand: false,
    sectorFit: "industrial",
    ibxFit: "Do not build a persona on the standalone sales line.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol’s profit-and-loss view is standalone and shows Mar 2026 sales of ₹789 crore. The company’s own FY26 filing reports group total income of ₹1,773.6 crore. The group figure is outside the band, so a standalone reading would qualify the wrong number. Revenue scores 0.",
          "Tega Industries FY26 earnings call transcript",
          "https://www.tegaindustries.com/assets/pdfs/int/2026/Q1/20260608_232901.pdf",
        ],
        [
          "Sector is not scored. The account fails the revenue band on the group figure.",
          "Tega Industries FY26 earnings call transcript",
          "https://www.tegaindustries.com/assets/pdfs/int/2026/Q1/20260608_232901.pdf",
        ],
        [
          "Pune is not scored.",
          "Moneycontrol profit and loss, Tega Industries",
          `${MC}/tegaindustries-TI26/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Tega Industries",
          `${MC}/tegaindustries-TI26/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Tega Industries",
          `${MC}/tegaindustries-TI26/`,
        ],
      ],
    ),
    people: [],
    checklist: [
      "Open Moneycontrol and note that the view is standalone ₹789 crore.",
      "Open the company FY26 transcript and use ₹1,773.6 crore group income. That figure is above the band.",
    ],
    cutoffReason:
      "Moneycontrol shows standalone sales of ₹789 crore. The company’s FY26 group total income is ₹1,773.6 crore, above ₹1,000 crore. Do not qualify Tega on the standalone line.",
  },
  {
    slug: "foseco-india",
    name: "Foseco India",
    legalName: "Foseco India Limited",
    website: "https://www.foseco.com/",
    location: "A foundry-consumables company. This file does not assign it a Pune plant.",
    whatTheyMake: "Foundry consumables, not machines.",
    revenueCrore: 604,
    revenueLabel: "₹604 crore standalone sales, Moneycontrol, year ended Dec 2025",
    period: "Dec 2025",
    moneycontrolUrl: `${MC}/fosecoindia-FI12/`,
    inBand: true,
    sectorFit: "other",
    ibxFit:
      "The revenue band passes. The product does not. This is the slow-conversion pattern: a ₹500–1,000 crore Indian manufacturer that is not equipment.",
    factors: buildFactors(
      [20, 0, 0, 0, 0],
      [
        [
          "Moneycontrol standalone sales for Dec 2025 are ₹604 crore, inside the band, so revenue would score 0.20. The sector gate still cuts the account off.",
          "Moneycontrol profit and loss, Foseco India",
          `${MC}/fosecoindia-FI12/`,
        ],
        [
          "Foundry consumables are not heavy equipment or industrial machinery. Sector scores 0, and the account is cut off.",
          "Moneycontrol profit and loss, Foseco India",
          `${MC}/fosecoindia-FI12/`,
        ],
        [
          "Pune is not scored. No plant address is in this file.",
          "Moneycontrol profit and loss, Foseco India",
          `${MC}/fosecoindia-FI12/`,
        ],
        [
          "Persona is not built for a cut-off sector.",
          "Moneycontrol profit and loss, Foseco India",
          `${MC}/fosecoindia-FI12/`,
        ],
        [
          "LinkedIn is not required once the sector gate fails.",
          "Moneycontrol profit and loss, Foseco India",
          `${MC}/fosecoindia-FI12/`,
        ],
      ],
    ),
    people: [],
    checklist: [
      "If the inbound lead is Foseco India, stop after the Moneycontrol sales check and the product check.",
      "Do not spend a persona cycle on it.",
    ],
    cutoffReason:
      "Moneycontrol sales of ₹604 crore are inside the band. The company sells foundry consumables, not equipment. In-band revenue alone is the slow-conversion list.",
  },
  {
    slug: "precision-camshafts",
    name: "Precision Camshafts",
    legalName: "Precision Camshafts Limited",
    website: "https://www.pclindia.in/",
    location: "Solapur, Maharashtra. Not a Pune heavy-equipment plant.",
    whatTheyMake: "Camshafts and related auto components.",
    revenueCrore: 772,
    revenueLabel: "₹772 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/precisioncamshafts-PC16/`,
    inBand: true,
    sectorFit: "other",
    ibxFit: "In-band auto components. Cut off on sector so persona time is not spent here.",
    factors: buildFactors(
      [20, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹772 crore, inside the band, so revenue would score 0.20. Sector still cuts the account off.",
          "Moneycontrol profit and loss, Precision Camshafts",
          `${MC}/precisioncamshafts-PC16/`,
        ],
        [
          "Camshafts are auto components, not heavy or process equipment. Sector scores 0.",
          "Moneycontrol profit and loss, Precision Camshafts",
          `${MC}/precisioncamshafts-PC16/`,
        ],
        [
          "Solapur is not scored as Pune.",
          "Moneycontrol profit and loss, Precision Camshafts",
          `${MC}/precisioncamshafts-PC16/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Precision Camshafts",
          `${MC}/precisioncamshafts-PC16/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Precision Camshafts",
          `${MC}/precisioncamshafts-PC16/`,
        ],
      ],
    ),
    people: [],
    checklist: [
      "Treat a Solapur auto-component lead in this revenue band as cut off unless the product really is equipment.",
    ],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹772 crore, inside the band. The product is camshafts. Maharashtra manufacturing is not enough.",
  },
  {
    slug: "til",
    name: "TIL",
    legalName: "TIL Limited",
    website: "https://www.tilindia.in/",
    location: "Not scored.",
    whatTheyMake: "Cranes and material handling. Confirm on the company site. Sales decide the cut-off.",
    revenueCrore: 323,
    revenueLabel: "₹323 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/til-TIL/`,
    inBand: false,
    sectorFit: "equipment",
    ibxFit: "Below the revenue floor. Do not build a persona.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹323 crore, below ₹500 crore, so the band scores 0.",
          "Moneycontrol profit and loss, TIL",
          `${MC}/til-TIL/`,
        ],
        [
          "Sector is not scored. Revenue already fails.",
          "Moneycontrol profit and loss, TIL",
          `${MC}/til-TIL/`,
        ],
        [
          "Pune is not scored.",
          "Moneycontrol profit and loss, TIL",
          `${MC}/til-TIL/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, TIL",
          `${MC}/til-TIL/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, TIL",
          `${MC}/til-TIL/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Leave cut off while Moneycontrol sales stay under ₹500 crore."],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹323 crore, under the ₹500 crore floor.",
  },
  {
    slug: "indef",
    name: "Indef",
    legalName: "Indef Manufacturing Limited",
    website: "https://www.indef.com/",
    location: "Not scored.",
    whatTheyMake: "Hoists and material handling. Confirm on the company site. Sales decide the cut-off.",
    revenueCrore: 195,
    revenueLabel: "₹195 crore standalone sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/indefmanufacturing-IM04/`,
    inBand: false,
    sectorFit: "equipment",
    ibxFit: "Below the revenue floor. Do not build a persona.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol standalone sales for Mar 2026 are ₹195 crore, below ₹500 crore, so the band scores 0.",
          "Moneycontrol profit and loss, Indef Manufacturing",
          `${MC}/indefmanufacturing-IM04/`,
        ],
        [
          "Sector is not scored. Revenue already fails.",
          "Moneycontrol profit and loss, Indef Manufacturing",
          `${MC}/indefmanufacturing-IM04/`,
        ],
        [
          "Pune is not scored.",
          "Moneycontrol profit and loss, Indef Manufacturing",
          `${MC}/indefmanufacturing-IM04/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Indef Manufacturing",
          `${MC}/indefmanufacturing-IM04/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Indef Manufacturing",
          `${MC}/indefmanufacturing-IM04/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Leave cut off while Moneycontrol sales stay under ₹500 crore."],
    cutoffReason:
      "Moneycontrol standalone sales are ₹195 crore, under the ₹500 crore floor.",
  },
  {
    slug: "thermax",
    name: "Thermax",
    legalName: "Thermax Limited",
    website: "https://www.thermaxglobal.com/",
    location: "Pune headquarters, from the FY2024-25 corporate overview.",
    whatTheyMake: "Process heat, water, and steam equipment. Far above the revenue band.",
    revenueCrore: 10694,
    revenueLabel: "₹10,694 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/thermax-T/`,
    inBand: false,
    sectorFit: "equipment",
    ibxFit: "A Pune process-equipment name, and outside this revenue motion.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹10,694 crore, far above ₹1,000 crore. Revenue scores 0.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
        [
          "Sector is not scored. Revenue already fails this band.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
        [
          "Pune is real and still not scored, because the band fails first.",
          "Thermax digital annual report 2024-25, corporate overview",
          "https://www.thermaxglobal.com/annual-reports/digital-annual-report-2024-25/corporate-overview.html",
        ],
        [
          "Persona is not rebuilt for this band.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
      ],
    ),
    people: [],
    checklist: [
      "If a Pune industrial list includes Thermax, cut it from the ₹500–1,000 crore queue.",
    ],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹10,694 crore. Pune and process equipment do not bring it into this band.",
  },
  {
    slug: "bharat-forge",
    name: "Bharat Forge",
    legalName: "Bharat Forge Limited",
    website: "https://www.bharatforge.com/",
    location: "Pune forging group. Outside this revenue band.",
    whatTheyMake: "Forgings and industrial components.",
    revenueCrore: 16811,
    revenueLabel: "₹16,811 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/bharatforge-BF03/`,
    inBand: false,
    sectorFit: "industrial",
    ibxFit: "A Pune name that swamps a ₹500–1,000 crore queue.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹16,811 crore. Revenue scores 0.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "Sector is not scored.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "Pune is not scored.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Cut from the ₹500–1,000 crore queue."],
    cutoffReason: "Moneycontrol consolidated sales are ₹16,811 crore, above the ceiling.",
  },
  {
    slug: "ace",
    name: "Action Construction Equipment",
    legalName: "Action Construction Equipment Limited",
    website: "https://www.ace-cranes.com/",
    location: "Not a Pune account. Outside the band.",
    whatTheyMake: "Mobile cranes, tower cranes, and construction equipment.",
    revenueCrore: 3280,
    revenueLabel: "₹3,280 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/actionconstructionequipment-ACE3/`,
    inBand: false,
    sectorFit: "equipment",
    ibxFit: "The right kind of equipment, the wrong revenue band for this queue.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹3,280 crore. Revenue scores 0.",
          "Moneycontrol profit and loss, Action Construction Equipment",
          `${MC}/actionconstructionequipment-ACE3/`,
        ],
        [
          "Sector is not scored. Revenue already fails.",
          "Moneycontrol profit and loss, Action Construction Equipment",
          `${MC}/actionconstructionequipment-ACE3/`,
        ],
        [
          "Pune is not scored.",
          "Moneycontrol profit and loss, Action Construction Equipment",
          `${MC}/actionconstructionequipment-ACE3/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Action Construction Equipment",
          `${MC}/actionconstructionequipment-ACE3/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Action Construction Equipment",
          `${MC}/actionconstructionequipment-ACE3/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Keep cranes, and still cut this name while sales stay above ₹1,000 crore."],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹3,280 crore. A crane OEM above the ceiling stays out of this queue.",
  },
  {
    slug: "kirloskar-pneumatic",
    name: "Kirloskar Pneumatic",
    legalName: "Kirloskar Pneumatic Company Limited",
    website: "https://www.kirloskarpneumatic.com/",
    location: "Pune group company. Outside this revenue band.",
    whatTheyMake: "Compressors and transmission equipment.",
    revenueCrore: 1786,
    revenueLabel: "₹1,786 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/kirloskarpneumaticcompany-KGK/`,
    inBand: false,
    sectorFit: "equipment",
    ibxFit: "Close to the ceiling, and still over it.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹1,786 crore, above ₹1,000 crore. Revenue scores 0.",
          "Moneycontrol profit and loss, Kirloskar Pneumatic",
          `${MC}/kirloskarpneumaticcompany-KGK/`,
        ],
        [
          "Sector is not scored.",
          "Moneycontrol profit and loss, Kirloskar Pneumatic",
          `${MC}/kirloskarpneumaticcompany-KGK/`,
        ],
        [
          "Pune is not scored.",
          "Moneycontrol profit and loss, Kirloskar Pneumatic",
          `${MC}/kirloskarpneumaticcompany-KGK/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Kirloskar Pneumatic",
          `${MC}/kirloskarpneumaticcompany-KGK/`,
        ],
        [
          "LinkedIn is not required.",
          "Moneycontrol profit and loss, Kirloskar Pneumatic",
          `${MC}/kirloskarpneumaticcompany-KGK/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Do not pull this into the band because the Kirloskar name is local."],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹1,786 crore, above ₹1,000 crore.",
  },
]

const FACTOR_IDS: FactorId[] = [
  "revenue",
  "sector",
  "pune",
  "persona",
  "linkedin",
]

function assertDesk(list: Account[]) {
  const slugs = new Set<string>()
  for (const account of list) {
    if (slugs.has(account.slug)) throw new Error(`duplicate slug ${account.slug}`)
    slugs.add(account.slug)

    if (account.factors.length !== FACTOR_GUIDE.length) {
      throw new Error(`${account.slug} factor count`)
    }
    account.factors.forEach((factor, index) => {
      const guide = FACTOR_GUIDE[index]
      if (!guide || factor.id !== guide.id || factor.max !== guide.max) {
        throw new Error(`${account.slug} factor ${factor.id} drifted`)
      }
      if (factor.points < 0 || factor.points > factor.max) {
        throw new Error(`${account.slug} points out of range for ${factor.id}`)
      }
      if (!factor.justification || !factor.sourceUrl.startsWith("https://")) {
        throw new Error(`${account.slug} missing justification`)
      }
    })

    const ids = account.factors.map((factor) => factor.id)
    if (ids.join() !== FACTOR_IDS.join()) {
      throw new Error(`${account.slug} factor order`)
    }

    const inNumbers =
      account.revenueCrore >= 500 && account.revenueCrore <= 1000
    if (account.inBand !== inNumbers && account.slug !== "tega-industries") {
      throw new Error(`${account.slug} band flag does not match ${account.revenueCrore}`)
    }
    if (account.slug === "tega-industries" && account.inBand) {
      throw new Error("tega must stay outside the band")
    }

    const tier = tierOf(account)
    if ((tier === "high" || tier === "medium") && account.cutoffReason) {
      throw new Error(`${account.slug} is qualified and also marked cut off`)
    }
    if (tier === "cutoff" && !account.cutoffReason) {
      throw new Error(`${account.slug} cutoff without a reason`)
    }
    if (tier === "high" && scoreOf(account) <= 0.8) {
      throw new Error(`${account.slug} high at or under 0.80`)
    }
    if (tier === "medium" && (scoreOf(account) < 0.5 || scoreOf(account) > 0.8)) {
      throw new Error(`${account.slug} medium outside 0.50–0.80`)
    }

    const blob = JSON.stringify(account)
    if (blob.includes("@")) throw new Error(`${account.slug} has an email-like string`)
    for (const personRow of account.people) {
      if (!personRow.linkedinUrl.includes("linkedin.com")) {
        throw new Error(`${account.slug} person missing LinkedIn check`)
      }
    }
    if (account.linkedinCompanyUrl && !account.linkedinCompanyUrl.includes("linkedin.com/company")) {
      throw new Error(`${account.slug} company LinkedIn URL`)
    }
  }
}

assertDesk(accounts)

export type DeskAccount = Account & {
  points: number
  score: number
  tier: Tier
}

function enrich(account: Account): DeskAccount {
  const points = pointsOf(account)
  return { ...account, points, score: points / 100, tier: tierOf(account) }
}

export const desk: DeskAccount[] = accounts.map(enrich)

export function getAccount(slug: string) {
  return desk.find((account) => account.slug === slug)
}

export function tierCounts() {
  return {
    high: desk.filter((account) => account.tier === "high").length,
    medium: desk.filter((account) => account.tier === "medium").length,
    cutoff: desk.filter((account) => account.tier === "cutoff").length,
  }
}

export function qualified() {
  return desk
    .filter((account) => account.tier === "high" || account.tier === "medium")
    .slice()
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

export function byTier(tier: Tier) {
  return desk
    .filter((account) => account.tier === tier)
    .slice()
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

export { desk as accounts }
