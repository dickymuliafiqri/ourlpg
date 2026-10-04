import { Database } from "../utils/db";

export default defineEventHandler(async (event) => {
  const db = new Database();
  const users = await db.selectUsers();
  return users;
});
