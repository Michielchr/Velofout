export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return res.status(200).json({ ok: true });
  try {
    const { event, part, symptom, isAI } = req.body;
    await fetch(`${SUPABASE_URL}/rest/v1/diagnose_events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_SERVICE_KEY, 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ event: event || 'diagnose', part: part || null, symptom: symptom || null, is_ai: isAI || false, created_at: new Date().toISOString() }),
    });
  } catch (_) {}
  return res.status(200).json({ ok: true });
}
