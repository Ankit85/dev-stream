"use server";
import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateToken() {
  const session = await getSession();

  if (!session) throw new Error("No session found");

  // Define values.
  const api_key = process.env.STREAM_API_KEY!;
  const api_secret = process.env.STREAM_API_SECRET!;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  // Create User Token
  const token = serverClient.createToken(session?.user.id);
  return token;
}
