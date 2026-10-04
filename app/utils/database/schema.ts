import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  username: text().notNull().unique(),
  pin: text().notNull(),
  isPriority: int({ mode: "boolean" }).default(false),
  stock: int().notNull(),
  lastUpdated: int({ mode: "timestamp_ms" })
    .default(sql`(unixepoch())`) // Sets initial date on insert
    .$onUpdate(() => sql`(unixepoch())`),
});
