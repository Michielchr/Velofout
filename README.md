# 🚴 VELOFOUT v2 — Fiets Diagnostics + Blog + Analytics

Volledige website met diagnose tool, fietsblog en analytics dashboard.

---

## 📁 Projectstructuur

```
velofout/
├── index.html              ← Startpagina (met Plausible analytics)
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example            ← Kopieer naar .env.local met jouw sleutels
├── supabase-schema.sql     ← Voer uit in Supabase voor analytics
├── sanity-schema/
│   └── post.js             ← Schema voor Sanity blog CMS
├── src/
│   ├── main.jsx            ← React startpunt
│   ├── App.jsx             ← Router (diagnose / blog)
│   ├── lib/
│   │   └── sanity.js       ← Sanity CMS verbinding
│   └── pages/
│       ├── DiagnosePage.jsx    ← Diagnose tool
│       ├── BlogListPage.jsx    ← Blog overzicht
│       └── BlogPostPage.jsx    ← Blog artikel
└── api/
    ├── diagnose.js         ← AI diagnose (veilige backend)
    └── analytics.js        ← Diagnose tracking naar Supabase
```

---

## 🚀 Stap-voor-stap live zetten

### Stap 1 — GitHub
1. Maak gratis account op [github.com](https://github.com)
2. Nieuw repository: `velofout` (Public)
3. Upload alle bestanden uit deze map

### Stap 2 — Vercel
1. Ga naar [vercel.com](https://vercel.com) → Sign up with GitHub
2. "Add New Project" → kies `velofout`
3. Deploy → na 1 minuut live op `velofout.vercel.app`

### Stap 3 — Eigen domein (~€10/jaar)
1. Koop `velofout.nl` bij [Antagonist.nl](https://antagonist.nl)
2. Vercel → Settings → Domains → voeg `velofout.nl` toe
3. Kopieer de DNS-instellingen naar Antagonist
4. Na max. 24 uur live op `velofout.nl`

---

## 📝 Blog instellen (Sanity CMS)

### Sanity account aanmaken
1. Ga naar [sanity.io](https://sanity.io) → gratis account
2. "Create new project" → naam: `velofout`
3. Noteer je **Project ID** (staat bovenaan)

### Sanity Studio instellen
```bash
npm create sanity@latest -- --project JOUW_PROJECT_ID --dataset production
```
Kopieer het bestand `sanity-schema/post.js` naar je Studio `schemas/` map.

### Blog koppelen
1. Voeg toe aan `.env.local`:
   ```
   VITE_SANITY_PROJECT_ID=jouw-project-id
   ```
2. Voeg toe in Vercel → Settings → Environment Variables:
   - `VITE_SANITY_PROJECT_ID` = jouw project ID

### Blog schrijven
Open je Sanity Studio op `localhost:3333` (of deploy het ook op Vercel).
Maak een nieuw "Blogbericht" aan — het verschijnt automatisch op je site!

---

## 📊 Analytics instellen

### Plausible (bezoekersstatistieken)
1. Ga naar [plausible.io](https://plausible.io) → gratis 30 dagen trial
2. Voeg je domein toe: `velofout.nl`
3. In `index.html` staat al het script — vervang `velofout.nl` door jouw domein
4. Daarna zie je in Plausible hoeveel bezoekers je hebt, welke pagina's populair zijn, etc.

### Supabase (diagnose data)
1. Ga naar [supabase.com](https://supabase.com) → gratis account
2. "New project" → naam: `velofout`
3. Ga naar **SQL Editor** en voer de inhoud van `supabase-schema.sql` uit
4. Ga naar **Settings → API** en kopieer:
   - Project URL → `SUPABASE_URL`
   - Service Role Key → `SUPABASE_SERVICE_KEY`
5. Voeg toe in Vercel → Environment Variables
6. Nu zie je in Supabase → Table Editor welke fietsproblemen het meest worden gesteld!

---

## 🤖 AI-diagnose instellen

1. Ga naar [console.anthropic.com](https://console.anthropic.com)
2. API Keys → Create Key → kopieer de sleutel
3. Vercel → Settings → Environment Variables:
   - `ANTHROPIC_API_KEY` = jouw sleutel
4. De "AI-diagnose" toggle in de app werkt nu

---

## 💰 Kosten overzicht

| Dienst | Gratis | Betaald |
|--------|--------|---------|
| Vercel hosting | ✅ Altijd gratis | Pro €20/maand bij veel verkeer |
| GitHub | ✅ Gratis | — |
| Domeinnaam .nl | — | ~€10/jaar |
| Sanity CMS | ✅ Gratis (3 gebruikers) | €15/maand voor team |
| Plausible analytics | ✅ 30 dagen trial | €9/maand |
| Supabase database | ✅ Gratis (500MB) | €25/maand |
| Anthropic AI | — | ~$0,003/diagnose |
| Bol.com affiliate | ✅ Gratis | Jij verdient commissie |

**Conclusie:** De basis draait volledig gratis. Je betaalt alleen voor het domein (~€10/jaar) en eventueel Plausible als je serieuze analytics wil.

---

## 🔍 SEO tips voor de blog

- Schrijf artikelen over **specifieke problemen**: "fiets knerpt bij traptrappen"
- Gebruik de **exacte zoektermen** die mensen intypen in je titels
- Voeg **affiliate links** toe aan relevante producten in de blog
- Elke blog heeft al een SEO-titel en beschrijving veld in Sanity
- Publiceer minimaal 1 artikel per week voor groei
