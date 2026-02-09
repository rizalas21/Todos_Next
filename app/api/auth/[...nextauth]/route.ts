import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "auth-session",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!user) return null;
          const isMatch = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );
          if (!isMatch) return null;

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.log("error when author => ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOption as AuthOptions);

export { handler as GET, handler as POST };
