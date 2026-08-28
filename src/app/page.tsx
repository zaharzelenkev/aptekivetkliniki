import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LocationCard } from "@/components/cards/LocationCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { locations } from "@/data/locations";
import { humanServices, vetServices } from "@/data/services";
import { newsArticles } from "@/data/news";
import { aboutParagraphs, companyFacts } from "@/data/company";

export const metadata: Metadata = {
  title: "Аптеки и ветеринарные клиники «Фармакея» в Санкт-Петербурге",
  description:
    "Сеть «Фармакея» с 2003 года: аптеки для людей и ветеринарные аптеки в Санкт-Петербурге и Пушкине. Найдите ближайшую точку, узнайте часы работы и услуги.",
  alternates: { canonical: "/" },
};

const quickActions = [
  {
    href: "/apteki",
    title: "Найти аптеку",
    description: "Адреса, часы работы и телефоны — список и карта.",
    tone: "primary" as const,
  },
  {
    href: "/veterinariya",
    title: "Ветеринарные клиники",
    description: "Ветеринарные аптеки и кабинет для домашних животных.",
    tone: "secondary" as const,
  },
  {
    href: "/uslugi",
    title: "Услуги",
    description: "Что можно заказать и сделать в «Фармакее».",
    tone: "primary" as const,
  },
  {
    href: "/assortiment",
    title: "Ассортимент",
    description: "Категории товаров для людей и животных.",
    tone: "secondary" as const,
  },
];

export default function HomePage() {
  const featuredLocations = locations.filter((l) => l.kinds.includes("pharmacy") || l.kinds.includes("vet-pharmacy")).slice(0, 3);
  const featuredServices = [humanServices[0], humanServices[1], vetServices[0]];
  const latestNews = newsArticles[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-50/70 via-background to-background">
        <Container className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <Badge tone="primary">Санкт-Петербург · с 2003 года</Badge>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.4rem]">
              Аптеки и ветеринарные аптеки «Фармакея» — рядом с вами
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              Единственная в Санкт-Петербурге аптечная сеть с двумя направлениями: аптеки для людей и аптеки
              для животных. Широкий ассортимент, консультация фармацевта и квалифицированные ветеринарные
              специалисты.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/apteki" size="lg">
                Найти аптеку
              </Button>
              <Button href="/veterinariya" variant="secondary" size="lg">
                Ветеринарные клиники
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-2 gap-4 border-t border-border pt-6 min-[360px]:grid-cols-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Работаем с</dt>
                <dd className="mt-1 text-2xl font-bold text-ink-950">{companyFacts.founded}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Точек в сети</dt>
                <dd className="mt-1 text-2xl font-bold text-ink-950">{locations.length}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">Направления</dt>
                <dd className="mt-1 text-2xl font-bold text-ink-950">{companyFacts.directions}</dd>
              </div>
            </dl>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-soft-lg">
              <Image
                src="https://images.pexels.com/photos/8657366/pexels-photo-8657366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                alt="Фармацевт консультирует покупателя в аптеке (иллюстративное фото)"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-surface p-4 shadow-soft-lg sm:block">
              <p className="text-sm font-semibold text-ink-900">Круглосуточная аптека</p>
              <p className="text-xs text-ink-500">Пушкин, Привокзальная площадь, 6/2</p>
            </div>
          </div>
        </Container>
      </section>

      {/* QUICK ACTIONS */}
      <Section className="pt-14 sm:pt-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="group block h-full">
              <Card
                hoverable
                className={`flex h-full flex-col gap-3 p-6 ${
                  action.tone === "primary" ? "hover:border-primary-300" : "hover:border-secondary-300"
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${
                    action.tone === "primary" ? "bg-primary-50 text-primary-700" : "bg-secondary-50 text-secondary-700"
                  }`}
                  aria-hidden="true"
                >
                  {action.title.charAt(0)}
                </span>
                <p className="text-lg font-bold text-ink-950">{action.title}</p>
                <p className="text-sm leading-relaxed text-ink-600">{action.description}</p>
                <span
                  className={`mt-auto text-sm font-semibold ${
                    action.tone === "primary" ? "text-primary-700" : "text-secondary-700"
                  }`}
                >
                  Перейти →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* FEATURED LOCATIONS */}
      <Section className="bg-surface/60">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Аптеки рядом"
            title="Список и карта всех аптек «Фармакеи»"
            description="Смотрите адреса, часы работы и телефоны — выбирайте точку по расположению или круглосуточному режиму."
          />
          <Button href="/apteki" variant="outline">
            Все аптеки и карта
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} basePath={loc.kinds.includes("pharmacy") ? "/apteki" : "/veterinariya"} />
          ))}
        </div>
      </Section>

      {/* TWO DIRECTIONS */}
      <Section>
        <SectionHeading eyebrow="Два направления" title="Заботимся и о вас, и о ваших питомцах" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="relative h-52 w-full">
              <Image
                src="https://images.pexels.com/photos/30336149/pexels-photo-30336149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1000"
                alt="Ассортимент лекарственных препаратов на полке аптеки (иллюстративное фото)"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-7">
              <Badge tone="primary">Для людей</Badge>
              <h3 className="mt-3 text-2xl font-bold text-ink-950">Аптеки «Фармакея»</h3>
              <p className="mt-3 text-ink-600">
                Широкий ассортимент лекарственных средств, включая редкие препараты, консультация фармацевта,
                заказ через Apteka.ru, Здравсити и Ютеку, накопительная система лояльности.
              </p>
              <Button href="/apteki" variant="outline" className="mt-6">
                Аптеки на карте
              </Button>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-52 w-full">
              <Image
                src="https://images.pexels.com/photos/6235650/pexels-photo-6235650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1000"
                alt="Ветеринарный осмотр собаки со стетоскопом (иллюстративное фото)"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-7">
              <Badge tone="secondary">Для животных</Badge>
              <h3 className="mt-3 text-2xl font-bold text-ink-950">Ветеринарные аптеки и кабинет</h3>
              <p className="mt-3 text-ink-600">
                Ветеринарные препараты, корма и зоотовары, а также ветеринарный кабинет с вакцинацией,
                чипированием, анализами и приёмом терапевта.
              </p>
              <Button href="/veterinariya" variant="secondary" className="mt-6">
                Ветеринарное направление
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-surface/60">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Услуги"
            title="Чем можно воспользоваться в «Фармакее»"
            description="От заказа редких препаратов до ветеринарного кабинета — полный список в разделе «Услуги»."
          />
          <Button href="/uslugi" variant="outline">
            Все услуги
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </Section>

      {/* NEWS + ABOUT */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Новости" title="Последние события сети" />
            <div className="mt-8">
              <NewsCard article={latestNews} />
            </div>
          </div>
          <div className="rounded-3xl bg-ink-950 p-8 text-ink-100 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-300">О компании</p>
            <p className="mt-4 text-lg leading-relaxed">{aboutParagraphs[0]}</p>
            <Button href="/o-kompanii" variant="outline" className="mt-6 border-white/30 bg-transparent text-white hover:bg-white/10">
              Узнать больше
            </Button>
          </div>
        </div>
      </Section>

      {/* CONTACT CTA */}
      <Section className="pb-20">
        <Card className="flex flex-col items-start gap-6 bg-primary-600 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Не нашли нужную информацию?</h2>
            <p className="mt-2 max-w-xl text-primary-50">
              Свяжитесь с нами — ответим на вопрос о лекарствах, ветеринарных услугах или работе аптек.
            </p>
          </div>
          <Button href="/kontakty" variant="outline" size="lg" className="border-white bg-white text-primary-700 hover:bg-primary-50">
            Написать нам
          </Button>
        </Card>
      </Section>
    </>
  );
}
