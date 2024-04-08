"use server";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { editRoom, getRoom } from "@/services/room";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();
  if (!session?.user) throw new Error("User not Authenticated");

  const room = await getRoom(roomData.id);

  if (room?.userId !== session.user.id) throw new Error("User not Authorized");

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/my-rooms");
  revalidatePath(`/edit-rooms/${room.id}`);
  redirect("/my-rooms");
}
