import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hoverable = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-soft",
        hoverable && "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
