# Lead qualification desk

A working file for [Saavi](https://saavi.tuvisminds.com/), sustainable corporate gifting from Pune. It qualifies Indian companies whose deciding Moneycontrol sales are between ₹500 crore and ₹1,000 crore and that show an HR function in public sources.

The buyer is HR, with the CEO and the CFO in the same pass. Industry does not decide the lead. The desk applies one score, from 0 to 1:

- Above 0.80: highly qualified
- 0.50 to 0.80: medium qualified
- Under 0.50, outside the band, or with no HR evidence: cut off

Pune adds points when a source shows a headquarters, a plant, or a branch. It is not a substitute for the revenue band or the HR seat. Familiar Pune manufacturers such as Thermax and Bharat Forge are above ₹1,000 crore on the latest Moneycontrol year, so they are cut off from this queue.

## Run

The app expects Node.js 26.11.1 or newer.

```bash
nvm install 26.11.1
export PATH="$HOME/.nvm/versions/node/v26.11.1/bin:$PATH"
npm install
npm run dev
```

Open [http://127.0.0.1:4179](http://127.0.0.1:4179).

The React screens are rendered by the Node server. The same scores are available as JSON:

- `GET /api/health`
- `GET /api/summary`
- `GET /api/accounts`
- `GET /api/accounts/:slug`

`npm run typecheck` checks TypeScript.

## Evidence

- Revenue is the latest annual Sales line on Moneycontrol, in ₹ crore.
- If that view is standalone and the company reports a larger group total, the group figure decides the band.
- HR is a Head of HR, CHRO, or VP-HR named on a company page, a filing, or a public profile. A vacated HR office can stay medium. No HR evidence is a cutoff.
- LinkedIn company pages and people searches verify identity and title. They are not scraped, and they do not set the revenue number.
- A person is named only when a company page, a filing report, or a public profile names them.
