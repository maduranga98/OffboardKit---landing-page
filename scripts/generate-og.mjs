// Generates public/og-default.png (1200x630, flat brand colours) from an inline SVG.
// Usage: node scripts/generate-og.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "og-default.png");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0F1C2E"/>
  <rect x="80" y="96" width="64" height="6" fill="#0D9E8A"/>
  <text x="80" y="176" font-family="Georgia, 'DM Serif Display', serif" font-size="44" fill="#F5F0E8">Offboard<tspan fill="#12C4AD">Set</tspan></text>
  <text font-family="Georgia, 'DM Serif Display', serif" font-size="76" fill="#F5F0E8">
    <tspan x="80" y="318">Employee offboarding</tspan>
    <tspan x="80" y="408">software for <tspan fill="#12C4AD" font-style="italic">HR teams</tspan></tspan>
  </text>
  <text x="80" y="500" font-family="'DM Sans', Arial, Helvetica, sans-serif" font-size="30" fill="#8A9BB0">Checklists, access revocation, knowledge transfer and exit interviews.</text>
  <rect x="80" y="548" width="12" height="12" fill="#FF6B47"/>
  <text x="108" y="560" font-family="'DM Sans', Arial, Helvetica, sans-serif" font-size="24" fill="#F5F0E8">Flat, company-based pricing · offboardset.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`Wrote ${out}`);
