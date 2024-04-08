import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  unstable_noStore();
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  unstable_noStore();
  const session = await getSession();
  if (!session) {
    throw new Error("User not Authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const insertedRoom = await db
    .insert(room)
    .values({ ...roomData, userId: userId })
    .returning();
  return insertedRoom[0];
}
export async function deleteRoom(roomId: string) {
  return await db.delete(room).where(eq(room.id, roomId));
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();

  return updated[0];
}
