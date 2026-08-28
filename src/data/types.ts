// Общие типы данных сети «Фармакея».
// Данные основаны на содержимом официального сайта pharma-care.ru

export type LocationKind = "pharmacy" | "vet-pharmacy" | "vet-clinic";

export interface LocationPhone {
  /** Только цифры и + для tel: ссылок */
  raw: string;
  /** Отображаемый формат */
  display: string;
  whatsapp?: boolean;
  note?: string;
}

export interface LocationHours {
  kind: LocationKind;
  label: string;
  text: string;
  is24h?: boolean;
  comingSoon?: boolean;
}

export interface PharmacyLocation {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  landmark?: string;
  kinds: LocationKind[];
  hours: LocationHours[];
  phones: LocationPhone[];
  badges?: string[];
  notes?: string[];
  description?: string;
  mapQuery: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  audience: "human" | "vet";
  cta?: { label: string; href: string };
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  relatedLocationSlug?: string;
}

export interface AssortmentCategory {
  id: string;
  title: string;
  description: string;
  audience: "human" | "vet" | "both";
}
