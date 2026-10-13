/** A small heart badge for favorited recipes: neon pink from the mood board, so it doesn't read as the red accent. */
export function FavoriteMark({ label, small = false }: { label: string; small?: boolean }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-full border-2 border-(--ds-control) bg-(--ds-surface) shadow-[2px_2px_0_var(--ds-control)] ${small ? "size-6" : "size-8"}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className={small ? "size-3.5" : "size-4.5"}>
        <path
          d="M12 20.5s-7.6-4.7-9.4-9.3C1.3 7.9 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.7 3.4 4.4 6.7-1.8 4.6-9.4 9.3-9.4 9.3Z"
          fill="#FF4F9A"
          stroke="#1E1B16"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
