export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Аптеки", href: "/apteki", description: "Адреса, часы работы и телефоны аптек" },
  { label: "Ветеринария", href: "/veterinariya", description: "Ветеринарные аптеки и кабинет" },
  { label: "Услуги", href: "/uslugi", description: "Что можно сделать в «Фармакее»" },
  { label: "Ассортимент", href: "/assortiment", description: "Категории товаров сети" },
  { label: "О компании", href: "/o-kompanii", description: "История и принципы «Фармакеи»" },
  { label: "Новости", href: "/novosti", description: "Открытия и объявления" },
  { label: "Вакансии", href: "/vakansii", description: "Работа в аптечной сети" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Компания",
    items: [
      { label: "О компании", href: "/o-kompanii" },
      { label: "Новости", href: "/novosti" },
      { label: "Вакансии", href: "/vakansii" },
      { label: "Контакты", href: "/kontakty" },
    ],
  },
  {
    title: "Клиентам",
    items: [
      { label: "Аптеки", href: "/apteki" },
      { label: "Услуги", href: "/uslugi" },
      { label: "Ассортимент", href: "/assortiment" },
      { label: "Карты лояльности", href: "/uslugi#karty-loyalnosti" },
    ],
  },
  {
    title: "Владельцам животных",
    items: [
      { label: "Ветеринарные аптеки", href: "/veterinariya" },
      { label: "Ветеринарный кабинет", href: "/veterinariya/shirokaya-26-pushkin" },
      { label: "Услуги для животных", href: "/uslugi?tab=vet" },
    ],
  },
  {
    title: "Документы",
    items: [
      { label: "Политика конфиденциальности", href: "/politika-konfidentsialnosti" },
    ],
  },
];
