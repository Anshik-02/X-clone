import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import { userModel } from "@/model/schema";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NEXTAUTH_URL?.startsWith('https://'),
        sameSite: 'lax',
        path: '/',
      },
    },
  },
  callbacks: {
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      session.user.username = session.user.name
        ?.split(" ")
        .join("")
        .toLowerCase();
      return session;
    },
    async jwt({ user, token }: { user?: any; token: JWT }) {
      if (user) {
        await connectDB();
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
          token.id = existingUser._id.toString();
        } else {
          const newUser = await userModel.create({
            username: user.name,
            email: user.email,
            pic: user.image,
            provider: "google",
          });
          token.id = newUser._id.toString();
        }
      }
      return token;
    },
  },
};
