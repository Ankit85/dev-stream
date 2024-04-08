"use server";
import { getSession } from "@/lib/auth";
import { deleteRoom, getRoom } from "@/services/room";
import { revalidatePath } from "next/cache";
import { unstable_noStore } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  unstable_noStore();

  const session = await getSession();
  if (!session?.user) throw new Error("User not Authenticated");

  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) throw new Error("User not Authorized");

  await deleteRoom(roomId);
  revalidatePath("/my-rooms");
}
