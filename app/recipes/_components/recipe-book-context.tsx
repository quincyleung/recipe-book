"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { ui, type Lang, type Strings } from "@/content/i18n";

// Language and favorites, shared by the list and every recipe page. Nothing is saved:
// both reset when the page reloads.

type RecipeBookState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Strings;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
};

const RecipeBookContext = createContext<RecipeBookState | null>(null);

export function RecipeBookProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (slug: string) =>
    setFavorites((current) => (current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]));

  return (
    <RecipeBookContext value={{ lang, setLang, t: ui[lang], favorites, toggleFavorite }}>
      {/* display: contents keeps the page layout; lang tells screen readers which language to read. */}
      <div lang={lang === "zh" ? "zh-Hant-HK" : "en"} className="contents">
        {children}
      </div>
    </RecipeBookContext>
  );
}

export function useRecipeBook() {
  const state = use(RecipeBookContext);
  if (!state) throw new Error("useRecipeBook must be used inside RecipeBookProvider");
  return state;
}
