"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/lib/search";

const categoryOrder: SearchResult["category"][] = ["Аптеки", "Ветеринария", "Услуги", "Ассортимент", "Новости", "Страницы"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) {
      setQuery("");
      setResults([]);
      setStatus("idle");
    }
  }

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const runSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data: { results: SearchResult[] }) => {
        setResults(data.results);
        setStatus("done");
      })
      .catch(() => {
        setResults([]);
        setStatus("done");
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => runSearch(query), 180);
    return () => clearTimeout(timeout);
  }, [query, runSearch]);

  if (!open) return null;

  const grouped = categoryOrder
    .map((cat) => ({ cat, items: results.filter((r) => r.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-950/40 px-4 pt-20 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Поиск по сайту">
      <button
        aria-label="Закрыть поиск"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-soft-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              router.push(`/poisk?q=${encodeURIComponent(query.trim())}`);
              onClose();
            }
          }}
          className="flex items-center gap-3 border-b border-border px-5 py-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-ink-400">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Аптека, услуга, адрес…"
            aria-label="Поисковый запрос"
            className="w-full bg-transparent text-base text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-ink-400 sm:block">Esc</kbd>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {status === "loading" ? (
            <div className="space-y-2 p-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-ink-100" />
              ))}
            </div>
          ) : query.trim() && results.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-semibold text-ink-900">Ничего не найдено по запросу «{query}»</p>
              <p className="mt-1.5 text-sm text-ink-500">
                Попробуйте другой запрос или посмотрите раздел «Аптеки» и «Услуги».
              </p>
            </div>
          ) : results.length > 0 ? (
            grouped.map((group) => (
              <div key={group.cat} className="mb-2">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-ink-400">{group.cat}</p>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50"
                  >
                    <p className="text-sm font-semibold text-ink-900">{item.title}</p>
                    {item.description ? <p className="truncate text-xs text-ink-500">{item.description}</p> : null}
                  </a>
                ))}
              </div>
            ))
          ) : (
            <div className="px-5 py-10 text-center text-sm text-ink-500">
              Начните вводить запрос — например, «круглосуточно», «вакцинация» или «Пушкин».
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
