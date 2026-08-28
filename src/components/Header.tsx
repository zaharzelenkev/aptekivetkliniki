"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { primaryNav } from "@/data/nav";
import { Button } from "@/components/ui/Button";
import { SearchOverlay } from "./SearchOverlay";
import { cn } from "@/lib/cn";

/** Header height in px — kept in sync with the mobile menu offset below. */
const HEADER_HEIGHT = 72;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // The panel is hidden by `lg:hidden`, so drop the state (and the scroll lock)
  // as soon as the viewport becomes desktop-wide.
  useEffect(() => {
    if (!mobileOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    function onChange() {
      if (mediaQuery.matches) setMobileOpen(false);
    }

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/90 backdrop-blur-md">
        <div
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8"
          style={{ height: HEADER_HEIGHT }}
        >
          <Link href="/" className="min-w-0 rounded-md" aria-label="Фармакея — на главную">
            <Logo />
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    active ? "bg-primary-50 text-primary-700" : "text-ink-700 hover:bg-ink-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Открыть поиск"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <Button href="/apteki" size="sm" className="hidden sm:inline-flex">
              Найти аптеку
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 lg:hidden"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: the header uses `backdrop-blur`, which makes
          it the containing block for `position: fixed` descendants — inside it
          the panel collapsed to a 56px strip and the page showed through. */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-border bg-surface px-4 pb-10 pt-4 lg:hidden"
          style={{ top: HEADER_HEIGHT }}
        >
          <nav aria-label="Мобильная навигация" className="flex flex-col gap-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex flex-col rounded-xl px-4 py-3.5 transition-colors active:bg-primary-100",
                    active ? "bg-primary-50" : "hover:bg-primary-50"
                  )}
                >
                  <span className="text-base font-semibold text-ink-950">{item.label}</span>
                  {item.description ? <span className="text-sm text-ink-500">{item.description}</span> : null}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
            <Button href="/apteki" size="lg" className="w-full" onClick={() => setMobileOpen(false)}>
              Найти аптеку
            </Button>
            <Button
              href="/veterinariya"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Ветеринарные клиники
            </Button>
            <Button
              href="/kontakty"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Контакты
            </Button>
          </div>
        </div>
      ) : null}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
