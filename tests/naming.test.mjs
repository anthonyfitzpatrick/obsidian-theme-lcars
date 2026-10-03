// The theme is an original work inspired by a style. Its shipped files must not name or
// borrow from the franchise that style comes from. The README's affiliation notice is
// exempt: disclaiming a rights-holder requires naming it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { read } from "./helpers.mjs";

const FORBIDDEN = [
  /star\s*trek/i, /\btrek/i, /starfleet/i, /\blcars\b/i, /\bokuda/i, /\bokudagram/i,
  /\bfederation\b/i, /\benterprise\b/i, /\bpicard\b/i, /\bparamount\b/i, /\bcbs\b/i,
  /\bstardate\b/i, /\bncc-?\d/i, /\bnext generation\b/i, /\bvoyager\b/i, /\bdeep space nine\b/i,
];

for (const file of ["manifest.json", "theme.css", "package.json"]) {
  test(`${file} uses no franchise names or terms`, () => {
    const text = read(file);
    for (const pattern of FORBIDDEN) assert.doesNotMatch(text, pattern, `${file} matches ${pattern}`);
  });
}

test("the README describes the theme as inspired by, never as the original", () => {
  const readme = read("README.md");
  assert.match(readme, /inspired by/i);
  assert.match(readme, /not affiliated/i);
});
