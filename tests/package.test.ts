// Obsidian's community theme requirements and the project's own packaging rules. Obsidian's
// CSS guidelines (variables, low specificity, no !important, no remote assets) are enforced
// by stylelint (.stylelintrc.json); these tests cover what a linter can't see.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { projectRoot, readManifest, readPackageInfo } from "../scripts/project.ts";
import { readProjectFile } from "./helpers.ts";

const css = readProjectFile("theme.css");

test("the repository root has the files Obsidian's directory requires", () => {
  for (const file of ["README.md", "LICENSE", "manifest.json", "theme.css", "screenshot.png"]) {
    assert.ok(existsSync(join(projectRoot, file)), `${file} is missing`);
  }
});

test("manifest.json has every required field and a semantic version matching package.json", () => {
  const manifest = readManifest();
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.match(manifest.minAppVersion, /^\d+\.\d+\.\d+$/);
  assert.equal(manifest.version, readPackageInfo().version, "manifest and package.json versions differ");
});

test("screenshot.png is 512x288, the size the directory recommends", () => {
  const png = readFileSync(join(projectRoot, "screenshot.png"));
  // A PNG's IHDR chunk holds the width and height as big-endian integers at bytes 16 and 20.
  assert.equal(png.readUInt32BE(16), 512);
  assert.equal(png.readUInt32BE(20), 288);
});

test("theme.css defines both light and dark modes", () => {
  assert.match(css, /\.theme-dark\s*[,{]/);
  assert.match(css, /\.theme-light\s*[,{]/);
});

test("the licence is MIT", () => {
  assert.match(readProjectFile("LICENSE"), /^MIT License/);
  assert.equal(readPackageInfo().license, "MIT");
});

test("fonts are left to Obsidian: no font family or font variable is set anywhere", () => {
  assert.doesNotMatch(css, /font-family\s*:/);
  assert.doesNotMatch(css, /--font-(interface|text|monospace)(-theme)?\s*:/);
  assert.doesNotMatch(css, /--(h[1-6]|inline-title)-font\s*:/);
});
