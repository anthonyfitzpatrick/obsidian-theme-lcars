import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const read = (path) => readFileSync(join(root, path), "utf8");

// Reads `--hc-name: #hex;` and `--color-x-rgb: r, g, b;` declarations from a palette file.
export function palette(path) {
  const css = read(path);
  const hex = Object.fromEntries([...css.matchAll(/--hc-([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((m) => [m[1], m[2]]));
  const rgb = Object.fromEntries([...css.matchAll(/--color-(\w+)-rgb:\s*(\d+),\s*(\d+),\s*(\d+)\s*;/g)].map((m) => [m[1], m.slice(2).map(Number)]));
  return { hex, rgb };
}

const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
export const toRgb = (hex) => hex.slice(1).match(/../g).map((x) => parseInt(x, 16));
const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map((v) => channel(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
