import type { Ingredient, Recipe } from "@/content/recipes";

// Scales ingredient amounts like "2 fillets", "¼ cup", "250 g", or "½" to a new
// number of servings. Amounts without a number ("pinch") stay as they are.

const glyphs: Record<string, number> = { "⅛": 1 / 8, "¼": 1 / 4, "⅓": 1 / 3, "½": 1 / 2, "⅔": 2 / 3, "¾": 3 / 4 };
const fractions = Object.entries(glyphs).map(([glyph, value]) => ({ glyph, value }));

/** Words that change between one and many, in amounts ("fillets") and items ("bell peppers"). */
const nouns: [string, string][] = [
  ["fillet", "fillets"],
  ["clove", "cloves"],
  ["pack", "packs"],
  ["banana", "bananas"],
  ["scallion", "scallions"],
  ["lemon", "lemons"],
  ["onion", "onions"],
  ["bell pepper", "bell peppers"],
  ["egg", "eggs"],
  ["strawberry", "strawberries"],
];

function parse(amount: string) {
  const match = amount.match(/^(\d+(?:\.\d+)?)?\s*([⅛¼⅓½⅔¾])?\s*(.*)$/);
  if (!match || (!match[1] && !match[2])) return null;
  return { qty: (match[1] ? Number(match[1]) : 0) + (match[2] ? glyphs[match[2]] : 0), unit: match[3] };
}

function formatQty(qty: number, unit: string) {
  if (/^(g|ml)\b/.test(unit)) return String(Math.max(5, Math.round(qty / 5) * 5));
  let whole = Math.floor(qty);
  let rest = qty - whole;
  if (rest > 0.94) {
    whole += 1;
    rest = 0;
  }
  if (rest < 0.06) return String(whole);
  const near = fractions.find((f) => Math.abs(f.value - rest) < 0.05);
  if (!near) return String(Math.round(qty * 10) / 10);
  return whole ? `${whole}${near.glyph}` : near.glyph;
}

/** Makes the first matching noun singular for one or fewer, plural for more. */
function agree(text: string, qty: number) {
  for (const [one, many] of nouns) {
    const from = qty > 1 ? one : many;
    const to = qty > 1 ? many : one;
    const pattern = new RegExp(`\\b${from}\\b`);
    if (pattern.test(text) && !new RegExp(`\\b${to}\\b`).test(text)) return text.replace(pattern, to);
  }
  return text;
}

export function scaleIngredients(recipe: Recipe, servings: number): Ingredient[] {
  const factor = servings / recipe.servings;
  if (factor === 1) return recipe.ingredients;
  return recipe.ingredients.map((ingredient) => {
    const parsed = parse(ingredient.amount);
    if (!parsed) return ingredient;
    const qty = parsed.qty * factor;
    const amount = [formatQty(qty, parsed.unit), agree(parsed.unit, qty)].filter(Boolean).join(" ");
    // With no unit the item itself is counted ("2 eggs", "1 bell pepper").
    const [head, ...tail] = ingredient.item.split(",");
    const item = parsed.unit ? ingredient.item : [agree(head, qty), ...tail].join(",");
    return { amount, item };
  });
}
