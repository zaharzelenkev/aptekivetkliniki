import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Card hoverable className="flex h-full flex-col gap-3 p-6">
      <Badge tone={service.audience === "vet" ? "secondary" : "primary"}>{service.category}</Badge>
      <h3 className="text-lg font-bold text-ink-950">
        <Link href={`/uslugi/${service.slug}`} className="hover:text-primary-700">
          {service.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-ink-600">{service.shortDescription}</p>
      <Link
        href={`/uslugi/${service.slug}`}
        className="mt-auto pt-2 text-sm font-semibold text-primary-700 underline-offset-4 hover:underline"
      >
        Подробнее →
      </Link>
    </Card>
  );
}
