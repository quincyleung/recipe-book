import Link from "next/link";
import { styles, type Style } from "@/content/styles";

const card =
  "flex items-center gap-3 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors hover:border-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:bg-zinc-100 sm:flex-col sm:items-start";

function SectionLabel({ number, children }: { number: number; children: string }) {
  return (
    <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-900 uppercase">
      <span className="flex size-5 items-center justify-center rounded-full bg-zinc-900 text-[11px] text-white">
        {number}
      </span>
      {children}
    </h2>
  );
}

function Swatches({ style }: { style: Style }) {
  return (
    <span className="flex" aria-hidden>
      {style.swatches.map((color) => (
        <span key={color} className="size-6 border border-black/10" style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

function Dots({ style }: { style: Style }) {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      <span className="font-serif text-base">Aa</span>
      {style.swatches.map((color) => (
        <span key={color} className="size-3 rounded-full border border-black/10" style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

export default function Hub() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-8 sm:py-16">
      <header>
        <p className="text-sm text-zinc-600">UI/UX &amp; Visual Design</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-zinc-900">Recipe Book</h1>
      </header>

      <section className="flex flex-col gap-4">
        <SectionLabel number={1}>Mood boards</SectionLabel>
        <ul className="grid gap-3 sm:grid-cols-3">
          {styles.map((style) => (
            <li key={style.slug}>
              <Link href={`/mood-boards/${style.slug}`} className={card}>
                <Swatches style={style} />
                <span className="ml-auto sm:ml-0">{style.name} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4 border-t border-zinc-200 pt-10">
        <SectionLabel number={2}>Design systems</SectionLabel>
        <ul className="grid gap-3 sm:grid-cols-3">
          {styles.map((style) => (
            <li key={style.slug}>
              <Link href={`/design-systems/${style.slug}`} className={card}>
                <Dots style={style} />
                <span className="ml-auto sm:ml-0">{style.name} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">Each one built from its mood board.</p>
      </section>

      <section className="flex flex-col gap-4 border-t border-zinc-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <SectionLabel number={3}>Your site</SectionLabel>
        <Link
          href="/recipes"
          className="rounded-full bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:bg-black"
        >
          Open Recipe Book →
        </Link>
      </section>
    </main>
  );
}
