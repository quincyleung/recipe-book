export type Style = {
  slug: "greek-summer" | "parisian-morning" | "old-hong-kong";
  name: string;
  /** Folder in public/mood/ that holds this style's photos. */
  folder: string;
  /** Placeholder swatches for the hub until the mood boards set real palettes. */
  swatches: [string, string, string];
};

export const styles: Style[] = [
  {
    slug: "greek-summer",
    name: "Greek Summer",
    folder: "Greek Summer",
    swatches: ["#F6F3EC", "#1F4E8C", "#E9C46A"],
  },
  {
    slug: "parisian-morning",
    name: "Parisian Morning",
    folder: "Parisian Morning",
    swatches: ["#F3EBDD", "#3B2A20", "#7A1F2B"],
  },
  {
    slug: "old-hong-kong",
    name: "Old Hong Kong",
    folder: "Old Hong Kong",
    swatches: ["#2F6F5E", "#B3312C", "#E0B03A"],
  },
];

export function getStyle(slug: string) {
  return styles.find((style) => style.slug === slug);
}
