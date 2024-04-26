import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
import { z } from "zod";
import users from "@/lib/users.json";

async function getUser(email: string, password: string): Promise<any> {
  return (
    users.find((user) => user.email === email && user.password === password) ??
    null
  );
}

export const config = {
  // experimental: { enableWebAuthn: true },
  // adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/authenticate",
  },
  providers: [
    // Passkey,
    // GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);

          if (!user) return null;
          if (password == user.password) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/teacher") ||
        nextUrl.pathname.startsWith("/student");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect authenticated users to their respective dashboard
        if (nextUrl.pathname.startsWith("/teacher")) {
          return Response.redirect(new URL("/teacher", nextUrl));
        } else if (nextUrl.pathname.startsWith("/student")) {
          return Response.redirect(new URL("/student", nextUrl));
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
