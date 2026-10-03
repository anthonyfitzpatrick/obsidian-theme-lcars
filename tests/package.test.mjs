import { test } from "node:test";
import assert from "node:assert/strict";
import { read } from "./helpers.mjs";

const manifest = JSON.parse(read("manifest.json"));
const css = read("theme.css");
const pkg = JSON.parse(read("package.json"));

test("manifest has the fields Obsidian's theme directory requires", () => {
  for (const key of ["name", "version", "minAppVersion", "author"]) assert.ok(manifest[key], `manifest.${key} is missing`);
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.equal(manifest.version, pkg.version, "manifest and package.json versions differ");
});

test("theme.css defines both light and dark modes", () => {
  assert.match(css, /\.theme-dark\s*[,{]/);
  assert.match(css, /\.theme-light\s*[,{]/);
});

test("theme.css loads nothing remote", () => {
  assert.doesNotMatch(css, /@import/i);
  assert.doesNotMatch(css, /url\(\s*["']?(https?:)?\/\//i);
});

test("theme.css stays plain: no !important outside the accessibility module", () => {
  const before = css.split("Reduced motion, higher contrast and print.")[0];
  assert.doesNotMatch(before, /!important/);
});

test("the licence is MIT", () => {
  assert.match(read("LICENSE"), /^MIT License/);
  assert.equal(pkg.license, "MIT");
});

test("fonts are left to Obsidian: no font family is set anywhere", () => {
  assert.doesNotMatch(css, /font-family\s*:/);
  assert.doesNotMatch(css, /--font-(interface|text|monospace)(-theme)?\s*:/);
  assert.doesNotMatch(css, /--(h[1-6]|inline-title)-font\s*:/);
});
