import { made, photo, Swatch, type Board } from "../_components/mood-board";

const ivory = "#F8F3E8";
const gilt = "#B08D4C";
const marble = "#E6E1D8";
const espresso = "#2B2420";
const peony = "#D98A94";
const muted = "#6E6253";
const foil = "linear-gradient(135deg, #8C6A2F, #D9BC7A 35%, #F4E3B5 50%, #C9A45E 65%, #8C6A2F)";

export const parisianMorning: Board = {
  colors: { bg: ivory, ink: espresso, muted },
  titleClassName: "font-cormorant text-5xl italic sm:text-6xl",
  bodyClassName: "font-jost",
  tileClassName: "rounded-none",
  artifacts: [
    photo("carette-croissants", 736, 978, "Croissants and hot chocolate on a marble café table at Carette"),
    made(
      "Script: Bonjour",
      <div className="flex aspect-[4/3] items-center justify-center bg-white p-4" style={{ color: gilt }}>
        <span className="font-pinyon text-5xl">Bonjour</span>
      </div>,
    ),
    made("Color: Ivory", <Swatch name="Ivory" hex={ivory} ink={espresso} outlined />),
    photo("haussmann-facade", 736, 1308, "A cream Haussmann building with wrought-iron balconies"),
    made(
      "Texture: white marble",
      <svg viewBox="0 0 200 240" className="block h-auto w-full">
        <filter id="pm-marble">
          <feTurbulence type="turbulence" baseFrequency="0.006 0.018" numOctaves="5" seed="7" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.53  0 0 0 0 0.5  -2.6 0 0 0 0.9" />
        </filter>
        <rect width="200" height="240" fill="#F4F1EC" />
        <rect width="200" height="240" filter="url(#pm-marble)" />
      </svg>,
    ),
    made("Color: Gilt", <Swatch name="Gilt" hex={gilt} ink={espresso} className="aspect-[4/5]" />),
    photo("je-taime-handwriting", 736, 736, "Handwritten lines of je t'aime in black ink"),
    made(
      "Type specimen: Cormorant Garamond, the display face",
      <div className="flex aspect-[4/5] flex-col justify-between bg-white p-4" style={{ color: espresso }}>
        <span className="font-cormorant text-7xl leading-none italic">Aa</span>
        <span className="text-xs tracking-wide">Cormorant Garamond · display</span>
      </div>,
    ),
    made(
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
    photo("oval-window-eiffel", 570, 855, "The Eiffel Tower seen through an oval window"),
    made("Color: Marble", <Swatch name="Marble" hex={marble} ink={espresso} className="aspect-[4/3]" />),
    made(
      "Gold foil: N° 07",
      <div className="flex aspect-square items-center justify-center" style={{ background: foil }}>
        <span className="font-cormorant text-5xl" style={{ color: espresso }}>
          N° 07
        </span>
      </div>,
    ),
    photo("cite-metro-station", 697, 1024, "The vaulted, lamp-lit Cité metro station"),
    made(
      "Interface: primary button and text link",
      <div className="flex flex-col items-start gap-3 bg-white p-4 text-xs tracking-widest uppercase">
        <span className="px-4 py-2.5 text-white" style={{ backgroundColor: espresso }}>
          Start cooking
        </span>
        <span className="border-b pb-0.5" style={{ borderColor: gilt, color: espresso }}>
          See the recipe
        </span>
      </div>,
    ),
    made("Color: Espresso", <Swatch name="Espresso" hex={espresso} />),
    made(
      "Texture: rattan bistro chair weave",
      <div
        className="aspect-[4/3]"
        style={{
          backgroundColor: "#D9C29B",
          backgroundImage:
            "repeating-linear-gradient(45deg, #A88A5E 0 3px, transparent 3px 9px), repeating-linear-gradient(-45deg, #8E6F45 0 3px, transparent 3px 9px)",
        }}
      />,
    ),
    photo("carette-strawberries-chocolate", 736, 1307, "Strawberries, whipped cream, and hot chocolate at a café table"),
    made(
      "Shape: gilt oval frame",
      <svg viewBox="0 0 160 200" className="block h-auto w-full">
        <rect width="160" height="200" fill="#FFFFFF" />
        <ellipse cx="80" cy="100" rx="56" ry="78" fill="none" stroke={gilt} strokeWidth="1.5" />
        <ellipse cx="80" cy="100" rx="50" ry="72" fill="none" stroke={gilt} strokeWidth="0.75" />
        <text x="80" y="108" textAnchor="middle" fontSize="28" fill={espresso} className="font-pinyon">
          Matin
        </text>
      </svg>,
    ),
    made("Color: Peony", <Swatch name="Peony" hex={peony} ink={espresso} className="aspect-[4/3]" />),
    made(
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
    photo("le-marais-bakery", 736, 983, "Le Marais Bakery's gilt lettering on a café window"),
    made(
      "Interface: tabs with Matin selected",
      <div className="flex gap-5 bg-white px-4 pt-5 pb-4 font-cormorant text-lg" style={{ color: espresso }}>
        <span className="border-b-2 pb-1" style={{ borderColor: gilt }}>
          Matin
        </span>
        <span style={{ color: muted }}>Soir</span>
        <span style={{ color: muted }}>Tout</span>
      </div>,
    ),
    made(
      "Type specimen: Jost, the label face",
      <div className="flex flex-col gap-2 bg-white p-4" style={{ color: espresso }}>
        <span className="text-[11px] tracking-[0.25em] uppercase">Pâtisserie · Café</span>
        <span className="text-xs" style={{ color: muted }}>
          Jost · label
        </span>
      </div>,
    ),
    photo("peonies-tartlet-cafe", 736, 736, "Pink peonies, two coffees, and a raspberry tartlet at a café"),
    made(
      "Ornament: gilt monogram",
      <svg viewBox="0 0 160 120" className="block h-auto w-full">
        <rect width="160" height="120" fill={ivory} />
        <line x1="12" y1="60" x2="48" y2="60" stroke={gilt} />
        <line x1="112" y1="60" x2="148" y2="60" stroke={gilt} />
        <circle cx="80" cy="60" r="28" fill="none" stroke={gilt} />
        <text x="80" y="70" textAnchor="middle" fontSize="28" fill={gilt} className="font-cormorant italic">
          RB
        </text>
      </svg>,
    ),
    photo("painted-ceiling-cafe", 736, 981, "A café with a painted ceiling, brass lamps, and fresh flowers"),
    made(
      "Type specimen: Cormorant Garamond, body",
      <div className="flex flex-col gap-3 bg-white p-4" style={{ color: espresso }}>
        <p className="font-cormorant text-lg leading-snug">
          Blend everything until smooth, then let the batter rest for two minutes.
        </p>
        <span className="text-xs" style={{ color: muted }}>
          Cormorant Garamond · body
        </span>
      </div>,
    ),
    photo("heart-cups-windowsill", 736, 920, "Two coffee cups with red hearts on a stone windowsill"),
  ],
};
