// api/analytics.js — Vercel Serverless Function
// Slaat diagnose-gebruik op in Supabase voor jouw dashboard

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  // Als Supabase niet is ingesteld, gewoon 200 teruggeven
  if (!supabaseUrl || !supabaseKey) {
    return res.status(200).json({ ok: true, note: 'Supabase not configured' });
  }

  try {
    const { event, part, symptom, isAI, userAgent } = req.body;

    await fetch(`${supabaseUrl}/rest/v1/diagnose_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        event: event || 'diagnose',
        part: part || null,
        symptom: symptom || null,
        is_ai: isAI || false,
        created_at: new Date().toISOString(),
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Stille fout — analytics mogen de app nooit blokkeren
    return res.status(200).json({ ok: true });
  }
}
