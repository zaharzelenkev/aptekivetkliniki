import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PharmacyExplorer } from "@/components/PharmacyExplorer";
import { pharmacyLocations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Аптеки «Фармакея» — адреса, часы работы, телефоны",
  description:
    "Список и карта аптек сети «Фармакея» в Санкт-Петербурге и Пушкине: адреса, режим работы, круглосуточные аптеки, телефоны для заказа.",
  alternates: { canonical: "/apteki" },
};

export default function PharmaciesPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Аптеки" }]} />
      <div className="mt-4">
        <SectionHeading
          eyebrow="Аптеки «Фармакея»"
          title="Найдите аптеку рядом с вами"
          description="Список и карта всех аптек сети в Санкт-Петербурге и Пушкине. Уточняйте наличие товара и заказывайте по телефону."
        />
      </div>
      <div className="mt-10">
        <PharmacyExplorer locations={pharmacyLocations} basePath="/apteki" show24hFilter />
      </div>
    </Section>
  );
}
