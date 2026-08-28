import Link from "next/link";
import type { PharmacyLocation } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { telHref } from "@/lib/phone";

const kindLabels: Record<string, string> = {
  pharmacy: "Аптека",
  "vet-pharmacy": "Ветеринарная аптека",
  "vet-clinic": "Ветеринарный кабинет",
};

const kindTone: Record<string, "primary" | "secondary"> = {
  pharmacy: "primary",
  "vet-pharmacy": "secondary",
  "vet-clinic": "secondary",
};

export function LocationCard({ location, basePath }: { location: PharmacyLocation; basePath: "/apteki" | "/veterinariya" }) {
  const primaryPhone = location.phones[0];

  return (
    <Card hoverable className="flex h-full flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-2">
        {location.kinds.map((kind) => (
          <Badge key={kind} tone={kindTone[kind]}>
            {kindLabels[kind]}
          </Badge>
        ))}
        {location.hours.length > 0 ? <StatusPill hours={location.hours} /> : null}
      </div>

      <div>
        <h3 className="text-lg font-bold text-ink-950">
          <Link href={`${basePath}/${location.slug}`} className="hover:text-primary-700">
            {location.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink-600">
          {location.city}, {location.address}
        </p>
        {location.landmark ? <p className="text-sm text-ink-500">{location.landmark}</p> : null}
      </div>

      <ul className="flex flex-col gap-1 text-sm text-ink-700">
        {location.hours.map((h, i) => (
          <li key={i} className="flex justify-between gap-3">
            <span className="text-ink-500">{h.label}</span>
            <span className="text-right font-medium">{h.text}</span>
          </li>
        ))}
      </ul>

      {location.badges?.length ? (
        <div className="flex flex-wrap gap-2">
          {location.badges.map((b) => (
            <Badge key={b} tone="neutral">
              {b}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
        <Link
          href={`${basePath}/${location.slug}`}
          className="text-sm font-semibold text-primary-700 underline-offset-4 hover:underline"
        >
          Подробнее о точке →
        </Link>
        {primaryPhone ? (
          <a
            href={telHref(primaryPhone.raw)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100"
          >
            {primaryPhone.display}
          </a>
        ) : null}
      </div>
    </Card>
  );
}
