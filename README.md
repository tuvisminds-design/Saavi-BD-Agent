# Pune lead desk

A qualification file for [IntelliBuddies](https://intellibuddies.com/) IB-X, aimed at heavy-equipment and process-equipment manufacturers in India with a Pune operating site and audited revenue above ₹500 crore.

IB-X is conversational AI, workflow, and RPA. It can run on-prem and connects to SAP, Oracle, and Microsoft 365. The desk does not pitch every name in Pune. It scores thirteen accounts from public sources and marks each one Pursue, Verify, or Hold.

## Run

The app expects Node.js 26.11.1 or newer. If an older `node` is first on `PATH`, put 26.11.1 ahead of it.

```bash
nvm install 26.11.1
export PATH="$HOME/.nvm/versions/node/v26.11.1/bin:$PATH"
npm install
npm run dev
```

The dev server listens on port 4179 and on `0.0.0.0`. Open [http://127.0.0.1:4179](http://127.0.0.1:4179).

`npm run typecheck` and `npm run lint` check the TypeScript and ESLint setup.

## Evidence rules

- A revenue figure is scored only when a filing, an annual report, or a rating rationale states it.
- A band (“over ₹500 crore”), a conflict between sources, or an undated foreign-currency claim does not qualify the account. The dossier says the figure is unverified.
- Each factor shows its points, a one-sentence justification, and a URL you can open.
- Decision makers are named only when a filing, a company page, a rating note, or a press report names them. The dossier says what to re-check and how strong the evidence is.
- Personal email addresses and phone numbers are not collected.
- Do not invent an ERP name, a street address, or a CIO. Where the source is silent, the file says so.

The score is computed in code: revenue scale 20, sector fit 15, Pune weight 10, process surface 20, named buying committee 15, public trigger 10, evidence quality 10. A company that sells industrial automation takes a further −15 and is Hold.

## LinkedIn

LinkedIn’s terms prohibit scraping, login automation, and bulk collection of profiles. This desk does not do that. It does not store LinkedIn URLs. If a profile snippet conflicts with a filing, the filing is used and the profile is left out.
