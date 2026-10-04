import "@dotenvx/dotenvx/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { usersTable } from "~~/app/utils/database/schema";

const createDb = () => {
  const url = process.env.TURSO_URL || "file:local.db";
  const authToken = process.env.TURSO_TOKEN || "";
  
  const client = createClient({
    url,
    authToken,
  });

  return drizzle(client);
};

export const db = createDb();

export class Database {
  private db = db;

  async selectUsers() {
    return await this.db.select().from(usersTable);
  }
}
