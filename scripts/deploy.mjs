// Copies the distributable files into a vault's theme folder.
// Usage: HELM_CONSOLE_VAULT=/path/to/vault npm run deploy
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const vault = process.env.HELM_CONSOLE_VAULT ?? process.argv[2];
if (!vault) {
  console.error("Set HELM_CONSOLE_VAULT or pass the vault path as an argument.");
  process.exit(1);
}

// Obsidian matches a theme by folder name, which must equal the manifest name.
const { name } = JSON.parse(readFileSync(join(root, "manifest.json"), "utf8"));
const target = join(vault, ".obsidian", "themes", name);
mkdirSync(target, { recursive: true });
for (const file of ["manifest.json", "theme.css"]) copyFileSync(join(root, file), join(target, file));
console.log(`Deployed to ${target}`);
