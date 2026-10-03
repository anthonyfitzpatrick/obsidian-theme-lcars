# Helm Console — User Guide

This guide covers everything you can see and change in Helm Console, an LCARS-inspired
theme for Obsidian. For a shorter overview, see the [README](README.md).

> Helm Console is an independent, unofficial, fan-made theme. It is not affiliated with,
> endorsed by, sponsored by, or connected to Paramount Global, CBS Studios or any other
> rights-holder.

## Contents

1. [Installing](#1-installing)
2. [Choosing dark or light](#2-choosing-dark-or-light)
3. [A tour of the window](#3-a-tour-of-the-window)
4. [A tour of your notes](#4-a-tour-of-your-notes)
5. [Controls, menus and messages](#5-controls-menus-and-messages)
6. [Fonts](#6-fonts)
7. [Style Settings switches](#7-style-settings-switches)
8. [Customising with a CSS snippet](#8-customising-with-a-css-snippet)
9. [Plugins](#9-plugins)
10. [Accessibility](#10-accessibility)
11. [Printing and PDF export](#11-printing-and-pdf-export)
12. [Troubleshooting](#troubleshooting)
13. [FAQ](#faq)
14. [Uninstalling](#14-uninstalling)
15. [Getting help](#15-getting-help)

---

## 1. Installing

### Manual installation

1. Download two files from the repository: `theme.css` and `manifest.json`.
2. Open your vault's folder in Finder, Explorer or your file manager.
3. Open the `.obsidian` folder inside it. It is hidden by default:
   - **macOS:** press `Cmd + Shift + .` in Finder to show hidden files.
   - **Windows:** in Explorer, choose **View → Show → Hidden items**.
   - **Linux:** press `Ctrl + H` in most file managers.
4. Inside `.obsidian`, open (or create) the `themes` folder.
5. Create a folder named exactly **`Helm Console`**: a capital H, a capital C and one
   space. Obsidian matches the folder name to the theme's name, and any difference
   stops the theme appearing.
6. Put `theme.css` and `manifest.json` in that folder.
7. In Obsidian, open **Settings → Appearance**. Under **Themes**, choose
   **Helm Console**.

If the theme doesn't appear in the list, close Obsidian completely and reopen it.

### From the community directory

Helm Console hasn't been submitted to Obsidian's community theme directory yet. Once it
is listed, open **Settings → Appearance → Themes → Manage**, search for
**Helm Console** and choose **Install and use**.

### Updating

Replace both files with their new versions. Obsidian reads a theme once and doesn't
notice when its file changes, so after updating either:

- switch to another theme in **Settings → Appearance** and back to Helm Console, or
- restart Obsidian.

---

## 2. Choosing dark or light

Open **Settings → Appearance → Base color scheme** and choose **Dark**, **Light**, or
**Adapt to system** to follow your operating system.

**Dark mode** is the look the style is known for: bright bars on black. Use it if you
want the full console effect, or if you work in a dim room.

**Light mode** is clean and cool, with no black anywhere: a near-white page, a light grey
frame around it and slightly darker grey sidebars. Use it in bright rooms, or if you
prefer dark text on a light page for long reading.

Both modes use the same shapes. Only the colours change.

---

## 3. A tour of the window

### The ribbon and the elbow

The **ribbon** is the column of icons at the far left of the window. Helm Console draws
it as a stack of coloured segments, one per icon, separated by thin gaps. The colours
repeat in the order orange, peach, blue, gold. The buttons at the foot (help and
settings) are violet. Icons are drawn in black on the segments, and a segment turns red
under the pointer.

The top of the ribbon curves to the right into a lavender bar that runs along the foot
of the tab row. A small concave curve fills the inside corner where they meet. This
joined shape is the **elbow**, the signature of the style.

On macOS, Obsidian keeps a strip at the top-left of the window clear for the window
buttons (close, minimise, zoom), so the ribbon starts just below that strip, level with
the tab-row bar.

If you'd rather have a plain ribbon, turn on **Plain ribbon** (see
[Style Settings switches](#7-style-settings-switches)).

### Tabs

Every tab is a **pill** with rounded ends, and labels are in capitals.

| Tab state | Looks like |
| --- | --- |
| Inactive | A dim pill with light text (dark mode) or dark text (light mode) |
| Under the pointer | Violet, with black text |
| Active, in another pane | Peach, with black text |
| Active, in the pane you're working in | Orange, with black text |

The sidebars' tabs are icons. The active one sits in a lavender pill.

### Sidebars

Sidebars sit on their own panel colour: near-black in dark mode, light grey in light
mode. This keeps them visually separate from the page.

### The file explorer

- **Folder names** are gold and in capitals.
- **The open file** is a dim bar with an orange cap on its left edge.
- **Other selected files** (when you select several) carry a gold cap.
- Disclosure arrows are orange.

The open file deliberately isn't a bright fill. Plugins that colour file names (see
[Plugins](#9-plugins)) would otherwise become unreadable on it.

### View headers and breadcrumbs

The title at the top of each page is gold and in capitals. The breadcrumb path beside
it is muted.

### The status bar

The status bar in the lower right is an **orange bar with a rounded left end**. Its
text and icons are black. Clickable items turn gold under the pointer.

### Dividers and scrollbars

The gaps between panes take the frame colour: black in dark mode, light grey in light
mode. Scrollbar thumbs are rounded. They are dim at rest and turn lavender while you
drag them.

---

## 4. A tour of your notes

Helm Console never changes your note text. Its font is your font, and its case is your
case. Only the decorations around it change.

### Headings

| Level | Colour | Decoration |
| --- | --- | --- |
| H1 | Orange | An orange end cap before the text, and a thin rule underneath in reading view |
| H2 | Lavender | A lavender end cap before the text |
| H3 | Gold | None |
| H4 | Blue | None |
| H5 | Violet | None |
| H6 | Grey | None |

The end caps are small blocks with a rounded outer edge and a straight inner edge,
centred on the heading text with a gap before it. They look the same in live preview and
reading view. To remove them, turn on **Plain headings**.

The note's title at the top of the page (the inline title) is orange.

### Lists

Bullets and numbers are orange. A collapsed list item's marker is gold.

### Links

- Links to other notes and to websites are **blue**, turning orange under the pointer.
- Links to notes that don't exist yet are **lavender**.

### Quotes

Block quotes have a rounded lavender bar down their left side.

### Callouts

Callouts have a thick cap on the left in the callout's colour, rounded at the outer
corners, and a light tint of the same colour behind the text. Titles are in capitals.

The callout colours come from the theme's palette, so they match the bars:

| Callout types (examples) | Colour |
| --- | --- |
| note, info, todo, tip, important | Blue |
| success, check, done | Green |
| question, warning | Orange |
| failure, danger, bug | Red |
| example | Lavender |
| quote | Grey |

### Code

- Inline code and code blocks sit on their own background that stands apart from the
  page.
- Code blocks have a rounded blue cap on the left.
- Syntax colours use the palette: keywords lavender, strings green, functions gold,
  numbers and values orange, properties blue.

### Tables

The header row is a lavender bar with black labels, and its top-left corner is rounded.
Alternate body rows are lightly tinted to help your eye follow a row across.

### Horizontal rules

A horizontal rule (`---`) is a segmented bar: orange, then lavender, then blue, with
rounded ends.

### Tags

Tags are outlined violet pills.

### Properties

The properties block at the top of a note keeps Obsidian's own layout. Property names are
gold, and a dim bar runs down the block's left side.

### Highlights and selection

Highlighted text (`==like this==`) gets a gold tint. Selected text gets an orange tint.

---

## 5. Controls, menus and messages

### Buttons

| Button | Looks like |
| --- | --- |
| Ordinary button | A lavender pill with black text |
| Main action (for example **Install**, **Save**) | An orange pill |
| Destructive action (for example **Delete**) | A red pill |
| Under the pointer | Gold |
| Disabled | A dim pill with muted text |

Small buttons inside properties, notices, note content, the editor, the file tree, the
status bar and view headers are left unfilled, so they don't crowd the content.

### Text fields and dropdowns

These keep Obsidian's own shapes in the theme's colours. When a field has keyboard
focus it gets a gold ring.

### Toggles

Toggles are pills: orange with a black knob when on, dim with a lighter knob when off.

### The command palette and quick switcher

The selected result is a full **orange bar** with black text. The letters that match
what you typed are underlined on the selected row and orange on the others.

### Menus

Right-click menus are rounded panels with a lavender border. The row under the pointer
becomes a lavender bar. Destructive items (such as **Delete**) become a red bar under the
pointer.

### Dialogs

Dialogs have a lavender border with a thicker top edge, and an orange title.

### Settings

The section list on the left shows the selected section as an orange bar. Group titles
are gold, and setting headings are orange.

### Notices (pop-up messages)

Obsidian's pop-up messages, including errors and sync messages, appear as panels with a
**gold border and a thick gold cap** on the left. The background is the theme's panel
colour, so the message text, links and buttons inside stay readable in both modes.

### Tooltips

Tooltips are peach pills with black text.

---

## 6. Fonts

Helm Console sets **no fonts**. It always uses Obsidian's default fonts, or whatever you
choose under **Settings → Appearance → Font**:

- **Interface font**: menus, tabs, sidebars, settings.
- **Text font**: your notes.
- **Monospace font**: code.

The theme only changes *how* interface labels look (capitals with open letter spacing),
never *which* font they use.

**Tip:** the style traditionally uses a tall, narrow typeface for interface labels. If
you'd like that look, install a condensed font on your computer and choose it as your
**Interface font**. Your notes keep your text font.

---

## 7. Style Settings switches

Helm Console works without plugins. If you install the free
[Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin, open
**Settings → Style Settings → Helm Console** for three switches:

### Mixed-case interface labels

Turns off the capitals on tab titles, view headers, folder names, buttons, the status
bar, callout titles and settings headings. Labels then appear in their original case.
Your note text is never capitalised either way.

### Plain ribbon

Replaces the segmented, swept ribbon with a single plain panel with a lavender edge, and
removes the lavender bar along the foot of the tab row. Choose this for a quieter
window.

### Plain headings

Removes the end caps from first- and second-level headings. The heading colours stay.

All three switches are off by default.

---

## 8. Customising with a CSS snippet

Every colour and size in Helm Console is a CSS variable whose name starts with `--hc-`.
You can change any of them with a CSS snippet, without editing the theme. Your changes
survive theme updates.

### Creating a snippet

1. Open **Settings → Appearance**, scroll to **CSS snippets** and click the folder
   icon. This opens your vault's `.obsidian/snippets` folder.
2. Create a text file there named, for example, `helm-console-custom.css`.
3. Paste in one of the examples below and save.
4. Back in **Settings → Appearance → CSS snippets**, click the refresh icon and turn
   your snippet on.

### Changing colours

Colours are set separately for each mode. Use `.theme-dark` for dark mode and
`.theme-light` for light mode:

```css
/* A redder orange in dark mode */
.theme-dark {
  --hc-bar-orange: #ff7f2a;
  --hc-ink-orange: #ff7f2a;
}

/* A warmer page in light mode */
.theme-light {
  --hc-screen: #fdfbf7;
}
```

Bar colours (`--hc-bar-*`) are fills that carry black labels. Ink colours
(`--hc-ink-*`) are text drawn directly on the page. If you change a colour, check that
text on it stays readable: aim for a contrast ratio of 4.5:1 or more.

#### Colour variables

| Variable | What it colours |
| --- | --- |
| `--hc-screen` | The page |
| `--hc-frame` | Tab rows, ribbon gaps, dividers |
| `--hc-panel` | Sidebars |
| `--hc-surface` | Fields and raised surfaces |
| `--hc-surface-hover` | Rows and controls under the pointer |
| `--hc-code-bg` | Code |
| `--hc-text`, `--hc-text-muted`, `--hc-text-faint` | Text, from strongest to faintest |
| `--hc-on-bar` | Labels on bars (black) |
| `--hc-bar-orange`, `-gold`, `-peach`, `-lavender`, `-violet`, `-blue`, `-red`, `-dim` | The bars |
| `--hc-ink-orange`, `-gold`, `-lavender`, `-violet`, `-blue`, `-red`, `-green` | Coloured text |
| `--hc-selection`, `--hc-highlight` | Selected and highlighted text |

### Changing sizes

Sizes are shared by both modes. Set them on `body`:

```css
body {
  --hc-heading-gap: 1em;     /* more space between heading caps and text */
  --hc-cap: 0.4em;           /* thinner heading caps */
  --hc-bar: 4px;             /* thinner bars, rules and quote bars */
  --hc-elbow: 20px;          /* a tighter elbow curve */
}
```

#### Size variables

| Variable | Default | What it sets |
| --- | --- | --- |
| `--hc-elbow` | `28px` | Radius of the ribbon's elbow curve |
| `--hc-bar` | `6px` | Thickness of the tab-row bar, rules, quote bars and caps on the file explorer |
| `--hc-gap` | `3px` | Gap between ribbon segments |
| `--hc-cap` | `0.55em` | Width of the H1 end cap (the H2 cap is 80% of this) |
| `--hc-heading-gap` | `0.75em` | Space between a heading cap and its text |
| `--hc-panel-radius` | `18px` | Corner radius of dialogs, callouts and notices |
| `--hc-ribbon-width` | `46px` | Width of the ribbon |
| `--hc-label-tracking` | `0.07em` | Letter spacing of capitalised labels |

### Examples

**Square off the tabs:**

```css
.workspace .mod-root .workspace-tab-header {
  border-radius: 6px;
}
```

**Give the active tab the gold bar instead of orange:**

```css
.workspace .mod-root .workspace-tabs.mod-active .workspace-tab-header.is-active {
  background: var(--hc-bar-gold);
}
```

---

## 9. Plugins

Helm Console is designed to work with plugins without special support from them.

### Plugin buttons

Many plugins add buttons to their own views. Helm Console sets button colours through
Obsidian's standard variables, scoped to each button, so a plugin that restyles its
buttons with those variables still gets black labels on a coloured bar. A plugin's own
active or selected style (an underline, say) still shows, because the theme's button
rule is deliberately low in priority.

### File-colour plugins

Plugins that colour file and folder names in the explorer set those colours directly on
each name. Helm Console shows the open file as a dim bar with an orange cap, so the
plugin's colour stays readable on it.

### Style Settings

See [Style Settings switches](#7-style-settings-switches).

### If a plugin looks wrong

Most problems come from a plugin that sets its own colours or backgrounds without using
Obsidian's variables. Try this:

1. Switch to Obsidian's default theme. If the plugin still looks wrong, the problem is
   in the plugin, not the theme.
2. If it only looks wrong with Helm Console, open an issue with a screenshot and the
   plugin's name.
3. In the meantime, a CSS snippet can usually fix it (see
   [Customising with a CSS snippet](#8-customising-with-a-css-snippet)).

---

## 10. Accessibility

- **Contrast.** All text meets the WCAG 4.5:1 contrast ratio against its background, in
  both modes. Labels on bars meet 4.5:1. Disabled controls and switched-off toggles meet
  3:1. Automated tests check every pairing, so a change that breaks contrast can't be
  released.
- **Keyboard focus** is always shown as a gold outline, so you can see where you are
  when navigating by keyboard.
- **Reduced motion.** If you turn on reduced motion in your operating system, Helm
  Console turns off transitions and animations.
  - macOS: **System Settings → Accessibility → Display → Reduce motion**.
  - Windows: **Settings → Accessibility → Visual effects → Animation effects** (off).
- **Increased contrast.** If you turn on increased contrast in your operating system,
  muted and faint text is drawn at full strength and borders are strengthened.
  - macOS: **System Settings → Accessibility → Display → Increase contrast**.
- **Capitals.** Some readers find capitalised labels slower to read. Turn on
  **Mixed-case interface labels** to switch them off.
- **Weight as well as colour.** The active tab's label and the open file's name are
  drawn bolder, and the open file also carries an orange cap, so these states don't rely
  on colour alone.

---

## 11. Printing and PDF export

When you print a note or export it as a PDF, Helm Console drops its screen styling: the
page is white, all text and headings are black, links are black, and the heading caps are
removed. Code keeps a pale grey background. Your printed notes look like an ordinary
document, not a screenshot of the console.

---

## Troubleshooting

### The theme doesn't appear in Settings → Appearance

- Check the folder name is exactly `Helm Console`, with the same capitals and one space.
- Check the folder contains both `theme.css` and `manifest.json`, not a subfolder holding
  them.
- Check the folder is inside `.obsidian/themes/` in the vault you have open.
- Restart Obsidian.

### I updated the theme but nothing changed

Obsidian doesn't reload a theme when its file changes. Switch to another theme and back,
or restart Obsidian.

### My fonts look different from the screenshots

Helm Console uses your own font settings. Check **Settings → Appearance → Font**.

### Everything is in capitals and I don't want that

Install Style Settings and turn on **Mixed-case interface labels**. Your note text is
never capitalised.

### The heading caps sit oddly or collide with text

The caps are sized to the heading text. If you use a very large or very unusual heading
font, adjust them with `--hc-cap` and `--hc-heading-gap` in a snippet, or turn on
**Plain headings**.

### The ribbon's elbow looks misaligned

The elbow is tuned for Obsidian's default window frame on macOS, where the title bar is
hidden. With a native title bar (**Settings → Appearance → Window frame style**), or on
Windows and Linux, the ribbon may start slightly differently. Turn on **Plain ribbon** if
it bothers you, and please open an issue with a screenshot.

### A plugin's buttons or panels look wrong

See [If a plugin looks wrong](#if-a-plugin-looks-wrong).

### The accent colour setting does nothing

Helm Console sets its own accent colours (orange, gold and the other bars), so Obsidian's
**Accent color** setting has no effect. To change the accent, use a snippet that sets
`--hc-bar-orange` and `--hc-ink-orange` (see
[Changing colours](#changing-colours)).

### Something looks wrong after an Obsidian update

Obsidian occasionally renames parts of its interface. If something that looked right
before an update now looks wrong, open an issue with a screenshot and your Obsidian
version (**Settings → General**).

---

## FAQ

**Is this an official theme?**
No. Helm Console is an independent, unofficial, fan-made theme. It isn't affiliated with,
endorsed by, sponsored by, or connected to Paramount Global, CBS Studios or any other
rights-holder.

**Why isn't it called LCARS?**
Two reasons. Obsidian's community directory already lists a theme named "LCARS", and
theme names there must be unique. And LCARS is a term owned by a television franchise,
so the theme uses its own original name and uses "LCARS-inspired" only to describe the
style.

**Does the theme include any artwork from the shows?**
No. Every shape is drawn with ordinary CSS: borders, rounded corners and gradients. There
are no images, logos, insignia, screen graphics or proprietary fonts.

**Does the theme download anything?**
No. It loads no fonts, images or other files from the internet.

**Does it work on mobile?**
It hasn't been tested on mobile yet. It is plain CSS, so it should load, but some parts
may look different.

**Can I use only the dark mode?**
Yes. Set **Settings → Appearance → Base color scheme** to **Dark**.

**Can I change the colours?**
Yes, with a CSS snippet. See
[Customising with a CSS snippet](#8-customising-with-a-css-snippet).

**Does it slow Obsidian down?**
It shouldn't. The theme is a single stylesheet with no scripts, no images and no
expensive visual effects such as blurs or animated backgrounds.

---

## 14. Uninstalling

1. Open **Settings → Appearance** and choose another theme, or **Default**.
2. Optionally, delete the `.obsidian/themes/Helm Console/` folder.
3. If you made a snippet for Helm Console, turn it off or delete it under
   **Settings → Appearance → CSS snippets**.

Helm Console stores no settings of its own. Style Settings keeps its switch positions in
its own settings until you reset them there.

---

## 15. Getting help

Open an issue on the theme's repository. Please include:

- a screenshot of the problem,
- your Obsidian version (**Settings → General**),
- your operating system,
- whether you're in dark or light mode,
- any plugins involved.
