import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingGuest = await getGuest(user.email || "");

        if (!existingGuest)
          await createGuest({
            email: user.email || "",
            fullName: user.name || "",
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      const guest = await getGuest(session.user?.email || "");
      const newSession = {
        ...session,
        user: {
          ...session.user,
          guestId: guest.id,
        },
      };

      return newSession;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
