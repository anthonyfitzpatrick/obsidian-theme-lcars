# Helm Console — repository guide

An Obsidian community theme. Plain CSS, no runtime JavaScript. The scripts and tests are
strict TypeScript, run directly by Node 22.18+ (no compile step). The only dependencies
are dev tools.

## Commands

- `npm run build` regenerates `theme.css` from `src/*.css`, concatenated in filename order.
- `npm run lint` runs oxlint (with the vendored **anti-slop** rules) on the TypeScript and stylelint on `src/`.
- `npm run typecheck` runs `tsc --noEmit` (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- `npm test` runs `node --test "tests/*.test.ts"`. It's a glob because Node 22 doesn't search a directory argument.
- `npm run check` runs lint, typecheck, the stale-`theme.css` check and the tests. CI, the pre-commit hook and the release workflow run it. A `PostToolUse` hook in `.claude/settings.json` runs `npm run lint` after every edit Claude makes.
- `HELM_CONSOLE_VAULT=<vault> npm run deploy` builds the theme and copies it to `<vault>/.obsidian/themes/Helm Console/`.
- `scripts/screenshots.sh` regenerates the documentation screenshots from the demo vault. See `docs/SCREENSHOTS.md`.

## Obsidian's theme guidelines (enforced; see .stylelintrc.json)

- **Variables first.** General variables go under `body` and colours under `.theme-light` / `.theme-dark` (`src/01`, `src/04`). If Obsidian draws a state from a variable (hover backgrounds, the chosen settings section, menu highlights, ribbon hover), set that variable on the element rather than outranking Obsidian's rule.
- **Low specificity.** stylelint caps selectors at `0,3,0`. Wrap context and Style Settings switches in `:where()`. The one place that matches Obsidian's own heavier selector (`.workspace .mod-root .workspace-tab-header`, for tab padding) is commented.
- **No `!important`, no remote assets, no fonts.** stylelint and the tests fail on any of them.
- **No obfuscation, ads or telemetry.**
- **Releases:** a GitHub release whose tag equals `manifest.json`'s version, with `manifest.json` and `theme.css` attached. `.github/workflows/release.yml` does this, but only when a tag is pushed. Don't push tags unless a release is explicitly requested.

## Anti-slop rules

- `tools/oxlint/anti-slop/` is vendored from the Developmental Editor, MIT, © Dillon Mulroy. It isn't an npm package, so edit the rules to suit.
- Don't silence a rule with a disable comment. Fix the code: use named domain types, and give any type assertion a `SAFETY:` comment.
- JSON is parsed only in `scripts/json.ts`, the one file allowed `typeof` in type guards. Read fields through it into named types (`scripts/project.ts`).
- CSS: no duplicate selectors or properties, no hex colours outside the palettes, and every `--hc-*` token both defined and used (`tests/tokens.test.ts`).

## Other rules

- Never edit `theme.css` by hand. Edit `src/` and rebuild.
- Palettes (`src/02`, `src/03`) hold colours only. Structure goes in the component modules and uses `--hc-*` tokens.
- Every new text/background pairing goes in `tests/contrast.test.ts` and must pass in both modes.
- **Naming and IP:** the README and User Guide may say the theme is *inspired by LCARS, the interface style from Star Trek: The Next Generation*, always with the no-affiliation statement and the trademark notice ("Star Trek and related marks are trademarks of CBS Studios Inc."). Never "official", "licensed" or "the LCARS theme". The README's opening paragraph is the directory excerpt, so it carries the inspiration line and the disclaimer. Never put a franchise name, show title or in-universe term (LCARS and Star Trek included) into the theme name, manifest, CSS, package metadata or UI strings. `tests/naming.test.ts` enforces this. The theme name stays Helm Console: Obsidian's directory already lists a theme called "LCARS".
- Screenshots come only from the demo vault (`docs/Helm Console Demo`), never from a real vault.
- `manifest.json` and `package.json` versions must match.
- Remote `origin` pushes to both GitHub and Gitea. `github` is the fetch-only reference.

## Project notes

Planning, design, decisions and backlog live in the Wolf 359 Press AB vault under `Software Development/Obsidian Plugins and Themes/LCARS Theme/` (start at `LCARS Theme.md`). Update them when a decision or the backlog changes.
