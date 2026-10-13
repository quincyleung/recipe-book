"use client";

import { useEffect, useId, useState } from "react";
import { Badge, Button, IngredientChecklist, StepList, Tabs, TextLink } from "@/app/_ds/components";
import { localize, mealName } from "@/content/i18n";
import type { Recipe } from "@/content/recipes";
import { DishArt } from "./dish-art";
import { LanguageToggle } from "./language-toggle";
import { useRecipeBook } from "./recipe-book-context";
import { scaleIngredients } from "./servings";

const MAX_SERVINGS = 12;

const STEPS_TAB = 1;

/** Seconds a step mentions ("4 minutes", "30 seconds"; the lower bound of "10 to 12 minutes"), or null. */
function stepSeconds(step: string) {
  const match = step.match(/(\d+)(?:\s*(?:to|-)\s*\d+)?\s*(?:more\s+)?(seconds?|minutes?)\b/i);
  if (!match) return null;
  return Number(match[1]) * (match[2].toLowerCase().startsWith("s") ? 1 : 60);
}

function clock(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function RecipeView({ recipe }: { recipe: Recipe }) {
  const { lang, t, favorites, toggleFavorite } = useRecipeBook();
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState<number | null>(null);
  const [servings, setServings] = useState(recipe.servings);
  const servingsLabel = useId();
  // Scale in English (where units are known), then show it in the chosen language.
  const text = localize({ ...recipe, ingredients: scaleIngredients(recipe, servings) }, lang);
  const favorite = favorites.includes(recipe.slug);
  // Cooking clock: when "Start cooking" was pressed, and the latest tick.
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  // One step countdown at a time, and the step whose countdown just ran out.
  const [timer, setTimer] = useState<{ step: number; endsAt: number } | null>(null);
  const [rang, setRang] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const last = recipe.steps.length - 1;

  useEffect(() => {
    if (startedAt === null && timer === null) return;
    const id = setInterval(() => {
      const tick = Date.now();
      setNow(tick);
      if (timer && tick >= timer.endsAt) {
        setTimer(null);
        setRang(timer.step);
        navigator.vibrate?.([200, 100, 200]);
      }
    }, 250);
    return () => clearInterval(id);
  }, [startedAt, timer]);

  function goTo(next: number) {
    if (startedAt === null) {
      const tick = Date.now();
      setStartedAt(tick);
      setNow(tick);
    }
    setFinished(false);
    setRang(null);
    setStep(next);
    setTab(STEPS_TAB);
  }

  function stopCooking(done: boolean) {
    setFinished(done);
    setStep(null);
    setStartedAt(null);
    setTimer(null);
    setRang(null);
  }

  // Timers are only offered while cooking, when the clock is already ticking, so start from the latest tick.
  function startTimer(forStep: number, secs: number) {
    setRang(null);
    setTimer({ step: forStep, endsAt: now + secs * 1000 });
  }

  const proteins = recipe.proteins.map((p) => t.proteins[p] ?? p).join(lang === "zh" ? "、" : ", ");

  return (
    <>
      {/* flex-1 fills short pages so the cooking bar always sits on the bottom edge. */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
        <div className="flex items-center justify-between gap-4">
          <TextLink href="/recipes" tone="subtle">
            {t.allRecipes}
          </TextLink>
          <LanguageToggle />
        </div>

        <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-3">
            <h1 className="ds-display">{text.name}</h1>
            <p className="ds-label text-(--ds-muted)">
              {mealName(recipe.meal, lang)} · {t.minutes(recipe.minutes)} · {t.serves(servings)} · {proteins}
            </p>
            {text.aheadNote && (
              <p className="flex flex-wrap items-center gap-2">
                <Badge>{t.makeAhead}</Badge>
                <span className="ds-body text-(--ds-muted)">{text.aheadNote}</span>
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-2">
              {step === null ? (
                <Button onClick={() => goTo(0)}>{t.startCooking}</Button>
              ) : (
                <Button variant="secondary" onClick={() => stopCooking(false)}>
                  {t.stopCooking}
                </Button>
              )}
              <Button variant="secondary" selected={favorite} onClick={() => toggleFavorite(recipe.slug)}>
                {favorite ? t.favorited : t.favorite}
              </Button>
            </div>
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) shadow-(--ds-shadow-card) md:aspect-[4/3]">
            <DishArt recipe={text} fill label={t.drawingOf(text.name)} />
          </div>
        </header>

        <Tabs
          label={t.recipe}
          active={tab}
          onActiveChange={setTab}
          fill
          tabs={[
            {
              label: t.ingredients,
              content: (
                <div className="flex flex-col gap-4">
                  <div role="group" aria-labelledby={servingsLabel} className="flex items-center gap-3">
                    <span id={servingsLabel} className="ds-label text-(--ds-muted)">
                      {t.servings}
                    </span>
                    <Button
                      variant="secondary"
                      iconLabel={t.fewer}
                      disabled={servings <= 1}
                      onClick={() => setServings(servings - 1)}
                    >
                      −
                    </Button>
                    <output aria-live="polite" className="ds-title w-8 text-center tabular-nums">
                      {servings}
                    </output>
                    <Button
                      variant="secondary"
                      iconLabel={t.more}
                      disabled={servings >= MAX_SERVINGS}
                      onClick={() => setServings(servings + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <IngredientChecklist recipe={text} title={null} readyLabel={t.ready} />
                </div>
              ),
            },
            {
              label: t.steps,
              content: (
                <div className="flex flex-col gap-4">
                  <StepList
                    recipe={text}
                    title={null}
                    current={step}
                    onCurrentChange={goTo}
                    controls={false}
                    progressLabel={(current, total) => (current === null ? t.stepCount(total) : t.stepOf(current + 1, total))}
                    doneLabel={t.doneStep}
                    action={(i, state) => {
                      // A countdown for the current step, if it says how long. Times come from the English steps.
                      const secs = stepSeconds(recipe.steps[i]);
                      if (secs === null || state !== "current") return null;
                      return timer?.step === i ? (
                        <Button variant="secondary" onClick={() => setTimer(null)}>
                          {t.cancelTimer}
                        </Button>
                      ) : (
                        <Button variant="secondary" onClick={() => startTimer(i, secs)}>
                          {t.startTimer(clock(secs * 1000))}
                        </Button>
                      );
                    }}
                  />
                  {finished && (
                    <p role="status" className="ds-title py-2 text-center text-(--ds-success)">
                      {t.done(text.name)}
                    </p>
                  )}
                </div>
              ),
            },
            {
              label: t.notes,
              content: (
                <ul className="flex flex-col gap-3">
                  {text.notes.map((note) => (
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
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 md:flex-row md:items-center md:gap-6">
            <p className="ds-label text-center text-(--ds-muted) md:flex-1 md:text-left">
              {t.cooking} <span className="ds-control text-(--ds-text) tabular-nums">{clock(now - (startedAt ?? now))}</span>
              {timer && (
                <>
                  {" "}
                  · {t.stepTimer(timer.step + 1)}{" "}
                  <span className="ds-control text-(--ds-text) tabular-nums">{clock(timer.endsAt - now)}</span>
                </>
              )}
              {!timer && rang !== null && (
                <span role="alert" className="text-(--ds-success)">
                  {" "}
                  · {t.timesUp(rang + 1)}
                </span>
              )}
            </p>
            {/* Three columns keep the step count exactly centered, under the clock. */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="justify-self-start">
                <Button variant="secondary" disabled={step === 0} onClick={() => goTo(step - 1)}>
                  {t.previous}
                </Button>
              </div>
              <p className="ds-label text-center text-(--ds-muted)">{t.stepOf(step + 1, recipe.steps.length)}</p>
              <div className="justify-self-end">
                {step < last ? (
                  <Button onClick={() => goTo(step + 1)}>{t.nextStep}</Button>
                ) : (
                  <Button onClick={() => stopCooking(true)}>{t.finish}</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
