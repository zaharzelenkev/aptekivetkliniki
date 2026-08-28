import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="36" height="36" rx="11" fill="var(--color-primary-600)" />
        <path
          d="M18 9v18M9 18h18"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <circle cx="26.5" cy="10" r="2.6" fill="var(--color-secondary-400)" />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-display text-[1.2rem] font-bold tracking-tight text-ink-950">Фармакея</span>
        {/* The tagline is the first thing that makes the header overflow on
            very narrow phones (320px), so it is dropped there. */}
        <span className="truncate text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500 max-[359px]:hidden">
          аптеки и ветеринария
        </span>
      </span>
    </span>
  );
}
