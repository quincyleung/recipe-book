export type Meal = "breakfast" | "dinner";

export type Ingredient = {
  amount: string;
  item: string;
};

export type Recipe = {
  slug: string;
  name: string;
  meal: Meal;
  /** Main ingredients, for filtering; a dish can have more than one. */
  proteins: string[];
  /** Total time from starting to cook to food on the plate, in minutes. Make-ahead time is not included. */
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
    proteins: ["Fish"],
    minutes: 25,
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
    proteins: ["Beef"],
    minutes: 25,
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
    proteins: ["Fish"],
    minutes: 20,
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
    proteins: ["Seafood", "Eggs"],
    minutes: 20,
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
    proteins: ["Beef"],
    minutes: 25,
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
      "The time doesn't include rice; start it first, or use leftover rice.",
      "Leftovers keep well for lunch the next day.",
    ],
  },
  {
    slug: "banana-oat-pancakes",
    name: "Banana Oat Pancakes",
    meal: "breakfast",
    proteins: ["Eggs"],
    minutes: 20,
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
    proteins: ["Dairy"],
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
  {
    slug: "tamago-sando",
    name: "Tamago Sando",
    meal: "breakfast",
    proteins: ["Eggs"],
    minutes: 25,
    servings: 2,
    ingredients: [
      { amount: "4", item: "eggs" },
      { amount: "2 tbsp", item: "Kewpie mayonnaise" },
      { amount: "1 tsp", item: "sugar" },
      { amount: "¼ tsp", item: "salt" },
      { amount: "pinch", item: "white pepper" },
      { amount: "4 slices", item: "milk bread (shokupan)" },
      { amount: "1 tbsp", item: "butter, softened" },
    ],
    steps: [
      "Boil the eggs for 10 minutes, then cool them in ice water for 5 minutes.",
      "Peel the eggs. Chop the whites finely and mash the yolks with the mayonnaise, sugar, salt, and pepper.",
      "Fold the chopped whites into the yolks.",
      "Butter the bread, spread the egg thickly over two slices, and close the sandwiches.",
      "Press gently, cut off the crusts, and slice each sandwich in half.",
    ],
    notes: [
      "Kewpie mayonnaise gives the rich, tangy taste; regular mayonnaise with a little more sugar works too.",
      "Wrap and chill for 10 minutes for neater slices.",
    ],
  },
  {
    slug: "char-siu-fried-rice",
    name: "Char Siu Fried Rice",
    meal: "dinner",
    proteins: ["Pork", "Eggs"],
    minutes: 20,
    servings: 2,
    aheadNote: "Cook the rice the day before; cold rice fries best.",
    ingredients: [
      { amount: "3 cups", item: "cooked rice, cold" },
      { amount: "150 g", item: "char siu, diced" },
      { amount: "2", item: "eggs" },
      { amount: "½ cup", item: "frozen peas" },
      { amount: "2", item: "scallions, sliced" },
      { amount: "1 tbsp", item: "soy sauce" },
      { amount: "1 tsp", item: "dark soy sauce" },
      { amount: "1 tbsp", item: "oil" },
    ],
    steps: [
      "Break up the cold rice with your fingers so there are no clumps.",
      "Scramble the eggs in a hot oiled wok until just set, then take them out.",
      "Stir-fry the char siu and peas for 2 minutes.",
      "Add the rice and toss over high heat for 3 minutes, until the grains are hot and separate.",
      "Stir in both soy sauces, the eggs, and the scallions. Toss for 1 more minute and serve.",
    ],
    notes: [
      "Rice straight from the fridge fries without turning mushy.",
      "Char siu from a roast meat shop works perfectly; ask for a fatty piece.",
    ],
  },
  {
    slug: "oat-banana-bread",
    name: "Oat Banana Bread",
    meal: "breakfast",
    proteins: ["Eggs"],
    minutes: 75,
    servings: 8,
    ingredients: [
      { amount: "3", item: "ripe bananas" },
      { amount: "2", item: "eggs" },
      { amount: "⅓ cup", item: "honey" },
      { amount: "¼ cup", item: "butter, melted" },
      { amount: "1½ cups", item: "rolled oats" },
      { amount: "1 tsp", item: "baking soda" },
      { amount: "1 tsp", item: "cinnamon" },
      { amount: "pinch", item: "salt" },
    ],
    steps: [
      "Heat the oven to 175°C (350°F) and line a loaf pan with baking paper.",
      "Blend the oats into a coarse flour.",
      "Mash the bananas, then whisk in the eggs, honey, and melted butter.",
      "Stir in the oat flour, baking soda, cinnamon, and salt until just combined.",
      "Pour into the pan and bake for 50 minutes, until a skewer comes out clean.",
      "Let it cool for 15 minutes before slicing.",
    ],
    notes: [
      "The browner the bananas, the sweeter the bread.",
      "Keeps for three days wrapped on the counter; toast slices to warm them.",
    ],
  },
];
