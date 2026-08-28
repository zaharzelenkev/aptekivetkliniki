import { locations } from "@/data/locations";
import { allServices } from "@/data/services";
import { newsArticles } from "@/data/news";
import { assortmentCategories } from "@/data/assortment";
import { primaryNav } from "@/data/nav";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "Страницы" | "Аптеки" | "Ветеринария" | "Услуги" | "Ассортимент" | "Новости";
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const item of primaryNav) {
    results.push({
      id: `page-${item.href}`,
      title: item.label,
      description: item.description ?? "",
      href: item.href,
      category: "Страницы",
    });
  }

  for (const loc of locations) {
    const isVetOnly = loc.kinds.every((k) => k !== "pharmacy");
    results.push({
      id: `loc-${loc.slug}`,
      title: loc.name,
      description: `${loc.address}, ${loc.city}`,
      href: isVetOnly ? `/veterinariya/${loc.slug}` : `/apteki/${loc.slug}`,
      category: isVetOnly ? "Ветеринария" : "Аптеки",
    });
  }

  for (const s of allServices) {
    results.push({
      id: `service-${s.slug}`,
      title: s.title,
      description: s.shortDescription,
      href: `/uslugi/${s.slug}`,
      category: "Услуги",
    });
  }

  for (const c of assortmentCategories) {
    results.push({
      id: `assort-${c.id}`,
      title: c.title,
      description: c.description,
      href: `/assortiment#${c.id}`,
      category: "Ассортимент",
    });
  }

  for (const n of newsArticles) {
    results.push({
      id: `news-${n.slug}`,
      title: n.title,
      description: n.excerpt,
      href: `/novosti/${n.slug}`,
      category: "Новости",
    });
  }

  return results;
}

const INDEX = buildIndex();

export function search(query: string, limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = INDEX.map((item) => {
    const haystack = `${item.title} ${item.description}`.toLowerCase();
    let score = 0;
    if (item.title.toLowerCase().startsWith(q)) score += 5;
    if (item.title.toLowerCase().includes(q)) score += 3;
    if (haystack.includes(q)) score += 1;
    return { item, score };
  }).filter((s) => s.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}
