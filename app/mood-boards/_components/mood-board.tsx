import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Style } from "@/content/styles";

export type Artifact =
  | { kind: "photo"; file: string; alt: string; width: number; height: number }
  | { kind: "made"; label: string; node: ReactNode };

export type Board = {
  colors: { bg: string; ink: string; muted: string };
  /** Font family utility for the page title and body. */
  titleClassName: string;
  bodyClassName: string;
  /** Corner and border treatment shared by every tile. */
  tileClassName: string;
  artifacts: Artifact[];
};

export function photo(file: string, width: number, height: number, alt: string): Artifact {
  return { kind: "photo", file, width, height, alt };
}

export function made(label: string, node: ReactNode): Artifact {
  return { kind: "made", label, node };
}

export function Swatch({
  name,
  hex,
  ink = "#FFFFFF",
  outlined = false,
  className = "aspect-square",
}: {
  name: string;
  hex: string;
  ink?: string;
  outlined?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-end p-3 text-xs ${className}`}
      style={{
        backgroundColor: hex,
        color: ink,
        boxShadow: outlined ? "inset 0 0 0 1px rgb(0 0 0 / 0.1)" : undefined,
      }}
    >
      <span className="font-semibold">{name}</span>
      <span className="opacity-75">{hex}</span>
    </div>
  );
}

export function MoodBoard({ style, board, fonts }: { style: Style; board: Board; fonts: string }) {
  const photoCount = board.artifacts.filter((artifact) => artifact.kind === "photo").length;
  const madeCount = board.artifacts.length - photoCount;
  const theme = {
    "--bg": board.colors.bg,
    "--ink": board.colors.ink,
    "--muted": board.colors.muted,
  } as CSSProperties;

  return (
    <main className={`${fonts} ${board.bodyClassName} flex-1 bg-(--bg) text-(--ink)`} style={theme}>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <Link
          href="/"
          className="text-sm text-(--muted) underline underline-offset-4 hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink)"
        >
          ← Hub
        </Link>

        <header className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className={board.titleClassName}>{style.name}</h1>
            <p className="mt-2 text-(--muted)">{style.tagline}</p>
          </div>
          <p className="text-sm text-(--muted)">
            <span aria-hidden>✦</span> made by the agent
          </p>
        </header>

        <ul className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5">
          {board.artifacts.map((artifact) => (
            <li
              key={artifact.kind === "photo" ? artifact.file : artifact.label}
              className={`relative mb-3 break-inside-avoid overflow-hidden ${board.tileClassName}`}
            >
              {artifact.kind === "photo" ? (
                <Image
                  src={encodeURI(`/mood/${style.folder}/${artifact.file}.jpg`)}
                  alt={artifact.alt}
                  width={artifact.width}
                  height={artifact.height}
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="block h-auto w-full"
                />
              ) : (
                <>
                  <div role="img" aria-label={artifact.label}>
                    {artifact.node}
                  </div>
                  <span
                    aria-hidden
                    className="absolute top-1.5 right-1.5 rounded-full bg-white/85 px-1.5 text-[10px] leading-4 text-black"
                  >
                    ✦
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-(--muted)">
          {board.artifacts.length} artifacts: {photoCount} photos I collected and {madeCount} pieces of color,
          type, texture, and interface made by the agent
        </p>
      </div>
    </main>
  );
}
