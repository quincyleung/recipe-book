import Link from "next/link";

export function Placeholder({ title, note }: { title: string; note: string }) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-12 sm:px-8 sm:py-16">
      <Link
        href="/"
        className="w-fit text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        ← Hub
      </Link>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">{title}</h1>
      <p className="text-zinc-600">{note}</p>
    </main>
  );
}
