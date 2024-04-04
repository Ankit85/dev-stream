import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { DefaultSession } from "next-auth";
import { AuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENTSECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      });

      if (!dbUser) throw new Error("No user with found email");

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },

    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }
      return session;
    },
  },
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authConfig);
}
