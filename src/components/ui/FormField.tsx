import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-ink-900 shadow-sm transition-colors placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50";

function fieldBorder(error?: string) {
  return error ? "border-error-500 focus:border-error-500" : "border-border focus:border-primary-500";
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  required,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
        {label} {required ? <span className="text-error-500">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-error-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ error, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input className={cn(fieldBase, fieldBorder(error), className)} aria-invalid={!!error} {...rest} />;
}

export function Textarea({
  error,
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return <textarea className={cn(fieldBase, fieldBorder(error), "min-h-32 resize-y", className)} aria-invalid={!!error} {...rest} />;
}

export function Select({ error, className, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return <select className={cn(fieldBase, fieldBorder(error), className)} aria-invalid={!!error} {...rest} />;
}
