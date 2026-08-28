import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getNewsBySlug, newsArticles } from "@/data/news";
import { getLocationBySlug } from "@/data/locations";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export function generateStaticParams() {
  return newsArticles.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/novosti/${article.slug}` },
    openGraph: { type: "article", publishedTime: article.date },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const location = article.relatedLocationSlug ? getLocationBySlug(article.relatedLocationSlug) : undefined;

  return (
    <Section className="pt-8 sm:pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Новости", href: "/novosti" }, { label: article.title }]} />
      <article className="mt-6 max-w-3xl">
        <time dateTime={article.date} className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          {dateFormatter.format(new Date(article.date))}
        </time>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{article.title}</h1>
        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-700">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {location ? (
          <Card className="mt-10 p-6">
            <p className="text-sm font-semibold text-ink-500">Эта новость относится к аптеке</p>
            <p className="mt-1 text-lg font-bold text-ink-950">{location.name}</p>
            <p className="text-sm text-ink-600">
              {location.city}, {location.address}
            </p>
            <Button href={`/apteki/${location.slug}`} variant="outline" className="mt-4">
              Подробнее об аптеке
            </Button>
          </Card>
        ) : null}
      </article>
    </Section>
  );
}
