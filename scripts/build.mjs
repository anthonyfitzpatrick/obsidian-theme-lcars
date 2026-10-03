// Concatenates src/*.css in filename order into the distributable theme.css.
// --check fails if theme.css is stale, so CI and the pre-commit hook catch hand edits.
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src");
const out = join(root, "theme.css");

const modules = readdirSync(srcDir).filter((f) => f.endsWith(".css")).sort();
const banner = "/* Helm Console for Obsidian. Generated from src/ by scripts/build.mjs. Do not edit directly. */\n\n";
const css = banner + modules.map((f) => readFileSync(join(srcDir, f), "utf8").trimEnd() + "\n").join("\n");

if (process.argv.includes("--check")) {
  const current = existsSync(out) ? readFileSync(out, "utf8") : "";
  if (current !== css) {
    console.error("theme.css is out of date with src/. Run `npm run build`.");
    process.exit(1);
  }
  console.log(`theme.css is current (${modules.length} modules).`);
} else {
  writeFileSync(out, css);
  console.log(`Built theme.css from ${modules.length} modules.`);
}
