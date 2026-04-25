-- Supabase SQL — voer dit uit in je Supabase project onder SQL Editor

-- Tabel voor diagnose events
CREATE TABLE IF NOT EXISTS diagnose_events (
  id          BIGSERIAL PRIMARY KEY,
  event       TEXT NOT NULL DEFAULT 'diagnose',
  part        TEXT,
  symptom     TEXT,
  is_ai       BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Handige views voor je dashboard

-- Meest gestelde diagnoses per onderdeel
CREATE OR REPLACE VIEW top_parts AS
SELECT
  part,
  COUNT(*) AS aantal,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
FROM diagnose_events
WHERE part IS NOT NULL
GROUP BY part
ORDER BY aantal DESC;

-- Meest gestelde diagnoses per symptoom
CREATE OR REPLACE VIEW top_symptoms AS
SELECT
  symptom,
  COUNT(*) AS aantal
FROM diagnose_events
WHERE symptom IS NOT NULL
GROUP BY symptom
ORDER BY aantal DESC;

-- Diagnoses per dag (voor grafiek)
CREATE OR REPLACE VIEW diagnoses_per_day AS
SELECT
  DATE(created_at) AS dag,
  COUNT(*) AS totaal,
  SUM(CASE WHEN is_ai THEN 1 ELSE 0 END) AS ai_diagnoses,
  SUM(CASE WHEN NOT is_ai THEN 1 ELSE 0 END) AS kennisbank_diagnoses
FROM diagnose_events
GROUP BY DATE(created_at)
ORDER BY dag DESC;

-- AI vs kennisbank gebruik
CREATE OR REPLACE VIEW ai_vs_kennisbank AS
SELECT
  CASE WHEN is_ai THEN 'AI-diagnose' ELSE 'Kennisbank' END AS type,
  COUNT(*) AS aantal
FROM diagnose_events
GROUP BY is_ai;

-- Row Level Security (aanbevolen)
ALTER TABLE diagnose_events ENABLE ROW LEVEL SECURITY;

-- Alleen inserts vanuit backend toestaan (service key vereist)
CREATE POLICY "Backend kan inserten"
  ON diagnose_events FOR INSERT
  WITH CHECK (true);

-- Alleen lezen met service key (niet publiek)
CREATE POLICY "Alleen service key kan lezen"
  ON diagnose_events FOR SELECT
  USING (false); -- zet op true als je ook frontend-queries wil
