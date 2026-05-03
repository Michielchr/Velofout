// api/diagnose.js — Vercel Serverless Function
// Veilige proxy voor de Anthropic API — sleutel staat NOOIT in de frontend

export default async function handler(req, res) {
  // Alleen POST toestaan
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // API sleutel uit omgevingsvariabele (stel in via Vercel dashboard)
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API sleutel niet geconfigureerd' })
  }

  try {
    const { part, symptom, description } = req.body

    const userMessage = `
Fietsonderdeel: ${part || 'Onbekend'}
Type klacht: ${symptom || 'Niet opgegeven'}
Beschrijving: ${description || 'Geen extra beschrijving'}
    `.trim()

    const systemPrompt = `Je bent een ervaren fietsmonteur met 20+ jaar ervaring. Je helpt fietsers bij het diagnosticeren van problemen met hun fiets.

Geef altijd:
1. **Waarschijnlijke oorzaak** – wat is er hoogstwaarschijnlijk aan de hand
2. **Ernst** – geef aan of dit veilig is om mee te rijden (🟢 Veilig / 🟡 Rij voorzichtig / 🔴 Niet mee rijden)
3. **Zelf oplossen** – stap-voor-stap instructie als het zelf oplosbaar is
4. **Benodigdheden** – gereedschap of onderdelen die nodig zijn
5. **Naar de fietswinkel?** – wanneer professionele hulp nodig is

Wees direct, praktisch en duidelijk. Gebruik Nederlandse fietstermen. Houd het beknopt maar volledig.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'API fout' })
    }

    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')

    return res.status(200).json({ result: text })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
