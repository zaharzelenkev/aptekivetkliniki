import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}) {
  return <As className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</As>;
}
