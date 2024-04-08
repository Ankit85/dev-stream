"use server";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/room";
import { revalidatePath } from "next/cache";

export async function createRoomActions(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("You need to login to create room");
  }
  const insertedRoom = await createRoom(roomData , session.user.id);

  revalidatePath("/");
  return insertedRoom;
}
