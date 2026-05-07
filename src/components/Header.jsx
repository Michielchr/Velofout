// src/components/Header.jsx
// Gedeelde header voor alle pagina's
// Vervang de HERO_IMAGE_URL door jouw eigen foto URL

// Gebruik een eigen foto door:
// 1. Upload je foto naar de /public map in GitHub (bijv. header-bg.jpg)
// 2. Verander de URL hieronder naar: "/header-bg.jpg"
// Of gebruik een directe link naar een online foto
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1600&q=80&fit=crop";

const NAV_ITEMS = [
  { label: "🔧 Diagnose", path: "/" },
  { label: "⚡ E-bike Codes", path: "/?tab=ebike" },
  { label: "📖 Blog", path: "/blog" },
];

export default function Header({ navigate, activePath }) {

  const handleNav = (path) => {
    if (path.startsWith("/?tab=")) {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new CustomEvent("velofout-tab", { detail: path.split("=")[1] }));
      window.scrollTo(0, 0);
    } else {
      navigate(path);
    }
  };

  return (
    <header style={s.header}>
      {/* Hero achtergrond foto */}
      <div style={s.heroBg} />
      <div style={s.heroOverlay} />

      {/* Logo + tagline */}
      <div style={s.heroContent}>
        <div style={s.logoRow} onClick={() => navigate("/")} >
          <svg width="44" height="44" viewBox="0 0 36 36" fill="none" style={{filter:"drop-shadow(0 2px 8px rgba(42,125,225,0.5))"}}>
            <circle cx="9" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
            <circle cx="27" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
            <circle cx="9" cy="27" r="2" fill="#3ab07a"/>
            <circle cx="27" cy="27" r="2" fill="#3ab07a"/>
            <path d="M9 27 L18 10 L27 27" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
            <path d="M14 20 L27 20" stroke="#fff" strokeWidth="2.5"/>
          </svg>
          <div>
            <div style={s.logoTitle}>VELOFOUT</div>
            <div style={s.logoSub}>Fiets Diagnostics & E-bike Foutcodes</div>
          </div>
        </div>

        {/* Nav knoppen */}
        <nav style={s.nav}>
          {NAV_ITEMS.map(item => {
            const isActive = activePath === item.path ||
              (item.path === "/" && activePath === "/") ||
              (item.path === "/blog" && activePath?.startsWith("/blog"));
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                style={{
                  ...s.navBtn,
                  ...(isActive ? s.navBtnActive : {}),
                }}
                className="header-nav-btn"
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .header-nav-btn:hover {
          background: rgba(42,125,225,0.25) !important;
          border-color: #2a7de1 !important;
          color: #fff !important;
          transform: translateY(-1px);
        }
      `}</style>
    </header>
  );
}

const s = {
  header: {
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid #1a2433",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${HERO_IMAGE_URL})`,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    filter: "brightness(0.35) saturate(0.7)",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(11,15,20,0.3) 0%, rgba(11,15,20,0.85) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: 900,
    margin: "0 auto",
    padding: "32px 24px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    cursor: "pointer",
    textAlign: "center",
  },
  logoTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 42,
    letterSpacing: 6,
    color: "#fff",
    lineHeight: 1,
    textShadow: "0 2px 20px rgba(42,125,225,0.4)",
  },
  logoSub: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: "#5a8ab0",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  navBtn: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 13,
    letterSpacing: 1,
    padding: "12px 24px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 3,
    color: "#8aaac0",
    cursor: "pointer",
    transition: "all 0.15s ease",
    backdropFilter: "blur(4px)",
    textTransform: "uppercase",
  },
  navBtnActive: {
    background: "rgba(42,125,225,0.2)",
    borderColor: "#2a7de1",
    color: "#fff",
  },
};
