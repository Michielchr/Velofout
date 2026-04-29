import { useState, useEffect } from "react";
import { getPostBySlug, portableTextToHtml } from "../lib/sanity.js";

// Demo content per slug als Sanity nog niet is ingesteld
const DEMO_CONTENT = {
  "piepende-remmen": {
    title: "Piepende remmen: 5 oorzaken en oplossingen",
    publishedAt: "2026-03-15",
    category: "Remmen",
    excerpt: "Piepende remmen zijn niet alleen irritant, ze kunnen ook een teken zijn van slijtage.",
    htmlContent: `
      <p>Piepende remmen zijn een van de meest voorkomende klachten die ik als fietsmonteur hoor. Het goede nieuws: in 9 van de 10 gevallen is het zelf op te lossen.</p>
      <h2>Oorzaak 1: Vieze of verglaasd remblokken</h2>
      <p>Dit is veruit de meest voorkomende oorzaak. Als remblokken in aanraking komen met olie of vet, verliezen ze grip en gaan piepen. Verglaasde remblokken ontstaan door hitte bij hard remmen.</p>
      <p><strong>Oplossing:</strong> Schuur de remblokken licht op met 120-grit schuurpapier en reinig de velg met isopropylalcohol.</p>
      <h2>Oorzaak 2: Verkeerde uitlijning</h2>
      <p>Als de remblokken scheef op de velg staan, piepen ze bijna altijd. Ideaal is een kleine 'toe-in': de voorkant van het remblok raakt de velg 0,5mm eerder dan de achterkant.</p>
      <p><strong>Oplossing:</strong> Stel de remblokken opnieuw in met een inbussleutel. Leg een dun stukje karton achter het remblok bij het vastdraaien voor de juiste hoek.</p>
      <h2>Oorzaak 3: Natte omstandigheden</h2>
      <p>In de regen piepen remmen altijd een beetje. Dit is normaal en verdwijnt zodra de velg droog is. Bij schijfremmen is dit minder een probleem.</p>
      <h2>Oorzaak 4: Nieuwe remblokken</h2>
      <p>Nieuwe remblokken moeten eerst 'ingereden' worden. Rem 20-30 keer stevig in vanuit fietssnelheid om de remblokken in te slijten op de velg.</p>
      <h2>Oorzaak 5: Versleten velg</h2>
      <p>Een velg die aan het einde van zijn levensduur is, kan ook piepen. Bekijk de zijkant van de velg: als er een gleuf of inkeping zichtbaar is, is de velg versleten en moet worden vervangen.</p>
      <h2>Conclusie</h2>
      <p>Begin altijd met reinigen en herspannen. Als het piepen blijft na het controleren van alle bovenstaande punten, is een bezoek aan de fietswinkel verstandig.</p>
    `,
  },
  "bosch-foutcode-503": {
    title: "Bosch foutcode 503: zo los je het op in 5 minuten",
    publishedAt: "2026-03-08",
    category: "E-bike",
    excerpt: "Foutcode 503 is de meest voorkomende Bosch e-bike fout.",
    htmlContent: `
      <p>Foutcode 503 verschijnt op je Bosch display en de motorondersteuning valt weg. Frustrerend — zeker als je onderweg bent. Maar het goede nieuws: je kunt dit bijna altijd zelf oplossen.</p>
      <h2>Wat betekent foutcode 503?</h2>
      <p>Foutcode 503 betekent dat de snelheidssensor geen signaal meer ontvangt. De sensor zit op het frame en detecteert een magneet die vastzit aan een spaak in het achterwiel. Als die magneet verschuift of de afstand te groot wordt, verliest de sensor het signaal.</p>
      <h2>Stap 1: Controleer de magneet</h2>
      <p>Zoek de kleine magneet op je achterwiel — die zit geklemd aan een spaak. Kijk of hij nog recht staat en op de juiste positie zit tegenover de sensor. De ideale afstand is <strong>8 tot 14 millimeter</strong>.</p>
      <h2>Stap 2: Uitlijnen</h2>
      <p>Verplaats de magneet op de spaak zodat hij precies voor de sensor staat als het wiel draait. Je kunt de magneet met de hand verschuiven — geen gereedschap nodig.</p>
      <h2>Stap 3: Herstart</h2>
      <p>Schakel de e-bike uit, wacht 10 seconden en schakel weer in. In de meeste gevallen is de foutcode nu weg.</p>
      <h2>Blijft de fout verschijnen?</h2>
      <p>Als foutcode 503 blijft terugkomen na het uitlijnen, controleer dan de kabel van de snelheidssensor op beschadiging. Is de kabel intact maar blijft de fout? Dan is de sensor zelf mogelijk defect en moet worden vervangen door een Bosch-dealer.</p>
    `,
  },
};

export default function BlogPostPage({ slug, navigate }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostBySlug(slug)
      .then(data => {
        if (data) {
          setPost({
            ...data,
            htmlContent: portableTextToHtml(data.body || []),
          });
        } else {
          // Gebruik demo content als fallback
          const demo = DEMO_CONTENT[slug];
          if (demo) setPost(demo);
        }
      })
      .catch(() => {
        const demo = DEMO_CONTENT[slug];
        if (demo) setPost(demo);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{...s.root, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={{fontFamily:"'IBM Plex Mono',monospace", color:"#2a7de1", letterSpacing:2}}>LADEN...</div>
    </div>
  );

  if (!post) return (
    <div style={{...s.root, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:48, color:"#2a7de1"}}>404</div>
        <p style={{color:"#5a7a9a", marginBottom:20}}>Artikel niet gevonden</p>
        <button onClick={() => navigate("/blog")} style={s.backBtn}>← Terug naar blog</button>
      </div>
    </div>
  );

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .prose h2 { font-family: 'Bebas Neue',sans-serif; font-size: 26px; letter-spacing: 3px; color: #d4e5f0; margin: 32px 0 12px; }
        .prose h3 { font-family: 'IBM Plex Mono',monospace; font-size: 13px; color: #2a9fd6; letter-spacing: 1px; text-transform: uppercase; margin: 24px 0 8px; }
        .prose p { font-size: 15px; color: #8aaac0; line-height: 1.8; margin-bottom: 16px; }
        .prose strong { color: #d4e5f0; }
        .prose blockquote { border-left: 3px solid #2a7de1; padding-left: 16px; color: #5a7a9a; font-style: italic; margin: 20px 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerAccent} />
        <div style={s.headerInner}>
          <div style={{...s.logoArea, cursor:"pointer"}} onClick={() => navigate("/")}>
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <circle cx="9" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="27" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="9" cy="27" r="2" fill="#3ab07a"/>
              <circle cx="27" cy="27" r="2" fill="#3ab07a"/>
              <path d="M9 27 L18 10 L27 27" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
              <path d="M14 20 L27 20" stroke="#fff" strokeWidth="2"/>
            </svg>
            <div>
              <div style={s.logoTitle}>VELOFOUT</div>
            </div>
          </div>
          <button onClick={() => navigate("/blog")} style={s.backBtn}>← Blog</button>
        </div>
      </header>

      <main style={s.main}>
        <article className="fade-up">
          {/* Meta */}
          <div style={s.meta}>
            {post.category && <span style={s.catBadge}>{post.category}</span>}
            {post.publishedAt && (
              <span style={s.date}>
                {new Date(post.publishedAt).toLocaleDateString("nl-NL", { day:"numeric", month:"long", year:"numeric" })}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={s.title}>{post.title}</h1>
          {post.excerpt && <p style={s.excerpt}>{post.excerpt}</p>}

          <div style={s.divider} />

          {/* Content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
          />

          <div style={s.divider} />

          {/* CTA naar diagnose tool */}
          <div style={s.ctaBlock}>
            <div style={s.ctaTitle}>Heb je zelf een fietsklacht?</div>
            <p style={s.ctaText}>Gebruik onze gratis diagnose tool en krijg direct advies.</p>
            <button style={s.ctaBtn} onClick={() => navigate("/")}>→ GRATIS DIAGNOSE</button>
          </div>
        </article>
      </main>

      <footer style={s.footer}>
        <span>VELOFOUT © 2026</span>
        <span style={{color:"#3ab07a"}}>■</span>
        <span>Altijd een echte monteur raadplegen bij twijfel</span>
      </footer>
    </div>
  );
}

const s = {
  root: { minHeight:"100vh", background:"#0b0f14", color:"#d4e5f0", fontFamily:"'IBM Plex Sans',sans-serif", display:"flex", flexDirection:"column" },
  header: { borderBottom:"1px solid #1a2433", position:"relative", overflow:"hidden" },
  headerAccent: { position:"absolute", top:0, left:0, width:"100%", height:"3px", background:"linear-gradient(90deg,#2a7de1,#3ab07a,transparent)" },
  headerInner: { maxWidth:740, margin:"0 auto", padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" },
  logoArea: { display:"flex", alignItems:"center", gap:12 },
  logoTitle: { fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:4, color:"#f0ede6", lineHeight:1 },
  backBtn: { fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1, background:"transparent", border:"none", color:"#5a7a9a", cursor:"pointer" },
  main: { flex:1, maxWidth:740, width:"100%", margin:"0 auto", padding:"40px 24px" },
  meta: { display:"flex", alignItems:"center", gap:12, marginBottom:16 },
  catBadge: { fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1, color:"#3ab07a", textTransform:"uppercase", background:"rgba(58,176,122,0.1)", padding:"3px 10px", borderRadius:2 },
  date: { fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"#3a5a7a" },
  title: { fontFamily:"'Bebas Neue',sans-serif", fontSize:42, letterSpacing:4, color:"#d4e5f0", lineHeight:1.1, marginBottom:16 },
  excerpt: { fontSize:16, color:"#5a7a9a", lineHeight:1.7, marginBottom:24, borderLeft:"3px solid #1a2d3d", paddingLeft:16 },
  divider: { height:1, background:"#1a2d3d", margin:"32px 0" },
  ctaBlock: { background:"#0d1620", border:"1px solid #1a2d3d", borderRadius:4, padding:"24px", textAlign:"center" },
  ctaTitle: { fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:3, marginBottom:8, color:"#d4e5f0" },
  ctaText: { fontSize:13, color:"#5a7a9a", marginBottom:16, fontFamily:"'IBM Plex Mono',monospace" },
  ctaBtn: { fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:3, background:"#2a7de1", color:"#fff", border:"none", padding:"12px 32px", borderRadius:2, cursor:"pointer" },
  footer: { borderTop:"1px solid #1a2433", padding:"16px 24px", display:"flex", justifyContent:"center", gap:16, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#333", letterSpacing:1 },
};
