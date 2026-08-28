import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white shadow-soft hover:bg-primary-700 active:bg-primary-800 focus-visible:outline-primary-600",
  secondary:
    "bg-secondary-600 text-white shadow-soft hover:bg-secondary-700 active:bg-secondary-800 focus-visible:outline-secondary-600",
  outline:
    "border border-border bg-surface text-ink-900 hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-primary-600",
  ghost: "text-ink-700 hover:bg-ink-100 focus-visible:outline-primary-600",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm min-h-9",
  md: "px-5 py-2.5 text-[0.95rem] min-h-11",
  lg: "px-7 py-3.5 text-base min-h-13",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon, iconPosition = "left", ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon && iconPosition === "left" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const isExternal = props.href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
