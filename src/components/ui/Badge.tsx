import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "primary" | "secondary" | "success" | "warning" | "error" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200",
  secondary: "bg-secondary-50 text-secondary-700 ring-1 ring-inset ring-secondary-200",
  success: "bg-success-50 text-success-600 ring-1 ring-inset ring-success-500/20",
  warning: "bg-warning-50 text-warning-600 ring-1 ring-inset ring-warning-500/20",
  error: "bg-error-50 text-error-600 ring-1 ring-inset ring-error-500/20",
  neutral: "bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200",
};

export function Badge({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
