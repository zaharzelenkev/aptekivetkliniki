import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { humanServices, vetServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Услуги аптек и ветеринарного кабинета «Фармакея»",
  description:
    "Каталог услуг аптечной сети «Фармакея»: заказ редких препаратов, партнёрство с маркетплейсами, карты лояльности и услуги ветеринарного кабинета.",
  alternates: { canonical: "/uslugi" },
};

export default function ServicesPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги" }]} />
      <div className="mt-4">
        <SectionHeading
          eyebrow="Услуги"
          title="Чем можно воспользоваться в «Фармакее»"
          description="Услуги для людей и владельцев животных — без выдуманных цен: если стоимость не опубликована на официальном сайте, уточняйте её по телефону."
        />
      </div>
      <div className="mt-10">
        <ServicesExplorer human={humanServices} vet={vetServices} />
      </div>
    </Section>
  );
}
