import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="py-24">
      <EmptyState
        icon="🧭"
        title="Страница не найдена"
        description="Возможно, ссылка устарела. Попробуйте найти нужную информацию через поиск или главные разделы."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/">На главную</Button>
            <Button href="/apteki" variant="outline">
              Найти аптеку
            </Button>
          </div>
        }
      />
    </Section>
  );
}
