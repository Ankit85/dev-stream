import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUserAccount(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}
