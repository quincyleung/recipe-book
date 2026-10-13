export type Style = {
  slug: "greek-summer" | "parisian-morning" | "old-hong-kong";
  name: string;
  /** Three words for the mood. */
  tagline: string;
  /** Folder in public/mood/ that holds this style's photos. */
  folder: string;
  /** Three colors from the mood board, shown on the hub. */
  swatches: [string, string, string];
};

export const styles: Style[] = [
  {
    slug: "greek-summer",
    name: "Greek Summer",
    tagline: "Whitewashed · Aegean · Sun-bleached",
    folder: "Greek Summer",
    swatches: ["#F7F5F0", "#1D4E9E", "#E7DCC6"],
  },
  {
    slug: "parisian-morning",
    name: "Parisian Morning",
    tagline: "Ivory · Gilt · Marble",
    folder: "Parisian Morning",
    swatches: ["#F8F3E8", "#B08D4C", "#2B2420"],
  },
  {
    slug: "old-hong-kong",
    name: "Old Hong Kong",
    tagline: "Cha Chaan Teng · Neon · 中英",
    folder: "Old Hong Kong",
    swatches: ["#2E6B54", "#C8312B", "#F2C14E"],
  },
];

export function getStyle(slug: string) {
  return styles.find((style) => style.slug === slug);
}
