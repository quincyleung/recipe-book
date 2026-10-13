import {
  Cormorant_Garamond,
  Jost,
  Manrope,
  Marcellus,
  Noto_Serif_TC,
  Oswald,
  Pinyon_Script,
} from "next/font/google";

// Greek Summer: carved Roman capitals, a relaxed humanist sans.
const marcellus = Marcellus({ weight: "400", subsets: ["latin"], variable: "--nf-marcellus" });
const manrope = Manrope({ subsets: ["latin"], variable: "--nf-manrope" });

// Parisian Morning: high-contrast serif, a script, a geometric sans for labels.
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--nf-cormorant",
});
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--nf-pinyon" });
const jost = Jost({ subsets: ["latin"], variable: "--nf-jost" });

// Old Hong Kong: condensed sign capitals and a heavy Chinese serif.
const oswald = Oswald({ subsets: ["latin"], variable: "--nf-oswald" });
// Google Fonts has no Chinese subset to preload; the browser fetches the glyphs it needs.
const notoSerifTC = Noto_Serif_TC({ weight: ["500", "900"], preload: false, variable: "--nf-noto-serif-tc" });

export const fontVariables = {
  "greek-summer": `${marcellus.variable} ${manrope.variable}`,
  "parisian-morning": `${cormorant.variable} ${pinyon.variable} ${jost.variable}`,
  "old-hong-kong": `${oswald.variable} ${notoSerifTC.variable}`,
};
