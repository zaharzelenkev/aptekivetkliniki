import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

function createDb(pool: Pool) {
  return drizzle(pool);
}

type Db = ReturnType<typeof createDb>;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: Db;
};

function getPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: databaseUrl,
    });
  }

  return globalForDb.__arenaNextJsPostgresqlPool;
}

function getDb(): Db {
  if (!globalForDb.__arenaNextJsPostgresqlDb) {
    globalForDb.__arenaNextJsPostgresqlDb = createDb(getPool());
  }

  return globalForDb.__arenaNextJsPostgresqlDb;
}

// Ленивая инициализация: реальные Pool и drizzle создаются только при первом
// обращении. Благодаря этому импорт модуля (например, на этапе сбора данных
// страниц во время `next build` на Vercel) не требует DATABASE_URL — запрос
// упадёт с понятной ошибкой только при реальном обращении к базе в рантайме.
export const pool = new Proxy({} as Pool, {
  get(_target, prop) {
    const real = getPool();
    const value = Reflect.get(real, prop);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export const db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
