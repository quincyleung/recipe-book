import { notFound } from "next/navigation";
import { fontVariables } from "@/app/_fonts";
import { themes } from "@/app/_ds/themes";
import { recipes } from "@/content/recipes";
import { getStyle, styles } from "@/content/styles";
import { DesignSystem } from "../_components/design-system";

export function generateStaticParams() {
  return styles.map((style) => ({ style: style.slug }));
}

export default async function DesignSystemPage({ params }: PageProps<"/design-systems/[style]">) {
  const style = getStyle((await params).style);
  if (!style) notFound();

  return (
    <DesignSystem style={style} theme={themes[style.slug]} fonts={fontVariables[style.slug]} recipes={recipes} />
  );
}
