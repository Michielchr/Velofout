import { useState } from "react";
import Header from "../components/Header.jsx";

// ─── E-bike Foutcodes Database ────────────────────────────────────────────────
const EBIKE_ERROR_CODES = {
  bosch: {
    name: "Bosch",
    codes: {
      "410":    { title:"Knop bedieningseenheid geblokkeerd", ernst:"🟡", beschrijving:"Knoppen geblokkeerd door vuil of klemmen.", oplossing:["Reinig de knoppen.", "Herstart systeem."], winkel:false, affiliate:[] },
      "414":    { title:"Display verbindingsfout", ernst:"🟡", beschrijving:"Display maakt geen contact. Vaak door corrosie op contactpunten.", oplossing:["Behandel contactpunten met contactspray.", "Controleer kabelverbindingen.", "Maak koperen contactpunten schoon."], winkel:false, affiliate:[{name:"Contactspray WD-40",price:"€11,95",url:"https://www.bol.com/nl/s/?searchtext=wd40+contactspray+elektrisch",tag:"Aanbevolen"}] },
      "418":    { title:"Knop bedieningseenheid geblokkeerd", ernst:"🟡", beschrijving:"Knoppen geblokkeerd.", oplossing:["Controleer en reinig de knoppen."], winkel:false, affiliate:[] },
      "422":    { title:"Verbindingsprobleem aandrijfeenheid", ernst:"🔴", beschrijving:"Verbindingsprobleem met de motor.", oplossing:["Controleer kabelverbindingen bij de motor.", "Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "423":    { title:"Verbindingsprobleem accu", ernst:"🟡", beschrijving:"Verbindingsprobleem met de accu.", oplossing:["Verwijder accu en plaats opnieuw.", "Controleer contactpunten.", "Herstart systeem."], winkel:false, affiliate:[] },
      "424":    { title:"Communicatiefout componenten", ernst:"🟡", beschrijving:"Onderlinge communicatie verstoord.", oplossing:["Controleer alle kabelverbindingen.", "Herstart systeem."], winkel:false, affiliate:[] },
      "426":    { title:"Interne tijdsoverschrijding", ernst:"🟡", beschrijving:"Tijdsoverschrijdingsfout.", oplossing:["Herstart systeem (10 seconden uit).", "Als fout blijft: naar dealer."], winkel:false, affiliate:[] },
      "430":    { title:"Interne display-accu leeg", ernst:"🟡", beschrijving:"De interne accu van het display is leeg.", oplossing:["Laad display op met hoofdaccu in fiets.", "Of laad display via mini USB."], winkel:false, affiliate:[{name:"Micro USB kabel 1m",price:"€6,95",url:"https://www.bol.com/nl/s/?searchtext=micro+usb+kabel+1+meter",tag:"Oplossing"}] },
      "440":    { title:"Interne fout aandrijfeenheid", ernst:"🔴", beschrijving:"Interne motorfout.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "450":    { title:"Interne softwarefout", ernst:"🔴", beschrijving:"Interne softwarefout.", oplossing:["Herstart systeem.", "Als fout blijft: dealer voor update."], winkel:true, affiliate:[] },
      "490":    { title:"Interne fout bedieningscomputer", ernst:"🔴", beschrijving:"Interne fout in display.", oplossing:["Laten controleren door dealer."], winkel:true, affiliate:[] },
      "500":    { title:"Interne fout aandrijfeenheid", ernst:"🔴", beschrijving:"Interne motorfout. Ook mogelijk door vocht op contactpunten.", oplossing:["Droog contactpunten af.", "Behandel met contactspray.", "Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[{name:"Contactspray CRC 2-26",price:"€9,95",url:"https://www.bol.com/nl/s/?searchtext=contactspray+crc+elektronisch",tag:"Onderhoud"}] },
      "502":    { title:"Verlichtingsfout", ernst:"🟡", beschrijving:"Fout in de fietsverlichting.", oplossing:["Controleer licht en bekabeling.", "Herstart systeem.", "Als fout blijft: naar dealer."], winkel:false, affiliate:[] },
      "503":    { title:"Snelheidssensor fout", ernst:"🟡", beschrijving:"Meest voorkomende Bosch foutcode. Sensor en magneet niet uitgelijnd (8-14mm).", oplossing:["Controleer positie magneet op spaak.", "Verplaats magneet (8-14mm afstand).", "Start systeem opnieuw op."], winkel:false, affiliate:[{name:"Bosch Snelheidssensor magneet set",price:"€8,95",url:"https://www.bol.com/nl/s/?searchtext=bosch+ebike+snelheidssensor+magneet",tag:"Onderdeel"},{name:"Kruiskopschroevendraaier Wera",price:"€19,95",url:"https://www.bol.com/nl/s/?searchtext=wera+kruiskop+schroevendraaier+set",tag:"Gereedschap"}] },
      "504":    { title:"Elektronische fout / tuning", ernst:"🔴", beschrijving:"Elektronische fout of manipulatie gedetecteerd.", oplossing:["Controleer magneetpositie (8-14mm).", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "510":    { title:"Interne sensorfout", ernst:"🔴", beschrijving:"Interne sensorfout.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "511":    { title:"Interne fout aandrijfeenheid", ernst:"🔴", beschrijving:"Interne fout.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "523001": { title:"Snelheidssensor fout (Smart System)", ernst:"🟡", beschrijving:"Opvolger van 503 in Bosch Smart Systeem.", oplossing:["Zelfde als 503: controleer magneet uitlijning (8-14mm).", "Start systeem opnieuw op."], winkel:false, affiliate:[{name:"Bosch Snelheidssensor magneet set",price:"€8,95",url:"https://www.bol.com/nl/s/?searchtext=bosch+ebike+snelheidssensor+magneet",tag:"Onderdeel"}] },
      "530":    { title:"Accufout", ernst:"🔴", beschrijving:"Fout in de accu.", oplossing:["Schakel fiets uit.", "Verwijder accu en plaats opnieuw.", "Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "531":    { title:"Configuratiefout", ernst:"🔴", beschrijving:"Configuratiefout.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "540":    { title:"Temperatuurfout", ernst:"🟡", beschrijving:"Motor buiten temperatuurbereik.", oplossing:["Schakel uit.", "Laat afkoelen of opwarmen.", "Herstart."], winkel:false, affiliate:[] },
      "550":    { title:"Niet toegestane verbruiker", ernst:"🟡", beschrijving:"Niet-toegestaan apparaat aangesloten.", oplossing:["Verwijder externe verbruiker.", "Herstart systeem."], winkel:false, affiliate:[] },
      "602":    { title:"Interne accufout (laden)", ernst:"🔴", beschrijving:"Accufout tijdens laden.", oplossing:["Koppel laadapparaat los.", "Herstart.", "Sluit opnieuw aan.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "603":    { title:"Interne accufout", ernst:"🔴", beschrijving:"Interne accufout.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "605":    { title:"Accutemperatuur fout", ernst:"🟡", beschrijving:"Accutemperatuur te hoog of laag.", oplossing:["Laat accu afkoelen/opwarmen naar 0-40°C.", "Herstart."], winkel:false, affiliate:[] },
      "606":    { title:"Externe accufout", ernst:"🟡", beschrijving:"Externe accufout, mogelijk bekabeling.", oplossing:["Controleer bekabeling accu.", "Herstart.", "Als fout blijft: naar dealer."], winkel:false, affiliate:[] },
      "610":    { title:"Accuspanningsfout", ernst:"🔴", beschrijving:"Accuspanning klopt niet.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "620":    { title:"Fout laadapparaat", ernst:"🔴", beschrijving:"Laadapparaat werkt niet.", oplossing:["Vervang het laadapparaat."], winkel:true, affiliate:[] },
      "640":    { title:"Interne accufout", ernst:"🔴", beschrijving:"Interne accufout.", oplossing:["Herstart systeem.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "655":    { title:"Meervoudige accufout", ernst:"🔴", beschrijving:"Meerdere accufouten.", oplossing:["Verwijder accu en plaats opnieuw.", "Herstart.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "656":    { title:"Software-versiefout", ernst:"🟡", beschrijving:"Softwareversie klopt niet.", oplossing:["Naar dealer voor software-update."], winkel:true, affiliate:[] },
    }
  },
  shimano: {
    name: "Shimano Steps",
    codes: {
      "W001": { title:"Magneetsensor fout", ernst:"🟡", beschrijving:"Snelheidssensor detecteert magneet niet.", oplossing:["Controleer positie magneet op spaak.", "Zorg voor 2mm afstand.", "Controleer kabelverbinding."], winkel:false, affiliate:[] },
      "W002": { title:"Cadanssensor fout", ernst:"🟡", beschrijving:"Cadanssensor werkt niet.", oplossing:["Controleer magneet bij trapas.", "Controleer bedrading.", "Reinig sensor."], winkel:false, affiliate:[] },
      "W010": { title:"Accufout", ernst:"🔴", beschrijving:"Fout in de accu.", oplossing:["Verwijder en herplaats accu.", "Controleer contactpunten.", "Probeer andere accu."], winkel:true, affiliate:[] },
      "W011": { title:"Accu losgekoppeld", ernst:"🟡", beschrijving:"Accu losgekoppeld tijdens gebruik.", oplossing:["Controleer accuvergrendeling.", "Zorg dat accu correct geplaatst is."], winkel:false, affiliate:[] },
      "W013": { title:"Acculading kritiek laag", ernst:"🟡", beschrijving:"Minder dan 5% lading over.", oplossing:["Laad accu zo snel mogelijk op."], winkel:false, affiliate:[] },
      "W014": { title:"Accutemperatuur fout", ernst:"🔴", beschrijving:"Accutemperatuur te hoog of laag.", oplossing:["Laat accu afkoelen of opwarmen naar 0-40°C."], winkel:false, affiliate:[] },
      "W101": { title:"Motortemperatuur te hoog", ernst:"🟡", beschrijving:"Motor oververhit.", oplossing:["Stop en laat 10 min afkoelen.", "Schakel naar lagere ondersteuning."], winkel:false, affiliate:[] },
      "W301": { title:"Display communicatiefout", ernst:"🔴", beschrijving:"Display communiceert niet.", oplossing:["Herplaats display.", "Controleer E-tube kabel.", "Reset via E-TUBE app."], winkel:true, affiliate:[] },
    }
  },
  yamaha: {
    name: "Yamaha",
    codes: {
      "01": { title:"Motorfout", ernst:"🔴", beschrijving:"Algemene motorfout.", oplossing:["Zet fiets uit en aan.", "Controleer kabelverbindingen.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "02": { title:"Accufout", ernst:"🔴", beschrijving:"Fout in accu.", oplossing:["Verwijder en herplaats accu.", "Volledig opladen en opnieuw proberen."], winkel:true, affiliate:[] },
      "03": { title:"Displayfout", ernst:"🟡", beschrijving:"Communicatiefout display.", oplossing:["Herplaats display.", "Reset: 5 sec aan/uit-knop."], winkel:false, affiliate:[] },
      "04": { title:"Snelheidssensorfout", ernst:"🟡", beschrijving:"Snelheidssensor detecteert geen signaal.", oplossing:["Controleer magneetpositie (max. 3mm).", "Reinig sensor en magneet."], winkel:false, affiliate:[] },
      "07": { title:"Trapkrachtsensorfout", ernst:"🔴", beschrijving:"Torque sensor werkt niet.", oplossing:["Zet fiets uit en aan.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
      "08": { title:"Temperatuurfout motor", ernst:"🟡", beschrijving:"Motortemperatuur te hoog.", oplossing:["Stop.", "Wacht 15 minuten.", "Rij met lagere ondersteuning."], winkel:false, affiliate:[] },
      "09": { title:"Systeemfout", ernst:"🔴", beschrijving:"Algemene systeemfout.", oplossing:["Hard reset: houd aan/uit 10 sec ingedrukt.", "Als fout blijft: naar dealer."], winkel:true, affiliate:[] },
    }
  },
  bafang: {
    name: "Bafang",
    codes: {
      "C1": { title:"Communicatiefout controller", ernst:"🔴", beschrijving:"Controller communiceert niet met display.", oplossing:["Controleer connectors.", "Reset systeem."], winkel:true, affiliate:[] },
      "C2": { title:"Throttle fout", ernst:"🟡", beschrijving:"Gashendel geeft fout signaal.", oplossing:["Controleer throttle-verbinding.", "Kalibreer via display menu."], winkel:false, affiliate:[] },
      "C3": { title:"PAS sensorfout", ernst:"🟡", beschrijving:"Pedal Assist Sensor werkt niet.", oplossing:["Controleer PAS-magneetring bij trapas.", "Zorg voor minimaal 1mm speling."], winkel:false, affiliate:[{name:"Bafang PAS sensor + magneetring",price:"€12,95",url:"https://www.bol.com/nl/s/?searchtext=bafang+pas+sensor+magneetring",tag:"Vervanging"}] },
      "C4": { title:"Motorhall sensorfout", ernst:"🔴", beschrijving:"Hall-sensoren in motor geven fout signaal.", oplossing:["Zet systeem uit.", "Controleer motorkabel.", "Naar specialist."], winkel:true, affiliate:[] },
      "C5": { title:"Accu onderspanning", ernst:"🟡", beschrijving:"Accuspanning te laag.", oplossing:["Laad accu volledig op."], winkel:false, affiliate:[] },
      "C6": { title:"Controller oververhitting", ernst:"🟡", beschrijving:"Controller te warm.", oplossing:["Stop en laat afkoelen.", "Verminder belasting."], winkel:false, affiliate:[] },
      "C7": { title:"Motor oververhitting", ernst:"🟡", beschrijving:"Motor te warm.", oplossing:["Stop en laat 15 min afkoelen."], winkel:false, affiliate:[] },
      "C8": { title:"Accu overstroom", ernst:"🔴", beschrijving:"Te veel stroom uit accu.", oplossing:["Zet fiets onmiddellijk uit.", "Controleer op kortsluiting.", "Naar specialist."], winkel:true, affiliate:[] },
    }
  },
};

function lookupCode(brand, code) {
  // Probeer eerst localStorage (admin)
  try {
    const adminCodes = localStorage.getItem("velofout_ebike_codes");
    if (adminCodes) {
      const codes = JSON.parse(adminCodes);
      const match = codes.find(c =>
        c.merk.toLowerCase() === brand.toLowerCase() &&
        c.code.trim().toLowerCase() === code.trim().toLowerCase()
      );
      if (match) return {
        brand: match.merk, title: match.titel, ernst: match.ernst,
        beschrijving: match.beschrijving,
        oplossing: (match.oplossing || "").split("\n").filter(Boolean),
        winkel: match.winkel, affiliate: [],
      };
    }
  } catch (_) {}

  // Fallback hardcoded
  const brandEntry = Object.values(EBIKE_ERROR_CODES).find(b =>
    b.name.toLowerCase() === brand.toLowerCase()
  );
  if (!brandEntry) return null;
  const c = code.trim();
  const error = brandEntry.codes[c] || brandEntry.codes[c.toUpperCase()] ||
    Object.entries(brandEntry.codes).find(([k]) => k.toLowerCase() === c.toLowerCase())?.[1];
  return error ? { ...error, brand: brandEntry.name } : null;
}

const MERKEN = Object.values(EBIKE_ERROR_CODES).map(b => b.name);

export default function EbikePage({ navigate }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleLookup = () => {
    if (!selectedBrand || !code.trim()) return;
    const found = lookupCode(selectedBrand, code);
    setResult(found || null);
    setNotFound(!found);
  };

  const reset = () => { setResult(null); setNotFound(false); setCode(""); setSelectedBrand(""); };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0a0a0a} ::-webkit-scrollbar-thumb{background:#2a7de1;border-radius:3px}
        .chip:hover{background:#2a7de1 !important;color:#fff !important;border-color:#2a7de1 !important;}
        .chip.active{background:#2a7de1 !important;color:#fff !important;border-color:#2a7de1 !important;}
        .aff-card:hover{border-color:#2a7de1 !important;background:#0f1e2e !important;transform:translateX(3px);}
        input:focus{outline:none;border-color:#2a7de1 !important;}
        .search-btn:hover:not(:disabled){background:#1f6bc9 !important;transform:translateY(-2px);}
        .search-btn:disabled{opacity:0.4;cursor:not-allowed;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
        .slide-in{animation:slideIn 0.4s ease forwards;}
      `}</style>

      <Header navigate={navigate} activePath="/ebike" />

      <main style={s.main}>
        {!result && !notFound ? (
          <div className="fade-up">
            <div style={s.intro}>
              <p style={s.introText}>Voer de foutcode in van jouw e-bike motor en krijg direct uitleg en een oplossing.</p>
            </div>

            {/* Merk */}
            <section style={s.section}>
              <div style={s.sectionLabel}><span style={s.sectionNum}>01</span><span>Kies je merk</span></div>
              <div style={s.chips}>
                {MERKEN.map(merk => (
                  <button key={merk} className={`chip ${selectedBrand === merk ? "active" : ""}`} style={s.chip}
                    onClick={() => { setSelectedBrand(merk); setResult(null); setNotFound(false); }}>
                    {merk}
                  </button>
                ))}
              </div>
            </section>

            {/* Code invoer */}
            <section style={s.section}>
              <div style={s.sectionLabel}><span style={s.sectionNum}>02</span><span>Voer de foutcode in</span></div>
              <div style={{display:"flex", gap:10}}>
                <input
                  type="text"
                  value={code}
                  onChange={e => { setCode(e.target.value); setNotFound(false); }}
                  onKeyDown={e => e.key === "Enter" && handleLookup()}
                  placeholder="Bijv: 503 of W001 of 523001"
                  style={s.codeInput}
                />
                <button className="search-btn" style={s.searchBtn}
                  onClick={handleLookup}
                  disabled={!selectedBrand || !code.trim()}>
                  Zoek →
                </button>
              </div>
            </section>
          </div>
        ) : notFound ? (
          <div className="slide-in" style={s.resultCard}>
            <div style={s.resultTitle}>ONBEKENDE CODE</div>
            <div style={s.divider} />
            <p style={s.resultLine}>Code <strong style={{color:"#d4e5f0"}}>{code}</strong> is niet gevonden voor {selectedBrand}.</p>
            <p style={{...s.resultLine, marginTop:8}}>Raadpleeg de handleiding of neem contact op met een erkende dealer.</p>
            <div style={s.divider} />
            <button style={s.resetBtn} onClick={reset}>← Opnieuw zoeken</button>
          </div>
        ) : (
          <div className="slide-in">
            {/* Resultaat header */}
            <div style={s.resultTopBar}>
              <button style={s.resetBtn} onClick={reset}>← Opnieuw</button>
              <div style={{display:"flex", gap:8, alignItems:"center"}}>
                <span style={s.brandBadge}>{result.brand}</span>
                <span style={s.codeBadge}>Code {code}</span>
              </div>
            </div>

            <div style={s.resultCard}>
              <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:20}}>
                <span style={{fontSize:32}}>{result.ernst}</span>
                <div>
                  <div style={s.resultTitle}>{result.title}</div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: result.ernst === "🔴" ? "#e05c3a" : result.ernst === "🟡" ? "#e8b84b" : "#3ab07a", marginTop:4}}>
                    {result.ernst === "🔴" ? "Niet mee rijden" : result.ernst === "🟡" ? "Rij voorzichtig" : "Veilig"}
                  </div>
                </div>
              </div>

              <div style={s.divider} />

              <h3 style={s.heading}>Beschrijving</h3>
              <p style={s.resultLine}>{result.beschrijving}</p>

              <h3 style={s.heading}>Oplossing</h3>
              {(result.oplossing || []).map((stap, i) => (
                <div key={i} style={s.stap}>
                  <span style={s.stapNum}>{i + 1}</span>
                  <span style={s.stapText}>{stap}</span>
                </div>
              ))}

              <h3 style={s.heading}>Naar de fietswinkel?</h3>
              <p style={s.resultLine}>
                {result.winkel
                  ? "⚠️ Ja — deze fout vereist diagnose door een erkende dealer."
                  : "✅ Nee — je kunt dit zelf oplossen met bovenstaande stappen."}
              </p>

              {/* Affiliate */}
              {result.affiliate?.length > 0 && (
                <div style={{marginTop:24, borderTop:"1px solid #1a2d3d", paddingTop:20}}>
                  <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:"#d4e5f0"}}>🛒 AANBEVOLEN PRODUCTEN</span>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#444"}}>via Bol.com</span>
                  </div>
                  {result.affiliate.map((p, i) => (
                    <a key={i} href={p.url} target="_blank" rel="noopener noreferrer sponsored" className="aff-card"
                      style={{display:"block", background:"#0f0f0f", border:"1px solid #1a2d3d", borderRadius:3, padding:"12px 16px", marginBottom:8, textDecoration:"none", transition:"all 0.15s"}}>
                      <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                        <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#3ab07a", textTransform:"uppercase", background:"rgba(58,176,122,0.1)", padding:"2px 6px", borderRadius:2}}>{p.tag}</span>
                        <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#444"}}>Bol.com</span>
                      </div>
                      <div style={{fontSize:13, color:"#ccc", marginBottom:8}}>{p.name}</div>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        <span style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:"#f0ede6"}}>{p.price}</span>
                        <span style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"#2a7de1"}}>Bekijk →</span>
                      </div>
                    </a>
                  ))}
                  <p style={{fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#333", marginTop:8}}>* Gesponsorde links. Commissie zonder meerkosten voor jou.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer style={s.footer}>
        <span>VELOFOUT © 2026</span>
        <span style={{color:"#3ab07a"}}>■</span>
        <span>Altijd een erkende dealer raadplegen bij twijfel</span>
      </footer>
    </div>
  );
}

const s = {
  root:{minHeight:"100vh",background:"#0b0f14",color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",display:"flex",flexDirection:"column"},
  main:{flex:1,maxWidth:720,width:"100%",margin:"0 auto",padding:"40px 24px"},
  intro:{marginBottom:36},
  introText:{fontSize:15,color:"#5a7a9a",lineHeight:1.6,borderLeft:"3px solid #2a7de1",paddingLeft:16,fontFamily:"'IBM Plex Mono',monospace"},
  section:{marginBottom:36},
  sectionLabel:{display:"flex",alignItems:"center",gap:12,marginBottom:14,fontFamily:"'IBM Plex Mono',monospace",fontSize:12,letterSpacing:2,textTransform:"uppercase",color:"#888"},
  sectionNum:{color:"#3ab07a",fontWeight:600},
  chips:{display:"flex",flexWrap:"wrap",gap:8},
  chip:{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,padding:"8px 18px",background:"transparent",border:"1px solid #1e2d3d",color:"#8fa8c0",borderRadius:2,cursor:"pointer",transition:"all 0.15s ease"},
  codeInput:{flex:1,background:"#0d1620",border:"1px solid #1e2d3d",borderRadius:4,color:"#d4e5f0",fontFamily:"'IBM Plex Mono',monospace",fontSize:18,padding:"12px 16px",letterSpacing:3,transition:"border-color 0.2s"},
  searchBtn:{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,background:"#2a7de1",color:"#fff",border:"none",padding:"12px 24px",borderRadius:2,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 4px 20px rgba(42,125,225,0.3)"},
  resultTopBar:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,paddingBottom:16,borderBottom:"1px solid #1a2d3d"},
  brandBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#2a7de1",border:"1px solid #2a7de1",padding:"3px 10px",borderRadius:2,letterSpacing:1},
  codeBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#3ab07a",border:"1px solid #3ab07a",padding:"3px 10px",borderRadius:2,letterSpacing:1},
  resultCard:{background:"#0d1620",border:"1px solid #1a2d3d",borderRadius:4,padding:28},
  resultTitle:{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:4,color:"#d4e5f0"},
  divider:{height:1,background:"#1a2d3d",margin:"20px 0"},
  heading:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#2a9fd6",letterSpacing:2,textTransform:"uppercase",marginBottom:10,marginTop:20},
  resultLine:{fontSize:14,color:"#8aaac0",lineHeight:1.7},
  stap:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10},
  stapNum:{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#2a7de1",flexShrink:0,lineHeight:1.3},
  stapText:{fontSize:14,color:"#ccc",lineHeight:1.6},
  resetBtn:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:1,background:"transparent",border:"none",color:"#5a7a9a",cursor:"pointer",padding:0,transition:"color 0.15s"},
  footer:{borderTop:"1px solid #1a2433",padding:"16px 24px",display:"flex",justifyContent:"center",gap:16,fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#333",letterSpacing:1},
};
