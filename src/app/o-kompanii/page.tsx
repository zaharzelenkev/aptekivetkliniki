import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { aboutParagraphs, companyFacts } from "@/data/company";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "О компании — аптечная сеть «Фармакея»",
  description:
    "История аптечной сети «Фармакея»: работаем с 2003 года в Санкт-Петербурге, развиваем аптеки для людей и ветеринарные аптеки.",
  alternates: { canonical: "/o-kompanii" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О компании" }]} />
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="О компании" title="«Фармакея» — аптечная сеть Санкт-Петербурга" />
            <div className="mt-6 flex flex-col gap-5 text-base leading-relaxed text-ink-700">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-soft-lg lg:aspect-auto lg:h-full">
            <Image
              src="https://images.pexels.com/photos/8657359/pexels-photo-8657359.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1000"
              alt="Фармацевт передаёт покупку клиенту (иллюстративное фото)"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-surface/60">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary-700">{companyFacts.founded}</p>
            <p className="mt-2 text-sm text-ink-600">год основания сети в Санкт-Петербурге</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary-700">{companyFacts.directions}</p>
            <p className="mt-2 text-sm text-ink-600">направления: аптеки для людей и для животных</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary-700">{locations.length}</p>
            <p className="mt-2 text-sm text-ink-600">точек в Санкт-Петербурге и Пушкине</p>
          </Card>
        </div>
      </Section>

      <Section className="pb-20">
        <Card className="flex flex-col items-start gap-6 bg-ink-950 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Работаем над качеством каждый день</h2>
            <p className="mt-2 max-w-xl text-ink-300">
              Ищем внимательных фармацевтов и провизоров — узнайте об условиях работы в сети.
            </p>
          </div>
          <Button href="/vakansii" variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
            Вакансии
          </Button>
        </Card>
      </Section>
    </>
  );
}
