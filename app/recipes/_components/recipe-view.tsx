"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  IngredientChecklist,
  SaveButton,
  StepList,
  Tabs,
  TextLink,
  Toggle,
} from "@/app/_ds/components";
import type { Recipe } from "@/content/recipes";
import { DishArt } from "./dish-art";

const STEPS_TAB = 1;

/** Chinese above English on phones, side by side from tablet width up. */
function Bilingual({ zh, en }: { zh: string; en: string }) {
  return (
    <>
      <span className="block sm:inline">{zh}</span> {en}
    </>
  );
}

export function RecipeView({ recipe }: { recipe: Recipe }) {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [awake, setAwake] = useState(false);
  const last = recipe.steps.length - 1;

  // Hold a screen wake lock while the toggle is on. Browsers drop it when the
  // tab is hidden, so take it again when the page comes back.
  useEffect(() => {
    if (!awake) return;
    let lock: WakeLockSentinel | null = null;
    let cancelled = false;
    const acquire = async () => {
      try {
        const next = (await navigator.wakeLock?.request("screen")) ?? null;
        if (cancelled) void next?.release();
        else lock = next;
      } catch {
        // Not supported or not allowed: the toggle still shows the choice.
      }
    };
    const onVisible = () => document.visibilityState === "visible" && void acquire();
    void acquire();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      void lock?.release();
    };
  }, [awake]);

  function goTo(next: number) {
    setFinished(false);
    setStep(next);
    setTab(STEPS_TAB);
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
        <div className="flex items-center justify-between gap-4">
          <TextLink href="/recipes">← All recipes</TextLink>
          <SaveButton />
        </div>

        <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-3">
            <h1 className="ds-display">{recipe.name}</h1>
            <p className="ds-label text-(--ds-muted)">
              {recipe.meal === "breakfast" ? "早餐 Breakfast" : "晚餐 Dinner"} · {recipe.minutes} min · Serves{" "}
              {recipe.servings} · {recipe.protein}
            </p>
            {recipe.aheadNote && (
              <p className="flex flex-wrap items-center gap-2">
                <Badge>Make ahead</Badge>
                <span className="ds-body text-(--ds-muted)">{recipe.aheadNote}</span>
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {step === null ? (
                <Button onClick={() => goTo(0)}>Start cooking</Button>
              ) : (
                <Button variant="secondary" onClick={() => setStep(null)}>
                  Stop cooking
                </Button>
              )}
              <Toggle label="Keep screen awake" on={awake} onChange={setAwake} />
            </div>
            {finished && (
              <p role="status" className="ds-title text-(--ds-success)">
                ✓ Done. Enjoy your {recipe.name.toLowerCase()}.
              </p>
            )}
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) shadow-(--ds-shadow-card) md:aspect-[4/3]">
            <DishArt recipe={recipe} fill />
          </div>
        </header>

        <Tabs
          label="Recipe"
          active={tab}
          onActiveChange={setTab}
          fill
          tabs={[
            { label: <Bilingual zh="材料" en="Ingredients" />, content: <IngredientChecklist recipe={recipe} title={null} /> },
            {
              label: <Bilingual zh="做法" en="Steps" />,
              content: (
                <StepList recipe={recipe} title={null} current={step} onCurrentChange={goTo} controls={false} />
              ),
            },
            {
              label: <Bilingual zh="筆記" en="Notes" />,
              content: (
                <ul className="flex flex-col gap-3">
                  {recipe.notes.map((note) => (
                    <li key={note} className="ds-body flex gap-3">
                      <span aria-hidden className="text-(--ds-muted)">
                        —
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </div>

      {step !== null && (
        <div className="sticky bottom-0 z-10 border-t-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface)">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
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
        </div>
      )}
    </>
  );
}
