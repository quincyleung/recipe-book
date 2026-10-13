import type { Meal, Recipe } from "./recipes";

// English and Cantonese (Hong Kong Traditional Chinese) text for the recipe site.

export type Lang = "en" | "zh";

const en = {
  language: "Language",
  title: "Recipe Book",
  hub: "← Hub",
  allRecipes: "← All recipes",
  search: "Search recipes or ingredients",
  searchPlaceholder: "Salmon, eggs, oats…",
  sortBy: "Sort by",
  sorts: ["Quickest first", "A to Z", "Breakfast first"],
  cards: "Cards",
  list: "List",
  view: "View",
  filters: "Filters",
  meal: "Meal",
  meals: { all: "All", breakfast: "Breakfast", dinner: "Dinner" },
  mainIngredient: "Main ingredient",
  mainIngredientHint: "Shows recipes with any you tick.",
  proteins: { Fish: "Fish", Beef: "Beef", Seafood: "Seafood", Eggs: "Eggs", Dairy: "Dairy", Pork: "Pork" } as Record<
    string,
    string
  >,
  time: "Time",
  times: { any: "Any time", "30": "30 min or less", "15": "15 min or less" } as Record<string, string>,
  prep: "Prep",
  preps: { any: "Any prep", tonight: "Ready tonight", ahead: "Make ahead" } as Record<string, string>,
  favorites: "Favorites",
  favoritesOnly: "Favorites only",
  clearFilters: "Clear filters",
  showAll: "Show all",
  showCount: (n: number) => (n === 1 ? "Show 1 recipe" : `Show ${n} recipes`),
  count: (n: number) => (n === 1 ? "1 recipe" : `${n} recipes`),
  noMatchQuery: (q: string) => `No recipes match “${q}”`,
  noMatch: "No recipes match these filters",
  noMatchBody: "Try another ingredient, or clear the filters.",
  makeAhead: "Make ahead",
  favorite: "♡ Favorite",
  favorited: "♥ Favorite",
  favoriteBadge: "♥ Favorite",
  minutes: (n: number) => `${n} min`,
  serves: (n: number) => `Serves ${n}`,
  startCooking: "Start cooking",
  stopCooking: "Stop cooking",
  ingredients: "Ingredients",
  steps: "Steps",
  notes: "Notes",
  servings: "Servings",
  fewer: "Fewer servings",
  more: "More servings",
  ready: (done: number, total: number) => `${done} of ${total} ready`,
  stepCount: (n: number) => `${n} steps`,
  stepOf: (i: number, n: number) => `Step ${i} of ${n}`,
  doneStep: "Done: ",
  cooking: "Cooking",
  stepTimer: (i: number) => `Step ${i} timer`,
  timesUp: (i: number) => `Step ${i}: time’s up`,
  startTimer: (t: string) => `Start ${t} timer`,
  cancelTimer: "Cancel timer",
  previous: "Previous",
  nextStep: "Next step",
  finish: "Finish",
  done: (name: string) => `✓ Done. Enjoy your ${name}!`,
  recipe: "Recipe",
  drawingOf: (name: string) => `Drawing of ${name}`,
};

export type Strings = typeof en;

export const ui: Record<Lang, Strings> = {
  en,
  zh: {
    language: "語言",
    title: "食譜",
    hub: "← 主頁",
    allRecipes: "← 所有食譜",
    search: "搜尋食譜或材料",
    searchPlaceholder: "三文魚、雞蛋、燕麥…",
    sortBy: "排序",
    sorts: ["最快優先", "按名稱", "早餐優先"],
    cards: "卡片",
    list: "列表",
    view: "顯示方式",
    filters: "篩選",
    meal: "餐類",
    meals: { all: "全部", breakfast: "早餐", dinner: "晚餐" },
    mainIngredient: "主要材料",
    mainIngredientHint: "顯示含任何已選材料的食譜。",
    proteins: { Fish: "魚", Beef: "牛肉", Seafood: "海鮮", Eggs: "蛋", Dairy: "奶類", Pork: "豬肉" } as Record<
      string,
      string
    >,
    time: "時間",
    times: { any: "不限時間", "30": "30分鐘或以內", "15": "15分鐘或以內" } as Record<string, string>,
    prep: "準備",
    preps: { any: "不限", tonight: "今晚即煮", ahead: "需預先準備" } as Record<string, string>,
    favorites: "最愛",
    favoritesOnly: "只顯示最愛",
    clearFilters: "清除篩選",
    showAll: "顯示全部",
    showCount: (n: number) => `顯示 ${n} 個食譜`,
    count: (n: number) => `${n} 個食譜`,
    noMatchQuery: (q: string) => `沒有符合「${q}」的食譜`,
    noMatch: "沒有符合篩選條件的食譜",
    noMatchBody: "試試其他材料，或清除篩選。",
    makeAhead: "需預先準備",
    favorite: "♡ 加入最愛",
    favorited: "♥ 已加入最愛",
    favoriteBadge: "♥ 最愛",
    minutes: (n: number) => `${n}分鐘`,
    serves: (n: number) => `${n}人份`,
    startCooking: "開始煮",
    stopCooking: "停止",
    ingredients: "材料",
    steps: "做法",
    notes: "筆記",
    servings: "份量",
    fewer: "減少份量",
    more: "增加份量",
    ready: (done: number, total: number) => `已備 ${done} / ${total}`,
    stepCount: (n: number) => `共 ${n} 步`,
    stepOf: (i: number, n: number) => `第 ${i} / ${n} 步`,
    doneStep: "已完成：",
    cooking: "烹調中",
    stepTimer: (i: number) => `第${i}步計時`,
    timesUp: (i: number) => `第${i}步：時間到`,
    startTimer: (t: string) => `開始 ${t} 計時`,
    cancelTimer: "取消計時",
    previous: "上一步",
    nextStep: "下一步",
    finish: "完成",
    done: (name: string) => `✓ 完成！請享用${name}！`,
    recipe: "食譜",
    drawingOf: (name: string) => `${name}插圖`,
  },
};

export function mealName(meal: Meal, lang: Lang) {
  return ui[lang].meals[meal];
}

/** Chinese text for each recipe, in the same order as the English ingredients, steps, and notes. */
type RecipeZh = {
  name: string;
  aheadNote?: string;
  /** Item names; a second value is the measure word for amounts without a unit ("4" eggs → "4隻"). */
  items: [string, string?][];
  steps: string[];
  notes: string[];
};

const zh: Record<string, RecipeZh> = {
  "nobu-miso-cod": {
    name: "Nobu 味噌銀鱈魚",
    aheadNote: "前一晚醃好，最多可醃三天。",
    items: [["銀鱈魚（連皮）"], ["白味噌"], ["砂糖"], ["味醂"], ["清酒"]],
    steps: [
      "清酒和味醂煮滾20秒。拌入味噌，再加砂糖，攪至順滑，放涼。",
      "銀鱈魚抹乾，塗滿味噌醬，蓋好放雪櫃醃一晚。",
      "焗爐預熱至200°C（400°F），抹走魚身上大部分醃料。",
      "用可入焗爐的鑊落少許油，魚皮向上煎至表面金黃，約2分鐘。",
      "放入焗爐焗10至12分鐘，至魚肉可輕易撥開。",
    ],
    notes: ["煎之前抹走大部分醃料，味噌裏的糖很易燶。", "沒有銀鱈魚可改用鱈魚或三文魚，早幾分鐘檢查熟度。"],
  },
  "beef-enoki-rolls": {
    name: "金菇肥牛卷",
    items: [["薄切肥牛片（火鍋用）"], ["金菇"], ["豉油"], ["味醂"], ["蜜糖"], ["蔥（切粒）", "條"]],
    steps: [
      "切去金菇根部，分成小束。",
      "每束金菇用一片牛肉捲起，接口向下。",
      "將豉油、味醂和蜜糖拌勻。",
      "落油，接口向下先煎，再轉動煎至全身金黃，約5分鐘。",
      "倒入醬汁，轉動牛肉卷至均勻上色，撒上蔥粒。",
    ],
    notes: ["火鍋肥牛片夠薄，捲起來不易散開。", "接口向下先煎，牛肉卷就不會鬆開。"],
  },
  "honey-garlic-salmon": {
    name: "蜜糖蒜香三文魚",
    items: [["三文魚"], ["蒜（剁碎）"], ["蜜糖"], ["豉油"], ["牛油"], ["檸檬", "個"]],
    steps: [
      "三文魚抹乾，以鹽和胡椒調味。",
      "落油，中大火魚皮向下煎4分鐘，翻轉再煎2分鐘。",
      "轉細火，加入牛油和蒜蓉炒30秒。",
      "加入蜜糖和豉油，把醬汁淋在魚上至醬汁變稠。",
      "上碟前擠上檸檬汁。",
    ],
    notes: ["三文魚抹乾，魚皮先會脆。", "加蒜之前先轉細火，蒜蓉才不會燶。"],
  },
  "cantonese-shrimp-and-egg": {
    name: "滑蛋蝦仁",
    items: [["蝦仁"], ["雞蛋", "隻"], ["粟粉"], ["麻油"], ["蔥（切粒）", "條"], ["白胡椒粉"]],
    steps: [
      "蝦仁加粟粉和少許鹽拌勻。",
      "雞蛋加麻油、白胡椒粉和少許鹽打勻。",
      "大火落油炒蝦仁至剛轉紅，盛起。",
      "轉中慢火，倒入蛋液，等數秒至稍為凝固。",
      "放回蝦仁和蔥，輕輕推動蛋液至嫩滑剛熟，即可上碟。",
    ],
    notes: ["蛋看起來仍有點濕時就離火，餘溫會繼續把蛋弄熟。", "蝦仁要抹乾，才會煎得香而不出水。"],
  },
  "ground-beef-bell-peppers": {
    name: "燈籠椒炒牛肉碎",
    items: [["免治牛肉"], ["燈籠椒（切粒）", "個"], ["洋蔥（切粒）", "個"], ["蒜（剁碎）"], ["豉油"], ["蠔油"]],
    steps: [
      "牛肉碎放入熱鑊炒至變色，邊炒邊撥散，倒走多餘油份。",
      "加入洋蔥和蒜蓉炒2分鐘。",
      "加入燈籠椒炒至剛熟仍爽脆，約3分鐘。",
      "拌入豉油和蠔油，伴飯享用。",
    ],
    notes: [
      "任何顏色的燈籠椒都可以，混合幾種最好看。",
      "時間不包括煮飯；可先煮飯，或用剩飯。",
      "剩菜翌日帶飯一樣好味。",
    ],
  },
  "banana-oat-pancakes": {
    name: "香蕉燕麥班戟",
    items: [["熟香蕉", "條"], ["雞蛋", "隻"], ["燕麥片"], ["泡打粉"], ["肉桂粉"]],
    steps: [
      "把所有材料打至順滑，靜置2分鐘。",
      "平底鑊塗上牛油，用中慢火加熱。",
      "倒入小圓形麵糊，煎至表面起泡，約2分鐘。",
      "翻轉再煎1分鐘。",
    ],
    notes: ["香蕉愈熟，班戟愈甜。", "保持中慢火，班戟很快上色。"],
  },
  "strawberry-overnight-oats": {
    name: "士多啤梨隔夜燕麥",
    aheadNote: "前一晚準備。",
    items: [["燕麥片"], ["牛奶"], ["希臘乳酪"], ["奇亞籽"], ["蜜糖"], ["士多啤梨（切片）", "粒"]],
    steps: ["把燕麥、牛奶、乳酪、奇亞籽和蜜糖放入玻璃瓶拌勻。", "鋪上士多啤梨，蓋好放雪櫃過夜。", "早上拌勻，凍食。"],
    notes: ["喜歡士多啤梨爽口，可早上才加。", "太稠的話加少許牛奶拌開。"],
  },
  "tamago-sando": {
    name: "玉子三文治",
    items: [["雞蛋", "隻"], ["丘比沙律醬"], ["砂糖"], ["鹽"], ["白胡椒粉"], ["牛奶方包"], ["牛油（軟化）"]],
    steps: [
      "雞蛋烚10分鐘，再放入冰水浸5分鐘。",
      "雞蛋去殼，蛋白切碎，蛋黃加沙律醬、砂糖、鹽和胡椒壓成蓉。",
      "拌入切碎的蛋白。",
      "麵包塗上牛油，在兩片麵包上厚厚鋪上蛋沙律，再蓋上另一片。",
      "輕輕壓實，切走麵包皮，每份切半。",
    ],
    notes: ["丘比沙律醬味道濃郁帶酸；用普通沙律醬可多加少許糖。", "包好放雪櫃冷藏10分鐘，切出來更整齊。"],
  },
  "char-siu-fried-rice": {
    name: "叉燒炒飯",
    aheadNote: "前一日煮好飯；隔夜凍飯最好炒。",
    items: [
      ["凍白飯"],
      ["叉燒（切粒）"],
      ["雞蛋", "隻"],
      ["急凍青豆"],
      ["蔥（切粒）", "條"],
      ["生抽"],
      ["老抽"],
      ["油"],
    ],
    steps: [
      "用手把凍飯撥散，不要有飯糰。",
      "熱鑊落油，把蛋炒至剛凝固，盛起。",
      "炒叉燒和青豆2分鐘。",
      "加入白飯，大火兜炒3分鐘，至飯粒熱透分明。",
      "拌入生抽、老抽、炒蛋和蔥，再炒1分鐘即可上碟。",
    ],
    notes: ["雪櫃拿出來的凍飯炒起來不會黏。", "燒味舖買的叉燒最好，揀肥瘦均勻的一件。"],
  },
  "oat-banana-bread": {
    name: "燕麥香蕉蛋糕",
    items: [["熟香蕉", "條"], ["雞蛋", "隻"], ["蜜糖"], ["牛油（溶化）"], ["燕麥片"], ["梳打粉"], ["肉桂粉"], ["鹽"]],
    steps: [
      "焗爐預熱至175°C（350°F），長方形焗盤鋪上牛油紙。",
      "把燕麥打成粗粉。",
      "香蕉壓蓉，加入雞蛋、蜜糖和溶化牛油拌勻。",
      "拌入燕麥粉、梳打粉、肉桂粉和鹽，拌至剛好混合。",
      "倒入焗盤，焗50分鐘，至竹籤插入後取出無黏附。",
      "放涼15分鐘再切片。",
    ],
    notes: ["香蕉愈黑愈熟，蛋糕愈甜。", "包好放室溫可保存三日，切片烘熱更好吃。"],
  },
};

const units: [RegExp, string][] = [
  [/^fillets?$/, "塊"],
  [/^cloves?$/, "瓣"],
  [/^packs?$/, "包"],
  [/^slices?$/, "片"],
  [/^cups?$/, "杯"],
  [/^tbsp$/, "湯匙"],
  [/^tsp$/, "茶匙"],
  [/^g$/, "克"],
];

/** "2 tbsp" → "2湯匙", "4" (eggs) → "4隻", "pinch" → "少許". */
function zhAmount(amount: string, measure?: string) {
  if (amount === "pinch") return "少許";
  const match = amount.match(/^([\d.]*[⅛⅙¼⅓½⅔¾]?)\s*(.*)$/);
  if (!match || !match[1]) return amount;
  const [, qty, unit] = match;
  if (!unit) return `${qty}${measure ?? ""}`;
  const zhUnit = units.find(([pattern]) => pattern.test(unit))?.[1];
  return zhUnit ? `${qty}${zhUnit}` : amount;
}

/** The recipe's text in the chosen language. Amounts should already be scaled. */
export function localize(recipe: Recipe, lang: Lang): Recipe {
  const t = zh[recipe.slug];
  if (lang === "en" || !t) return recipe;
  return {
    ...recipe,
    name: t.name,
    aheadNote: recipe.aheadNote && t.aheadNote,
    ingredients: recipe.ingredients.map((ingredient, i) => ({
      amount: zhAmount(ingredient.amount, t.items[i]?.[1]),
      item: t.items[i]?.[0] ?? ingredient.item,
    })),
    steps: t.steps,
    notes: t.notes,
  };
}
