"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonLink,
  IngredientChecklist,
  SaveButton,
  StepList,
  Tabs,
  Toggle,
} from "@/app/_ds/components";
import type { Recipe } from "@/content/recipes";
import { DishArt } from "./dish-art";
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

function took(ms: number) {
  const minutes = Math.round(ms / 60000);
  return minutes < 1 ? "under a minute" : minutes === 1 ? "1 minute" : `${minutes} minutes`;
}

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
  const [awake, setAwake] = useState(false);
  const [servings, setServings] = useState(recipe.servings);
  const scaled = { ...recipe, ingredients: scaleIngredients(recipe, servings) };
  // Cooking clock: when "Start cooking" was pressed, and the latest tick.
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  // One step countdown at a time, and the step whose countdown just ran out.
  const [timer, setTimer] = useState<{ step: number; endsAt: number } | null>(null);
  const [rang, setRang] = useState<number | null>(null);
  const [finishedIn, setFinishedIn] = useState<number | null>(null);
  const last = recipe.steps.length - 1;
  const seconds = step === null ? null : stepSeconds(recipe.steps[step]);

  useEffect(() => {
    if (startedAt === null && timer === null) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (timer && t >= timer.endsAt) {
        setTimer(null);
        setRang(timer.step);
        navigator.vibrate?.([200, 100, 200]);
      }
    }, 250);
    return () => clearInterval(id);
  }, [startedAt, timer]);

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
    if (startedAt === null) {
      const t = Date.now();
      setStartedAt(t);
      setNow(t);
    }
    setFinishedIn(null);
    setStep(next);
    setTab(STEPS_TAB);
  }

  function stopCooking(done: boolean) {
    setFinishedIn(done && startedAt !== null ? Date.now() - startedAt : null);
    setStep(null);
    setStartedAt(null);
    setTimer(null);
    setRang(null);
  }

  function startTimer(forStep: number, secs: number) {
    const t = Date.now();
    setNow(t);
    setRang(null);
    setTimer({ step: forStep, endsAt: t + secs * 1000 });
  }

  return (
    <>
      {/* flex-1 fills short pages so the cooking bar always sits on the bottom edge. */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
        <div className="flex items-center justify-between gap-4">
          <ButtonLink href="/recipes">← All recipes</ButtonLink>
          <SaveButton />
        </div>

        <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-3">
            <h1 className="ds-display">{recipe.name}</h1>
            <p className="ds-label text-(--ds-muted)">
              {recipe.meal === "breakfast" ? "早餐 Breakfast" : "晚餐 Dinner"} · {recipe.minutes} min · Serves{" "}
              {servings} · {recipe.proteins.join(", ")}
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
                <Button variant="secondary" onClick={() => stopCooking(false)}>
                  Stop cooking
                </Button>
              )}
              <Toggle label="Keep screen awake" on={awake} onChange={setAwake} />
            </div>
            {finishedIn !== null && (
              <p role="status" className="ds-title text-(--ds-success)">
                ✓ Done in {took(finishedIn)}. Enjoy your {recipe.name}.
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
            {
              label: <Bilingual zh="材料" en="Ingredients" />,
              content: (
                <div className="flex flex-col gap-4">
                  <div role="group" aria-labelledby="servings-label" className="flex items-center gap-3">
                    <span id="servings-label" className="ds-label text-(--ds-muted)">
                      Servings
                    </span>
                    <Button
                      variant="secondary"
                      iconLabel="Fewer servings"
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
                      iconLabel="More servings"
                      disabled={servings >= MAX_SERVINGS}
                      onClick={() => setServings(servings + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <IngredientChecklist recipe={scaled} title={null} />
                </div>
              ),
            },
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
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
            <div className="flex min-h-11 basis-full items-center justify-between gap-3 md:flex-1 md:basis-auto md:justify-start">
              <p className="ds-label text-(--ds-muted)">
                Cooking <span className="ds-control text-(--ds-text) tabular-nums">{clock(now - (startedAt ?? now))}</span>
              </p>
              {timer ? (
                <div className="flex items-center gap-3">
                  <p className="ds-label text-(--ds-muted)">
                    Step {timer.step + 1} timer{" "}
                    <span className="ds-title text-(--ds-text) tabular-nums">{clock(timer.endsAt - now)}</span>
                  </p>
                  <Button variant="secondary" onClick={() => setTimer(null)}>
                    Cancel
                  </Button>
                </div>
              ) : rang !== null ? (
                <div className="flex items-center gap-3">
                  <p role="alert" className="ds-title text-(--ds-success)">
                    Step {rang + 1}: time’s up
                  </p>
                  <Button variant="secondary" onClick={() => setRang(null)}>
                    OK
                  </Button>
                </div>
              ) : (
                seconds !== null && (
                  <Button variant="secondary" onClick={() => startTimer(step, seconds)}>
                    Start {clock(seconds * 1000)} timer
                  </Button>
                )
              )}
            </div>
            <div className="flex basis-full items-center gap-3 md:basis-auto">
              <Button variant="secondary" disabled={step === 0} onClick={() => goTo(step - 1)}>
                Previous
              </Button>
              <p className="ds-label flex-1 text-center text-(--ds-muted) md:px-2">
                Step {step + 1} of {recipe.steps.length}
              </p>
              {step < last ? (
                <Button onClick={() => goTo(step + 1)}>Next step</Button>
              ) : (
                <Button onClick={() => stopCooking(true)}>Finish</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
