import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { allServices } from "@/data/services";
import { newsArticles } from "@/data/news";

const baseUrl = "https://pharma-care.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/apteki",
    "/veterinariya",
    "/uslugi",
    "/assortiment",
    "/o-kompanii",
    "/vakansii",
    "/novosti",
    "/kontakty",
    "/politika-konfidentsialnosti",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const locationRoutes = locations.map((l) => ({
    url: `${baseUrl}/${l.kinds.includes("pharmacy") ? "apteki" : "veterinariya"}/${l.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = allServices.map((s) => ({
    url: `${baseUrl}/uslugi/${s.slug}`,
    lastModified: new Date(),
  }));

  const newsRoutes = newsArticles.map((n) => ({
    url: `${baseUrl}/novosti/${n.slug}`,
    lastModified: new Date(n.date),
  }));

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes, ...newsRoutes];
}
