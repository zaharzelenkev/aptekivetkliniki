import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных сайта аптечной сети «Фармакея».",
  alternates: { canonical: "/politika-konfidentsialnosti" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-8 sm:pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Политика конфиденциальности" }]} />
      <div className="mt-6 max-w-3xl">
        <SectionHeading title="Политика конфиденциальности" />
        <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-ink-700">
          <p>
            Настоящая страница описывает общий порядок обработки персональных данных, которые пользователь
            добровольно указывает в формах на сайте аптечной сети «Фармакея» (например, в форме обратной связи):
            имя, номер телефона и текст обращения.
          </p>
          <p>
            Данные используются исключительно для обработки обращения и обратной связи с пользователем и не
            передаются третьим лицам, за исключением случаев, предусмотренных законодательством Российской
            Федерации.
          </p>
          <p>
            Пользователь может обратиться с запросом об уточнении, изменении или удалении своих персональных
            данных через форму обратной связи на странице «Контакты».
          </p>
          <p>
            Сайт не собирает данные банковских карт и не осуществляет приём онлайн-платежей — оплата товаров и
            услуг происходит непосредственно в аптеке.
          </p>
        </div>
      </div>
    </Section>
  );
}
