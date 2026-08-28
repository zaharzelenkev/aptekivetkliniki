import Link from "next/link";
import { Logo } from "./Logo";
import { footerNav } from "@/data/nav";
import { locations } from "@/data/locations";
import { telHref } from "@/lib/phone";

export function Footer() {
  const allPhones = locations.flatMap((l) => l.phones);
  const uniquePhones = Array.from(new Map(allPhones.map((p) => [p.raw, p])).values()).slice(0, 4);

  return (
    <footer className="border-t border-border bg-ink-950 text-ink-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <div className="[&_span]:text-white [&_svg_rect]:fill-primary-500">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Петербургская аптечная сеть «Фармакея» работает с 2003 года: аптеки для людей и ветеринарные аптеки
              в Санкт-Петербурге и Пушкине.
            </p>
            <div className="mt-5 flex flex-col gap-1.5 text-sm">
              {uniquePhones.map((p) => (
                <a key={p.raw} href={telHref(p.raw)} className="w-fit text-ink-300 transition-colors hover:text-white">
                  {p.display}
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-white">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink-400 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Аптечная сеть «Фармакея». Санкт-Петербург, основана в 2003 году.</p>
          <p>Информация на сайте носит справочный характер и не является публичной офертой.</p>
        </div>
      </div>
    </footer>
  );
}
