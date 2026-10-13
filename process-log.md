# Process log

## 2026-10-13: Setup

**Asked:** Write AGENTS.md with who the site is for, the constraints, routes, styles, and workflow. Then write `content/recipes.ts` with my dishes, and replace the starter page with the hub.

**Made:** Added project notes under the Next.js block in AGENTS.md and started this log.

**Made:** `content/recipes.ts`, a typed list of the seven dishes I cook: Nobu miso cod, beef enoki rolls, honey garlic salmon, Cantonese shrimp and egg, ground beef with bell peppers, banana oat pancakes, and strawberry overnight oats. Each has a meal (breakfast or dinner), a protein, minutes, servings, an optional make-ahead note, ingredients, and steps. The agent drafted the amounts and steps; I still need to check them against how I actually cook.

**Made:** Replaced the starter page with the hub at `/`, which has the three sections from the brief: (1) mood boards with swatch cards, (2) design systems with "Aa" and dot cards, and (3) a dark "Open Recipe Book →" button. The style names are Greek Summer, French Café, and Old Hong Kong Nostalgia (`content/styles.ts`), and the swatch colors are placeholders until the mood boards are done. Added placeholder pages for `/mood-boards/[style]`, `/design-systems/[style]`, and `/recipes`. Unknown styles return a 404. Removed the starter's dark mode and set the page title to "Recipe Book".
