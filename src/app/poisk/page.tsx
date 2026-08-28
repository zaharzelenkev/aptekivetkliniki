import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { search } from "@/lib/search";

export const metadata: Metadata = {
  title: "Поиск по сайту",
  robots: { index: false, follow: true },
};

const categoryOrder = ["Аптеки", "Ветеринария", "Услуги", "Ассортимент", "Новости", "Страницы"] as const;

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = search(q);
  const grouped = categoryOrder.map((cat) => ({ cat, items: results.filter((r) => r.category === cat) })).filter((g) => g.items.length > 0);

  return (
    <Section className="pt-8 sm:pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Поиск" }]} />
      <div className="mt-4">
        <SectionHeading eyebrow="Поиск" title={q ? `Результаты по запросу «${q}»` : "Поиск по сайту"} />
      </div>

      <div className="mt-10">
        {!q ? (
          <EmptyState
            icon="🔎"
            title="Введите запрос в поиске сайта"
            description="Например: «круглосуточно», «вакцинация», «Пушкин» или «карты лояльности»."
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon="🙈"
            title={`По запросу «${q}» ничего не найдено`}
            description="Попробуйте другой запрос или перейдите в один из основных разделов."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/apteki" variant="outline" size="sm">
                  Аптеки
                </Button>
                <Button href="/veterinariya" variant="outline" size="sm">
                  Ветеринария
                </Button>
                <Button href="/uslugi" variant="outline" size="sm">
                  Услуги
                </Button>
              </div>
            }
          />
        ) : (
          <div className="flex flex-col gap-10">
            {grouped.map((group) => (
              <div key={group.cat}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">{group.cat}</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/50"
                      >
                        <p className="font-semibold text-ink-900">{item.title}</p>
                        {item.description ? <p className="mt-1 text-sm text-ink-500">{item.description}</p> : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
