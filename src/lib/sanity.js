const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "";
const DATASET = "production";
const API_VERSION = "2024-01-01";

async function sanityFetch(query) {
  if (!PROJECT_ID) throw new Error("Sanity not configured");
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Sanity fetch failed");
  const data = await res.json();
  return data.result;
}

export async function getAllPosts() {
  return sanityFetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, excerpt, category, "imageUrl": mainImage.asset->url }`);
}

export async function getPostBySlug(slug) {
  return sanityFetch(`*[_type == "post" && slug.current == "${slug}"][0] { _id, title, slug, publishedAt, excerpt, body, category, "imageUrl": mainImage.asset->url }`);
}

export async function getAllDiagnoses() {
  return sanityFetch(`*[_type == "diagnose"] { _id, onderdeel, symptoom, ernst, ernstLabel, oorzaak, oplossing, benodigdheden, winkel }`);
}

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
