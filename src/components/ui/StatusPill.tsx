import type { LocationHours } from "@/data/types";
import { getOpenStatus, statusLabel } from "@/lib/hours";
import { Badge } from "./Badge";

export function StatusPill({ hours }: { hours: LocationHours[] }) {
  const status = getOpenStatus(hours);
  const tone = status === "open" ? "success" : status === "soon" ? "warning" : status === "closed" ? "neutral" : "neutral";
  const dot =
    status === "open" ? "bg-success-500" : status === "soon" ? "bg-warning-500" : status === "closed" ? "bg-ink-400" : "bg-ink-300";

  return (
    <Badge tone={tone}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {statusLabel[status]}
    </Badge>
  );
}
