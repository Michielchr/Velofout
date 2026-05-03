// src/lib/sanity.js
// Verbinding met Sanity CMS voor blogberichten
// Vul VITE_SANITY_PROJECT_ID in je .env.local in

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "jouw-project-id";
const DATASET = "production";
const API_VERSION = "2024-01-01";

const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

export async function sanityFetch(query, params = {}) {
  const encodedQuery = encodeURIComponent(query);
  const paramString = Object.entries(params)
    .map(([k, v]) => `&$${k}=${encodeURIComponent(JSON.stringify(v))}`)
    .join("");

  const res = await fetch(`${BASE_URL}?query=${encodedQuery}${paramString}`);
  if (!res.ok) throw new Error("Sanity fetch mislukt");
  const data = await res.json();
  return data.result;
}

// Haal alle blogberichten op
export async function getAllPosts() {
  return sanityFetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      "imageUrl": mainImage.asset->url
    }
  `);
}

// Haal één bericht op via slug
export async function getPostBySlug(slug) {
  const results = await sanityFetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      category,
      "imageUrl": mainImage.asset->url
    }`,
    { slug }
  );
  return results;
}

// Portable Text naar HTML (simpele versie)
export function portableTextToHtml(blocks = []) {
  return blocks.map(block => {
    if (block._type !== "block" || !block.children) return "";
    const text = block.children.map(child => {
      let t = child.text || "";
      if (child.marks?.includes("strong")) t = `<strong>${t}</strong>`;
      if (child.marks?.includes("em")) t = `<em>${t}</em>`;
      return t;
    }).join("");

    switch (block.style) {
      case "h1": return `<h1>${text}</h1>`;
      case "h2": return `<h2>${text}</h2>`;
      case "h3": return `<h3>${text}</h3>`;
      case "blockquote": return `<blockquote>${text}</blockquote>`;
      default: return text ? `<p>${text}</p>` : "";
    }
  }).join("\n");
}

// Haal alle diagnoses op uit Sanity
export async function getAllDiagnoses() {
  return sanityFetch(`
    *[_type == "diagnose"] {
      _id,
      onderdeel,
      symptoom,
      ernst,
      ernstLabel,
      oorzaak,
      oplossing,
      benodigdheden,
      winkel,
    }
  `);
}
