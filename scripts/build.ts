// Concatenates src/*.css in filename order into the distributable theme.css.
// --check fails if theme.css is stale, so CI and the pre-commit hook catch hand edits.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "./project.ts";

const sourceDir = join(projectRoot, "src");
const outputPath = join(projectRoot, "theme.css");

const modules = readdirSync(sourceDir)
  .filter((file) => file.endsWith(".css"))
  .sort();
const banner = "/* Helm Console for Obsidian. Generated from src/ by scripts/build.ts. Do not edit directly. */\n\n";
const css = banner + modules.map((file) => `${readFileSync(join(sourceDir, file), "utf8").trimEnd()}\n`).join("\n");

if (process.argv.includes("--check")) {
  const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : "";
  if (current !== css) {
    console.error("theme.css is out of date with src/. Run `npm run build`.");
    process.exit(1);
  }
  console.log(`theme.css is current (${modules.length} modules).`);
} else {
  writeFileSync(outputPath, css);
  console.log(`Built theme.css from ${modules.length} modules.`);
}
