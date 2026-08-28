import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-ink-50/60 px-6 py-14 text-center">
      {icon ? <div className="mb-4 text-4xl" aria-hidden="true">{icon}</div> : null}
      <p className="text-lg font-semibold text-ink-900">{title}</p>
      {description ? <p className="mt-2 max-w-sm text-sm text-ink-600">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
