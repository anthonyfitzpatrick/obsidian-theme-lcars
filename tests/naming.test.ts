// The theme is an original work inspired by a style. Its shipped files must not name or
// borrow from the franchise that style comes from, with one exception: the theme's name,
// "Starship Console inspired by LCARS", says which style it draws on, so LCARS may appear in
// exactly the phrase "inspired by LCARS" and nowhere else. The README and User Guide are exempt:
// they may say the theme is inspired by LCARS from Star Trek, with the trademark notice and
// disclaimer the tests below require.
import assert from "node:assert/strict";
import { test } from "node:test";
import { readProjectFile } from "./helpers.ts";

const FORBIDDEN: readonly RegExp[] = [
  /star\s*trek/i,
  /\btrek/i,
  /starfleet/i,
  /\blcars\b/i,
  /\bokuda/i,
  /\bfederation\b/i,
  /\benterprise\b/i,
  /\bpicard\b/i,
  /\bparamount\b/i,
  /\bcbs\b/i,
  /\bstardate\b/i,
  /\bncc-?\d/i,
  /\bnext generation\b/i,
  /\bvoyager\b/i,
  /\bdeep space nine\b/i,
];

for (const file of ["manifest.json", "theme.css", "package.json"]) {
  test(`${file} uses no franchise names or terms`, () => {
    const text = readProjectFile(file).replaceAll("inspired by LCARS", "");
    for (const pattern of FORBIDDEN) assert.doesNotMatch(text, pattern, `${file} matches ${pattern}`);
  });
}

// The README's opening paragraph is the excerpt Obsidian's directory shows, so the
// "inspired by" wording and the disclaimer must both be in it, not just further down.
test("the README opens by describing the theme as inspired by LCARS, with a disclaimer", () => {
  const readme = readProjectFile("README.md");
  const opening = readme.split("\n\n")[1] ?? "";
  assert.match(opening, /unofficial/i);
  assert.match(opening, /inspired by LCARS/);
  assert.match(opening, /Not affiliated with or endorsed by Paramount Global or\s+CBS Studios/);
});

test("wherever the README and User Guide name the franchise, they carry the trademark notice", () => {
  for (const file of ["README.md", "USERGUIDE.md"]) {
    const text = readProjectFile(file);
    assert.match(text, /Star Trek and related marks are trademarks of CBS Studios Inc\./, file);
    assert.match(text, /not affiliated with/i, file);
  }
});

test("the name is Starship Console, described as inspired by LCARS, and LCARS appears in no other way", () => {
  const manifest: { name: string } = JSON.parse(readProjectFile("manifest.json"));
  assert.equal(manifest.name, "Starship Console inspired by LCARS");
  for (const file of ["manifest.json", "theme.css", "package.json"]) {
    const uses = readProjectFile(file).match(/lcars/gi) ?? [];
    const described = readProjectFile(file).match(/inspired by LCARS/g) ?? [];
    assert.equal(uses.length, described.length, `${file} uses LCARS outside "inspired by LCARS"`);
  }
});
