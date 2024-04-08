import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import { VercelPgDatabase, drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: VercelPgDatabase<typeof schema> | undefined;
}

let db: VercelPgDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  if (!global.db) {
    global.db = drizzle(sql, { schema });
  }
  db = global.db;
} else {
  db = drizzle(sql, { schema });
}

export { db };
