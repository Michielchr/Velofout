import { useState, useEffect } from "react";

// ─── Wachtwoord beveiliging ───────────────────────────────────────────────────
// Verander dit wachtwoord naar iets wat alleen jij weet!
const ADMIN_PASSWORD = "velofout2026";

// ─── Storage helpers ──────────────────────────────────────────────────────────
function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(`velofout_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveData(key, value) {
  localStorage.setItem(`velofout_${key}`, JSON.stringify(value));
}

// ─── Standaard data ───────────────────────────────────────────────────────────
const DEFAULT_PARTS = ["Ketting", "Remmen", "Versnellingen", "Trapas", "Wielen", "Banden", "Stuur", "Zadel", "Voorvork", "Pedalen"];
const DEFAULT_SYMPTOMS = ["Knerpend geluid", "Klikgeluid", "Piepend geluid", "Trillingen", "Slechte schakelkwaliteit", "Slechte remwerking", "Wiel loopt scheef", "Iets zit los", "Andere klacht"];
const DEFAULT_DIAGNOSES = [
  { id: "1", onderdeel: "Ketting", symptoom: "Knerpend geluid", ernst: "🟡", ernstLabel: "Rij voorzichtig", oorzaak: "De ketting is droog, vuil of versleten.", oplossing: "Reinig de ketting met ontvetter.\nBreng verse kettingolie aan.\nControleer slijtage met een kettingmeter.", benodigdheden: "Kettingolie, ontvetter, doek", winkel: "Vervang bij >0,75% slijtage." },
  { id: "2", onderdeel: "Remmen", symptoom: "Piepend geluid", ernst: "🟡", ernstLabel: "Rij voorzichtig", oorzaak: "Vieze of verglaasd remblokken, of olie op de velg.", oplossing: "Reinig velg en remblokken met isopropylalcohol.\nSchuur remblokken licht op met schuurpapier.\nStel toe-in in: voorkant raakt velg 0,5mm eerder.", benodigdheden: "Isopropylalcohol, doek, schuurpapier", winkel: "Bij remblokken dunner dan 1mm: direct vervangen." },
  { id: "3", onderdeel: "Remmen", symptoom: "Slechte remwerking", ernst: "🔴", ernstLabel: "Niet mee rijden", oorzaak: "Versleten remblokken, gerekte kabel of lucht in hydraulisch systeem.", oplossing: "Controleer dikte remblokken (min. 2-3mm).\nDraai cable-adjuster los voor meer kabelspanning.\nBij hydraulisch: controleer vloeistofniveau.", benodigdheden: "Inbussleutelset, nieuwe remblokken", winkel: "Bij hydraulische remmen met luchtige hendel: direct naar de fietswinkel." },
];
const DEFAULT_EBIKE_CODES = [
  { id: "1", merk: "Bosch", code: "503", titel: "Snelheidssensor fout", ernst: "🟡", beschrijving: "De snelheidssensor en magneet zijn niet goed uitgelijnd. Afstand moet 8-14mm zijn.", oplossing: "Controleer positie magneet op spaak.\nVerplaats magneet zodat hij uitlijnt (8-14mm afstand).\nStart systeem opnieuw op.", winkel: false },
  { id: "2", merk: "Bosch", code: "414", titel: "Display verbindingsfout", ernst: "🟡", beschrijving: "Display maakt geen contact. Vaak door corrosie op contactpunten.", oplossing: "Behandel contactpunten met contactspray.\nControleer alle kabelverbindingen.\nMaak koperen contactpunten schoon.", winkel: false },
  { id: "3", merk: "Shimano Steps", code: "W001", titel: "Magneetsensor fout", ernst: "🟡", beschrijving: "Snelheidssensor detecteert magneet niet.", oplossing: "Controleer positie magneet op spaak.\nZorg voor 2mm afstand tussen magneet en sensor.\nControleer kabelverbinding sensor.", winkel: false },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "diagnoses", label: "🔧 Diagnoses", icon: "🔧" },
  { id: "ebike", label: "⚡ E-bike Codes", icon: "⚡" },
  { id: "onderdelen", label: "⚙️ Onderdelen", icon: "⚙️" },
  { id: "symptomen", label: "📋 Symptomen", icon: "📋" },
];

const ERNST_OPTIONS = [
  { value: "🟢", label: "🟢 Veilig" },
  { value: "🟡", label: "🟡 Rij voorzichtig" },
  { value: "🔴", label: "🔴 Niet mee rijden" },
];

const MERKEN = ["Bosch", "Shimano Steps", "Yamaha", "Bafang", "Specialized", "Giant"];

export default function AdminPage({ navigate }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState("diagnoses");

  // Data states
  const [diagnoses, setDiagnoses] = useState(() => loadData("diagnoses", DEFAULT_DIAGNOSES));
  const [ebikeCodes, setEbikeCodes] = useState(() => loadData("ebike_codes", DEFAULT_EBIKE_CODES));
  const [parts, setParts] = useState(() => loadData("parts", DEFAULT_PARTS));
  const [symptoms, setSymptoms] = useState(() => loadData("symptoms", DEFAULT_SYMPTOMS));

  // Form states
  const [editingDiagnose, setEditingDiagnose] = useState(null);
  const [editingEbike, setEditingEbike] = useState(null);
  const [newPart, setNewPart] = useState("");
  const [newSymptom, setNewSymptom] = useState("");
  const [saved, setSaved] = useState(false);

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else { setPwError(true); setPw(""); }
  };

  // Save to localStorage
  useEffect(() => { saveData("diagnoses", diagnoses); }, [diagnoses]);
  useEffect(() => { saveData("ebike_codes", ebikeCodes); }, [ebikeCodes]);
  useEffect(() => { saveData("parts", parts); }, [parts]);
  useEffect(() => { saveData("symptoms", symptoms); }, [symptoms]);

  // ── Login scherm ─────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={s.root}>
      <style>{css}</style>
      <div style={s.loginWrap}>
        <div style={s.loginBox}>
          <div style={s.loginLogo}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <circle cx="9" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="27" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="9" cy="27" r="2" fill="#3ab07a"/><circle cx="27" cy="27" r="2" fill="#3ab07a"/>
              <path d="M9 27 L18 10 L27 27" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
              <path d="M14 20 L27 20" stroke="#fff" strokeWidth="2"/>
            </svg>
            <div style={s.loginTitle}>VELOFOUT</div>
          </div>
          <div style={s.loginSub}>BEHEERPANEEL</div>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Wachtwoord"
            style={{...s.input, ...(pwError ? {borderColor:"#e05c3a"} : {})}}
            autoFocus
          />
          {pwError && <p style={s.errorMsg}>Onjuist wachtwoord</p>}
          <button className="btn-primary" style={s.loginBtn} onClick={handleLogin}>INLOGGEN →</button>
          <button style={s.backLink} onClick={() => navigate("/")}>← Terug naar de site</button>
        </div>
      </div>
    </div>
  );

  // ── Admin paneel ─────────────────────────────────────────────────────────
  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerAccent} />
        <div style={s.headerInner}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <circle cx="9" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="27" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="9" cy="27" r="2" fill="#3ab07a"/><circle cx="27" cy="27" r="2" fill="#3ab07a"/>
              <path d="M9 27 L18 10 L27 27" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
              <path d="M14 20 L27 20" stroke="#fff" strokeWidth="2"/>
            </svg>
            <div>
              <div style={s.logoTitle}>VELOFOUT</div>
              <div style={s.logoSub}>Beheerpaneel</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {saved && <span style={s.savedBadge}>✓ Opgeslagen</span>}
            <button style={s.headerBtn} onClick={() => navigate("/")}>← Naar site</button>
            <button style={{...s.headerBtn, color:"#e05c3a"}} onClick={() => setAuthed(false)}>Uitloggen</button>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <div style={s.tabBar}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "admin-tab admin-tab-active" : "admin-tab"}
            style={s.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main style={s.main}>

        {/* ── DIAGNOSES TAB ──────────────────────────────────────────────── */}
        {activeTab === "diagnoses" && (
          <div>
            <div style={s.sectionHeader}>
              <div>
                <h2 style={s.sectionTitle}>Diagnoses Kennisbank</h2>
                <p style={s.sectionDesc}>Beheer de diagnoses die gebruikers krijgen op basis van onderdeel + klacht.</p>
              </div>
              <button className="btn-primary" style={s.addBtn} onClick={() => setEditingDiagnose({ id: Date.now().toString(), onderdeel: parts[0], symptoom: symptoms[0], ernst: "🟡", ernstLabel: "Rij voorzichtig", oorzaak: "", oplossing: "", benodigdheden: "", winkel: "" })}>
                + Nieuwe diagnose
              </button>
            </div>

            {/* Edit form */}
            {editingDiagnose && (
              <div style={s.editCard}>
                <div style={s.editCardTitle}>{editingDiagnose.id && diagnoses.find(d => d.id === editingDiagnose.id) ? "✏️ Diagnose bewerken" : "➕ Nieuwe diagnose"}</div>
                <div style={s.formGrid}>
                  <div style={s.formField}>
                    <label style={s.label}>Onderdeel</label>
                    <select style={s.select} value={editingDiagnose.onderdeel} onChange={e => setEditingDiagnose({...editingDiagnose, onderdeel: e.target.value})}>
                      {parts.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={s.formField}>
                    <label style={s.label}>Symptoom</label>
                    <select style={s.select} value={editingDiagnose.symptoom} onChange={e => setEditingDiagnose({...editingDiagnose, symptoom: e.target.value})}>
                      {symptoms.map(sym => <option key={sym}>{sym}</option>)}
                    </select>
                  </div>
                  <div style={s.formField}>
                    <label style={s.label}>Ernst</label>
                    <select style={s.select} value={editingDiagnose.ernst} onChange={e => {
                      const opt = ERNST_OPTIONS.find(o => o.value === e.target.value);
                      setEditingDiagnose({...editingDiagnose, ernst: e.target.value, ernstLabel: opt?.label.split(" ").slice(1).join(" ") || ""});
                    }}>
                      {ERNST_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div style={s.formField}>
                    <label style={s.label}>Benodigdheden</label>
                    <input style={s.input} value={editingDiagnose.benodigdheden} onChange={e => setEditingDiagnose({...editingDiagnose, benodigdheden: e.target.value})} placeholder="Kettingolie, inbussleutel..." />
                  </div>
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Waarschijnlijke oorzaak</label>
                  <textarea style={s.textarea} rows={3} value={editingDiagnose.oorzaak} onChange={e => setEditingDiagnose({...editingDiagnose, oorzaak: e.target.value})} placeholder="Beschrijf de meest waarschijnlijke oorzaak..." />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Oplossing stappen <span style={{color:"#3a5a7a",fontWeight:400}}>(één stap per regel)</span></label>
                  <textarea style={s.textarea} rows={5} value={editingDiagnose.oplossing} onChange={e => setEditingDiagnose({...editingDiagnose, oplossing: e.target.value})} placeholder="Stap 1&#10;Stap 2&#10;Stap 3" />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Advies fietswinkel</label>
                  <input style={s.input} value={editingDiagnose.winkel} onChange={e => setEditingDiagnose({...editingDiagnose, winkel: e.target.value})} placeholder="Wanneer naar de fietswinkel?" />
                </div>
                <div style={{display:"flex",gap:10,marginTop:8}}>
                  <button className="btn-primary" style={s.saveBtn} onClick={() => {
                    const exists = diagnoses.find(d => d.id === editingDiagnose.id);
                    if (exists) setDiagnoses(diagnoses.map(d => d.id === editingDiagnose.id ? editingDiagnose : d));
                    else setDiagnoses([...diagnoses, editingDiagnose]);
                    setEditingDiagnose(null);
                    showSaved();
                  }}>Opslaan</button>
                  <button style={s.cancelBtn} onClick={() => setEditingDiagnose(null)}>Annuleren</button>
                </div>
              </div>
            )}

            {/* Diagnose list */}
            <div style={s.list}>
              {diagnoses.map(d => (
                <div key={d.id} style={s.listItem}>
                  <div style={s.listItemLeft}>
                    <span style={s.ernstDot}>{d.ernst}</span>
                    <div>
                      <div style={s.listItemTitle}>{d.onderdeel} — {d.symptoom}</div>
                      <div style={s.listItemSub}>{d.oorzaak?.slice(0, 80)}{d.oorzaak?.length > 80 ? "..." : ""}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn-edit" style={s.editBtn} onClick={() => setEditingDiagnose({...d})}>Bewerken</button>
                    <button className="btn-delete" style={s.deleteBtn} onClick={() => { if(confirm("Verwijderen?")) { setDiagnoses(diagnoses.filter(x => x.id !== d.id)); showSaved(); } }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── E-BIKE CODES TAB ───────────────────────────────────────────── */}
        {activeTab === "ebike" && (
          <div>
            <div style={s.sectionHeader}>
              <div>
                <h2 style={s.sectionTitle}>E-bike Foutcodes</h2>
                <p style={s.sectionDesc}>Beheer foutcodes per merk. Gebruikers zoeken op merk + code.</p>
              </div>
              <button className="btn-primary" style={s.addBtn} onClick={() => setEditingEbike({ id: Date.now().toString(), merk: "Bosch", code: "", titel: "", ernst: "🟡", beschrijving: "", oplossing: "", winkel: false })}>
                + Nieuwe code
              </button>
            </div>

            {editingEbike && (
              <div style={s.editCard}>
                <div style={s.editCardTitle}>{ebikeCodes.find(e => e.id === editingEbike.id) ? "✏️ Code bewerken" : "➕ Nieuwe foutcode"}</div>
                <div style={s.formGrid}>
                  <div style={s.formField}>
                    <label style={s.label}>Merk</label>
                    <select style={s.select} value={editingEbike.merk} onChange={e => setEditingEbike({...editingEbike, merk: e.target.value})}>
                      {MERKEN.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div style={s.formField}>
                    <label style={s.label}>Foutcode</label>
                    <input style={s.input} value={editingEbike.code} onChange={e => setEditingEbike({...editingEbike, code: e.target.value})} placeholder="Bijv: 503 of W001" />
                  </div>
                  <div style={s.formField}>
                    <label style={s.label}>Ernst</label>
                    <select style={s.select} value={editingEbike.ernst} onChange={e => setEditingEbike({...editingEbike, ernst: e.target.value})}>
                      {ERNST_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div style={s.formField}>
                    <label style={s.label}>Naar fietswinkel?</label>
                    <select style={s.select} value={editingEbike.winkel ? "ja" : "nee"} onChange={e => setEditingEbike({...editingEbike, winkel: e.target.value === "ja"})}>
                      <option value="nee">Nee — zelf op te lossen</option>
                      <option value="ja">Ja — naar de dealer</option>
                    </select>
                  </div>
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Titel</label>
                  <input style={s.input} value={editingEbike.titel} onChange={e => setEditingEbike({...editingEbike, titel: e.target.value})} placeholder="Korte omschrijving van de fout" />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Beschrijving</label>
                  <textarea style={s.textarea} rows={3} value={editingEbike.beschrijving} onChange={e => setEditingEbike({...editingEbike, beschrijving: e.target.value})} placeholder="Wat betekent deze foutcode?" />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Oplossing <span style={{color:"#3a5a7a",fontWeight:400}}>(één stap per regel)</span></label>
                  <textarea style={s.textarea} rows={4} value={editingEbike.oplossing} onChange={e => setEditingEbike({...editingEbike, oplossing: e.target.value})} placeholder="Stap 1&#10;Stap 2&#10;Stap 3" />
                </div>
                <div style={{display:"flex",gap:10,marginTop:8}}>
                  <button className="btn-primary" style={s.saveBtn} onClick={() => {
                    const exists = ebikeCodes.find(e => e.id === editingEbike.id);
                    if (exists) setEbikeCodes(ebikeCodes.map(e => e.id === editingEbike.id ? editingEbike : e));
                    else setEbikeCodes([...ebikeCodes, editingEbike]);
                    setEditingEbike(null);
                    showSaved();
                  }}>Opslaan</button>
                  <button style={s.cancelBtn} onClick={() => setEditingEbike(null)}>Annuleren</button>
                </div>
              </div>
            )}

            <div style={s.list}>
              {ebikeCodes.map(e => (
                <div key={e.id} style={s.listItem}>
                  <div style={s.listItemLeft}>
                    <span style={s.ernstDot}>{e.ernst}</span>
                    <div>
                      <div style={s.listItemTitle}>{e.merk} — Code {e.code} — {e.titel}</div>
                      <div style={s.listItemSub}>{e.beschrijving?.slice(0, 80)}{e.beschrijving?.length > 80 ? "..." : ""}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn-edit" style={s.editBtn} onClick={() => setEditingEbike({...e})}>Bewerken</button>
                    <button className="btn-delete" style={s.deleteBtn} onClick={() => { if(confirm("Verwijderen?")) { setEbikeCodes(ebikeCodes.filter(x => x.id !== e.id)); showSaved(); } }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ONDERDELEN TAB ────────────────────────────────────────────── */}
        {activeTab === "onderdelen" && (
          <div>
            <div style={s.sectionHeader}>
              <div>
                <h2 style={s.sectionTitle}>Fietsonderdelen</h2>
                <p style={s.sectionDesc}>Deze onderdelen verschijnen als knoppen op de diagnosepagina.</p>
              </div>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:24}}>
              <input style={{...s.input, flex:1}} value={newPart} onChange={e => setNewPart(e.target.value)} onKeyDown={e => { if(e.key==="Enter" && newPart.trim()) { setParts([...parts, newPart.trim()]); setNewPart(""); showSaved(); }}} placeholder="Nieuw onderdeel toevoegen..." />
              <button className="btn-primary" style={s.addBtn} onClick={() => { if(newPart.trim()) { setParts([...parts, newPart.trim()]); setNewPart(""); showSaved(); } }}>+ Toevoegen</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {parts.map((p, i) => (
                <div key={i} style={s.tagItem}>
                  <span style={s.tagLabel}>{p}</span>
                  <button style={s.tagDelete} onClick={() => { setParts(parts.filter((_,j) => j !== i)); showSaved(); }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SYMPTOMEN TAB ─────────────────────────────────────────────── */}
        {activeTab === "symptomen" && (
          <div>
            <div style={s.sectionHeader}>
              <div>
                <h2 style={s.sectionTitle}>Klachten / Symptomen</h2>
                <p style={s.sectionDesc}>Deze symptomen verschijnen als knoppen op de diagnosepagina.</p>
              </div>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:24}}>
              <input style={{...s.input, flex:1}} value={newSymptom} onChange={e => setNewSymptom(e.target.value)} onKeyDown={e => { if(e.key==="Enter" && newSymptom.trim()) { setSymptoms([...symptoms, newSymptom.trim()]); setNewSymptom(""); showSaved(); }}} placeholder="Nieuwe klacht toevoegen..." />
              <button className="btn-primary" style={s.addBtn} onClick={() => { if(newSymptom.trim()) { setSymptoms([...symptoms, newSymptom.trim()]); setNewSymptom(""); showSaved(); } }}>+ Toevoegen</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {symptoms.map((sym, i) => (
                <div key={i} style={s.tagItem}>
                  <span style={s.tagLabel}>{sym}</span>
                  <button style={s.tagDelete} onClick={() => { setSymptoms(symptoms.filter((_,j) => j !== i)); showSaved(); }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer style={s.footer}>
        <span style={{color:"#3a5a7a"}}>VELOFOUT Beheerpaneel</span>
        <span style={{color:"#3ab07a"}}>■</span>
        <span style={{color:"#3a5a7a"}}>Wijzigingen worden automatisch opgeslagen</span>
      </footer>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:#0b0f14; }
  ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:#0b0f14; } ::-webkit-scrollbar-thumb { background:#2a7de1; border-radius:3px; }
  .btn-primary { background:#2a7de1 !important; color:#fff !important; }
  .btn-primary:hover { background:#1f6bc9 !important; transform:translateY(-1px); }
  .admin-tab:hover { color:#d4e5f0 !important; }
  .admin-tab-active { color:#2a7de1 !important; border-bottom:2px solid #2a7de1 !important; }
  .btn-edit:hover { border-color:#2a7de1 !important; color:#2a7de1 !important; }
  .btn-delete:hover { background:#e05c3a !important; border-color:#e05c3a !important; color:#fff !important; }
  select option { background:#0d1620; }
  input::placeholder { color:#2a4060; }
  textarea::placeholder { color:#2a4060; }
  input:focus, textarea:focus, select:focus { outline:none; border-color:#2a7de1 !important; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;

const s = {
  root:{minHeight:"100vh",background:"#0b0f14",color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",display:"flex",flexDirection:"column"},
  loginWrap:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24},
  loginBox:{background:"#0d1620",border:"1px solid #1a2d3d",borderRadius:8,padding:"40px 32px",width:"100%",maxWidth:360,textAlign:"center"},
  loginLogo:{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:8},
  loginTitle:{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:4,color:"#f0ede6"},
  loginSub:{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:3,color:"#3a5a7a",marginBottom:28,textTransform:"uppercase"},
  loginBtn:{width:"100%",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,border:"none",padding:"13px 0",borderRadius:3,cursor:"pointer",transition:"all 0.2s",marginTop:8},
  backLink:{background:"none",border:"none",color:"#3a5a7a",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,cursor:"pointer",marginTop:16,letterSpacing:1},
  errorMsg:{color:"#e05c3a",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,marginTop:8,letterSpacing:0.5},
  header:{borderBottom:"1px solid #1a2433",position:"relative",overflow:"hidden",flexShrink:0},
  headerAccent:{position:"absolute",top:0,left:0,width:"100%",height:"3px",background:"linear-gradient(90deg,#2a7de1,#3ab07a,transparent)"},
  headerInner:{maxWidth:1100,margin:"0 auto",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"},
  logoTitle:{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:4,color:"#f0ede6",lineHeight:1},
  logoSub:{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"#3a5a7a",letterSpacing:2},
  headerBtn:{background:"transparent",border:"none",color:"#5a7a9a",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,cursor:"pointer",letterSpacing:1},
  savedBadge:{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"#3ab07a",letterSpacing:1,border:"1px solid #3ab07a",padding:"3px 10px",borderRadius:2},
  tabBar:{borderBottom:"1px solid #1a2433",background:"#0b0f14",flexShrink:0,display:"flex",overflowX:"auto"},
  tab:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:1,padding:"14px 20px",background:"transparent",border:"none",borderBottom:"2px solid transparent",color:"#3a5a7a",cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",flexShrink:0},
  main:{flex:1,maxWidth:1100,width:"100%",margin:"0 auto",padding:"32px 24px"},
  sectionHeader:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,gap:16,flexWrap:"wrap"},
  sectionTitle:{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:3,color:"#d4e5f0",marginBottom:4},
  sectionDesc:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3a5a7a",letterSpacing:0.5},
  addBtn:{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,border:"none",padding:"10px 20px",borderRadius:3,cursor:"pointer",transition:"all 0.2s",flexShrink:0},
  editCard:{background:"#0d1822",border:"1px solid #1e3a50",borderRadius:6,padding:24,marginBottom:24,animation:"fadeUp 0.3s ease"},
  editCardTitle:{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,letterSpacing:1,color:"#2a9fd6",marginBottom:20,textTransform:"uppercase"},
  formGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,marginBottom:16},
  formField:{marginBottom:14},
  label:{display:"block",fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:1,color:"#5a7a9a",marginBottom:6,textTransform:"uppercase",fontWeight:500},
  input:{width:"100%",background:"#0b1520",border:"1px solid #1e2d3d",borderRadius:3,color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",fontSize:14,padding:"10px 12px",transition:"border-color 0.2s"},
  select:{width:"100%",background:"#0b1520",border:"1px solid #1e2d3d",borderRadius:3,color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",fontSize:14,padding:"10px 12px",transition:"border-color 0.2s",cursor:"pointer"},
  textarea:{width:"100%",background:"#0b1520",border:"1px solid #1e2d3d",borderRadius:3,color:"#d4e5f0",fontFamily:"'IBM Plex Sans',sans-serif",fontSize:14,padding:"10px 12px",resize:"vertical",lineHeight:1.6,transition:"border-color 0.2s"},
  saveBtn:{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,border:"none",padding:"10px 28px",borderRadius:3,cursor:"pointer",transition:"all 0.2s"},
  cancelBtn:{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,letterSpacing:1,background:"transparent",border:"1px solid #1e2d3d",color:"#5a7a9a",padding:"10px 20px",borderRadius:3,cursor:"pointer"},
  list:{display:"flex",flexDirection:"column",gap:8},
  listItem:{background:"#0d1620",border:"1px solid #1a2d3d",borderRadius:4,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},
  listItemLeft:{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0},
  listItemTitle:{fontFamily:"'IBM Plex Sans',sans-serif",fontSize:14,fontWeight:500,color:"#d4e5f0",marginBottom:2},
  listItemSub:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#3a5a7a"},
  ernstDot:{fontSize:18,flexShrink:0},
  editBtn:{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:1,background:"transparent",border:"1px solid #1e2d3d",color:"#5a7a9a",padding:"6px 14px",borderRadius:3,cursor:"pointer",transition:"all 0.15s"},
  deleteBtn:{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,background:"transparent",border:"1px solid #1e2d3d",color:"#5a7a9a",padding:"6px 10px",borderRadius:3,cursor:"pointer",transition:"all 0.15s"},
  tagItem:{display:"flex",alignItems:"center",gap:8,background:"#0d1620",border:"1px solid #1a2d3d",borderRadius:3,padding:"8px 12px"},
  tagLabel:{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#8aaac0"},
  tagDelete:{background:"none",border:"none",color:"#3a5a7a",cursor:"pointer",fontSize:12,padding:0,lineHeight:1},
  footer:{borderTop:"1px solid #1a2433",padding:"14px 24px",display:"flex",justifyContent:"center",gap:16,fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:1},
};
