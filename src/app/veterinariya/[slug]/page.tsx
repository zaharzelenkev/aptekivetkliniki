import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDetail } from "@/components/LocationDetail";
import { getLocationBySlug, locations } from "@/data/locations";

const vetLocations = locations.filter((l) => l.kinds.includes("vet-pharmacy") || l.kinds.includes("vet-clinic"));

export function generateStaticParams() {
  return vetLocations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `${location.name} — ${location.city}`,
    description: `${location.name}: ${location.address}, ${location.city}. Часы работы, телефоны и ветеринарные услуги «Фармакея».`,
    alternates: { canonical: `/veterinariya/${location.slug}` },
  };
}

export default async function VetLocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location || !(location.kinds.includes("vet-pharmacy") || location.kinds.includes("vet-clinic"))) notFound();

  return <LocationDetail location={location} sectionLabel="Ветеринария" sectionHref="/veterinariya" />;
}
