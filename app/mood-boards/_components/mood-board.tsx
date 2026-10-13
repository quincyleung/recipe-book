import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Style } from "@/content/styles";

export type Credit = { title: string; author: string; license: string; url: string };

export type Photo = {
  file: string;
  width: number;
  height: number;
  alt: string;
  /** Set for photos from Wikimedia Commons; photos without one are mine. */
  credit?: Credit;
};

/** A key photo with what the design takes from it. */
export type Source = Photo & { title: string; take: string };

export type Tile = { label: string; node: ReactNode };

export type Board = {
  colors: { bg: string; ink: string; muted: string; accent: string; line: string };
  titleClassName: string;
  headingClassName: string;
  /** Font for tiles; prose sets the font for longer text. */
  bodyClassName: string;
  proseClassName: string;
  /** Corner treatment shared by every photo and tile. */
  tileClassName: string;
  evokes: string;
  suits: string;
  sources: Source[];
  references: Photo[];
  palette: { name: string; hex: string; ink?: string; outlined?: boolean }[];
  type: Tile[];
  textureHeading: string;
  textures: Tile[];
  ui: Tile[];
};

export function photo(file: string, width: number, height: number, alt: string, credit?: Credit): Photo {
  return { file, width, height, alt, credit };
}

export function source(photo: Photo, title: string, take: string): Source {
  return { ...photo, title, take };
}

export function tile(label: string, node: ReactNode): Tile {
  return { label, node };
}

function Swatch({ name, hex, ink = "#FFFFFF", outlined = false }: Board["palette"][number]) {
  return (
    <div
      className="flex aspect-square flex-col justify-end p-3 text-xs"
      style={{
        backgroundColor: hex,
        color: ink,
        boxShadow: outlined ? "inset 0 0 0 1px rgb(0 0 0 / 0.12)" : undefined,
      }}
    >
      <span className="font-semibold">{name}</span>
      <span className="opacity-75">{hex}</span>
    </div>
  );
}

function Section({
  board,
  title,
  note,
  children,
}: {
  board: Board;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-(--line) pt-10">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className={board.headingClassName}>{title}</h2>
        {note && <p className={`${board.proseClassName} text-sm text-(--muted)`}>{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Tiles({ board, tiles }: { board: Board; tiles: Tile[] }) {
  return (
    <ul className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <li key={t.label} className={`overflow-hidden ${board.tileClassName}`}>
          <div role="img" aria-label={t.label}>
            {t.node}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MoodBoard({ style, board, fonts }: { style: Style; board: Board; fonts: string }) {
  const collected = board.sources.length + board.references.length;
  const made = board.palette.length + board.type.length + board.textures.length + board.ui.length;
  const credits = [...board.sources, ...board.references].filter((p) => p.credit);
  const src = (p: Photo) => encodeURI(`/mood/${style.folder}/${p.file}.jpg`);
  const theme = {
    "--bg": board.colors.bg,
    "--ink": board.colors.ink,
    "--muted": board.colors.muted,
    "--accent": board.colors.accent,
    "--line": board.colors.line,
  } as CSSProperties;

  return (
    <main className={`${fonts} ${board.bodyClassName} flex-1 bg-(--bg) text-(--ink)`} style={theme}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-col gap-10">
          <div>
            <Link
              href="/"
              className={`${board.proseClassName} text-sm text-(--muted) underline underline-offset-4 hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink)`}
            >
              ← Hub
            </Link>
            <h1 className={`mt-6 ${board.titleClassName}`}>{style.name}</h1>
            <p className={`${board.proseClassName} mt-2 text-xl text-(--muted)`}>{style.tagline}</p>
          </div>
          <dl className={`${board.proseClassName} grid gap-6 sm:grid-cols-3`}>
            {[
              ["Evokes", board.evokes],
              ["Suits", board.suits],
              ["Artifacts", `${collected + made}: ${collected} collected, ${made} made by the agent`],
            ].map(([term, description]) => (
              <div key={term}>
                <dt className="text-sm font-medium text-(--accent)">{term}</dt>
                <dd className="mt-1 text-lg leading-relaxed">{description}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Section board={board} title="Where it comes from">
          <ul className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {board.sources.map((s) => (
              <li key={s.file} className="flex flex-col gap-3">
                <Image
                  src={src(s)}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={`aspect-[4/5] w-full object-cover ${board.tileClassName}`}
                />
                <div className={board.proseClassName}>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-(--muted)">{s.take}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section board={board} title="References" note={`${board.references.length} more photos`}>
          <ul className="columns-2 gap-3 sm:columns-3 lg:columns-4">
            {board.references.map((p) => (
              <li key={p.file} className={`mb-3 break-inside-avoid overflow-hidden ${board.tileClassName}`}>
                <Image
                  src={src(p)}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="block h-auto w-full"
                />
              </li>
            ))}
          </ul>
          <div className={`${board.proseClassName} text-xs leading-relaxed text-(--muted)`}>
            <p>Photos from Wikimedia Commons; the rest I collected.</p>
            <ul className="mt-1">
              {credits.map(({ file, credit }) => (
                <li key={file}>
                  <a
                    href={credit!.url}
                    className="underline underline-offset-2 hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-(--ink)"
                  >
                    {credit!.title}
                  </a>{" "}
                  by {credit!.author}, {credit!.license}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section board={board} title="Type and color" note="Made by the agent">
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {board.palette.map((swatch) => (
              <li key={swatch.hex} className={`overflow-hidden ${board.tileClassName}`}>
                <Swatch {...swatch} />
              </li>
            ))}
          </ul>
          <Tiles board={board} tiles={board.type} />
        </Section>

        <Section board={board} title={board.textureHeading} note="Made by the agent">
          <Tiles board={board} tiles={board.textures} />
        </Section>

        <Section board={board} title="Pieces of UI" note="Made by the agent, set with my recipes">
          <Tiles board={board} tiles={board.ui} />
        </Section>
      </div>
    </main>
  );
}
