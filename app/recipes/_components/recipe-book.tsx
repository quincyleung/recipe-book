"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  EmptyState,
  ListRows,
  Radio,
  RecipeCard,
  Select,
  TextField,
  TextLink,
} from "@/app/_ds/components";
import { localize, mealName } from "@/content/i18n";
import type { Meal, Recipe } from "@/content/recipes";
import { DishArt } from "./dish-art";
import { FavoriteMark } from "./favorite-mark";
import { LanguageToggle } from "./language-toggle";
import { useRecipeBook } from "./recipe-book-context";

const meals: (Meal | "all")[] = ["all", "breakfast", "dinner"];
const times = [
  { value: "any", max: Infinity },
  { value: "30", max: 30 },
  { value: "15", max: 15 },
];
const preps = ["any", "tonight", "ahead"];

const byName = (a: Recipe, b: Recipe) => a.name.localeCompare(b.name);
// In the same order as the sort labels in content/i18n.ts.
const sorters: ((a: Recipe, b: Recipe) => number)[] = [
  (a, b) => a.minutes - b.minutes || byName(a, b),
  byName,
  (a, b) => a.meal.localeCompare(b.meal) || a.minutes - b.minutes,
];

/** Matches the name or any ingredient, in English and in the shown language. */
function matches(recipe: Recipe, shown: Recipe, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [recipe, shown]
    .flatMap((r) => [r.name, ...r.ingredients.map((i) => i.item)])
    .some((text) => text.toLowerCase().includes(q));
}

function FilterGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="ds-title mb-1 text-(--ds-text)">{legend}</legend>
      {children}
    </fieldset>
  );
}

export function RecipeBook({ recipes }: { recipes: Recipe[] }) {
  const { lang, t, favorites } = useRecipeBook();
  const proteins = [...new Set(recipes.flatMap((recipe) => recipe.proteins))];
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState<Meal | "all">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const [time, setTime] = useState("any");
  const [prep, setPrep] = useState("any");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState(0);
  const [view, setView] = useState<"cards" | "list">("cards");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsHeading = useRef<HTMLHeadingElement>(null);

  const maxMinutes = times.find((x) => x.value === time)!.max;
  const activeFilters =
    (meal === "all" ? 0 : 1) +
    picked.length +
    (time === "any" ? 0 : 1) +
    (prep === "any" ? 0 : 1) +
    (favoritesOnly ? 1 : 0);
  const shown = recipes
    .map((recipe) => ({ recipe, text: localize(recipe, lang) }))
    .filter(
      ({ recipe, text }) =>
        (meal === "all" || recipe.meal === meal) &&
        (picked.length === 0 || recipe.proteins.some((p) => picked.includes(p))) &&
        recipe.minutes <= maxMinutes &&
        (prep === "any" || (prep === "ahead") === Boolean(recipe.aheadNote)) &&
        (!favoritesOnly || favorites.includes(recipe.slug)) &&
        matches(recipe, text, query),
    )
    .sort((a, b) => sorters[sort](a.text, b.text));

  const metaFor = (recipe: Recipe) => `${mealName(recipe.meal, lang)} · ${t.minutes(recipe.minutes)}`;
  const badgesFor = (recipe: Recipe) => (recipe.aheadNote ? <Badge>{t.makeAhead}</Badge> : null);
  const heartFor = (recipe: Recipe, small = false) =>
    favorites.includes(recipe.slug) ? <FavoriteMark label={t.favoriteMark} small={small} /> : null;

  // On phones the panel sits above the results; close it and take you to them.
  function showResults() {
    setFiltersOpen(false);
    requestAnimationFrame(() => {
      resultsHeading.current?.focus({ preventScroll: true });
      resultsHeading.current?.scrollIntoView({ block: "start" });
    });
  }

  function clearFilters() {
    setQuery("");
    setMeal("all");
    setPicked([]);
    setTime("any");
    setPrep("any");
    setFavoritesOnly(false);
  }

  return (
    <>
      <header className="flex flex-col items-start gap-1">
        <div className="flex w-full items-center justify-between gap-4">
          <nav>
            <TextLink href="/" tone="subtle">
              {t.hub}
            </TextLink>
          </nav>
          <LanguageToggle />
        </div>
        <h1 className="ds-display">{t.title}</h1>
      </header>

      {/* auto/1fr rows: when the sidebar is taller, only the results row grows, so results stay at the top. */}
      <div className="grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10">
        <div className="flex flex-col gap-4 lg:col-start-2">
          <TextField label={t.search} placeholder={t.searchPlaceholder} value={query} onChange={setQuery} />
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="w-full sm:w-48">
              <Select
                label={t.sortBy}
                options={t.sorts}
                value={t.sorts[sort]}
                onChange={(label) => setSort(Math.max(0, t.sorts.indexOf(label)))}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div role="group" aria-label={t.view} className="flex gap-2">
                <Chip selected={view === "cards"} onClick={() => setView("cards")}>
                  {t.cards}
                </Chip>
                <Chip selected={view === "list"} onClick={() => setView("list")}>
                  {t.list}
                </Chip>
              </div>
              <span className="lg:hidden">
                <Button
                  variant="secondary"
                  expanded={filtersOpen}
                  controls="filters"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  {t.filters}
                  {activeFilters > 0 ? ` · ${activeFilters}` : ""}
                </Button>
              </span>
            </div>
          </div>
        </div>

        <aside
          id="filters"
          aria-label={t.filters}
          className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-6 rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) p-4 shadow-(--ds-shadow-card) lg:sticky lg:top-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex lg:self-start`}
        >
          <div className="flex flex-col gap-2">
            <p id="meal-label" className="ds-title text-(--ds-text)">
              {t.meal}
            </p>
            <div role="group" aria-labelledby="meal-label" className="flex flex-wrap gap-2">
              {meals.map((m) => (
                <Chip key={m} compact selected={meal === m} onClick={() => setMeal(m)}>
                  {t.meals[m]}
                </Chip>
              ))}
            </div>
          </div>
          <FilterGroup legend={t.mainIngredient}>
            {proteins.map((protein) => (
              <Checkbox
                key={protein}
                label={t.proteins[protein] ?? protein}
                checked={picked.includes(protein)}
                onChange={(checked) =>
                  setPicked(checked ? [...picked, protein] : picked.filter((p) => p !== protein))
                }
              />
            ))}
          </FilterGroup>
          <FilterGroup legend={t.time}>
            {times.map((x) => (
              <Radio
                key={x.value}
                name="time"
                label={t.times[x.value]}
                checked={time === x.value}
                onChange={() => setTime(x.value)}
              />
            ))}
          </FilterGroup>
          <FilterGroup legend={t.prep}>
            {preps.map((p) => (
              <Radio key={p} name="prep" label={t.preps[p]} checked={prep === p} onChange={() => setPrep(p)} />
            ))}
          </FilterGroup>
          <FilterGroup legend={t.favorites}>
            <Checkbox label={t.favoritesOnly} checked={favoritesOnly} onChange={setFavoritesOnly} />
          </FilterGroup>
          <div className="flex flex-wrap gap-3">
            <span className="lg:hidden">
              <Button variant="secondary" onClick={showResults}>
                {shown.length === recipes.length ? t.showAll : t.showCount(shown.length)}
              </Button>
            </span>
            {activeFilters > 0 && (
              <Button variant="secondary" onClick={clearFilters}>
                {t.clearFilters}
              </Button>
            )}
          </div>
        </aside>

        <section aria-labelledby="results" className="flex min-w-0 flex-col gap-4 lg:col-start-2">
          <h2
            id="results"
            ref={resultsHeading}
            tabIndex={-1}
            className="ds-label scroll-mt-4 text-(--ds-muted) outline-none"
            aria-live="polite"
          >
            {t.count(shown.length)}
          </h2>
          {shown.length === 0 ? (
            <div className="rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) px-6 py-12 shadow-(--ds-shadow-card)">
              <EmptyState
                title={query.trim() ? t.noMatchQuery(query.trim()) : t.noMatch}
                body={t.noMatchBody}
                action={
                  <Button variant="secondary" onClick={clearFilters}>
                    {t.clearFilters}
                  </Button>
                }
              />
            </div>
          ) : view === "cards" ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map(({ recipe, text }) => (
                <li key={recipe.slug} className="flex *:flex-1">
                  <RecipeCard
                    recipe={text}
                    href={`/recipes/${recipe.slug}`}
                    media={<DishArt recipe={text} label={t.drawingOf(text.name)} />}
                    meta={metaFor(recipe)}
                    badges={badgesFor(recipe)}
                    corner={heartFor(recipe)}
                    showSummary
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ListRows
              recipes={shown.map(({ text }) => text)}
              hrefFor={(recipe) => `/recipes/${recipe.slug}`}
              thumb={(recipe) => <DishArt recipe={recipe} label={t.drawingOf(recipe.name)} />}
              metaFor={metaFor}
              badgesFor={badgesFor}
              markerFor={(recipe) => heartFor(recipe, true)}
            />
          )}
        </section>
      </div>
    </>
  );
}
