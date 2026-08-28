import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { allServices, humanServices, vetServices } from "@/data/services";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/uslugi/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = (service.audience === "human" ? humanServices : vetServices)
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  return (
    <Section className="pt-8 sm:pt-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Услуги", href: "/uslugi" },
          { label: service.title },
        ]}
      />
      <div className="mt-6 max-w-3xl">
        <Badge tone={service.audience === "vet" ? "secondary" : "primary"}>{service.category}</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{service.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">{service.description}</p>
        {service.cta ? (
          <div className="mt-7">
            <Button href={service.cta.href}>{service.cta.label}</Button>
          </div>
        ) : (
          <div className="mt-7">
            <Button href={service.audience === "vet" ? "/veterinariya" : "/apteki"} variant="outline">
              {service.audience === "vet" ? "Ветеринарные точки" : "Найти аптеку"}
            </Button>
          </div>
        )}
      </div>

      {related.length > 0 ? (
        <div className="mt-14">
          <h2 className="text-lg font-bold text-ink-950">Похожие услуги</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Card key={r.id} className="p-5">
                <a href={`/uslugi/${r.slug}`} className="font-semibold text-ink-900 hover:text-primary-700">
                  {r.title}
                </a>
                <p className="mt-1.5 text-sm text-ink-600">{r.shortDescription}</p>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </Section>
  );
}
