// Validates every JSON-LD block in the static export (out/**/*.html).
// Usage: npm run build && node scripts/validate-jsonld.mjs [outDir]
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const outDir = process.argv[2] ?? "out";
const SITE = "https://offboardset.com";

const required = {
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  BlogPosting: [
    "headline",
    "description",
    "image",
    "datePublished",
    "dateModified",
    "author",
    "publisher",
    "mainEntityOfPage",
  ],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  ImageObject: ["url"],
};

const errors = [];
let blocks = 0;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });
}

const has = (v) => v !== undefined && v !== null && v !== "";
const types = (node) => [].concat(node["@type"] ?? []);

function checkImage(file, where, img) {
  if (typeof img === "string") return;
  if (!img || img["@type"] !== "ImageObject") {
    errors.push(`${file}: ${where} is not an ImageObject`);
    return;
  }
  for (const k of ["url", "width", "height"]) {
    if (!has(img[k])) errors.push(`${file}: ${where} ImageObject missing "${k}"`);
  }
}

function checkNode(file, node, ids, refs, nested = false) {
  for (const type of types(node)) {
    // Nested Organizations (e.g. BlogPosting.author) only need a name and url.
    const keys = nested && type === "Organization" ? ["name"] : required[type] ?? [];
    for (const key of keys) {
      if (!has(node[key])) errors.push(`${file}: ${type} missing "${key}"`);
    }
    if (type === "Organization" && !nested) checkImage(file, "Organization.logo", node.logo);
    if (type === "BlogPosting") {
      checkImage(file, "BlogPosting.image", node.image);
      checkImage(file, "BlogPosting.publisher.logo", node.publisher?.logo);
      for (const k of ["datePublished", "dateModified"]) {
        if (Number.isNaN(Date.parse(node[k]))) errors.push(`${file}: ${k} is not a valid date`);
      }
    }
    if (type === "BreadcrumbList") {
      const items = node.itemListElement ?? [];
      items.forEach((it, i) => {
        if (it.position !== i + 1) errors.push(`${file}: breadcrumb position ${it.position} at index ${i}`);
        if (!has(it.name)) errors.push(`${file}: breadcrumb ${i + 1} missing name`);
        if (!String(it.item ?? "").startsWith(SITE)) errors.push(`${file}: breadcrumb ${i + 1} item is not an absolute site URL`);
      });
    }
    if (type === "FAQPage") {
      const qs = node.mainEntity ?? [];
      if (!qs.length) errors.push(`${file}: FAQPage has no questions`);
      for (const q of qs) {
        const text = q.acceptedAnswer?.text;
        if (q["@type"] !== "Question" || !has(q.name)) errors.push(`${file}: FAQ entry missing Question name`);
        if (!has(text)) errors.push(`${file}: FAQ "${q.name}" has no answer text`);
        else if (/(\*\*|\]\(|^\s*[-*]\s|^\s*\d+\.\s|`|^#)/m.test(text) || /\*\*|__/.test(text))
          errors.push(`${file}: FAQ "${q.name}" answer contains markdown`);
        if (/\*|\]\(/.test(q.name ?? "")) errors.push(`${file}: FAQ question contains markdown`);
      }
    }
  }
  if (node["@id"]) ids.add(node["@id"]);
  for (const v of Object.values(node)) {
    if (v && typeof v === "object") {
      if (Array.isArray(v)) v.forEach((x) => x && typeof x === "object" && checkNode(file, x, ids, refs, true));
      else if (Object.keys(v).length === 1 && v["@id"]) refs.push(v["@id"]);
      else checkNode(file, v, ids, refs, true);
    }
  }
}

for (const path of walk(outDir)) {
  const file = relative(outDir, path);
  const html = readFileSync(path, "utf8");
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  const ids = new Set();
  const refs = [];
  let m;
  while ((m = re.exec(html))) {
    blocks++;
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${file}: JSON-LD does not parse (${e.message})`);
      continue;
    }
    if (json["@context"] !== "https://schema.org") errors.push(`${file}: missing/incorrect @context`);
    for (const node of json["@graph"] ?? [json]) checkNode(file, node, ids, refs);
  }
  for (const ref of refs) if (!ids.has(ref)) errors.push(`${file}: @id reference ${ref} does not resolve`);
}

console.log(`Checked ${blocks} JSON-LD blocks.`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of [...new Set(errors)]) console.error(" - " + e);
  process.exit(1);
}
console.log("All JSON-LD blocks valid.");
