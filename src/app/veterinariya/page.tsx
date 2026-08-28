import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PharmacyExplorer } from "@/components/PharmacyExplorer";
import { locations } from "@/data/locations";
import { vetServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Ветеринарные аптеки и кабинет «Фармакея»",
  description:
    "Ветеринарные аптеки сети «Фармакея» в Санкт-Петербурге и Пушкине: препараты, корма и зоотовары, а также ветеринарный кабинет с вакцинацией и приёмом терапевта.",
  alternates: { canonical: "/veterinariya" },
};

export default function VeterinaryPage() {
  const vetLocations = locations.filter((l) => l.kinds.includes("vet-pharmacy") || l.kinds.includes("vet-clinic"));
  const kabinetServices = vetServices.filter((s) => s.category === "Ветеринарный кабинет");

  return (
    <>
      <section className="border-b border-border bg-secondary-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Ветеринария" }]} />
          <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge tone="secondary">Для владельцев животных</Badge>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-tight text-ink-950 sm:text-5xl">
                Ветеринарные аптеки и кабинет «Фармакея»
              </h1>
              <p className="mt-4 max-w-xl text-lg text-ink-600">
                Первая ветеринарная аптека сети открылась в Пушкине и стала первой в городе. Сегодня это
                препараты, корма и зоотовары для всех домашних животных, а также ветеринарный кабинет с
                вакцинацией, чипированием и приёмом терапевта.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#tochki" variant="secondary" size="lg">
                  Ветеринарные аптеки рядом
                </Button>
                <Button href="/veterinariya/shirokaya-26-pushkin" variant="outline" size="lg">
                  Ветеринарный кабинет
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-soft-lg">
              <Image
                src="https://images.pexels.com/photos/7470754/pexels-photo-7470754.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                alt="Ветеринарный осмотр собаки специалистом (иллюстративное фото)"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section id="tochki">
        <SectionHeading
          eyebrow="Ветеринарные точки"
          title="Ветеринарные аптеки и кабинет рядом с вами"
          description="Выбирайте точку на карте — увидите часы работы, телефоны и услуги."
        />
        <div className="mt-10">
          <PharmacyExplorer locations={vetLocations} basePath="/veterinariya" />
        </div>
      </Section>

      <Section className="bg-surface/60">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Ветеринарный кабинет"
              title="Услуги ветеринарного кабинета ООО «Фармакея ветеринарная»"
              description="Кабинет расположен по адресу г. Пушкин, ул. Широкая, 26."
            />
            <Button href="/veterinariya/shirokaya-26-pushkin" variant="secondary" className="mt-6">
              Подробнее о кабинете
            </Button>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {kabinetServices.map((s) => (
              <li key={s.id}>
                <Card className="h-full p-5">
                  <p className="font-semibold text-ink-900">{s.title}</p>
                  <p className="mt-1.5 text-sm text-ink-600">{s.shortDescription}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="pb-20">
        <Card className="p-8 sm:p-10">
          <Badge tone="secondary">Лояльность</Badge>
          <h2 className="mt-3 text-2xl font-bold text-ink-950">Система лояльности для владельцев, врачей и заводчиков</h2>
          <p className="mt-3 max-w-2xl text-ink-600">
            В ветеринарных аптеках сети действует накопительная система лояльности для постоянных покупателей,
            а также специальные условия для практикующих ветеринарных врачей и заводчиков.
          </p>
        </Card>
      </Section>
    </>
  );
}
