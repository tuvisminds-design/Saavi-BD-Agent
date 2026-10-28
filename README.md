# Saavi prospecting

Internal sales desk for [Saavi](https://saavi.tuvisminds.com/) corporate gifting. It lists Indian companies in the ₹100–5,000 crore sales band, keeps gift-buyer names only when a filing or company page supports them, and exports the book to Excel.

LinkedIn profile URLs are pasted by a rep, or imported later from a Sales Navigator CSV. The app builds a people-search link and does not request linkedin.com.

## Run

Node.js 26.11.1.

```bash
npm install
npm test
npm run dev
```

Open the desk from this agent on port 4179: http://127.0.0.1:4179. The capability card is http://127.0.0.1:4179/pbc. That address works on the computer running the desk. A browser on another computer cannot reach it.

The package is `pbc/saavi-prospecting.yaml`. Other Saavi software calls `/api/pbc` for the capability card, `/api/pbc/companies` for the book, and `/api/pbc/events` for the event channel.

`npm run dev` writes `data/prospects.db` on first launch and seeds 20 companies. Delete that file to seed again.

## What a rep does

1. Open a company. Named people show the source URL.
2. Open the LinkedIn search link in a logged-in browser and paste the `/in/` profile, with your name.
3. Capture a public gifting or CSR signal on the Signals page. A saved signal can move an in-band company from WARM to HOT.
4. Export Excel. Medium-confidence rows are yellow. Blank cells were not verified.

Owner defaults still in `config/icp.yaml`: India, priority cities Pune, Mumbai, Bengaluru, Hyderabad, and Delhi NCR, sales ₹100–5,000 crore. Confirm the band before a wider run.
