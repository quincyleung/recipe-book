import type { Metadata } from "next";
import { TextLink } from "@/app/_ds/components";
import { themeVars, themes } from "@/app/_ds/themes";
import { fontVariables } from "@/app/_fonts";
import { recipes } from "@/content/recipes";
import { RecipeBook } from "./_components/recipe-book";

export const metadata: Metadata = {
  title: "Recipes · Recipe Book",
  description: "Seven meals I actually cook, with ingredients and steps in one place.",
};

// The site is built in the style I picked.
const style = "old-hong-kong";

export default function RecipesPage() {
  return (
    <main
      className={`${fontVariables[style]} ds-body flex-1 bg-(--ds-bg) text-(--ds-text)`}
      style={themeVars(themes[style])}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
        <header className="flex flex-col gap-4">
          <nav>
            <TextLink href="/">← Hub</TextLink>
          </nav>
          <div className="flex flex-col gap-2">
            <h1 className="ds-display">食譜 Recipe Book</h1>
            <p className="ds-body text-(--ds-muted)">Meals I actually cook, with ingredients and steps in one place.</p>
          </div>
        </header>
        <RecipeBook recipes={recipes} />
      </div>
    </main>
  );
}
