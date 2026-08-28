import { twMerge } from "tailwind-merge";

/**
 * Joins class names and resolves conflicting Tailwind utilities.
 *
 * Components pass their default classes first and consumer overrides last
 * (for example `Card` sets `bg-surface`, the page passes `bg-ink-950`).
 * Without `twMerge` both utilities stay in the class list and the winner is
 * decided by the order in the generated CSS — which made white text land on a
 * white background. `twMerge` keeps the last conflicting utility, so the
 * override passed by the caller always wins.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
