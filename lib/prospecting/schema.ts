export const SCHEMA = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  hq_location TEXT,
  country TEXT,
  headcount INTEGER,
  revenue_inr_crore REAL,
  revenue_fiscal_year TEXT,
  revenue_basis TEXT,
  revenue_source_url TEXT,
  csr_obligated INTEGER,
  csr_rule_source_url TEXT,
  tag TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS executives (
  id INTEGER PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  persona TEXT NOT NULL,
  full_name TEXT,
  raw_title TEXT,
  proxy_title INTEGER NOT NULL DEFAULT 0,
  start_date TEXT,
  linkedin_url TEXT,
  linkedin_source TEXT,
  linkedin_pasted_by TEXT,
  linkedin_pasted_at TEXT,
  status TEXT NOT NULL,
  confidence INTEGER,
  verified_on TEXT,
  next_reverify_on TEXT
);

CREATE TABLE IF NOT EXISTS evidence (
  id INTEGER PRIMARY KEY,
  executive_id INTEGER REFERENCES executives(id) ON DELETE CASCADE,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  field TEXT NOT NULL,
  value TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  retrieved_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS signals (
  id INTEGER PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  published_at TEXT NOT NULL,
  matched_keywords TEXT NOT NULL,
  persona_relevance TEXT,
  score REAL NOT NULL,
  seasonal_multiplier REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS review_items (
  id INTEGER PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL,
  assignee TEXT,
  resolved_at TEXT
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  type TEXT NOT NULL,
  subject_type TEXT NOT NULL,
  subject_id INTEGER,
  payload TEXT NOT NULL,
  occurred_at TEXT NOT NULL
);
`
