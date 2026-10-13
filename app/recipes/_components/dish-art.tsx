import type { ReactNode } from "react";
import type { Recipe } from "@/content/recipes";

// Flat, top-down drawings of each dish in the Old Hong Kong style: bold ink
// outlines like the shop signs, on a mosaic-tile tablecloth. The tile color
// tells the meal: jade for dinner, egg-tart yellow for breakfast.

const ink = "#1E1B16";
const plateWhite = "#FFFDF5";
const tile = { dinner: "#2E6B54", breakfast: "#F2C14E" };
const scallion = "#5E9440";

function Scallions({ at }: { at: [number, number][] }) {
  return (
    <g fill="none" stroke={scallion} strokeWidth="2.5">
      {at.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
      ))}
    </g>
  );
}

const dishes: Record<string, ReactNode> = {
  "nobu-miso-cod": (
    <g transform="rotate(-8 120 90)">
      <rect x="76" y="62" width="88" height="52" rx="16" fill="#F7EBD3" stroke={ink} strokeWidth="3" />
      <g fill="#C47A2C" opacity="0.9">
        <ellipse cx="98" cy="78" rx="14" ry="7" />
        <ellipse cx="134" cy="82" rx="17" ry="8" />
        <ellipse cx="114" cy="99" rx="12" ry="5" />
        <ellipse cx="148" cy="101" rx="7" ry="4" />
      </g>
      <line x1="150" y1="122" x2="172" y2="134" stroke="#E58AA0" strokeWidth="6" strokeLinecap="round" />
      <line x1="172" y1="134" x2="184" y2="140" stroke={scallion} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  "beef-enoki-rolls": (
    <g>
      {[60, 82, 104].map((y, i) => (
        <g key={y} transform={`translate(${i * 6} 0)`}>
          <g stroke={ink} strokeWidth="1.5" fill="#F5EEDC">
            {[-6, -2, 2, 6].map((dy) => (
              <g key={dy}>
                <line x1="90" y1={y + 11 + dy} x2="74" y2={y + 11 + dy * 1.6} />
                <circle cx="72" cy={y + 11 + dy * 1.6} r="2.5" />
              </g>
            ))}
          </g>
          <rect x="88" y={y} width="72" height="22" rx="11" fill="#8A4B2A" stroke={ink} strokeWidth="3" />
          <line x1="100" y1={y + 7} x2="148" y2={y + 7} stroke="#B9763F" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <Scallions at={[[126, 54], [150, 132], [104, 134], [168, 92]]} />
    </g>
  ),
  "honey-garlic-salmon": (
    <g>
      <path
        d="M78 72 Q120 52 162 66 Q172 92 156 112 Q118 124 82 110 Q68 92 78 72Z"
        fill="#F08A5D"
        stroke={ink}
        strokeWidth="3"
      />
      <g fill="none" stroke="#FFE1CF" strokeWidth="3" strokeLinecap="round">
        <path d="M96 68 Q90 90 98 112" />
        <path d="M116 62 Q110 90 117 117" />
        <path d="M137 62 Q131 90 138 114" />
      </g>
      <g fill="#B8641E">
        <circle cx="106" cy="86" r="2.5" />
        <circle cx="126" cy="96" r="2.5" />
        <circle cx="146" cy="84" r="2.5" />
      </g>
      <path d="M146 120 A17 17 0 0 0 180 120 Z" fill="#F5D547" stroke={ink} strokeWidth="2.5" />
      <g stroke={ink} strokeWidth="1.5">
        <line x1="163" y1="120" x2="152" y2="130" />
        <line x1="163" y1="120" x2="163" y2="136" />
        <line x1="163" y1="120" x2="174" y2="130" />
      </g>
    </g>
  ),
  "cantonese-shrimp-and-egg": (
    <g>
      <path
        d="M76 88 C74 64 102 56 120 62 C140 54 168 66 164 88 C168 112 142 122 120 116 C98 124 72 110 76 88Z"
        fill="#F6D46B"
        stroke={ink}
        strokeWidth="3"
      />
      <g fill="none" stroke="#FBE9AE" strokeWidth="5" strokeLinecap="round">
        <path d="M90 80 Q106 70 122 80" />
        <path d="M116 100 Q134 90 150 100" />
      </g>
      {[
        [96, 92],
        [128, 72],
        [136, 102],
      ].map(([x, y]) => (
        <g key={x} fill="none" strokeLinecap="round">
          <path d={`M${x} ${y} a10 10 0 1 1 15 7`} stroke={ink} strokeWidth="12" />
          <path d={`M${x} ${y} a10 10 0 1 1 15 7`} stroke="#F2896A" strokeWidth="7" />
        </g>
      ))}
      <Scallions at={[[112, 108], [150, 82], [86, 74]]} />
    </g>
  ),
  "ground-beef-bell-peppers": (
    <g>
      <circle cx="120" cy="90" r="50" fill="#FBF7EC" stroke="#E6DCC4" strokeWidth="2" />
      <g fill="#6B3A23">
        {[
          [104, 76], [116, 70], [130, 74], [142, 82], [98, 90], [110, 86], [124, 84], [138, 94],
          [104, 104], [118, 98], [132, 106], [146, 98], [112, 112], [126, 116], [92, 100], [120, 92],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5.5" />
        ))}
      </g>
      <g stroke={ink} strokeWidth="1.5">
        {[
          [108, 80, "#D9452F", 12], [134, 90, "#4E8A3A", -18], [100, 98, "#F2C14E", 24], [124, 108, "#D9452F", -6],
          [144, 108, "#F2C14E", 15], [122, 78, "#4E8A3A", 30], [92, 84, "#4E8A3A", -10], [140, 72, "#D9452F", 20],
        ].map(([x, y, fill, angle]) => (
          <rect
            key={`${x}-${y}`}
            x={Number(x) - 5}
            y={Number(y) - 5}
            width="10"
            height="10"
            rx="1.5"
            fill={String(fill)}
            transform={`rotate(${angle} ${x} ${y})`}
          />
        ))}
      </g>
    </g>
  ),
  "banana-oat-pancakes": (
    <g>
      <circle cx="128" cy="98" r="46" fill="#C98E46" stroke={ink} strokeWidth="3" />
      <circle cx="116" cy="86" r="46" fill="#D9A35B" stroke={ink} strokeWidth="3" />
      <circle cx="116" cy="86" r="38" fill="none" stroke="#C98E46" strokeWidth="2.5" />
      <path d="M88 72 Q100 64 108 76 T128 78 T146 92" fill="none" stroke="#7A4A22" strokeWidth="3.5" strokeLinecap="round" />
      {[
        [104, 92],
        [124, 98],
        [116, 74],
        [134, 80],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="8.5" fill="#F6EBC2" stroke={ink} strokeWidth="2" />
          <circle cx={x} cy={y} r="1.6" fill="#B89A5A" />
        </g>
      ))}
    </g>
  ),
  "strawberry-overnight-oats": (
    <g>
      <circle cx="120" cy="90" r="58" fill="#E3EEF1" stroke={ink} strokeWidth="3" />
      <circle cx="120" cy="90" r="49" fill="#F1E6CF" stroke="#C9D8DC" strokeWidth="3" />
      <g fill="#D8C49E">
        {[[96, 70], [140, 72], [104, 112], [146, 104], [120, 64], [88, 96], [134, 120]].map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="4" ry="2" transform={`rotate(${x} ${x} ${y})`} />
        ))}
      </g>
      {[
        [108, 86, -20],
        [132, 92, 15],
        [118, 106, 160],
      ].map(([x, y, angle]) => (
        <g key={x} transform={`rotate(${angle} ${x} ${y})`}>
          <path
            d={`M${x} ${y + 12} C${x - 14} ${y + 2} ${x - 12} ${y - 12} ${x} ${y - 7} C${x + 12} ${y - 12} ${x + 14} ${y + 2} ${x} ${y + 12}Z`}
            fill="#E0424A"
            stroke={ink}
            strokeWidth="2"
          />
          <path d={`M${x} ${y + 6} C${x - 6} ${y} ${x - 5} ${y - 6} ${x} ${y - 3} C${x + 5} ${y - 6} ${x + 6} ${y} ${x} ${y + 6}Z`} fill="#F7A7AC" />
          <circle cx={x - 6} cy={y - 2} r="1" fill="#FBE3A0" />
          <circle cx={x + 6} cy={y - 2} r="1" fill="#FBE3A0" />
          <circle cx={x} cy={y + 7} r="1" fill="#FBE3A0" />
        </g>
      ))}
    </g>
  ),
};

/** A drawing of the dish. `fill` crops it to cover its container instead of keeping 4:3. */
export function DishArt({ recipe, fill = false }: { recipe: Recipe; fill?: boolean }) {
  const id = `tile-${recipe.slug}`;
  const isJar = recipe.slug === "strawberry-overnight-oats";
  return (
    <svg
      viewBox="0 0 240 180"
      preserveAspectRatio={fill ? "xMidYMid slice" : undefined}
      role="img"
      aria-label={`Drawing of ${recipe.name}`}
      className={`block w-full ${fill ? "h-full" : "h-auto"}`}
    >
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="#F3ECDA" strokeOpacity="0.35" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="240" height="180" fill={tile[recipe.meal]} />
      <rect width="240" height="180" fill={`url(#${id})`} />
      {!isJar && (
        <>
          <circle cx="120" cy="90" r="72" fill={plateWhite} stroke={ink} strokeWidth="3" />
          <circle cx="120" cy="90" r="60" fill="none" stroke="#E6DCC4" strokeWidth="2" />
        </>
      )}
      {dishes[recipe.slug]}
    </svg>
  );
}
