# Process log

## 2026-10-13: Setup

**Asked:** Write AGENTS.md with who the site is for, the constraints, routes, styles, and workflow. Then write `content/recipes.ts` with my dishes, and replace the starter page with the hub.

**Made:** Added project notes under the Next.js block in AGENTS.md and started this log.

**Made:** `content/recipes.ts`, a typed list of the seven dishes I cook: Nobu miso cod, beef enoki rolls, honey garlic salmon, Cantonese shrimp and egg, ground beef with bell peppers, banana oat pancakes, and strawberry overnight oats. Each has a meal (breakfast or dinner), a protein, minutes, servings, an optional make-ahead note, ingredients, and steps. The agent drafted the amounts and steps; I still need to check them against how I actually cook.

**Made:** Replaced the starter page with the hub at `/`, which has the three sections from the brief: (1) mood boards with swatch cards, (2) design systems with "Aa" and dot cards, and (3) a dark "Open Recipe Book →" button. The style names are Greek Summer, French Café, and Old Hong Kong Nostalgia (`content/styles.ts`), and the swatch colors are placeholders until the mood boards are done. Added placeholder pages for `/mood-boards/[style]`, `/design-systems/[style]`, and `/recipes`. Unknown styles return a 404. Removed the starter's dark mode and set the page title to "Recipe Book".

## 2026-10-13: Rename the styles

**Asked:** I renamed the photo folders to Greek Summer, Parisian Morning, and Old Hong Kong. Update the project to match.

**Made:** Updated the style names and route slugs in `content/styles.ts` (`/mood-boards/greek-summer`, `/mood-boards/parisian-morning`, `/mood-boards/old-hong-kong`, and the same for design systems). Added a `folder` field that points each style to its photo folder, and updated the styles table in AGENTS.md.

**Pushed back:** I picked the names myself instead of the agent's suggestions ("French Café", "Old Hong Kong Nostalgia").

## 2026-10-13: Mood boards

**Asked:** Build the three mood boards from my photos and descriptions, with 25 to 30 artifacts each. Greek Summer: a seaside terrace, whitewashed walls, Aegean blue, sun-bleached and relaxed. Parisian Morning: ivory, gold, marble, serif or cursive type, elegant and chic. Old Hong Kong: cha chaan teng, neon lights, mixed Chinese and English.

**Made:**
- Renamed the 30 photos to descriptive file names (for example `santorini-blue-domes.jpg`). The Pinterest names had `#`, emoji, and a long Chinese caption that break URLs. The folder names stayed the same.
- Each board has 28 artifacts: my 10 photos plus 18 pieces the agent made in code (palette swatches, type specimens, textures, and interface pieces). Agent-made pieces have a ✦ marker.
  - **Greek Summer** (Marcellus + Manrope, soft rounded corners): whitewash, Aegean, sky wash, limestone, olive, and lemon swatches; limewash, Greek key, awning stripe, and sea ripple textures; an arch shape; buttons, filter chips, and a recipe card.
  - **Parisian Morning** (Cormorant Garamond + Pinyon Script + Jost, square corners, gold hairlines): ivory, gilt, marble, espresso, and peony swatches; marble, gold foil, and rattan weave textures; an oval frame, a monogram, a breakfast menu card, buttons, tabs, and a recipe card.
  - **Old Hong Kong** (Oswald + Noto Serif TC, bilingual): jade, signage red, milk tea, egg tart, and neon pink swatches; neon 茶餐廳 and OPEN 營業中 signs; mosaic tile and checkerboard textures; a bilingual menu board, an order slip, an enamel floor plate, a mahjong tile, buttons, chips, and a recipe card.
- The hub swatches now use each board's real colors. The hub cards stack the swatches above the name on wider screens so the arrow no longer wraps.
- Checked in Chrome at 1440px and at 390px (in an iframe, because headless Chrome won't make a window that narrow). Fixed order slip text that didn't sit on its ruled lines, a limewash texture too faint to see, and a menu card that wrapped at phone width.
