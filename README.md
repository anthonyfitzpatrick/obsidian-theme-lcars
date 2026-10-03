# Helm Console

**An LCARS-inspired theme for Obsidian: swept colour bars, rounded end caps and segmented
panels on a black screen — or on warm paper.**

> **This is an independent, unofficial, fan-made theme.** It is **inspired by** the LCARS
> console style of late-1980s television science fiction. It is **not affiliated with,
> endorsed by, sponsored by, or connected to** Paramount Global, CBS Studios, or any
> other rights-holder. It reproduces no artwork, logos or typefaces from any production.
> See [Affiliation and intellectual property](#affiliation-and-intellectual-property).

---

## What this is

Helm Console is an Obsidian theme in the LCARS idiom, built from one idea: an interface drawn as **flat
coloured bars**. Panels are joined by a curved elbow, buttons are pills, labels sit in a
condensed face in capitals, and colour does the work that borders and shadows usually do.

- **The ribbon** is a column of coloured segments. Its top corner curves into a bar that
  runs along the top of the window.
- **Tabs** are pills. The active tab is a solid orange bar.
- **Headings** carry a rounded end cap, like a labelled bar.
- **The status bar** is a capped orange bar in the lower right.
- **Menus, the command palette and settings** show the chosen row as a full-width bar.

## Light and dark

Both modes are designed separately. Neither is generated from the other. Switch with
**Settings → Appearance → Base colour scheme**.

- **Dark** draws bright bars on a black screen. This is the look the style is known for.
- **Light** puts the same bars on a warm paper screen. The text colours are deepened so
  that text still meets 4.5:1 contrast.

## The palette

| Role | Dark | Light |
| --- | --- | --- |
| Screen | `#000000` | `#f5f0e8` |
| Text | `#f4e8da` | `#1c1612` |
| Orange bar (active, primary) | `#ff9a52` | `#f2893c` |
| Gold bar (hover, focus) | `#ffc65c` | `#f0b33f` |
| Peach bar | `#ffb08a` | `#f3a07b` |
| Lavender bar (structure) | `#c99ad8` | `#bf8ad0` |
| Violet bar | `#a493ff` | `#9a8af5` |
| Blue bar | `#86aeff` | `#7ea4f5` |
| Red bar (warnings) | `#ff7468` | `#f07a6c` |

Labels on bars are always black. The test suite checks every text and background pair in
both modes.

## Installation

### Manually

1. Download `theme.css` and `manifest.json` from this repository.
2. Put both in `YourVault/.obsidian/themes/Helm Console/`. The folder name must match exactly.
3. In Obsidian, open **Settings → Appearance → Themes** and choose **Helm Console**.

### From Obsidian's community themes

This is not available yet. Once the theme is listed, search for **Helm Console** under
**Settings → Appearance → Themes → Manage**.

## Options

If you have the **Style Settings** plugin, the theme offers three switches:

- **Mixed-case interface labels** keeps labels in their original case instead of capitals.
- **Plain ribbon** draws the ribbon as one bar instead of the swept, segmented column.
- **Plain headings** removes the end caps from first- and second-level headings.

Without the plugin the theme uses its defaults. The theme needs no plugins.

## Fonts

The theme sets no fonts. It uses Obsidian's default fonts, or whatever you choose under
**Settings → Appearance → Font**. The tests fail if a font is ever added.

The case of your note text never changes. Only interface labels are shown in capitals,
and the Style Settings option **Mixed-case interface labels** turns that off.

## Accessibility

- Text meets 4.5:1 contrast on every background, in both modes, and the tests enforce it.
- Keyboard focus is always visible as a gold outline.
- `prefers-reduced-motion` turns transitions off.
- `prefers-contrast: more` makes muted text full strength.
- Printing and PDF export drop the colour bars for black on white.

## Requirements

- Obsidian **1.6.0** or later.
- Desktop or mobile. The theme is plain CSS.

## Building from source

`theme.css` is generated from the modules in `src/`. Edit those modules, never the generated file.

```sh
npm install      # dev-only lint tools (oxlint)
npm run build    # regenerate theme.css from src/
npm run lint     # oxlint with the anti-slop rules
npm test         # contrast, packaging, naming and font checks
npm run check    # lint, stale-theme.css check and tests
HELM_CONSOLE_VAULT=/path/to/vault npm run deploy   # build and copy into a vault
```

The build itself needs only Node 22 or later. Linting uses `oxlint` with the
[anti-slop](https://github.com/dmmulroy/anti-slop) rule set (MIT), copied into
`tools/oxlint/anti-slop/`. The rules reject the low-evidence patterns AI-written code tends
to contain. To enable the pre-commit check, run `git config core.hooksPath .githooks`.

| Module | Contents |
| --- | --- |
| `src/00-settings.css` | Style Settings options |
| `src/01-tokens.css` | Geometry shared by both modes |
| `src/02-palette-dark.css` / `03-palette-light.css` | The two palettes |
| `src/04-obsidian-variables.css` | Palette mapped onto Obsidian's variables |
| `src/10-workspace.css` | Ribbon, tabs, panels, file explorer, status bar |
| `src/20-content.css` | Headings, rules, quotes, callouts, code, tables |
| `src/30-controls.css` | Buttons, fields, toggles, sliders |
| `src/40-overlays.css` | Modals, palette, menus, notices, tooltips, settings |
| `src/90-accessibility.css` | Reduced motion, high contrast, print |

## Affiliation and intellectual property

### No affiliation

Helm Console is an **independent, community-made theme** by a private individual. It is
**not affiliated with, endorsed by, sponsored by, licensed by, or connected to** Paramount
Global, CBS Studios, or any studio, network, production company or rights-holder of any
television or film property. No such relationship exists or is implied.

### Inspired by, not copied from

The theme is **inspired by** a broad visual idiom: flat coloured bars, rounded end caps
and curved panel joins, as seen in science-fiction set design of the late 1980s and 1990s.
A general style is not owned by anyone. This theme expresses it in original CSS.

"LCARS" is used in this README only to describe the style the theme is inspired by. It
is not the theme's name and does not appear in the theme itself. The theme's own name,
Helm Console, is original.

The project deliberately avoids:

- any franchise name, show title, character, ship, organisation or in-universe term in
  the theme's name, manifest, stylesheet or interface
- original screen graphics, artwork, logos, insignia, or tracings of them
- proprietary typefaces, or digitisations of them
- screenshots of any production, as assets or otherwise

Every shape in the theme is drawn with ordinary CSS: borders, radii and gradients. The
colour values are listed above. Colours themselves are not copyrightable.

The tests enforce this. They fail the build if a franchise name or in-universe term,
LCARS included, appears in the manifest, the stylesheet or the package metadata.

### Trademarks

LCARS is a term from a television franchise owned by Paramount Global / CBS Studios,
and any rights in it belong to them. It is used here only descriptively. All other
trademarks are the property of their respective owners. Obsidian is a trademark of
Dynalist Inc. This theme is a community theme for Obsidian and is not produced or endorsed by
Dynalist Inc.

### If you are a rights-holder

If you think anything here oversteps, please open an issue. Any good-faith concern will
be dealt with promptly and without argument.

## Licence

Released under the **MIT Licence**. See [LICENSE](LICENSE). That licence covers only the
original CSS and documentation in this repository, and grants no rights in any third
party's trademarks or copyrighted works.

The lint rules in `tools/oxlint/anti-slop/` are © Dillon Mulroy, also under the MIT
Licence. See [their LICENSE](tools/oxlint/anti-slop/LICENSE).
