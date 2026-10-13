<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Recipe Book: project notes

Assignment 2 for Design, Build, Ship (UI/UX & Visual Design). A recipe book of meals I actually cook.

## Who it's for

Me, cooking on weeknights with my phone on the counter. I want the ingredients and steps fast, in one place. Design mobile-first: big readable text, easy tap targets, no hunting.

## Constraints

- Next.js App Router + Tailwind CSS, static only.
- No database, auth, API routes, or external APIs. Interactions are faked in the browser and nothing is saved.
- Ask before adding any package.
- Load fonts with `next/font`.

## Routes

- `/`: the hub (mood boards, design systems, the site)
- `/mood-boards/[style]`
- `/design-systems/[style]`
- `/recipes`: the site, in the style I pick

## Styles

`greek`, `french`, `old-hong-kong`. Photos are in `public/mood/<style>/`. Convert any `.heic` to `.jpg`.

## Workflow

- Commit after each step with a clear message.
- Append to `process-log.md` after each step: what I asked for, what you made, and where I pushed back.
