export type Style = {
  slug: "greek" | "french" | "old-hong-kong";
  name: string;
  /** Placeholder swatches for the hub until the mood boards set real palettes. */
  swatches: [string, string, string];
};

export const styles: Style[] = [
  {
    slug: "greek",
    name: "Greek Summer",
    swatches: ["#F6F3EC", "#1F4E8C", "#E9C46A"],
  },
  {
    slug: "french",
    name: "French Café",
    swatches: ["#F3EBDD", "#3B2A20", "#7A1F2B"],
  },
  {
    slug: "old-hong-kong",
    name: "Old Hong Kong Nostalgia",
    swatches: ["#2F6F5E", "#B3312C", "#E0B03A"],
  },
];

export function getStyle(slug: string) {
  return styles.find((style) => style.slug === slug);
}
