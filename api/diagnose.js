export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API sleutel niet geconfigureerd' });

  try {
    const { part, symptom, description } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: 'Je bent een ervaren fietsmonteur. Geef een duidelijke diagnose met: oorzaak, ernst (🟢/🟡/🔴), stappen, benodigdheden en wanneer naar de fietswinkel. Antwoord in het Nederlands.',
        messages: [{ role: 'user', content: `Onderdeel: ${part || '?'}\nKlacht: ${symptom || '?'}\nBeschrijving: ${description || '?'}` }],
      }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message });
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
    return res.status(200).json({ result: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
