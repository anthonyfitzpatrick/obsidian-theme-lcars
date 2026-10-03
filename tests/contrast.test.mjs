import { test } from "node:test";
import assert from "node:assert/strict";
import { palette, contrast, toRgb } from "./helpers.mjs";

const MODES = { dark: "src/02-palette-dark.css", light: "src/03-palette-light.css" };
const BARS = ["bar-orange", "bar-gold", "bar-peach", "bar-lavender", "bar-violet", "bar-blue", "bar-red"];
const INKS = ["ink-orange", "ink-gold", "ink-lavender", "ink-violet", "ink-blue", "ink-red", "ink-green"];
const TEXT = ["text", "text-muted", "text-faint"];
const GROUNDS = ["screen", "frame", "panel", "surface", "code-bg"];

for (const [mode, file] of Object.entries(MODES)) {
  const { hex, rgb } = palette(file);
  const check = (fg, bg, min) => {
    assert.ok(hex[fg] && hex[bg], `${mode}: --hc-${fg} or --hc-${bg} is missing`);
    const ratio = contrast(hex[fg], hex[bg]);
    assert.ok(ratio >= min, `${mode}: --hc-${fg} on --hc-${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`);
  };

  test(`${mode}: body text meets 4.5:1 on every ground`, () => {
    for (const fg of TEXT) for (const bg of GROUNDS) check(fg, bg, 4.5);
  });

  test(`${mode}: inks meet 4.5:1 on the screen and panels`, () => {
    for (const fg of INKS) for (const bg of ["screen", "panel"]) check(fg, bg, 4.5);
  });

  test(`${mode}: labels on bars meet 4.5:1`, () => {
    for (const bg of BARS) check("on-bar", bg, 4.5);
  });

  test(`${mode}: inactive tab labels meet 4.5:1 on their dim bar`, () => {
    check("text", "bar-dim", 4.5);
  });

  test(`${mode}: disabled controls and off toggles stay legible at 3:1`, () => {
    check("text-muted", "bar-dim", 3);
  });

  test(`${mode}: every callout colour is one of the palette's inks or bars`, () => {
    const known = new Set(Object.values(hex).map((h) => toRgb(h).join(",")));
    for (const [name, value] of Object.entries(rgb)) {
      assert.ok(known.has(value.join(",")), `${mode}: --color-${name}-rgb (${value}) matches no palette colour`);
    }
  });
}
