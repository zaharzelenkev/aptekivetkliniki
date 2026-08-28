import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { careersBenefits, careersClosing, careersIntro } from "@/data/company";

export const metadata: Metadata = {
  title: "Вакансии — работа в аптечной сети «Фармакея»",
  description: "Работа в аптеках «Фармакея»: соцпакет по ТК РФ, обучение 1С, медосмотры за счёт компании, рабочая форма по меркам.",
  alternates: { canonical: "/vakansii" },
};

export default function CareersPage() {
  return (
    <Section className="pt-8 sm:pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Вакансии" }]} />
      <div className="mt-4 max-w-2xl">
        <SectionHeading eyebrow="Вакансии" title="Работа в аптечной сети «Фармакея»" description={careersIntro} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-7">
          <h2 className="text-lg font-bold text-ink-950">Мы предлагаем</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {careersBenefits.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-semibold text-ink-900">{careersClosing}</p>
        </Card>

        <Card className="h-fit p-7">
          <h2 className="text-lg font-bold text-ink-950">Как откликнуться</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            Расскажите о себе через форму обратной связи — укажите тему «Вакансия», и мы свяжемся с вами по
            указанному телефону.
          </p>
          <Button href="/kontakty?topic=vakansiya" className="mt-5 w-full">
            Откликнуться
          </Button>
        </Card>
      </div>
    </Section>
  );
}
