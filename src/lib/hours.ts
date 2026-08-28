import type { LocationHours } from "@/data/types";

export type OpenStatus = "open" | "closed" | "unknown" | "soon";

/**
 * Пытается разобрать текстовые часы работы вида "09:00 – 21:00" и определить,
 * открыта ли точка сейчас. Если формат нестандартный (например, "готовится к
 * открытию"), возвращает "unknown"/"soon" — без домыслов.
 */
export function getOpenStatus(hours: LocationHours[], now: Date = new Date()): OpenStatus {
  if (!hours.length) return "unknown";
  if (hours.some((h) => h.comingSoon)) return "soon";
  if (hours.some((h) => h.is24h)) return "open";

  const minutesNow = now.getHours() * 60 + now.getMinutes();

  for (const h of hours) {
    const match = h.text.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
    if (!match) continue;
    const [, h1, m1, h2, m2] = match;
    const start = Number(h1) * 60 + Number(m1);
    const end = Number(h2) * 60 + Number(m2);
    if (start <= end) {
      if (minutesNow >= start && minutesNow < end) return "open";
    } else {
      // диапазон через полночь
      if (minutesNow >= start || minutesNow < end) return "open";
    }
  }
  return "closed";
}

export const statusLabel: Record<OpenStatus, string> = {
  open: "Открыто сейчас",
  closed: "Сейчас закрыто",
  soon: "Готовится к открытию",
  unknown: "Часы уточняйте по телефону",
};
