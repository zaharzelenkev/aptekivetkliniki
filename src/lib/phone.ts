export function telHref(raw: string) {
  return `tel:${raw.replace(/[^\d+]/g, "")}`;
}

export function waHref(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}
