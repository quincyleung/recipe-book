import type { ReactNode } from "react";
import { RecipeBookProvider } from "./_components/recipe-book-context";

// Shares the language choice and favorites between the list and every recipe page.
export default function RecipesLayout({ children }: { children: ReactNode }) {
  return <RecipeBookProvider>{children}</RecipeBookProvider>;
}
