import { made, photo, Swatch, type Board } from "../_components/mood-board";

const white = "#F7F5F0";
const aegean = "#1D4E9E";
const navy = "#14305C";
const sky = "#BCD4EC";
const limestone = "#E7DCC6";
const olive = "#7C8450";
const lemon = "#EFCB5A";

export const greekSummer: Board = {
  colors: { bg: white, ink: navy, muted: "#4A5B78" },
  titleClassName: "font-marcellus text-5xl sm:text-6xl",
  bodyClassName: "font-manrope",
  tileClassName: "rounded-2xl",
  artifacts: [
    photo("santorini-blue-domes", 736, 1104, "Whitewashed steps and blue domes above the sea in Santorini"),
    made(
      "Type specimen: Marcellus, the display face",
      <div className="flex aspect-[4/5] flex-col justify-between bg-white p-4" style={{ color: navy }}>
        <span className="font-marcellus text-7xl leading-none">Aa</span>
        <span className="text-xs">Marcellus · display</span>
      </div>,
    ),
    made("Color: Whitewash", <Swatch name="Whitewash" hex={white} ink={navy} outlined />),
    photo("olives-bread-table", 736, 909, "Green olives, bread, and olive oil on a blue tablecloth"),
    made(
      "Texture: limewashed wall",
      <svg viewBox="0 0 200 240" className="block h-auto w-full">
        <filter id="gs-limewash">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="4" />
          <feColorMatrix values="0 0 0 0 0.62  0 0 0 0 0.58  0 0 0 0 0.52  1.1 0 0 0 -0.42" />
        </filter>
        <rect width="200" height="240" fill={white} />
        <rect width="200" height="240" filter="url(#gs-limewash)" />
        <text x="14" y="224" fontSize="11" fill={navy}>
          Limewash
        </text>
      </svg>,
    ),
    made("Color: Aegean", <Swatch name="Aegean" hex={aegean} className="aspect-[4/5]" />),
    photo("kitchen-arched-window", 736, 1308, "A whitewashed kitchen with an arched window and blue tiles"),
    made(
      "Shape: whitewashed arch with a blue door",
      <svg viewBox="0 0 160 190" className="block h-auto w-full">
        <rect width="160" height="190" fill={sky} />
        <path d="M28 190 V88 A52 52 0 0 1 132 88 V190 Z" fill={white} />
        <path d="M56 190 V104 A24 24 0 0 1 104 104 V190 Z" fill={aegean} />
      </svg>,
    ),
    made(
      "Display numeral: 15 minutes",
      <div className="flex aspect-square flex-col justify-between p-4" style={{ backgroundColor: limestone, color: navy }}>
        <span className="font-marcellus text-6xl leading-none">15′</span>
        <span className="text-xs">Honey garlic salmon</span>
      </div>,
    ),
    photo("blue-tile-motifs", 736, 981, "Hand-drawn blue tiles with an amphora, suns, an olive branch, and a fish"),
    made("Color: Sky wash", <Swatch name="Sky wash" hex={sky} ink={navy} className="aspect-[4/3]" />),
    made(
      "Interface: primary and secondary buttons",
      <div className="flex flex-col items-start gap-2 bg-white p-4 text-sm">
        <span className="rounded-full px-4 py-2 font-semibold text-white" style={{ backgroundColor: aegean }}>
          Start cooking →
        </span>
        <span className="rounded-full border px-4 py-2" style={{ borderColor: aegean, color: aegean }}>
          Save
        </span>
      </div>,
    ),
    photo("bougainvillea-alley", 736, 1104, "A stone alley with bougainvillea and a blue chair, leading to the sea"),
    made(
      "Pattern: Greek key border",
      <svg viewBox="0 0 120 60" className="block h-auto w-full">
        <defs>
          <pattern id="gs-meander" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 21 H21 V3 H6 V15 H15 V9 H11" fill="none" stroke={aegean} strokeWidth="2.5" />
          </pattern>
        </defs>
        <rect width="120" height="60" fill={white} />
        <rect y="18" width="120" height="24" fill="url(#gs-meander)" />
      </svg>,
    ),
    made("Color: Limestone", <Swatch name="Limestone" hex={limestone} ink={navy} />),
    made(
      "Interface: recipe card",
      <div className="flex flex-col gap-3 bg-white p-3" style={{ color: navy }}>
        <div className="aspect-[3/2] rounded-xl" style={{ backgroundColor: sky }} />
        <div>
          <p className="font-marcellus text-lg leading-tight">Honey Garlic Salmon</p>
          <p className="mt-1 text-xs" style={{ color: "#4A5B78" }}>
            Dinner · 15 min · Serves 2
          </p>
        </div>
      </div>,
    ),
    photo("blue-white-bowls", 736, 1104, "Stacked blue and white painted bowls in the sun"),
    made(
      "Texture: blue and white awning stripes",
      <div
        className="aspect-[4/3]"
        style={{ background: `repeating-linear-gradient(90deg, ${aegean} 0 18px, ${white} 18px 36px)` }}
      />,
    ),
    made("Color: Olive", <Swatch name="Olive" hex={olive} className="aspect-[4/3]" />),
    made(
      "Type specimen: Manrope, the body face",
      <div className="flex flex-col gap-3 bg-white p-4" style={{ color: navy }}>
        <p className="text-sm leading-relaxed">Sear skin side down for four minutes. Flip and cook two more.</p>
        <span className="text-xs" style={{ color: "#4A5B78" }}>
          Manrope · body
        </span>
      </div>,
    ),
    photo("hydrangea-terrace-lemons", 736, 1307, "A seaside terrace table with hydrangeas, lemons, and blue china"),
    made(
      "Texture: sea ripples",
      <svg viewBox="0 0 160 160" className="block h-auto w-full">
        <defs>
          <pattern id="gs-ripple" width="40" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 Q10 1 20 7 T40 7" fill="none" stroke={white} strokeOpacity="0.7" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="160" height="160" fill={aegean} />
        <rect width="160" height="160" fill="url(#gs-ripple)" />
      </svg>,
    ),
    made("Color: Lemon", <Swatch name="Lemon" hex={lemon} ink={navy} className="aspect-[4/3]" />),
    made(
      "Interface: filter chips with Dinner selected",
      <div className="flex flex-wrap gap-1.5 bg-white p-4 text-xs" style={{ color: navy }}>
        <span className="rounded-full border px-3 py-1.5" style={{ borderColor: limestone }}>
          All
        </span>
        <span className="rounded-full px-3 py-1.5 text-white" style={{ backgroundColor: navy }}>
          Dinner
        </span>
        <span className="rounded-full border px-3 py-1.5" style={{ borderColor: limestone }}>
          Breakfast
        </span>
      </div>,
    ),
    photo("marble-angel-statue", 736, 920, "A sun-bleached marble angel between white columns"),
    made(
      "Headline: Kaliméra, good morning",
      <div className="flex aspect-[4/3] flex-col justify-center p-4" style={{ backgroundColor: sky, color: navy }}>
        <span className="font-marcellus text-3xl">Kaliméra</span>
        <span className="text-xs">good morning</span>
      </div>,
    ),
    photo("cliffs-greek-flag", 736, 981, "White cliffs, turquoise water, and a Greek flag on a boat"),
    photo("blue-line-drawings", 736, 1030, "Blue line drawings of temples, columns, and olive branches on cream"),
  ],
};
