# Regenerating the screenshots

Every image in the README and User Guide is taken from the demo vault in
`docs/Helm Console Demo/`. It holds neutral sample notes that show every element the
theme styles. Taking screenshots from a real vault would publish its notes, so don't.

## One-off setup

1. Build the theme and install it into the demo vault:

   ```sh
   HELM_CONSOLE_VAULT="docs/Helm Console Demo" npm run deploy
   ```

2. In Obsidian, open **docs/Helm Console Demo** as a vault (vault switcher → **Open
   folder as vault**). Its `appearance.json` already selects Helm Console.
3. Make sure **Settings → General → Command line interface** is on, so the `obsidian`
   command can reach the running app.
4. In the demo vault, open `Welcome`, `Glossary` and `Survey Station` as tabs, with
   `Welcome` first, and expand the three folders in the file explorer.

## Capturing

```sh
scripts/screenshots.sh dark  /tmp/hc-shots
scripts/screenshots.sh light /tmp/hc-shots
cp /tmp/hc-shots/*.png docs/images/
```

The script pins the window's viewport to 1600×1000, reloads the theme, switches the
colour scheme, and captures five scenes for each mode:

| File | Scene |
| --- | --- |
| `01-overview-*.png` | The workspace with `Welcome` in live preview |
| `02-content-*.png` | `Welcome` in reading view, scrolled to the callouts, table and code |
| `03-palette-*.png` | The command palette, searching for "toggle" |
| `04-settings-*.png` | Settings → Appearance, forced into the main window |
| `05-menu-notice-*.png` | The file explorer's context menu with **Rename…** highlighted, plus a notice |

The script changes two settings in the demo vault so these scenes can be captured.
It turns `settingsPopoutWindow` off, because Obsidian otherwise opens Settings in a
separate window the screenshot can't reach. It turns `nativeMenus` off, because native
macOS menus aren't drawn by the page.

## Close-ups and the directory image

```sh
I=docs/images
for m in dark light; do
  ffmpeg -y -i $I/01-overview-$m.png    -vf "crop=700:340:0:0"      $I/06-elbow-$m.png
  ffmpeg -y -i $I/01-overview-$m.png    -vf "crop=1255:80:345:0"    $I/07-tabs-$m.png
  ffmpeg -y -i $I/01-overview-$m.png    -vf "crop=560:44:1040:956"  $I/08-status-bar-$m.png
  ffmpeg -y -i $I/05-menu-notice-$m.png -vf "crop=340:440:20:180"   $I/09-menu-$m.png
  ffmpeg -y -i $I/05-menu-notice-$m.png -vf "crop=280:56:1320:24"   $I/10-notice-$m.png
done
ffmpeg -y -i $I/01-overview-dark.png -vf "crop=1600:900:0:0,scale=512:288:flags=lanczos" screenshot.png
```

`screenshot.png` (512×288) is the image Obsidian's community theme directory shows.
