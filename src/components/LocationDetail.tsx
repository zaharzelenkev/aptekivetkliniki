import Link from "next/link";
import type { PharmacyLocation } from "@/data/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MapEmbed } from "@/components/MapEmbed";
import { JsonLd } from "@/components/JsonLd";
import { telHref, waHref } from "@/lib/phone";

const kindLabels: Record<string, string> = {
  pharmacy: "Аптека",
  "vet-pharmacy": "Ветеринарная аптека",
  "vet-clinic": "Ветеринарный кабинет",
};

export function LocationDetail({
  location,
  sectionLabel,
  sectionHref,
}: {
  location: PharmacyLocation;
  sectionLabel: string;
  sectionHref: "/apteki" | "/veterinariya";
}) {
  const schemaType = location.kinds.includes("pharmacy")
    ? "Pharmacy"
    : location.kinds.includes("vet-pharmacy") || location.kinds.includes("vet-clinic")
      ? "VeterinaryCare"
      : "LocalBusiness";

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": schemaType,
          name: location.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: location.address,
            addressLocality: location.city,
            addressCountry: "RU",
          },
          telephone: location.phones[0]?.display,
        }}
      />
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Главная", href: "/" }, { label: sectionLabel, href: sectionHref }, { label: location.name }]}
          />
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {location.kinds.map((kind) => (
              <Badge key={kind} tone={kind === "pharmacy" ? "primary" : "secondary"}>
                {kindLabels[kind]}
              </Badge>
            ))}
            {location.hours.length > 0 ? <StatusPill hours={location.hours} /> : null}
            {location.badges?.map((b) => (
              <Badge key={b} tone="neutral">
                {b}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{location.name}</h1>
          <p className="mt-2 text-lg text-ink-600">
            {location.city}, {location.address}
          </p>
          {location.landmark ? <p className="text-ink-500">{location.landmark}</p> : null}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex flex-col gap-8">
          {location.description ? <p className="text-base leading-relaxed text-ink-700">{location.description}</p> : null}

          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink-950">Часы работы</h2>
            {location.hours.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-3">
                {location.hours.map((h, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                    <span className="text-sm text-ink-500">{h.label}</span>
                    <span className="text-right font-semibold text-ink-900">{h.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-500">
                Часы работы уточняйте по телефону — на сайте эта информация пока не опубликована.
              </p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink-950">Контакты</h2>
            {location.phones.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-3">
                {location.phones.map((p) => (
                  <li key={p.raw} className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <a href={telHref(p.raw)} className="text-base font-semibold text-primary-700 hover:underline">
                        {p.display}
                      </a>
                      {p.note ? <p className="text-xs text-ink-500">{p.note}</p> : null}
                    </div>
                    {p.whatsapp ? (
                      <a
                        href={waHref(p.raw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-success-50 px-3 py-1.5 text-xs font-semibold text-success-600 transition-colors hover:bg-success-50/70"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-500">
                Телефон для этой точки пока не опубликован. Уточнить услуги можно в разделе «Контакты».
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              {location.phones[0] ? (
                <Button href={telHref(location.phones[0].raw)} size="md">
                  Позвонить
                </Button>
              ) : (
                <Button href="/kontakty" size="md" variant="outline">
                  Написать нам
                </Button>
              )}
            </div>
          </Card>

          {location.notes?.length ? (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-ink-950">Дополнительная информация</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-ink-600">
                {location.notes.map((n, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" aria-hidden="true" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <div className="lg:sticky lg:top-24">
            <MapEmbed query={location.mapQuery} title={location.name} />
            <p className="mt-3 text-center text-xs text-ink-500">
              <Link href={`https://yandex.ru/maps/?text=${encodeURIComponent(location.mapQuery)}`} className="hover:underline">
                Открыть в Яндекс Картах →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
