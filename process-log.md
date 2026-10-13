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

**Verified in Chrome:**
- **Filters:** each filter and combinations of them (Fish gives 2 recipes, plus Beef gives 4, plus Ready tonight gives 3; Make ahead only gives oats and miso cod), plus search, sort, and both views.
- **Recipe pages:** opening one as a real page, the tabs (including arrow keys), and cooking through to Finish.
- **Back button:** returning to the list keeps the Dinner filter and List view.
- **Accent:** none on the list; on a recipe page only "Start cooking", then only "Next step" while cooking.
- **No console errors.**
- **Button placement:** at 390, 480, 640, 768, 900, 1024, 1280, and 1440px, no button text is clipped or wrapped, no button is off-screen or overlapping another, and the page never scrolls sideways. Resizing live from laptop to phone and back while cooking keeps the current step and the bar.

**Fixed after testing:** on recipes shorter than the screen, the cooking bar sat just under the content instead of on the bottom edge. The page now fills the screen height, so the bar always sits on the bottom edge.

## 2026-10-13: Refined drawings, timers, servings, and fixes

**Asked:**
- The drawings look like basic shapes; make them more refined.
- What does Start cooking do? Maybe it could start a timer.
- Time filters should be "under 30" and "under 15" minutes.
- Eggs should include the Cantonese shrimp and egg dish.
- The times aren't accurate; make them total cooking time, since some should be longer.
- Let me adjust portions by servings.
- Make "All recipes" match the design system, and align it with "Save recipe".
- When I filter (for example Breakfast), the recipes should stay aligned to the top.

**Made:**
- **Redrawn dishes:**
  - Gradients for volume and glaze, and real details: salmon fat lines and garlic, segmented shrimp with tails, seared beef rolls with fanned enoki, rice grains under the beef and peppers, banana slices with seed rings, butter and syrup on the pancakes, oat flakes, chia, and a yogurt swirl.
  - Miso cod redrawn as a glazed fillet on a leaf with a flaky white edge and pickled ginger beside it.
  - Settings: cha chaan teng plates with a colored rim band and a hard shadow, a mosaic tablecloth with varied tiles, ivory chopsticks with red tips for dinners, a fork or spoon for breakfasts, and a faint print grain.
  - Every drawing now uses its own internal ids, because Next keeps hidden pages in the DOM and shared ids could make a visible drawing point at a hidden one.
- **Start cooking** now starts a cooking clock. Steps that mention a time ("4 minutes", "30 seconds", the lower end of "10 to 12 minutes") offer a "Start 4:00 timer" button. It counts down, shows "time's up" with an alert, and vibrates where supported. Finish reports how long the cook took. Timer buttons are secondary, so "Next step" stays the only red button. On phones the bar has two rows (clock and timer, then Previous, step count, and Next); from 768px up it's one row.
- **Time filters** are now "30 min or less" and "15 min or less". I kept "or less" rather than "under", so a 15-minute dish isn't hidden by the 15-minute filter.
- **Main ingredients** can now be more than one, so Cantonese Shrimp and Egg counts as both Seafood and Eggs.
- **Times are total time,** from starting to cook to food on the plate, not counting overnight make-ahead: miso cod 25, beef enoki 25, salmon 20, shrimp and egg 20, ground beef 25 (rice not included, now in its notes), pancakes 20, oats 5. These are estimates for me to adjust. Matching times on the mood boards and design system samples were updated too.
- **Servings:** a − / + control on the Ingredients tab (1 to 12) rescales every amount. Fractions stay readable (1½, ¼, ⅛), grams round to 5, and words agree with the count ("1 fillet", "1 bell pepper", "2 ripe bananas"); "pinch" stays a pinch. "Serves N" in the header follows.
- **Back button:** "← All recipes" is now a design-system button (a new `ButtonLink`), and it lines up exactly with "Save recipe".
- **Filter alignment:** on laptops the sidebar spans two grid rows, and when it was taller than the results it stretched the toolbar row, pushing results down. The rows are now auto/1fr, so results start in the same place for any filter. On phones, a new "Show N recipes" button closes the Filters panel and takes you to the results.

**Verified in Chrome:**
- Servings math on four recipes.
- The back and Save buttons share the same top and bottom edges.
- The clock, the 4:00 timer and Cancel, a 20-second timer running out, and Finish.
- The new filters, with Eggs including the shrimp dish.
- Results start 24px under the toolbar for All, Breakfast, Dinner, and List view at 1024 and 1440px.
- Button placement at 390 to 1440px with the timer bar, with no overlaps, wrapping, or sideways scroll.
- No console errors.

## 2026-10-13: Just the dish

**Asked:** Remove the utensils and chopsticks and focus on the dish.

**Made:** Removed the chopsticks, fork, and spoon, and centered each plate (or the oats jar) in its frame. The plate, rim band, shadow, and mosaic tablecloth stay.

**Pushed back:** I rejected the utensils the agent added; the drawings should focus on the food.

## 2026-10-13: Type hierarchy, centered cooking clock, hub button

**Asked:**
- Make the text-size hierarchy more apparent; the ingredients on each card look as big as the title.
- On a narrow window, center the cooking time above the step count.
- Make the "back to hub" link a button in the design system's style.

**Made:**
- **Type scale:** added a Small role (14px) to all three design systems, shown in each type roles section. In Old Hong Kong, the title went from 20 to 22px and body from 17 to 16px. Cards now step down from title (22px Oswald) to meta (13px Oswald caps) to ingredients (14px muted, in the Small role).
- **Cooking bar:** on phones and tablets the bar's top line is just the cooking clock, plus the step timer when one is running, centered exactly above "Step 2 of 5". The navigation row is a three-column grid so the step count sits at the true center. The "Start 4:00 timer" and "Cancel timer" buttons moved out of the bar and into the current step, under the instruction that names the time. "Time's up" shows on the clock line and clears on the next step. On laptops the bar stays one row.
- **Hub button:** "← Hub" on the recipes page is now the design system's button (`ButtonLink`), matching "← All recipes".

**Verified in Chrome:**
- The clock and step count share the screen's center line at 390px and 640px, with and without a timer.
- The timer button appears under step 2 ("for 4 minutes"); a 20-second timer ran out and its alert cleared on the next step.
- No button overlaps or sideways scroll.
- "Next step" is the only red button.
- No console errors.

**Pushed back:** I asked for clearer type hierarchy, a centered clock, and a button-style hub link.

## 2026-10-13: Matching breakfast rims

**Asked:** Give both breakfast dishes the same rim color (red) so they're consistent.

**Made:** The overnight oats are now in a white bowl with the same signage-red rim band as the pancake plate, replacing the glass jar's blue-grey rim. Dinners keep their jade band. The rim color now follows the meal: red for breakfast, jade for dinner.

## 2026-10-13: No servings on the cards

**Asked:** Remove servings from the recipe list, since they can be adjusted.

**Made:** Recipe cards now show only meal and total time ("Dinner · 25 min"). Servings appear only on the recipe page, where the − / + control changes them and the header follows.

## 2026-10-13: Full check for bugs, and hub button placement

**Asked:** Go through everything and make sure there are no bugs or issues and the UI is smooth. Move "← Hub" to the right, or space it out so it doesn't feel cluttered.

**Made:**
- **Hub button:** "← Hub" now sits to the right of the "食譜 Recipe Book" title on wider screens, and at the top right, with more space above the title, on phones.
- **Bugs fixed:** Next 16 keeps up to three visited pages alive (hidden) in the DOM, which surfaced two problems:
  - Each design system used the same section ids (`#section-4`), so after visiting two of them, "See all recipes" could jump to the hidden page's section and do nothing. Section ids now include the style.
  - The design system demos all named their radio group "servings", and same-named radios form one group across the document, so a radio on one page could untick one on a hidden page. The names now include the style.
  - The recipe page's servings label id is now unique per page as well.
- **Page titles:** each mood board and design system now has its own title ("Greek Summer · Mood board"), not just "Recipe Book".

**Verified with a sweep of all 15 pages** (hub, 3 mood boards, 3 design systems, the recipe list, and 7 recipe pages) at 390px and 1440px in Chrome:
- No console errors or hydration warnings.
- No sideways scrolling.
- Every image loads.
- No duplicate ids.
- Every element you can Tab to shows a focus ring.
- All 15 internal links work.
- With three pages alive in the DOM there are no duplicate ids, and "See all recipes" scrolls to the right section.

**Known and left as is:** a made-up address like `/recipes/nope` shows the proper "could not be found" page with a noindex tag, but the HTTP status is 200, not 404. Next's docs say this happens because these pages start streaming before the address is checked. A true 404 would need request-time Proxy code, which doesn't fit a static site.

## 2026-10-13: No focus ring on click

**Asked:** Fields don't need to show focus when clicked (for example the search box or the Sort select).

**Made:** Browsers treat a clicked text field or select as "focus-visible", so they showed the ring on click. A small `InputModality` component now records on `<html data-modality>` whether the last navigation was Tab or a pointer. Text fields and selects show the focus ring only after Tab; on click they just darken their border. Only Tab counts as keyboard navigation, so typing a search doesn't bring the ring back. Buttons already skipped the ring on click.

**Verified in Chrome:** clicking and typing show no ring, Tabbing in shows the 2px ring, and the keyboard focus sweep still finds a ring on every Tab stop.

## 2026-10-13: Hub button back on the left

**Asked:** Keep "← Hub" on the left: above the title on phones, and to the left of the title on wider screens.

**Made:** On phones the hub button sits above the title on the left. From tablet width up it sits to the left of "食譜 Recipe Book", vertically centered on the title's first line (measured: 70px vs 69px at 1440, 68px vs 64px at 768).

**Pushed back:** I preferred the hub button on the left over the agent's top-right placement.

## 2026-10-13: Three more recipes, a quieter header

**Asked:**
- Add Tamago Sando, Char Siu Fried Rice, and Oat Banana Bread.
- Remove "Meals I actually cook…" under the title.
- Make the hub link small and subtle above the title instead of a button on the left.

**Made:**
- **Three recipes,** with ingredients, steps, and notes the agent drafted for me to check:
  - Tamago Sando: breakfast, eggs, 25 min, serves 2.
  - Char Siu Fried Rice: dinner, pork and eggs, 20 min, serves 2, make ahead (day-old rice).
  - Oat Banana Bread: breakfast, eggs, 75 min including baking and cooling, 8 slices.
- **New drawings in the same style:**
  - Two tamago sando halves with a thick egg layer.
  - Golden fried rice with diced char siu, peas, egg, and scallions.
  - Two banana bread slices with a dark domed crust and a moist crumb.
- **Filters and servings:** Pork now appears as a main ingredient, and "30 min or less" leaves out the banana bread. Steps that name a time get timers (10:00 for the eggs, 50:00 bake, 15:00 cool), and the oven-temperature step gets none. Servings now knows "slices" and "cups", picks the closest fraction instead of the first close one, and supports ⅙ (half of ⅓ cup honey is now ⅙ cup, not ⅛).
- **Header:** removed the subtitle. "← Hub" is now a small, muted label-style link above the title (a new `subtle` tone on the design system's `TextLink`). It darkens and underlines on hover, gets the focus ring on Tab, and keeps a 32px-tall tap area.

**Verified in Chrome:**
- The filters, timers, and servings on all three new recipes.
- The full sweep of all 18 pages at 390 and 1440px: no console errors, overflow, broken images, duplicate ids, or missing focus rings.

**Pushed back:** I asked for the hub link to be small and subtle above the title rather than a button beside it.

## 2026-10-13: Quieter back links, done message under the steps

**Asked:**
- Put the hub link in the body font so it doesn't compete with the title.
- Make "← All recipes" a plain link without a box, like the list page, because "Start cooking" and "Save recipe" were competing for attention.
- When the steps are done, show "✓ Done. Enjoy your [dish]!" under the steps.

**Made:**
- The design system's subtle link tone now uses the Small body role (Noto Serif TC, 14px, muted), with an underline and darker text on hover. "← Hub" on the list and "← All recipes" on recipe pages both use it, so the only boxed buttons at the top of a recipe are Save and Start cooking.
- The finish message moved from the header to directly under the last step, inside the Steps tab, and now reads "✓ Done. Enjoy your Honey Garlic Salmon!" (no duration). Starting to cook again clears it.

**Verified in Chrome:** both links render in Noto Serif 14px with no border, background, or shadow; "← All recipes" and Save share a center line; the done message sits under the last step; no errors.

**Pushed back:** the agent's boxed back buttons competed with the primary action, so I asked for plain links.

## 2026-10-13: Language switch, favorites, and review fixes

**Asked (after the browser review):**
- Fix the uneven meal chips, in English only, and add a switch at the top for English or Cantonese instead of showing both languages.
- Fix the confusing filter wording (finding 4) and the 200 status on made-up addresses (finding 5).
- Say "Show all" rather than "Show 10 recipes".
- Replace Save with a favorite and a filter for it.
- Remove "Keep screen awake" and put Favorite in its place.
- Center the done message.

**Made:**
- **Language switch (EN | 中文)** at the top right of the list and every recipe page, in place of the side-by-side bilingual labels.
  - It switches every label, plus the dish names, ingredients, steps, notes, and make-ahead notes, written in Hong Kong Traditional Chinese (`content/i18n.ts`). For example: 叉燒炒飯, 士多啤梨隔夜燕麥, 滑蛋蝦仁.
  - Amounts are scaled in English and then shown with Chinese units and measure words ("1½杯 凍白飯", "1隻 雞蛋", "少許"), so servings work in both languages. Timers still read times from the English steps.
  - Search matches both languages.
  - The page's `lang` follows the choice, for screen readers.
  - The choice is shared across the recipe pages through a `/recipes` layout, but nothing is saved, so it resets on reload.
- **Meal chips** read "All / Breakfast / Dinner". Measured, the three chips needed 256px and the sidebar gave 252px, so they wrapped. The sidebar is now 19rem and the chips use a new compact size, so they fit on one row with room to spare at 1024 to 1440px, in both languages.
- **Filter wording:** the make-ahead group is now "Prep" ("Any prep / Ready tonight / Make ahead"), so there's no lone "Any" under "Any time". Main ingredient has a hint: "Shows recipes with any you tick."
- **Real 404s:** a small `proxy.ts` (Next 16's Proxy) checks /mood-boards, /design-systems, and /recipes addresses against the known styles and recipes, and sends anything else to a path with no page. `/recipes/nope` now returns 404, while real pages return 200. It only routes; there's no data or backend.
- **"Show all"** on the phone filter button when every recipe matches; "Show 4 recipes" otherwise.
- **Favorites instead of Save:**
  - A "♡ Favorite" toggle sits next to Start cooking, where Keep screen awake was. It's secondary, so Start cooking stays the only red button.
  - Favorited recipes get a "♥ Favorite" badge on their card and row, and there's a "Favorites only" filter, counted in the Filters total.
  - Shared between pages, not saved. The design system's demo button and success state now say Favorite too.
- **Removed** "Keep screen awake" and its wake-lock code.
- **The done message** is centered under the steps.

**Verified in Chrome:**
- Favoriting, the badge, and the filter.
- Both languages on the list and a recipe page: filters, search in either language, sort, list view, servings in Chinese, a timer, and Finish.
- "Show all" / "Show 4 recipes".
- Status codes for real and made-up addresses.
- The full sweep of 18 pages at 390 and 1440px: no console errors, overflow, broken images or links, duplicate ids, or missing focus rings.

**Pushed back:**
- I wanted one language at a time with a switch, not both side by side.
- I wanted favorites rather than Save, since every recipe here is already "saved".
- I removed Keep screen awake because phones handle that.

## 2026-10-13: Heart, language toggle, filter titles

**Asked:**
- Show favorites as something smaller at the top right, or just a heart.
- Make the English/Chinese switch a toggle, or at least look different from the other buttons.
- Make the filter titles bigger than the options.
- Remove the "Shows recipes with any you tick" hint.

**Made:**
- **Favorite heart:** a small heart in a white round badge with the style's ink outline and hard shadow, at the top right of the card's drawing (32px) and on the list thumbnail's corner (24px), replacing the "♥ Favorite" text badge. It's neon pink from the mood board rather than red, so it doesn't borrow the accent reserved for "Start cooking". Screen readers hear "Favorite" / "最愛".
- **Language toggle:** "EN [knob] 中文", a track and sliding knob in the design system's toggle shape, instead of two chips, so it looks unlike the page's buttons. The current language is bold. Both languages are equal options, so only the knob moves and the track doesn't change color. It's a `role="switch"` named "中文 (Chinese)", with focus, hover, and pressed states and Space to toggle.
- **Filter titles:** Meal, Main ingredient, Time, Prep, and Favorites now use the Title role (22px Oswald, full ink), above the 16px options.
- **Removed** the main-ingredient hint.

**Verified in Chrome:**
- The heart's size and position on the card and the row.
- The toggle by click and by Space, in both languages.
- Filter titles at 22px against 16px options.
- The full sweep of 18 pages at 390 and 1440px came back clean.

## 2026-10-13: Toggle aligned with the title

**Asked:** Align the language toggle with "Recipe Book".

**Made:** From 640px up, the toggle sits at the right end of the title row, vertically centered on the title (measured: centers 98/98 at 640px and 105/105 at 1024 and 1440px, in both languages). On phones the English title and toggle don't fit side by side, so the toggle stays at the top right, level with "← Hub". A two-column grid moves the same toggle between the two spots without a duplicate. No overflow at any width.
