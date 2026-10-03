// CSS hygiene: every theme token that is read is defined, and every token that is defined is
// read. Catches typos that silently fall back to nothing, and dead tokens left behind.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { projectRoot } from "../scripts/project.ts";
import { readProjectFile } from "./helpers.ts";

const sources = readdirSync(join(projectRoot, "src"))
  .filter((file) => file.endsWith(".css"))
  .map((file) => readProjectFile(join("src", file)))
  .join("\n")
  .replace(/\/\*[\s\S]*?\*\//g, "");

const defined = new Set([...sources.matchAll(/(--hc-[\w-]+)\s*:/g)].map((match) => match[1]));
const used = new Set([...sources.matchAll(/var\(\s*(--hc-[\w-]+)/g)].map((match) => match[1]));

test("every --hc-* token that is read is defined", () => {
  const undefinedTokens = [...used].filter((token) => !defined.has(token));
  assert.deepEqual(undefinedTokens, []);
});

test("every --hc-* token that is defined is read", () => {
  const unusedTokens = [...defined].filter((token) => !used.has(token));
  assert.deepEqual(unusedTokens, []);
});
