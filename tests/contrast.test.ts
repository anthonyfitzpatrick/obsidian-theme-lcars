// Every text and background pairing the theme draws, checked against WCAG 2 in both modes.
import assert from "node:assert/strict";
import { test } from "node:test";
import { contrastRatio, hexToHslTriplet, hexToRgb, readPalette, readProjectFile } from "./helpers.ts";

interface Mode {
  readonly name: string;
  readonly file: string;
}

const MODES: readonly Mode[] = [
  { name: "dark", file: "src/02-palette-dark.css" },
  { name: "light", file: "src/03-palette-light.css" },
];
const BARS = ["bar-orange", "bar-gold", "bar-peach", "bar-lavender", "bar-violet", "bar-blue", "bar-red"];
const INKS = ["ink-orange", "ink-gold", "ink-lavender", "ink-violet", "ink-blue", "ink-red", "ink-green"];
const TEXT = ["text", "text-muted", "text-faint"];
const GROUNDS = ["screen", "frame", "panel", "surface", "code-bg"];

for (const mode of MODES) {
  const palette = readPalette(mode.file);
  const colour = (token: string): string => {
    const value = palette.hex.get(token);
    assert.ok(value !== undefined, `${mode.name}: --hc-${token} is missing`);
    return value;
  };
  const check = (foreground: string, background: string, minimum: number): void => {
    const ratio = contrastRatio(colour(foreground), colour(background));
    assert.ok(
      ratio >= minimum,
      `${mode.name}: --hc-${foreground} on --hc-${background} is ${ratio.toFixed(2)}:1, needs ${minimum}:1`,
    );
  };

  test(`${mode.name}: body text meets 4.5:1 on every ground`, () => {
    for (const foreground of TEXT) for (const background of GROUNDS) check(foreground, background, 4.5);
  });

  test(`${mode.name}: inks meet 4.5:1 on the screen and panels`, () => {
    for (const foreground of INKS) for (const background of ["screen", "panel"]) check(foreground, background, 4.5);
  });

  test(`${mode.name}: labels on bars meet 4.5:1`, () => {
    for (const background of BARS) check("on-bar", background, 4.5);
  });

  test(`${mode.name}: inactive tab labels meet 4.5:1 on their dim bar`, () => {
    check("text", "bar-dim", 4.5);
  });

  test(`${mode.name}: disabled controls and off toggles stay legible at 3:1`, () => {
    check("text-muted", "bar-dim", 3);
  });

  test(`${mode.name}: every callout colour is one of the palette's inks or bars`, () => {
    const known = new Set([...palette.hex.values()].map((hex) => hexToRgb(hex).join(",")));
    for (const [name, value] of palette.rgb) {
      assert.ok(known.has(value.join(",")), `${mode.name}: --color-${name}-rgb (${value.join(", ")}) matches no palette colour`);
    }
  });

  test(`${mode.name}: --interactive-accent-hsl is the orange bar`, () => {
    const declared = readProjectFile(mode.file).match(/--interactive-accent-hsl:\s*([^;]+);/)?.[1]?.trim();
    assert.equal(declared, hexToHslTriplet(colour("bar-orange")));
  });
}
