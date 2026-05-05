import { useState, useRef, useEffect } from "react";
import { getAllDiagnoses } from "../lib/sanity.js";

// Affiliate producten per categorie — vervang links door jouw affiliate URLs
const AFFILIATE_PRODUCTS = {
  "Ketting": [
    { name: "Shimano HG701 11-speed ketting", price: "€19,99", shop: "Bol.com", tag: "Populair", url: "https://www.bol.com/nl/s/?searchtext=shimano+ketting+11+speed" },
    { name: "KMC X11 ketting", price: "€24,95", shop: "Bol.com", tag: "Top kwaliteit", url: "https://www.bol.com/nl/s/?searchtext=kmc+x11+ketting" },
    { name: "Kettingreiniger Park Tool CG-2.4", price: "€34,95", shop: "Bol.com", tag: "Gereedschap", url: "https://www.bol.com/nl/s/?searchtext=park+tool+kettingreiniger" },
  ],
  "Remmen": [
    { name: "Shimano BR-MT200 hydraulische remmen", price: "€49,99", shop: "Bol.com", tag: "Populair", url: "https://www.bol.com/nl/s/?searchtext=shimano+hydraulische+remmen" },
    { name: "Remblokjes set universeel", price: "€8,95", shop: "Bol.com", tag: "Voordelig", url: "https://www.bol.com/nl/s/?searchtext=fiets+remblokjes" },
    { name: "Remkabel set Jagwire", price: "€12,50", shop: "Bol.com", tag: "Compleet", url: "https://www.bol.com/nl/s/?searchtext=jagwire+remkabel" },
  ],
  "Versnellingen": [
    { name: "Shimano Deore RD-M5120 derailleur", price: "€39,95", shop: "Bol.com", tag: "Betrouwbaar", url: "https://www.bol.com/nl/s/?searchtext=shimano+deore+derailleur" },
    { name: "Schakelkabel set Jagwire", price: "€14,95", shop: "Bol.com", tag: "Populair", url: "https://www.bol.com/nl/s/?searchtext=jagwire+schakelkabel" },
    { name: "Kettingspanner Park Tool", price: "€22,00", shop: "Bol.com", tag: "Gereedschap", url: "https://www.bol.com/nl/s/?searchtext=park+tool+kettingspanner" },
  ],
  "Trapas": [
    { name: "Shimano BB-MT800 trapas", price: "€44,95", shop: "Bol.com", tag: "Duurzaam", url: "https://www.bol.com/nl/s/?searchtext=shimano+trapas" },
    { name: "Trapas montageset", price: "€18,50", shop: "Bol.com", tag: "Gereedschap", url: "https://www.bol.com/nl/s/?searchtext=trapas+gereedschap" },
  ],
  "Banden": [
    { name: "Continental Grand Prix 5000 28mm", price: "€49,95", shop: "Bol.com", tag: "Premium", url: "https://www.bol.com/nl/s/?searchtext=continental+grand+prix+5000" },
    { name: "Schwalbe Marathon Plus 28x1.75", price: "€34,95", shop: "Bol.com", tag: "Populair", url: "https://www.bol.com/nl/s/?searchtext=schwalbe+marathon+plus" },
    { name: "Bandenlichters set + CO2 inflator", price: "€12,95", shop: "Bol.com", tag: "Essentieel", url: "https://www.bol.com/nl/s/?searchtext=bandenlichters+co2" },
  ],
  "Wielen": [
    { name: "Spaaksleutel Park Tool SW-0C", price: "€9,95", shop: "Bol.com", tag: "Gereedschap", url: "https://www.bol.com/nl/s/?searchtext=spaaksleutel+park+tool" },
    { name: "Velglint tape 18mm", price: "€6,50", shop: "Bol.com", tag: "Essentieel", url: "https://www.bol.com/nl/s/?searchtext=velglint+tape" },
  ],
  "Pedalen": [
    { name: "Shimano PD-EH500 SPD pedalen", price: "€59,95", shop: "Bol.com", tag: "Veelzijdig", url: "https://www.bol.com/nl/s/?searchtext=shimano+spd+pedalen" },
    { name: "Platformpedalen Wellgo aluminium", price: "€24,95", shop: "Bol.com", tag: "Populair", url: "https://www.bol.com/nl/s/?searchtext=aluminium+platformpedalen" },
  ],
  "default": [
    { name: "Park Tool gereedschapsset PK-4", price: "€89,95", shop: "Bol.com", tag: "Complete set", url: "https://www.bol.com/nl/s/?searchtext=park+tool+gereedschapsset" },
    { name: "Fietsenvet Finish Line Premium", price: "€12,95", shop: "Bol.com", tag: "Essentieel", url: "https://www.bol.com/nl/s/?searchtext=fietsenvet+finish+line" },
    { name: "Kettingolie Muc-Off Wet", price: "€11,50", shop: "Bol.com", tag: "Populair", url: "https://www.bol.com/nl/s/?searchtext=muc-off+kettingolie" },
  ],
};

function AffiliateBlock({ selectedPart }) {
  const products = AFFILIATE_PRODUCTS[selectedPart] || AFFILIATE_PRODUCTS["default"];
  return (
    <div style={affStyles.wrapper}>
      <div style={affStyles.header}>
        <span style={affStyles.headerLabel}>🛒 AANBEVOLEN PRODUCTEN</span>
        <span style={affStyles.headerSub}>via Bol.com</span>
      </div>
      <div style={affStyles.grid}>
        {products.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noopener noreferrer sponsored" style={affStyles.card} className="aff-card">
            <div style={affStyles.cardTop}>
              <span style={affStyles.tag}>{p.tag}</span>
              <span style={affStyles.shop}>{p.shop}</span>
            </div>
            <div style={affStyles.productName}>{p.name}</div>
            <div style={affStyles.cardBottom}>
              <span style={affStyles.price}>{p.price}</span>
              <span style={affStyles.cta}>Bekijk →</span>
            </div>
          </a>
        ))}
      </div>
      <p style={affStyles.disclaimer}>* Gesponsorde links. Als je via deze links koopt, ontvangen wij een kleine commissie — zonder meerkosten voor jou.</p>
    </div>
  );
}

const affStyles = {
  wrapper: {
    marginTop: 28,
    borderTop: "1px solid #1e1e1e",
    paddingTop: 24,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    letterSpacing: 2,
    color: "#f0ede6",
    textTransform: "uppercase",
  },
  headerSub: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: "#444",
    letterSpacing: 1,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  card: {
    background: "#0d1822",
    border: "1px solid #1a2d3d",
    borderRadius: 3,
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
    transition: "all 0.15s ease",
    cursor: "pointer",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  tag: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    letterSpacing: 1,
    color: "#3ab07a",
    textTransform: "uppercase",
    background: "rgba(58,176,122,0.1)",
    padding: "2px 6px",
    borderRadius: 2,
  },
  shop: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    color: "#2a7de1",
    letterSpacing: 1,
  },
  productName: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 13,
    color: "#ccc",
    marginBottom: 8,
    lineHeight: 1.4,
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    color: "#f0ede6",
    letterSpacing: 1,
  },
  cta: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "#e8340a",
    letterSpacing: 1,
  },
  disclaimer: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    color: "#333",
    marginTop: 12,
    lineHeight: 1.5,
    letterSpacing: 0.3,
  },
};



// ─── E-bike Foutcodes Database ────────────────────────────────────────────────

const EBIKE_ERROR_CODES = {
  bosch: {
    name: "Bosch",
    codes: {
      "500": { title: "Interne motorfout", ernst: "🔴", beschrijving: "Interne fout in de aandrijfeenheid (motor).", oplossing: ["Schakel de e-bike uit, wacht 10 seconden en schakel opnieuw in.", "Als de foutcode blijft: breng de fiets naar een Bosch-gespecialiseerde werkplaats."], winkel: true,
        affiliate: [
          { name: "Bosch eBike Diagnostics Kabel", price: "€29,95", url: "https://www.bol.com/nl/s/?searchtext=bosch+ebike+diagnostics", tag: "Diagnose" },
          { name: "Contactspray CRC 2-26", price: "€9,95", url: "https://www.bol.com/nl/s/?searchtext=contactspray+crc+elektronisch", tag: "Onderhoud" },
        ]},
      "502": { title: "Verlichtingsfout", ernst: "🟡", beschrijving: "Fout in de fietsverlichting die op de Bosch e-bike is aangesloten.", oplossing: ["Controleer het licht en de bijbehorende bekabeling en aansluitingen.", "Start het systeem opnieuw op door de e-bike uit en weer aan te schakelen.", "Als de foutcode nog steeds verschijnt: naar een Bosch werkplaats."], winkel: false,
        affiliate: [
          { name: "Bosch E-bike Verlichting kabel", price: "€12,50", url: "https://www.bol.com/nl/s/?searchtext=bosch+ebike+verlichting+kabel", tag: "Onderdeel" },
          { name: "Busch & Müller Lumotec IQ-X LED Voorlicht", price: "€49,95", url: "https://www.bol.com/nl/s/?searchtext=busch+muller+lumotec+ebike", tag: "Vervanging" },
        ]},
      "503": { title: "Snelheidssensor fout", ernst: "🟡", beschrijving: "De meest voorkomende Bosch foutcode. De snelheidssensor en magneet zijn niet goed uitgelijnd. De afstand moet 8-14mm zijn.", oplossing: ["Controleer de positie van de snelheidssensor en de magneet op de spaak.", "Verplaats de magneet op de spaak zodat deze correct uitlijnt met de sensor (8-14mm afstand).", "De sensor kan losgemaakt worden met een kruiskopschroevendraaier.", "Start het systeem na de aanpassing opnieuw op."], winkel: false,
        affiliate: [
          { name: "Bosch Snelheidssensor magnet set", price: "€8,95", url: "https://www.bol.com/nl/s/?searchtext=bosch+ebike+snelheidssensor+magneet", tag: "Onderdeel" },
          { name: "Kruiskopschroevendraaier set Wera", price: "€19,95", url: "https://www.bol.com/nl/s/?searchtext=wera+kruiskop+schroevendraaier+set", tag: "Gereedschap" },
        ]},
      "504": { title: "Elektronische fout / tuning", ernst: "🔴", beschrijving: "Elektronische fout, onjuiste magneetpositie of tuning/manipulatie van de motor gedetecteerd. Ondersteuning is verminderd.", oplossing: ["Controleer de positie van de snelheidssensor en magneet (afstand 8-14mm).", "Controleer of de sensor of magneet gemanipuleerd is.", "Als de fout aanhoudt: naar een Bosch-gespecialiseerde werkplaats."], winkel: true,
        affiliate: [
          { name: "Bosch Snelheidssensor magnet set", price: "€8,95", url: "https://www.bol.com/nl/s/?searchtext=bosch+ebike+snelheidssensor+magneet", tag: "Onderdeel" },
          { name: "Contactspray CRC 2-26", price: "€9,95", url: "https://www.bol.com/nl/s/?searchtext=contactspray+crc+elektronisch", tag: "Onderhoud" },
        ]},
      "414": { title: "Display verbindingsfout", ernst: "🟡", beschrijving: "Het display maakt geen contact meer met het systeem. Komt vaak voor in vochtige maanden door corrosie op contactpunten.", oplossing: ["Behandel de contactpunten met contactspray.", "Controleer alle kabelverbindingen en poorten.", "Maak de koperen contactpunten van het display schoon.", "Als de foutcode blijft: naar een Bosch werkplaats."], winkel: false,
        affiliate: [
          { name: "Contactspray WD-40 Specialist Elektrisch", price: "€11,95", url: "https://www.bol.com/nl/s/?searchtext=wd40+contactspray+elektrisch", tag: "Aanbevolen" },
          { name: "Bosch Nyon display cover", price: "€14,95", url: "https://www.bol.com/nl/s/?searchtext=bosch+nyon+display+cover", tag: "Bescherming" },
        ]},
      "430": { title: "Interne display-accu leeg", ernst: "🟡", beschrijving: "De interne accu van de boordcomputer (display) is leeg. Gebeurt als de hoofdaccu altijd buiten de fiets wordt opgeladen.", oplossing: ["Laad het display op door de e-bike op te laden met de hoofdaccu in de fiets.", "Het display kan ook opgeladen worden via de mini USB-aansluiting.", "Schakel de e-bike in via de accu of laad het display op via USB."], winkel: false,
        affiliate: [
          { name: "Micro USB kabel 1m (voor display)", price: "€6,95", url: "https://www.bol.com/nl/s/?searchtext=micro+usb+kabel+1+meter", tag: "Oplossing" },
          { name: "Bosch Purion display", price: "€69,95", url: "https://www.bol.com/nl/s/?searchtext=bosch+purion+display+ebike", tag: "Vervanging" },
        ]},
      "523001": { title: "Snelheidssensor fout (Smart System)", ernst: "🟡", beschrijving: "Opvolger van foutcode 503 in het nieuwere Bosch Smart Systeem. Duidt op een sensorprobleem.", oplossing: ["Controleer de uitlijning van de snelheidssensor en de magneet (afstand 8-14mm).", "Verplaats de magneet op de spaak indien nodig.", "Start het systeem opnieuw op."], winkel: false,
        affiliate: [
          { name: "Bosch Snelheidssensor magnet set", price: "€8,95", url: "https://www.bol.com/nl/s/?searchtext=bosch+ebike+snelheidssensor+magneet", tag: "Onderdeel" },
          { name: "Kruiskopschroevendraaier set Wera", price: "€19,95", url: "https://www.bol.com/nl/s/?searchtext=wera+kruiskop+schroevendraaier+set", tag: "Gereedschap" },
        ]},
    }
  },
  shimano: {
    name: "Shimano Steps",
    codes: {
      "W001": { title: "Magneetsensor fout", ernst: "🟡", beschrijving: "De snelheidssensor detecteert de magneet niet.", oplossing: ["Controleer de positie van de magneet op de spaak.", "Zorg voor 2mm afstand tussen magneet en sensor.", "Controleer kabelverbinding sensor."], winkel: false,
        affiliate: [
          { name: "Shimano Steps snelheidssensor SM-DUE10", price: "€14,95", url: "https://www.bol.com/nl/s/?searchtext=shimano+steps+snelheidssensor", tag: "Onderdeel" },
          { name: "Magneet voor spaak universeel", price: "€4,95", url: "https://www.bol.com/nl/s/?searchtext=fiets+spaak+magneet+sensor", tag: "Vervanging" },
        ]},
      "W002": { title: "Cadanssensor fout", ernst: "🟡", beschrijving: "De cadanssensor (trapfrequentie) werkt niet.", oplossing: ["Controleer de magneet bij de trapas.", "Controleer de sensorbedrading.", "Reinig de sensor."], winkel: false },
      "W003": { title: "Motor communicatiefout", ernst: "🔴", beschrijving: "Communicatieprobleem met de motorunit.", oplossing: ["Controleer alle SM-BTC1 kabelverbindingen.", "Reset het systeem via de knop op de motorunit.", "Controleer op beschadigde kabels."], winkel: true },
      "W010": { title: "Accufout", ernst: "🔴", beschrijving: "Fout gedetecteerd in de accu of laadindicatie.", oplossing: ["Verwijder en herplaats de accu.", "Controleer contactpunten op corrosie.", "Probeer een andere accu indien beschikbaar."], winkel: true,
        affiliate: [
          { name: "Contactspray WD-40 Specialist Elektrisch", price: "€11,95", url: "https://www.bol.com/nl/s/?searchtext=wd40+contactspray+elektrisch", tag: "Onderhoud" },
          { name: "Shimano Steps accu BT-E8035", price: "€299,00", url: "https://www.bol.com/nl/s/?searchtext=shimano+steps+accu+BT-E8035", tag: "Vervanging" },
        ]},
      "W011": { title: "Accu leeggekoppeld", ernst: "🟡", beschrijving: "Accu werd losgekoppeld tijdens gebruik.", oplossing: ["Controleer de accuvergrendeling.", "Zorg dat de accu correct geplaatst en vergrendeld is."], winkel: false },
      "W013": { title: "Acculading kritiek laag", ernst: "🟡", beschrijving: "De accu is bijna leeg — minder dan 5% resterende lading.", oplossing: ["Laad de accu zo snel mogelijk op.", "De motorondersteuning schakelt binnenkort uit."], winkel: false },
      "W014": { title: "Accu temperatuur fout", ernst: "🔴", beschrijving: "De accutemperatuur is te hoog of te laag.", oplossing: ["Laat de accu afkoelen of opwarmen naar 0-40°C.", "Vermijd opladen bij extreme temperaturen."], winkel: false },
      "W101": { title: "Motortemperatuur te hoog", ernst: "🟡", beschrijving: "De motor is oververhit door zware belasting.", oplossing: ["Stop en laat 10 minuten afkoelen.", "Schakel naar lagere ondersteuning bij zware klimmen."], winkel: false },
      "W301": { title: "Display communicatiefout", ernst: "🔴", beschrijving: "Het display (SC-E series) communiceert niet.", oplossing: ["Herplaats het display.", "Controleer de E-tube kabelverbinding.", "Reset via E-TUBE PROJECT app."], winkel: true },
    }
  },
  yamaha: {
    name: "Yamaha",
    codes: {
      "01": { title: "Motorfout", ernst: "🔴", beschrijving: "Algemene motorfout. De aandrijfeenheid heeft een probleem gedetecteerd.", oplossing: ["Zet de fiets uit en weer aan.", "Controleer kabelverbindingen bij de motor.", "Als fout blijft: naar dealer."], winkel: true },
      "02": { title: "Accufout", ernst: "🔴", beschrijving: "Fout in de accu of accuverbinding.", oplossing: ["Verwijder en herplaats de accu.", "Controleer contactpunten.", "Volledig opladen en opnieuw proberen."], winkel: true },
      "03": { title: "Displayfout", ernst: "🟡", beschrijving: "Communicatiefout met het display.", oplossing: ["Herplaats het display op de stuurhouder.", "Controleer de kabelverbinding.", "Reset door 5 sec aan/uit-knop ingedrukt te houden."], winkel: false },
      "04": { title: "Snelheidssensorfout", ernst: "🟡", beschrijving: "De snelheidssensor detecteert geen signaal.", oplossing: ["Controleer de magneetpositie op het wiel.", "Maximale afstand sensor-magneet: 3mm.", "Reinig sensor en magneet."], winkel: false },
      "07": { title: "Trapkrachtsensorfout", ernst: "🔴", beschrijving: "De torque sensor bij de trapas werkt niet correct.", oplossing: ["Zet fiets uit en aan.", "Controleer of crankarmen goed vastzitten.", "Naar dealer indien fout blijft."], winkel: true },
      "08": { title: "Temperatuurfout motor", ernst: "🟡", beschrijving: "De motortemperatuur is te hoog.", oplossing: ["Stop met rijden.", "Wacht 15 minuten voor afkoeling.", "Rij met lagere ondersteuning."], winkel: false },
      "09": { title: "Systeemfout", ernst: "🔴", beschrijving: "Algemene systeemfout. Kan meerdere oorzaken hebben.", oplossing: ["Hard reset: houd aan/uit 10 sec ingedrukt.", "Als fout blijft na reset: naar dealer."], winkel: true },
    }
  },
  bafang: {
    name: "Bafang",
    codes: {
      "C1": { title: "Communicatiefout controller", ernst: "🔴", beschrijving: "De controller communiceert niet met het display.", oplossing: ["Controleer alle connectors tussen display en controller.", "Controleer op beschadigde of losse draden.", "Reset het systeem."], winkel: true },
      "C2": { title: "Throttle fout", ernst: "🟡", beschrijving: "De gashendel (throttle) geeft een fout signaal.", oplossing: ["Controleer de throttle-verbinding.", "Kalibreer de throttle via het display menu.", "Controleer op beknelde kabel."], winkel: false },
      "C3": { title: "PAS sensorfout", ernst: "🟡", beschrijving: "De Pedal Assist Sensor werkt niet correct.", oplossing: ["Controleer de PAS-magneetring bij de trapas.", "Zorg dat er minimaal 1mm speling is.", "Controleer de PAS-sensorkabel."], winkel: false,
        affiliate: [
          { name: "Bafang PAS sensor + magneetring", price: "€12,95", url: "https://www.bol.com/nl/s/?searchtext=bafang+pas+sensor+magneetring", tag: "Vervanging" },
          { name: "E-bike kabel reparatieset", price: "€8,50", url: "https://www.bol.com/nl/s/?searchtext=ebike+kabel+connector+set", tag: "Reparatie" },
        ]},
      "C4": { title: "Motorhall sensorfout", ernst: "🔴", beschrijving: "De Hall-sensoren in de motor geven een fout signaal.", oplossing: ["Zet het systeem volledig uit.", "Controleer de motorkabel op beschadiging.", "Naar specialist voor diagnose."], winkel: true },
      "C5": { title: "Accu onderspanning", ernst: "🟡", beschrijving: "De accuspanning is te laag.", oplossing: ["Laad de accu volledig op.", "Als na volledig laden de fout blijft: accu mogelijk defect."], winkel: false,
        affiliate: [
          { name: "Bosch Compact oplader 2A", price: "€49,95", url: "https://www.bol.com/nl/s/?searchtext=ebike+accu+oplader+2a", tag: "Oplader" },
          { name: "Accuvoltmeter digitaal", price: "€7,95", url: "https://www.bol.com/nl/s/?searchtext=digitale+voltmeter+accu", tag: "Diagnose" },
        ]},
      "C6": { title: "Controller oververhitting", ernst: "🟡", beschrijving: "De controller is te warm geworden.", oplossing: ["Stop met rijden en laat afkoelen.", "Controleer of de controller niet afgedekt is.", "Verminder de belasting (lager ondersteuningsniveau)."], winkel: false },
      "C7": { title: "Motor oververhitting", ernst: "🟡", beschrijving: "De motor heeft een te hoge temperatuur.", oplossing: ["Stop en laat 15 minuten afkoelen.", "Bij herhaling: controleer ventilatie rond motor."], winkel: false },
      "C8": { title: "Accu overstroom", ernst: "🔴", beschrijving: "Er vloeit te veel stroom uit de accu.", oplossing: ["Zet de fiets onmiddellijk uit.", "Controleer op kortsluiting in de bedrading.", "Naar specialist."], winkel: true },
    }
  },
  specialized: {
    name: "Specialized (TQ/Turbo)",
    codes: {
      "E01": { title: "Systeemfout", ernst: "🔴", beschrijving: "Algemene systeemfout TQ motor.", oplossing: ["Reset via Mission Control app.", "Firmware updaten.", "Naar Specialized dealer."], winkel: true },
      "E02": { title: "Sensorfout", ernst: "🟡", beschrijving: "Fout in een van de sensoren.", oplossing: ["Controleer kabelverbindingen.", "Reset systeem."], winkel: false },
      "E05": { title: "Accufout", ernst: "🔴", beschrijving: "Probleem met de accu of BMS.", oplossing: ["Herplaats accu.", "Controleer via Mission Control app.", "Naar dealer indien fout blijft."], winkel: true },
    }
  },
  giant: {
    name: "Giant (Yamaha SyncDrive)",
    codes: {
      "E01": { title: "Communicatiefout", ernst: "🔴", beschrijving: "Communicatie tussen onderdelen is onderbroken.", oplossing: ["Controleer alle kabelverbindingen.", "Reset systeem.", "Naar Giant dealer."], winkel: true },
      "E04": { title: "Snelheidssensor fout", ernst: "🟡", beschrijving: "De snelheidssensor werkt niet.", oplossing: ["Controleer magneetpositie.", "Controleer kabel.", "Reinig sensor."], winkel: false },
      "E07": { title: "Accufout", ernst: "🔴", beschrijving: "Fout in accu of laadcyclus.", oplossing: ["Herplaats accu.", "Volledig opladen.", "Naar dealer indien fout blijft."], winkel: true },
    }
  },
};

function getEbikeError(brand, code) {
  // Probeer eerst de codes uit het beheerpaneel (localStorage)
  try {
    const adminCodes = localStorage.getItem("velofout_ebike_codes");
    if (adminCodes) {
      const codes = JSON.parse(adminCodes);
      const match = codes.find(c =>
        c.merk.toLowerCase() === brand.toLowerCase() &&
        c.code.trim().toLowerCase() === code.trim().toLowerCase()
      );
      if (match) {
        return {
          brand: match.merk,
          title: match.titel,
          ernst: match.ernst,
          beschrijving: match.beschrijving,
          oplossing: (match.oplossing || "").split("\n").filter(Boolean),
          winkel: match.winkel,
          affiliate: [],
        };
      }
    }
  } catch (_) {}

  // Fallback naar hardcoded database
  const brandData = EBIKE_ERROR_CODES[brand];
  if (!brandData) return null;
  const normalizedCode = code.trim().toUpperCase().replace(/^0+/, "") || code.trim();
  const error = brandData.codes[code.trim()] ||
    brandData.codes[normalizedCode] ||
    brandData.codes[code.trim().toUpperCase()];
  return error ? { ...error, brand: brandData.name } : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ─── Kennisbank ───────────────────────────────────────────────────────────────

const DIAGNOSES = {
  "Ketting|Knerpend geluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "De ketting is waarschijnlijk droog, vuil of versleten. Een droge ketting zonder smering veroorzaakt metaal-op-metaal wrijving en het kenmerkende knerpende geluid.",
    oplossing: [
      "Reinig de ketting met een ontvetter (bijv. WD-40 of kettingreiniger).",
      "Gebruik een tandenborstel of kettingreinigergereedschap om vuil tussen de schakels te verwijderen.",
      "Spoel af met water en laat goed drogen.",
      "Breng verse kettingolie aan op elke schakel terwijl je de pedalen langzaam achteruit draait.",
      "Veeg overtollige olie af met een schone doek.",
      "Als het geluid blijft na smering, meet dan de kettingslijtage met een kettingmeter — bij >0,75% slijtage vervangen.",
    ],
    benodigdheden: "Kettingolie, ontvetter, doek, eventueel kettingmeter",
    winkel: "Vervang de ketting bij >0,75% slijtage om tandwielschade te voorkomen.",
  },
  "Ketting|Klikgeluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Een klikgeluid bij de ketting duidt vaak op een stijve schakel, een beschadigde schakel of verkeerde derailleurinstelling waardoor de ketting niet soepel over de tandwielen loopt.",
    oplossing: [
      "Draai de pedalen langzaam achteruit en zoek visueel naar een stijve schakel (die beweegt schokkerig).",
      "Duw de stijve schakel zijdelings heen en weer om hem los te maken.",
      "Breng een druppel olie aan op de stijve schakel.",
      "Controleer of de ketting niet over een tandwielpin hangt.",
      "Controleer de derailleurinstelling: bij het schakelen moet de ketting soepel van tandwiel wisselen.",
    ],
    benodigdheden: "Kettingolie, eventueel kettingpenstuur",
    winkel: "Als je een gebroken of gebogen schakel vindt, laat de ketting vervangen.",
  },
  "Ketting|Slechte schakelkwaliteit": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "De derailleur staat verkeerd afgesteld, de schakelkabel is gerekt of de ketting/cassette is versleten.",
    oplossing: [
      "Controleer of de schakelkabel goed vastgeklemd zit.",
      "Draai aan de cable-adjuster (tonnetje op de derailleur of shifter) om de kabelspanning aan te passen.",
      "Zet de ketting op het middelste tandwiel en controleer of de derailleur recht staat.",
      "Stel de H- en L-limitschroeven in zodat de ketting niet van het kassette valt.",
      "Smeer de kabel door het buitenste kabelomhulsel.",
    ],
    benodigdheden: "Schroevendraaier, kabelspanningadjuster",
    winkel: "Als de cassette of ketting sterk versleten is, beide tegelijk vervangen.",
  },
  "Remmen|Piepend geluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Piepende remmen worden meestal veroorzaakt door vieze of verglaasd remblokken, olie op de velg/schijf, of remblokken die de velg onder de verkeerde hoek raken.",
    oplossing: [
      "Reinig de velg of schijf met isopropylalcohol en een schone doek.",
      "Schuur de remblokken licht op met schuurpapier (120-grit) om verglaasd rubber te verwijderen.",
      "Controleer of de remblokken recht op de velg staan (niet schuin).",
      "Stel de 'toe-in' in: de voorkant van het remblok raakt de velg 0,5-1mm eerder dan de achterkant.",
      "Bij schijfremmen: controleer op olievlekken op de schijf — nooit met vet of olie in de buurt van remschijven werken.",
    ],
    benodigdheden: "Isopropylalcohol, doek, schuurpapier, inbussleutel",
    winkel: "Als de remblokken dunner dan 1mm zijn of de schijf beschadigd is, direct vervangen.",
  },
  "Remmen|Slechte remwerking": {
    ernst: "🔴",
    ernstLabel: "Niet mee rijden",
    oorzaak: "Versleten remblokken, gerekte remkabel, of lucht in hydraulisch remsysteem zorgen voor gevaarlijk verminderde remkracht.",
    oplossing: [
      "Controleer de dikte van de remblokken — minimaal 2-3mm resterende dikte.",
      "Trek de remhendel in en check of er voldoende weerstand is.",
      "Bij V-remmen: draai de cable-adjuster los om meer kabelspanning te geven.",
      "Controleer of de remkabel niet gefranjerd of gebroken is.",
      "Bij hydraulische remmen: controleer het vloeistofniveau in het reservoir.",
    ],
    benodigdheden: "Inbussleutelset, nieuwe remblokken indien nodig",
    winkel: "Bij hydraulische remmen met luchtige hendel: direct naar de fietswinkel voor ontluchting.",
  },
  "Remmen|Knerpend geluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Vuil of zand tussen remblok en velg/schijf, of remblokken raken de velgrand in plaats van het remoppervlak.",
    oplossing: [
      "Reinig de velg en remblokken grondig met isopropylalcohol.",
      "Verwijder steentjes of ander vuil dat vastzit in de remblokken.",
      "Controleer de positie van de remblokken: ze moeten volledig op het remvlak van de velg liggen.",
      "Stel de remblokken opnieuw in indien nodig.",
    ],
    benodigdheden: "Isopropylalcohol, doek, inbussleutel",
    winkel: "Als de velg beschadigd is of remblokken zijn versleten.",
  },
  "Versnellingen|Slechte schakelkwaliteit": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Gerekte schakelkabel, vervuilde derailleur of verkeerde afstelling van de limitschroeven.",
    oplossing: [
      "Controleer de kabelspanning via de cable-adjuster op de shifter of derailleur.",
      "Draai de adjuster een kwartslag tegen de klok in om de spanning te verhogen.",
      "Reinig de derailleur met ontvetter en een borstel.",
      "Controleer de B-tensionschroef (afstand derailleur tot cassette) — circa 5-7mm.",
      "Test elke versnelling en stel de H- en L-schroeven bij indien de ketting dreigt af te vallen.",
    ],
    benodigdheden: "Schroevendraaier, ontvetter, smering",
    winkel: "Als de derailleurhaak verbogen is of de derailleur zelf beschadigd.",
  },
  "Versnellingen|Klikgeluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "De ketting loopt niet goed op het geselecteerde tandwiel — kabelspanning klopt niet of de ketting is versleten.",
    oplossing: [
      "Pas de kabelspanning aan met de cable-adjuster (kwartje tegelijk).",
      "Controleer of de ketting de aanliggende tandwielen niet raakt (cross-chaining vermijden).",
      "Smeer de ketting indien dit al een tijdje niet gedaan is.",
    ],
    benodigdheden: "Kettingolie",
    winkel: "Bij sterk versleten cassette of ketting — beide tegelijk vervangen.",
  },
  "Trapas|Knerpend geluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Een knerpende trapas duidt op slijtage van de lagers, loshangende trapas of droge verbinding tussen trapas en frame.",
    oplossing: [
      "Controleer of de crankarmen goed vastzitten (draai de inbusbouten aan, meestal 8mm).",
      "Controleer of de trapas zelf los zit in het frame — schroef hem stevig vast.",
      "Breng montagevet aan op de trapsdraden van de trapasdop.",
      "Als het geluid bij elke pedaalomwenteling op hetzelfde punt klinkt, is een lager waarschijnlijk versleten.",
    ],
    benodigdheden: "Inbussleutel 8mm, montagevet, trapaswerktuig",
    winkel: "Bij versleten lagers: trapas vervangen. Dit is precisiewerk — aanraden bij een monteur.",
  },
  "Trapas|Trillingen": {
    ernst: "🔴",
    ernstLabel: "Niet mee rijden",
    oorzaak: "Een losse of ernstig versleten trapas kan trillen en in extreme gevallen breken tijdens het rijden.",
    oplossing: [
      "Stop met rijden en controleer of de crankarmen los zitten.",
      "Draai de crankbout zo stevig mogelijk aan.",
      "Controleer of het BB30 of BSA-draadhuis beschadigd is.",
    ],
    benodigdheden: "Inbussleutel, trapaswerktuig",
    winkel: "Breng de fiets naar een monteur — loshangende trapas is gevaarlijk.",
  },
  "Wielen|Wiel loopt scheef": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Een of meerdere spaken zijn te los of te strak, waardoor het wiel zijdelings uitwijkt (slag). Dit kan ook door een harde klap of botsing zijn ontstaan.",
    oplossing: [
      "Zet de fiets ondersteboven en draai het wiel langzaam.",
      "Zoek het punt waar het wiel naar links of rechts uitwijkt.",
      "Spaken aan de kant waarnaar het wiel uitwijkt iets losdraaien, spaken aan de andere kant iets aantrekken.",
      "Gebruik een spaaksleutel van de juiste maat.",
      "Kleine correcties per keer — maximaal een halve draai per spaak.",
      "Controleer ook of de as correct in de uitvallers zit.",
    ],
    benodigdheden: "Spaaksleutel",
    winkel: "Bij grotere slag (>2mm) of gebroken spaken: naar een monteur voor professioneel centreren.",
  },
  "Wielen|Trillingen": {
    ernst: "🔴",
    ernstLabel: "Niet mee rijden",
    oorzaak: "Een sterk excentrisch lopend wiel, losse as of beschadigde velg veroorzaakt gevaarlijke trillingen.",
    oplossing: [
      "Controleer direct of de wielas goed vastgeklemd zit (snelspanner of moer).",
      "Controleer of de velg zichtbaar beschadigd of ingedeukt is.",
      "Controleer de spaken op gebroken of erg losse exemplaren.",
    ],
    benodigdheden: "Spaaksleutel, steeksleutel",
    winkel: "Snel naar de fietswinkel — rijden met ernstige wielschade is gevaarlijk.",
  },
  "Banden|Iets zit los": {
    ernst: "🔴",
    ernstLabel: "Niet mee rijden",
    oorzaak: "Als de band van de velg loskomt tijdens het rijden is dit extreem gevaarlijk. Mogelijke oorzaak: te lage bandenspanning of verkeerde bandenmaat.",
    oplossing: [
      "Stop onmiddellijk met rijden.",
      "Controleer de bandenspanning — opgepompte band moet stevig aanvoelen.",
      "Controleer of de band rondom goed in het velgbed zit.",
      "Pomp op tot de aanbevolen spanning (staat op de zijkant van de band).",
      "Als de band herhaaldelijk loslaat: controleer of de bandenmaat overeenkomt met de velgmaat.",
    ],
    benodigdheden: "Fietspomp met manometer",
    winkel: "Als de band of velg beschadigd is.",
  },
  "Banden|Trillingen": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Slijtage, onjuiste bandenspanning of een bultige band veroorzaken trillingen.",
    oplossing: [
      "Controleer de bandenspanning en pomp op indien nodig.",
      "Draai het wiel langzaam en kijk of de band gelijkmatig loopt of een bult heeft.",
      "Controleer de loopzool op sneden, uitstekende objecten of onregelmatige slijtage.",
    ],
    benodigdheden: "Fietspomp",
    winkel: "Bij een bultige of sterk versleten band: vervangen.",
  },
  "Pedalen|Knerpend geluid": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Losse pedalen of versleten pedaallagers zijn de meest voorkomende oorzaak van een knerpend geluid bij de pedalen.",
    oplossing: [
      "Controleer of de pedalen goed vastgeschroefd zitten (let op: linkerpedaal heeft linkse draad — draai dus met de klok mee om vast te zetten).",
      "Smeer de pedaaldraad met montagevet voor het aandraaien.",
      "Als de pedalen vastzitten maar kraken, zijn de lagers waarschijnlijk versleten.",
    ],
    benodigdheden: "Pedalensleutel (15mm), montagevet",
    winkel: "Versleten pedaallagers zijn lastig zelf te repareren — nieuwe pedalen zijn vaak goedkoper.",
  },
  "Stuur|Iets zit los": {
    ernst: "🔴",
    ernstLabel: "Niet mee rijden",
    oorzaak: "Een los stuur of losse stuurpen is extreem gevaarlijk en kan leiden tot verlies van controle.",
    oplossing: [
      "Stop onmiddellijk met rijden.",
      "Controleer de stuurpen-klembouten (inbus, meestal 4-6mm).",
      "Controleer de a-headset (bovenbuis steerer tube) — draai de topcap aan.",
      "Controleer of het stuur zelf niet verschoven is in de stuurpen.",
      "Draai alle bouten aan op de juiste torque (staat vaak op het component gegraveerd, bijv. 5Nm).",
    ],
    benodigdheden: "Inbussleutelset, eventueel torquesleutel",
    winkel: "Als bouten niet kunnen worden aangedraaid of componenten beschadigd zijn.",
  },
  "Voorvork|Trillingen": {
    ernst: "🔴",
    ernstLabel: "Niet mee rijden",
    oorzaak: "Trillingen vanuit de voorvork kunnen duiden op een losse headset, beschadigde vork of bij vering: lege vork-olie.",
    oplossing: [
      "Controleer de headset: pak de voorrem vast en wieg de fiets voor-achter. Voel je speling? Dan is de headset los.",
      "Draai de topcap aan (5mm inbus) om de headset voor-te-laden.",
      "Controleer of de vork zichtbaar beschadigd of gescheurd is.",
    ],
    benodigdheden: "Inbussleutel 5mm",
    winkel: "Beschadigde voorvork of losse headset die je niet zelf kunt oplossen: direct naar monteur.",
  },
  "Zadel|Iets zit los": {
    ernst: "🟡",
    ernstLabel: "Rij voorzichtig",
    oorzaak: "Los zadel of losse zadelpen veroorzaken instabiliteit en kunnen during het rijden verder losraken.",
    oplossing: [
      "Controleer de zadelpenklem (de klem onder het zadel op de zadelpen).",
      "Draai de klembouten aan — bij een railklem: gebruik een inbussleutel en draai gelijkmatig aan.",
      "Controleer ook de zadelpen-klem op het frame (bovenkant zitbuis).",
      "Breng anti-slip pasta (bijv. carbonpasta of gewoon montagevet) aan op de zadelpen.",
    ],
    benodigdheden: "Inbussleutelset, montagevet",
    winkel: "Als de zadelpen of frame-klem beschadigd zijn.",
  },
};

const DEFAULT_DIAGNOSIS = {
  ernst: "🟡",
  ernstLabel: "Rij voorzichtig",
  oorzaak: "Op basis van jouw beschrijving zijn er meerdere mogelijke oorzaken. Hieronder vind je algemene adviezen voor fietsonderhoud.",
  oplossing: [
    "Inspecteer de fiets visueel op losse onderdelen, scheuren of beschadigingen.",
    "Controleer de bandenspanning en pomp op indien nodig.",
    "Smeer bewegende delen: ketting, derailleur, remhendels.",
    "Draai alle zichtbare bouten na met de juiste inbusmaat.",
    "Maak een proefritje op veilig terrein en luister goed naar het geluid.",
  ],
  benodigdheden: "Inbussleutelset, kettingolie, fietspomp",
  winkel: "Bij twijfel over veiligheid: altijd naar een fietsmonteur.",
};

function getDiagnosis(part, symptom, desc) {
  const key = `${part}|${symptom}`;

  // Probeer eerst de kennisbank uit het beheerpaneel (localStorage)
  try {
    const adminDiagnoses = localStorage.getItem("velofout_diagnoses");
    if (adminDiagnoses) {
      const diagnoses = JSON.parse(adminDiagnoses);
      const match = diagnoses.find(d =>
        d.onderdeel === part && d.symptoom === symptom
      );
      if (match) {
        const stappen = (match.oplossing || "").split("\n").filter(Boolean).map((s, i) => `${i+1}. ${s}`).join("\n");
        return `**Ernst** ${match.ernst} ${match.ernstLabel}

**Waarschijnlijke oorzaak**
${match.oorzaak}

**Zelf oplossen**
${stappen}

**Benodigdheden**
${match.benodigdheden}

**Naar de fietswinkel?**
${match.winkel}`;
      }
    }
  } catch (_) {}

  // Fallback naar hardcoded kennisbank
  const d = DIAGNOSES[key] || DEFAULT_DIAGNOSIS;

  const descNote = desc && desc.trim()
    ? `\n\n**Jouw beschrijving:** "${desc.trim()}"\n`
    : "";

  const stappen = d.oplossing.map((s, i) => `${i + 1}. ${s}`).join("\n");

  return `**Ernst** ${d.ernst} ${d.ernstLabel}${descNote}

**Waarschijnlijke oorzaak**
${d.oorzaak}

**Zelf oplossen**
${stappen}

**Benodigdheden**
${d.benodigdheden}

**Naar de fietswinkel?**
${d.winkel}`;
}

// ─────────────────────────────────────────────────────────────────────────────
const BIKE_PARTS = [
  "Ketting", "Remmen", "Versnellingen", "Trapas", "Wielen",
  "Banden", "Stuur", "Zadel", "Voorvork", "Pedalen", "Weet ik niet"
];

const SYMPTOM_TYPES = [
  "Knerpend geluid", "Klikgeluid", "Piepend geluid", "Trillingen",
  "Slechte schakelkwaliteit", "Slechte remwerking", "Wiel loopt scheef",
  "Iets zit los", "Andere klacht"
];

const systemPrompt = `Je bent een ervaren fietsmonteur met 20+ jaar ervaring. Je helpt fietsers bij het diagnosticeren van problemen met hun fiets.

Geef altijd:
1. **Waarschijnlijke oorzaak** – wat is er hoogstwaarschijnlijk aan de hand
2. **Ernst** – geef aan of dit veilig is om mee te rijden (🟢 Veilig / 🟡 Rij voorzichtig / 🔴 Niet mee rijden)
3. **Zelf oplossen** – stap-voor-stap instructie als het zelf oplosbaar is
4. **Benodigdheden** – gereedschap of onderdelen die nodig zijn
5. **Naar de fietswinkel?** – wanneer professionele hulp nodig is

Wees direct, praktisch en duidelijk. Gebruik Nederlandse fietstermen. Houd het beknopt maar volledig.`;

export default function DiagnosePage({ navigate }) {
  const [selectedPart, setSelectedPart] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [sanityDiagnoses, setSanityDiagnoses] = useState(null);
  const [activeTab, setActiveTab] = useState("diagnose");
  const [aiMode, setAiMode] = useState(false);
  const [ebikeBrand, setEbikeBrand] = useState("");
  const [ebikeCode, setEbikeCode] = useState("");
  const [ebikeResult, setEbikeResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    setAnimateIn(true);
    getAllDiagnoses()
      .then(data => {
        if (data && data.length > 0) {
          const map = {};
          data.forEach(d => {
            map[`${d.onderdeel}|${d.symptoom}`] = {
              ernst: d.ernst, ernstLabel: d.ernstLabel,
              oorzaak: d.oorzaak, oplossing: d.oplossing || [],
              benodigdheden: d.benodigdheden || "", winkel: d.winkel || "",
            };
          });
          setSanityDiagnoses(map);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleDiagnose = async () => {
    if (!description.trim() && !selectedPart && !selectedSymptom) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const userMessage = `
Fietsonderdeel: ${selectedPart || "Onbekend"}
Type klacht: ${selectedSymptom || "Niet opgegeven"}
Beschrijving: ${description || "Geen extra beschrijving"}
    `.trim();

    try {
      let text = null;

      if (aiMode) {
        // AI modus: probeer Claude API
        try {
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              system: systemPrompt,
              messages: [{ role: "user", content: userMessage }],
            }),
          });
          if (response.ok) {
            const data = await response.json();
            text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
          }
        } catch (_) {}

        // Als AI mislukt, toch kennisbank
        if (!text) {
          text = getDiagnosis(selectedPart, selectedSymptom, description);
          text += "\n\n*AI niet beschikbaar — resultaat uit kennisbank.*";
        }
      } else {
        await new Promise(r => setTimeout(r, 800));
        const key = `${selectedPart}|${selectedSymptom}`;
        if (sanityDiagnoses && sanityDiagnoses[key]) {
          const d = sanityDiagnoses[key];
          const stappen = d.oplossing.map((s, i) => `${i + 1}. ${s}`).join("\n");
          text = `**Ernst** ${d.ernst} ${d.ernstLabel}\n\n**Waarschijnlijke oorzaak**\n${d.oorzaak}\n\n**Zelf oplossen**\n${stappen}\n\n**Benodigdheden**\n${d.benodigdheden}\n\n**Naar de fietswinkel?**\n${d.winkel}`;
        } else {
          text = getDiagnosis(selectedPart, selectedSymptom, description);
        }
      }

      setResult({ text, isAI: aiMode });
      if (window.plausible) window.plausible('Diagnose', { props: { onderdeel: selectedPart || 'onbekend', ai: aiMode } });
      fetch('/api/analytics', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ event:'diagnose', part: selectedPart, symptom: selectedSymptom, isAI: aiMode }) }).catch(()=>{});
    } catch (err) {
      setError(`Fout: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedPart("");
    setSelectedSymptom("");
    setDescription("");
    setResult(null);
    setError(null);
    setAiMode(false);
  };

  const handleEbikeLookup = () => {
    if (!ebikeBrand || !ebikeCode.trim()) return;
    const result = getEbikeError(ebikeBrand, ebikeCode);
    setEbikeResult(result || "not_found");
  };

  const formatResult = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <h3 key={i} style={styles.resultHeading}>{line.replace(/\*\*/g, "")}</h3>;
      }
      if (line.match(/^\*\*.*\*\*/)) {
        return <p key={i} style={styles.resultLine} dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        }} />;
      }
      if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
        return <li key={i} style={styles.resultListItem}>{line.replace(/^[-\d.]\s*/, "")}</li>;
      }
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} style={styles.resultLine}>{line}</p>;
    });
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a7de1; border-radius: 3px; }
        .chip:hover { background: #2a7de1 !important; color: #fff !important; border-color: #2a7de1 !important; transform: translateY(-2px); }
        .chip.active { background: #2a7de1 !important; color: #fff !important; border-color: #2a7de1 !important; }
        .diagnose-btn:hover:not(:disabled) { background: #1f6bc9 !important; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(42,125,225,0.5) !important; }
        .diagnose-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .reset-btn:hover { color: #2a7de1 !important; }
        textarea:focus { outline: none; border-color: #2a7de1 !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.6s ease 0.15s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.6s ease 0.3s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.6s ease 0.45s forwards; opacity: 0; }
        .spinner { animation: spin 1s linear infinite; }
        .aff-card:hover { border-color: #2a7de1 !important; background: #0f1e2e !important; transform: translateX(3px); }
        .tab-btn:hover { color: #d4e5f0 !important; }
        .tab-active { color: #2a7de1 !important; border-bottom: 2px solid #2a7de1 !important; }
        .ai-toggle:hover { border-color: #2a4060 !important; color: #8aaac0 !important; }
        .ai-toggle-active { border-color: #3ab07a !important; color: #d4e5f0 !important; background: rgba(58,176,122,0.05) !important; }
        .ai-toggle-active span:first-of-type { background: #3ab07a !important; border-color: #3ab07a !important; }
        input::placeholder { color: #2a4060; }
        input:focus { border-color: #2a7de1 !important; }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideOutLeft { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-40px); } }
        .page-enter { animation: slideInRight 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
        .scanline { position: absolute; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #2a7de1, #3ab07a, transparent); animation: scanline 1.8s ease-in-out infinite; pointer-events: none; }
      `}</style>

      {/* Header */}
      <header style={styles.header} className="fade-up">
        <div style={styles.headerAccent} />
        <div style={styles.headerInner}>
          <div style={styles.logoArea}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="9" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="27" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
              <circle cx="9" cy="27" r="2" fill="#3ab07a"/>
              <circle cx="27" cy="27" r="2" fill="#3ab07a"/>
              <path d="M9 27 L18 10 L27 27" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
              <path d="M14 20 L27 20" stroke="#fff" strokeWidth="2"/>
            </svg>
            <div>
              <div style={styles.logoTitle}>VELOFOUT</div>
              <div style={styles.logoSub}>Fiets Diagnostics</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={() => navigate && navigate("/blog")} style={{background:"transparent",border:"none",color:"#5a7a9a",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:1,cursor:"pointer",textTransform:"uppercase"}}>Blog</button>
            <div style={styles.badge}>AI-MONTEUR</div>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div style={styles.tabBar}>
        <div style={styles.tabBarInner}>
          <button
            className={activeTab === "diagnose" ? "tab-btn tab-active" : "tab-btn"}
            style={styles.tabBtn}
            onClick={() => setActiveTab("diagnose")}
          >
            🔧 Diagnose
          </button>
          <button
            className={activeTab === "ebike" ? "tab-btn tab-active" : "tab-btn"}
            style={styles.tabBtn}
            onClick={() => setActiveTab("ebike")}
          >
            ⚡ E-bike Foutcode
          </button>
        </div>
      </div>

      <main style={styles.main}>
        {activeTab === "ebike" ? (
          <div className="fade-up">
            <div style={styles.intro}>
              <p style={styles.introText}>Zoek de betekenis van een foutcode van jouw e-bike motor.</p>
            </div>

            {/* Brand selector */}
            <section style={styles.section}>
              <div style={styles.sectionLabel}>
                <span style={styles.sectionNum}>01</span>
                <span>Kies je merk</span>
              </div>
              <div style={styles.chips}>
                {Object.entries(EBIKE_ERROR_CODES).map(([key, val]) => (
                  <button
                    key={key}
                    className={`chip ${ebikeBrand === key ? "active" : ""}`}
                    style={styles.chip}
                    onClick={() => { setEbikeBrand(key); setEbikeResult(null); }}
                  >
                    {val.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Code input */}
            <section style={styles.section}>
              <div style={styles.sectionLabel}>
                <span style={styles.sectionNum}>02</span>
                <span>Voer de foutcode in</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={ebikeCode}
                  onChange={e => { setEbikeCode(e.target.value); setEbikeResult(null); }}
                  placeholder="Bijv: 500 of W001"
                  style={styles.codeInput}
                  onKeyDown={e => e.key === "Enter" && handleEbikeLookup()}
                />
                <button
                  className="diagnose-btn"
                  style={{ ...styles.diagnoseBtn, padding: "12px 20px", fontSize: 14, flexShrink: 0 }}
                  onClick={handleEbikeLookup}
                  disabled={!ebikeBrand || !ebikeCode.trim()}
                >
                  Zoek →
                </button>
              </div>
            </section>

            {/* Result */}
            {ebikeResult && (
              <div className="page-enter" style={styles.resultWrapper}>
                {ebikeResult === "not_found" ? (
                  <div>
                    <div style={styles.resultTitle}>ONBEKENDE CODE</div>
                    <div style={styles.divider} />
                    <p style={styles.resultLine}>
                      Foutcode <strong>{ebikeCode}</strong> is niet gevonden in onze database voor {EBIKE_ERROR_CODES[ebikeBrand]?.name}.
                    </p>
                    <p style={{ ...styles.resultLine, marginTop: 8 }}>
                      Raadpleeg de handleiding van je fiets of neem contact op met de dealer.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={styles.resultHeader}>
                      <div style={styles.resultTitle}>{ebikeResult.brand}</div>
                      <div style={{ ...styles.resultBadge, color: "#2a9fd6", borderColor: "#2a9fd6" }}>
                        Code {ebikeCode}
                      </div>
                    </div>
                    <div style={styles.divider} />

                    <h3 style={{ ...styles.resultHeading, fontSize: 16, marginTop: 0 }}>{ebikeResult.title}</h3>
                    <p style={{ ...styles.resultLine, marginBottom: 16 }}>{ebikeResult.ernst} <strong>{ebikeResult.ernst === "🔴" ? "Niet mee rijden" : ebikeResult.ernst === "🟡" ? "Rij voorzichtig" : "Veilig"}</strong></p>

                    <h3 style={styles.resultHeading}>Beschrijving</h3>
                    <p style={styles.resultLine}>{ebikeResult.beschrijving}</p>

                    <h3 style={styles.resultHeading}>Oplossing</h3>
                    {ebikeResult.oplossing.map((s, i) => (
                      <li key={i} style={styles.resultListItem}>{i+1}. {s}</li>
                    ))}

                    <h3 style={styles.resultHeading}>Naar de fietswinkel?</h3>
                    <p style={styles.resultLine}>
                      {ebikeResult.winkel
                        ? "⚠️ Ja — deze fout vereist diagnose door een erkende dealer."
                        : "✅ Nee — je kunt dit zelf oplossen met bovenstaande stappen."}
                    </p>

                    {ebikeResult.affiliate && ebikeResult.affiliate.length > 0 && (
                      <div style={affStyles.wrapper}>
                        <div style={affStyles.header}>
                          <span style={affStyles.headerLabel}>🛒 AANBEVOLEN PRODUCTEN</span>
                          <span style={affStyles.headerSub}>via Bol.com</span>
                        </div>
                        <div style={affStyles.grid}>
                          {ebikeResult.affiliate.map((p, i) => (
                            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer sponsored" style={affStyles.card} className="aff-card">
                              <div style={affStyles.cardTop}>
                                <span style={affStyles.tag}>{p.tag}</span>
                                <span style={affStyles.shop}>Bol.com</span>
                              </div>
                              <div style={affStyles.productName}>{p.name}</div>
                              <div style={affStyles.cardBottom}>
                                <span style={affStyles.price}>{p.price}</span>
                                <span style={affStyles.cta}>Bekijk →</span>
                              </div>
                            </a>
                          ))}
                        </div>
                        <p style={affStyles.disclaimer}>* Gesponsorde links. Commissie zonder meerkosten voor jou.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : !result ? (
          <>
            {/* Intro */}
            <div style={styles.intro} className="fade-up-2">
              <p style={styles.introText}>Beschrijf het probleem met je fiets en krijg direct een diagnose van een ervaren AI-monteur.</p>
            </div>

            {/* Part selector */}
            <section style={styles.section} className="fade-up-3">
              <div style={styles.sectionLabel}>
                <span style={styles.sectionNum}>01</span>
                <span>Welk onderdeel?</span>
              </div>
              <div style={styles.chips}>
                {BIKE_PARTS.map(part => (
                  <button
                    key={part}
                    className={`chip ${selectedPart === part ? "active" : ""}`}
                    style={styles.chip}
                    onClick={() => setSelectedPart(selectedPart === part ? "" : part)}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </section>

            {/* Symptom selector */}
            <section style={styles.section} className="fade-up-3">
              <div style={styles.sectionLabel}>
                <span style={styles.sectionNum}>02</span>
                <span>Wat voor klacht?</span>
              </div>
              <div style={styles.chips}>
                {SYMPTOM_TYPES.map(s => (
                  <button
                    key={s}
                    className={`chip ${selectedSymptom === s ? "active" : ""}`}
                    style={styles.chip}
                    onClick={() => setSelectedSymptom(selectedSymptom === s ? "" : s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Description */}
            <section style={styles.section} className="fade-up-4">
              <div style={styles.sectionLabel}>
                <span style={styles.sectionNum}>03</span>
                <span>Beschrijf het probleem</span>
              </div>
              <textarea
                style={styles.textarea}
                placeholder="Bijv: 'Bij het schakelen naar de grote tandwiel knerpt de ketting en schiet hij er soms af...'"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
              />
            </section>

            {/* AI toggle */}
            <div style={styles.aiToggleRow} className="fade-up-4">
              <button
                className={aiMode ? "ai-toggle ai-toggle-active" : "ai-toggle"}
                style={styles.aiToggle}
                onClick={() => setAiMode(!aiMode)}
              >
                <span style={styles.aiToggleDot} />
                <span>
                  <strong>AI-diagnose</strong>
                  <span style={styles.aiToggleSub}>{aiMode ? " — ingeschakeld (~$0,003/diagnose)" : " — uitgeschakeld (kennisbank gratis)"}</span>
                </span>
                <span style={styles.aiToggleBadge}>PREMIUM</span>
              </button>
            </div>

            {/* CTA */}
            <div style={styles.ctaRow} className="fade-up-4">
              <button
                className="diagnose-btn"
                style={styles.diagnoseBtn}
                onClick={handleDiagnose}
                disabled={loading || (!selectedPart && !selectedSymptom && !description.trim())}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg className="spinner" width="20" height="20" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none"/>
                      <path d="M10 2 A8 8 0 0 1 18 10" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    </svg>
                    Analyseren...
                  </span>
                ) : aiMode ? "→ AI-DIAGNOSE" : "→ DIAGNOSTICEER"}
              </button>
            </div>
            {error && <p style={styles.errorText}>{error}</p>}
          </>
        ) : loading ? (
          /* Loading screen */
          <div className="page-enter" style={styles.loadingScreen}>
            <div style={styles.loadingInner}>
              <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 32px" }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "absolute" }}>
                  <circle cx="40" cy="40" r="34" stroke="#1a2d3d" strokeWidth="4" fill="none"/>
                  <circle cx="40" cy="40" r="34" stroke="#2a7de1" strokeWidth="4" fill="none"
                    strokeDasharray="213" strokeDashoffset="160" strokeLinecap="round"
                    style={{ transformOrigin: "center", animation: "spin 1.2s linear infinite" }}/>
                </svg>
                <svg width="40" height="40" viewBox="0 0 36 36" fill="none" style={{ position: "absolute", top: 20, left: 20 }}>
                  <circle cx="9" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
                  <circle cx="27" cy="27" r="7" stroke="#2a7de1" strokeWidth="2.5" fill="none"/>
                  <circle cx="9" cy="27" r="2" fill="#3ab07a"/>
                  <circle cx="27" cy="27" r="2" fill="#3ab07a"/>
                  <path d="M9 27 L18 10 L27 27" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
                  <path d="M14 20 L27 20" stroke="#fff" strokeWidth="2"/>
                </svg>
              </div>
              <div style={styles.loadingTitle}>ANALYSEREN</div>
              <div style={styles.loadingSubtitle}>{aiMode ? "AI-monteur analyseert jouw probleem..." : "Kennisbank wordt geraadpleegd..."}</div>
              <div style={styles.loadingSteps}>
                {["Klacht verwerken", "Web doorzoeken", "Diagnose opstellen"].map((step, i) => (
                  <div key={i} style={{ ...styles.loadingStep, animationDelay: `${i * 0.4}s` }} className="fade-up">
                    <span style={styles.loadingDot} />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Results page */
          <div className="page-enter" style={styles.resultsPage}>
            {/* Results header bar */}
            <div style={styles.resultsTopBar}>
              <button className="reset-btn" style={styles.backBtn} onClick={reset}>
                ← Terug
              </button>
              <div style={styles.resultsTopBadges}>
                {selectedPart && <span style={styles.resultBadge}>{selectedPart}</span>}
                {selectedSymptom && <span style={{ ...styles.resultBadge, color: "#3ab07a", borderColor: "#3ab07a" }}>{selectedSymptom}</span>}
              </div>
            </div>

            {/* Big title */}
            <div style={styles.resultsTitleBlock}>
              <div style={styles.resultsTitleAccent} />
              <h1 style={styles.resultsMainTitle}>DIAGNOSE</h1>
              <p style={styles.resultsSubtitle}>
                {result?.isAI ? "⚡ AI-diagnose — gegenereerd door Claude" : "📚 Kennisbank — gratis diagnose"}
              </p>
            </div>

            <div style={styles.divider} />

            {/* Result body */}
            <div style={styles.resultBody}>
              {formatResult(result?.text || result)}
            </div>

            {/* Affiliate */}
            <AffiliateBlock selectedPart={selectedPart} />

            <div style={{ height: 32 }} />
            <div style={styles.divider} />

            <button
              className="diagnose-btn"
              style={{ ...styles.diagnoseBtn, width: "100%", textAlign: "center", marginTop: 8 }}
              onClick={reset}
            >
              ← NIEUWE DIAGNOSE
            </button>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <span>VELOFOUT © 2026</span>
        <span style={{ color: "#3ab07a" }}>■</span>
        <span>Altijd een echte monteur raadplegen bij twijfel</span>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0b0f14",
    color: "#d4e5f0",
    fontFamily: "'IBM Plex Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    borderBottom: "1px solid #1a2433",
    position: "relative",
    overflow: "hidden",
  },
  headerAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "3px",
    background: "linear-gradient(90deg, #2a7de1 0%, #3ab07a 50%, transparent 100%)",
  },
  headerInner: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  logoTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 28,
    letterSpacing: 4,
    color: "#f0ede6",
    lineHeight: 1,
  },
  logoSub: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: "#555",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  badge: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    letterSpacing: 2,
    color: "#2a7de1",
    border: "1px solid #2a7de1",
    padding: "4px 10px",
    borderRadius: 2,
  },
  main: {
    flex: 1,
    maxWidth: 720,
    width: "100%",
    margin: "0 auto",
    padding: "40px 24px",
  },
  intro: {
    marginBottom: 40,
  },
  introText: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 16,
    color: "#888",
    lineHeight: 1.6,
    borderLeft: "3px solid #2a7de1",
    paddingLeft: 16,
  },
  section: {
    marginBottom: 36,
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#888",
  },
  sectionNum: {
    color: "#3ab07a",
    fontWeight: 600,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    padding: "7px 14px",
    background: "transparent",
    border: "1px solid #1e2d3d",
    color: "#8fa8c0",
    borderRadius: 2,
    cursor: "pointer",
    transition: "all 0.15s ease",
    letterSpacing: 0.5,
  },
  textarea: {
    width: "100%",
    background: "#0d1620",
    border: "1px solid #1e2d3d",
    borderRadius: 4,
    color: "#d4e5f0",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 14,
    padding: "14px 16px",
    resize: "vertical",
    lineHeight: 1.6,
    transition: "border-color 0.2s",
  },
  ctaRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  diagnoseBtn: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    letterSpacing: 3,
    background: "#2a7de1",
    color: "#fff",
    border: "none",
    padding: "14px 36px",
    borderRadius: 2,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(42,125,225,0.3)",
  },
  errorText: {
    color: "#e05c3a",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    marginTop: 12,
    textAlign: "right",
  },
  resultWrapper: {
    background: "#0d1620",
    border: "1px solid #1e2d3d",
    borderRadius: 4,
    padding: "32px",
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  resultTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 32,
    letterSpacing: 5,
    color: "#f0ede6",
  },
  resultBadge: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "#3ab07a",
    border: "1px solid #3ab07a",
    padding: "4px 10px",
    borderRadius: 2,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    background: "#1a2d3d",
    marginBottom: 24,
  },
  resultBody: {
    marginBottom: 24,
  },
  resultHeading: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 13,
    color: "#2a9fd6",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 20,
  },
  resultLine: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 1.7,
    marginBottom: 6,
  },
  resultListItem: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 1.7,
    marginLeft: 20,
    marginBottom: 4,
    listStyleType: "none",
    paddingLeft: 16,
    borderLeft: "2px solid #1e3a50",
  },
  resetBtn: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12,
    letterSpacing: 1,
    background: "transparent",
    border: "none",
    color: "#666",
    cursor: "pointer",
    transition: "color 0.15s",
    padding: 0,
  },
  footer: {
    borderTop: "1px solid #1a2433",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "center",
    gap: 16,
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: "#333",
    letterSpacing: 1,
  },
};
