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

**Pushed back:** The agent committed the mood boards but didn't push. I asked it to always push to GitHub after committing, and AGENTS.md now says so.

## 2026-10-13: More photos, and sections like the professor's example

**Asked:** Add more photos to the mood boards, from the internet or generated. Then, from a screenshot of my professor's mood board, organize mine into sections like his (where it comes from, references, type and color, pieces of UI), without copying it exactly.

**Made:**
- Added 5 freely licensed photos to each board from Wikimedia Commons, chosen by reviewing contact sheets for color and mood:
  - Greek Summer: Oia terraces, a white wall above the sea, a Greek salad, a blue fishing boat, a cliffside terrace.
  - Parisian Morning: the gilded Palais Garnier foyer, Ladurée macarons, Galerie Vivienne's mosaic floor and gilt entrance, a café crème among books.
  - Old Hong Kong: a neon street at night, milk tea in a Black & White cup, egg tarts, a tram through Chun Yeung Street market, a cha chaan teng order slip in staff shorthand.
  
  Each has an author and license credit on its board. Photos were downloaded at 960px with metadata stripped.
- Reorganized each board into sections:
  - **Header:** name, tagline, and "evokes", "suits", and "artifacts" notes.
  - **Where it comes from:** four of my photos, each with a "Take the…" note on what the design borrows from it.
  - **References:** the other 11 photos, with credits.
  - **Type and color**, **Texture and shape** (named per style), and **Pieces of UI**: the pieces the agent made.
- Each board now has 30 artifacts: 15 collected and 15 made. To stay at 30, I cut the weakest made pieces: the 15′ numeral, the olive swatch, and the awning stripes (Greek); the rattan weave, the monogram, and the Cormorant body specimen (Paris); the 下午茶 sign, the mahjong tile, and the made order slip, now replaced by a real one (Hong Kong).
- Old Hong Kong uses the plain sans for paragraphs because condensed Oswald is hard to read at length. The Parisian section labels use a darker gold so small text stays legible on ivory.

**Pushed back:** I asked for more photos and for sections like my professor's mood board.

## 2026-10-13: Parisian Morning edits

**Asked:** The Ladurée macarons are too brightly colored for the Parisian mood. Swap je t'aime with the Eiffel Tower in "Where it comes from", because the Eiffel Tower is more important.

**Made:** Removed the macarons photo, so the board now has 29 artifacts (14 collected, 15 made). The Eiffel Tower through the oval window is now a key source ("Take the oval window and the pale morning light"), and je t'aime moved to References.

**Pushed back:** I rejected the agent's macarons pick because it was off-palette, and chose which photo should lead.

## 2026-10-13: Greek Summer edit

**Asked:** The Greek salad photo doesn't fit the Mediterranean mood.

**Made:** Removed the salad photo and its credit. Greek Summer now has 29 artifacts (14 collected, 15 made).

**Pushed back:** I rejected another of the agent's photo picks: a close-up food shot didn't match the whitewashed, seaside feel.

## 2026-10-13: Design systems

**Asked:** Build `/design-systems/[style]` from each mood board as a UI library with the six sections from the brief: color roles with contrast ratios, type roles set in my recipe content, spacing and shape, components (plus an ingredient checklist and a step list), control states, and UI states. Text pairs must pass WCAG AA.

**Made:**
- One component library (`app/_ds/components.tsx`) themed by CSS variables. Each style's tokens (`app/_ds/themes.ts`) come from its mood board:
  - **Greek Summer:** whitewash and navy, with Aegean blue as the accent; pill buttons and soft 12 to 20px corners; no shadow, a thin limestone line instead; Marcellus and Manrope.
  - **Parisian Morning:** ivory and espresso, with a deepened gilt (#8A6A2E) as the accent so white text passes AA on it; square corners and hairlines; cards get a gold double frame; Cormorant Garamond and Jost, with uppercase tracked controls.
  - **Old Hong Kong:** cream and ink, with signage red as the accent and jade for selection; 2px ink outlines and a hard offset shadow, so pressing a button pushes it into its shadow; Oswald and Noto Serif TC, with Geist for body text.
- The accent is kept for the primary action. Selected chips, tabs, and checkboxes use a separate selected color.
- Inputs get a darker "control" outline (3:1 or more) because the decorative border color is too faint for an outline.
- **Color roles** list 16 checked pairs with their ratios. The page throws if any pair is below 4.5:1 for text or 3:1 for outlines, so the build fails. I checked this by breaking one color: the build stopped with "Muted text on background is 2.1:1, below 4.5:1".
- **Type roles** (display, heading, title, body, label, control) are set in recipe content, such as "Honey Garlic Salmon" and real steps.
- **Components:** primary and secondary buttons, a link, a search input, a select, checkboxes, radios, a "Keep screen awake" toggle, tabs, filter chips, recipe cards, list rows, badges, a detail panel and a real `<dialog>` modal, an ingredient checklist with a "2 of 6 ready" count, and a step list with previous and next.
- **Control states** show seven controls in rest, hover, focus, pressed, selected, and disabled, using a custom variant so the static samples match real interactions.
- **UI states:** empty, loading, error, and success.
- Verified in real Chrome over the DevTools protocol on all three styles: the toggle, tabs (click and arrow keys), chips, save, checklist, step list, and modal (focus moves in, and it closes) all work, with no console errors and no horizontal overflow at 390px or 1440px. After the first look I fixed pressed states that were too subtle (added a deeper pressed tint), radio labels that wrapped, and UI state cards with uneven heights.

## 2026-10-13: Old Hong Kong down to two fonts

**Asked:** Old Hong Kong uses three fonts, which is a lot. Make it two.

**Made:** Dropped Geist. Body text now uses Noto Serif TC (weight 400), so Oswald does the signage (display, headings, labels, buttons) and Noto Serif TC does reading text and Chinese characters. The change applies to both the mood board and the design system. Oswald now falls back to Noto Serif TC for Chinese characters; before this, the bilingual swatch names were silently drawn in the system font (PingFang). Checked in Chrome that both pages render with only Oswald and Noto Serif TC.

**Pushed back:** I asked for fewer fonts in Old Hong Kong.

## 2026-10-13: Choosing a style

**Asked:** Which style should I build? I like Greek Summer and Parisian Morning most for their looks, but Old Hong Kong feels the most creative. Is Noto Serif TC the best body font?

**Decided:** Old Hong Kong. Most of my dishes are Cantonese or Asian home cooking, "read it like a menu" suits cooking from a phone, and it's the most distinct from a default look. The agent recommended it too, with the risk that it gets busy, so neon and patterns stay as accents. I kept Noto Serif TC: with two fonts, it is the one that covers both English body text and Chinese, and its Ming-style serif matches old printed menus.

## 2026-10-13: The recipe site

**Asked:** Build `/recipes` in Old Hong Kong using the design system: clear hierarchy with the recipe name first, the accent only for the primary action, every control in its states, working at 390px and 1440px, and linked from the hub.

**Made:**
- **List:** a modest page title, then a search over names and ingredients, and bilingual meal chips (全部 All, 早餐 Breakfast, 晚餐 Dinner). Recipe cards lead with the dish name, then meal, time, and servings, then a short ingredient list and a "Make ahead" badge. Cards on the site have no art block, because the same pattern on every card added nothing. Searching for something missing shows the design system's empty state with "Clear filters".
- **Recipe sheet:** a full-screen sheet on phones and a side panel on desktop. The name comes first in the display style. Ingredients (amounts in Oswald, items in Noto Serif TC) and steps are on one scroll. "Start cooking" highlights step 1, and a bar fixed to the bottom of the screen takes over with Previous, "Step 2 of 5", and Next step, then Finish and a success line.
- **Accent only for the primary action:** the list page has no accent buttons, and the sheet shows exactly one at a time ("Start cooking", then "Next step").
- The open recipe is in the URL hash, so the phone's back button closes it and recipes can be linked directly. "Keep screen awake" uses the browser's Wake Lock feature where it's supported; nothing is saved.
- All controls come from the design system, so each has its hover, focus, pressed, selected, and disabled states.
- The hub says the site is built in the Old Hong Kong style.
- **Verified in Chrome** at 1440px and 390px, with no horizontal overflow and no console errors: search, filters, the empty state and clearing it, opening a recipe, the cooking flow through Finish, the toggle, the checklist, the back button (no page reload), a direct link, and Esc.
- **Bug found and fixed:** the sheet is reused, so after cooking one recipe to the end, the next one opened scrolled down with its name off-screen. It now resets to the top for every recipe.

## 2026-10-13: Clearer hierarchy on the recipe list

**Asked:** Make the hierarchy clearer: "Recipe Book" larger, in the display font.

**Made:** The page title now uses the display role (Oswald, 56px on desktop and 40px on phones, one line at both), well above the 20px card titles.

## 2026-10-13: Fuller recipe site: filters, views, recipe pages, drawings

**Asked:** Add filters for time, make-ahead, and main ingredient; Ingredients, Steps, and Notes tabs; both card and list views; open recipes on their own page instead of a pop-up ("what we mapped out in the design system"); add photos or drawings to the cards; and make sure buttons sit well when the window changes from laptop to phone.

**Made:**
- **List page:** search, a Sort select (quickest first, A to Z, breakfast first), and a Cards/List view switch. Filters are a sidebar on laptops and a "Filters" panel on phones that opens right under the toolbar and shows how many filters are on. The filters are meal chips, main-ingredient checkboxes (Fish, Beef, Seafood, Eggs, Dairy), time radios (any, 15 min or less, 10 min or less), and make-ahead radios (any, ready tonight, make ahead), plus "Clear filters". No match shows the empty state.
- **Recipe pages** at `/recipes/[slug]`, built at deploy time. Name first, then meal, time, servings, and main ingredient; then the make-ahead note, "Start cooking", and "Keep screen awake"; then Ingredients, Steps, and Notes tabs. "Start cooking" jumps to Steps and brings up the bottom step bar. Next 16 keeps recent pages alive, so filters are still set when you come back from a recipe.
- **Drawings instead of photos:** Wikimedia Commons kept timing out and had usable photos for only some dishes, and drawings fit "meals I actually cook" better than photos of other people's food. Each dish is a flat top-down plate in the sign-painting style (bold ink outlines) on a mosaic tile: jade for dinner, egg-tart yellow for breakfast. They're on the cards, as list thumbnails, and on each recipe page.
- **Notes:** the agent drafted two practical notes per recipe from its steps; I need to edit them.
- **Design system updates:** select, radio, toggle, and tabs can now be driven by the page; cards and list rows can link to pages and show a drawing; list rows lead with the name in the title role; the button gained an "expanded" state for the Filters toggle; `TextLink` uses Next's `Link`. Removed a global `:has(dialog[open])` scroll lock, which Next's guide warns can leak from pages it keeps hidden; the design system's demo modal now closes when its page is hidden.
- On phones, the recipe tabs share the width equally with Chinese above English, because one line didn't fit at 390px.
