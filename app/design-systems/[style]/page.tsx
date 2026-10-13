import { notFound } from "next/navigation";
import { Placeholder } from "@/app/_components/placeholder";
import { getStyle, styles } from "@/content/styles";

export function generateStaticParams() {
  return styles.map((style) => ({ style: style.slug }));
}

export default async function DesignSystemPage({ params }: PageProps<"/design-systems/[style]">) {
  const style = getStyle((await params).style);
  if (!style) notFound();

  return <Placeholder title={`${style.name} · Design System`} note="Design system coming soon." />;
}
