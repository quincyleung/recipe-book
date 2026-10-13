"use client";

import { Chip } from "@/app/_ds/components";
import { useRecipeBook } from "./recipe-book-context";

/** Switches the recipe site between English and Cantonese. */
export function LanguageToggle() {
  const { lang, setLang, t } = useRecipeBook();
  return (
    <div role="group" aria-label={t.language} className="flex gap-1.5">
      <Chip compact selected={lang === "en"} onClick={() => setLang("en")}>
        <span lang="en">EN</span>
      </Chip>
      <Chip compact selected={lang === "zh"} onClick={() => setLang("zh")}>
        <span lang="zh-Hant-HK">中文</span>
      </Chip>
    </div>
  );
}
