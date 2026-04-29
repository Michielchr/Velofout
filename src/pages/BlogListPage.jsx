import { useState, useEffect } from "react";
import { getAllPosts } from "../lib/sanity.js";

const CATEGORIES = ["Alle", "Ketting", "Remmen", "Versnellingen", "E-bike", "Onderhoud", "Tips"];

// Fallback demo posts als Sanity nog niet is ingesteld
const DEMO_POSTS = [
  {
    _id: "1",
    title: "Piepende remmen: 5 oorzaken en oplossingen",
    slug: { current: "piepende-remmen" },
    publishedAt: "2026-03-15",
    excerpt: "Piepende remmen zijn niet alleen irritant, ze kunnen ook een teken zijn van slijtage. In dit artikel leggen we uit wat de oorzaak is en hoe je het zelf kunt oplossen.",
    category: "Remmen",
    imageUrl: null,
  },
  {
    _id: "2",
    title: "Bosch foutcode 503: zo los je het op in 5 minuten",
    slug: { current: "bosch-foutcode-503" },
    publishedAt: "2026-03-08",
    excerpt: "Foutcode 503 is de meest voorkomende Bosch e-bike fout. Gelukkig is het bijna altijd zelf op te lossen. We leggen stap voor stap uit hoe.",
    category: "E-bike",
    imageUrl: null,
  },
  {
    _id: "3",
    title: "Wanneer moet je je ketting vervangen?",
    slug: { current: "ketting-vervangen" },
    publishedAt: "2026-02-28",
    excerpt: "Een versleten ketting beschadigt je cassette en kettingbladen. Met een eenvoudige meting weet je precies wanneer het tijd is voor een nieuwe.",
    category: "Ketting",
    imageUrl: null,
  },
  {
    _id: "4",
    title: "Fiets schakelt slecht: oorzaken en afstelling",
    slug: { current: "fiets-schakelt-slecht" },
    publishedAt: "2026-02-15",
    excerpt: "Slechte schakelkwaliteit is vaak een kwestie van kabelspanning. Met een schroevendraaier en wat geduld stel je je versnellingen zelf af.",
    category: "Versnellingen",
    imageUrl: null,
  },
  {
    _id: "5",
    title: "Complete gids voor fietsonderhoud in het voorjaar",
    slug: { current: "voorjaarsonderhoud-fiets" },
    publishedAt: "2026-02-01",
    excerpt: "Na de winter heeft je fiets een grondige beurt nodig. Met deze checklist zorg je dat je veilig en soepel het nieuwe fietsseizoen in rijdt.",
    category: "Onderhoud",
    imageUrl: null,
  },
];

export default function BlogListPage({ navigate }) {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(data => { if (data?.length) setPosts(data); })
      .catch(() => {}) // gebruik demo posts als fallback
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "Alle"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card:hover { border-color: #2a7de1 !important; transform: translateY(-2px); }
        .cat-btn:hover { color: #d4e5f0 !important; }
        .cat-active { color: #2a7de1 !important; border-bottom: 2px solid #2a7de1 !important; }
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
              <div style={s.logoSub}>Fiets Blog</div>
            </div>
          </div>
          <button onClick={() => navigate("/")} style={s.backBtn}>← Diagnose</button>
        </div>
      </header>

      <main style={s.main}>
        {/* Hero */}
        <div style={s.hero} className="fade-up">
          <h1 style={s.heroTitle}>FIETS<span style={{color:"#2a7de1"}}>BLOG</span></h1>
          <p style={s.heroSub}>Praktische tips, reparatiegidsen en ervaringen van een echte fietsmonteur.</p>
        </div>

        {/* Category filter */}
        <div style={s.catBar}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "cat-active" : ""}`}
              style={s.catBtn}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div style={s.grid}>
          {filtered.map((post, i) => (
            <article
              key={post._id}
              className="card"
              style={{...s.card, animationDelay: `${i * 0.05}s`}}
              onClick={() => navigate(`/blog/${post.slug?.current || post._id}`)}
            >
              {post.imageUrl ? (
                <div style={{...s.cardImg, backgroundImage: `url(${post.imageUrl})`}} />
              ) : (
                <div style={s.cardImgPlaceholder}>
                  <span style={s.cardImgIcon}>🚴</span>
                </div>
              )}
              <div style={s.cardBody}>
                {post.category && <span style={s.cardCat}>{post.category}</span>}
                <h2 style={s.cardTitle}>{post.title}</h2>
                <p style={s.cardExcerpt}>{post.excerpt}</p>
                <div style={s.cardFooter}>
                  <span style={s.cardDate}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("nl-NL", { day:"numeric", month:"long", year:"numeric" }) : ""}
                  </span>
                  <span style={s.cardRead}>Lees meer →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
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
  headerInner: { maxWidth:900, margin:"0 auto", padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" },
  logoArea: { display:"flex", alignItems:"center", gap:12 },
  logoTitle: { fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:4, color:"#f0ede6", lineHeight:1 },
  logoSub: { fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#555", letterSpacing:2, textTransform:"uppercase" },
  backBtn: { fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1, background:"transparent", border:"none", color:"#5a7a9a", cursor:"pointer" },
  main: { flex:1, maxWidth:900, width:"100%", margin:"0 auto", padding:"40px 24px" },
  hero: { marginBottom:36, borderLeft:"4px solid #2a7de1", paddingLeft:20 },
  heroTitle: { fontFamily:"'Bebas Neue',sans-serif", fontSize:52, letterSpacing:6, lineHeight:1, marginBottom:10 },
  heroSub: { color:"#5a7a9a", fontSize:15, lineHeight:1.6, fontFamily:"'IBM Plex Mono',monospace" },
  catBar: { display:"flex", gap:0, borderBottom:"1px solid #1a2433", marginBottom:32, flexWrap:"wrap" },
  catBtn: { fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1, padding:"12px 16px", background:"transparent", border:"none", borderBottom:"2px solid transparent", color:"#3a5a7a", cursor:"pointer", transition:"all 0.15s", textTransform:"uppercase" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20 },
  card: { background:"#0d1620", border:"1px solid #1a2d3d", borderRadius:4, cursor:"pointer", transition:"all 0.2s ease", overflow:"hidden" },
  cardImg: { height:160, backgroundSize:"cover", backgroundPosition:"center" },
  cardImgPlaceholder: { height:140, background:"linear-gradient(135deg,#0f1e30,#1a2d3d)", display:"flex", alignItems:"center", justifyContent:"center" },
  cardImgIcon: { fontSize:40, opacity:0.4 },
  cardBody: { padding:"16px" },
  cardCat: { fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1, color:"#3ab07a", textTransform:"uppercase", background:"rgba(58,176,122,0.1)", padding:"2px 8px", borderRadius:2, marginBottom:10, display:"inline-block" },
  cardTitle: { fontFamily:"'IBM Plex Sans',sans-serif", fontSize:15, fontWeight:600, color:"#d4e5f0", lineHeight:1.4, marginBottom:8, marginTop:6 },
  cardExcerpt: { fontSize:13, color:"#5a7a9a", lineHeight:1.6, marginBottom:14 },
  cardFooter: { display:"flex", justifyContent:"space-between", alignItems:"center" },
  cardDate: { fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#3a5a7a" },
  cardRead: { fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#2a7de1", letterSpacing:1 },
  footer: { borderTop:"1px solid #1a2433", padding:"16px 24px", display:"flex", justifyContent:"center", gap:16, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#333", letterSpacing:1 },
};
