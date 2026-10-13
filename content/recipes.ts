export type Meal = "breakfast" | "dinner";

export type Ingredient = {
  amount: string;
  item: string;
};

export type Recipe = {
  slug: string;
  name: string;
  meal: Meal;
  protein: string;
  /** Hands-on and cooking time, in minutes. */
  minutes: number;
  servings: number;
  /** Anything that has to happen the day before. */
  aheadNote?: string;
  ingredients: Ingredient[];
  steps: string[];
  /** Tips and swaps, for the Notes tab. */
  notes: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "nobu-miso-cod",
    name: "Nobu Miso Cod",
    meal: "dinner",
    protein: "Fish",
    minutes: 15,
    servings: 2,
    aheadNote: "Marinate overnight, up to 3 days.",
    ingredients: [
      { amount: "2 fillets", item: "black cod, skin on" },
      { amount: "¼ cup", item: "white miso" },
      { amount: "3 tbsp", item: "sugar" },
      { amount: "2 tbsp", item: "mirin" },
      { amount: "2 tbsp", item: "sake" },
    ],
    steps: [
      "Simmer the sake and mirin for 20 seconds. Whisk in the miso, then the sugar, until smooth. Let it cool.",
      "Pat the cod dry, coat it in the miso, cover, and refrigerate overnight.",
      "Heat the oven to 200°C (400°F). Wipe most of the marinade off the fish.",
      "Sear skin side up in an oiled oven-safe pan until the top browns, about 2 minutes.",
      "Move to the oven for 10 to 12 minutes, until the fish flakes.",
    ],
    notes: [
      "Wipe off most of the marinade before searing; the sugar in the miso burns quickly.",
      "Cod or salmon work if there is no black cod. Check them a few minutes early.",
    ],
  },
  {
    slug: "beef-enoki-rolls",
    name: "Beef Enoki Rolls",
    meal: "dinner",
    protein: "Beef",
    minutes: 20,
    servings: 2,
    ingredients: [
      { amount: "250 g", item: "thin-sliced beef (shabu-shabu cut)" },
      { amount: "1 pack", item: "enoki mushrooms" },
      { amount: "2 tbsp", item: "soy sauce" },
      { amount: "1 tbsp", item: "mirin" },
      { amount: "1 tbsp", item: "honey" },
      { amount: "1", item: "scallion, sliced" },
    ],
    steps: [
      "Trim the enoki roots and pull them into small bundles.",
      "Roll each bundle in a slice of beef, seam side down.",
      "Mix the soy sauce, mirin, and honey.",
      "Sear the rolls seam side down in an oiled pan, then turn until browned all over, about 5 minutes.",
      "Pour in the sauce and turn the rolls until glazed. Top with scallion.",
    ],
    notes: [
      "Shabu-shabu or hot pot beef is thin enough to roll without tearing.",
      "Sear seam side down first so the rolls hold together.",
    ],
  },
  {
    slug: "honey-garlic-salmon",
    name: "Honey Garlic Salmon",
    meal: "dinner",
    protein: "Fish",
    minutes: 15,
    servings: 2,
    ingredients: [
      { amount: "2 fillets", item: "salmon" },
      { amount: "3 cloves", item: "garlic, minced" },
      { amount: "2 tbsp", item: "honey" },
      { amount: "2 tbsp", item: "soy sauce" },
      { amount: "1 tbsp", item: "butter" },
      { amount: "½", item: "lemon" },
    ],
    steps: [
      "Pat the salmon dry and season with salt and pepper.",
      "Sear skin side down in an oiled pan over medium-high for 4 minutes. Flip and cook 2 more.",
      "Turn the heat to low. Add the butter and garlic and stir for 30 seconds.",
      "Add the honey and soy sauce and spoon the sauce over the fish until it thickens.",
      "Squeeze the lemon over it before serving.",
    ],
    notes: [
      "Pat the salmon dry so the skin crisps.",
      "Turn the heat down before the garlic goes in so it does not burn.",
    ],
  },
  {
    slug: "cantonese-shrimp-and-egg",
    name: "Cantonese Shrimp and Egg",
    meal: "dinner",
    protein: "Seafood",
    minutes: 15,
    servings: 2,
    ingredients: [
      { amount: "200 g", item: "shrimp, peeled" },
      { amount: "4", item: "eggs" },
      { amount: "1 tsp", item: "cornstarch" },
      { amount: "½ tsp", item: "sesame oil" },
      { amount: "1", item: "scallion, sliced" },
      { amount: "¼ tsp", item: "white pepper" },
    ],
    steps: [
      "Toss the shrimp with the cornstarch and a pinch of salt.",
      "Beat the eggs with the sesame oil, white pepper, and a pinch of salt.",
      "Cook the shrimp in an oiled pan over high heat until just pink. Take them out.",
      "Lower the heat to medium-low. Pour in the eggs and let them set for a few seconds.",
      "Return the shrimp and scallion. Push the eggs gently until soft and just set, then plate.",
    ],
    notes: [
      "Take the eggs off the heat while they still look a little wet; they keep cooking on the plate.",
      "Dry the shrimp well so they sear instead of steam.",
    ],
  },
  {
    slug: "ground-beef-bell-peppers",
    name: "Ground Beef with Bell Peppers",
    meal: "dinner",
    protein: "Beef",
    minutes: 20,
    servings: 2,
    ingredients: [
      { amount: "300 g", item: "ground beef" },
      { amount: "2", item: "bell peppers, diced" },
      { amount: "½", item: "onion, diced" },
      { amount: "2 cloves", item: "garlic, minced" },
      { amount: "2 tbsp", item: "soy sauce" },
      { amount: "1 tbsp", item: "oyster sauce" },
    ],
    steps: [
      "Brown the beef in a hot pan, breaking it up. Pour off extra fat.",
      "Add the onion and garlic and cook for 2 minutes.",
      "Add the bell peppers and stir-fry until crisp-tender, about 3 minutes.",
      "Stir in the soy sauce and oyster sauce. Serve over rice.",
    ],
    notes: [
      "Any color of bell pepper works; a mix looks best.",
      "Leftovers keep well for lunch the next day.",
    ],
  },
  {
    slug: "banana-oat-pancakes",
    name: "Banana Oat Pancakes",
    meal: "breakfast",
    protein: "Eggs",
    minutes: 15,
    servings: 1,
    ingredients: [
      { amount: "1", item: "ripe banana" },
      { amount: "2", item: "eggs" },
      { amount: "½ cup", item: "rolled oats" },
      { amount: "½ tsp", item: "baking powder" },
      { amount: "pinch", item: "cinnamon" },
    ],
    steps: [
      "Blend everything until smooth. Let it rest for 2 minutes.",
      "Heat a buttered pan over medium-low.",
      "Pour small rounds and cook until bubbles form, about 2 minutes.",
      "Flip and cook 1 more minute.",
    ],
    notes: [
      "The riper the banana, the sweeter the pancakes.",
      "Keep the heat medium-low; they brown quickly.",
    ],
  },
  {
    slug: "strawberry-overnight-oats",
    name: "Strawberry Overnight Oats",
    meal: "breakfast",
    protein: "Dairy",
    minutes: 5,
    servings: 1,
    aheadNote: "Make the night before.",
    ingredients: [
      { amount: "½ cup", item: "rolled oats" },
      { amount: "½ cup", item: "milk" },
      { amount: "¼ cup", item: "Greek yogurt" },
      { amount: "1 tbsp", item: "chia seeds" },
      { amount: "1 tsp", item: "honey" },
      { amount: "4", item: "strawberries, sliced" },
    ],
    steps: [
      "Stir the oats, milk, yogurt, chia, and honey together in a jar.",
      "Top with the strawberries, close the lid, and refrigerate overnight.",
      "Stir and eat cold in the morning.",
    ],
    notes: [
      "Add the strawberries in the morning if you like them firm.",
      "A splash more milk loosens it if it sets too thick.",
    ],
  },
];
