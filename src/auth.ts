import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { signInWithGoogle, User } from "./apis/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const result = await signInWithGoogle(user as User);
      // TODO: 로그인 성공 여부에 따라 처리
      return true;
    },
  },
});
