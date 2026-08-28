import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsCard } from "@/components/cards/NewsCard";
import { newsArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "Новости аптечной сети «Фармакея»",
  description: "Новости и объявления аптечной сети «Фармакея»: открытие новых аптек и другие события.",
  alternates: { canonical: "/novosti" },
};

export default function NewsPage() {
  return (
    <Section className="pt-8 sm:pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Новости" }]} />
      <div className="mt-4">
        <SectionHeading eyebrow="Новости" title="Новости аптечной сети «Фармакея»" />
      </div>
      <div className="mt-10">
        {newsArticles.length === 0 ? (
          <EmptyState title="Пока нет опубликованных новостей" description="Загляните позже — мы обязательно поделимся новостями." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
