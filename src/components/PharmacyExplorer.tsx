"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PharmacyLocation, LocationKind } from "@/data/types";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { MapEmbed } from "@/components/MapEmbed";
import { telHref } from "@/lib/phone";
import { cn } from "@/lib/cn";

const kindLabels: Record<LocationKind, string> = {
  pharmacy: "Аптека",
  "vet-pharmacy": "Ветеринарная аптека",
  "vet-clinic": "Ветеринарный кабинет",
};

const kindTone: Record<LocationKind, "primary" | "secondary"> = {
  pharmacy: "primary",
  "vet-pharmacy": "secondary",
  "vet-clinic": "secondary",
};

export function PharmacyExplorer({
  locations,
  basePath,
  show24hFilter = false,
}: {
  locations: PharmacyLocation[];
  basePath: "/apteki" | "/veterinariya";
  show24hFilter?: boolean;
}) {
  const cities = useMemo(() => Array.from(new Set(locations.map((l) => l.city))), [locations]);
  const [city, setCity] = useState<string>("all");
  const [only24h, setOnly24h] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(locations[0]?.id ?? "");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  const filtered = locations.filter((l) => {
    if (city !== "all" && l.city !== city) return false;
    if (only24h && !l.hours.some((h) => h.is24h)) return false;
    return true;
  });

  const selected = filtered.find((l) => l.id === selectedId) ?? filtered[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <FilterPill active={city === "all"} onClick={() => setCity("all")}>
          Все города
        </FilterPill>
        {cities.map((c) => (
          <FilterPill key={c} active={city === c} onClick={() => setCity(c)}>
            {c}
          </FilterPill>
        ))}
        {show24hFilter ? (
          <>
            <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
            <FilterPill active={only24h} onClick={() => setOnly24h((v) => !v)}>
              Круглосуточно
            </FilterPill>
          </>
        ) : null}
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileView("list")}
          className={cn(
            "flex-1 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            mobileView === "list" ? "border-primary-600 bg-primary-600 text-white" : "border-border bg-surface text-ink-700"
          )}
        >
          Список ({filtered.length})
        </button>
        <button
          type="button"
          onClick={() => setMobileView("map")}
          className={cn(
            "flex-1 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            mobileView === "map" ? "border-primary-600 bg-primary-600 text-white" : "border-border bg-surface text-ink-700"
          )}
        >
          Карта
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="По выбранным фильтрам ничего не найдено"
          description="Попробуйте выбрать другой город или сбросить фильтр."
          action={
            <button
              type="button"
              onClick={() => {
                setCity("all");
                setOnly24h(false);
              }}
              className="text-sm font-semibold text-primary-700 hover:underline"
            >
              Сбросить фильтры
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul className={cn("flex flex-col gap-4", mobileView === "map" && "hidden lg:flex")}>
            {filtered.map((loc) => {
              const isSelected = selected?.id === loc.id;
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(loc.id)}
                    className={cn(
                      "w-full rounded-2xl border p-5 text-left transition-all",
                      isSelected ? "border-primary-500 bg-primary-50/60 shadow-soft" : "border-border bg-surface hover:border-primary-200"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {loc.kinds.map((kind) => (
                        <Badge key={kind} tone={kindTone[kind]}>
                          {kindLabels[kind]}
                        </Badge>
                      ))}
                      {loc.hours.length > 0 ? <StatusPill hours={loc.hours} /> : null}
                    </div>
                    <p className="mt-3 font-bold text-ink-950">{loc.name}</p>
                    <p className="mt-1 text-sm text-ink-600">
                      {loc.city}, {loc.address}
                    </p>
                    <ul className="mt-2 flex flex-col gap-0.5 text-sm text-ink-500">
                      {loc.hours.map((h, i) => (
                        <li key={i}>
                          {h.label}: <span className="font-medium text-ink-700">{h.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Link
                        href={`${basePath}/${loc.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-semibold text-primary-700 hover:underline"
                      >
                        Подробнее →
                      </Link>
                      {loc.phones[0] ? (
                        <a
                          href={telHref(loc.phones[0].raw)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-semibold text-ink-700 hover:text-primary-700"
                        >
                          {loc.phones[0].display}
                        </a>
                      ) : null}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={cn("lg:sticky lg:top-24 lg:self-start", mobileView === "list" && "hidden lg:block")}>
            {selected ? <MapEmbed query={selected.mapQuery} title={selected.name} /> : null}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "border-primary-600 bg-primary-600 text-white" : "border-border bg-surface text-ink-600 hover:border-primary-300"
      )}
    >
      {children}
    </button>
  );
}
