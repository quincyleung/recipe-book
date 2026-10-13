import { Placeholder } from "@/app/_components/placeholder";
import { recipes } from "@/content/recipes";

export default function RecipesPage() {
  return <Placeholder title="Recipe Book" note={`${recipes.length} recipes, in the style I pick. Coming soon.`} />;
}
