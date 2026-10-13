import { photo, source, tile, type Board } from "../_components/mood-board";

const ivory = "#F8F3E8";
const gilt = "#B08D4C";
// Darker gold for small text, so it stays legible on ivory.
const giltText = "#8A6A2E";
const marble = "#E6E1D8";
const espresso = "#2B2420";
const peony = "#D98A94";
const muted = "#6E6253";
const foil = "linear-gradient(135deg, #8C6A2F, #D9BC7A 35%, #F4E3B5 50%, #C9A45E 65%, #8C6A2F)";

export const parisianMorning: Board = {
  colors: { bg: ivory, ink: espresso, muted, accent: giltText, line: "#E2D7C3" },
  titleClassName: "font-cormorant text-5xl italic sm:text-7xl",
  headingClassName: "font-cormorant text-4xl italic",
  bodyClassName: "font-jost",
  proseClassName: "font-jost",
  tileClassName: "rounded-none",
  evokes: "A slow breakfast at a marble café table: ivory china, a little gold, and a fine serif on the menu.",
  suits: "Breakfasts and weekend cooking that should feel like a small occasion, even at home.",
  sources: [
    source(
      photo("carette-croissants", 736, 978, "Croissants and hot chocolate on a marble café table at Carette"),
      "Breakfast at Carette",
      "Take the marble table, white china, and a morning with no rush.",
    ),
    source(
      photo("le-marais-bakery", 736, 983, "Le Marais Bakery's gilt lettering on a café window"),
      "Gilt letters on glass",
      "Take the gold serif lettering: gold only for the few words that matter.",
    ),
    source(
      photo("je-taime-handwriting", 736, 736, "Handwritten lines of je t'aime in black ink"),
      "Je t'aime, in ink",
      "Take the handwritten script, used once, as a flourish.",
    ),
    source(
      photo("haussmann-facade", 736, 1308, "A cream Haussmann building with wrought-iron balconies"),
      "A Haussmann façade",
      "Take the cream stone and the fine, repeated ironwork: order, with a little ornament.",
    ),
  ],
  references: [
    photo("palais-garnier-gilt-ceiling", 960, 1280, "The gilded, painted ceiling of the Palais Garnier grand foyer", {
      title: "Grand foyer of Opéra Garnier 02",
      author: "Chatsam",
      license: "CC BY-SA 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Grand_foyer_of_Op%C3%A9ra_Garnier_02.JPG",
    }),
    photo("carette-strawberries-chocolate", 736, 1307, "Strawberries, whipped cream, and hot chocolate at a café table"),
    photo("laduree-macarons", 960, 960, "A box of pastel Ladurée macarons", {
      title: "Ladurée Macaron",
      author: "leo gonzales",
      license: "CC BY 2.0",
      url: "https://commons.wikimedia.org/wiki/File:Ladur%C3%A9e_Macaron.jpg",
    }),
    photo("oval-window-eiffel", 570, 855, "The Eiffel Tower seen through an oval window"),
    photo("galerie-vivienne-mosaic", 960, 485, "Galerie Vivienne's glass roof and mosaic floor", {
      title: "Galerie Vivienne, 12 March 2015",
      author: "Benh LIEU SONG",
      license: "CC BY-SA 2.0",
      url: "https://commons.wikimedia.org/wiki/File:Galerie_Vivienne,_12_March_2015.jpg",
    }),
    photo("cite-metro-station", 697, 1024, "The vaulted, lamp-lit Cité metro station"),
    photo("peonies-tartlet-cafe", 736, 736, "Pink peonies, two coffees, and a raspberry tartlet at a café"),
    photo("cafe-creme-books", 960, 712, "A black-and-white photo of a café crème among open books", {
      title: "Café-crème existentiel",
      author: "Airair",
      license: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Caf%C3%A9-cr%C3%A8me_existentiel.jpg",
    }),
    photo("painted-ceiling-cafe", 736, 981, "A café with a painted ceiling, brass lamps, and fresh flowers"),
    photo("galerie-vivienne-entrance", 960, 1371, "The carved stone and gilt ironwork entrance of Galerie Vivienne", {
      title: "P1040480 Paris II galerie Vivienne entrée rwk",
      author: "Mbzt",
      license: "CC BY 3.0",
      url: "https://commons.wikimedia.org/wiki/File:P1040480_Paris_II_galerie_Vivienne_entr%C3%A9e_rwk.JPG",
    }),
    photo("heart-cups-windowsill", 736, 920, "Two coffee cups with red hearts on a stone windowsill"),
  ],
  palette: [
    { name: "Ivory", hex: ivory, ink: espresso, outlined: true },
    { name: "Gilt", hex: gilt, ink: espresso },
    { name: "Marble", hex: marble, ink: espresso },
    { name: "Espresso", hex: espresso },
    { name: "Peony", hex: peony, ink: espresso },
  ],
  type: [
    tile(
      "Type specimen: Cormorant Garamond, the display face",
      <div className="flex aspect-square flex-col justify-between bg-white p-4" style={{ color: espresso }}>
        <span className="font-cormorant text-7xl leading-none italic">Aa</span>
        <span className="text-xs tracking-wide">Cormorant Garamond · display</span>
      </div>,
    ),
    tile(
      "Script: Bonjour, in Pinyon Script",
      <div className="flex aspect-square flex-col justify-between bg-white p-4">
        <span className="font-pinyon text-5xl" style={{ color: gilt }}>
          Bonjour
        </span>
        <span className="text-xs tracking-wide" style={{ color: espresso }}>
          Pinyon Script · once, as a flourish
        </span>
      </div>,
    ),
    tile(
      "Type specimen: Jost, the label face",
      <div className="flex aspect-square flex-col justify-between bg-white p-4" style={{ color: espresso }}>
        <span className="text-[11px] tracking-[0.25em] uppercase">Pâtisserie · Café</span>
        <span className="text-xs" style={{ color: muted }}>
          Jost · labels
        </span>
      </div>,
    ),
  ],
  textureHeading: "Texture and ornament",
  textures: [
    tile(
      "Texture: white marble",
      <svg viewBox="0 0 200 200" className="block h-auto w-full">
        <filter id="pm-marble">
          <feTurbulence type="turbulence" baseFrequency="0.006 0.018" numOctaves="5" seed="7" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.53  0 0 0 0 0.5  -2.6 0 0 0 0.9" />
        </filter>
        <rect width="200" height="200" fill="#F4F1EC" />
        <rect width="200" height="200" filter="url(#pm-marble)" />
      </svg>,
    ),
    tile(
      "Gold foil: N° 07",
      <div className="flex aspect-square items-center justify-center" style={{ background: foil }}>
        <span className="font-cormorant text-5xl" style={{ color: espresso }}>
          N° 07
        </span>
      </div>,
    ),
    tile(
      "Ornament: gilt oval frame",
      <svg viewBox="0 0 160 160" className="block h-auto w-full">
        <rect width="160" height="160" fill="#FFFFFF" />
        <ellipse cx="80" cy="80" rx="46" ry="64" fill="none" stroke={gilt} strokeWidth="1.5" />
        <ellipse cx="80" cy="80" rx="40" ry="58" fill="none" stroke={gilt} strokeWidth="0.75" />
        <text x="80" y="88" textAnchor="middle" fontSize="26" fill={espresso} className="font-pinyon">
          Matin
        </text>
      </svg>,
    ),
  ],
  ui: [
    tile(
      "Interface: primary button and text link",
      <div className="flex aspect-square flex-col items-start justify-center gap-3 bg-white p-4 text-xs tracking-widest uppercase">
        <span className="px-4 py-2.5 text-white" style={{ backgroundColor: espresso }}>
          Start cooking
        </span>
        <span className="border-b pb-0.5" style={{ borderColor: gilt, color: espresso }}>
          See the recipe
        </span>
      </div>,
    ),
    tile(
      "Interface: tabs with Matin selected",
      <div className="flex aspect-square items-center gap-4 bg-white p-4 font-cormorant text-lg" style={{ color: espresso }}>
        <span className="border-b-2 pb-1" style={{ borderColor: gilt }}>
          Matin
        </span>
        <span style={{ color: muted }}>Soir</span>
        <span style={{ color: muted }}>Tout</span>
      </div>,
    ),
    tile(
      "Interface: recipe card",
      <div className="bg-white p-2" style={{ color: espresso }}>
        <div className="border p-3" style={{ borderColor: marble }}>
          <div className="aspect-[3/2]" style={{ backgroundColor: marble }} />
          <p className="mt-3 font-cormorant text-xl leading-tight">Banana Oat Pancakes</p>
          <p className="mt-1 text-[10px] tracking-widest uppercase" style={{ color: muted }}>
            Breakfast · 15 min
          </p>
        </div>
      </div>,
    ),
    tile(
      "Menu card: Le Petit Déjeuner",
      <div className="bg-white p-2">
        <div className="border p-4 text-center" style={{ borderColor: gilt, color: espresso }}>
          <p className="font-cormorant text-xl italic">Le Petit Déjeuner</p>
          <div className="mx-auto my-2 h-px w-10" style={{ backgroundColor: gilt }} />
          <ul className="flex flex-col gap-1.5 text-left text-[11px]">
            <li className="flex gap-1">
              Pancakes <span className="flex-1 border-b border-dotted" style={{ borderColor: muted }} />
              <span className="whitespace-nowrap">15 min</span>
            </li>
            <li className="flex gap-1">
              Overnight oats <span className="flex-1 border-b border-dotted" style={{ borderColor: muted }} />
              <span className="whitespace-nowrap">5 min</span>
            </li>
          </ul>
        </div>
      </div>,
    ),
  ],
};
