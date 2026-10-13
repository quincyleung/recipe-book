"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Badge,
  Button,
  Chip,
  EmptyState,
  IngredientChecklist,
  RecipeCard,
  SaveButton,
  StepList,
  TextField,
  Toggle,
} from "@/app/_ds/components";
import type { Meal, Recipe } from "@/content/recipes";

const meals: { value: Meal | "all"; label: string }[] = [
  { value: "all", label: "全部 All" },
  { value: "breakfast", label: "早餐 Breakfast" },
  { value: "dinner", label: "晚餐 Dinner" },
];

// The open recipe lives in the URL hash, so the back button closes it and links can open one.
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const readHash = () => decodeURIComponent(window.location.hash.slice(1));

function matches(recipe: Recipe, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [recipe.name, ...recipe.ingredients.map((i) => i.item)].some((text) => text.toLowerCase().includes(q));
}

export function RecipeBook({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState<Meal | "all">("all");
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const open = recipes.find((recipe) => recipe.slug === hash);
  const dialog = useRef<HTMLDialogElement>(null);
  // Whether opening the current recipe added a history entry we can go back over.
  const pushed = useRef(false);

  const shown = recipes.filter((recipe) => (meal === "all" || recipe.meal === meal) && matches(recipe, query));

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open) {
      if (!d.open) d.showModal();
      // The sheet is reused, so start every recipe at its name, not where the last one was left.
      d.scrollTop = 0;
    } else if (d.open) {
      d.close();
    }
  }, [open]);

  function openRecipe(slug: string) {
    pushed.current = true;
    window.history.pushState(null, "", `#${slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function closeRecipe() {
    if (!window.location.hash) return;
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  function clearFilters() {
    setQuery("");
    setMeal("all");
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <TextField label="Search recipes or ingredients" placeholder="Salmon, eggs, oats…" value={query} onChange={setQuery} />
        </div>
        <div role="group" aria-label="Filter by meal" className="flex flex-wrap gap-2">
          {meals.map((m) => (
            <Chip key={m.value} selected={meal === m.value} onClick={() => setMeal(m.value)}>
              {m.label}
            </Chip>
          ))}
        </div>
      </div>

      <section aria-labelledby="results" className="flex flex-col gap-4">
        <h2 id="results" className="ds-label text-(--ds-muted)" aria-live="polite">
          {shown.length === 1 ? "1 recipe" : `${shown.length} recipes`}
        </h2>
        {shown.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((recipe) => (
              <li key={recipe.slug} className="flex">
                <div className="flex w-full flex-col *:flex-1">
                  <RecipeCard recipe={recipe} art={false} showSummary onOpen={() => openRecipe(recipe.slug)} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) px-6 py-12 shadow-(--ds-shadow-card)">
            <EmptyState
              title={query.trim() ? `No recipes match “${query.trim()}”` : "No recipes here yet"}
              body="Try another ingredient, or clear the filters."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          </div>
        )}
      </section>

      <dialog
        ref={dialog}
        aria-labelledby="recipe-name"
        onClose={closeRecipe}
        onClick={(event) => event.target === dialog.current && closeRecipe()}
        className="m-0 ms-auto h-dvh max-h-dvh w-full max-w-none overflow-y-auto border-0 bg-(--ds-bg) p-0 text-(--ds-text) backdrop:bg-black/50 sm:w-[min(36rem,100%)] sm:border-l-(length:--ds-border-width) sm:border-(--ds-card-border)"
      >
        {open && <RecipeSheet key={open.slug} recipe={open} onClose={closeRecipe} />}
      </dialog>
    </>
  );
}

function RecipeSheet({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const [step, setStep] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const last = recipe.steps.length - 1;

  useEffect(() => () => void wakeLock.current?.release(), []);

  async function keepAwake(on: boolean) {
    if (!on) {
      await wakeLock.current?.release();
      wakeLock.current = null;
      return;
    }
    try {
      wakeLock.current = (await navigator.wakeLock?.request("screen")) ?? null;
    } catch {
      // Not supported or not allowed: the toggle still shows the choice.
    }
  }

  function goTo(next: number) {
    setFinished(false);
    setStep(next);
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-(--ds-border) bg-(--ds-bg) px-4 py-3 sm:px-6">
        <Button variant="secondary" onClick={onClose}>
          ← All recipes
        </Button>
        <SaveButton />
      </div>

      <div className="flex flex-1 flex-col gap-8 px-4 py-6 sm:px-6">
        <header className="flex flex-col gap-3">
          <h2 id="recipe-name" className="ds-display">
            {recipe.name}
          </h2>
          <p className="ds-label text-(--ds-muted)">
            {recipe.meal === "breakfast" ? "早餐 Breakfast" : "晚餐 Dinner"} · {recipe.minutes} min · Serves{" "}
            {recipe.servings}
          </p>
          {recipe.aheadNote && (
            <p className="flex flex-wrap items-center gap-2">
              <Badge>Make ahead</Badge>
              <span className="ds-body text-(--ds-muted)">{recipe.aheadNote}</span>
            </p>
          )}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            {step === null ? (
              <Button onClick={() => goTo(0)}>Start cooking</Button>
            ) : (
              <Button variant="secondary" onClick={() => setStep(null)}>
                Stop cooking
              </Button>
            )}
            <Toggle label="Keep screen awake" onChange={keepAwake} />
          </div>
          {finished && (
            <p role="status" className="ds-title text-(--ds-success)">
              ✓ Done. Enjoy your {recipe.name.toLowerCase()}.
            </p>
          )}
        </header>

        <IngredientChecklist recipe={recipe} title="材料 Ingredients" />
        <StepList recipe={recipe} title="做法 Steps" current={step} onCurrentChange={goTo} controls={false} />
      </div>

      {step !== null && (
        <div className="sticky bottom-0 flex items-center gap-3 border-t-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <Button variant="secondary" disabled={step === 0} onClick={() => goTo(step - 1)}>
            Previous
          </Button>
          <p className="ds-label flex-1 text-center text-(--ds-muted)">
            Step {step + 1} of {recipe.steps.length}
          </p>
          {step < last ? (
            <Button onClick={() => goTo(step + 1)}>Next step</Button>
          ) : (
            <Button
              onClick={() => {
                setStep(null);
                setFinished(true);
              }}
            >
              Finish
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
