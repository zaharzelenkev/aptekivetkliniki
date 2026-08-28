import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDetail } from "@/components/LocationDetail";
import { getLocationBySlug, pharmacyLocations } from "@/data/locations";

export function generateStaticParams() {
  return pharmacyLocations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `${location.name} — ${location.city}`,
    description: `${location.name}: ${location.address}, ${location.city}. Часы работы, телефоны и услуги аптеки «Фармакея».`,
    alternates: { canonical: `/apteki/${location.slug}` },
  };
}

export default async function PharmacyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location || !location.kinds.includes("pharmacy")) notFound();

  return <LocationDetail location={location} sectionLabel="Аптеки" sectionHref="/apteki" />;
}
