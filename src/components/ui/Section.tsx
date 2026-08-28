import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}
