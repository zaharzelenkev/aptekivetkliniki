import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

interface ContactPayload {
  name?: string;
  phone?: string;
  topic?: string;
  message?: string;
  locationSlug?: string;
}

function validate(payload: ContactPayload) {
  const errors: Record<string, string> = {};
  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = "Укажите имя (минимум 2 символа).";
  }
  const phoneDigits = (payload.phone ?? "").replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    errors.phone = "Укажите корректный номер телефона.";
  }
  if (!payload.topic) {
    errors.topic = "Выберите тему обращения.";
  }
  if (!payload.message || payload.message.trim().length < 5) {
    errors.message = "Опишите вопрос подробнее (минимум 5 символов).";
  }
  return errors;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный формат запроса." }, { status: 400 });
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const [row] = await db
    .insert(contactMessages)
    .values({
      name: payload.name!.trim(),
      phone: payload.phone!.trim(),
      topic: payload.topic!,
      message: payload.message!.trim(),
      locationSlug: payload.locationSlug?.trim() || null,
    })
    .returning({ id: contactMessages.id });

  return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
}
