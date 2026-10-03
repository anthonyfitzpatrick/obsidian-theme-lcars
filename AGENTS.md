# Helm Console — repository guide

An Obsidian community theme. Plain CSS, no runtime JavaScript, no dependencies.

## Commands

- `npm run build` regenerates `theme.css` from `src/*.css`, which are concatenated in filename order.
- `npm test` runs the contrast, packaging and naming checks (`node --test tests/`).
- `npm run check` runs both and fails if `theme.css` is stale. CI and the pre-commit hook run this.
- `HELM_CONSOLE_VAULT=<vault> npm run deploy` builds the theme and copies it to `<vault>/.obsidian/themes/Helm Console/`.

## Rules

- Never edit `theme.css` by hand. Edit `src/` and rebuild.
- Palettes (`src/02`, `src/03`) hold colours only. Structure goes in the component modules and uses `--hc-*` tokens.
- Every new text/background pairing must be added to `tests/contrast.test.mjs` and must pass in both modes.
- **Naming and IP:** the theme is *inspired by* a 1980s TV science-fiction console style. Never put a franchise name, show title, in-universe term, or the style's in-universe name into the manifest, CSS, package metadata, or UI strings. `tests/naming.test.mjs` enforces this. The README's affiliation section is the only place a rights-holder is named, and only in order to disclaim them.
- Do not load remote resources (`@import`, remote `url()`). The community theme directory forbids it.
- `manifest.json` and `package.json` versions must match. Do not push tags unless a release is explicitly requested.
- Remote `origin` pushes to both GitHub and Gitea. `github` is the fetch-only reference.
