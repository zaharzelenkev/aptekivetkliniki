"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { ServiceItem } from "@/data/types";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

function ServicesExplorerInner({ human, vet }: { human: ServiceItem[]; vet: ServiceItem[] }) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "vet" ? "vet" : "human";
  const [tab, setTab] = useState<"human" | "vet">(initialTab);

  const items = tab === "human" ? human : vet;
  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const [category, setCategory] = useState<string>("all");

  const filtered = category === "all" ? items : items.filter((i) => i.category === category);

  return (
    <div>
      <div role="tablist" aria-label="Тип услуг" className="inline-flex rounded-full border border-border bg-surface p-1">
        <button
          role="tab"
          aria-selected={tab === "human"}
          onClick={() => {
            setTab("human");
            setCategory("all");
          }}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            tab === "human" ? "bg-primary-600 text-white" : "text-ink-600 hover:bg-ink-100"
          )}
        >
          Для людей
        </button>
        <button
          role="tab"
          aria-selected={tab === "vet"}
          onClick={() => {
            setTab("vet");
            setCategory("all");
          }}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            tab === "vet" ? "bg-secondary-600 text-white" : "text-ink-600 hover:bg-ink-100"
          )}
        >
          Для животных
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            category === "all" ? "border-ink-800 bg-ink-900 text-white" : "border-border bg-surface text-ink-600 hover:border-ink-300"
          )}
        >
          Все категории
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              category === c ? "border-ink-800 bg-ink-900 text-white" : "border-border bg-surface text-ink-600 hover:border-ink-300"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState title="В этой категории пока нет услуг" description="Выберите другую категорию." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ServicesExplorer(props: { human: ServiceItem[]; vet: ServiceItem[] }) {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-ink-100" />}>
      <ServicesExplorerInner {...props} />
    </Suspense>
  );
}
