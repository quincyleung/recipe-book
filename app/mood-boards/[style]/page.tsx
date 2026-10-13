import { notFound } from "next/navigation";
import { Placeholder } from "@/app/_components/placeholder";
import { getStyle, styles } from "@/content/styles";

export function generateStaticParams() {
  return styles.map((style) => ({ style: style.slug }));
}

export default async function MoodBoardPage({ params }: PageProps<"/mood-boards/[style]">) {
  const style = getStyle((await params).style);
  if (!style) notFound();

  return <Placeholder title={style.name} note="Mood board coming soon." />;
}
