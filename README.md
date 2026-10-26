# Православни календар 2026 (Orthodox Calendar 2026)

A complete Orthodox liturgical calendar for 2026 following the Serbian Orthodox Church (Српска православна црква) calendar. The application is a single-page, dependency-free web app that shows every day of the year with its New Style (Gregorian) and Old Style (Julian) date, saints and feasts, fasting rules, patron-saint days (крсне славе), readings, and folk customs.

![License](https://img.shields.io/badge/license-MIT-purple)
![PWA](https://img.shields.io/badge/PWA-enabled-blue)
![Version](https://img.shields.io/badge/version-3.0.0-b4892f)

<img width="1184" height="159" alt="pc" src="https://github.com/user-attachments/assets/1f2549ad-77b2-4474-b4a8-dc05ec71c315" />

---

## What's new in v3.0

### Accurate 2026 fasting data

All 365 days were re-checked against the 2026 fasting calendar of the Serbian Orthodox Church
(`srpskikalendar.rs/cir/kalendar-posta/2026/`). The year now contains exactly:

| Category | Days |
|---|---:|
| Fast-free / мрсно | 166 |
| Strict fast / сухоједење | 5 |
| On water / пост на води (no oil) | 85 |
| Oil and wine / пост на уљу | 76 |
| Fish, oil and wine / риба дозвољена | 26 |
| White dairy, no meat / бели мрс | 7 |
| **Total** | **365** |

That gives **192 fasting days** in 2026: **90 on water** (including the 5 strict days), **76 on oil**
and **26 with fish**, plus the 7 dairy days of Cheesefare week that are not counted as fasting days.
The four major fasts are: Great Lent (23 Feb – 11 Apr), Apostles' Fast (8 Jun – 11 Jul),
Dormition Fast (14 – 27 Aug) and Nativity Fast (28 Nov 2026 – 6 Jan 2027).

Special 2026 note: **Annunciation falls on Great Tuesday (7 April)**, inside Holy Week, so fish is
not allowed that day — wine and oil only.

### New features and fixes

- **Fast tracker** — four cards for the major fasts with start/end dates, current status, remaining
  days, a progress bar and a click-to-jump action.
- **Saint of the day** — a compact horizontal card: “Светитељ дана: Свети мученик Карп, 26. Октобар
  2026. (ст. 13.), Мрсно (без поста) · Детаљи дана”, with feast / patron-saint badges and the
  day's reading inline. The old stacked layout is gone, so the card no longer leaves a large empty
  area on the right.
- **.ics export** — the “Извези .ics” button (shortcut `E`) downloads `pravoslavni-kalendar-2026.ics`
  with all 365 days as all-day events. Each event carries the saint, new and old calendar dates,
  fasting rule, feast/slava category and notes. The export follows the active Cyrillic/Latin script.
- **“Стари календар” wording** — the Old Style label in the day modal is now “Стари календар”
  (Latin: “Stari kalendar”) instead of “Стари стил”.
- **Detailed day modal** — feast and slava badges, the exact fasting rule, Scripture readings,
  a short description of the feast, folk customs, the calendar note and a disclaimer.
- **Corrected feast and slava flags** — 26 major feasts and the 10 most common Serbian patron-saint
  days (Никољдан, Ђурђевдан, Аранђеловдан, Јовањдан, Митровдан, Видовдан, Св. Петка,
  Св. Василије, Савиндан, Илиндан) are marked consistently.
- **Dark theme corrected** — the purple-on-dark contrast problems are fixed with targeted overrides
  instead of a global colour inversion; borders, buttons, search, legend, modal and footer all pass
  a visual contrast check.
- **Sticky month navigation + scroll spy** — the month bar stays visible while scrolling and the
  active month follows the page. Month jumps respect the sticky header offset.
- **Scroll position preserved** when switching Cyrillic ↔ Latin, filtering a slava, or searching.
- **Mobile layout rebuilt** — on phones the seven-column grid becomes a readable one-column day list
  (day number, old-style date, saint, fast dot, note); the month bar scrolls horizontally instead of
  growing into a tall block.
- **Search fixes** — Latin and Cyrillic queries, Serbian diacritics, correct result dates, result
  highlighting and calendar highlighting all work in both scripts.
- **Accessibility** — ARIA labels and roles on day cells, search results, legend and dialog; roving
  tabindex with arrow-key navigation between days; focus trap, `inert` background and focus restore
  in the modal; `aria-pressed` on script and slava buttons; visible focus rings.
- **Print layout** — only the twelve months are printed; tracker, legend, search, controls and modal
  are hidden; white backgrounds and page breaks are enforced.
- **Tray menu follows the script** — the Electron tray menu and tooltip now switch between
  Cyrillic and Latin together with the app (via `preload.js` + IPC).
- **PWA cache** — service worker cache bumped to `orthodox-calendar-v7`.
- **Desktop build** — the AppImage was rebuilt and overwrites
  `OrthodoxCalendar-2026-v3-x86_64.AppImage`.

---

## Features

### Calendar

- All twelve months of 2026 in one page.
- New Style and Old Style date on every day.
- Saints, feasts and liturgical notes for every day.
- Colour-coded fasting indicator on every day (including grey for fast-free days).
- Major feasts highlighted with a coloured left border and bold text.
- Patron-saint days marked with a small cross and the “Крсна слава” badge in the modal.
- “Today” highlighting with a pulse animation.
- Month-by-month navigation, previous/next arrows, and quick jump to any month.

### Fasting guide

Six categories are used throughout the app and explained in the collapsible legend:

| `f` | Class | Meaning |
|---:|---|---|
| 0 | `mrsno` | Fast-free — all food allowed |
| 1 | `suho` | Strict fast — dry eating (bread, water, raw fruit/vegetables, nuts, honey) |
| 2 | `bez` | On water — cooked food without oil or wine |
| 3 | `ulje` | Oil and wine allowed; no meat, fish, dairy or eggs |
| 4 | `riba` | Fish, oil and wine allowed |
| 5 | `beli` | White dairy (milk, eggs, cheese); no meat or fish |

### Search

- Search by saint or feast name in Serbian Cyrillic or Latin.
- Diacritic-insensitive matching (`c` ↔ `č`/`ć`, `s` ↔ `š`, `z` ↔ `ž`, `dj` ↔ `đ`).
- Dropdown results with the exact date; the calendar scrolls to the selected day and highlights all
  matching days.
- Works in both scripts, including Latin result rendering and highlighting.

### Calendar export (.ics)

- “Извези .ics” (or `E`) downloads `pravoslavni-kalendar-2026.ics`.
- The file contains 365 all-day events — one per calendar day — with the saint, new and old
  calendar dates, fasting rule, feast/slava categories, notes and readings.
- UTF-8, CRLF line endings and RFC 5545 line folding are used, so the file imports into Google
  Calendar, Apple Calendar, Thunderbird and Outlook.
- The export follows the active script: Cyrillic or Serbian Latin.

### Krsne slave filter

- Quick filter for the ten most common Serbian patron-saint days.
- Selecting a slava scrolls to the day, highlights it, and updates the active month.
- “Поништи” clears the filter. Button state is exposed through `aria-pressed`.

### Script switcher

- One-click switch between Serbian Cyrillic and Latin script.
- The choice is stored in `localStorage` and restored on the next launch.
- The whole UI is translated: header, month names, weekday names, saints, notes, legend, fast
  tracker, modal, search placeholder, footer and the Electron tray menu / tooltip.

### Themes and responsive design

- Light and dark themes with persistent preference and a `theme-color` update.
- Desktop/tablet seven-column calendar grid; phone list layout.
- Sticky, horizontally scrollable month bar on small screens.
- Print styles for A4 paper.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `T` | Toggle light/dark theme |
| `P` | Print |
| `D` | Jump to today |
| `E` | Export the calendar as an `.ics` file |
| `Esc` | Close search, modal or highlights |
| `Enter` / `Space` | Open the focused day |
| `←` `→` `↑` `↓` | Move between days when a day cell is focused |

---

## Desktop application (AppImage)

The Linux desktop edition bundles Electron and the same web app. It also provides a tray icon and
a native window (`main.js`). The tray context menu follows the app's Cyrillic/Latin preference via
`preload.js` and IPC, so it is never left in the wrong script.

```bash
chmod +x OrthodoxCalendar-2026-v3-x86_64.AppImage
./OrthodoxCalendar-2026-v3-x86_64.AppImage
```

The AppImage stores the application in `usr/share/orthodox-calendar/` and uses Electron’s runtime
from `usr/lib/electron/`. To inspect it:

```bash
./OrthodoxCalendar-2026-v3-x86_64.AppImage --appimage-extract
```

### Rebuilding the AppImage

The build is intentionally simple and does not require `electron-builder`:

```bash
# 1. Extract the current AppImage
./OrthodoxCalendar-2026-v3-x86_64.AppImage --appimage-extract

# 2. Copy the updated web files into the extracted tree
cp index.html main.js preload.js sw.js manifest.json package.json \
   squashfs-root/usr/share/orthodox-calendar/

# 3. Repack the squashfs
mksquashfs squashfs-root app.squashfs -comp gzip -b 131072 -all-root -noappend

# 4. Prepend the original AppImage runtime
OFFSET=$(./OrthodoxCalendar-2026-v3-x86_64.AppImage --appimage-offset)
head -c "$OFFSET" OrthodoxCalendar-2026-v3-x86_64.AppImage > new.AppImage
cat app.squashfs >> new.AppImage
chmod +x new.AppImage
```

The runtime length can change between Electron versions. `--appimage-offset` prints the exact
number of runtime bytes (193728 for this build), which is more reliable than searching for the
`hsqs` magic because the Electron runtime can contain the same byte sequence.

---

## Project structure

```
orthodox-calendar/
├── index.html                              # App, data, CSS and JavaScript
├── main.js                                 # Electron main process (window + tray)
├── preload.js                              # Secure bridge for the tray language
├── manifest.json                           # PWA manifest
├── sw.js                                   # Service worker (cache v7)
├── favicon.png                             # 192×192 icon
├── logo.png                                # Large logo
├── tray-icon*.png                          # Adaptive KDE tray icons
├── package.json                            # Electron app metadata (v3.0.0)
├── README.md
└── OrthodoxCalendar-2026-v3-x86_64.AppImage
```

### Data structure

Calendar data lives in the `months` array inside `index.html`:

```js
{
  name: "ЈАНУАР",
  firstDay: 4,          // 0 = Sunday … 6 = Saturday
  days: [
    {
      n: 1,             // New Style day number
      o: 19,            // Old Style day number
      s: "Свети мученик Бонифатије",
      f: 3,             // Fasting category 0–5
      feast: true,      // Optional: major feast badge
      slava: true,      // Optional: patron-saint day badge
      note: "Туциндан"  // Optional: liturgical or folk note
    }
  ]
}
```

Additional maps in the same script:

- `dayDetails` — descriptions, readings and folk customs for major days.
- `fastPeriods` — the four major fasts with 2026/2027 boundaries and colours.
- `slaveList` — the ten patron-saint days used by the filter.
- `fastLabels`, `fastDescriptions`, `fastColors` — the six fasting categories.

### Customizing

- **Colours and themes:** edit the `:root` and `[data-theme="dark"]` custom properties.
- **Fasting categories:** update `fastLabels`, `fastDescriptions`, `fastColors` and the
  `.legend-dot` / `.fast-indicator` rules.
- **Data:** edit the `months` array; keep `f` in the 0–5 range and use `feast` / `slava` only where
  appropriate.
- **Translations:** `cyrToLat` handles automatic transliteration; UI strings are in
  `updateStaticUI()` and the render functions.

---

## Usage

1. Open `index.html` directly in a browser, or serve the folder with any static server.
2. For PWA/offline use, serve over HTTP(S); service workers do not register from `file://`.
3. Click any day to open its details. Click a fast card to jump to the start of that fast.
4. Use the search field, slava filter and month bar to navigate.
5. Click “Извези .ics” (or press `E`) to download the whole year as an `.ics` file and import it
   into Google Calendar, Apple Calendar, Thunderbird or Outlook.

### Installation (web)

```bash
git clone https://github.com/Vojislav77/orthodox-calendar-2026.git
cd orthodox-calendar-2026
# open index.html, or:
python3 -m http.server 8000
# then visit http://localhost:8000
```

No build step, no npm dependencies and no external CDN requests are required.

---

## Changelog

### v3.0 (current)

- Replaced the 2026 fasting data with the exact per-day categories from the Serbian Orthodox
  fasting calendar (192 fasting days; 90 water / 76 oil / 26 fish; 7 dairy days).
- Added strict-fast days, white-dairy days and the sixth legend category.
- Added the fast tracker, saint-of-the-day card and detailed day modal.
- Added feast flags for Annunciation, Entrance of the Theotokos, Beheading of St John and Holy
  Saturday; added `slava` flags for ten patron-saint days.
- Fixed dark-theme contrast, sticky navigation, scroll spy, scroll-to-top placement and the
  scroll position when switching scripts.
- Rebuilt the mobile calendar as a readable list and made the month bar scroll horizontally.
- Fixed Latin/Cyrillic search results and highlight rendering.
- Added accessibility: ARIA roles/labels, roving tabindex, arrow-key day navigation, focus trap,
  `inert` background, focus restore and visible focus rings.
- Added `.ics` export for all 365 days, with script-aware summaries and descriptions.
- Renamed “Стари стил” to “Стари календар” (“Stari kalendar”).
- Rebuilt the saint-of-the-day card as a single horizontal line.
- Localized the Electron tray menu and tooltip through `preload.js`.
- Updated the service worker cache to `orthodox-calendar-v7`.
- Rebuilt `OrthodoxCalendar-2026-v3-x86_64.AppImage`.

### v2.0

- Fixed the `f` / `fast` property conflict that rendered some fasting days as fast-free.
- Added Serbian Latin diacritic normalization to search.
- Improved “Today” navigation with a visual pulse.
- Centered the current month on first launch.
- Added adaptive monochrome KDE tray icons.
- Updated the PWA cache to v4.

---

## Browser support

The app targets current browsers and the bundled Electron 43 runtime:

- Chrome / Edge 100+
- Firefox 100+
- Safari 16+
- Modern Android and iOS browsers

It uses `overflow: clip`, `inert`, `:focus-visible`, CSS custom properties and `backdrop-filter`.

---

## Data sources and accuracy

- Calendar dates, saints and fasting categories: Serbian Orthodox Church calendar for 2026
  (`srpskikalendar.rs`).
- Old Style dates are calculated from the Julian calendar (13-day difference in 2026).
- Fasting rules are general. Individual parishes, monks and the faithful may have a blessing for a
  different practice; always follow the guidance of your parish priest.

**Disclaimer:** This application is a reference tool. It is not an official liturgical publication.
For services, fasting exceptions and pastoral questions, consult your local parish.

---

## License

MIT License. See `LICENSE`.

## Contributing

Contributions are welcome:

- Corrections to saints, feasts, readings or fasting categories.
- Additional `dayDetails` entries and folk customs.
- Translation and accessibility improvements.
- Performance and print-layout improvements.

Please open an issue or a pull request with a clear description and a source for any calendar
correction.

---

**Made with ❤️ for the Orthodox Christian community.**
