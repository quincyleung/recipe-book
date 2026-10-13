import { photo, source, tile, type Board } from "../_components/mood-board";

const white = "#F7F5F0";
const aegean = "#1D4E9E";
const navy = "#14305C";
const muted = "#4A5B78";
const sky = "#BCD4EC";
const limestone = "#E7DCC6";
const lemon = "#EFCB5A";

export const greekSummer: Board = {
  colors: { bg: white, ink: navy, muted, accent: aegean, line: limestone },
  titleClassName: "font-marcellus text-5xl sm:text-7xl",
  headingClassName: "font-marcellus text-3xl",
  bodyClassName: "font-manrope",
  proseClassName: "font-manrope",
  tileClassName: "rounded-2xl",
  evokes: "A long lunch on a terrace above the sea. Everything is white and blue, a little faded by the sun.",
  suits: "Simple, fresh weeknight cooking: fish, lemon, and olive oil, with nothing fussy on the screen.",
  sources: [
    source(
      photo("santorini-blue-domes", 736, 1104, "Whitewashed steps and blue domes above the sea in Santorini"),
      "Blue domes over the sea",
      "Take the two-color rule: whitewash everywhere, with Aegean blue saved for the few things that matter.",
    ),
    source(
      photo("kitchen-arched-window", 736, 1308, "A whitewashed kitchen with an arched window and blue tiles"),
      "A whitewashed kitchen",
      "Take the arch, the soft rounded corners, and the calm of a plain white wall.",
    ),
    source(
      photo("hydrangea-terrace-lemons", 736, 1307, "A seaside terrace table with hydrangeas, lemons, and blue china"),
      "A terrace above the sea",
      "Take the terrace table: blue china, one pop of lemon, and plenty of air around everything.",
    ),
    source(
      photo("blue-tile-motifs", 736, 981, "Hand-drawn blue tiles with an amphora, suns, an olive branch, and a fish"),
      "Hand-painted tiles",
      "Take the loose, hand-drawn blue line for icons and borders.",
    ),
  ],
  references: [
    photo("oia-whitewashed-terrace", 960, 640, "Whitewashed terraces and a small pool above the sea in Oia", {
      title: "Santorini, Oia 34",
      author: "LBM1948",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Santorini,_Oia_34.jpg",
    }),
    photo("olives-bread-table", 736, 909, "Green olives, bread, and olive oil on a blue tablecloth"),
    photo("bougainvillea-alley", 736, 1104, "A stone alley with bougainvillea and a blue chair, leading to the sea"),
    photo("blue-white-bowls", 736, 1104, "Stacked blue and white painted bowls in the sun"),
    photo("white-wall-above-sea", 960, 649, "A curved white wall and red succulents above the sea", {
      title: "Santorini, Oia 36",
      author: "LBM1948",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Santorini,_Oia_36.jpg",
    }),
    photo("marble-angel-statue", 736, 920, "A sun-bleached marble angel between white columns"),
    photo("blue-fishing-boat", 960, 755, "A blue wooden fishing boat moored in a harbour", {
      title: "Blue fishing boat harbour Eretria Euboea Greece",
      author: "Jebulon",
      license: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Blue_fishing_boat_harbour_Eretria_Euboea_Greece.jpg",
    }),
    photo("cliffs-greek-flag", 736, 981, "White cliffs, turquoise water, and a Greek flag on a boat"),
    photo("cliffside-terrace-umbrella", 960, 636, "A terrace with a white umbrella on a cliff above deep blue water", {
      title: "07-17-2012 - Oia - Santorini - Greece - 02",
      author: "Norbert Nagel",
      license: "CC BY-SA 3.0",
      url: "https://commons.wikimedia.org/wiki/File:07-17-2012_-_Oia_-_Santorini_-_Greece_-_02.jpg",
    }),
    photo("blue-line-drawings", 736, 1030, "Blue line drawings of temples, columns, and olive branches on cream"),
  ],
  palette: [
    { name: "Whitewash", hex: white, ink: navy, outlined: true },
    { name: "Aegean", hex: aegean },
    { name: "Sky wash", hex: sky, ink: navy },
    { name: "Limestone", hex: limestone, ink: navy },
    { name: "Lemon", hex: lemon, ink: navy },
  ],
  type: [
    tile(
      "Type specimen: Marcellus, the display face",
      <div className="flex aspect-square flex-col justify-between bg-white p-4" style={{ color: navy }}>
        <span className="font-marcellus text-7xl leading-none">Aa</span>
        <span className="text-xs">Marcellus · display</span>
      </div>,
    ),
    tile(
      "Headline: Kaliméra, good morning",
      <div className="flex aspect-square flex-col justify-end gap-1 p-4" style={{ backgroundColor: sky, color: navy }}>
        <span className="font-marcellus text-3xl">Kaliméra</span>
        <span className="text-xs">good morning</span>
      </div>,
    ),
    tile(
      "Type specimen: Manrope, the body face",
      <div className="flex aspect-square flex-col justify-between bg-white p-4" style={{ color: navy }}>
        <p className="text-sm leading-relaxed">Sear skin side down for four minutes. Flip and cook two more.</p>
        <span className="text-xs" style={{ color: muted }}>
          Manrope · body
        </span>
      </div>,
    ),
  ],
  textureHeading: "Texture and shape",
  textures: [
    tile(
      "Texture: limewashed wall",
      <svg viewBox="0 0 200 200" className="block h-auto w-full">
        <filter id="gs-limewash">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="4" />
          <feColorMatrix values="0 0 0 0 0.62  0 0 0 0 0.58  0 0 0 0 0.52  1.1 0 0 0 -0.42" />
        </filter>
        <rect width="200" height="200" fill="#FFFFFF" />
        <rect width="200" height="200" filter="url(#gs-limewash)" />
      </svg>,
    ),
    tile(
      "Pattern: Greek key border",
      <svg viewBox="0 0 120 120" className="block h-auto w-full">
        <defs>
          <pattern id="gs-meander" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 21 H21 V3 H6 V15 H15 V9 H11" fill="none" stroke={aegean} strokeWidth="2.5" />
          </pattern>
        </defs>
        <rect width="120" height="120" fill="#FFFFFF" />
        <rect y="48" width="120" height="24" fill="url(#gs-meander)" />
      </svg>,
    ),
    tile(
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
    tile(
      "Shape: whitewashed arch with a blue door",
      <svg viewBox="0 0 160 160" className="block h-auto w-full">
        <rect width="160" height="160" fill={sky} />
        <path d="M32 160 V76 A48 48 0 0 1 128 76 V160 Z" fill={white} />
        <path d="M58 160 V92 A22 22 0 0 1 102 92 V160 Z" fill={aegean} />
      </svg>,
    ),
  ],
  ui: [
    tile(
      "Interface: primary and secondary buttons",
      <div className="flex aspect-square flex-col items-start justify-center gap-2 bg-white p-4 text-sm">
        <span className="rounded-full px-4 py-2 font-semibold text-white" style={{ backgroundColor: aegean }}>
          Start cooking →
        </span>
        <span className="rounded-full border px-4 py-2" style={{ borderColor: aegean, color: aegean }}>
          Save
        </span>
      </div>,
    ),
    tile(
      "Interface: filter chips with Dinner selected",
      <div className="flex aspect-square flex-wrap content-center gap-1.5 bg-white p-4 text-xs" style={{ color: navy }}>
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
    tile(
      "Interface: recipe card",
      <div className="flex flex-col gap-3 bg-white p-3" style={{ color: navy }}>
        <div className="aspect-[3/2] rounded-xl" style={{ backgroundColor: sky }} />
        <div>
          <p className="font-marcellus text-lg leading-tight">Honey Garlic Salmon</p>
          <p className="mt-1 text-xs" style={{ color: muted }}>
            Dinner · 20 min · Serves 2
          </p>
        </div>
      </div>,
    ),
  ],
};
