import type { CSSProperties } from "react";
import type { Style } from "@/content/styles";

export type Colors = {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  /** Decorative dividers only; controls use `control`. */
  border: string;
  /** Outline of inputs and secondary controls (3:1 against bg and surface). */
  control: string;
  /** Reserved for the primary action. */
  accent: string;
  accentHover: string;
  accentPressed: string;
  onAccent: string;
  /** Selected chips, tabs, and saved buttons. */
  selected: string;
  onSelected: string;
  selectedBorder: string;
  /** Outline of cards and panels. */
  cardBorder: string;
  /** Checked checkboxes, radios, and toggles. */
  check: string;
  onCheck: string;
  /** Hover tint for secondary controls and rows, and a deeper one for pressed. */
  soft: string;
  softPressed: string;
  badge: string;
  onBadge: string;
  error: string;
  success: string;
  focus: string;
  /** Selected-tab underline. */
  indicator: string;
  disabledBg: string;
  disabledText: string;
};

export type TypeRole = {
  family: string;
  font: string;
  size: string;
  /** Human-readable size for the spec, in px. */
  px: string;
  weight: number;
  leading: number;
  italic?: boolean;
  uppercase?: boolean;
  tracking?: string;
};

export type Shape = {
  radiusControl: string;
  radiusField: string;
  radiusCard: string;
  radiusCheck: string;
  radiusToggle: string;
  borderWidth: string;
  primaryBorderWidth: string;
  shadowControl: string;
  shadowCard: string;
  pressShift: string;
  pressScale: string;
  /** What the corners, borders, and shadow are, in a sentence. */
  summary: string;
};

export type Theme = {
  colors: Colors;
  type: Record<"display" | "heading" | "title" | "body" | "small" | "label" | "control", TypeRole>;
  shape: Shape;
  /** CSS background used where a recipe photo would go. */
  art: string;
};

/** No shadow, written so it composes inside Tailwind's box-shadow stack. */
const none = "0 0 #0000";

const arch = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><path d="M52 100V54a28 28 0 0 1 56 0v46z" fill="#F7F5F0"/><path d="M68 100V62a12 12 0 0 1 24 0v38z" fill="#1D4E9E"/></svg>',
);
const marble = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none"><filter id="m"><feTurbulence type="turbulence" baseFrequency="0.006 0.018" numOctaves="5" seed="7"/><feColorMatrix values="0 0 0 0 0.55 0 0 0 0 0.53 0 0 0 0 0.5 -2.6 0 0 0 0.9"/></filter><rect width="200" height="200" fill="#F4F1EC"/><rect width="200" height="200" filter="url(#m)"/></svg>',
);

export const themes: Record<Style["slug"], Theme> = {
  "greek-summer": {
    colors: {
      bg: "#F7F5F0",
      surface: "#FFFFFF",
      text: "#14305C",
      muted: "#4A5B78",
      border: "#E7DCC6",
      control: "#7D8DA8",
      accent: "#1D4E9E",
      accentHover: "#173F80",
      accentPressed: "#12305E",
      onAccent: "#FFFFFF",
      selected: "#BCD4EC",
      onSelected: "#14305C",
      selectedBorder: "#14305C",
      cardBorder: "#E7DCC6",
      check: "#14305C",
      onCheck: "#FFFFFF",
      soft: "#EEF3FA",
      softPressed: "#DCE7F4",
      badge: "#EFCB5A",
      onBadge: "#14305C",
      error: "#B42318",
      success: "#2F6B3A",
      focus: "#1D4E9E",
      indicator: "#14305C",
      disabledBg: "#ECE9E2",
      disabledText: "#8F96A3",
    },
    type: {
      display: { family: "Marcellus", font: "var(--nf-marcellus)", size: "clamp(2.5rem, 6vw, 3.5rem)", px: "40–56px", weight: 400, leading: 1.1 },
      heading: { family: "Marcellus", font: "var(--nf-marcellus)", size: "1.75rem", px: "28px", weight: 400, leading: 1.2 },
      title: { family: "Marcellus", font: "var(--nf-marcellus)", size: "1.375rem", px: "22px", weight: 400, leading: 1.2 },
      body: { family: "Manrope", font: "var(--nf-manrope)", size: "1.0625rem", px: "17px", weight: 400, leading: 1.6 },
      small: { family: "Manrope", font: "var(--nf-manrope)", size: "0.875rem", px: "14px", weight: 400, leading: 1.5 },
      label: { family: "Manrope", font: "var(--nf-manrope)", size: "0.75rem", px: "12px", weight: 700, leading: 1.4, uppercase: true, tracking: "0.12em" },
      control: { family: "Manrope", font: "var(--nf-manrope)", size: "0.9375rem", px: "15px", weight: 600, leading: 1.2 },
    },
    shape: {
      radiusControl: "9999px",
      radiusField: "12px",
      radiusCard: "20px",
      radiusCheck: "6px",
      radiusToggle: "9999px",
      borderWidth: "1px",
      primaryBorderWidth: "0px",
      shadowControl: none,
      shadowCard: none,
      pressShift: "0px",
      pressScale: "0.97",
      summary: "Soft, rounded corners from the arches. No shadow: a thin limestone line instead.",
    },
    art: `url("data:image/svg+xml,${arch}") center bottom / auto 88% no-repeat, #BCD4EC`,
  },
  "parisian-morning": {
    colors: {
      bg: "#F8F3E8",
      surface: "#FFFDF9",
      text: "#2B2420",
      muted: "#6E6253",
      border: "#E2D7C3",
      control: "#9C8A70",
      accent: "#8A6A2E",
      accentHover: "#74581F",
      accentPressed: "#5E4718",
      onAccent: "#FFFDF9",
      selected: "#2B2420",
      onSelected: "#F8F3E8",
      selectedBorder: "#2B2420",
      cardBorder: "#E2D7C3",
      check: "#2B2420",
      onCheck: "#F8F3E8",
      soft: "#F3EBDB",
      softPressed: "#E9DDC6",
      badge: "#F4DCDF",
      onBadge: "#7A3440",
      error: "#A1261B",
      success: "#3E6B45",
      focus: "#8A6A2E",
      indicator: "#B08D4C",
      disabledBg: "#EEE8DC",
      disabledText: "#A39A8C",
    },
    type: {
      display: { family: "Cormorant Garamond", font: "var(--nf-cormorant)", size: "clamp(2.75rem, 6vw, 3.75rem)", px: "44–60px", weight: 500, leading: 1.05, italic: true },
      heading: { family: "Cormorant Garamond", font: "var(--nf-cormorant)", size: "2rem", px: "32px", weight: 600, leading: 1.15 },
      title: { family: "Cormorant Garamond", font: "var(--nf-cormorant)", size: "1.5rem", px: "24px", weight: 600, leading: 1.15 },
      body: { family: "Jost", font: "var(--nf-jost)", size: "1.0625rem", px: "17px", weight: 400, leading: 1.65 },
      small: { family: "Jost", font: "var(--nf-jost)", size: "0.875rem", px: "14px", weight: 400, leading: 1.5 },
      label: { family: "Jost", font: "var(--nf-jost)", size: "0.75rem", px: "12px", weight: 500, leading: 1.4, uppercase: true, tracking: "0.2em" },
      control: { family: "Jost", font: "var(--nf-jost)", size: "0.8125rem", px: "13px", weight: 500, leading: 1.2, uppercase: true, tracking: "0.16em" },
    },
    shape: {
      radiusControl: "0px",
      radiusField: "0px",
      radiusCard: "0px",
      radiusCheck: "0px",
      radiusToggle: "9999px",
      borderWidth: "1px",
      primaryBorderWidth: "0px",
      shadowControl: none,
      shadowCard: "inset 0 0 0 6px #FFFDF9, inset 0 0 0 7px #D9C49A",
      pressShift: "0px",
      pressScale: "1",
      summary: "Square corners and hairlines. No shadow: cards get a gold double frame, like a menu card.",
    },
    art: `url("data:image/svg+xml,${marble}") center / cover no-repeat, #F4F1EC`,
  },
  "old-hong-kong": {
    colors: {
      bg: "#F3ECDA",
      surface: "#FFFDF5",
      text: "#1E1B16",
      muted: "#5E5546",
      border: "#D9CDB0",
      control: "#1E1B16",
      accent: "#C8312B",
      accentHover: "#A92822",
      accentPressed: "#8C211C",
      onAccent: "#FFFFFF",
      selected: "#2E6B54",
      onSelected: "#FFFFFF",
      selectedBorder: "#1E1B16",
      cardBorder: "#1E1B16",
      check: "#2E6B54",
      onCheck: "#FFFFFF",
      soft: "#EFE4C8",
      softPressed: "#E3D4AE",
      badge: "#F2C14E",
      onBadge: "#1E1B16",
      error: "#9E1F1A",
      success: "#2E6B54",
      focus: "#1E1B16",
      indicator: "#2E6B54",
      disabledBg: "#E6DDC8",
      disabledText: "#8E8473",
    },
    type: {
      display: {
        family: "Oswald + Noto Serif TC",
        font: "var(--nf-oswald), var(--nf-noto-serif-tc)",
        size: "clamp(2.5rem, 6vw, 3.5rem)",
        px: "40–56px",
        weight: 600,
        leading: 1.05,
        uppercase: true,
        tracking: "0.02em",
      },
      heading: {
        family: "Oswald + Noto Serif TC",
        font: "var(--nf-oswald), var(--nf-noto-serif-tc)",
        size: "1.75rem",
        px: "28px",
        weight: 600,
        leading: 1.15,
        uppercase: true,
        tracking: "0.03em",
      },
      title: {
        family: "Oswald + Noto Serif TC",
        font: "var(--nf-oswald), var(--nf-noto-serif-tc)",
        size: "1.375rem",
        px: "22px",
        weight: 600,
        leading: 1.2,
        uppercase: true,
        tracking: "0.02em",
      },
      body: { family: "Noto Serif TC", font: "var(--nf-noto-serif-tc)", size: "1rem", px: "16px", weight: 400, leading: 1.7 },
      small: { family: "Noto Serif TC", font: "var(--nf-noto-serif-tc)", size: "0.875rem", px: "14px", weight: 400, leading: 1.55 },
      label: { family: "Oswald", font: "var(--nf-oswald)", size: "0.8125rem", px: "13px", weight: 500, leading: 1.4, uppercase: true, tracking: "0.08em" },
      control: { family: "Oswald", font: "var(--nf-oswald)", size: "1rem", px: "16px", weight: 500, leading: 1.2, uppercase: true, tracking: "0.06em" },
    },
    shape: {
      radiusControl: "2px",
      radiusField: "2px",
      radiusCard: "2px",
      radiusCheck: "2px",
      radiusToggle: "2px",
      borderWidth: "2px",
      primaryBorderWidth: "2px",
      shadowControl: "3px 3px 0 #1E1B16",
      shadowCard: "4px 4px 0 #1E1B16",
      pressShift: "3px",
      pressScale: "1",
      summary: "Near-square corners and heavy ink outlines with a hard offset shadow, like a shop sign. Pressing a button pushes it into its shadow.",
    },
    art: "linear-gradient(#F3ECDA 2px, transparent 2px) 0 0 / 14px 14px, linear-gradient(90deg, #F3ECDA 2px, transparent 2px) 0 0 / 14px 14px, #2E6B54",
  },
};

function kebab(name: string) {
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

/** Every token as a --ds-* custom property, for a wrapper's style attribute. */
export function themeVars(theme: Theme): CSSProperties {
  const vars: Record<string, string> = { "--ds-art": theme.art };
  for (const [name, value] of Object.entries(theme.colors)) vars[`--ds-${kebab(name)}`] = value;
  for (const [role, t] of Object.entries(theme.type)) {
    vars[`--ds-${role}-font`] = t.font;
    vars[`--ds-${role}-size`] = t.size;
    vars[`--ds-${role}-weight`] = String(t.weight);
    vars[`--ds-${role}-leading`] = String(t.leading);
    vars[`--ds-${role}-style`] = t.italic ? "italic" : "normal";
    vars[`--ds-${role}-case`] = t.uppercase ? "uppercase" : "none";
    vars[`--ds-${role}-tracking`] = t.tracking ?? "normal";
  }
  for (const [name, value] of Object.entries(theme.shape)) {
    if (name !== "summary") vars[`--ds-${kebab(name)}`] = value;
  }
  return vars as CSSProperties;
}
