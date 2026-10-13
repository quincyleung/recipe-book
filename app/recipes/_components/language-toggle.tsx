"use client";

import { useRecipeBook } from "./recipe-book-context";

/**
 * Switches the recipe site between English and Cantonese. A toggle (track and knob)
 * rather than buttons, so it doesn't compete with the page's actions. Both languages
 * are equal choices, so only the knob moves; the chosen label goes bold.
 */
export function LanguageToggle() {
  const { lang, setLang } = useRecipeBook();
  const zh = lang === "zh";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={zh}
      aria-label="中文 (Chinese)"
      onClick={() => setLang(zh ? "en" : "zh")}
      className="group ds-small inline-flex min-h-11 items-center gap-2 text-(--ds-muted) ds-focus:outline-2 ds-focus:outline-offset-2 ds-focus:outline-(--ds-focus)"
    >
      <span lang="en" className="group-aria-[checked=false]:font-semibold group-aria-[checked=false]:text-(--ds-text)">
        EN
      </span>
      <span className="relative h-6 w-11 shrink-0 rounded-(--ds-radius-toggle) border-(length:--ds-border-width) border-(--ds-control) bg-(--ds-surface) transition-colors group-ds-hover:bg-(--ds-soft) group-ds-pressed:bg-(--ds-soft-pressed)">
        <span className="absolute top-1/2 left-0.5 size-4 -translate-y-1/2 rounded-(--ds-radius-toggle) bg-(--ds-control) transition-transform group-aria-checked:translate-x-5" />
      </span>
      <span lang="zh-Hant-HK" className="group-aria-checked:font-semibold group-aria-checked:text-(--ds-text)">
        中文
      </span>
    </button>
  );
}
