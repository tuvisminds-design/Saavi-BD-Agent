# Pune lead qualification desk

A working file for [IntelliBuddies](https://intellibuddies.com/) IB-X. It qualifies Pune heavy-equipment and process-equipment manufacturers with audited revenue above ₹500 crore, and it shows the decision makers named in public documents.

Each score is the sum of written factors. Every factor links to the annual report, exchange filing, company page, rating rationale, or article it came from, so a number can be checked before it is used.

## Runtime

- Node.js 26.11.1 or newer (current release used for this desk)
- React 19.3.0
- Next.js 16.4

The app refuses to start on an older Node. This environment’s default `node` can be an older binary that sits earlier on `PATH`. Put Node 26 first:

```bash
nvm install 26.11.1
export PATH="$HOME/.nvm/versions/node/v26.11.1/bin:$PATH"
node -v
npm install
npm run dev
```

Open [http://127.0.0.1:4179](http://127.0.0.1:4179).

## What is not in the product

The desk does not scrape LinkedIn and does not automate a login. Titles come from filings and company pages. If a revenue figure conflicts across public summaries, the account stays on Hold until the MCA financial statement or the annual report is read.
