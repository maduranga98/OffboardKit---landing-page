// Loads the checklist data files (TypeScript) without a build step: each file is
// transpiled in memory with the project's own `typescript` and imported as an ES module.
// The data files only use `import type`, so nothing needs resolving at runtime.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";

export const CHECKLIST_DIR = resolve("src/content/checklists");
export const CHECKLIST_FILES = ["offboarding", "it-offboarding", "knowledge-transfer"];

async function loadTs(file) {
  const source = readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const url = "data:text/javascript;base64," + Buffer.from(outputText).toString("base64");
  return import(url);
}

/** @returns {Promise<Array<{ file: string, checklist: any }>>} */
export async function loadChecklists() {
  const out = [];
  for (const name of CHECKLIST_FILES) {
    const file = resolve(CHECKLIST_DIR, `${name}.ts`);
    const mod = await loadTs(file);
    const checklist = Object.values(mod)[0];
    if (!checklist?.slug) throw new Error(`${name}.ts does not export a checklist`);
    out.push({ file, checklist });
  }
  return out;
}
