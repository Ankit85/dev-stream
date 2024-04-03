import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/db";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENTSECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
