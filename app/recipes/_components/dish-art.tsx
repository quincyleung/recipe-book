import { useId, type ReactNode } from "react";
import type { Recipe } from "@/content/recipes";

// Top-down drawings of each dish in the Old Hong Kong style: cha chaan teng
// plates with a colored rim band, bold ink outlines like the shop signs, a hard
// offset shadow, and a hand-laid mosaic tablecloth. Just the dish, centered. The tile color tells the
// meal: jade for dinner, egg-tart yellow for breakfast.

const ink = "#1E1B16";
const scallionGreen = "#6FA544";

/** Seeded random numbers, so server and browser draw the same scatter. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Points scattered in a ring around (cx, cy). */
function scatter(seed: number, count: number, cx: number, cy: number, min: number, max: number) {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => {
    const angle = rand() * Math.PI * 2;
    const dist = min + Math.sqrt(rand()) * (max - min);
    return { x: r1(cx + Math.cos(angle) * dist), y: r1(cy + Math.sin(angle) * dist), turn: Math.round(rand() * 180), k: rand() };
  });
}

/** A stick that tapers from w1 at (x1, y1) to w2 at (x2, y2). */
function taper(x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  const p = (x: number, y: number, w: number, s: number) => `${r1(x + nx * w * s)} ${r1(y + ny * w * s)}`;
  // Flat at the wide end, rounded at the narrow tip.
  return `M${p(x1, y1, w1 / 2, 1)} L${p(x2, y2, w2 / 2, 1)} A${w2 / 2} ${w2 / 2} 0 0 1 ${p(x2, y2, w2 / 2, -1)} L${p(x1, y1, w1 / 2, -1)}Z`;
}

/* Shared pieces */

function Plate({ u, band, cx = 112, cy = 90 }: { u: (n: string) => string; band: string; cx?: number; cy?: number }) {
  return (
    <g>
      <circle cx={cx + 5} cy={cy + 6} r="71" fill={ink} opacity="0.32" />
      <circle cx={cx} cy={cy} r="71" fill={`url(#${u("rim")})`} stroke={ink} strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r="64" fill="none" stroke={band} strokeWidth="3" />
      <circle cx={cx} cy={cy} r="55" fill={`url(#${u("well")})`} stroke="#E3D8C3" strokeWidth="1.2" />
    </g>
  );
}

function Scallions({ at }: { at: [number, number][] }) {
  return (
    <g>
      {at.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3.6" fill={scallionGreen} stroke="#3F6E25" strokeWidth="0.9" />
          <circle cx={x} cy={y} r="1.6" fill="#E3F2CF" />
        </g>
      ))}
    </g>
  );
}

function Sesame({ seed, count, cx, cy, spread }: { seed: number; count: number; cx: number; cy: number; spread: number }) {
  return (
    <g fill="#FBF3DC" stroke="#B89A62" strokeWidth="0.5">
      {scatter(seed, count, cx, cy, 0, spread).map((s, i) => (
        <ellipse key={i} cx={s.x} cy={s.y} rx="1.6" ry="0.9" transform={`rotate(${s.turn} ${s.x} ${s.y})`} />
      ))}
    </g>
  );
}

/** A curled shrimp; the dashed stripe draws its shell segments. */
function Shrimp({ x, y, turn, scale = 1 }: { x: number; y: number; turn: number; scale?: number }) {
  const body = "M0 -10 A10 10 0 1 1 -8.7 5";
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${scale})`} strokeLinecap="round" fill="none">
      <path d="M-7.5 3.6 L-15.5 0.6 L-13.6 6.4 L-15.8 11.2 L-6.6 8 Z" fill="#E4573A" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
      <path d={body} stroke={ink} strokeWidth="11" />
      <path d={body} stroke="#F2896A" strokeWidth="8" />
      <path d={body} stroke="#FFD2C1" strokeWidth="8" strokeDasharray="1.3 3.4" strokeLinecap="butt" />
      <path d="M1.5 -6.2 A6.3 6.3 0 1 1 -5 3" stroke="#FFC4AE" strokeWidth="1.6" />
    </g>
  );
}

function BananaSlice({ x, y, u }: { x: number; y: number; u: (n: string) => string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={`url(#${u("banana")})`} stroke={ink} strokeWidth="1.5" />
      <circle cx={x} cy={y} r="6.6" fill="none" stroke="#E9D7A0" strokeWidth="0.8" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={r1(x + Math.cos((a * Math.PI) / 180) * 3)}
          cy={r1(y + Math.sin((a * Math.PI) / 180) * 3)}
          r="0.75"
          fill="#9C8248"
        />
      ))}
    </g>
  );
}

function StrawberrySlice({ x, y, turn, u }: { x: number; y: number; turn: number; u: (n: string) => string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      <path d="M0 13 C-15 3 -13 -12 -4 -11 C-1 -10.5 0 -9 0 -8 C0 -9 1 -10.5 4 -11 C13 -12 15 3 0 13Z" fill={`url(#${u("berry")})`} stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M0 8 C-6 2 -5 -5 -1.5 -5.5 C-0.5 -5.6 0 -5 0 -4 C0 -5 0.5 -5.6 1.5 -5.5 C5 -5 6 2 0 8Z" fill="#FFE3E2" opacity="0.85" />
      <g fill="#FFF0B3">
        {[
          [-9, -4],
          [9, -4],
          [-10, 2],
          [10, 2],
          [-6, 7],
          [6, 7],
        ].map(([sx, sy]) => (
          <ellipse key={`${sx}${sy}`} cx={sx} cy={sy} rx="0.8" ry="1.3" />
        ))}
      </g>
    </g>
  );
}

/* Dishes */

type Draw = (u: (n: string) => string) => ReactNode;

const dishes: Record<string, { plate: boolean; draw: Draw; gradients?: Draw }> = {
  "nobu-miso-cod": {
    plate: true,
    gradients: (u) => (
      <>
        <radialGradient id={u("cod")} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#F2C57E" />
          <stop offset="0.4" stopColor="#D88A3A" />
          <stop offset="0.75" stopColor="#A4501C" />
          <stop offset="1" stopColor="#6A2A0C" />
        </radialGradient>
        <linearGradient id={u("leaf")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6E9E4A" />
          <stop offset="1" stopColor="#3F6B2C" />
        </linearGradient>
      </>
    ),
    draw: (u) => (
      <g strokeLinejoin="round">
        <path d="M52 112 C70 66 132 46 176 66 C160 106 100 130 52 112Z" fill={`url(#${u("leaf")})`} stroke={ink} strokeWidth="2" />
        <path d="M56 110 C90 92 130 76 172 68" fill="none" stroke="#A9C98A" strokeWidth="1.4" strokeLinecap="round" />
        <g fill="none" stroke="#A9C98A" strokeWidth="1" strokeLinecap="round" opacity="0.8">
          <path d="M80 99 C80 108 84 114 90 116" />
          <path d="M104 88 C108 98 114 106 122 108" />
          <path d="M130 79 C136 88 142 94 150 96" />
          <path d="M92 94 C88 84 88 76 92 70" />
          <path d="M118 84 C116 74 118 66 124 60" />
        </g>
        <path
          d="M72 92 C70 76 88 66 112 66 C136 64 156 68 162 80 C168 94 158 108 138 112 C116 116 92 116 80 108 C74 104 72 98 72 92Z"
          fill="#F6EEDD"
          stroke={ink}
          strokeWidth="2.3"
        />
        <path
          d="M74 88 C72 74 90 66 112 66 C136 64 155 68 160 79 C164 90 156 100 138 104 C116 108 92 108 82 102 C77 98 75 94 74 88Z"
          fill={`url(#${u("cod")})`}
        />
        <g fill="#4A1E08" opacity="0.55">
          <path d="M86 76 C92 71 101 72 104 77 C99 81 90 81 86 76Z" />
          <path d="M140 72 C146 69 154 72 155 78 C149 80 143 78 140 72Z" />
          <path d="M120 96 C126 93 133 96 133 100 C128 102 122 101 120 96Z" />
          <path d="M80 94 C83 90 89 91 90 95 C86 98 82 98 80 94Z" />
        </g>
        <g fill="none" stroke="#FFF2D6" strokeWidth="1.3" strokeLinecap="round" opacity="0.65">
          <path d="M92 70 C98 78 100 90 96 104" />
          <path d="M110 68 C118 78 120 92 114 106" />
          <path d="M128 67 C136 78 138 92 132 104" />
          <path d="M146 70 C152 80 152 90 148 100" />
        </g>
        <path d="M90 72 C106 66 130 66 146 70 C130 70 108 72 94 77Z" fill="#FFFFFF" opacity="0.5" />
        <path d={taper(124, 128, 158, 120, 3.2, 4.6)} fill="#E77D98" stroke={ink} strokeWidth="1.2" />
        <path d={taper(152, 121.4, 158, 120, 4.4, 4.6)} fill="#FBEFF2" />
        <path d={taper(124, 128, 112, 131, 3.2, 2)} fill={scallionGreen} stroke={ink} strokeWidth="1" />
      </g>
    ),
  },
  "beef-enoki-rolls": {
    plate: true,
    gradients: (u) => (
      <linearGradient id={u("beef")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4C2313" />
        <stop offset="0.42" stopColor="#8E4D29" />
        <stop offset="0.55" stopColor="#A6623A" />
        <stop offset="1" stopColor="#552815" />
      </linearGradient>
    ),
    draw: (u) => (
      <g strokeLinejoin="round">
        <path d="M66 96 C70 74 120 64 150 76 C166 84 164 112 146 120 C118 130 76 124 66 96Z" fill="#6A3216" opacity="0.38" />
        {[
          [78, 56],
          [82, 80],
          [86, 104],
        ].map(([x, y], i) => (
          <g key={y} transform={`translate(${x} ${y}) rotate(-8)`}>
            <g strokeLinecap="round">
              {[-7.5, -5, -2.5, 0, 2.5, 5, 7.5].map((d, k) => (
                <g key={d}>
                  <line x1="6" y1={12 + d * 0.4} x2={-14 - (k % 3) * 2} y2={12 + d * 1.5} stroke={ink} strokeWidth="2.6" />
                  <line x1="6" y1={12 + d * 0.4} x2={-14 - (k % 3) * 2} y2={12 + d * 1.5} stroke="#F7EFDC" strokeWidth="1.3" />
                  <ellipse cx={-15.5 - (k % 3) * 2} cy={12 + d * 1.55} rx="2.3" ry="1.7" fill="#E8D5A8" stroke={ink} strokeWidth="0.8" />
                </g>
              ))}
            </g>
            <rect x="0" y="0" width="76" height="24" rx="12" fill={`url(#${u("beef")})`} stroke={ink} strokeWidth="2.2" />
            <g stroke="#2F150A" strokeWidth="2.4" strokeLinecap="round" opacity="0.5">
              <line x1={22 + i * 4} y1="5" x2={18 + i * 4} y2="19" />
              <line x1={42 + i * 3} y1="5" x2={38 + i * 3} y2="19" />
              <line x1={60 - i * 2} y1="6" x2={57 - i * 2} y2="18" />
            </g>
            <path d="M12 7 C32 4 52 4 68 7" fill="none" stroke="#F4B784" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          </g>
        ))}
        <Scallions at={[[124, 48], [158, 96], [112, 132], [146, 130], [100, 76]]} />
        <Sesame seed={7} count={12} cx={128} cy={92} spread={34} />
      </g>
    ),
  },
  "honey-garlic-salmon": {
    plate: true,
    gradients: (u) => (
      <radialGradient id={u("salmon")} cx="0.45" cy="0.4" r="0.72">
        <stop offset="0" stopColor="#FFB892" />
        <stop offset="0.6" stopColor="#F48A5A" />
        <stop offset="1" stopColor="#D35F34" />
      </radialGradient>
    ),
    draw: (u) => (
      <g strokeLinejoin="round">
        <path d="M58 104 C70 124 130 132 160 116 C172 108 170 96 160 100 C130 112 90 112 66 100 C58 96 54 98 58 104Z" fill="#C77A28" opacity="0.55" />
        <path
          d="M64 84 C64 70 84 62 108 62 C134 60 158 66 164 80 C170 96 162 110 148 116 C124 124 92 122 76 114 C66 108 63 96 64 84Z"
          fill={`url(#${u("salmon")})`}
          stroke={ink}
          strokeWidth="2.3"
        />
        <g fill="none" stroke="#FFE7DA" strokeWidth="2.2" strokeLinecap="round" opacity="0.92">
          {[80, 96, 112, 128, 144].map((x) => (
            <path key={x} d={`M${x} ${x === 80 || x === 144 ? 72 : 66} C${x - 6} ${84} ${x - 4} ${100} ${x + 4} ${x === 80 || x === 144 ? 110 : 116}`} />
          ))}
        </g>
        <path d="M84 68 C102 62 130 62 148 68 C130 68 104 70 88 75Z" fill="#FFFFFF" opacity="0.4" />
        <g fill="#F8EACB" stroke="#B48A4E" strokeWidth="0.6">
          {scatter(11, 9, 114, 90, 4, 30).map((s, i) => (
            <path key={i} d={`M${s.x} ${s.y} l2.4 -1.1 l1.2 2.2 l-2.2 1.3 z`} transform={`rotate(${s.turn} ${s.x} ${s.y})`} />
          ))}
        </g>
        <g transform="translate(160 124) rotate(-24)">
          <path d="M-18 0 A18 18 0 0 0 18 0 Z" fill="#F2C230" stroke={ink} strokeWidth="1.8" />
          <path d="M-15 0 A15 15 0 0 0 15 0 Z" fill="#FFF5D3" />
          <path d="M-13 0 A13 13 0 0 0 13 0 Z" fill="#F9DB63" />
          <g stroke="#FFF2BF" strokeWidth="1.2" strokeLinecap="round">
            {[30, 60, 90, 120, 150].map((a) => (
              <line key={a} x1="0" y1="0" x2={r1(Math.cos((a * Math.PI) / 180) * 12)} y2={r1(Math.sin((a * Math.PI) / 180) * 12)} />
            ))}
          </g>
        </g>
        <Scallions at={[[92, 120], [140, 58]]} />
      </g>
    ),
  },
  "cantonese-shrimp-and-egg": {
    plate: true,
    gradients: (u) => (
      <radialGradient id={u("egg")} cx="0.45" cy="0.42" r="0.7">
        <stop offset="0" stopColor="#FFF4C8" />
        <stop offset="0.65" stopColor="#F8D872" />
        <stop offset="1" stopColor="#EBB43A" />
      </radialGradient>
    ),
    draw: (u) => (
      <g strokeLinejoin="round">
        <path
          d="M58 92 C54 70 80 56 104 60 C124 50 154 56 164 74 C176 92 166 116 146 122 C124 130 96 128 78 120 C62 112 60 102 58 92Z"
          fill={`url(#${u("egg")})`}
          stroke={ink}
          strokeWidth="2.3"
        />
        <g fill="#FFF8DD" opacity="0.95">
          <path d="M74 84 C86 72 104 72 114 83 C104 79 90 81 80 90Z" />
          <path d="M116 100 C128 90 146 92 153 103 C143 98 130 100 121 107Z" />
          <path d="M88 108 C98 101 112 103 118 111 C108 108 98 110 91 115Z" />
          <path d="M120 66 C132 62 146 66 150 74 C141 70 130 70 123 72Z" />
        </g>
        <g fill="none" stroke="#DCA12C" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
          <path d="M80 92 C90 96 102 96 110 92" />
          <path d="M124 84 C134 88 146 86 154 82" />
          <path d="M100 118 C110 122 124 122 134 116" />
        </g>
        <Shrimp x={92} y={84} turn={20} />
        <Shrimp x={130} y={74} turn={-40} scale={0.92} />
        <Shrimp x={142} y={104} turn={70} scale={0.95} />
        <Shrimp x={104} y={108} turn={160} scale={0.9} />
        <Scallions at={[[118, 90], [78, 104], [156, 88], [122, 120], [110, 64]]} />
        <g fill="#5C5142" opacity="0.55">
          {scatter(23, 14, 112, 92, 6, 44).map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r="0.7" />
          ))}
        </g>
      </g>
    ),
  },
  "ground-beef-bell-peppers": {
    plate: true,
    draw: () => (
      <g strokeLinejoin="round">
        <circle cx="112" cy="90" r="51" fill="#FCFAF3" stroke="#E5DCC8" strokeWidth="1" />
        <g fill="#FFFFFF" stroke="#E2D7C0" strokeWidth="0.6">
          {scatter(3, 110, 112, 90, 30, 49).map((s, i) => (
            <ellipse key={i} cx={s.x} cy={s.y} rx="2.7" ry="1.15" transform={`rotate(${s.turn} ${s.x} ${s.y})`} />
          ))}
        </g>
        <circle cx="112" cy="90" r="33" fill="#5A2C14" opacity="0.28" />
        <g stroke="#3B1C0D" strokeWidth="0.8">
          {scatter(5, 46, 112, 90, 0, 31).map((s, i) => (
            <ellipse
              key={i}
              cx={s.x}
              cy={s.y}
              rx={r1(2.8 + s.k * 1.8)}
              ry={r1(2.2 + s.k * 1.2)}
              fill={s.k > 0.7 ? "#8A4C2A" : "#6B3720"}
              transform={`rotate(${s.turn} ${s.x} ${s.y})`}
            />
          ))}
        </g>
        <g fill="#F1E6CB" stroke="#CDBB93" strokeWidth="0.7" opacity="0.92">
          {scatter(9, 6, 112, 90, 8, 28).map((s, i) => (
            <path key={i} d={`M${s.x - 6} ${s.y} q6 -6 12 0 q-6 -3 -12 0z`} transform={`rotate(${s.turn} ${s.x} ${s.y})`} />
          ))}
        </g>
        {scatter(13, 18, 112, 90, 3, 32).map((s, i) => {
          const color = ["#D93A2B", "#3F8A34", "#F2BF2E"][i % 3];
          return (
            <g key={i} transform={`rotate(${s.turn} ${s.x} ${s.y})`}>
              <rect x={s.x - 3.8} y={s.y - 3.8} width="7.6" height="7.6" rx="2" fill={color} stroke={ink} strokeWidth="1" />
              <rect x={s.x - 2.6} y={s.y - 2.8} width="3.2" height="1.4" rx="0.7" fill="#FFFFFF" opacity="0.55" />
            </g>
          );
        })}
        <Scallions at={[[96, 72], [130, 108], [124, 70]]} />
      </g>
    ),
  },
  "banana-oat-pancakes": {
    plate: true,
    gradients: (u) => (
      <radialGradient id={u("cake")} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#EFC47E" />
        <stop offset="0.62" stopColor="#DC9F51" />
        <stop offset="0.9" stopColor="#BF7C34" />
        <stop offset="1" stopColor="#E2AE66" />
      </radialGradient>
    ),
    draw: (u) => (
      <g strokeLinejoin="round">
        <circle cx="117" cy="96" r="44" fill="#A86A2C" stroke={ink} strokeWidth="2" />
        <circle cx="112.5" cy="91" r="44" fill="#C48843" stroke={ink} strokeWidth="2" />
        <circle cx="108" cy="86" r="44" fill={`url(#${u("cake")})`} stroke={ink} strokeWidth="2.2" />
        <g fill="#F6DFAE" opacity="0.8">
          {scatter(17, 34, 108, 86, 4, 38).map((s, i) => (
            <ellipse key={i} cx={s.x} cy={s.y} rx="1.6" ry="0.8" transform={`rotate(${s.turn} ${s.x} ${s.y})`} />
          ))}
        </g>
        <path
          d="M78 72 C88 62 100 70 106 74 C114 79 122 70 132 74 C142 78 140 92 148 98 C152 101 152 106 148 108"
          fill="none"
          stroke="#8E521B"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M80 71 C88 64 98 70 104 73" fill="none" stroke="#E8A65A" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M132 75 C140 78 139 90 146 97" fill="none" stroke="#E8A65A" strokeWidth="1.3" strokeLinecap="round" />
        <g transform="rotate(-12 110 72)">
          <rect x="101" y="65" width="18" height="13" rx="3" fill="#FFF0A6" stroke={ink} strokeWidth="1.3" />
          <rect x="104" y="67" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
        </g>
        <BananaSlice x={92} y={92} u={u} />
        <BananaSlice x={112} y={102} u={u} />
        <BananaSlice x={130} y={88} u={u} />
        <BananaSlice x={98} y={110} u={u} />
      </g>
    ),
  },
  "strawberry-overnight-oats": {
    plate: false,
    gradients: (u) => (
      <>
        <radialGradient id={u("glass")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.78" stopColor="#DCE8EB" />
          <stop offset="0.9" stopColor="#F4FAFB" />
          <stop offset="1" stopColor="#BFD2D8" />
        </radialGradient>
        <radialGradient id={u("oats")} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#FCF5E6" />
          <stop offset="1" stopColor="#E7D6B5" />
        </radialGradient>
        <radialGradient id={u("berry")} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#FF8C93" />
          <stop offset="1" stopColor="#D8303C" />
        </radialGradient>
      </>
    ),
    draw: (u) => (
      <g strokeLinejoin="round">
        <circle cx="117" cy="96" r="60" fill={ink} opacity="0.32" />
        <circle cx="112" cy="90" r="60" fill={`url(#${u("glass")})`} stroke={ink} strokeWidth="2.4" />
        <circle cx="112" cy="90" r="55" fill="none" stroke="#A9C0C7" strokeWidth="1.4" />
        <circle cx="112" cy="90" r="50" fill={`url(#${u("oats")})`} stroke="#B9CBD0" strokeWidth="1.2" />
        <path d="M70 62 A50 50 0 0 1 120 40" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <g fill="#E2CB9C" stroke="#C3A672" strokeWidth="0.5">
          {scatter(29, 46, 112, 90, 4, 46).map((s, i) => (
            <ellipse key={i} cx={s.x} cy={s.y} rx="3" ry="1.5" transform={`rotate(${s.turn} ${s.x} ${s.y})`} />
          ))}
        </g>
        <g fill="#3A3128">
          {scatter(31, 40, 112, 90, 2, 46).map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r="0.8" />
          ))}
        </g>
        <path
          d="M112 90 C118 84 126 90 122 98 C116 108 98 104 96 92 C94 76 116 68 128 76 C140 86 136 108 118 114"
          fill="none"
          stroke="#FFFDF6"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <StrawberrySlice x={98} y={82} turn={-24} u={u} />
        <StrawberrySlice x={128} y={86} turn={18} u={u} />
        <StrawberrySlice x={110} y={110} turn={170} u={u} />
        <StrawberrySlice x={124} y={64} turn={-150} u={u} />
      </g>
    ),
  },
};

const palettes = {
  dinner: { tiles: ["#2E6B54", "#2A644E", "#33735A", "#2C6851"], band: "#2E6B54" },
  breakfast: { tiles: ["#F2C14E", "#EDB944", "#F5C95C", "#F0BE49"], band: "#C8312B" },
};

/** A drawing of the dish. `fill` crops it to cover its container instead of keeping 4:3. */
export function DishArt({ recipe, fill = false }: { recipe: Recipe; fill?: boolean }) {
  // Hidden pages stay in the DOM, so every drawing needs its own ids.
  const uid = `art${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const u = (name: string) => `${uid}-${name}`;
  const dish = dishes[recipe.slug];
  const palette = palettes[recipe.meal];

  return (
    <svg
      viewBox="0 0 240 180"
      preserveAspectRatio={fill ? "xMidYMid slice" : undefined}
      role="img"
      aria-label={`Drawing of ${recipe.name}`}
      className={`block w-full ${fill ? "h-full" : "h-auto"}`}
    >
      <defs>
        <pattern id={u("tile")} width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill={palette.tiles[0]} />
          <rect x="16" width="16" height="16" fill={palette.tiles[1]} />
          <rect y="16" width="16" height="16" fill={palette.tiles[2]} />
          <rect x="16" y="16" width="16" height="16" fill={palette.tiles[3]} />
          <path d="M0 0H32M0 16H32M0 0V32M16 0V32" stroke="#F3ECDA" strokeOpacity="0.55" strokeWidth="1.6" />
        </pattern>
        <radialGradient id={u("rim")} cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F2ECDF" />
        </radialGradient>
        <radialGradient id={u("well")} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0.6" stopColor="#FFFEFA" />
          <stop offset="1" stopColor="#EFE8DA" />
        </radialGradient>
        <radialGradient id={u("banana")} cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#FFFAE6" />
          <stop offset="1" stopColor="#F0DFA8" />
        </radialGradient>
        <filter id={u("grain")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.1" />
          </feComponentTransfer>
        </filter>
        {dish?.gradients?.(u)}
      </defs>
      <rect width="240" height="180" fill={`url(#${u("tile")})`} />
      {/* Dishes are drawn around x = 112; shift them to the middle of the 240-wide frame. */}
      <g transform="translate(8 0)">
        {dish?.plate && <Plate u={u} band={palette.band} />}
        {dish?.draw(u)}
      </g>
      <rect width="240" height="180" filter={`url(#${u("grain")})`} style={{ mixBlendMode: "multiply" }} pointerEvents="none" />
    </svg>
  );
}
