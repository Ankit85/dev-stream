"use server";
import { getSession } from "@/lib/auth";
import { deleteUserAccount } from "@/services/user";
import { revalidatePath } from "next/cache";
import { unstable_noStore } from "next/cache";

export async function deleteAccountAction() {
  unstable_noStore();
  const session = await getSession();
  if (!session?.user) throw new Error("User not Authenticated");

  await deleteUserAccount(session.user.id);
}
