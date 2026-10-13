"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from "react";
import type { Recipe } from "@/content/recipes";

/** Forces a visual state for the control-states table. */
export type Force = "hover" | "focus" | "pressed";

const focusRing = "ds-focus:outline-2 ds-focus:outline-offset-2 ds-focus:outline-(--ds-focus)";
/** Fields only get the ring when reached with Tab; a click just darkens the border. */
// outline-none clears the outline style too, so the keyboard ring sets it back to solid.
const fieldFocusRing =
  "outline-none ds-focus-key:outline-solid ds-focus-key:outline-2 ds-focus-key:outline-offset-2 ds-focus-key:outline-(--ds-focus)";
const disabledFill =
  "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-(--ds-disabled-bg) disabled:text-(--ds-disabled-text) disabled:shadow-none";
const press =
  "ds-pressed:translate-x-(--ds-press-shift) ds-pressed:translate-y-(--ds-press-shift) ds-pressed:scale-(--ds-press-scale) ds-pressed:shadow-none";

/* Buttons and link */

const buttonVariants = {
  primary:
    "border-(length:--ds-primary-border-width) border-(--ds-control) bg-(--ds-accent) text-(--ds-on-accent) ds-hover:bg-(--ds-accent-hover) ds-pressed:bg-(--ds-accent-pressed)",
  secondary:
    "border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) text-(--ds-text) ds-hover:not-aria-pressed:not-aria-expanded:bg-(--ds-soft) ds-pressed:not-aria-pressed:not-aria-expanded:bg-(--ds-soft-pressed) ds-pressed:border-(--ds-text) aria-pressed:border-(--ds-selected-border) aria-pressed:bg-(--ds-selected) aria-pressed:text-(--ds-on-selected) aria-expanded:border-(--ds-selected-border) aria-expanded:bg-(--ds-selected) aria-expanded:text-(--ds-on-selected)",
};

const buttonBase = `ds-control inline-flex min-h-11 items-center justify-center gap-2 rounded-(--ds-radius-control) py-2.5 whitespace-nowrap shadow-(--ds-shadow-control) transition-[background-color,color,border-color,box-shadow,translate,scale] duration-150 ${press} ${focusRing}`;

export function Button({
  variant = "primary",
  iconLabel,
  selected,
  expanded,
  controls,
  force,
  disabled,
  onClick,
  children,
}: {
  variant?: keyof typeof buttonVariants;
  /** For a square icon-only button: its accessible name. */
  iconLabel?: string;
  /** Makes it a toggle button (aria-pressed). */
  selected?: boolean;
  /** Makes it a disclosure button for the element with id `controls`. */
  expanded?: boolean;
  controls?: string;
  force?: Force;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={iconLabel}
      aria-pressed={selected}
      aria-expanded={expanded}
      aria-controls={controls}
      data-force={force}
      disabled={disabled}
      onClick={onClick}
      className={`${buttonBase} ${iconLabel ? "w-11 px-0" : "px-5"} ${buttonVariants[variant]} ${disabledFill}`}
    >
      {children}
    </button>
  );
}

/** A link that looks like a button, for navigation such as "back". */
export function ButtonLink({
  href,
  variant = "secondary",
  children,
}: {
  href: string;
  variant?: keyof typeof buttonVariants;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${buttonBase} px-5 ${buttonVariants[variant]}`}>
      {children}
    </Link>
  );
}

export function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <Button variant="secondary" selected={saved} onClick={() => setSaved(!saved)}>
      {saved ? "✓ Saved" : "Save recipe"}
    </Button>
  );
}

const linkTones = {
  default:
    "ds-body text-(--ds-text) underline decoration-(--ds-indicator) decoration-1 underline-offset-4 ds-hover:decoration-2 ds-pressed:text-(--ds-muted)",
  /** Small and quiet, in the body face, for back links such as "← Hub". */
  subtle:
    "ds-small inline-flex min-h-8 items-center text-(--ds-muted) underline-offset-4 ds-hover:text-(--ds-text) ds-hover:underline ds-pressed:text-(--ds-text)",
};

export function TextLink({
  href,
  tone = "default",
  force,
  children,
}: {
  href: string;
  tone?: keyof typeof linkTones;
  force?: Force;
  children: ReactNode;
}) {
  return (
    <Link href={href} data-force={force} className={`${linkTones[tone]} ${focusRing}`}>
      {children}
    </Link>
  );
}

/* Inputs */

const field =
  "ds-body min-h-11 w-full rounded-(--ds-radius-field) border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) px-3 text-(--ds-text) transition-colors ds-hover:border-(--ds-text) ds-focus:border-(--ds-text) disabled:cursor-not-allowed disabled:border-(--ds-disabled-bg) disabled:bg-(--ds-disabled-bg) disabled:text-(--ds-disabled-text)";

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="ds-label text-(--ds-muted)">{children}</span>;
}

export function TextField({
  label,
  placeholder,
  value,
  onChange,
  force,
  disabled,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  force?: Force;
  disabled?: boolean;
}) {
  return (
    <label className="flex w-full flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange && ((event) => onChange(event.target.value))}
        data-force={force}
        disabled={disabled}
        className={`${field} placeholder:text-(--ds-muted) ${fieldFocusRing}`}
      />
    </label>
  );
}

export function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      <span className="relative">
        <select
          value={value}
          onChange={onChange && ((event) => onChange(event.target.value))}
          className={`${field} appearance-none pr-10 ${fieldFocusRing}`}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-(--ds-text)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </span>
    </label>
  );
}

/* Choices */

const choiceBox = `peer size-5 appearance-none border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) transition-[background-color,border-color,scale] checked:border-(--ds-check) checked:bg-(--ds-check) ds-hover:not-checked:border-(--ds-text) ds-pressed:not-checked:bg-(--ds-soft-pressed) ds-pressed:scale-90 ${focusRing} disabled:border-(--ds-disabled-text) disabled:bg-(--ds-disabled-bg)`;
const choiceLabel =
  "ds-body inline-flex min-h-11 cursor-pointer items-center gap-3 text-(--ds-text) has-disabled:cursor-not-allowed has-disabled:text-(--ds-disabled-text)";

export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  force,
  disabled,
  done,
}: {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  force?: Force;
  disabled?: boolean;
  /** Strike the label through, for checklists. */
  done?: boolean;
}) {
  return (
    <label className={choiceLabel}>
      <span className="relative inline-flex size-5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange && ((event) => onChange(event.target.checked))}
          data-force={force}
          disabled={disabled}
          className={`${choiceBox} rounded-(--ds-radius-check)`}
        />
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-(--ds-on-check) opacity-0 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      </span>
      <span className={done ? "text-(--ds-muted) line-through" : undefined}>{label}</span>
    </label>
  );
}

export function Radio({
  name,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
}: {
  name: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <label className={choiceLabel}>
      <span className="relative inline-flex size-5 shrink-0">
        <input
          type="radio"
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          className={`${choiceBox} rounded-full`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto size-2 rounded-full bg-(--ds-on-check) opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label}
    </label>
  );
}

export function Toggle({
  label,
  on: controlled,
  defaultOn = false,
  onChange,
}: {
  label: string;
  /** Pass to control it from outside. */
  on?: boolean;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
}) {
  const [own, setOn] = useState(defaultOn);
  const on = controlled ?? own;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => {
        setOn(!on);
        onChange?.(!on);
      }}
      className={`group ds-body inline-flex min-h-11 items-center gap-3 text-left text-(--ds-text) ${focusRing}`}
    >
      <span className="relative h-7 w-12 shrink-0 rounded-(--ds-radius-toggle) border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) transition-colors group-aria-checked:border-(--ds-check) group-aria-checked:bg-(--ds-check)">
        <span className="absolute top-1/2 left-1 size-4.5 -translate-y-1/2 rounded-(--ds-radius-toggle) bg-(--ds-control) transition-[translate,background-color] group-aria-checked:translate-x-5 group-aria-checked:bg-(--ds-on-check)" />
      </span>
      {label}
    </button>
  );
}

/* Navigation */

export function Tab({
  ref,
  fill = false,
  selected = false,
  force,
  disabled,
  id,
  controls,
  onClick,
  onKeyDown,
  tabIndex,
  children,
}: {
  ref?: Ref<HTMLButtonElement>;
  /** Share the row equally on small screens. */
  fill?: boolean;
  selected?: boolean;
  force?: Force;
  disabled?: boolean;
  id?: string;
  controls?: string;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  tabIndex?: number;
  children: ReactNode;
}) {
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={controls}
      tabIndex={tabIndex}
      data-force={force}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`ds-control -mb-px min-h-11 border-b-2 border-transparent px-1 text-(--ds-muted) ${fill ? "flex-1 text-center sm:flex-none sm:text-left" : ""} transition-colors ds-hover:text-(--ds-text) ds-hover:not-aria-selected:border-(--ds-border) ds-pressed:text-(--ds-text) ds-pressed:not-aria-selected:border-(--ds-control) aria-selected:border-(--ds-indicator) aria-selected:text-(--ds-text) ${focusRing} disabled:cursor-not-allowed disabled:text-(--ds-disabled-text)`}
    >
      {children}
    </button>
  );
}

export function Tabs({
  label,
  tabs,
  active: controlled,
  onActiveChange,
  fill = false,
}: {
  label: string;
  tabs: { label: ReactNode; content: ReactNode }[];
  /** Tabs share the row equally on small screens. */
  fill?: boolean;
  /** Pass to control the selected tab from outside. */
  active?: number;
  onActiveChange?: (index: number) => void;
}) {
  const [own, setOwn] = useState(0);
  const active = controlled ?? own;
  const setActive = onActiveChange ?? setOwn;
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label={label} className={`flex border-b border-(--ds-border) ${fill ? "gap-2 sm:gap-6" : "gap-6"}`}>
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            fill={fill}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${id}-tab-${i}`}
            controls={`${id}-panel-${i}`}
            selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={i} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}

export function Chip({
  selected = false,
  force,
  disabled,
  onClick,
  children,
}: {
  selected?: boolean;
  force?: Force;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      disabled={disabled}
      onClick={onClick}
      className={`ds-control inline-flex min-h-11 items-center rounded-(--ds-radius-control) border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) px-4 text-(--ds-text) transition-[background-color,color,border-color,scale] ds-hover:not-aria-pressed:bg-(--ds-soft) ds-pressed:not-aria-pressed:bg-(--ds-soft-pressed) ds-pressed:scale-95 aria-pressed:border-(--ds-selected-border) aria-pressed:bg-(--ds-selected) aria-pressed:text-(--ds-on-selected) ${focusRing} ${disabledFill}`}
    >
      {children}
    </button>
  );
}

export function ChipGroup({ label, options }: { label: string; options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip key={option} selected={option === selected} onClick={() => setSelected(option)}>
          {option}
        </Chip>
      ))}
    </div>
  );
}

/* Content */

export function Badge({ tone = "highlight", children }: { tone?: "highlight" | "neutral"; children: ReactNode }) {
  return (
    <span
      className={`ds-label inline-flex items-center rounded-(--ds-radius-control) px-2.5 py-1 ${
        tone === "highlight"
          ? "bg-(--ds-badge) text-(--ds-on-badge)"
          : "border-(length:--ds-border-width) border-(--ds-control) text-(--ds-text)"
      }`}
    >
      {children}
    </span>
  );
}

function meta(recipe: Recipe) {
  return `${recipe.meal === "breakfast" ? "Breakfast" : "Dinner"} · ${recipe.minutes} min · Serves ${recipe.servings}`;
}

/** Cards leave out servings; the recipe itself lets you change them. */
function cardMeta(recipe: Recipe) {
  return `${recipe.meal === "breakfast" ? "Breakfast" : "Dinner"} · ${recipe.minutes} min`;
}

function summary(recipe: Recipe) {
  const items = recipe.ingredients.map((ingredient) => ingredient.item.split(",")[0]);
  return items.length > 3 ? `${items.slice(0, 3).join(", ")} + ${items.length - 3} more` : items.join(", ");
}

export function RecipeCard({
  recipe,
  force,
  href,
  onOpen,
  media,
  showSummary = false,
}: {
  recipe: Recipe;
  force?: Force;
  /** Makes the card a link to the recipe's page. */
  href?: string;
  onOpen?: () => void;
  /** A photo or drawing; defaults to the style's texture. */
  media?: ReactNode;
  /** A short list of the main ingredients. */
  showSummary?: boolean;
}) {
  const stretch = "text-left outline-none after:absolute after:inset-0";
  return (
    <article
      data-force={force}
      className="relative flex flex-col gap-3 rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) p-3 shadow-(--ds-shadow-card) transition-[border-color,translate,scale] ds-hover:border-(--ds-control) ds-pressed:scale-(--ds-press-scale) has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--ds-focus) data-[force=focus]:outline-2 data-[force=focus]:outline-offset-2 data-[force=focus]:outline-(--ds-focus)"
    >
      <div aria-hidden className="overflow-hidden rounded-(--ds-radius-field)">
        {media ?? <div className="aspect-[4/3]" style={{ background: "var(--ds-art)" }} />}
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="ds-title text-(--ds-text)">
          {href ? (
            <Link href={href} className={stretch}>
              {recipe.name}
            </Link>
          ) : (
            <button type="button" onClick={onOpen} className={stretch}>
              {recipe.name}
            </button>
          )}
        </h3>
        <p className="ds-label text-(--ds-muted)">{cardMeta(recipe)}</p>
        {showSummary && <p className="ds-small pt-0.5 text-(--ds-muted)">{summary(recipe)}</p>}
        {recipe.aheadNote && (
          <div className="pt-1">
            <Badge>Make ahead</Badge>
          </div>
        )}
      </div>
    </article>
  );
}

export function ListRows({
  recipes,
  hrefFor,
  thumb,
}: {
  recipes: Recipe[];
  /** Makes each row a link to that recipe's page. */
  hrefFor?: (recipe: Recipe) => string;
  /** A small photo or drawing at the start of each row. */
  thumb?: (recipe: Recipe) => ReactNode;
}) {
  const row =
    "flex min-h-14 w-full items-center gap-4 px-4 py-3 text-left transition-colors ds-hover:bg-(--ds-soft) ds-pressed:bg-(--ds-soft-pressed) ds-focus:outline-2 ds-focus:-outline-offset-2 ds-focus:outline-(--ds-focus)";
  return (
    <ul className="divide-y divide-(--ds-border) overflow-hidden rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface)">
      {recipes.map((recipe) => {
        const content = (
          <>
            {thumb && (
              <span aria-hidden className="w-16 shrink-0 overflow-hidden rounded-(--ds-radius-check) sm:w-20">
                {thumb(recipe)}
              </span>
            )}
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="ds-title text-(--ds-text)">{recipe.name}</span>
              <span className="ds-label text-(--ds-muted)">
                {recipe.meal === "breakfast" ? "Breakfast" : "Dinner"} · {recipe.minutes} min
              </span>
            </span>
            {recipe.aheadNote && (
              <span className="hidden sm:inline-flex">
                <Badge>Make ahead</Badge>
              </span>
            )}
            <svg viewBox="0 0 16 16" aria-hidden className="size-4 shrink-0 text-(--ds-muted)" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </>
        );
        return (
          <li key={recipe.slug}>
            {hrefFor ? (
              <Link href={hrefFor(recipe)} className={row}>
                {content}
              </Link>
            ) : (
              <button type="button" className={row}>
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* Detail panel and modal */

function RecipeDetail({ recipe, titleId, onClose }: { recipe: Recipe; titleId: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="ds-label text-(--ds-muted)">{meta(recipe)}</p>
          <h3 id={titleId} className="ds-heading text-(--ds-text)">
            {recipe.name}
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className={`inline-flex size-11 shrink-0 items-center justify-center rounded-(--ds-radius-control) text-(--ds-text) ds-hover:bg-(--ds-soft) ${focusRing}`}
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        )}
      </div>
      <ul className="ds-body flex flex-col gap-1 text-(--ds-text)">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.item} className="flex items-baseline gap-3">
            <span className="ds-control w-24 shrink-0 text-(--ds-muted)">{ingredient.amount}</span>
            {ingredient.item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Button>Start cooking</Button>
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </div>
  );
}

const panel =
  "rounded-(--ds-radius-card) border-(length:--ds-border-width) border-(--ds-card-border) bg-(--ds-surface) shadow-(--ds-shadow-card)";

export function DetailPanel({ recipe }: { recipe: Recipe }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className={panel}>
      <RecipeDetail recipe={recipe} titleId={id} />
    </section>
  );
}

export function RecipeModal({ recipe }: { recipe: Recipe }) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const close = () => ref.current?.close();
  // Next keeps recent pages alive but hidden; don't leave a modal open on one.
  useLayoutEffect(() => {
    const dialog = ref.current;
    return () => dialog?.close();
  }, []);
  return (
    <>
      <Button variant="secondary" onClick={() => ref.current?.showModal()}>
        Open as a modal
      </Button>
      <dialog
        ref={ref}
        aria-labelledby={id}
        onClick={(event) => event.target === ref.current && close()}
        className={`m-auto w-[min(32rem,calc(100%-2rem))] p-0 text-(--ds-text) backdrop:bg-black/50 ${panel}`}
      >
        <RecipeDetail recipe={recipe} titleId={id} onClose={close} />
      </dialog>
    </>
  );
}

/* Cooking */

export function IngredientChecklist({
  recipe,
  title = "Ingredients",
}: {
  recipe: Recipe;
  /** null hides the heading, for example inside a tab that already names it. */
  title?: ReactNode | null;
}) {
  const [done, setDone] = useState<boolean[]>(() => recipe.ingredients.map(() => false));
  const ready = done.filter(Boolean).length;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        {title !== null && <h3 className="ds-title text-(--ds-text)">{title}</h3>}
        <p className="ds-label text-(--ds-muted)" aria-live="polite">
          {ready} of {recipe.ingredients.length} ready
        </p>
      </div>
      <ul>
        {recipe.ingredients.map((ingredient, i) => (
          <li key={ingredient.item}>
            <Checkbox
              checked={done[i]}
              done={done[i]}
              onChange={(checked) => setDone(done.map((d, j) => (j === i ? checked : d)))}
              label={
                <>
                  <span className="ds-control">{ingredient.amount}</span> {ingredient.item}
                </>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StepList({
  recipe,
  title = "Steps",
  current: controlled,
  onCurrentChange,
  controls = true,
  action,
}: {
  recipe: Recipe;
  /** null hides the heading, for example inside a tab that already names it. */
  title?: ReactNode | null;
  /** Pass to control it from outside; null means no step is current yet. */
  current?: number | null;
  onCurrentChange?: (step: number) => void;
  /** Show Previous and Next under the list. */
  controls?: boolean;
  /** Extra controls under a step, such as a timer for the current one. */
  action?: (index: number, state: "done" | "current" | "next") => ReactNode;
}) {
  const [own, setOwn] = useState(0);
  const current = controlled === undefined ? own : controlled;
  const setCurrent = onCurrentChange ?? setOwn;
  const last = recipe.steps.length - 1;
  const items = useRef<(HTMLLIElement | null)[]>([]);

  // Keep the current step in view while cooking.
  useEffect(() => {
    if (controlled === undefined || controlled === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    items.current[controlled]?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [controlled]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        {title !== null && <h3 className="ds-title text-(--ds-text)">{title}</h3>}
        <p className="ds-label text-(--ds-muted)" aria-live="polite">
          {current === null ? `${recipe.steps.length} steps` : `Step ${current + 1} of ${recipe.steps.length}`}
        </p>
      </div>
      <ol className="flex flex-col gap-1">
        {recipe.steps.map((step, i) => {
          const state = current === null ? "next" : i < current ? "done" : i === current ? "current" : "next";
          return (
            <li
              key={step}
              ref={(el) => {
                items.current[i] = el;
              }}
            >
              <button
                type="button"
                aria-current={state === "current" ? "step" : undefined}
                onClick={() => setCurrent(i)}
                className={`flex w-full items-start gap-3 rounded-(--ds-radius-field) p-3 text-left transition-colors ds-hover:bg-(--ds-soft) ds-pressed:bg-(--ds-soft-pressed) aria-[current=step]:bg-(--ds-soft) ${focusRing}`}
              >
                <span
                  aria-hidden
                  className={`ds-label flex size-7 shrink-0 items-center justify-center rounded-full ${
                    state === "current"
                      ? "bg-(--ds-check) text-(--ds-on-check)"
                      : state === "done"
                        ? "text-(--ds-muted)"
                        : "border-(length:--ds-border-width) border-(--ds-control) text-(--ds-text)"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                <span className={`ds-body ${state === "done" ? "text-(--ds-muted)" : "text-(--ds-text)"}`}>
                  <span className="sr-only">{state === "done" ? "Done: " : ""}</span>
                  {step}
                </span>
              </button>
              {action?.(i, state) && <div className="pt-1 pb-2 pl-13">{action(i, state)}</div>}
            </li>
          );
        })}
      </ol>
      {controls && current !== null && (
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
            Previous
          </Button>
          <Button disabled={current === last} onClick={() => setCurrent(current + 1)}>
            Next step
          </Button>
        </div>
      )}
    </div>
  );
}

/* UI states */

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span aria-hidden className="size-10 rounded-full border-2 border-dashed border-(--ds-control)" />
      <p className="ds-title text-(--ds-text)">{title}</p>
      <p className="ds-body text-(--ds-muted)">{body}</p>
      {action}
    </div>
  );
}

export function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6 text-(--ds-text) motion-safe:animate-spin">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
