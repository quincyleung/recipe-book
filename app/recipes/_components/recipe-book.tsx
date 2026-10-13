"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  Button,
  Checkbox,
  Chip,
  EmptyState,
  ListRows,
  Radio,
  RecipeCard,
  Select,
  TextField,
} from "@/app/_ds/components";
import type { Meal, Recipe } from "@/content/recipes";
import { DishArt } from "./dish-art";

const meals: { value: Meal | "all"; label: string }[] = [
  { value: "all", label: "全部 All" },
  { value: "breakfast", label: "早餐 Breakfast" },
  { value: "dinner", label: "晚餐 Dinner" },
];
const times = [
  { value: "any", label: "Any time", max: Infinity },
  { value: "30", label: "30 min or less", max: 30 },
  { value: "15", label: "15 min or less", max: 15 },
];
const preps = [
  { value: "any", label: "Any" },
  { value: "tonight", label: "Ready tonight" },
  { value: "ahead", label: "Make ahead" },
];
const sorts = ["Quickest first", "A to Z", "Breakfast first"];

const byName = (a: Recipe, b: Recipe) => a.name.localeCompare(b.name);
const sorters: Record<string, (a: Recipe, b: Recipe) => number> = {
  "Quickest first": (a, b) => a.minutes - b.minutes || byName(a, b),
  "A to Z": byName,
  "Breakfast first": (a, b) => a.meal.localeCompare(b.meal) || a.minutes - b.minutes,
};

function matches(recipe: Recipe, query: string) {
  const q = query.trim().toLowerCase();
  return !q || [recipe.name, ...recipe.ingredients.map((i) => i.item)].some((text) => text.toLowerCase().includes(q));
}

function FilterGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="ds-label mb-1 text-(--ds-muted)">{legend}</legend>
      {children}
    </fieldset>
  );
}

export function RecipeBook({ recipes }: { recipes: Recipe[] }) {
  const proteins = [...new Set(recipes.flatMap((recipe) => recipe.proteins))];
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState<Meal | "all">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const [time, setTime] = useState("any");
  const [prep, setPrep] = useState("any");
  const [sort, setSort] = useState(sorts[0]);
  const [view, setView] = useState<"cards" | "list">("cards");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsHeading = useRef<HTMLHeadingElement>(null);

  const maxMinutes = times.find((t) => t.value === time)!.max;
  const activeFilters = (meal === "all" ? 0 : 1) + picked.length + (time === "any" ? 0 : 1) + (prep === "any" ? 0 : 1);
  const shown = recipes
    .filter(
      (recipe) =>
        (meal === "all" || recipe.meal === meal) &&
        (picked.length === 0 || recipe.proteins.some((p) => picked.includes(p))) &&
        recipe.minutes <= maxMinutes &&
        (prep === "any" || (prep === "ahead") === Boolean(recipe.aheadNote)) &&
        matches(recipe, query),
    )
    .sort(sorters[sort]);

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
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10">
      {/* auto/1fr rows: when the sidebar is taller, only the results row grows, so results stay at the top. */}
      <div className="flex flex-col gap-4 lg:col-start-2">
        <TextField label="Search recipes or ingredients" placeholder="Salmon, eggs, oats…" value={query} onChange={setQuery} />
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="w-full sm:w-48">
            <Select label="Sort by" options={sorts} value={sort} onChange={setSort} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div role="group" aria-label="View" className="flex gap-2">
              <Chip selected={view === "cards"} onClick={() => setView("cards")}>
                Cards
              </Chip>
              <Chip selected={view === "list"} onClick={() => setView("list")}>
                List
              </Chip>
            </div>
            <span className="lg:hidden">
              <Button
                variant="secondary"
                expanded={filtersOpen}
                controls="filters"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                Filters{activeFilters > 0 ? ` · ${activeFilters}` : ""}
              </Button>
            </span>
          </div>
        </div>
      </div>

      <aside
        id="filters"
        aria-label="Filters"
        className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-6 rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) p-4 shadow-(--ds-shadow-card) lg:sticky lg:top-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex lg:self-start`}
      >
        <div className="flex flex-col gap-2">
          <p id="meal-label" className="ds-label text-(--ds-muted)">
            Meal
          </p>
          <div role="group" aria-labelledby="meal-label" className="flex flex-wrap gap-2">
            {meals.map((m) => (
              <Chip key={m.value} selected={meal === m.value} onClick={() => setMeal(m.value)}>
                {m.label}
              </Chip>
            ))}
          </div>
        </div>
        <FilterGroup legend="Main ingredient">
          {proteins.map((protein) => (
            <Checkbox
              key={protein}
              label={protein}
              checked={picked.includes(protein)}
              onChange={(checked) =>
                setPicked(checked ? [...picked, protein] : picked.filter((p) => p !== protein))
              }
            />
          ))}
        </FilterGroup>
        <FilterGroup legend="Time">
          {times.map((t) => (
            <Radio key={t.value} name="time" label={t.label} checked={time === t.value} onChange={() => setTime(t.value)} />
          ))}
        </FilterGroup>
        <FilterGroup legend="Make ahead">
          {preps.map((p) => (
            <Radio key={p.value} name="prep" label={p.label} checked={prep === p.value} onChange={() => setPrep(p.value)} />
          ))}
        </FilterGroup>
        <div className="flex flex-wrap gap-3">
          <span className="lg:hidden">
            <Button variant="secondary" onClick={showResults}>
              {shown.length === 1 ? "Show 1 recipe" : `Show ${shown.length} recipes`}
            </Button>
          </span>
          {activeFilters > 0 && (
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </aside>

      <section aria-labelledby="results" className="flex min-w-0 flex-col gap-4 lg:col-start-2">
        <h2 id="results" ref={resultsHeading} tabIndex={-1} className="ds-label scroll-mt-4 text-(--ds-muted) outline-none" aria-live="polite">
          {shown.length === 1 ? "1 recipe" : `${shown.length} recipes`}
        </h2>
        {shown.length === 0 ? (
          <div className="rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) px-6 py-12 shadow-(--ds-shadow-card)">
            <EmptyState
              title={query.trim() ? `No recipes match “${query.trim()}”` : "No recipes match these filters"}
              body="Try another ingredient, or clear the filters."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : view === "cards" ? (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((recipe) => (
              <li key={recipe.slug} className="flex *:flex-1">
                <RecipeCard
                  recipe={recipe}
                  href={`/recipes/${recipe.slug}`}
                  media={<DishArt recipe={recipe} />}
                  showSummary
                />
              </li>
            ))}
          </ul>
        ) : (
          <ListRows
            recipes={shown}
            hrefFor={(recipe) => `/recipes/${recipe.slug}`}
            thumb={(recipe) => <DishArt recipe={recipe} />}
          />
        )}
      </section>
    </div>
  );
}
