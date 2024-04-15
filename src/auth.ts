import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Passkey from "next-auth/providers/passkey";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Passkey,
  ],
  // experimental: { enableWebAuthn: true },
});
