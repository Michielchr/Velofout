import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { getAllPosts } from "../lib/sanity.js";

const CATEGORIES = ["Alle", "Ketting", "Remmen", "Versnellingen", "E-bike", "Onderhoud", "Tips"];

const DEMO_POSTS = [
  { _id:"1", title:"Piepende remmen: 5 oorzaken en oplossingen", slug:{current:"piepende-remmen"}, publishedAt:"2026-03-15", excerpt:"Piepende remmen zijn niet alleen irritant, ze kunnen ook een teken zijn van slijtage. In dit artikel leggen we uit wat de oorzaak is en hoe je het zelf kunt oplossen.", category:"Remmen" },
  { _id:"2", title:"Bosch foutcode 503: zo los je het op in 5 minuten", slug:{current:"bosch-foutcode-503"}, publishedAt:"2026-03-08", excerpt:"Foutcode 503 is de meest voorkomende Bosch e-bike fout. Gelukkig is het bijna altijd zelf op te lossen.", category:"E-bike" },
  { _id:"3", title:"Wanneer moet je je ketting vervangen?", slug:{current:"ketting-vervangen"}, publishedAt:"2026-02-28", excerpt:"Een versleten ketting beschadigt je cassette en kettingbladen. Met een eenvoudige meting weet je precies wanneer het tijd is.", category:"Ketting" },
  { _id:"4", title:"Fiets schakelt slecht: oorzaken en afstelling", slug:{current:"fiets-schakelt-slecht"}, publishedAt:"2026-02-15", excerpt:"Slechte schakelkwaliteit is vaak een kwestie van kabelspanning. Met een schroevendraaier stel je je versnellingen zelf af.", category:"Versnellingen" },
  { _id:"5", title:"Complete gids voor fietsonderhoud in het voorjaar", slug:{current:"voorjaarsonderhoud-fiets"}, publishedAt:"2026-02-01", excerpt:"Na de winter heeft je fiets een grondige beurt nodig. Met deze checklist rijd je veilig het nieuwe seizoen in.", category:"Onderhoud" },
];

export default function BlogListPage({ navigate }) {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [activeCategory, setActiveCategory] = useState("Alle");

  useEffect(() => {
    getAllPosts().then(data => { if (data?.length) setPosts(data); }).catch(() => {});
  }, []);

  const filtered = activeCategory === "Alle" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .card:hover { border-color:#2a7de1 !important; transform:translateY(-2px); }
        .cat-btn:hover { color:#d4e5f0 !important; }
        .cat-active { color:#2a7de1 !important; border-bottom:2px solid #2a7de1 !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation:fadeUp 0.5s ease forwards; }
      `}</style>
      <Header navigate={navigate} activePath="/blog" />
      <main style={s.main}>
        <div className="fade-up" style={{marginBottom:36,borderLeft:"4px solid #2a7de1",paddingLeft:20}}>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:52,letterSpacing:6,lineHeight:1,marginBottom:10}}>FIETS<span style={{color:"#2a7de1"}}>BLOG</span></h1>
          <p style={{color:"#5a7a9a",fontSize:15,lineHeight:1.6,fontFamily:"'IBM Plex Mono',monospace"}}>Praktische tips, reparatiegidsen en ervaringen van een echte fietsmonteur.</p>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid #1a2433",marginBottom:32,flexWrap:"wrap"}}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-btn ${activeCategory===cat?"cat-active":""}`} style={s.catBtn} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {filtered.map(post => (
            <article key={post._id} className="card" style={s.card} onClick={() => navigate(`/blog/${post.slug?.current}`)}>
              <div style={{height:120,background:"linear-gradient(135deg,#0f1e30,#1a2d3d)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:36,opacity:0.4}}>🚴</span>
              </div>
              <div style={{padding:16}}>
                {post.category && <span style={s.catBadge}>{post.category}</span>}
                <h2 style={{fontFamily:"'IBM Plex Sans',sans-serif",fontSize:15,fontWeight:600,color:"#d4e5f0",lineHeight:1.4,margin:"8px 0"}}>{post.title}</h2>
                <p style={{fontSize:13,color:"#5a7a9a",lineHeight:1.6,marginBottom:14}}>{post.excerpt}</p>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#3a5a7a"}}>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"}) : ""}</span>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#2a7de1"}}>Lees meer →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <footer style={s.footer}><span>VELOFOUT © 2026</span><span style={{color:"#3ab07a"}}>■</span><span>Altijd een echte monteur raadplegen bij twijfel</span></footer>
    </div>
  );
}

const s = {
  root:{minHeight:"100vh",background:"#0b0f14",color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",display:"flex",flexDirection:"column"},
  header:{borderBottom:"1px solid #1a2433",position:"relative",overflow:"hidden"},
  accent:{position:"absolute",top:0,left:0,width:"100%",height:"3px",background:"linear-gradient(90deg,#2a7de1,#3ab07a,transparent)"},
  headerInner:{maxWidth:900,margin:"0 auto",padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"},
  backBtn:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:1,background:"transparent",border:"none",color:"#5a7a9a",cursor:"pointer"},
  main:{flex:1,maxWidth:900,width:"100%",margin:"0 auto",padding:"40px 24px"},
  catBtn:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:1,padding:"12px 16px",background:"transparent",border:"none",borderBottom:"2px solid transparent",color:"#3a5a7a",cursor:"pointer",transition:"all 0.15s",textTransform:"uppercase"},
  card:{background:"#0d1620",border:"1px solid #1a2d3d",borderRadius:4,cursor:"pointer",transition:"all 0.2s ease",overflow:"hidden"},
  catBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,letterSpacing:1,color:"#3ab07a",textTransform:"uppercase",background:"rgba(58,176,122,0.1)",padding:"2px 8px",borderRadius:2,display:"inline-block"},
  footer:{borderTop:"1px solid #1a2433",padding:"16px 24px",display:"flex",justifyContent:"center",gap:16,fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#333",letterSpacing:1},
};
