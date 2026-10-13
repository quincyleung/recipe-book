import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  ChipGroup,
  DetailPanel,
  EmptyState,
  IngredientChecklist,
  ListRows,
  Radio,
  RecipeCard,
  RecipeModal,
  SaveButton,
  Select,
  Spinner,
  StepList,
  Tab,
  Tabs,
  TextField,
  TextLink,
  Toggle,
  type Force,
} from "@/app/_ds/components";
import { AA_TEXT, AA_UI, contrastRatio, formatRatio } from "@/app/_ds/contrast";
import { themeVars, type Colors, type Theme } from "@/app/_ds/themes";
import type { Recipe } from "@/content/recipes";
import type { Style } from "@/content/styles";

type Pair = { fg: keyof Colors; bg: keyof Colors; use: string; min: number };

const pairs: Pair[] = [
  { fg: "text", bg: "bg", use: "Text on background", min: AA_TEXT },
  { fg: "text", bg: "surface", use: "Text on surface", min: AA_TEXT },
  { fg: "muted", bg: "bg", use: "Muted text on background", min: AA_TEXT },
  { fg: "muted", bg: "surface", use: "Muted text and placeholders on surface", min: AA_TEXT },
  { fg: "onAccent", bg: "accent", use: "Primary button", min: AA_TEXT },
  { fg: "onAccent", bg: "accentHover", use: "Primary button, hover", min: AA_TEXT },
  { fg: "onAccent", bg: "accentPressed", use: "Primary button, pressed", min: AA_TEXT },
  { fg: "onSelected", bg: "selected", use: "Selected chip and saved button", min: AA_TEXT },
  { fg: "text", bg: "soft", use: "Hovered row and current step", min: AA_TEXT },
  { fg: "text", bg: "softPressed", use: "Pressed chip, row, and secondary button", min: AA_TEXT },
  { fg: "onBadge", bg: "badge", use: "Badge", min: AA_TEXT },
  { fg: "error", bg: "surface", use: "Error message", min: AA_TEXT },
  { fg: "success", bg: "surface", use: "Success message", min: AA_TEXT },
  { fg: "control", bg: "surface", use: "Input and checkbox outline", min: AA_UI },
  { fg: "control", bg: "bg", use: "Secondary button outline", min: AA_UI },
  { fg: "focus", bg: "bg", use: "Focus ring", min: AA_UI },
];

const roles: { key: keyof Colors; name: string; use: string; ratioOn?: keyof Colors; ratioOf?: keyof Colors }[] = [
  { key: "bg", name: "Background", use: "The page" },
  { key: "surface", name: "Surface", use: "Cards, fields, panels" },
  { key: "text", name: "Text", use: "Headings and body", ratioOn: "bg" },
  { key: "muted", name: "Muted", use: "Meta and labels", ratioOn: "bg" },
  { key: "border", name: "Border", use: "Dividers only" },
  { key: "accent", name: "Accent", use: "The primary action only", ratioOf: "onAccent" },
  { key: "selected", name: "Selected", use: "Chips, saved state", ratioOf: "onSelected" },
  { key: "badge", name: "Badge", use: "Make ahead, highlights", ratioOf: "onBadge" },
  { key: "error", name: "Error", use: "Error text and icon", ratioOn: "surface" },
  { key: "success", name: "Success", use: "Success text and icon", ratioOn: "surface" },
];

const roleSamples: { role: "display" | "heading" | "title" | "body" | "label" | "control"; name: string; sample: string }[] = [
  { role: "display", name: "Display", sample: "Honey Garlic Salmon" },
  { role: "heading", name: "Heading", sample: "Ingredients" },
  { role: "title", name: "Title", sample: "Beef Enoki Rolls" },
  { role: "body", name: "Body", sample: "Sear skin side down over medium-high for four minutes. Flip and cook two more." },
  { role: "label", name: "Label", sample: "Dinner · 20 min · Serves 2" },
  { role: "control", name: "Control", sample: "Start cooking" },
];

const roleClass = {
  display: "ds-display",
  heading: "ds-heading",
  title: "ds-title",
  body: "ds-body",
  label: "ds-label",
  control: "ds-control",
};

const spacing = [4, 8, 12, 16, 24, 32, 48];
const states = ["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"] as const;

function checkContrast(theme: Theme, style: Style) {
  return pairs.map((pair) => {
    const ratio = contrastRatio(theme.colors[pair.fg], theme.colors[pair.bg]);
    if (ratio < pair.min) {
      throw new Error(
        `${style.name}: ${pair.use} (${pair.fg} on ${pair.bg}) is ${formatRatio(ratio)}, below ${pair.min}:1`,
      );
    }
    return { ...pair, ratio };
  });
}

function Section({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`section-${number}`} className="flex flex-col gap-6 border-t border-(--ds-border) pt-10">
      <h2 id={`section-${number}`} className="ds-heading flex items-baseline gap-3 text-(--ds-text)">
        <span className="ds-label text-(--ds-muted)">{String(number).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="ds-label text-(--ds-muted)">{title}</h3>
      {children}
    </div>
  );
}

/** One control shown in all six states; null marks a state that doesn't apply. */
function StateRow({ name, render }: { name: string; render: (state: (typeof states)[number]) => ReactNode | null }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="ds-label text-(--ds-muted)">{name}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
        {states.map((state) => {
          const control = render(state);
          return (
            <figure key={state} className="flex flex-col items-start gap-2">
              <div inert className="flex min-h-12 w-full items-center">
                {control ?? <span className="ds-body text-(--ds-muted)">—</span>}
              </div>
              <figcaption className="ds-label text-(--ds-muted)">{state}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function force(state: (typeof states)[number]): Force | undefined {
  return state === "Hover" ? "hover" : state === "Focus" ? "focus" : state === "Pressed" ? "pressed" : undefined;
}

function StateCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="flex min-h-56 flex-1 flex-col items-center justify-center gap-3 rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) p-6 text-center shadow-(--ds-shadow-card)">
        {children}
      </div>
      <figcaption className="ds-label text-(--ds-muted)">{label}</figcaption>
    </figure>
  );
}

export function DesignSystem({
  style,
  theme,
  fonts,
  recipes,
}: {
  style: Style;
  theme: Theme;
  fonts: string;
  recipes: Recipe[];
}) {
  const checked = checkContrast(theme, style);
  const salmon = recipes.find((r) => r.slug === "honey-garlic-salmon")!;
  const oats = recipes.find((r) => r.slug === "strawberry-overnight-oats")!;
  const c = theme.colors;

  return (
    <main className={`${fonts} ds-body flex-1 bg-(--ds-bg) text-(--ds-text)`} style={themeVars(theme)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-col gap-4">
          <nav className="ds-body flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <TextLink href="/">← Hub</TextLink>
            <TextLink href={`/mood-boards/${style.slug}`}>Mood board</TextLink>
          </nav>
          <div>
            <p className="ds-label text-(--ds-muted)">Design system</p>
            <h1 className="ds-display mt-2">{style.name}</h1>
            <p className="ds-body mt-2 text-(--ds-muted)">{style.tagline}</p>
          </div>
        </header>

        <Section number={1} title="Color roles">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {roles.map((role) => {
              const ratio = role.ratioOn
                ? `${formatRatio(contrastRatio(c[role.key], c[role.ratioOn]))} on ${role.ratioOn === "bg" ? "background" : "surface"}`
                : role.ratioOf
                  ? `${formatRatio(contrastRatio(c[role.ratioOf], c[role.key]))} with its text`
                  : null;
              return (
                <li key={role.key} className="flex flex-col gap-2">
                  <div
                    className="flex h-20 items-end rounded-(--ds-radius-field) border-(length:--ds-border-width) border-(--ds-card-border) p-2"
                    style={{ backgroundColor: c[role.key] }}
                  >
                    {role.ratioOf && (
                      <span className="ds-label" style={{ color: c[role.ratioOf] }}>
                        Aa
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="ds-body font-semibold">{role.name}</span>
                    <span className="ds-label text-(--ds-muted)">{c[role.key]}</span>
                    <span className="ds-body text-sm text-(--ds-muted)">{role.use}</span>
                    {ratio && <span className="ds-body text-sm font-semibold">{ratio}</span>}
                  </div>
                </li>
              );
            })}
          </ul>

          <Group title="Every pair, checked against WCAG AA">
            <div className="overflow-x-auto rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface)">
              <table className="ds-body w-full min-w-[34rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-(--ds-border)">
                    <th scope="col" className="ds-label p-3 font-normal text-(--ds-muted)">Sample</th>
                    <th scope="col" className="ds-label p-3 font-normal text-(--ds-muted)">Used for</th>
                    <th scope="col" className="ds-label p-3 font-normal text-(--ds-muted)">Ratio</th>
                    <th scope="col" className="ds-label p-3 font-normal text-(--ds-muted)">Needs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--ds-border)">
                  {checked.map((pair) => (
                    <tr key={pair.use}>
                      <td className="p-3">
                        <span
                          className="inline-flex h-8 w-14 items-center justify-center rounded-(--ds-radius-check) font-semibold"
                          style={
                            pair.min === AA_UI
                              ? { backgroundColor: c[pair.bg], boxShadow: `inset 0 0 0 2px ${c[pair.fg]}` }
                              : { backgroundColor: c[pair.bg], color: c[pair.fg] }
                          }
                        >
                          {pair.min === AA_UI ? "" : "Aa"}
                        </span>
                      </td>
                      <td className="p-3">{pair.use}</td>
                      <td className="p-3 font-semibold">{formatRatio(pair.ratio)}</td>
                      <td className="p-3 text-(--ds-muted)">
                        {pair.min}:1 {pair.min === AA_UI ? "(outline)" : "(text)"} ✓
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="ds-body text-sm text-(--ds-muted)">
              The build fails if any pair drops below AA. Disabled controls are exempt and use a flat fill with a
              not-allowed cursor.
            </p>
          </Group>
        </Section>

        <Section number={2} title="Type roles">
          <ul className="flex flex-col divide-y divide-(--ds-border)">
            {roleSamples.map(({ role, name, sample }) => {
              const t = theme.type[role];
              return (
                <li key={role} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <span className={`${roleClass[role]} min-w-0`}>{sample}</span>
                  <span className="ds-label shrink-0 text-(--ds-muted) sm:text-right">
                    {name} · {t.family} {t.weight}
                    {t.italic ? " italic" : ""} · {t.px}
                  </span>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section number={3} title="Spacing and shape">
          <div className="grid gap-10 lg:grid-cols-2">
            <Group title="Spacing scale">
              <ul className="flex items-end gap-3">
                {spacing.map((space) => (
                  <li key={space} className="flex flex-col items-center gap-2">
                    <span className="block bg-(--ds-check)" style={{ width: space, height: space }} />
                    <span className="ds-label text-(--ds-muted)">{space}</span>
                  </li>
                ))}
              </ul>
            </Group>
            <Group title="Corners, borders, and shadow">
              <ul className="flex flex-wrap items-end gap-4">
                {[
                  ["Buttons", theme.shape.radiusControl],
                  ["Fields", theme.shape.radiusField],
                  ["Cards", theme.shape.radiusCard],
                ].map(([name, radius]) => (
                  <li key={name} className="flex flex-col items-start gap-2">
                    <span
                      className="block size-16 border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) shadow-(--ds-shadow-card)"
                      style={{ borderRadius: radius }}
                    />
                    <span className="ds-label text-(--ds-muted)">
                      {name} · {radius === "9999px" ? "pill" : radius}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ds-body text-(--ds-muted)">
                {theme.shape.summary} Borders are {theme.shape.borderWidth}.
              </p>
            </Group>
          </div>
        </Section>

        <Section number={4} title="Components">
          <div className="grid gap-10 lg:grid-cols-2">
            <Group title="Buttons and link">
              <div className="flex flex-wrap items-center gap-4">
                <Button>Start cooking</Button>
                <SaveButton />
                <TextLink href="#section-4">See all recipes →</TextLink>
              </div>
            </Group>
            <Group title="Text input and select">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Search" placeholder="Salmon, eggs, oats…" />
                <Select label="Sort by" options={["Quickest first", "Breakfast first", "A to Z"]} />
              </div>
            </Group>
            <Group title="Checkboxes, radios, and toggle">
              <div className="flex flex-wrap gap-x-8 gap-y-1 *:shrink-0">
                <div className="flex flex-col">
                  <Checkbox label="Under 20 minutes" defaultChecked />
                  <Checkbox label="Make ahead" />
                </div>
                <fieldset className="flex flex-col">
                  <legend className="sr-only">Servings</legend>
                  <Radio name="servings" label="Serves 1" />
                  <Radio name="servings" label="Serves 2" defaultChecked />
                </fieldset>
                <div>
                  <Toggle label="Keep screen awake" defaultOn />
                </div>
              </div>
            </Group>
            <Group title="Filter chips and badges">
              <ChipGroup label="Filter recipes" options={["All", "Breakfast", "Dinner", "Fish", "Beef"]} />
              <div className="flex flex-wrap gap-2">
                <Badge>Make ahead</Badge>
                <Badge tone="neutral">20 min</Badge>
              </div>
            </Group>
            <Group title="Tabs">
              <Tabs
                label="Recipe sections"
                tabs={[
                  {
                    label: "Ingredients",
                    content: <p className="ds-body">Six ingredients, most already in the pantry.</p>,
                  },
                  { label: "Steps", content: <p className="ds-body">Five steps, about twenty minutes.</p> },
                  { label: "Notes", content: <p className="ds-body">Pat the salmon dry so the skin crisps.</p> },
                ]}
              />
            </Group>
            <Group title="List rows">
              <ListRows recipes={recipes.slice(0, 3).concat(oats)} />
            </Group>
            <Group title="Recipe cards">
              <div className="grid grid-cols-2 gap-4">
                <RecipeCard recipe={salmon} />
                <RecipeCard recipe={oats} />
              </div>
            </Group>
            <Group title="Detail panel and modal">
              <DetailPanel recipe={salmon} />
              <div>
                <RecipeModal recipe={salmon} />
              </div>
            </Group>
            <Group title="Ingredient checklist">
              <IngredientChecklist recipe={salmon} />
            </Group>
            <Group title="Step list">
              <StepList recipe={salmon} />
            </Group>
          </div>
        </Section>

        <Section number={5} title="Control states">
          <StateRow
            name="Primary button"
            render={(state) =>
              state === "Selected" ? null : (
                <Button force={force(state)} disabled={state === "Disabled"}>
                  Cook
                </Button>
              )
            }
          />
          <StateRow
            name="Secondary button"
            render={(state) => (
              <Button
                variant="secondary"
                force={force(state)}
                selected={state === "Selected"}
                disabled={state === "Disabled"}
              >
                {state === "Selected" ? "✓ Saved" : "Save"}
              </Button>
            )}
          />
          <StateRow
            name="Filter chip"
            render={(state) => (
              <Chip force={force(state)} selected={state === "Selected"} disabled={state === "Disabled"}>
                Dinner
              </Chip>
            )}
          />
          <StateRow
            name="Tab"
            render={(state) => (
              <Tab force={force(state)} selected={state === "Selected"} disabled={state === "Disabled"}>
                Steps
              </Tab>
            )}
          />
          <StateRow
            name="Checkbox"
            render={(state) => (
              <Checkbox
                label="Garlic"
                force={force(state)}
                defaultChecked={state === "Selected"}
                disabled={state === "Disabled"}
              />
            )}
          />
          <StateRow
            name="Text input"
            render={(state) =>
              state === "Pressed" || state === "Selected" ? null : (
                <TextField
                  label="Search"
                  placeholder="Salmon…"
                  force={force(state)}
                  disabled={state === "Disabled"}
                />
              )
            }
          />
          <StateRow
            name="Recipe card"
            render={(state) =>
              state === "Selected" || state === "Disabled" ? null : (
                <div className="w-full max-w-44">
                  <RecipeCard recipe={salmon} force={force(state)} />
                </div>
              )
            }
          />
        </Section>

        <Section number={6} title="UI states">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StateCard label="Empty">
              <EmptyState
                title="No recipes match “tofu”"
                body="Try another ingredient, or clear the filters."
                action={<Button variant="secondary">Clear filters</Button>}
              />
            </StateCard>
            <StateCard label="Loading">
              <div role="status" className="flex flex-col items-center gap-3">
                <Spinner />
                <p className="ds-body">Loading recipes…</p>
              </div>
              <div aria-hidden className="flex w-full flex-col gap-2">
                <span className="h-3 w-3/4 rounded-full bg-(--ds-soft) motion-safe:animate-pulse" />
                <span className="h-3 w-1/2 rounded-full bg-(--ds-soft) motion-safe:animate-pulse" />
              </div>
            </StateCard>
            <StateCard label="Error">
              <span
                aria-hidden
                className="ds-title flex size-10 items-center justify-center rounded-full bg-(--ds-error) text-(--ds-surface)"
              >
                !
              </span>
              <p className="ds-title text-(--ds-error)">Couldn’t load recipes</p>
              <p className="ds-body text-(--ds-muted)">Check your connection and try again.</p>
              <Button variant="secondary">Try again</Button>
            </StateCard>
            <StateCard label="Success">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full bg-(--ds-success) text-(--ds-surface)"
              >
                <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.25">
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
              </span>
              <p className="ds-title text-(--ds-success)">Saved to your book</p>
              <p className="ds-body text-(--ds-muted)">Honey Garlic Salmon is in Dinner.</p>
            </StateCard>
          </div>
        </Section>
      </div>
    </main>
  );
}
