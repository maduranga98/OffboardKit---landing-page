// Builds one A4 PDF per checklist into public/downloads/ and writes the slug -> file
// map the captureLead function reads. Runs in `prebuild`; output is deterministic, so a
// rebuild with unchanged content leaves the committed PDFs untouched.
// Usage: npm run pdfs:build
import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import PDFDocument from "pdfkit";
import { loadChecklists } from "./lib/load-checklists.mjs";

const OUT_DIR = resolve("public/downloads");
const MAP_FILE = resolve("functions/src/landing/downloads.json");

const COLOR = {
  navy: "#0F1C2E",
  teal: "#0D9E8A",
  tealDeep: "#0A7A6B",
  warmWhite: "#F5F0E8",
  muted: "#57677D",
  line: "#D9DCE1",
};

// Fixed so rebuilding never changes the file bytes on its own.
const PDF_DATE = new Date("2026-10-07T00:00:00Z");

const FONT_FILES = {
  serif: "node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff",
  sans: "node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff",
  sansBold: "node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff",
};

const PAGE = { margin: 48, footerHeight: 36 };

function registerFonts(doc) {
  const fonts = { serif: "Helvetica-Bold", sans: "Helvetica", sansBold: "Helvetica-Bold" };
  let embedded = 0;
  for (const [key, path] of Object.entries(FONT_FILES)) {
    const file = resolve(path);
    if (!existsSync(file)) continue;
    doc.registerFont(`brand-${key}`, file);
    fonts[key] = `brand-${key}`;
    embedded++;
  }
  if (embedded < Object.keys(FONT_FILES).length) {
    console.warn("  ! DM fonts not found, falling back to Helvetica (run npm install)");
  }
  return fonts;
}

function render(checklist, outFile) {
  const doc = new PDFDocument({
    size: "A4",
    margin: PAGE.margin,
    bufferPages: true,
    info: {
      Title: checklist.title,
      Author: "OffboardSet",
      Subject: "General guidance, not legal advice",
      CreationDate: PDF_DATE,
      ModDate: PDF_DATE,
    },
  });
  const f = registerFonts(doc);
  doc.pipe(createWriteStream(outFile));

  const left = PAGE.margin;
  const width = doc.page.width - PAGE.margin * 2;
  const limit = () => doc.page.height - PAGE.margin - PAGE.footerHeight;

  const ensure = (height) => {
    if (doc.y + height > limit()) {
      doc.addPage();
      doc.y = PAGE.margin;
    }
  };

  // Title bar
  doc.rect(0, 0, doc.page.width, 110).fill(COLOR.navy);
  doc.fillColor(COLOR.teal).font(f.sansBold).fontSize(9)
    .text("OFFBOARDSET", left, 30, { characterSpacing: 2.2, lineBreak: false });
  doc.fillColor(COLOR.warmWhite).font(f.serif).fontSize(27)
    .text(checklist.title, left, 48, { width, lineBreak: true });
  doc.y = 130;

  // Intro
  doc.fillColor(COLOR.muted).font(f.sans).fontSize(10).text(checklist.intro, left, doc.y, {
    width,
    lineGap: 3,
  });
  doc.moveDown(1.2);

  for (const section of checklist.sections) {
    ensure(60);
    doc.fillColor(COLOR.teal).font(f.serif).fontSize(15).text(section.heading, left, doc.y, { width });
    const ruleY = doc.y + 3;
    doc.moveTo(left, ruleY).lineTo(left + width, ruleY).lineWidth(0.6).strokeColor(COLOR.line).stroke();
    doc.y = ruleY + 9;

    for (const item of section.items) {
      const textX = left + 22;
      const textW = width - 22;
      doc.font(f.sans).fontSize(10.5);
      const textH = doc.heightOfString(item.text, { width: textW, lineGap: 2 });
      let noteH = 0;
      if (item.note) {
        doc.fontSize(9);
        noteH = doc.heightOfString(item.note, { width: textW }) + 2;
      }
      ensure(textH + noteH + 9);

      const y = doc.y;
      doc.roundedRect(left, y + 1, 11, 11, 1.5).lineWidth(0.9).strokeColor(COLOR.navy).stroke();
      doc.fillColor(COLOR.navy).font(f.sans).fontSize(10.5)
        .text(item.text, textX, y, { width: textW, lineGap: 2 });
      if (item.note) {
        doc.fillColor(COLOR.muted).fontSize(9).text(item.note, textX, doc.y + 1, { width: textW });
      }
      doc.y += 7;
    }
    doc.moveDown(0.8);
  }

  // Footer on every page (after layout, so the page count is known)
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    const savedBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; // allow drawing inside the bottom margin without a page break
    const y = doc.page.height - PAGE.margin - 8;
    doc.moveTo(left, y - 8).lineTo(left + width, y - 8).lineWidth(0.6).strokeColor(COLOR.line).stroke();
    doc.fillColor(COLOR.muted).font(f.sans).fontSize(8.5)
      .text("offboardset.com · General guidance, not legal advice", left, y, {
        width: width - 60,
        lineBreak: false,
      });
    doc.text(`${i + 1} / ${range.count}`, left + width - 60, y, {
      width: 60,
      align: "right",
      lineBreak: false,
    });
    doc.page.margins.bottom = savedBottom;
  }

  doc.end();
  return new Promise((done, fail) => {
    doc.on("end", done);
    doc.on("error", fail);
  });
}

mkdirSync(OUT_DIR, { recursive: true });
const map = {};

for (const { checklist } of await loadChecklists()) {
  const name = basename(checklist.pdfFile);
  if (!new RegExp(`^${checklist.slug}-[a-z0-9]{8}\\.pdf$`).test(name)) {
    throw new Error(`${checklist.slug}: pdfFile must look like /downloads/${checklist.slug}-<8 chars>.pdf`);
  }
  const outFile = resolve(OUT_DIR, name);
  await render(checklist, outFile);
  // Wait for the write stream to flush before reporting.
  await new Promise((r) => setTimeout(r, 50));
  map[checklist.slug] = checklist.pdfFile;
  console.log(`pdf: ${checklist.pdfFile}`);
}

writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + "\n");
console.log(`wrote ${MAP_FILE.replace(process.cwd() + "/", "")}`);
