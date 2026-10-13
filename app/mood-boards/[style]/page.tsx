import { notFound } from "next/navigation";
import { fontVariables } from "@/app/_fonts";
import { getStyle, styles } from "@/content/styles";
import { greekSummer } from "../_boards/greek-summer";
import { oldHongKong } from "../_boards/old-hong-kong";
import { parisianMorning } from "../_boards/parisian-morning";
import { MoodBoard } from "../_components/mood-board";

const boards = {
  "greek-summer": greekSummer,
  "parisian-morning": parisianMorning,
  "old-hong-kong": oldHongKong,
};

export function generateStaticParams() {
  return styles.map((style) => ({ style: style.slug }));
}

export default async function MoodBoardPage({ params }: PageProps<"/mood-boards/[style]">) {
  const style = getStyle((await params).style);
  if (!style) notFound();

  return <MoodBoard style={style} board={boards[style.slug]} fonts={fontVariables[style.slug]} />;
}
