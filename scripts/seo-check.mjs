// Verifies the static export (out/) for SEO basics. Run after `npm run build`.
// Usage: npm run seo:check [outDir]
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { extname, join, relative } from "node:path";

const outDir = process.argv[2] ?? "out";
const SITE = "https://offboardset.com";
const TEXT_EXT = new Set([".html", ".txt", ".xml", ".json", ".js", ".css", ".svg", ".webmanifest", ".map"]);
const SKIP_ROUTES = new Set(["/_not-found", "/404"]);

if (!existsSync(outDir)) {
  console.error(`No ${outDir}/ directory. Run "npm run build" first.`);
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const stripTags = (s) => decode(s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

const metaContent = (html, attr, name) => {
  for (const tag of html.match(/<meta\b[^>]*>/g) ?? []) {
    const key = tag.match(new RegExp(`\\b${attr}="([^"]*)"`))?.[1];
    if (key === name) return decode(tag.match(/\bcontent="([^"]*)"/)?.[1] ?? "");
  }
  return undefined;
};

const files = walk(outDir);
const errors = [];
const fail = (route, msg) => errors.push(`${route}: ${msg}`);

// ---- per-route checks
const pages = files
  .filter((f) => f.endsWith(".html"))
  .map((f) => {
    const rel = relative(outDir, f).replace(/\\/g, "/").replace(/\.html$/, "");
    const route = "/" + rel.replace(/(^|\/)index$/, "").replace(/\/$/, "");
    return { file: f, route: route === "/" ? "/" : route.replace(/\/$/, "") };
  })
  .filter((p) => !SKIP_ROUTES.has(p.route));

const indexable = [];

for (const { file, route } of pages) {
  const html = readFileSync(file, "utf8");
  const title = stripTags(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  if (!title) fail(route, "missing <title>");
  else if (title.length > 60) fail(route, `<title> is ${title.length} chars (max 60): "${title}"`);

  const description = metaContent(html, "name", "description");
  if (!description) fail(route, "missing meta description");
  else if (description.length > 155) fail(route, `meta description is ${description.length} chars (max 155)`);

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(route, `expected exactly one <h1>, found ${h1s}`);

  const expected = SITE + (route === "/" ? "" : route);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canonical !== expected) fail(route, `canonical is ${canonical ?? "missing"}, expected ${expected}`);

  for (const p of ["og:title", "og:description", "og:image"]) {
    if (!metaContent(html, "property", p)) fail(route, `missing ${p}`);
  }
  const ogImage = metaContent(html, "property", "og:image");
  if (ogImage && !/^https:\/\/offboardset\.com\//.test(ogImage)) fail(route, `og:image is not absolute: ${ogImage}`);

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt="/.test(img)) fail(route, `<img> without alt: ${img.slice(0, 80)}`);
  }

  const robots = metaContent(html, "name", "robots") ?? "";
  if (!/noindex/i.test(robots)) indexable.push(route);

  const text = stripTags(html);
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      fail(route, `JSON-LD does not parse (${e.message})`);
      continue;
    }
    for (const node of json["@graph"] ?? [json]) {
      if (node["@type"] !== "FAQPage") continue;
      for (const q of node.mainEntity ?? []) {
        if (!text.includes(q.name)) fail(route, `FAQ question not visible on page: "${q.name}"`);
        if (!text.includes(q.acceptedAnswer?.text)) fail(route, `FAQ answer not visible on page: "${q.name}"`);
      }
    }
  }
}

// ---- brand string leak check across all public text output
for (const f of files) {
  if (!TEXT_EXT.has(extname(f))) continue;
  if (/offboardkit/i.test(readFileSync(f, "utf8"))) fail(relative(outDir, f), 'contains "OffboardKit"');
}

// ---- sitemap
const sitemapPath = join(outDir, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  fail("sitemap.xml", "missing");
} else {
  const xml = readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
  const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((x) => x[1]);
  for (const route of indexable) {
    const url = SITE + (route === "/" ? "" : route);
    if (!locs.includes(url)) fail("sitemap.xml", `missing indexable route ${url}`);
  }
  for (const loc of locs) {
    const route = loc.slice(SITE.length) || "/";
    if (!indexable.includes(route)) fail("sitemap.xml", `lists non-indexable or unknown route ${loc}`);
  }
  if (lastmods.length !== locs.length) fail("sitemap.xml", "every <url> needs a <lastmod>");
  if (lastmods.length > 1 && new Set(lastmods).size === 1) fail("sitemap.xml", "all lastmod values are identical (build-time date?)");
}

// ---- robots
const robotsPath = join(outDir, "robots.txt");
if (!existsSync(robotsPath)) fail("robots.txt", "missing");
else if (!readFileSync(robotsPath, "utf8").includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt", "missing Sitemap line");

console.log(`Checked ${pages.length} pages (${indexable.length} indexable) in ${outDir}/.`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log("seo:check passed.");
