import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { assortmentCategories } from "@/data/assortment";
import { marketplacePartners } from "@/data/company";

export const metadata: Metadata = {
  title: "Ассортимент аптек и ветеринарных аптек «Фармакея»",
  description:
    "Категории товаров сети «Фармакея»: лекарственные препараты, гомеопатия, ветеринарные препараты, корма и зоотовары. Заказ через партнёрские маркетплейсы.",
  alternates: { canonical: "/assortiment" },
};

export default function AssortmentPage() {
  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Ассортимент" }]} />
        <div className="mt-4">
          <SectionHeading
            eyebrow="Ассортимент"
            title="Категории товаров сети «Фармакея»"
            description="У нас нет открытого интернет-магазина с ценами на сайте — здесь собраны категории товаров, которые есть в аптеках. Конкретное наличие и стоимость уточняйте по телефону аптеки или на партнёрских сервисах."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {assortmentCategories.map((cat) => (
            <Card key={cat.id} id={cat.id} className="scroll-mt-24 p-6">
              <Badge tone={cat.audience === "vet" ? "secondary" : cat.audience === "human" ? "primary" : "neutral"}>
                {cat.audience === "vet" ? "Для животных" : cat.audience === "human" ? "Для людей" : "Универсально"}
              </Badge>
              <h2 className="mt-3 text-lg font-bold text-ink-950">{cat.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{cat.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/60 pb-20">
        <SectionHeading
          eyebrow="Как заказать"
          title="Партнёрские сервисы для заказа"
          description="Все аптеки сети являются партнёрами следующих сервисов — оформляйте заказ онлайн и забирайте в удобной аптеке «Фармакея»."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {marketplacePartners.map((p) => (
            <Card key={p.name} className="flex h-full flex-col gap-3 p-6">
              <p className="text-lg font-bold text-ink-950">{p.name}</p>
              <p className="flex-1 text-sm text-ink-600">{p.description}</p>
              <Button href={p.href} variant="outline" size="sm">
                Перейти на сайт
              </Button>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
