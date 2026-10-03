// Palette parsing and WCAG contrast arithmetic shared by the tests.
import { readProjectFile } from "../scripts/project.ts";

export { readProjectFile };

export type Rgb = readonly [number, number, number];

/** A palette module's colours: `--hc-*` hex tokens and `--color-*-rgb` triplets, by name. */
export interface Palette {
  readonly hex: ReadonlyMap<string, string>;
  readonly rgb: ReadonlyMap<string, Rgb>;
}

const HEX_TOKEN = /--hc-([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi;
const RGB_TOKEN = /--color-(\w+)-rgb:\s*(\d+),\s*(\d+),\s*(\d+)\s*;/g;

export function readPalette(relativePath: string): Palette {
  const css = readProjectFile(relativePath);
  const hex = new Map<string, string>();
  for (const [, name, value] of css.matchAll(HEX_TOKEN)) {
    if (name !== undefined && value !== undefined) hex.set(name, value.toLowerCase());
  }
  const rgb = new Map<string, Rgb>();
  for (const [, name, red, green, blue] of css.matchAll(RGB_TOKEN)) {
    if (name !== undefined) rgb.set(name, [Number(red), Number(green), Number(blue)]);
  }
  return { hex, rgb };
}

export function hexToRgb(hex: string): Rgb {
  const channel = (offset: number): number => Number.parseInt(hex.slice(offset, offset + 2), 16);
  return [channel(1), channel(3), channel(5)];
}

function relativeLuminance(hex: string): number {
  const [red, green, blue] = hexToRgb(hex).map((value) => {
    const unit = value / 255;
    return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (red ?? 0) + 0.7152 * (green ?? 0) + 0.0722 * (blue ?? 0);
}

/** WCAG 2 contrast ratio between two hex colours, from 1 to 21. */
export function contrastRatio(first: string, second: string): number {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

/** Hue, saturation and lightness, rounded to whole degrees and percentages. */
export function hexToHslTriplet(hex: string): string {
  const [red, green, blue] = hexToRgb(hex).map((value) => value / 255);
  const r = red ?? 0;
  const g = green ?? 0;
  const b = blue ?? 0;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;
  if (delta !== 0 && max === r) hue = 60 * (((g - b) / delta) % 6);
  else if (delta !== 0 && max === g) hue = 60 * ((b - r) / delta + 2);
  else if (delta !== 0) hue = 60 * ((r - g) / delta + 4);
  const degrees = Math.round(hue < 0 ? hue + 360 : hue);
  return `${degrees}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%`;
}
