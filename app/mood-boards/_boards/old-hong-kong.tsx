import { photo, source, tile, type Board } from "../_components/mood-board";

const cream = "#F3ECDA";
const ink = "#1E1B16";
const muted = "#5E5546";
const jade = "#2E6B54";
const red = "#C8312B";
const milkTea = "#B98A5E";
const eggTart = "#F2C14E";
const night = "#141414";
const neonPink = "#FF4F9A";
const neonCyan = "#3EE6E0";

function glow(color: string) {
  return `0 0 4px #fff, 0 0 10px ${color}, 0 0 22px ${color}, 0 0 40px ${color}`;
}

export const oldHongKong: Board = {
  colors: { bg: cream, ink, muted, accent: red, line: "#D9CDB0" },
  titleClassName: "font-oswald text-5xl font-semibold tracking-wide uppercase sm:text-7xl",
  headingClassName: "font-oswald text-3xl font-semibold tracking-wide uppercase",
  bodyClassName: "font-oswald",
  // Condensed Oswald is hard to read in paragraphs; longer text uses the Chinese serif.
  proseClassName: "font-noto-serif-tc",
  tileClassName: "rounded-sm",
  evokes: "A busy cha chaan teng under neon: milk tea, a bilingual menu wall, and red and green signs.",
  suits: "Fast Cantonese home cooking, read like a menu: quick to scan, loud only where it matters.",
  sources: [
    source(
      photo("cha-chaan-teng-breakfast", 736, 920, "Milk tea, lemon tea, French toast, and pineapple buns at a cha chaan teng"),
      "Breakfast at a cha chaan teng",
      "Take the food-first table: milk tea, thick toast, and a menu wall packed with prices.",
    ),
    source(
      photo("mong-kok-neon", 683, 1024, "Neon signs over a street in Mong Kok"),
      "Neon over Mong Kok",
      "Take the glowing signs, with Chinese and English stacked together.",
    ),
    source(
      photo("lan-fong-yuen", 736, 736, "The Lan Fong Yuen milk tea stall with its red and white sign"),
      "Lan Fong Yuen's stall",
      "Take the red sign, the jade-green paint, and the hand-lettered menu.",
    ),
    source(
      photo("retro-hk-collage", 675, 1200, "A collage of a rotary phone, checkerboard, milk tea, and a Tung Shan Hotel sign"),
      "A retro collage",
      "Take the checkerboard, the jade green, and the bold Chinese characters.",
    ),
  ],
  references: [
    photo("neon-street-night", 960, 837, "A Hong Kong street at night under layers of neon signs", {
      title: "Hong Kong night street 2",
      author: "Wilfredor",
      license: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Hong_Kong_night_street_2.jpg",
    }),
    photo("puer-tea-wrappers", 736, 981, "Printed pu'er tea cake wrappers in red and green"),
    photo("milk-tea-black-white-cup", 960, 965, "Hong Kong milk tea in a Black & White cup and saucer", {
      title: "Hong Kong Milk Tea, Cha Chaan Teng-style with Black and White cup",
      author: "Nikoletic126",
      license: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Hong_Kong_Milk_Tea,_Cha_Chaan_Teng-style_with_Black_and_White_cup.jpg",
    }),
    photo("mahjong-tiles", 736, 1308, "Mahjong tiles scattered on a green felt table"),
    photo("order-slip-shorthand", 901, 1600, "A cha chaan teng order slip written in staff shorthand", {
      title: "茶餐廳特色用字",
      author: "Pauloleong2002",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:%E8%8C%B6%E9%A4%90%E5%BB%B3%E7%89%B9%E8%89%B2%E7%94%A8%E5%AD%97.jpg",
    }),
    photo("bakery-stools", 736, 1104, "A bakery window with a folding table and orange stools on the sidewalk"),
    photo("tram-chun-yeung-street", 960, 720, "A tram moving slowly through the crowded Chun Yeung Street market", {
      title: "Chun Yeung Street, Tram 140 (Hong Kong)",
      author: "Mk2010",
      license: "CC BY-SA 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Chun_Yeung_Street,_Tram_140_(Hong_Kong).jpg",
    }),
    photo("old-mailboxes", 663, 1000, "Old painted mailboxes with hand-lettered floor numbers"),
    photo("egg-tarts", 960, 1280, "Three Hong Kong egg tarts on a plate", {
      title: "Custard+Egg+Tarts+-+Hong+Kong",
      author: "Donatingpictures",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Custard%2BEgg%2BTarts%2B-%2BHong%2BKong.jpg",
    }),
    photo("street-to-harbour", 736, 1309, "Trams and minibuses on a street that ends at the harbour"),
    photo("vintage-poster-collage", 675, 1200, "A collage of vintage Hong Kong posters and calendar pages"),
  ],
  palette: [
    { name: "Jade 翡翠", hex: jade },
    { name: "Signage red 招牌紅", hex: red },
    { name: "Milk tea 奶茶", hex: milkTea, ink },
    { name: "Egg tart 蛋撻", hex: eggTart, ink },
    { name: "Neon pink 霓虹", hex: neonPink, ink: night },
  ],
  type: [
    tile(
      "Type specimen: Oswald and Noto Serif TC",
      <div className="flex aspect-square flex-col justify-between bg-white p-4" style={{ color: ink }}>
        <span className="text-6xl leading-none font-semibold">
          Aa <span className="font-noto-serif-tc font-black">字</span>
        </span>
        <span className="text-xs" style={{ color: muted }}>
          Oswald · Noto Serif TC
        </span>
      </div>,
    ),
    tile(
      "Neon sign: 茶餐廳, cha chaan teng",
      <div className="flex aspect-square flex-col items-center justify-center gap-3 p-4" style={{ backgroundColor: night }}>
        <span
          className="font-noto-serif-tc text-4xl font-black [writing-mode:vertical-rl]"
          style={{ color: "#FFE3EF", textShadow: glow(neonPink) }}
        >
          茶餐廳
        </span>
        <span className="text-[10px] tracking-[0.3em]" style={{ color: "#D9FFFE", textShadow: glow(neonCyan) }}>
          CHA CHAAN TENG
        </span>
      </div>,
    ),
  ],
  textureHeading: "Signs and texture",
  textures: [
    tile(
      "Neon sign: OPEN 營業中",
      <div className="flex aspect-square flex-col items-center justify-center gap-1 p-4" style={{ backgroundColor: night }}>
        <span className="text-3xl font-semibold tracking-widest" style={{ color: "#D9FFFE", textShadow: glow(neonCyan) }}>
          OPEN
        </span>
        <span className="font-noto-serif-tc text-xl font-black" style={{ color: "#FFE0DE", textShadow: glow("#FF3B30") }}>
          營業中
        </span>
      </div>,
    ),
    tile(
      "Enamel plate: 17號 1/F",
      <div className="flex aspect-square items-center justify-center p-4" style={{ backgroundColor: milkTea }}>
        <div className="border-2 border-white px-4 py-2 text-center text-white" style={{ backgroundColor: jade }}>
          <span className="block font-noto-serif-tc text-2xl font-black">17號</span>
          <span className="text-lg font-semibold">1/F</span>
        </div>
      </div>,
    ),
    tile(
      "Texture: mosaic wall tiles",
      <div
        className="aspect-square"
        style={{
          backgroundColor: jade,
          backgroundImage: `linear-gradient(${cream} 2px, transparent 2px), linear-gradient(90deg, ${cream} 2px, transparent 2px)`,
          backgroundSize: "14px 14px",
        }}
      />,
    ),
    tile(
      "Texture: checkerboard floor",
      <div
        className="aspect-square"
        style={{ background: `repeating-conic-gradient(${ink} 0 25%, ${cream} 0 50%) 0 0 / 28px 28px` }}
      />,
    ),
  ],
  ui: [
    tile(
      "Interface: primary and secondary buttons",
      <div className="flex aspect-square flex-col items-start justify-center gap-2 bg-white p-4 text-sm">
        <span className="rounded-sm px-4 py-2 font-semibold text-white" style={{ backgroundColor: red }}>
          <span className="font-noto-serif-tc">落單</span> ORDER
        </span>
        <span className="rounded-sm border-2 px-4 py-1.5" style={{ borderColor: ink, color: ink }}>
          <span className="font-noto-serif-tc">收藏</span> SAVE
        </span>
      </div>,
    ),
    tile(
      "Interface: filter chips with Dinner selected",
      <div className="flex aspect-square flex-wrap content-center gap-1.5 bg-white p-4 text-xs" style={{ color: ink }}>
        <span className="rounded-sm border px-2.5 py-1.5" style={{ borderColor: ink }}>
          <span className="font-noto-serif-tc">全部</span> ALL
        </span>
        <span className="rounded-sm px-2.5 py-1.5 text-white" style={{ backgroundColor: jade }}>
          <span className="font-noto-serif-tc">晚餐</span> DINNER
        </span>
        <span className="rounded-sm border px-2.5 py-1.5" style={{ borderColor: ink }}>
          <span className="font-noto-serif-tc">早餐</span> BREAKFAST
        </span>
      </div>,
    ),
    tile(
      "Interface: recipe card",
      <div className="flex flex-col gap-2 bg-white p-3" style={{ color: ink }}>
        <div className="aspect-[3/2]" style={{ backgroundColor: eggTart }} />
        <p className="font-noto-serif-tc text-lg leading-tight font-black">滑蛋蝦仁</p>
        <p className="text-sm leading-tight">Cantonese Shrimp and Egg</p>
        <p className="text-xs" style={{ color: muted }}>
          20 MIN · SERVES 2
        </p>
      </div>,
    ),
    tile(
      "Menu board in Chinese and English",
      <div className="border-4 text-xs" style={{ borderColor: jade, backgroundColor: cream, color: ink }}>
        <p className="py-1.5 text-center font-noto-serif-tc text-base font-black text-white" style={{ backgroundColor: red }}>
          餐牌 MENU
        </p>
        <ul className="flex flex-col gap-1.5 p-3">
          <li className="flex justify-between gap-2">
            <span>
              <span className="font-noto-serif-tc font-black">滑蛋蝦仁</span> Shrimp &amp; Egg
            </span>
            <span>$48</span>
          </li>
          <li className="flex justify-between gap-2">
            <span>
              <span className="font-noto-serif-tc font-black">金菇肥牛卷</span> Beef Enoki
            </span>
            <span>$58</span>
          </li>
          <li className="flex justify-between gap-2">
            <span>
              <span className="font-noto-serif-tc font-black">凍檸茶</span> Iced Lemon Tea
            </span>
            <span>$22</span>
          </li>
        </ul>
      </div>,
    ),
  ],
};
