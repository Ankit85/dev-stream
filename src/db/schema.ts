import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const testing = pgTable("testing", {
  id: serial("id").primaryKey().notNull().unique(),
  fullName: text("full_name"),
});
