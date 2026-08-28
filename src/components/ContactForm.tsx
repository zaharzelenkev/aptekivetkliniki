"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Field, Input, Select, Textarea } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const topics = [
  { value: "obshchiy-vopros", label: "Общий вопрос" },
  { value: "nalichie-preparata", label: "Наличие препарата" },
  { value: "veterinariya", label: "Вопрос по ветеринарии" },
  { value: "vakansiya", label: "Вакансия" },
  { value: "drugoe", label: "Другое" },
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const presetTopic = searchParams.get("topic");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("error");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success-500/30 bg-success-50 p-6 text-center" role="status">
        <p className="text-lg font-bold text-success-600">Сообщение отправлено</p>
        <p className="mt-2 text-sm text-ink-600">
          Спасибо! Мы получили ваше обращение и свяжемся с вами по указанному телефону.
        </p>
        <Button type="button" variant="outline" size="sm" className="mt-5" onClick={() => setStatus("idle")}>
          Отправить ещё одно сообщение
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Ваше имя" htmlFor="name" required error={errors.name}>
        <Input id="name" name="name" type="text" placeholder="Как к вам обращаться" required minLength={2} disabled={status === "loading"} />
      </Field>

      <Field label="Телефон" htmlFor="phone" required error={errors.phone}>
        <Input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required disabled={status === "loading"} />
      </Field>

      <Field label="Тема обращения" htmlFor="topic" required error={errors.topic}>
        <Select id="topic" name="topic" required defaultValue={presetTopic ?? ""} disabled={status === "loading"}>
          <option value="" disabled>
            Выберите тему
          </option>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Сообщение" htmlFor="message" required error={errors.message}>
        <Textarea id="message" name="message" placeholder="Опишите ваш вопрос" required minLength={5} disabled={status === "loading"} />
      </Field>

      {status === "error" && Object.keys(errors).length === 0 ? (
        <p role="alert" className="text-sm font-medium text-error-600">
          Не удалось отправить сообщение. Попробуйте ещё раз или позвоните в аптеку напрямую.
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Отправляем…" : "Отправить сообщение"}
      </Button>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-ink-100" />}>
      <ContactFormInner />
    </Suspense>
  );
}
