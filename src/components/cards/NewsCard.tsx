import Link from "next/link";
import type { NewsArticle } from "@/data/types";
import { Card } from "@/components/ui/Card";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card hoverable className="flex h-full flex-col gap-3 p-6">
      <time dateTime={article.date} className="text-xs font-semibold uppercase tracking-wide text-ink-500">
        {dateFormatter.format(new Date(article.date))}
      </time>
      <h3 className="text-lg font-bold text-ink-950">
        <Link href={`/novosti/${article.slug}`} className="hover:text-primary-700">
          {article.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-ink-600">{article.excerpt}</p>
      <Link
        href={`/novosti/${article.slug}`}
        className="mt-auto pt-2 text-sm font-semibold text-primary-700 underline-offset-4 hover:underline"
      >
        Читать полностью →
      </Link>
    </Card>
  );
}
