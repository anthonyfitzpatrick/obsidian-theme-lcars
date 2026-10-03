---
status: Active
type: Showcase
tags:
  - demo
  - console
updated: 2026-10-03
---
# Welcome to the console

This vault shows every part of a note that Helm Console styles. Open it in light and dark mode to compare.

## Headings and text

Body text stays in **your own font** and keeps its case. *Emphasis*, **strong text**, ==highlighted text== and `inline code` all use the palette. Links to [[Survey Station|another note]] are blue, and links to [[A note that does not exist yet]] are lavender. Tags look like #console and #demo.

### Lists

- Bullets are orange
- Nested items keep the same marker
  - Like this one
- Collapsed items show a gold marker

1. Numbered lists use the same colour
2. And so does each number

- [x] A finished task
- [ ] A task still to do

### A quote

> Panels are blocks of solid colour. Where two panels meet, they join with a curve.

## Callouts

> [!note] Note
> Callouts carry a thick cap on the left in their own colour.

> [!tip] Tip
> The colours come from the theme's palette, so they match the bars.

> [!warning] Warning
> Warnings use orange.

> [!failure] Failure
> Failures, dangers and bugs use red.

---

## A table

| System | State | Load |
| --- | --- | --- |
| Primary array | Online | 42% |
| Secondary array | Standby | 0% |
| Environmental | Online | 67% |
| Navigation | Calibrating | 18% |

## Code

```js
// Code blocks carry a blue cap.
function report(system, load) {
  return `${system}: ${load}%`;
}
```
