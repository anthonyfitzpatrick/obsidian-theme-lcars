// Copies the distributable files into a vault's theme folder.
// Usage: HELM_CONSOLE_VAULT=/path/to/vault npm run deploy
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { projectRoot, readManifest } from "./project.ts";

const vaultPath = process.env["HELM_CONSOLE_VAULT"] ?? process.argv[2];
if (vaultPath === undefined || vaultPath === "") {
  console.error("Set HELM_CONSOLE_VAULT or pass the vault path as an argument.");
  process.exit(1);
}

// Obsidian matches a theme by folder name, which must equal the manifest name.
const themeFolder = join(vaultPath, ".obsidian", "themes", readManifest().name);
mkdirSync(themeFolder, { recursive: true });
for (const file of ["manifest.json", "theme.css"]) copyFileSync(join(projectRoot, file), join(themeFolder, file));
console.log(`Deployed to ${themeFolder}`);
