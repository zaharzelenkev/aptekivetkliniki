import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="rounded transition-colors hover:text-primary-700">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink-800">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
