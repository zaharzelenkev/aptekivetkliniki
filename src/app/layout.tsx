import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

const siteUrl = "https://pharma-care.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Фармакея — аптеки и ветеринарные клиники в Санкт-Петербурге",
    template: "%s · Фармакея",
  },
  description:
    "Аптечная сеть «Фармакея» с 2003 года: аптеки для людей и ветеринарные аптеки в Санкт-Петербурге и Пушкине. Адреса, часы работы, услуги и контакты.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Фармакея",
    title: "Фармакея — аптеки и ветеринарные клиники",
    description:
      "Найдите ближайшую аптеку или ветеринарную аптеку «Фармакея», узнайте часы работы, услуги и телефоны для заказа.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-ink-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержимому
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Фармакея",
            url: siteUrl,
            foundingDate: "2003",
            areaServed: "Санкт-Петербург",
            description:
              "Аптечная сеть «Фармакея»: аптеки для людей и ветеринарные аптеки в Санкт-Петербурге и Пушкине.",
          }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
