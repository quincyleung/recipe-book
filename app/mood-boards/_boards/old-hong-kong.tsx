import { made, photo, Swatch, type Board } from "../_components/mood-board";

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
  colors: { bg: cream, ink, muted },
  titleClassName: "font-oswald text-5xl font-semibold tracking-wide uppercase sm:text-6xl",
  bodyClassName: "font-oswald",
  tileClassName: "rounded-sm",
  artifacts: [
    photo("cha-chaan-teng-breakfast", 736, 920, "Milk tea, lemon tea, French toast, and pineapple buns at a cha chaan teng"),
    made(
      "Neon sign: 茶餐廳, cha chaan teng",
      <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 p-4" style={{ backgroundColor: night }}>
        <span
          className="font-noto-serif-tc text-5xl font-black [writing-mode:vertical-rl]"
          style={{ color: "#FFE3EF", textShadow: glow(neonPink) }}
        >
          茶餐廳
        </span>
        <span className="text-[10px] tracking-[0.3em]" style={{ color: "#D9FFFE", textShadow: glow(neonCyan) }}>
          CHA CHAAN TENG
        </span>
      </div>,
    ),
    made("Color: Jade 翡翠", <Swatch name="Jade 翡翠" hex={jade} />),
    photo("mong-kok-neon", 683, 1024, "Neon signs over a street in Mong Kok"),
    made(
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
    made("Color: Signage red 招牌紅", <Swatch name="Signage red 招牌紅" hex={red} className="aspect-[4/5]" />),
    photo("retro-hk-collage", 675, 1200, "A collage of a rotary phone, checkerboard, milk tea, and a Tung Shan Hotel sign"),
    made(
      "Texture: mosaic wall tiles",
      <div
        className="aspect-[4/3]"
        style={{
          backgroundColor: jade,
          backgroundImage: `linear-gradient(${cream} 2px, transparent 2px), linear-gradient(90deg, ${cream} 2px, transparent 2px)`,
          backgroundSize: "14px 14px",
        }}
      />,
    ),
    made(
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
    photo("lan-fong-yuen", 736, 736, "The Lan Fong Yuen milk tea stall with its red and white sign"),
    made("Color: Milk tea 奶茶", <Swatch name="Milk tea 奶茶" hex={milkTea} ink={ink} className="aspect-[4/3]" />),
    made(
      "Order slip: iced lemon tea, less sweet",
      <div
        className="flex flex-col p-4 font-noto-serif-tc text-sm leading-6"
        style={{
          backgroundColor: "#FBF7EC",
          color: "#2B3A8C",
          // One 24px rule per line of text, offset by the 16px padding so text sits on the lines.
          backgroundImage: "repeating-linear-gradient(transparent 0 23px, rgb(200 49 43 / 0.35) 23px 24px)",
          backgroundPosition: "0 16px",
        }}
      >
        <span className="text-right text-[10px]" style={{ color: red }}>
          No. 0417 · 檯 12
        </span>
        <span>凍檸茶 少甜</span>
        <span>西多士 ×1</span>
        <span>滑蛋蝦仁飯</span>
      </div>,
    ),
    photo("mahjong-tiles", 736, 1308, "Mahjong tiles scattered on a green felt table"),
    made(
      "Texture: checkerboard floor",
      <div
        className="aspect-square"
        style={{ background: `repeating-conic-gradient(${ink} 0 25%, ${cream} 0 50%) 0 0 / 28px 28px` }}
      />,
    ),
    made("Color: Egg tart 蛋撻", <Swatch name="Egg tart 蛋撻" hex={eggTart} ink={ink} className="aspect-[4/3]" />),
    made(
      "Interface: primary and secondary buttons",
      <div className="flex flex-col items-start gap-2 bg-white p-4 text-sm">
        <span className="rounded-sm px-4 py-2 font-semibold text-white" style={{ backgroundColor: red }}>
          <span className="font-noto-serif-tc">落單</span> ORDER
        </span>
        <span className="rounded-sm border-2 px-4 py-1.5" style={{ borderColor: ink, color: ink }}>
          <span className="font-noto-serif-tc">收藏</span> SAVE
        </span>
      </div>,
    ),
    photo("old-mailboxes", 663, 1000, "Old painted mailboxes with hand-lettered floor numbers"),
    made(
      "Enamel plate: 17號 1/F",
      <div className="flex aspect-[4/3] items-center justify-center p-4" style={{ backgroundColor: milkTea }}>
        <div className="border-2 border-white px-4 py-2 text-center text-white" style={{ backgroundColor: jade }}>
          <span className="block font-noto-serif-tc text-2xl font-black">17號</span>
          <span className="text-lg font-semibold">1/F</span>
        </div>
      </div>,
    ),
    made(
      "Neon sign: OPEN 營業中",
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1 p-4" style={{ backgroundColor: night }}>
        <span className="text-3xl font-semibold tracking-widest" style={{ color: "#D9FFFE", textShadow: glow(neonCyan) }}>
          OPEN
        </span>
        <span className="font-noto-serif-tc text-xl font-black" style={{ color: "#FFE0DE", textShadow: glow("#FF3B30") }}>
          營業中
        </span>
      </div>,
    ),
    photo("puer-tea-wrappers", 736, 981, "Printed pu'er tea cake wrappers in red and green"),
    made("Color: Neon pink", <Swatch name="Neon pink 霓虹" hex={neonPink} ink={night} />),
    made(
      "Interface: recipe card",
      <div className="flex flex-col gap-2 bg-white p-3" style={{ color: ink }}>
        <div className="aspect-[3/2]" style={{ backgroundColor: eggTart }} />
        <p className="font-noto-serif-tc text-lg font-black leading-tight">滑蛋蝦仁</p>
        <p className="text-sm leading-tight">Cantonese Shrimp and Egg</p>
        <p className="text-xs" style={{ color: muted }}>
          15 MIN · SERVES 2
        </p>
      </div>,
    ),
    photo("bakery-stools", 736, 1104, "A bakery window with a folding table and orange stools on the sidewalk"),
    made(
      "Interface: filter chips with Dinner selected",
      <div className="flex flex-wrap gap-1.5 bg-white p-4 text-xs" style={{ color: ink }}>
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
    made(
      "Mahjong tile: 中, red dragon",
      <div className="flex aspect-square items-center justify-center p-6" style={{ backgroundColor: "#3F7D5C" }}>
        <div
          className="flex aspect-[3/4] h-full items-center justify-center rounded-md border-b-8"
          style={{ backgroundColor: "#FBF7EC", borderColor: "#E8A33D" }}
        >
          <span className="font-noto-serif-tc text-4xl font-black" style={{ color: red }}>
            中
          </span>
        </div>
      </div>,
    ),
    photo("street-to-harbour", 736, 1309, "Trams and minibuses on a street that ends at the harbour"),
    made(
      "Sign: 下午茶, afternoon tea 2:30 to 5:30",
      <div className="flex flex-col items-center gap-1 p-4 text-center" style={{ backgroundColor: red, color: "#FFFFFF" }}>
        <span className="font-noto-serif-tc text-3xl font-black">下午茶</span>
        <span className="text-sm tracking-widest">AFTERNOON TEA</span>
        <span className="mt-1 rounded-sm px-2 text-sm font-semibold" style={{ backgroundColor: eggTart, color: ink }}>
          2:30 – 5:30
        </span>
      </div>,
    ),
    photo("vintage-poster-collage", 675, 1200, "A collage of vintage Hong Kong posters and calendar pages"),
  ],
};
