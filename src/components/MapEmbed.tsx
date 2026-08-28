export function MapEmbed({ query, title }: { query: string; title: string }) {
  const src = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(query)}&z=16&lang=ru_RU`;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-ink-50">
      <iframe
        src={src}
        title={`Карта: ${title}`}
        loading="lazy"
        className="h-full min-h-[320px] w-full"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
