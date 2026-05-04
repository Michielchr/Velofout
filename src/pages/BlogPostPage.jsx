import { useState, useEffect } from "react";
import { getPostBySlug, portableTextToHtml } from "../lib/sanity.js";

const DEMO_CONTENT = {
  "piepende-remmen": { title:"Piepende remmen: 5 oorzaken en oplossingen", publishedAt:"2026-03-15", category:"Remmen", htmlContent:`<p>Piepende remmen zijn een van de meest voorkomende klachten. Het goede nieuws: in 9 van de 10 gevallen is het zelf op te lossen.</p><h2>Oorzaak 1: Vieze remblokken</h2><p>Als remblokken in aanraking komen met olie of vet, verliezen ze grip en gaan piepen. <strong>Oplossing:</strong> Schuur de remblokken licht op met 120-grit schuurpapier en reinig de velg met isopropylalcohol.</p><h2>Oorzaak 2: Verkeerde uitlijning</h2><p>Als de remblokken scheef op de velg staan, piepen ze bijna altijd. Ideaal is een kleine toe-in: de voorkant raakt de velg 0,5mm eerder dan de achterkant.</p><h2>Oorzaak 3: Natte omstandigheden</h2><p>In de regen piepen remmen altijd een beetje. Dit is normaal en verdwijnt zodra de velg droog is.</p><h2>Oorzaak 4: Nieuwe remblokken</h2><p>Nieuwe remblokken moeten eerst ingereden worden. Rem 20-30 keer stevig in vanuit fietssnelheid.</p><h2>Oorzaak 5: Versleten velg</h2><p>Een velg die aan het einde van zijn levensduur is kan ook piepen. Bekijk de zijkant — als er een inkeping zichtbaar is, is vervanging nodig.</p>` },
  "bosch-foutcode-503": { title:"Bosch foutcode 503: zo los je het op in 5 minuten", publishedAt:"2026-03-08", category:"E-bike", htmlContent:`<p>Foutcode 503 verschijnt op je Bosch display en de motorondersteuning valt weg. Maar het goede nieuws: je kunt dit bijna altijd zelf oplossen.</p><h2>Wat betekent foutcode 503?</h2><p>De snelheidssensor ontvangt geen signaal meer. De sensor zit op het frame en detecteert een magneet op een spaak. Als die magneet verschuift, verliest de sensor het signaal.</p><h2>Stap 1: Controleer de magneet</h2><p>Zoek de kleine magneet op je achterwiel. De ideale afstand is <strong>8 tot 14 millimeter</strong>.</p><h2>Stap 2: Uitlijnen</h2><p>Verplaats de magneet op de spaak zodat hij precies voor de sensor staat. Je kunt de magneet met de hand verschuiven.</p><h2>Stap 3: Herstart</h2><p>Schakel de e-bike uit, wacht 10 seconden en schakel weer in. In de meeste gevallen is de foutcode nu weg.</p>` },
};

export default function BlogPostPage({ slug, navigate }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostBySlug(slug)
      .then(data => {
        if (data) setPost({ ...data, htmlContent: portableTextToHtml(data.body || []) });
        else setPost(DEMO_CONTENT[slug] || null);
      })
      .catch(() => setPost(DEMO_CONTENT[slug] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{minHeight:"100vh",background:"#0b0f14",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'IBM Plex Mono',monospace",color:"#2a7de1",letterSpacing:2}}>LADEN...</div>;
  if (!post) return <div style={{minHeight:"100vh",background:"#0b0f14",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:"#2a7de1"}}>404</div><button onClick={() => navigate("/blog")} style={{background:"none",border:"1px solid #2a7de1",color:"#2a7de1",padding:"10px 20px",cursor:"pointer",fontFamily:"'IBM Plex Mono',monospace"}}>← Terug naar blog</button></div>;

  return (
    <div style={{minHeight:"100vh",background:"#0b0f14",color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .prose h2 { font-family:'Bebas Neue',sans-serif; font-size:26px; letter-spacing:3px; color:#d4e5f0; margin:32px 0 12px; }
        .prose p { font-size:15px; color:#8aaac0; line-height:1.8; margin-bottom:16px; }
        .prose strong { color:#d4e5f0; }
      `}</style>
      <header style={{borderBottom:"1px solid #1a2433",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,width:"100%",height:"3px",background:"linear-gradient(90deg,#2a7de1,#3ab07a,transparent)"}} />
        <div style={{maxWidth:740,margin:"0 auto",padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:4,color:"#f0ede6",cursor:"pointer"}} onClick={() => navigate("/")}>VELOFOUT</div>
          <button onClick={() => navigate("/blog")} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:1,background:"transparent",border:"none",color:"#5a7a9a",cursor:"pointer"}}>← Blog</button>
        </div>
      </header>
      <main style={{flex:1,maxWidth:740,width:"100%",margin:"0 auto",padding:"40px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          {post.category && <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,letterSpacing:1,color:"#3ab07a",textTransform:"uppercase",background:"rgba(58,176,122,0.1)",padding:"3px 10px",borderRadius:2}}>{post.category}</span>}
          {post.publishedAt && <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3a5a7a"}}>{new Date(post.publishedAt).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}</span>}
        </div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:42,letterSpacing:4,color:"#d4e5f0",lineHeight:1.1,marginBottom:24}}>{post.title}</h1>
        <div style={{height:1,background:"#1a2d3d",margin:"24px 0"}} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }} />
        <div style={{height:1,background:"#1a2d3d",margin:"32px 0"}} />
        <div style={{background:"#0d1620",border:"1px solid #1a2d3d",borderRadius:4,padding:24,textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3,marginBottom:8}}>Heb je zelf een fietsklacht?</div>
          <p style={{fontSize:13,color:"#5a7a9a",marginBottom:16,fontFamily:"'IBM Plex Mono',monospace"}}>Gebruik onze gratis diagnose tool.</p>
          <button style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:3,background:"#2a7de1",color:"#fff",border:"none",padding:"12px 32px",borderRadius:2,cursor:"pointer"}} onClick={() => navigate("/")}>→ GRATIS DIAGNOSE</button>
        </div>
      </main>
      <footer style={{borderTop:"1px solid #1a2433",padding:"16px 24px",display:"flex",justifyContent:"center",gap:16,fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#333",letterSpacing:1}}>
        <span>VELOFOUT © 2026</span><span style={{color:"#3ab07a"}}>■</span><span>Altijd een echte monteur raadplegen bij twijfel</span>
      </footer>
    </div>
  );
}
