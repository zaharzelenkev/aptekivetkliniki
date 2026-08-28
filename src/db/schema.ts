import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Обращения клиентов через форму обратной связи на сайте «Фармакея».
// Реальный работающий механизм: сообщения сохраняются в БД, сотрудники
// компании обрабатывают их вручную (на сайте-источнике нет онлайн-записи
// или чата, поэтому форма не имитирует то, чего не существует).
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  topic: varchar("topic", { length: 120 }).notNull(),
  message: text("message").notNull(),
  locationSlug: varchar("location_slug", { length: 160 }),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
