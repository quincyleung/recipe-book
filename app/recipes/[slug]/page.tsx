import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { themeVars, themes } from "@/app/_ds/themes";
import { fontVariables } from "@/app/_fonts";
import { recipes } from "@/content/recipes";
import { RecipeView } from "../_components/recipe-view";

const style = "old-hong-kong";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: PageProps<"/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  return { title: recipe ? `${recipe.name} · Recipe Book` : "Recipe Book" };
}

export default async function RecipePage({ params }: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  return (
    <main
      className={`${fontVariables[style]} ds-body flex flex-1 flex-col bg-(--ds-bg) text-(--ds-text)`}
      style={themeVars(themes[style])}
    >
      <RecipeView recipe={recipe} />
    </main>
  );
}
