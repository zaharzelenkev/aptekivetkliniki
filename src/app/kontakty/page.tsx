import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/ContactForm";
import { locations } from "@/data/locations";
import { telHref, waHref } from "@/lib/phone";

export const metadata: Metadata = {
  title: "Контакты — аптечная сеть «Фармакея»",
  description: "Телефоны и адреса аптек и ветеринарных аптек «Фармакея», а также форма обратной связи.",
  alternates: { canonical: "/kontakty" },
};

const kindLabels: Record<string, string> = {
  pharmacy: "Аптека",
  "vet-pharmacy": "Ветеринарная аптека",
  "vet-clinic": "Ветеринарный кабинет",
};

export default function ContactsPage() {
  return (
    <Section className="pt-8 sm:pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
      <div className="mt-4">
        <SectionHeading
          eyebrow="Контакты"
          title="Свяжитесь с «Фармакеей»"
          description="Выберите телефон нужной точки для звонка или WhatsApp — либо оставьте сообщение через форму, и мы перезвоним."
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-5">
          {locations.map((loc) => (
            <Card key={loc.id} className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                {loc.kinds.map((k) => (
                  <Badge key={k} tone={k === "pharmacy" ? "primary" : "secondary"}>
                    {kindLabels[k]}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 font-bold text-ink-950">{loc.name}</p>
              <p className="text-sm text-ink-600">
                {loc.city}, {loc.address}
              </p>
              {loc.phones.length > 0 ? (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {loc.phones.map((p) => (
                    <li key={p.raw} className="flex flex-wrap items-center gap-2 text-sm">
                      <a href={telHref(p.raw)} className="font-semibold text-primary-700 hover:underline">
                        {p.display}
                      </a>
                      {p.note ? <span className="text-ink-600">· {p.note}</span> : null}
                      {p.whatsapp ? (
                        <a href={waHref(p.raw)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-success-600 hover:underline">
                          WhatsApp
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-500">Телефон уточняйте через форму обратной связи.</p>
              )}
            </Card>
          ))}
        </div>

        <Card className="h-fit p-7">
          <h2 className="text-lg font-bold text-ink-950">Форма обратной связи</h2>
          <p className="mt-2 text-sm text-ink-600">
            Сообщения обрабатывают сотрудники «Фармакеи» вручную — ответим по указанному телефону.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Card>
      </div>
    </Section>
  );
}
