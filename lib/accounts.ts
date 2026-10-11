import {
  FACTOR_GUIDE,
  pointsOf,
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

function person(input: DecisionMaker): DecisionMaker {
  return input
}

function peopleSearch(name: string, company: string) {
  const keywords = encodeURIComponent(`${name} ${company}`)
  return `https://www.linkedin.com/search/results/people/?keywords=${keywords}`
}

const MC = "https://www.moneycontrol.com/markets/financials/profit-loss"

const SAAVI =
  "Saavi, in Pune, sells handcrafted eco-friendly corporate gifts made with women artisans and rural communities. HR owns festival, onboarding, and employee gifts. The CEO owns the brand and the artisan story. The CFO owns the budget. Industry is not part of the score."

const accounts: Account[] = [
  {
    slug: "shanthi-gears",
    name: "Shanthi Gears",
    legalName: "Shanthi Gears Limited",
    website: "https://www.shanthigears.com/",
    location:
      "304-A, Trichy Road, Singanallur, Coimbatore 641005. The 3 September 2026 filing does not mention Pune.",
    whatTheyMake:
      "Industrial gears and gearboxes. The product is recorded so you can recognise the company. It does not change the score.",
    revenueCrore: 518,
    revenueLabel: "₹518 crore standalone sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/shanthigears-SG04/`,
    inBand: true,
    hrFit: "named",
    linkedinCompanyUrl: "https://www.linkedin.com/company/shanthigears",
    linkedinConfirms:
      "Open the company page and confirm Shanthi Gears, industrial gears, and Coimbatore. If the page prints a revenue range, ignore it. Moneycontrol’s ₹518 crore sales line is the figure this desk uses.",
    giftFit: SAAVI,
    factors: buildFactors(
      [20, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s standalone sales line for Mar 2026 is ₹518 crore, inside ₹500–1,000 crore, so the band scores 0.20. The prior column is ₹604 crore. Use the latest year only. The results note says consolidated figures are not applicable because the company has no subsidiary, associate, or joint venture.",
          "Moneycontrol profit and loss, Shanthi Gears",
          `${MC}/shanthigears-SG04/`,
        ],
        [
          "The board outcome of 3 September 2026 appoints Helena Susan as Head – Human Resources and designates her Senior Management Personnel, with immediate effect. A named HR head scores the full 0.25.",
          "Shanthi Gears board outcome, 3 September 2026",
          "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf",
        ],
        [
          "The same filing places the whole-time director in Coimbatore. It does not mention Pune, so Pune scores 0.",
          "Shanthi Gears board outcome, 3 September 2026",
          "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf",
        ],
        [
          "The filing names M. Karunakaran as Whole-time Director and CEO, Sai Krishna Alluri as Chief Financial Officer, and Helena Susan as Head – Human Resources. All three Saavi seats are named, so persona scores 0.20.",
          "Shanthi Gears board outcome, 3 September 2026",
          "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf",
        ],
        [
          "A public LinkedIn company page is stored for the legal name. Open it and confirm the name, gears, and Coimbatore. That verification scores 0.20. Do not replace the Moneycontrol sales line with a revenue range on the page.",
          "LinkedIn company page, Shanthi Gears",
          "https://www.linkedin.com/company/shanthigears",
        ],
      ],
    ),
    people: [
      person({
        name: "Helena Susan",
        title: "Head – Human Resources",
        buyingRole: "HR owner",
        why: "She is the named HR head from 3 September 2026. Festival, onboarding, and employee gifting starts with this seat.",
        linkedinUrl: peopleSearch("Helena Susan", "Shanthi Gears"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to her.",
        sourceLabel: "Shanthi Gears board outcome, 3 September 2026",
        sourceUrl: "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf",
      }),
      person({
        name: "M. Karunakaran",
        title: "Whole-time Director and CEO",
        buyingRole: "Chief executive",
        why: "He is the named chief executive on the same filing. The artisan and brand story is his seat when HR wants a sponsor.",
        linkedinUrl: peopleSearch("M Karunakaran", "Shanthi Gears"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Shanthi Gears board outcome, 3 September 2026",
        sourceUrl: "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf",
      }),
      person({
        name: "Sai Krishna Alluri",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The board appointed him CFO on 3 September 2026, replacing the interim CFO. He owns the gifting budget.",
        linkedinUrl: peopleSearch("Sai Krishna Alluri", "Shanthi Gears"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Shanthi Gears board outcome, 3 September 2026",
        sourceUrl: "https://www.shanthigears.com/wp-content/uploads/2026/09/Outcome.pdf",
      }),
    ],
    checklist: [
      "Open the Moneycontrol sales line and confirm Mar 2026 still reads ₹518 crore.",
      "Open the 3 September 2026 board outcome and confirm Helena Susan, M. Karunakaran, and Sai Krishna Alluri.",
      "Open the LinkedIn company page and confirm Coimbatore and gears. Ignore any revenue range.",
      "Run each people search and keep the person only when the title still matches.",
    ],
  },
  {
    slug: "data-patterns",
    name: "Data Patterns",
    legalName: "Data Patterns (India) Limited",
    website: "https://www.datapatternsindia.com/",
    location:
      "Plot H9, Fourth Main Road, SIPCOT IT Park, Siruseri, Chennai 603103. These sources do not mention Pune.",
    whatTheyMake:
      "Defence and aerospace electronics. The product is recorded so you can recognise the company. It does not change the score.",
    revenueCrore: 924,
    revenueLabel: "₹924 crore standalone sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/datapatternsindia-DPI01/`,
    inBand: true,
    hrFit: "named",
    linkedinCompanyUrl: "https://www.linkedin.com/company/data-patterns-india-ltd",
    linkedinConfirms:
      "Open the company page and confirm Data Patterns, defence electronics, and India. A revenue range on that page can sit below ₹924 crore. Moneycontrol wins.",
    giftFit: SAAVI,
    factors: buildFactors(
      [20, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s standalone sales line for Mar 2026 is ₹924 crore, inside the band, so revenue scores 0.20. The audited results put revenue from operations at ₹924.77 crore and state that the company had no subsidiary, associate, or joint venture on 31 March 2026. There is no larger group line to apply.",
          "Moneycontrol profit and loss, Data Patterns",
          `${MC}/datapatternsindia-DPI01/`,
        ],
        [
          "The company senior-management page says Lakshminarayanan K.V. took over as VP-HR in January 2023. A named HR head scores 0.25.",
          "Data Patterns senior management",
          "https://www.datapatternsindia.com/aboutus/senior_management.php",
        ],
        [
          "The registered office on the FY26 results is Siruseri, Chennai. These sources do not mention Pune, so Pune scores 0.",
          "Data Patterns audited results, 31 March 2026",
          "https://www.datapatternsindia.com/investors/files/Audited-Financial-Results-Q4-&-FY-2025-26.pdf",
        ],
        [
          "The directors page names Srinivasagopalan Rangarajan as Chairman and Managing Director. The key-management page names Venkata Subramanian Venkatachalam as Chief Financial Officer. The senior-management page names the VP-HR. All three seats score 0.20.",
          "Data Patterns directors",
          "https://www.datapatternsindia.com/aboutus/directors.php",
        ],
        [
          "A public LinkedIn company page is stored. Open it and confirm the legal name, defence electronics, and an Indian headquarters. That check scores 0.20.",
          "LinkedIn company page, Data Patterns",
          "https://www.linkedin.com/company/data-patterns-india-ltd",
        ],
      ],
    ),
    people: [
      person({
        name: "Lakshminarayanan K.V.",
        title: "VP-HR",
        buyingRole: "HR owner",
        why: "The company page says he took over as VP-HR in January 2023. Corporate gifting sits with this seat.",
        linkedinUrl: "https://www.linkedin.com/in/lnhr",
        linkedinNote:
          "Public profile indexed for this name. Open it and confirm the current title still reads VP, Human Resources at Data Patterns.",
        sourceLabel: "Data Patterns senior management",
        sourceUrl: "https://www.datapatternsindia.com/aboutus/senior_management.php",
      }),
      person({
        name: "Srinivasagopalan Rangarajan",
        title: "Chairman and Managing Director",
        buyingRole: "Chief executive",
        why: "He is the named chairman and managing director. Use him when HR needs a sponsor for the gift story.",
        linkedinUrl: peopleSearch("Srinivasagopalan Rangarajan", "Data Patterns"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Data Patterns directors",
        sourceUrl: "https://www.datapatternsindia.com/aboutus/directors.php",
      }),
      person({
        name: "Venkata Subramanian Venkatachalam",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The key-management page names him CFO. The July 2026 AGM proceedings list the same office as Venkatachalam Venkata Subramanian. Confirm the spelling on the page, then treat him as the budget owner.",
        linkedinUrl: peopleSearch("Venkata Subramanian", "Data Patterns"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Data Patterns key management",
        sourceUrl: "https://www.datapatternsindia.com/aboutus/key_management.php",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm Mar 2026 sales still read ₹924 crore.",
      "Open the senior-management page and confirm Lakshminarayanan K.V. is still VP-HR.",
      "Open the directors page and the key-management page for the CEO and the CFO.",
      "Open his LinkedIn profile and confirm the HR title before a letter.",
    ],
  },
  {
    slug: "centum-electronics",
    name: "Centum Electronics",
    legalName: "Centum Electronics Limited",
    website: "https://www.centumelectronics.com/",
    location:
      "No. 44, KHB Industrial Area, Yelahanka Newtown, Bengaluru 560106. These sources do not mention Pune.",
    whatTheyMake:
      "Electronics design and manufacturing for defence, aerospace, space, and industrial customers. The product does not change the score.",
    revenueCrore: 962,
    revenueLabel: "₹962 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/centumelectronics-CE10/`,
    inBand: true,
    hrFit: "named",
    linkedinCompanyUrl: "https://www.linkedin.com/company/centumelectronics",
    linkedinConfirms:
      "Open the company page and confirm Centum Electronics, electronics manufacturing, and Bengaluru. Ignore any revenue range. Moneycontrol’s ₹962 crore consolidated sales line is the figure this desk uses.",
    giftFit: SAAVI,
    factors: buildFactors(
      [20, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s consolidated sales line for Mar 2026 is ₹962 crore, inside the band, so revenue scores 0.20. The prior column is ₹1,158 crore, which is over the ceiling. Use the latest year only.",
          "Moneycontrol profit and loss, Centum Electronics",
          `${MC}/centumelectronics-CE10/`,
        ],
        [
          "The management page lists Nanda Kishore Vempati with the other senior leaders. His public LinkedIn profile states Head of Human Resources at Centum Electronics. A named HR head scores 0.25. Confirm the title on the profile before a letter, because the management-page text fetched for this file does not print his designation next to the name.",
          "LinkedIn profile, Nandakishore Vempati",
          "https://www.linkedin.com/in/nandavempati",
        ],
        [
          "The contact page places the company in Yelahanka, Bengaluru. It does not mention Pune, so Pune scores 0.",
          "Centum Electronics contact details",
          "https://www.centumelectronics.com/contact-details/",
        ],
        [
          "The management page names Apparao Mallavarapu as Chairman and Managing Director and Sundararajan Parthasarathy as Chief Financial Officer. The HR seat is named on the indexed profile. All three seats score 0.20.",
          "Centum Electronics management",
          "https://www.centumelectronics.com/management/",
        ],
        [
          "A public LinkedIn company page is stored. Open it and confirm the legal name, electronics manufacturing, and Bengaluru. That check scores 0.20.",
          "LinkedIn company page, Centum Electronics",
          "https://www.linkedin.com/company/centumelectronics",
        ],
      ],
    ),
    people: [
      person({
        name: "Nanda Kishore Vempati",
        title: "Head of Human Resources",
        buyingRole: "HR owner",
        why: "The management page lists him, and the indexed profile states Head of Human Resources. Confirm that title, then start the gifting conversation here.",
        linkedinUrl: "https://www.linkedin.com/in/nandavempati",
        linkedinNote:
          "Public profile indexed for this name. The company management page lists him and does not print the designation in the text used here. Confirm the title on the profile.",
        sourceLabel: "Centum Electronics management",
        sourceUrl: "https://www.centumelectronics.com/management/",
      }),
      person({
        name: "Apparao V. Mallavarapu",
        title: "Chairman and Managing Director",
        buyingRole: "Chief executive",
        why: "The management page and the September 2026 investor presentation name him Chairman and Managing Director.",
        linkedinUrl: peopleSearch("Apparao Mallavarapu", "Centum Electronics"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Centum Electronics investor presentation, September 2026",
        sourceUrl: "https://www.centumelectronics.com/wp-content/uploads/2026/09/Investor_Presentation.pdf",
      }),
      person({
        name: "Sundararajan Parthasarathy",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The company told the exchanges he assumed the CFO office on 1 September 2025. The management page still lists him as CFO.",
        linkedinUrl: peopleSearch("Sundararajan Parthasarathy", "Centum Electronics"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Centum Electronics CFO appointment",
        sourceUrl: "https://www.centumelectronics.com/wp-content/uploads/2025/12/12.-Change-in-Mangement.pdf",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm consolidated Mar 2026 sales still read ₹962 crore. Do not use the ₹1,158 crore prior year.",
      "Open the management page and confirm Apparao Mallavarapu and Sundararajan Parthasarathy.",
      "Open Nanda Kishore Vempati’s profile and confirm Head of Human Resources before a letter.",
      "Open the LinkedIn company page and ignore any revenue range.",
    ],
  },
  {
    slug: "mtar-technologies",
    name: "MTAR Technologies",
    legalName: "MTAR Technologies Limited",
    website: "https://mtar.in/",
    location:
      "18, Technocrats Industrial Estate, Balanagar, Hyderabad 500037. These sources do not mention Pune.",
    whatTheyMake:
      "Precision engineered systems for clean energy, aerospace, and defence. The product does not change the score.",
    revenueCrore: 876,
    revenueLabel: "₹876 crore standalone sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/mtartechnologies-MT15/`,
    inBand: true,
    hrFit: "named",
    linkedinCompanyUrl: "https://www.linkedin.com/company/mtar-technologies-ltd",
    linkedinConfirms:
      "Open the company page and confirm MTAR Technologies, precision engineering, and Hyderabad. A revenue range on the page can sit below ₹876 crore. Moneycontrol wins.",
    giftFit: SAAVI,
    factors: buildFactors(
      [20, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s default view is standalone, and the Mar 2026 sales line is ₹876 crore. The company’s own FY26 press release puts consolidated revenue from operations at ₹876.2 crore, so the group figure stays inside ₹500–1,000 crore. Revenue scores 0.20.",
          "Moneycontrol profit and loss, MTAR Technologies",
          `${MC}/mtartechnologies-MT15/`,
        ],
        [
          "A July 2026 post on the company LinkedIn page names Rama Mohan Rao Kasukurthi as Senior Vice President, Human Resources. A named HR head scores 0.25. His profile also lists a vice-president HR title. Confirm which title is current before a letter.",
          "MTAR Technologies LinkedIn post, 18 July 2026",
          "https://www.linkedin.com/posts/mtar-technologies-ltd_mtartechnologies-hitam-industryacademia-activity-7484172288796450816-wJ9y",
        ],
        [
          "The management page places the works in Balanagar, Hyderabad. It does not mention Pune, so Pune scores 0.",
          "MTAR Technologies management team",
          "https://mtar.in/management-team/",
        ],
        [
          "The management page names P. Srinivas Reddy as Managing Director and Gunneswara Rao Pusarla as Chief Financial Officer. The HR seat is named on the company post. All three seats score 0.20.",
          "MTAR Technologies management team",
          "https://mtar.in/management-team/",
        ],
        [
          "A public LinkedIn company page is stored. Open it and confirm the legal name, precision engineering, and Hyderabad. That check scores 0.20.",
          "LinkedIn company page, MTAR Technologies",
          "https://www.linkedin.com/company/mtar-technologies-ltd",
        ],
      ],
    ),
    people: [
      person({
        name: "Rama Mohan Rao Kasukurthi",
        title: "Senior Vice President, Human Resources",
        buyingRole: "HR owner",
        why: "The company’s own July 2026 post names him in Human Resources. Start the gifting conversation here after you confirm the title.",
        linkedinUrl: "https://www.linkedin.com/in/rama-mohan-rao-kasukurthi-3926b731",
        linkedinNote:
          "Public profile indexed for this name. The company post says Senior Vice President, Human Resources. The profile text used here says Vice President, HR and Admin. Confirm the current title.",
        sourceLabel: "MTAR Technologies LinkedIn post, 18 July 2026",
        sourceUrl:
          "https://www.linkedin.com/posts/mtar-technologies-ltd_mtartechnologies-hitam-industryacademia-activity-7484172288796450816-wJ9y",
      }),
      person({
        name: "P. Srinivas Reddy",
        title: "Managing Director",
        buyingRole: "Chief executive",
        why: "The management page names him Managing Director. He is the sponsor when HR wants the artisan story in front of the company.",
        linkedinUrl: peopleSearch("P Srinivas Reddy", "MTAR Technologies"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "MTAR Technologies management team",
        sourceUrl: "https://mtar.in/management-team/",
      }),
      person({
        name: "Gunneswara Rao Pusarla",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The management page names him Chief Financial Officer. He owns the gifting budget.",
        linkedinUrl: peopleSearch("Gunneswara Rao Pusarla", "MTAR Technologies"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "MTAR Technologies management team",
        sourceUrl: "https://mtar.in/management-team/",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm Mar 2026 sales still read ₹876 crore.",
      "Open the FY26 press release and confirm consolidated revenue from operations is still about ₹876.2 crore.",
      "Open the management page for P. Srinivas Reddy and Gunneswara Rao Pusarla.",
      "Open the July 2026 company post and Rama Mohan Rao Kasukurthi’s profile, and reconcile the HR title.",
    ],
  },
  {
    slug: "zen-technologies",
    name: "Zen Technologies",
    legalName: "Zen Technologies Limited",
    website: "https://www.zentechnologies.com/",
    location:
      "B-42, Industrial Estate, Sanath Nagar, Hyderabad 500018. The contact page does not mention Pune.",
    whatTheyMake:
      "Defence training simulators and counter-drone systems. The product does not change the score.",
    revenueCrore: 687,
    revenueLabel: "₹687 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/zentechnologies-ZT01/`,
    inBand: true,
    hrFit: "function",
    linkedinCompanyUrl: "https://www.linkedin.com/company/zen-technologies",
    linkedinConfirms:
      "Open the company page and confirm Zen Technologies, defence training systems, and India. Ignore any revenue range and any headquarters line that disagrees with the Sanath Nagar address. Moneycontrol’s ₹687 crore sales line wins.",
    giftFit: `${SAAVI} The HR office is real, and the named CHRO has left. Find the current head before a proposal.`,
    factors: buildFactors(
      [20, 12, 0, 12, 20],
      [
        [
          "Moneycontrol’s consolidated sales line for Mar 2026 is ₹687 crore, inside the band, so revenue scores 0.20. The prior column is ₹973 crore. Use the latest year only.",
          "Moneycontrol profit and loss, Zen Technologies",
          `${MC}/zentechnologies-ZT01/`,
        ],
        [
          "The company told the exchanges that Gowri Chintala Siddamshetty resigned as Chief Human Resource Officer with effect from the close of 4 July 2025. That filing proves an HR office. No later filing in this file names a successor, so the current head is not named and HR scores 0.12, not 0.25. The account stays in the file because the function is evidenced.",
          "Zen Technologies CHRO cessation",
          "https://www.zentechnologies.com/assets/uploads/files/change-in-senior-management-personnel.pdf",
        ],
        [
          "The contact page places the office at Sanath Nagar, Hyderabad. It does not mention Pune, so Pune scores 0.",
          "Zen Technologies contact",
          "https://www.zentechnologies.com/Contact-us/",
        ],
        [
          "The 2 February 2026 filing names Ashok Atluri as Chairman and Managing Director, with a re-appointment from 1 May 2026 subject to shareholders, and Hari Haran Chalat as Chief Financial Officer from 31 January 2026. Two of the three seats are named and the HR seat is vacant, so persona scores 0.12.",
          "Zen Technologies change in management, 2 February 2026",
          "https://www.zentechnologies.com/assets/uploads/files/change-in-management-on-2-feb-2026.pdf",
        ],
        [
          "A public LinkedIn company page is stored. Open it and confirm the legal name and defence training systems. That check scores 0.20.",
          "LinkedIn company page, Zen Technologies",
          "https://www.linkedin.com/company/zen-technologies",
        ],
      ],
    ),
    people: [
      person({
        name: "Ashok Atluri",
        title: "Chairman and Managing Director",
        buyingRole: "Chief executive",
        why: "The February 2026 filing identifies him as Chairman and Managing Director and recommends a fresh three-year term from 1 May 2026, subject to shareholders. Confirm that appointment before a letter.",
        linkedinUrl: peopleSearch("Ashok Atluri", "Zen Technologies"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Zen Technologies change in management, 2 February 2026",
        sourceUrl:
          "https://www.zentechnologies.com/assets/uploads/files/change-in-management-on-2-feb-2026.pdf",
      }),
      person({
        name: "Hari Haran Chalat",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The same filing appoints him Chief Financial Officer with effect from 31 January 2026. He is the budget seat.",
        linkedinUrl: peopleSearch("Hari Haran Chalat", "Zen Technologies"),
        linkedinNote:
          "No profile URL is stored. This opens a LinkedIn people search. Confirm the title before you write to him.",
        sourceLabel: "Zen Technologies change in management, 2 February 2026",
        sourceUrl:
          "https://www.zentechnologies.com/assets/uploads/files/change-in-management-on-2-feb-2026.pdf",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm consolidated Mar 2026 sales still read ₹687 crore.",
      "Do not write to Gowri Chintala Siddamshetty. The cessation filing relieves her from 4 July 2025.",
      "Look for a later filing that names the current HR head. Until that exists, this account stays medium.",
      "Confirm Ashok Atluri’s May 2026 re-appointment was approved by shareholders before using the title in a letter.",
    ],
  },
  {
    slug: "exicom-tele-systems",
    name: "Exicom Tele-Systems",
    legalName: "Exicom Tele-Systems Limited",
    website: "https://www.exicom.com/",
    location:
      "Corporate office at Plot 38, Sector 32, Gurugram 122001. Registered office in Solan, Himachal Pradesh. These pages do not mention Pune.",
    whatTheyMake:
      "EV charging and critical power. The product does not change the score. The group revenue does.",
    revenueCrore: 1152,
    revenueLabel:
      "₹1,152 crore consolidated revenue from operations, FY26 company results. Moneycontrol’s default sales line is standalone ₹894 crore.",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/exicomtele-systems-ETL01/`,
    inBand: false,
    hrFit: "named",
    linkedinCompanyUrl: "https://www.linkedin.com/company/exicomtelesystemslimited",
    linkedinConfirms:
      "Open the company page and confirm Exicom, EV charging or critical power, and India. Ignore any revenue range. The group figure in the FY26 results decides the band.",
    giftFit:
      "HR, the CEO, and the CFO are already on the company site. The group sales line is over ₹1,000 crore, so Saavi does not call this account.",
    factors: buildFactors(
      [0, 25, 0, 20, 20],
      [
        [
          "Moneycontrol’s default view is standalone, and Mar 2026 sales are ₹894 crore, which would pass the band. The company’s FY26 results put consolidated revenue from operations at ₹1,151.7 crore. The group figure decides, it is above ₹1,000 crore, and revenue scores 0.",
          "Exicom FY26 investor presentation",
          "https://www.bseindia.com/xml-data/corpfiling/AttachLive/30b0ed1c-5990-4ea9-a9fd-a6a757eea27e.pdf",
        ],
        [
          "The investor page names Pooja Duggal as Head of HR. The HR seat is real. It does not pull an over-band account onto the call list. The factor is recorded at 0.25 so the dossier shows what was found.",
          "Exicom investor relations, management",
          "https://www.exicom.com/investors",
        ],
        [
          "The investor page places the corporate office in Gurugram and the registered office in Solan. It does not mention Pune, so Pune scores 0.",
          "Exicom investor relations",
          "https://www.exicom.com/investors",
        ],
        [
          "The same page names Anant Nahata as Managing Director and CEO, Shiraz Khanna as CFO, and Pooja Duggal as Head of HR. All three seats are named. The revenue gate still cuts the account off.",
          "Exicom investor relations, management",
          "https://www.exicom.com/investors",
        ],
        [
          "A public LinkedIn company page is stored. It can confirm identity. It cannot put ₹1,152 crore back inside the band.",
          "LinkedIn company page, Exicom",
          "https://www.linkedin.com/company/exicomtelesystemslimited",
        ],
      ],
    ),
    people: [
      person({
        name: "Pooja Duggal",
        title: "Head of HR",
        buyingRole: "HR owner",
        why: "The company site names her as Head of HR. She would be the gifting seat if the group revenue were inside the band. It is not.",
        linkedinUrl: "https://www.linkedin.com/in/poojamukhiduggal",
        linkedinNote:
          "Public profile indexed for this name. The account is cut off on group revenue, so do not open a proposal.",
        sourceLabel: "Exicom investor relations, management",
        sourceUrl: "https://www.exicom.com/investors",
      }),
      person({
        name: "Anant Nahata",
        title: "Managing Director and CEO",
        buyingRole: "Chief executive",
        why: "The investor page names him Managing Director and CEO. Recorded so the standalone-sales trap is visible. Do not call.",
        linkedinUrl: peopleSearch("Anant Nahata", "Exicom"),
        linkedinNote:
          "No profile URL is stored. The account is cut off. A search is here only if you are checking the name.",
        sourceLabel: "Exicom investor relations, management",
        sourceUrl: "https://www.exicom.com/investors",
      }),
      person({
        name: "Shiraz Khanna",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The investor page names him CFO. Recorded with the other two seats. Do not call.",
        linkedinUrl: "https://www.linkedin.com/in/shiraz-khanna",
        linkedinNote:
          "Public profile indexed for this name. The account is cut off on group revenue.",
        sourceLabel: "Exicom investor relations, management",
        sourceUrl: "https://www.exicom.com/investors",
      }),
    ],
    checklist: [
      "Open Moneycontrol and see standalone Mar 2026 sales of ₹894 crore.",
      "Open the FY26 presentation and see consolidated revenue from operations of ₹1,151.7 crore.",
      "Leave the three named people in the file. Do not put the account on a call list.",
    ],
    cutoffReason:
      "Moneycontrol’s default sales line is standalone ₹894 crore. The company’s FY26 consolidated revenue from operations is ₹1,151.7 crore, above ₹1,000 crore. The group figure decides.",
  },
  {
    slug: "azad-engineering",
    name: "Azad Engineering",
    legalName: "Azad Engineering Limited",
    website: "https://azad.in/",
    location:
      "90/C, 90/D, 90/E, Phase-1, IDA Jeedimetla, Hyderabad 500055, on the team page. That page does not mention Pune.",
    whatTheyMake:
      "Precision components for aerospace, energy, and oil and gas. The product would not cut this account off. The missing HR seat does.",
    revenueCrore: 602,
    revenueLabel: "₹602 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/azadengineering-AEL02/`,
    inBand: true,
    hrFit: "none",
    linkedinCompanyUrl: "https://www.linkedin.com/company/azad-engineering-ltd",
    linkedinConfirms:
      "Open the company page and confirm Azad Engineering and Hyderabad. Identity can check out and the account can still be cut off, because no HR head is in this file.",
    giftFit:
      "The CEO and the CFO are public. Saavi still needs an HR seat. None is named on the team page or in a filing used here, so the account is cut off.",
    factors: buildFactors(
      [20, 0, 0, 12, 20],
      [
        [
          "Moneycontrol’s consolidated sales line for Mar 2026 is ₹602 crore, inside the band, so revenue would score 0.20. The HR gate still cuts the account off.",
          "Moneycontrol profit and loss, Azad Engineering",
          `${MC}/azadengineering-AEL02/`,
        ],
        [
          "The public team page names a chairman line, whole-time directors, a managing director, and a CFO. It does not name a Head of HR, a CHRO, or a VP-HR. No filing in this file shows an HR function. HR scores 0, and the account is cut off.",
          "Azad Engineering team",
          "https://azad.in/team/",
        ],
        [
          "The team page places the works in Jeedimetla, Hyderabad. It does not mention Pune, so Pune scores 0.",
          "Azad Engineering team",
          "https://azad.in/team/",
        ],
        [
          "MarketScreener lists Rakesh Chopdar as Chief Executive Officer and Ronak Jajoo as CFO. The HR seat is missing, so persona scores 0.12. That is not enough to stay on the call list.",
          "MarketScreener, Azad Engineering",
          "https://in.marketscreener.com/quote/stock/AZAD-ENGINEERING-LIMITED-163603431/company/",
        ],
        [
          "A public LinkedIn company page is stored and can confirm identity. It does not create an HR seat. The check is recorded at 0.20.",
          "LinkedIn company page, Azad Engineering",
          "https://www.linkedin.com/company/azad-engineering-ltd",
        ],
      ],
    ),
    people: [
      person({
        name: "Rakesh Chopdar",
        title: "Chairman and Chief Executive Officer",
        buyingRole: "Chief executive",
        why: "MarketScreener lists him as CEO, and his public profile says Chairman and CEO. He is not a substitute for a named HR head.",
        linkedinUrl: "https://www.linkedin.com/in/rakesh-chopdar",
        linkedinNote:
          "Public profile indexed for this name. The account is cut off until an HR seat is on a company page or a filing.",
        sourceLabel: "MarketScreener, Azad Engineering",
        sourceUrl:
          "https://in.marketscreener.com/quote/stock/AZAD-ENGINEERING-LIMITED-163603431/company/",
      }),
      person({
        name: "Ronak Jajoo",
        title: "Chief Financial Officer",
        buyingRole: "Finance owner",
        why: "The team page places Chief Financial Officer with his name, and MarketScreener lists the same office. The budget seat does not replace HR.",
        linkedinUrl: "https://www.linkedin.com/in/ronak-jajoo-79b57414",
        linkedinNote:
          "Public profile indexed for this name. Confirm the CFO title. Do not build a gifting proposal until HR is named.",
        sourceLabel: "Azad Engineering team",
        sourceUrl: "https://azad.in/team/",
      }),
    ],
    checklist: [
      "Open Moneycontrol and confirm consolidated Mar 2026 sales still read ₹602 crore.",
      "Open the team page and see that no HR head is listed.",
      "If a later company page or filing names an HR head, this account can be scored again.",
    ],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹602 crore, inside the band. The team page names the CFO and does not name an HR head, and no filing in this file shows an HR function.",
  },
  {
    slug: "windsor-machines",
    name: "Windsor Machines",
    legalName: "Windsor Machines Limited",
    website: "https://windsormachines.com/",
    location:
      "Confirm the city on the LinkedIn company page. No Pune site is stored in this file.",
    whatTheyMake:
      "Plastic processing machinery. The product does not change the score. No HR seat is stored here.",
    revenueCrore: 570,
    revenueLabel: "₹570 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/windsormachines-WM01/`,
    inBand: true,
    hrFit: "none",
    linkedinCompanyUrl: "https://www.linkedin.com/company/windsormachinesofficial",
    linkedinConfirms:
      "Open the company page to confirm the legal name and the city. A confirmed company page still leaves the account cut off until an HR seat is named.",
    giftFit:
      "Revenue is inside the band. Saavi still needs HR, and this file has no company page or filing that names one.",
    factors: buildFactors(
      [20, 0, 0, 4, 20],
      [
        [
          "Moneycontrol’s consolidated sales line for Mar 2026 is ₹570 crore, inside the band, so revenue would score 0.20. The HR gate still cuts the account off.",
          "Moneycontrol profit and loss, Windsor Machines",
          `${MC}/windsormachines-WM01/`,
        ],
        [
          "No company page or filing in this file names a Head of HR, a CHRO, a VP-HR, or an HR department. HR scores 0, and the account is cut off.",
          "Moneycontrol profit and loss, Windsor Machines",
          `${MC}/windsormachines-WM01/`,
        ],
        [
          "No source used here places a plant or an office in Pune, so Pune scores 0.",
          "LinkedIn company page, Windsor Machines",
          "https://www.linkedin.com/company/windsormachinesofficial",
        ],
        [
          "No CEO, CFO, or HR head is named from a company page or a filing in this file. Persona scores 0.04, the residual for seats you would still have to find.",
          "Moneycontrol profit and loss, Windsor Machines",
          `${MC}/windsormachines-WM01/`,
        ],
        [
          "A public LinkedIn company page is stored so identity can be checked. That check scores 0.20 and does not create an HR seat.",
          "LinkedIn company page, Windsor Machines",
          "https://www.linkedin.com/company/windsormachinesofficial",
        ],
      ],
    ),
    people: [],
    checklist: [
      "Open Moneycontrol and confirm consolidated Mar 2026 sales still read ₹570 crore.",
      "Find a company page or a filing that names the HR head before anyone builds a persona.",
    ],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹570 crore, inside the band. No company page or filing in this file shows an HR seat.",
  },
  {
    slug: "thermax",
    name: "Thermax",
    legalName: "Thermax Limited",
    website: "https://www.thermaxglobal.com/",
    location: "Pune headquarters, on the company’s FY25 corporate overview.",
    whatTheyMake: "Energy and environment systems. Far above this revenue band.",
    revenueCrore: 10694,
    revenueLabel: "₹10,694 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/thermax-T/`,
    inBand: false,
    hrFit: "none",
    giftFit: "A Pune name with an HR organisation in real life. The sales line is outside this motion, so the persona is not built here.",
    factors: buildFactors(
      [0, 0, 15, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹10,694 crore, above ₹1,000 crore. Revenue scores 0 and the account is cut off.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
        [
          "HR is not scored. The sales line already cuts the account off.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
        [
          "The FY25 corporate overview places the company in Pune, so Pune would score 0.15. It does not bring ₹10,694 crore into the band.",
          "Thermax FY25 corporate overview",
          "https://www.thermaxglobal.com/annual-reports/digital-annual-report-2024-25/corporate-overview.html",
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
        [
          "LinkedIn is not required once the sales line is outside the band.",
          "Moneycontrol profit and loss, Thermax",
          `${MC}/thermax-T/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Do not pull Thermax into this queue because the headquarters is in Pune."],
    cutoffReason: "Moneycontrol consolidated sales are ₹10,694 crore, above ₹1,000 crore.",
  },
  {
    slug: "bharat-forge",
    name: "Bharat Forge",
    legalName: "Bharat Forge Limited",
    website: "https://www.bharatforge.com/",
    location: "Pune. The cutoff is the sales line.",
    whatTheyMake: "Forgings and engineered components. Far above this revenue band.",
    revenueCrore: 16811,
    revenueLabel: "₹16,811 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/bharatforge-BF03/`,
    inBand: false,
    hrFit: "none",
    giftFit: "A familiar Pune manufacturer. The sales line swamps a ₹500–1,000 crore queue, so the persona is not built here.",
    factors: buildFactors(
      [0, 0, 15, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹16,811 crore, above ₹1,000 crore. Revenue scores 0 and the account is cut off.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "HR is not scored. The sales line already cuts the account off.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "Pune is the familiar headquarters and would score 0.15. It does not bring ₹16,811 crore into the band.",
          "Bharat Forge",
          "https://www.bharatforge.com/",
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
        [
          "LinkedIn is not required once the sales line is outside the band.",
          "Moneycontrol profit and loss, Bharat Forge",
          `${MC}/bharatforge-BF03/`,
        ],
      ],
    ),
    people: [],
    checklist: ["Do not pull Bharat Forge into this queue because the name is local."],
    cutoffReason: "Moneycontrol consolidated sales are ₹16,811 crore, above ₹1,000 crore.",
  },
  {
    slug: "sanghvi-movers",
    name: "Sanghvi Movers",
    legalName: "Sanghvi Movers Limited",
    website: "https://www.sanghvimovers.com/",
    location: "Do not assign a city from memory. The cutoff is the latest sales line.",
    whatTheyMake: "Crane rental. Close to the ceiling, and over it on the latest year.",
    revenueCrore: 1070,
    revenueLabel: "₹1,070 crore consolidated sales, Moneycontrol, year ended Mar 2026",
    period: "Mar 2026",
    moneycontrolUrl: `${MC}/sanghvimovers-SM10/`,
    inBand: false,
    hrFit: "none",
    giftFit: "The Mar 2025 column was inside the band. The latest year is the one that counts, and it is over the ceiling.",
    factors: buildFactors(
      [0, 0, 0, 0, 0],
      [
        [
          "Moneycontrol consolidated sales for Mar 2026 are ₹1,070 crore. The prior column, Mar 2025, is ₹782 crore and would have passed. Use the latest year only. Revenue scores 0.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "HR is not scored. The latest sales line already cuts the account off.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "No Pune site is established in this file, so Pune scores 0.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "Persona is not built.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
        [
          "LinkedIn is not required once the latest sales line is outside the band.",
          "Moneycontrol profit and loss, Sanghvi Movers",
          `${MC}/sanghvimovers-SM10/`,
        ],
      ],
    ),
    people: [],
    checklist: [
      "Open Moneycontrol and confirm the latest column is ₹1,070 crore, not the ₹782 crore year before it.",
    ],
    cutoffReason:
      "Moneycontrol consolidated sales are ₹1,070 crore for Mar 2026. The Mar 2025 figure of ₹782 crore is inside the band and is not the year this desk uses.",
  },
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
    if (ids.join() !== FACTOR_GUIDE.map((guide) => guide.id).join()) {
      throw new Error(`${account.slug} factor order`)
    }

    const inNumbers = account.revenueCrore >= 500 && account.revenueCrore <= 1000
    if (account.inBand !== inNumbers) {
      throw new Error(`${account.slug} band flag does not match ${account.revenueCrore}`)
    }
    if (!account.inBand && account.factors[0]?.points !== 0) {
      throw new Error(`${account.slug} scores revenue outside the band`)
    }
    if (account.inBand && account.hrFit === "named" && account.factors[1]?.points !== 25) {
      throw new Error(`${account.slug} named HR should score 25`)
    }
    if (account.inBand && account.hrFit === "function" && account.factors[1]?.points !== 12) {
      throw new Error(`${account.slug} HR function should score 12`)
    }
    if (account.inBand && account.hrFit === "none" && account.factors[1]?.points !== 0) {
      throw new Error(`${account.slug} missing HR should score 0`)
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

function decorate(account: Account): DeskAccount {
  const points = pointsOf(account)
  return {
    ...account,
    points,
    score: scoreOf(account),
    tier: tierOf(account),
  }
}

export const desk: DeskAccount[] = accounts.map(decorate)

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

export function byTier(tier: Tier) {
  return desk.filter((account) => account.tier === tier)
}

export { accounts }
